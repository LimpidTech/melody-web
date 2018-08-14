FROM alpine/alpine
MAINTAINER Bailey "monokrome" Stoner <polar@metanic.org>

RUN apk update
RUN apk upgrade
RUN apk add nodejs yarn

ADD . /opt/metanic/clients/web
WORKDIR /opt/metanic/clients/web

RUN yarn

CMD ["yarn", "start"]
