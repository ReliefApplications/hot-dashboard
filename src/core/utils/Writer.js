import CONFIG from "../external/Constants";

class Writer {
  constructor() {
    this.setJson   = this.setJson.bind(this);
  }
  /** Set the JSON datas **/
  setJson(data) {
    // return (async () => {
    //   const rawResponse = await fetch(CONFIG.hotdata, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({slt: "c moi"})
    //   });
    //   const content = await rawResponse.json();
    //
    //   console.log(content);
    // })();


    // const url = CONFIG.hotdata;
    // return fetch(url)
    //     .then((Response)=> Response.json())
    //     .then((findResponse)=>{
    //     });


    // return fetch(url)
    //     .then((Response)=> Response.json())
    //     .then((findResponse)=>{
    //       return this.getPropByString(findResponse, name);
    //     });
  }

}
export default Writer;