const dashboardRouter = require('./dashboard');
const mainRouter = require('./main');
const chartsRouter = require('./charts');
const logsRouter = require('./logs');

function route(app) {
    app.use('/dashboard', dashboardRouter);
    app.use('/main', mainRouter);
    app.use('/charts', chartsRouter);
    app.use('/logs', logsRouter);
    app.use('/', dashboardRouter);
}

module.exports = route;
