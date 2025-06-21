const {sub , add} = require("./math.js");

console.log("the substraction of the two no. is :", sub(4,2));
console.log("the addition of two no. is :", add(4,2));

//1)or we can also write it as:
// const math = require("./math");
// console.log("the substraction of the two no. is :", math.sub(4,2));
// console.log("the addition of two no. is :", math.add(4,2));
//2) if the module.exports is written as module.exports = {subF : sub,addF : add};
// then we can write it as:
// const math = require("./math");
// console.log("the substraction of the two no. is :", math.subF(4,2));
// console.log("the addition of two no. is :", math.addF(4,2));
//3)and if we write it as module.exports = {subF : sub,addF : add};
//then we can write it as:
// const {subF , addF} = require("./math");
// console.log("the substraction of the two no. is :", subF(4,2));
// console.log("the addition of two no. is :", addF(4,2));

//note:- we can call or use variables and functions only by the key names of the functions or variables that we have exported.

