/** Constants **/
import CONFIG from '../external/Constants'

/** Services **/
import Reader   from '../utils/Reader';
import Global   from './Global';

const reader = new Reader();

class PreProcessor {
  constructor() {
    this.getAllDatas = this.getAllDatas.bind(this);
  }

  //------------------------------------------------------------------------//
  //---------------------------------- Init --------------------------------//
  //------------------------------------------------------------------------//

  /** Get the projects from the API **/
  getProjectsFromAPI(){
    return new Promise((resolve,reject) => {

      reader.getCsv(CONFIG.projects, this.getDataFromProjectsFile)
          .then((allProjects) =>{
            resolve(allProjects);
          })
          .catch((error) =>{
            reject(error);
          });
    });
  }

  /** Initilize the data received from the API **/
  getDataFromProjects(projectSource, i){
    return new Promise((resolve,reject) => {

      reader.getCsv(projectSource[i].configfileurl, this.getAllDatas)
          .then((allDatasFromAPIwithLinks) =>{
            resolve(allDatasFromAPIwithLinks);
          })
          .catch((error) =>{
            reject(error);
          });
    });
  }

  //------------------------------------------------------------------------//
  //------------------------------- Projects -------------------------------//
  //------------------------------------------------------------------------//
  getDataFromProjectsFile(result){
    return result.data;
  }


  //------------------------------------------------------------------------//
  //---------------------------------- Data --------------------------------//
  //------------------------------------------------------------------------//

  /** Update all datas to the 'allDatasFromAPIwithLinks' value **/
  async getAllDatas(result){
    const allDatasFromAPIwithLinks = result.data;

    let generalData = {}; // Array of data with all the indicators we want

    // For each little objects on the big object
    for(let i=0; i<allDatasFromAPIwithLinks.length; i++) {

      // Control if the 'link' attribute in the object is not undefined
      if (allDatasFromAPIwithLinks[i].link !== undefined) {

        switch (allDatasFromAPIwithLinks[i].type) {
          // If there is a JSON file or if it is an API
          case "api":
          case "json": {
            const jsonGeneratedWithLink = await reader.getJson(allDatasFromAPIwithLinks[i]);
            generalData[allDatasFromAPIwithLinks[i].name] = jsonGeneratedWithLink;
          }
            break;
          // If there is a csv file
          case "csv": {
            const csvGeneratedWithLink = await reader.getCsv(allDatasFromAPIwithLinks[i].link, (result) => result.data);
            generalData[allDatasFromAPIwithLinks[i].name] = csvGeneratedWithLink;
          }
            break;
          default:
        }
      }
    }
    if(generalData.totalEvents !== undefined){
      let project = new Global(generalData);
      generalData = project.process();
    }
    // project1.process();
    //Abstract class ou if process
    /** TODO **/
    return generalData;
  }
}

export default PreProcessor;
