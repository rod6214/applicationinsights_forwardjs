
const ailognginx = require('./ailognginx');

var pattern = '$remote_addr [$time_local] $command "$app" "$name" "$args" - $bytes_received $bytes_sent "$pageurl" "$flashver" ($session_readable_time)'

ailognginx(null, './access.log', pattern);
