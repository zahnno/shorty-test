**Shorty**

**Url Shortner**

npm and brew must been installed to run server on your computer.

Follow instruction in link: https://changelog.com/install-node-js-with-homebrew-on-os-x/

**Setup mongoDB & Server:**

Follow instruction in link: http://www.bigspaceship.com/mongodb-on-mac/

git clone project in desired directory.

**In shorty directory via terminal**

$ mkdir -p /data/db

**Running mongodb**

In terminal:

$ mongod --nojournal

**Setting up server**

In shorty dir on another terminal:

$ npm install

**Running server:**

$ node server.js

**Visit Web App**

Launch Web browser

In url field:

http://localhost:8080

**Running suite:**

In terminal:

$ npm test
