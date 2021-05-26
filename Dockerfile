FROM alpine:latest

RUN	apk update		&&	\
	apk add --update nodejs nodejs-npm

ADD applicationinsights_forwardjs \
    /

RUN npm install

ENTRYPOINT ["node", "index", \
            "--access_log_in", "/opt/nginx/logs/access.log", \ 
            "--error_log_in", "/opt/nginx/logs/error.log"]
