import preProcessingService from "../preprocessor/PreProcessor";
import Global from "../preprocessor/Global";
import RamaniHuria from "../preprocessor/RamaniHuria";
import Writer from "../utils/Writer";

const writer = new Writer();

class Preprocess {
  constructor() {
    this.preProcessingService = new preProcessingService();
  }

  async process() {
    let projectsFromAPI = [];
    let dataFromAPI = {};

    //  1. Get the projects
    try {
      projectsFromAPI = await
        this.preProcessingService.getProjectsFromAPI();
    } catch (e) {
      console.error('preProcessing projects error', e);
    }

    // 2. Get the indicators
    try {
      for (let i = 1; i < projectsFromAPI.length; i++) {
        dataFromAPI[projectsFromAPI[i].projectname] = await
            this.preProcessingService.getDataFromProjects(projectsFromAPI, i);
      }
    } catch (e) {
      console.error('preProcessing data error', e)
    }

    // 3. Set the states received
    // this.setState({
    //   importedProjects: projectsFromAPI,
    //   importedIndicators: dataFromAPI
    // });
    // console.log('importedProjects   HOME', this.state.importedProjects);
    // console.log('importedIndicators HOME', this.state.importedIndicators);
    // console.log('projectName HOME', this.state.projectName);

    writer.setJson(dataFromAPI);
    // 3. Data processing
    // try {
    //   let project = [];
    //   for (let i = 1; i < projectsFromAPI.length; i++) {
    //     switch (projectsFromAPI[i].projectname) {
    //       case "Global": {
    //         project = new Global(dataFromAPI);
    //         dataFromAPI = project.process();
    //       }
    //         break;
    //       case "Ramanihuria": {
    //         project = new RamaniHuria(dataFromAPI);
    //         dataFromAPI = project.process();
    //       }
    //         break;
    //       default:
    //         break;
    //     }
    //     dataFromAPI[projectsFromAPI[i].projectname] = await
    //     preProcessingService.getDataFromProjects(projectsFromAPI, i);
    //   }
    // } catch (e) {
    //   console.error('preProcessing data error', e)
    // }
  }

}
export default Preprocess;