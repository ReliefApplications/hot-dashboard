import AbstractProject from './AbstractProject'

class RamaniHuria extends AbstractProject{
  constructor(generalData) {
    super(generalData);
    // this.functions.push("getPeopleTrained");
    // this.functions.push("getPeopleTrainedMonthly");
    this.functions.push("getAttendeesAndInstitutions");
  }

  process() {
    for (let i = 0; i < this.functions.length; i++) {
      //Calls every function
      this[this.functions[i]](this.data);
    }
    return this.data;
  }

  getAttendeesAndInstitutions(data) {
    console.log(data);
    let attendees = data.capacitybuilding.nbattendees;
    let attendeesArray = [];
    let res = {};
    let nbOfInstitutions = 0;
    // console.log("TEST DATE", (new Date(attendees[0]["End date"]).toUTCString().split(" ", 4).pop()));//Math.max.apply(this, attendees["End date"]));//attendees.filter(row => Math.max(row["End date"])));
    // for (let i = 0; i <= attendees.length; i++) {
    //   let date = (new Date(attendees[i]["End date"]).toUTCString())+"/"+(new Date(t["End date"]).getFullYear())
    //   attendeesArray.date
    // }
    
    for (let i = 2018; i >= 2017; i--) {
      let maxMonth = (i === 2018) ? 8 : 12;
      for (let j = maxMonth; j >= 1; j--) {
        let t = attendees.filter(row => (new Date(row["End date"]).getMonth() === j) && (new Date(row["End date"]).getFullYear() === i))[0];
        if (t) {
          data.capacitybuilding["attendeesAndInstitutions"] = {
            date:       (new Date(t["End date"]).getMonth()+1)+"/"+(new Date(t["End date"]).getFullYear()),
            nbattendees : t["Number attendees"],
            nbInstitutions : t["Number institutions"]
          };
        }
      // let tabSize = nbOfAttendees.length;
      // if (tabSize > 0) {
      //   let nbPerMonth = 0;
      //   while (tabSize > 0) {
      //     nbPerMonth += nbPeopleTrainedAMonth[tabSize - 1]["#people trained"];
      //     tabSize--;
      //   }
      //   monthlyDivisionData["data" + (12 - counter)] = {
      //     "label": month + "/" + i,
      //     "value": nbPerMonth
      //   };
      //   lastMonth = month;
      //   lastYear = i;
      //   counter++;
      }
    }
    return data;
    // let endDate = data.main["End date"]
  }

  /** Get the number of people trained by gender and in total **/
  getPeopleTrained(data) {
    let nbPeopleTrained = data.capacitybuilding.nbtrainings;
    let genderDivisionMen = 0;
    let genderDivisionWomen = 0;
    for (let i = 0; i < nbPeopleTrained.length; i++) {
      genderDivisionMen += nbPeopleTrained[i].male;
      genderDivisionWomen += nbPeopleTrained[i].female;
    }
    data.capacitybuilding["trainings"] = {
      men: genderDivisionMen,
      women: genderDivisionWomen,
      total: genderDivisionMen+genderDivisionWomen
    };
    return data;
  }

  /** Get the number of people trained monthly */
  getPeopleTrainedMonthly(data) {
    let nbPeopleTrained = data.capacitybuilding.nbtrainings;
    let getYearPattern = (month, year) => {
      return new RegExp('([0-9]{2})/' + month + '/' + year);   // French date format
    };
    const currentDate = (new Date());
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    let lastMonth = currentMonth;
    let lastYear = currentYear;
    let monthlyDivisionData = {};
    let counter = 0;
    for (let i = currentYear; i >= 2014 && counter < 12; i--) {
      let maxMonth = (i === currentYear) ? currentMonth + 1 : 12;
      for (let j = maxMonth; j >= 1 && counter < 12; j--) {
        let month = "";
        if (j <= 9)
          month = "0" + j;
        else
          month = j;
        let nbPeopleTrainedAMonth = nbPeopleTrained.filter(row => row.male !== 0 && row.date.match(getYearPattern(month, i)));
        let tabSize = nbPeopleTrainedAMonth.length;
        if (tabSize > 0) {
          let nbPerMonth = 0;
          while (tabSize > 0) {
            nbPerMonth += nbPeopleTrainedAMonth[tabSize - 1]["#people trained"];
            tabSize--;
          }
          monthlyDivisionData["data" + (12 - counter)] = {
            "label": month + "/" + i,
            "value": nbPerMonth
          };
          lastMonth = month;
          lastYear = i;
          counter++;
        }
      }
    }
    //In case there is not enough data, generation of empty months
    let month = lastMonth - 1;
    while (counter < 12) {
      if (month <= 9) {
        lastMonth = "0" + month;
      }
      else {
        lastMonth = month;
      }
      monthlyDivisionData["data" + (12 - counter)] = {
        "label": lastMonth + "/" + lastYear,
        "value": 0
      };
      month--;
      if (month <= 0) {
        lastYear--;
        month = 12;
      }
      counter++;
    }

    data.capacitybuilding["monthlyDivision"] = {
      data : monthlyDivisionData,
      title : "Monthly training (last 6 months)"
    };
    return data;
  }
}

export default RamaniHuria;
