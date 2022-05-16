import VacationModel from "../Models/VacationModel";

class ChartReport {

    public getChartParams(vacationsFollowers: VacationModel[]) {
        const chartVacationLocation = [];
        const chartAmountOfFollowers = [];
        let i = 0;
        while (i < vacationsFollowers?.length && vacationsFollowers[i].amountOfFollowers > 0) {
            chartVacationLocation[i] = vacationsFollowers[i].destination;
            chartAmountOfFollowers[i] = vacationsFollowers[i].amountOfFollowers;
            i++;
        }

        return { chartVacationLocation, chartAmountOfFollowers };
    }
}

const chartLogic = new ChartReport();

export default chartLogic