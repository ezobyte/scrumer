import { Instance, SnapshotIn, types } from "mobx-state-tree";

const TDataItem = types.model("DataSet", {
  date: types.Date,
  name: types.string,
  value: types.number
});

export interface IDataItem extends Instance<typeof TDataItem> {}
export interface IDataSetSnapshotIn extends SnapshotIn<typeof TDataItem> {}

export const TChartData = types
  .model("ChartData", {
    dataSet: types.array(TDataItem)
  })
  .actions(self => ({
    setData(dataSet: IDataItem[]) {
      self.dataSet.replace(dataSet);
    },
    addItem(item: IDataItem) {
      self.dataSet.push(item);
    }
  }));

export type IChartData = Instance<typeof TChartData>;
