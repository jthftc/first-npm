![FirstNpm Logo](https://raw.githubusercontent.com/jthftc/jthftc.github.io/main/wp-content/uploads/elementor/thumbs/firstnpm2-p035r65fm6y9poa8z8ycx986j4qlq0bbghxd4ba27u.png)

The ```first-npm``` package is mainly for ultilziing the FIRST Robotics API in a Node.JS environment.

Follow [@javathehutts](https://twitter.com/javathehutts) on Twitter for important
announcements.


## Installation

To install prebuilt ``first-npm`` binaries, use [`npm`](https://docs.npmjs.com/):

```sh
npm install first-npm --save
```




## Programmatic usage

If you require `first-npm` inside
your **Node Application** this to spawn an ```first-npm``` reference from inside your Node scripts:

```javascript
//Spawn the first-npm Node module within your Node script
const first = require('ftc-npm');

//Used to login to the FIRST Robotics API
const ftc = new first("username","API-key"); 

//Grab the information associated with the team #14725 (Java The Hutts)
ftc.getTeam(14725).then(response => {
    console.log(response);
});
```


## License

[MIT](https://github.com/electron/electron/blob/master/LICENSE)

When using the ```first-npm``` or other GitHub logos, be sure to follow the [GitHub logo guidelines](https://github.com/logos).
