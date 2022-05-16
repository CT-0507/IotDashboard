class LogsController {
    // GET /
    index(req, res, next) {
        res.render('Logs/show');
    }
}

module.exports = new LogsController();
