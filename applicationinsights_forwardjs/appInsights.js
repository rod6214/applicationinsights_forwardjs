const appInsights = require("applicationinsights");
const { mapValuesToJsonTemplate } = require("./core");
const fs = require('fs');

class AppInsights 
{
    constructor(key) 
    {
        appInsights.setup(key)
            .setAutoDependencyCorrelation(true)
            .setAutoCollectRequests(false)
            .setAutoCollectPerformance(true, true)
            .setAutoCollectExceptions(true)
            .setAutoCollectDependencies(true)
            .setAutoCollectConsole(true)
            .setUseDiskRetryCaching(true)
            .setSendLiveMetrics(false)
            .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
            .start();
    
        this.client = appInsights.defaultClient;
    }
    
    static create (key) 
    {
        return new AppInsights(key);
    }

    static convertStringToRequest = (pattern, input, jsonTemplatePath) => {

        const data = JSON.parse(fs.readFileSync(jsonTemplatePath).toString());

        const variables = pattern.match(/\$\w+/g);

        const newPattern = pattern.replace('[', '\\[').replace(']', '\\]').replace('(', '\\(').replace(')', '\\)').replace(/\$\w+/g, '(.*)');

        const values = input.match(new RegExp(newPattern)).slice(1, variables.length + 1);

        const params = variables.map((vari, idx) => {
            const obj = {}
            obj[vari] = values[idx];
            return obj;
        });

        mapValuesToJsonTemplate(data, params);

        return data;
    }

    trackTrace = (message) => 
    {
        this.client.trackTrace({message});
        return this;
    }

    trackMetric = () => {}

    trackRequest = (data) => {
        
        // console.log(this.client.context.keys['customMy'])
        this.client.trackRequest({
            name: 'PUBLISH', 
            url: '', 
            duration: 300,
            properties: data,
            resultCode:200, 
            success:true});
    }
}

module.exports = AppInsights;
