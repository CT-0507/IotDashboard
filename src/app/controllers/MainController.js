class MainController {
    // GET /
    index(req, res, next) {
        var tittle = 'Main';
        res.render('main/show', { tittle });
    }
}

module.exports = new MainController();
