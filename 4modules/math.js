function add(a,b){
    return a+b;
};

function sub(a,b){
    return a-b;
}

module.exports = {sub,
                  add};

// also we can export functions as follows, directly when the functions are created:
//exports.add = (a,b) => a+b;
//exports.sub = (a,b) => a-b;