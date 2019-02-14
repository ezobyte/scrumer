import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { TChartData } from "./TChart";
import { TLayout } from "./TLayout";
import {TSprint, TSprintList} from "./TScrum";
import { TMembers } from "./TTeam";

const TRootStore = types.model({
  chartData: types.optional(TChartData, {}),
  sprint: types.maybe(TSprint),
  scrum:types.optional(TSprintList,() => TSprintList.create()),
  team: types.optional(TMembers, () => TMembers.create()),
  layout: types.optional(TLayout, () => TLayout.create())
});

export default TRootStore;

export interface IRootStore extends Instance<typeof TRootStore> {}

export interface IRootStoreSnapshotIn extends SnapshotIn<typeof TRootStore> {}

export interface IRootStoreSnapshotOut extends SnapshotOut<typeof TRootStore> {}
