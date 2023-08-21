module.exports = {
  "apps": [{
    "name": "glu-whiteboard",
    "script": "./server/server.js",// name of the startup file
    "env": {
      "PORT": "5001" // the port on which the app should listen
    }
    // for more options refer : http://pm2.keymetrics.io/docs/usage/application-declaration/#process-file
  }]
}
