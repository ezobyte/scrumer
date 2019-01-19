import {IDataItem} from "../store/model";

class ChartData {
    public static getChartData(): IDataItem[] {
        const data:IDataItem[] = [];
        for (let i = 1; i < 366; i++) {

            data.push({
                date: new Date(2018, 0, i),
                name: "name" + i,
                value: i
            });
        }
        return data
    }

}

export default ChartData;