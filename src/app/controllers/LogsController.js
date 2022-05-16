class LogsController {
    // GET /
    index(req, res, next) {
        var tittle = 'Logs';
        res.render('Logs/show', { tittle });
    }
}

module.exports = new LogsController();
