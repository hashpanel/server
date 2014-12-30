# hashware-api

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

## Install Hashpanel

```sh
$ npm install hashpanel-api
```

## Install Docker Services

### 1. Redis
```sh
$ docker run --restart=always --name hashpanel-redis -P -d sameersbn/redis:latest

```

### 2. Postgres
```sh
$ docker run --restart=always --name hashpanel-postgres -P -e POSTGRES_PASSWORD=postgres -d postgres
$ psql -U postgres -h 0 -p 49154 -c "create user hashpanel with password 'hashpanel'"
$ psql -U postgres -h 0 -p 49154 -c "create database hashpanel"
$ psql -U postgres -h 0 -p 49154 -c "alter database hashpanel owner to hashpanel"
```

## Set Environment

### `.env`
```
REDIS_URL=redis://:@localhost:49153
DATABASE_URL=postgres://postgres:postgres@localhost:49154/hashpanel
```

[sails-logo]: http://cdn.tjw.io/images/sails-logo.png
[sails-url]: https://sailsjs.org
[npm-image]: https://img.shields.io/npm/v/hashware-api.svg?style=flat
[npm-url]: https://npmjs.org/package/hashware-api
[travis-image]: https://img.shields.io/travis/tjwebb/hashware-api.svg?style=flat
[travis-url]: https://travis-ci.org/tjwebb/hashware-api
[daviddm-image]: http://img.shields.io/david/tjwebb/hashware-api.svg?style=flat
[daviddm-url]: https://david-dm.org/tjwebb/hashware-api
