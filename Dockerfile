FROM alpine
MAINTAINER Bailey "monokrome" Stoner <monokrome@monokro.me>

RUN apk update
RUN apk add gcc make musl-dev
RUN apk add ca-certificates
RUN apk add nodejs-current nodejs-current-dev nodejs-current-npm

ADD . /opt/web
WORKDIR /opt/web

RUN npm install
RUN npm run build

CMD ["npm", "run", "production"]
