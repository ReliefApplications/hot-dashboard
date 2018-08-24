class Global {
  constructor(generalData) {
    this.process(generalData);
  }

  process(generalData) {
    this.getUsageOfHotData(generalData);
    this.getTotalMapathons(generalData);
  }

  /** Get the number of total event per year **/
  getUsageOfHotData(generalData) {
    let getYearPattern = (year) => {
      return new RegExp(year + '-([0-9]{2})-([0-9]{2})');   // English date format
    };

    let usageOfHotData = {};
    for (let i = 2014; i <= 2018; i++) {
      usageOfHotData["data"+i] = generalData.totalEvents
          .filter(row => row.date && row.date.match(getYearPattern(i))).length;
    }

    generalData["usageOfHotData"] = usageOfHotData;
    return generalData;
  }


  /** Get the number of total mapathons **/
  getTotalMapathons(generalData) {
    let totalMapathons = generalData.totalEvents.length;
    generalData["totalMapathons"] = totalMapathons;
    return generalData;
  }
}

export default Global;
