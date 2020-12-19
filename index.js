const https = require('https');
const fs = require('fs');
const EventEmitter = require('events');
const base64 = require('base-64');
const { report, exit } = require('process');


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
      if (teamNumber.toString().length > 5) {console.log(new Error("Invalid Team Number (Example Format = #####)")); exit() ;}
      const response = await this._request('/teams?teamNumber=' + teamNumber,this.year);
      var json = JSON.parse(response);
      var output = json.teams;
      if (output == null || output == 0 || output == undefined) {console.log(new Error("This Team Number Does Not Exsist Within The Current Season")); exit() ;}
      return output[0];
   }


}


/*class frc extends EventEmitter {

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
            hostname: 'frc-api.firstinspires.org',
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

}*/


module.exports = ftc;
module.exports.ftc = ftc;
//module.exports.frc = frc;

