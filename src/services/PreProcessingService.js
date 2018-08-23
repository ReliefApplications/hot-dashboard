/** Constants **/
import * as constants from '../datas/Constants'

/** Services **/
import JsonService  from './JsonService';
import CsvService   from './CsvService';

const jsonService  = new JsonService();
const csvService   = new CsvService();

class PreProcessingService {
  constructor() {
    this.getAllDatas = this.getAllDatas.bind(this);
  }

  //------------------------------------------------------------------------//
  //---------------------------------- Init --------------------------------//
  //------------------------------------------------------------------------//

  /** Get the projects from the API **/
  getProjectsFromAPI(){
    return new Promise((resolve,reject) => {

      csvService.getData(constants.projects, this.getDataFromProjectsFile)
      .then((allProjects) =>{
        resolve(allProjects);
      })
      .catch((error) =>{
        reject(error);
      });
    });
  }


  /** Initilize the data receive from the API **/
  getDataFromProjects(projectSource, i){
    return new Promise((resolve,reject) => {

      csvService.getData(projectSource[i].configfileurl, this.getAllDatas)
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
    for(let i=0; i<allDatasFromAPIwithLinks.length; i++){

      // Control if the 'link' attribute in the object is not undefined
      if(allDatasFromAPIwithLinks[i].link !== undefined ){

        // If there is a json file (type : json or api)
        if(allDatasFromAPIwithLinks[i].type === "json" || allDatasFromAPIwithLinks[i].type === "api"){
          const jsonGeneratedWithLink = await jsonService.getData(allDatasFromAPIwithLinks[i].link);
          generalData[allDatasFromAPIwithLinks[i].name] = this.getPropByString(jsonGeneratedWithLink, allDatasFromAPIwithLinks[i].name);
        }
        // Else if there is a csv file (type: csb)
        else if(allDatasFromAPIwithLinks[i].type === "csv"){
          const csvGeneratedWithLink = await csvService.getData(allDatasFromAPIwithLinks[i].link, this.createNewCSVindicator);
          generalData[allDatasFromAPIwithLinks[i].name] = csvGeneratedWithLink;
        }
      }
    }

    if(generalData.totalEvents !== undefined){
      this.getUsageOfHotData(generalData);
      this.getTotalMapathons(generalData);
    }

    return generalData;
  }



  /** Get the property name in the new created array **/
  /** https://stackoverflow.com/questions/6906108/in-javascript-how-can-i-dynamically-get-a-nested-property-of-an-object **/
  getPropByString(object, propertyString) {  // propertyString  = name, name.lastname, etc..
    if (!propertyString)
        return null;

    var prop, props = propertyString.split('.');

    for (var i = 0; i < props.length - 1; i++) {
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


  //------------------------------------------------------------------------//
  //----------------------------------- CSV --------------------------------//
  //------------------------------------------------------------------------//

  /** Generate a new CSV array **/
  createNewCSVindicator(result){
    return result.data
  }

  //------------------------------------------------------------------------//
  //------------------------------- GETTERS --------------------------------//
  //------------------------------------------------------------------------//

  /** Get the number of total mapathons **/
  getTotalMapathons(generalData){
    let totalMapathons = generalData.totalEvents.length;
    generalData["totalMapathons"] = totalMapathons;
    return generalData;
  }

  /** Get the number of total event per year **/
  getUsageOfHotData(generalData){
    var getYearPattern = (year) => {
      return new RegExp(year+'-([0-9]{2})-([0-9]{2})');   // English date format
    };

    let numberOf2014 = generalData.totalEvents
    .filter(row => row.date && row.date.match(getYearPattern(2014))).length;

    let numberOf2015 = generalData.totalEvents
    .filter(row => row.date && row.date.match(getYearPattern(2015))).length;

    let numberOf2016 = generalData.totalEvents
    .filter(row => row.date && row.date.match(getYearPattern(2016))).length;

    let numberOf2017 = generalData.totalEvents
    .filter(row => row.date && row.date.match(getYearPattern(2017))).length;

    let numberOf2018 = generalData.totalEvents
    .filter(row => row.date && row.date.match(getYearPattern(2018))).length;

    let usageOfHotData = {
      data2014 : numberOf2014,
      data2015 : numberOf2015,
      data2016 : numberOf2016,
      data2017 : numberOf2017,
      data2018 : numberOf2018
    }

    generalData["usageOfHotData"] = usageOfHotData;
    return generalData;
  }
}

export default PreProcessingService;
