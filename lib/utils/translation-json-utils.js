/* eslint-env node */
'use strict';

exports.getKeys = function(json)
{
  let flatObject = flattenObject(json);
  let keys = Object.keys(flatObject);
  return keys;
}

exports.getValues = function(language)
{
  let flatObject = flattenObject(language);
  let keys = Object.keys(flatObject);
  let values = keys.map( function(key){
    return flatObject[key];
  });
  return values;
}

exports.createObject = function(keys, values){
  let object = {};
  keys.forEach(function(key,index){
    let value = values[index];
    // Fix issue with json parsing html tags
    object[key] = value.replace(/<\\\//g, "</");
  });
  return object;
}


function flattenObject(ob) {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) == 'object') {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}
