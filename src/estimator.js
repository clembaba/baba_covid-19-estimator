
const getCurrentlyInfected = (reportedCases, factor) => {
    return reportedCases * factor
}

export const convertTimeToDays = (dateType, dateValue) => {
    switch(dateType) {
        case "days":
            return dateValue;
        case "weeks":
            return dateValue * 7;
        case "months":
            return dateValue * 30
        default:
            return 0;
    }
}

const covid19ImpactEstimator = (data) => {
    const impactCurrentlyInfected = getCurrentlyInfected(data.reportedCases, 10)
    const severeImpactCurrentlyInfected = getCurrentlyInfected(data.reportedCases, 50)
    const days = convertTimeToDays(data.periodType, data.timeToElapse)
    const currentlyInfectedInTimeBase =  Math.pow(2, Math.floor(days/3))
    console.log(severeImpactCurrentlyInfected)
    return {
    data: {},
    impact: {
        currentlyInfected: impactCurrentlyInfected,
        infectionsByRequestedTime: impactCurrentlyInfected * currentlyInfectedInTimeBase

    },
    severeImpact: {
        currentlyInfected: severeImpactCurrentlyInfected,
        infectionsByRequestedTime: severeImpactCurrentlyInfected * currentlyInfectedInTimeBase
    }
    }
};
export default covid19ImpactEstimator;
