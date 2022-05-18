const dashboardRouter = require('./dashboard');
const mainRouter = require('./main');
const chartsRouter = require('./charts');
const logsRouter = require('./logs');
const updateRouter = require('./update.js')

function route(app) {
    app.use('/dashboard', dashboardRouter);
    app.use('/main', mainRouter);
    app.use('/charts', chartsRouter);
    app.use('/logs', logsRouter);
    app.use('/', dashboardRouter);
    app.use('/update', updateRouter);
}

module.exports = route;
