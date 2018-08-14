import * as constants from '../datas/Constants'

class JsonService {
  constructor() {
    this.getData = this.getData.bind(this);
  }

  /** Get the JSON datas **/
  getData() {
    return this.data = fetch(constants.aggregatedStats).then((Response)=> Response.json()).then((findresponse)=>{
      return this.data = findresponse;
    });
  }

}

export default JsonService;
