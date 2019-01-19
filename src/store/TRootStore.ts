import {Instance, SnapshotIn, SnapshotOut, types} from "mobx-state-tree";
import {TLayout} from "./layout";
import {TMembers} from "./TTeam";


const TBacklogItem = types.model("TMember", {
  name: types.string,
  estimation: types.number
});

export interface IBacklogItem extends Instance<typeof TBacklogItem> {}
export interface IBacklogItemSetSnapshotIn extends SnapshotIn<typeof TBacklogItem> {}

const TBacklog = types
  .model("TMember", {
    items: types.array(TBacklogItem)
  })
  .actions(self => ({
    addBacklogItem(item: IBacklogItem) {
      self.items.push(item);
    }
  }));

export interface IBacklog extends Instance<typeof TBacklog> {}
export interface IBacklogSetSnapshotIn extends SnapshotIn<typeof TBacklog> {}

const TSprint = types.model("TMember", {
  name: types.string,
  days: types.number,
  backlog: TBacklog
});

export interface ISprint extends Instance<typeof TSprint> {}
export interface ISprintSetSnapshotIn extends SnapshotIn<typeof TSprint> {}

const TDataItem = types.model("DataSet", {
  date: types.Date,
  name: types.string,
  value: types.number
});

export interface IDataItem extends Instance<typeof TDataItem> {}
export interface IDataSetSnapshotIn extends SnapshotIn<typeof TDataItem> {}

const TChartData = types
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

const RootStore = types.model({
  chartData: types.optional(TChartData, {}),
  sprint: types.maybe(TSprint),
  team: types.optional(TMembers, () => TMembers.create()),
  layout: types.optional(TLayout, () => TLayout.create())
});

export default RootStore;

export interface IRootStore extends Instance<typeof RootStore> {}

export interface IRootStoreSnapshotIn extends SnapshotIn<typeof RootStore> {}

export interface IRootStoreSnapshotOut extends SnapshotOut<typeof RootStore> {}
