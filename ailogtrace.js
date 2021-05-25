
const appInsights = require('./appInsights');
const { watcher } = require('./core');

const ailogtrace = (key, inputFile, interval = 1000) => {
    
    watcher(inputFile, (data) => {
        console.log(data);
    }, interval);
}

module.exports = ailogtrace;
