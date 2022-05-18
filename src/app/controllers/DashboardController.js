const mongoose = require('mongoose');
const Device = require('../../models/devices.js');

class DashboardController {
    // GET /

    async index(req, res, next) {
        const title = 'Dashboard';
        // Lấy dữ liệu từ database
        const devicesInfo = await Device.find();
        const devices = [];
        devicesInfo.forEach((result) => {
            let isAlive = true;
            let timeLeft =
                (new Date().getTime() - result.updatedAt.getTime()) / 1000;
            if (timeLeft > 300) {
                isAlive = false;
            }
            let updatedAt = result.updatedAt.toLocaleDateString();
            devices.push({
                name: result.name,
                imgUrl: result.imgUrl,
                updatedAt: updatedAt,
                isAlive: isAlive,
            });
        });

        console.log(devices);
        // var tittle = 'Dashboard';
        res.render('dashboard/dashboard', { devices: devices, title: title });
    }
}

module.exports = new DashboardController();
