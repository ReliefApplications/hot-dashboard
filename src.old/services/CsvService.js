import Papa           from 'papaparse';

class CsvService {
  constructor() {
    this.getData   = this.getData.bind(this);
  }

  /** Get the CSV datas **/
  getData(url, callback) {
   return new Promise((resolve, reject) => {
     Papa.parse(url, {
      	download      : true,
        header        : true,
        dynamicTyping : true,
      	complete      : (results) => {
                          const data = callback(results);
                          resolve(data);
                        },
        error         : (error) => {
                          reject(error);
        }
      });
   });
  }
}

export default CsvService;
