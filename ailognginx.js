const { watcher } = require('./core');
const appInsights = require('./appInsights');

const ailognginx = async (key, inputFile, format, interval = 300) => {
    watcher(inputFile, (input) => {
        const data = appInsights.convertStringToRequest(format, input, './format.json');
        console.log(data);
    }, interval);
}

module.exports = ailognginx;
