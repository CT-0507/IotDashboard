class ChartsController {
    // GET /
    index(req, res, next) {
        var title = 'Charts';
        res.render('charts/show', { title: title });
    }
}

module.exports = new ChartsController();
