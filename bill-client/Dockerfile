FROM amd64/node:16

RUN mkdir -p /srv/app

COPY . /srv/app/
COPY ./yarn.lock /srv/app/yarn.lock

WORKDIR /srv/app

RUN yarn install --frozen-lockfile --registry https://registry.npm.taobao.org

RUN yarn build:web

EXPOSE 3000

ENTRYPOINT ["yarn", "web"]