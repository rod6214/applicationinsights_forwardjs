
const timestampTransform = (input) => {

    if (input) {
        return input;
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
