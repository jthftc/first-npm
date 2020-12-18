const https = require('https');
const fs = require('fs');
const EventEmitter = require('events');
const base64 = require('base-64');
const { report } = require('process');

class ftc extends EventEmitter {

   constructor(username, token) {
      super();
      this.token = "Basic " + base64.encode(username + ":" + token);
      this.username = username;
      this.year = 2020;
      //console.log(this.token);
   }

   _request(endpoint, season) {
      return new Promise((resolve, reject) => {
         const options = {
            hostname: 'ftc-api.firstinspires.org',
            port: 443,
            path: '/v2.0/' + season + endpoint,
            method: 'GET',
            headers: {
               "content-type": "application/json",
               'Authorization': this.token
            }
          }
  
  
        const request = https.request(options, res => {
          res.on('data', response => {
              resolve(new TextDecoder("utf-8").decode(response));
          });
        });
  
        request.on('error', err => {
          reject(err);
        });

        request.end();
      });
    }

   async getTeam(teamNumber) {
      teamNumber = parseInt(teamNumber);
      if (teamNumber.toString().length > 5) {console.error("Invalid Team Number"); return;}
      const response = await this._request('/teams?teamNumber=' + teamNumber,this.year);
      var output = JSON.parse(response);
      return output.teams[0];
   }


}

module.exports = ftc;
