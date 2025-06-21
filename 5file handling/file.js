const fs = require('fs');

//to write a file we use following function where we pass the file name which we want to create and the text which we want to write in the file
fs.writeFileSync('./file.txt','this is a text file');
fs.writeFile('./file.txt','this is a text file', (err)=>{});

//to read a file we use the following function. in this following function we use the name of the file which we want to read and we pass the type in which we want to read the file(utf-8 is a general txt form so we can read it in general txt form)
let result = fs.readFileSync("./file.txt","utf-8");
console.log(result);
fs.readFile("./file.txt","utf-8",(err, result)=>{
    if(err){
        console.log("error:",err);
    }
    else{
        console.log(result)
    }
})

//to write new things on the same file without overwriting the old text which was already existed in the file, we use following function
//as it is clear that we sent two parameters in this function first is file name and second is the text whixh we want to append
fs.appendFileSync("./file.txt",`${Date.now()} hey there \n`);

//to copy a file into another file we use the following function. in the first parameter we pass the name of the file which we want to copy and in the second parameter we pass the name of the file which we want to create to store the copy of the data of the first file
fs.cpSync('./file.txt','./copy.txt');

//to delete a specific file we use following function, here we just pass the name of the file which we want to delete
fs.unlinkSync('copy.txt');

//to know details about a file we use the following function which is statSync-
console.log(fs.statSync('./file.txt'));