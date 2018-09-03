import preProcessingService from "../preprocessor/PreProcessor";
import Global from "../preprocessor/Global";
import RamaniHuria from "../preprocessor/RamaniHuria";
import ProjectTest from "../preprocessor/ProjectTest";
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
      // console.log("PROCESSED DATA", projectsFromAPI);
    } catch (e) {
      console.error('preProcessing projects error', e);
    }
    // 2. Get the indicators
    try {
      for (let i = 0; i < projectsFromAPI.length; i++) {
        dataFromAPI[projectsFromAPI[i]["project name"]] = await
            this.preProcessingService.getDataFromProjects(projectsFromAPI, i);
      }
      // console.log("PROCESSED DATA", dataFromAPI);
    } catch (e) {
      console.error('preProcessing data error', e)
    }

    // 3. Data processing
    try {
      let project = {};
      for (let i = 0; i < projectsFromAPI.length; i++) {
        switch (projectsFromAPI[i]["project name"].toLowerCase()) {
          case "ramanihuria":
            project = new RamaniHuria(dataFromAPI.ramanihuria);
            dataFromAPI.ramanihuria = project.process();
            break;
          case "projecttest":
            project = new ProjectTest(dataFromAPI.projecttest);
            dataFromAPI.projecttest = project.process();
            break;
          default:
            break;
        }
      }
      project = new Global(dataFromAPI);
      dataFromAPI = project.process();
    } catch (e) {
      console.error('preProcessing data error', e)
    }

    // 4. Json saving in the bucket Amazon
    try {
      console.log("DATA", dataFromAPI);
      writer.setJson(dataFromAPI);
    }
    catch (e) {
      console.error('Writing the json file failed', e)
    }
  }
}
export default Preprocess;