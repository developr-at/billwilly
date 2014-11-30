#!/usr/bin/env bash

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y git npm nodejs-legacy mongodb-org
npm config set registry http://registry.npmjs.org/
npm install -g grunt-cli
npm install -g express-generator
cd /vagrant && npm install