class ChartsController {
    // GET /
    index(req, res, next) {
        res.render('charts/show');
    }
}

module.exports = new ChartsController();
