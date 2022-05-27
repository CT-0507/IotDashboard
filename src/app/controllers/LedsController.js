const mqtt  = require('mqtt')

// địa chỉ của broker
const url = 'mqtt:172.31.250.16'
const topic = 'leds' 

// topic của broker
const topicLed1 = 'led1'
const topicLed2 = 'led2'

var client = mqtt.connect(url)
client.on('connect', function() {
    console.log(`Connect to mqtt broker  on ${url}:1883.`)
})

class LedsController {
    // POST led 1
    leds(req, res, next){
        if(req.body ==   undefined){
            console.log('POST /leds ERROR undefiend body')
            res.status(400).send({status: 'ERROR'})
        }
        console.log(req.body)
        const data = req.body.data
        console.log(data.led1)
        console.log(data.led2)
        let msg = ''

        Object.keys(data).forEach(function(key){
            if(data[key] == 'on') msg +='1'
            else msg += '0'
        })
        console.log(msg)
        client.publish(topic, msg);
        res.status(200).send({status: 'OK'})

    }

    // Không dùng đóng dưới đây
    led1(req, res, next) {
        if(req.body ==   undefined){
            console.log('POST leds/led1 ERROR undefiend body')
            res.status(400).send({})
        }
        // let msg = {}

        // Object.keys(req.body).forEach(function(prop){
        //     if(req.body[prop] == '')
        // })
        
    

        if (req.body.led1 === 'on') {
            client.publish(topicLed1, req.body.led1)
            res.send({ status: 'Ok', led1: 'on' });
        } else {
            client.publish(topicLed1, req.body.led1)
            res.send({ status: 'Ok', led1: 'off' });
        }
    }

    // POST led2
    led2(req, res, next) {
        if(req.body ==   undefined){
            console.log('POST leds/led1 ERROR undefiend body')
        }

        if (req.body.led2 === 'on') {
            client.publish(topicLed2, req.body.led2)
            res.send({ status: 'Ok', led2: 'on' });
        } else {
            client.publish(topicLed2, req.body.led2)
            res.send({ status: 'Ok', led2: 'off' });
        }
    }
}

module.exports = new LedsController();
