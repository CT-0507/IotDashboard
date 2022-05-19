const dashboardRouter = require('./dashboard');
const mainRouter = require('./main');
const chartsRouter = require('./charts');
const logsRouter = require('./logs');
const updateRouter = require('./update.js');
const refreshRouter = require('./refresh.js')

function route(app) {
    app.use('/dashboard', dashboardRouter);
    app.use('/main', mainRouter);
    app.use('/charts', chartsRouter);
    app.use('/logs', logsRouter);
    app.use('/update', updateRouter);
    app.use('/', dashboardRouter);
    app.use('/refresh', refreshRouter)
    
}

module.exports = route;
