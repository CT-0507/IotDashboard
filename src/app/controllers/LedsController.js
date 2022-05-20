class LedsController {
    // POST led 1
    led1(req, res, next) {
        if (req.body.led1 === 'on') {
            res.send({ status: 'Ok', led1: 'on' });
        } else {
            res.send({ status: 'Ok', led1: 'off' });
        }
    }
    led2(req, res, next) {
        if (req.body.led2 === 'on') {
            res.send({ status: 'Ok', led2: 'on' });
        } else {
            res.send({ status: 'Ok', led2: 'off' });
        }
    }
}

module.exports = new LedsController();
