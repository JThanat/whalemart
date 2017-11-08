FROM node:8.9.0

COPY .angular-cli.json \
  karma.conf.js \
  package.json \
  protractor-ci.conf.js \
  protractor.conf.js \
  proxy-config.json \
  tsconfig.json \
  tslint.json \
  yarn.lock \
  /frontend-webapp/

WORKDIR /frontend-webapp
RUN yarn install --frozen-lockfile --non-interactive

CMD ["yarn", "start"]
