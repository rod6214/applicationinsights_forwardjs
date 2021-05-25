
const argv = require('minimist')(process.argv.slice(2));
const ailognginx = require('./ailognginx');

const pattern = '$remote_addr [$time_local] $command "$app" "$name" "$args" - $bytes_received $bytes_sent "$pageurl" "$flashver" ($session_readable_time)'

function main(argv) {
    let key, input;
    
    key = argv['key'] || argv['k'];
    input = argv['in'];

    ailognginx(key, input, pattern);
}

main(argv);
