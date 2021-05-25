
const timestampTransform = (input) => {

    if (input) {
        const parcilDate = new Date(`${input}`.match(/\d{2}\/\w{3}\/\d{4}/)[0]);
        const parcialTime = `${input}`.match(/:\d{2}:\d{2}:\d{2}/)[0].replace(/:/, '');
        const parcialMillisecs = `${input}`.match(/\+\d{4}/)[0];
        // console.log(parcilDate)
        // return input;
        const date = parcilDate.toISOString();
        return date.replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z/, `${parcialTime}.${parcialMillisecs}Z`)
    }

    throw new Error('The timestamp property couldn\'t be converted');
}

const durationTransform = (input) => {
    
    if (input) {
        input = `${input}`.replace(/\D+/g, '');
        return Number(input);
    }
    
    throw new Error('The duration property couldn\'t be converted');
}

const numberTransform = (input) => {
    return Number(input);
}

const booleanTransform = (input) => {
    return Boolean(input);
}

const stringTransform = (input) => {
    return `${input}`;
}

module.exports = {
    timestampTransform,
    numberTransform,
    booleanTransform,
    stringTransform,
    durationTransform
};
