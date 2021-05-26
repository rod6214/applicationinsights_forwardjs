# Get Started

### To build
docker build --tag=test_sidecar .

### To build
docker run --rm -it --name ai --volumes-from <Your NGINX-RTMP> -e IKEY=<Instrumentation Key> test_sidecar

### To test locally
node index --key <Instrumentation Key> --access_log_in <shared folder>\access.log --error_log_in <shared folder>\error.log

### To evaluate anything inside the image
docker exec -it ai bin/ash