import Papa           from 'papaparse';

class Reader {
  constructor() {
    this.getCsv   = this.getCsv.bind(this);
    this.getJson   = this.getJson.bind(this);
  }

  /** Get the CSV datas **/
  getCsv(url, callback) {
    return new Promise((resolve, reject) => {
      Papa.parse(url, {
        download      : true,
        header        : true,
        dynamicTyping : true,
        complete      : (results) => {
          resolve(callback(results));
        },
        error         : (error) => {
          reject(error);
        }
      });
    });
  }

  /** Get the JSON datas **/
  getJson(config) {
    const url = config.link;
    const name = config.name;
    return fetch(url)
        .then((Response)=> Response.json())
        .then((findResponse)=>{
          return this.getPropByString(findResponse, name);
        });
  }

  /** Get the property name in the new created array **/
  /** https://stackoverflow.com/questions/6906108/in-javascript-how-can-i-dynamically-get-a-nested-property-of-an-object **/
  getPropByString(object, propertyString) {  // propertyString  = name, name.lastname, etc..
    if (!propertyString)
      return null;

    var prop, props = propertyString.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i];

      var candidate = object[prop];
      if (candidate !== undefined) {
        object = candidate;
      } else {
        break;
      }
    }
    return object[props[i]]; // return you object with
  }

}

export default Reader;