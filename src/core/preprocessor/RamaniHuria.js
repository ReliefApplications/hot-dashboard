import AbstractProject from './AbstractProject'

class RamaniHuria extends AbstractProject{
  constructor(generalData) {
    super(generalData);
    this.functions.push("getUsageOfHotData");
    this.functions.push("getTotalMapathons");
  }

  process() {
    for (let i = 0; i < this.functions.length; i++) {
      //Calls every function
      this[this.functions[i]](this.data);
    }
    return this.data;
  }

  /** Get the number of total event per year **/
  getUsageOfHotData(generalData) {
    let getYearPattern = (year) => {
      return new RegExp(year + '-([0-9]{2})-([0-9]{2})');   // English date format
    };

    let usageOfHotData = {};
    for (let i = 2014; i <= 2018; i++) {
      usageOfHotData["data"+i] = generalData.totalEvents
          .filter(row => row.date && row.date.match(getYearPattern(i))).length-10;
    }

    generalData["usageOfHotData"] = usageOfHotData;
    return generalData;
  }

  /** Get the number of total mapathons **/
  getTotalMapathons(generalData) {
    let totalMapathons = generalData.totalEvents.length/2;
    generalData["totalMapathons"] = totalMapathons;
    return generalData;
  }
}

export default RamaniHuria;
