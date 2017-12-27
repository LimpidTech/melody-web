FROM alpine
MAINTAINER Bailey "monokrome" Stoner <monokrome@monokro.me>

RUN apk update
RUN apk upgrade
RUN apk add gcc make musl-dev
RUN apk add ca-certificates
RUN apk add nodejs-current nodejs-current-dev nodejs-current-npm

ADD . /opt/web
WORKDIR /opt/web

RUN npm install
RUN npm run build

EXPOSE 3030

CMD ["npm", "run", "production"]
