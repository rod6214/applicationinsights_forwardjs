const transformers = require('./transformers');
const fs = require('fs');

const tree = (input, callback, key = null, obj = null) => {
    if (typeof input === 'object') {
        const keys = Object.keys(input);
        
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = input[key];
            tree(value, callback, key, input);
        }
    }
    
    if (typeof callback === 'function') {
        callback(input, key, obj);
    }
}

const mapValuesToJsonTemplate = (data, params) => {

    tree(data, (keyName, keyType, obj) => {
    
        if (keyType === 'key') {
            const element = params.find(x => x[keyName] != null);
            
            if (element) {
                obj['value'] = element[keyName];
            }
        }
        else if (keyType !== 'key' && keyType !== 'type' && keyType !== 'value' 
        && keyType !== 'custom_transform' && keyType) {
            
            let value = obj[keyType]['value'];
            
            if (value != null) {
                
                const custom = obj[keyType]['custom_transform'];
                const type = obj[keyType]['type'];
    
                if (custom) {
                    if (typeof transformers[custom] === 'function') {
                        value = transformers[custom](value);
                    }
                    else {
                        throw new Error(`Function the given custom type ${custom} doesn't exist`);
                    }
                }
                else if (type === 'string' || type === 'number' || type === 'boolean') {

                    if (typeof transformers[`${type}Transform`] === 'function') {
                        value = transformers[`${type}Transform`](value);
                    }
                    else {
                        throw new Error(`Function the given type ${type} doesn't exist`);
                    }
                }
                else {
                    throw new Error(`The property ${keyType} should have a valid type`);
                }
        
                obj[keyType] = value;
            }
        }
    });
}

const watcher = (inputFile, callback, interval) => {
    const queue = [];

    let text = '';

    setInterval(() => {
        if (queue.length > 0) {
            const data = queue.pop();
            callback(data)
        }
    }, interval);

    fs.watch(inputFile, (eventName, filename) => {

        if(filename){
            if (eventName === "change")
            {
                file = fs.readFileSync(inputFile);
    
                const content = file.toString();
                
                if (content && content !== text)
                {
                    text = content;

                    const lines = text.split('\n');

                    let lastLine = lines[lines.length - 1];

                    if (!lastLine && lines.length > 1)
                    {
                       lastLine = lines[lines.length - 2].replace('\n', '');
                    }

                    if (lastLine)
                        queue.push(lastLine);
                }
            }
        }
        else{
            throw new Error('filename not provided or check file access permissions');
        }
    });
}

module.exports = {
    tree,
    mapValuesToJsonTemplate,
    watcher
}
