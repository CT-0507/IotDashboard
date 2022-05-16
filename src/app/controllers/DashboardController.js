class DashboardController {
    // GET /
    index(req, res, next) {
        res.render('dashboard/dashboard');
    }
}

module.exports = new DashboardController();
