class MainController {
    // GET /
    index(req, res, next) {
        res.render('main/show');
    }
}

module.exports = new MainController();
