import covid19Estimator, { convertTimeToDays } from './estimator';
describe("Estimator tests", ()=> {
    const input ={
        region: {
        name: "Africa",
        avgAge: 19.7, avgDailyIncomeInUSD: 5, avgDailyIncomePopulation: 0.71
            },
          periodType: "days",
          timeToElapse: 58,
          reportedCases: 674,
          population: 66622705,
          totalHospitalBeds: 1380614
        }

    it("matches the return structure", ()=> {
        const output = {
            data:{},
            impact:{},
            severeImpact:{}
        }
        const outputKeys = Object.keys(output)
        const result = covid19Estimator(input);
        const resultKeys = Object.keys(result)
        expect(resultKeys).toEqual(outputKeys)
    })

    it("returns the right result for impact", ()=> {
        const result = covid19Estimator(input);
        const currentlyInfected = input.reportedCases * 10
        expect(result.impact.currentlyInfected).toEqual(currentlyInfected)
        const days = convertTimeToDays(input.periodType, input.timeToElapse)
        const currentlyInfectedInTimeBase =  Math.pow(2, Math.floor(days/3))
        expect(result.impact.infectionsByRequestedTime).toEqual(currentlyInfected * currentlyInfectedInTimeBase)
    })


    it("returns the right result for severeImpact", ()=> {
        const result = covid19Estimator(input);
        const currentlyInfected = input.reportedCases * 50
        expect(result.severeImpact.currentlyInfected).toEqual(currentlyInfected)
        const days = convertTimeToDays(input.periodType, input.timeToElapse)
        const currentlyInfectedInTimeBase =  Math.pow(2, Math.floor(days/3))
        expect(result.severeImpact.infectionsByRequestedTime).toEqual(currentlyInfected * currentlyInfectedInTimeBase)
    })


    describe("test convertTimeToDays", ()=> {
        it("returns the right number of days when weeks is passed", ()=> {
            const days = convertTimeToDays("weeks", 2);
            expect(days).toEqual(14)
        });

        it("returns the right number of days when months is passed", ()=> {
            const days = convertTimeToDays("months", 3);
            expect(days).toEqual(90);
        })
        
    })
})