import Papa           from 'papaparse';

class CsvService {
  constructor() {
    this.getData   = this.getData.bind(this);
  }

  /** Get the CSV datas **/
  getData(url, callBack) {
   Papa.parse(url, {
    	download      : true,
      header        : true,
      dynamicTyping : true,
    	complete      : function(results) {
                        callBack(results);
                      }
    });
  }
}

export default CsvService;
