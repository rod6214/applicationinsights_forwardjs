const { watcher } = require('./core');
const appInsights = require('./appInsights');

const ailognginx = async (key, inputFile, format, interval = 300) => {
    watcher(inputFile, (input) => {
        console.log(input);
        const data = appInsights.convertStringToRequest(format, input, './format.json');
        const ai = appInsights.create(key);
        ai.trackTrace(data);
    }, interval);
}

module.exports = ailognginx;
