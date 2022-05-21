const dashboardRouter = require('./dashboard');
const mainRouter = require('./main');
const chartsRouter = require('./charts');
const logsRouter = require('./logs');
const updateRouter = require('./update.js');
const refreshRouter = require('./refresh.js');
const ledsRouter = require('./leds.js');
const loginRouter = require('./login.js');
const signUpRouter = require('./sign-up.js');

function route(app) {
    app.use('/dashboard', dashboardRouter);
    app.use('/main', mainRouter);
    app.use('/charts', chartsRouter);
    app.use('/logs', logsRouter);
    app.use('/update', updateRouter);
    app.use('/refresh', refreshRouter);
    app.use('/login', loginRouter);
    app.use('/sign-up', signUpRouter);
    app.use('/leds', ledsRouter);
    app.use('/', dashboardRouter);
}

module.exports = route;
