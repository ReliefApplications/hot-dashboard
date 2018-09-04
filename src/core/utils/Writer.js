import CONFIG from "../external/Constants";

class Writer {
  constructor() {
    this.setJson   = this.setJson.bind(this);
  }
  /** Set the JSON datas **/
  setJson(data) {
    return (async () => {
      await fetch(CONFIG.awsBucket, {
        method: 'PUT',
        body: JSON.stringify(data)})
          .then(function (resp) {
            console.log('Request success!');
          })
          .catch(function (error) {
            console.log('Request failure: ', error);
          });
    })();
  }

}
export default Writer;