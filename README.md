vulnerable-site
=====

A vulnerable site written to demonstrate some basic web attacks.

## Setup

### Requirements

- Node.js (tested on version 8.x)
- cowsay (if configuration is not changed)

### Steps

1. Clone the repo by running `git clone https://github.com/ucrcyber/vulnerable-site.git`
2. Change directory and install dependencies: `cd vulnerable-site && npm install`
3. Run the site: `node app.js`

The site can then be accessed at [http://localhost:3000](http://localhost:3000.

### Configuration

The app uses the NPM [`config`](https://www.npmjs.com/package/config) module for configuration files. The `PORT` environmental variable can also be used to specify the port number.

The database is regenerated on each launch of the application.
