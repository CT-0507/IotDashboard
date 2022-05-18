class LogsController {
    // GET /
    index(req, res, next) {
        var title = 'Logs';
        res.render('Logs/show', { title: title });
    }
}

module.exports = new LogsController();
