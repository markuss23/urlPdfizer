/*
2022-03-10
wojkowski.free@gmail.com
*/
'use strict';


/*
vypis do logu s casem
*/
exports.log = function(msg){
  console.log(new Date().toISOString()+" "+msg);
}

exports.error = function(msg){
  console.error(new Date().toISOString()+" "+msg);
}
