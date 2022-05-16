class DashboardController {
    // GET /
    index(req, res, next) {
        var tittle = 'Dashboard';
        res.render('dashboard/dashboard', { tittle });
    }
}

module.exports = new DashboardController();
