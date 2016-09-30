#Shorty

##Url Shortner

npm and brew must been installed to run server on your computer.

Follow instruction in link: https://changelog.com/install-node-js-with-homebrew-on-os-x/

###Setup mongoDB & Server:

Follow instruction in link: http://www.bigspaceship.com/mongodb-on-mac/

git clone project in desired directory.

###In shorty directory

$ mkdir -p /data/db

###Running mongodb 

$ mongod --nojournal

###Setting up server

In another terminal

$ npm install

###Running server:

$ node server.js

###Running suite:

$ npm test
