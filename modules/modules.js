module.exports = function modules (app) {
    app.use('/data', require('./modules/aggregator/index'));
};