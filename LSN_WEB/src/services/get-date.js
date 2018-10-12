/* eslint-disable semi */
const moment = require('../../node_modules/moment/moment.js');

module.exports = {
    getToday() {
        let today = new Date();
        today = today.toISOString().substr(0, 10);

        return today;
    },
    formatDate(data) {
        const date = moment(data).format('YYYY-MM-DD');

        return date;
    },
    formatDateToLong(data) {
        const longDate = moment(data).unix();
        return longDate;
    }
};