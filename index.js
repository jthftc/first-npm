const https = require('https');
const fs = require('fs');
const EventEmitter = require('events');
const base64 = require('base-64');
const { report, exit } = require('process');

const AK = "AK";
const AZ = "AZ";
const AR = "AR";
const CA = "CA";
const CO = "CO";
const CT = "CT";
const DE = "DE";
const FL = "FL";
const GA = "GA";
const HI = "HI";
const ID = "ID";
const IL = "IL";
const IN = "IN";
const IA = "IA";
const KS = "KS";
const KY = "KY";
const LA = "LA";
const ME = "ME";
const MD = "MD";
const MA = "MA";
const MI = "MI";
const MN = "MN";
const MS = "MS";
const MO = "MO";
const MT = "MT";
const NE = "NE";
const NV = "NV";
const NH = "NH";
const NJ = "NJ";
const NM = "NM";
const NY = "NY";
const NC = "NC";
const ND = "ND";
const OH = "OH";
const OK = "OK";
const OR = "OR";
const PA = "PA";
const RI = "RI";
const SC = "SC";
const SD = "SD";
const TN = "TN";
const TX = "TX";
const UT = "UT";
const VT = "VT";
const VA = "VA";
const WA = "WA";
const WV = "WV";
const WI = "WI";
const WY = "WY";


class ftc extends EventEmitter {

   constructor(username, token) {
      super();
      this.token = "Basic " + base64.encode(username + ":" + token);
      this.username = username;
      this.year = 2020;
   }


   _request(endpoint, season) {
      return new Promise((resolve, reject) => {
         var str = ''; 
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
  
  
          const callback = function(request) {
            var str = ''; 
          
            request.on('data', function (chunk) {
              str += chunk;
            });

            request.on('error', err => {
               reject(err);
            });

            request.on('end', function () {
              resolve(JSON.parse(str));
            });
            
          }
          var req = https.request(options, callback);
          req.end();
      });
    }

    async searchTeams(query) {
      if (query == undefined) {console.log(new Error("No Query Provided (Format: String)")); exit() ;}
      var response = await this._request('/teams',this.year);
      var responsePages = response.pageTotal;
      var teams = [];
      for(var i=1; i<responsePages; i++) {
         var get = await this._request('/teams?page=' + i ,this.year);
         const result = [];
         var keys = Object.keys(get.teams);
         keys.forEach(function(key){
            var search = get.teams[key].nameFull;
            var search2 = get.teams[key].nameShort;
            if(search.includes(query) || search2.includes(query)) {
             result.push(get.teams[key]);
            }
         });
         teams = teams.concat(result);
      }
      return teams;
   }

   async getAllTeams() {
      var response = await this._request('/teams',this.year);
      var responsePages = response.pageTotal;
      var teams = [];
      for(var i=1; i<responsePages; i++) {
         var get = await this._request('/teams?page=' + i ,this.year);
         const result = [];
         var keys = Object.keys(get.teams);
         keys.forEach(function(key){
             result.push(get.teams[key]);
         });
         teams = teams.concat(result);
      }
      return teams;
   }

   async getTeamsByState(state) {
      if (state == undefined) {console.log(new Error("No State Provided (Class.StateName / Custom String of State/Prov 'XX')")); exit() ;}
      console.log(state);
      var response = await this._request('/teams?state=' + state,this.year);
      var responsePages = response.pageTotal;
      var teams = [];
      for(var i=1; i<responsePages; i++) {
         var get = await this._request('/teams?page=' + i + '&state=' + state,this.year);
         const result = [];
         var keys = Object.keys(get.teams);
         keys.forEach(function(key){
             result.push(get.teams[key]);
         });
         teams = teams.concat(result);
      }
      return teams;
   }

   async getTeam(teamNumber) {
      if (teamNumber == undefined || teamNumber == null) {console.log(new Error("Invalid Team Number (Example Format = #####)")); exit() ;}
      teamNumber = parseInt(teamNumber);
      if (teamNumber.toString().length > 5) {console.log(new Error("Invalid Team Number (Example Format = #####)")); exit() ;}
      const response = await this._request('/teams?teamNumber=' + teamNumber,this.year);
      var output = response.teams;
      if (output == null || output == 0 || output == undefined) {console.log(new Error("This Team Number Does Not Exsist Within The Current Season")); exit() ;}
      return output[0];
   }


}


module.exports = ftc;
module.exports.ftc = ftc;

module.exports.AK = AK;
module.exports.AZ = AZ;
module.exports.AR = AR;
module.exports.CA = CA;
module.exports.CO = CO;
module.exports.CT = CT;
module.exports.DE = DE;
module.exports.FL = FL;
module.exports.GA = GA;
module.exports.HI = HI;
module.exports.ID = ID;
module.exports.IL = IL;
module.exports.IN = IN;
module.exports.IA = IA;
module.exports.KS = KS;
module.exports.KY = KY;
module.exports.LA = LA;
module.exports.ME = ME;
module.exports.MD = MD;
module.exports.MA = MA;
module.exports.MI = MI;
module.exports.MN = MN;
module.exports.MS = MS;
module.exports.MO = MO;
module.exports.MT = MT;
module.exports.NE = NE;
module.exports.NV = NV;
module.exports.NH = NH;
module.exports.NJ = NJ;
module.exports.NM = NM;
module.exports.NY = NY;
module.exports.NC = NC;
module.exports.ND = ND;
module.exports.OH = OH;
module.exports.OK = OK;
module.exports.OR = OR;
module.exports.PA = PA;
module.exports.RI = RI;
module.exports.SC = SC;
module.exports.SD = SD;
module.exports.TN = TN;
module.exports.TX = TX;
module.exports.UT = UT;
module.exports.VT = VT;
module.exports.VA = VA;
module.exports.WA = WA;
module.exports.WV = WV;
module.exports.WI = WI;
module.exports.WY = WY;

//module.exports.frc = frc;

