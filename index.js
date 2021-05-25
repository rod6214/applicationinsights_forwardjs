
const argv = require('minimist')(process.argv.slice(2));
const ailognginx = require('./ailognginx');
const ailogtrace = require('./ailogtrace');

const pattern = '$remote_addr [$time_local] $command "$app" "$name" "$args" - $bytes_received $bytes_sent "$pageurl" "$flashver" ($session_readable_time)'

function main(argv) {
    let key, access_log_in, error_log_in;
    
    key = argv['key'] || argv['k'];
    access_log_in = argv['access_log_in'];
    error_log_in = argv['error_log_in'];

    ailognginx(key, access_log_in, pattern);
    ailogtrace(key, error_log_in);
}

main(argv);
