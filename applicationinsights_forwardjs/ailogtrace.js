
const appInsights = require('./appInsights');
const { watcher } = require('./core');

const ailogtrace = async (key, inputFile, interval = 300) => {
    
    watcher(inputFile, (data) => {
        console.log(data);
    }, interval);
}

module.exports = ailogtrace;
