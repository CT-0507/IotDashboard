const mongoose = require('mongoose');
const Log = require('../../models/log.js');
const { mongooseToObject } = require('../../util/mongoose');
class LogsController {
    // GET /
    index(req, res, next) {
        var title = 'Logs';
        res.render('Logs/show', { title: title });
    }
    //DELETE /log/:id
    destroy(req, res, next) {
        Log.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    show(req, res, next) {
        let perPage = 6; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.query.page || 1;
        //let page = 1 || 1;
        var title = 'Logs';
        var logsObject = [];
        Log.find() // find tất cả các data
            .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .exec((err, logs) => {
                Log.countDocuments((err, count) => {
                    // đếm để tính có bao nhiêu trang
                    if (err) return next(err);
                    logs.forEach((log) => {
                        logsObject.push({
                            _id: log._id,
                            deviceId: log.deviceId,
                            ip: log.ip,
                            name: log.name,
                            sensor: log.sensor,
                            value: log.value,
                            createdAt: log.createdAt.toLocaleDateString(),
                        });
                    });
                    console.log(logsObject);
                    res.render('Logs/show', {
                        title: title,
                        logsObject: logsObject,
                        current: page,
                        pages: Math.ceil(count / perPage),
                    }); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
                });
            });
    }
    filter(req, res, next) {
        let perPage = 6; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.query.page || 1;
        //let page = 1 || 1;
        var title = 'Logs';
        var logsObject = [];
        console.log(req.query.q)
        Log.find({ $or: [ 
            {name: req.query.q},
            {ip: req.query.q},
            
        ] }) // find tất cả các data
            .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .exec((err, logs) => {
                Log.countDocuments((err, count) => {
                    // đếm để tính có bao nhiêu trang
                    if (err) return next(err);
                    logs.forEach((log) => {
                        logsObject.push({
                            _id: log._id,
                            deviceId: log.deviceId,
                            ip: log.ip,
                            name: log.name,
                            sensor: log.sensor,
                            value: log.value,
                            createdAt: log.createdAt.toLocaleDateString(),
                        });
                    });
                    console.log(logsObject);
                    res.render('logs/filter', {
                        title: title,
                        logsObject: logsObject,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        filterValue: req.query.q
                    }); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
                });
            });
    }
}

module.exports = new LogsController();
