import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { TLayout } from "./layout";

export enum Role {
  Dev = "dev",
  SM = "sm",
  BA = "ba"
}
const TMember = types
  .model("TMember", {
    /*index: types.number,*/
    name: types.maybe(types.string),
    role: types.enumeration("Role", [Role.BA, Role.Dev, Role.SM]),
    participation: types.maybe(types.number)
  })
  .actions(self => ({
    setName(name: string) {
      self.name = name;
    },
    setRole(role: Role) {
      self.role = role;
    },
    setParticipation(participation: number) {
      self.participation = participation;
    }
  }));

export interface IMember extends Instance<typeof TMember> {}
export interface IMemberSetSnapshotIn extends SnapshotIn<typeof TMember> {}

const TMembers = types
  .model("TMembers", {
    members: types.array(TMember)
  })
  .actions(self => ({
    addMember(Member: IMember) {
      self.members.push(Member);
    },
    setMember(MemberToSet: IMember, index: number) {
      console.log("setMeber", MemberToSet, index);
      if (self.members[index]) {
        self.members[index] = MemberToSet;
      }
    },
    removeMember(index: number) {
      self.members.splice(index, 1);
    },
    popMember() {
      self.members.pop();
    }
  }))
  .views(self => ({
    getMember(index: number) {
      return self.members[index];
    }
  }));

export interface IMembers extends Instance<typeof TMembers> {}
export interface IMembersSetSnapshotIn extends SnapshotIn<typeof TMembers> {}

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
