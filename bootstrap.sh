#!/usr/bin/env bash

apt-get update
apt-get install -y git npm nodejs-legacy
npm config set registry http://registry.npmjs.org/
npm install -g grunt-cli
npm install -g mean-cli
cd /vagrant && npm install