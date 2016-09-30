var characters = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ_";

//encryption function to produce a random 6 alphanumeric code. Duplicates are imminent as db grows.
function encrypt(){
  var code = '';
  
  for(i = 0; i < 6; i++){
    var seed = Math.floor((Math.random() * 59))
    code = characters[seed].toString() + code;
  }
  
  return code;
}

module.exports.encrypt = encrypt;
