//1)to check how many cores are there in my cpu processor
const os = require('os');
console.log(os.cpus().length);

//2)to know about how node.js processess different non-bloacking and blocking processes

//a)blocking code
const fs = require('fs');
console.log('1');
const data = fs.readFileSync('text.txt', 'utf-8');
console.log(data);
console.log('2');

//output of the above blocking code would be as follows:
//1
//file ka text
//2

//b)non-blocking code
const fs = require('fs');
console.log('1');
fs.readFile('text.txt', 'utf-8', (err, data) => {
    console.log(data);
});
console.log('2');
//output of the above non-blocking code would be as follows:
//1
//2
//file ka text



/*in simple words, blocking code stops the execution of the code until the file is read and then only it moves to the next line of code
whereas non-blocking code does not stop the execution of the code and moves to the next line of code and when the file is read, it executes the callback function*/