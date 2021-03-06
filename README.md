<img src="https://raw.githubusercontent.com/jthftc/first-npm/main/logo.png" width="450" title="hover text">

The `first-npm` package is mainly for ultilizing the FIRST Robotics API in a Node.JS environment.

Follow [@javathehutts](https://twitter.com/javathehutts) on Twitter for important
announcements.

## Installation

To install prebuilt `first-npm` binaries, use [`npm`](https://docs.npmjs.com/):

```sh
npm install first-npm --save
```

## Programmatic usage

If you require `first-npm` inside
your **Node Application** this to spawn an `first-npm` reference from inside your Node scripts:

```javascript
//Spawn the first-npm Node module within your Node script
const First = require("first-npm");

//Used to login to the FIRST Robotics API (More Information Below)
const ftc = new First("username", "API-Key");

//Grab the information associated with the team #14725 (Java The Hutts)
ftc.getTeam(14725).then((response) => {
  console.log(response);
});
```

Get your FIRST Robotics `username` and `API-Key` from the [FTC](https://ftc-events.firstinspires.org/services/API) and [FRC](https://frc-events.firstinspires.org/services/API) API request pages respectively

## License

[MIT](https://github.com/electron/electron/blob/master/LICENSE)

When using the `first-npm` or other GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).
