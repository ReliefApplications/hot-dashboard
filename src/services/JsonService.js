class JsonService {
  constructor() {
    this.getData = this.getData.bind(this);
  }

  /** Get the JSON datas **/
  getData(url) {
    return this.data = fetch(url).then((Response)=> Response.json()).then((findResponse)=>{
      return this.data = findResponse;
    });
  }
}

export default JsonService;
