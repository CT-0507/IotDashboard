#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <Arduino_JSON.h>
#include <PubSubClient.h>
#include "DHT.h"

// Khai báo cho cảm biến dht
#define DHTPIN D5 // cổng đọc dữ liệu
#define DHTTYPE DHT11 // loại DHT, nếu là DHT22 thì sửa lại
DHT dht(DHTPIN, DHTTYPE);
int led1 = D6;
int led2 = D7;
int leds[2] = {led1, led2};


const char *mqttServer = "172.31.251.117";
const char *topicLeds = "leds";

WiFiClient espClient;
PubSubClient brokerClient(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE  (50)
char msg[MSG_BUFFER_SIZE];


void callback(char * topic, byte* payload, unsigned int length){
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("]: ");

  char message[length];
  String msg;
  for(int i=0 ; i < length; i++){
    message[i] = (char)payload[i];
  }
  Serial.println(message);
  Serial.println();

  Serial.println("each character: ");
  for(int i=0 ; i< 2; i++){
    if(message[i] == '1'){
      Serial.print("Turn on led");
      Serial.println(i);
      digitalWrite(leds[i], HIGH);
    } else {
      Serial.println("Turn off led");
      digitalWrite(leds[i], LOW);  
    }
  }
 
}


// SSID và password
const String ssid = "UiTiOt-E3.1";
const String password = "UiTiOtAP";

// các api
// LƯU Ý: sửa địa chỉ IP cho tương thích với thiết bị.
const char  *updateDeviceApi = "http://172.31.250.62:3000/update/device";
const char *refreshApi = "http://172.31.250.62:3000/refresh/device";
const char *updateDhtApi = "http://172.31.250.62:3000/update/dht";

// Link ảnh
const String image = "https://product.hstatic.net/1000362368/product/board_arduino_wemos_d1_r2_474b9472c3214d6088703c70b1a1e54b_master.jpg";

unsigned long lastUpdateTime = 0;
unsigned long lastRefreshTime = 0;

// delay gửi request update dữ liệu từ sensor
unsigned long updateDelay = 60000; // 1p gui request đưa dữ liệu từ sensor lên server
unsigned long refreshDelay  = 60000; // 1

String deviceId = "";
String deviceIP = "";

// đăng ký thiết bị với server.
bool registerDevice(const char *apiPath){
    WiFiClient client;
    HTTPClient http;
    http.begin(client, apiPath);
    http.addHeader("Content-Type", "application/json");
    
    String name = "\"name\":\"Wemos D1 R2\"";
    String imgUrl = "\"imgUrl\":\"" + image + "\"";
    String payload = "{" + name + "," + imgUrl +"}"; // tạo ra payload có dạng json

    
    // dùng phương thức POST để gửi payload
    int responeCode = http.POST(payload);

    Serial.print("Responce code: ");
    Serial.println(responeCode);
    
    if (responeCode >= 400) {
      Serial.println("Can't connect to server...");
      return false;
    } else if (responeCode >= 200 && responeCode  <300){
      Serial.println("Connect to server.");
      deviceId = http.getString();
      return true;
    } else {
      Serial.println("Unknow error, check your respone code on Google.");
      return false;
    }
   return false;
}

void refreshDevice(const char* apiPath){
    WiFiClient client;
    HTTPClient http;
    http.begin(client, apiPath);
    http.addHeader("Content-Type", "application/json");

    String payload = "{\"_id\":\""+deviceId+"\"}";
    int responeCode = http.PATCH(payload);
    Serial.print("Respone code: ");
    Serial.println(responeCode);

    if (responeCode >= 400) {
      Serial.println("Can't connect to server...");
    } else if (responeCode >= 200 && responeCode  <300){
      Serial.println("Refresh device successful.");
      Serial.println(http.getString());
    }
    
}

// create HTTP Post Request Object
void httpPostRequest(const char *apiPath, float temp, float humi){
    WiFiClient client;
    HTTPClient http;
    http.begin(client, apiPath);
    http.addHeader("Content-Type", "application/json");

    // Tạo payload để gửi đi
    String name = "\"name\":\"DHT11\"";
    String ip = "\"ip\":\"" + deviceIP + "\"";
    String tempStr ="\"temp\":\"" + String(temp) + "\"";
    String humiStr ="\"humi\":\"" + String(humi) + "\"";
    String attachTo = "\"attachTo\":\"" + deviceId + "\"";
    String payload = "{" + name + "," + ip + "," + tempStr + "," + humiStr + "," + attachTo + "}";

    Serial.println("Gửi dữ liệu từ sensor.");
    int httpResponeCode = http.POST(payload);
  
     if(httpResponeCode  >= 200 && httpResponeCode < 300){
        Serial.println("Gửi dữ liệu từ sensor lên sserver thành công");
        Serial.print("Respone code: ");
        Serial.println(httpResponeCode);
        Serial.println();
        // get the payload

    } else {
        Serial.println("Can't update SENSOR DATA to server");
        Serial.print("Error code: ");
        Serial.println(httpResponeCode);
    }

    http.end();
}


void setup() {
  // put your setup code here, to run once:
  dht.begin();
  Serial.begin(9600);
  
  WiFi.begin(ssid, password);
  Serial.println("Connecting to " + ssid + "...");
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");    
  }
  Serial.println("Connecting successful.");
  Serial.print("Your IP is: ");
  deviceIP = WiFi.localIP().toString();
  Serial.println(deviceIP);

  // đăng ký thiết bị lên server

  Serial.println();
  while(!registerDevice(updateDeviceApi)){
    delay(1000);
    Serial.print(".");
  }

  Serial.println("Connect to server successful.");
  Serial.println("Your device ID is: " + deviceId);

  brokerClient.setServer(mqttServer, 1883);
  brokerClient.setCallback(callback);
  
}

void reconnect(){
  String clientId = "Nhom2Wemos";
  while(!brokerClient.connected()){
    Serial.print("Attempting MQTT connection...");
     if(brokerClient.connect(clientId.c_str())){
        Serial.println("connected");
        brokerClient.subscribe(topicLeds);
      } else {
      Serial.print("failed, rc=");
      Serial.print(brokerClient.state());
      Serial.println(" try again in 2 seconds");
      // Wait 5 seconds before retrying
      delay(2000);
    }
  } 
}

void loop() {
  while(!brokerClient.connected()){
    reconnect();
  }

  brokerClient.loop();
  
  // put your main code here, to run repeatedly
  if(millis() - lastRefreshTime > refreshDelay){
     refreshDevice(refreshApi);
     lastRefreshTime = millis();
  }

  delay(500);
  float temp = dht.readTemperature();
  float humi = dht.readHumidity();

  if(isnan(humi) || isnan(temp)){
    Serial.println("Failed to read from DHT sensor!");
    return;  
  }
 

  if(millis() - lastUpdateTime > updateDelay){
      if(WiFi.status() == WL_CONNECTED){
          
          httpPostRequest(updateDhtApi, temp, humi);
      } else {
        Serial.println("WiFi disconnect!");
      }

     lastUpdateTime = millis();
  }

}
