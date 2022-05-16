class ChartsController {
    // GET /
    index(req, res, next) {
        var tittle = 'Charts';
        res.render('charts/show', { tittle });
    }
}

module.exports = new ChartsController();
