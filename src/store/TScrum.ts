import {Instance, SnapshotIn, types} from "mobx-state-tree";


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

export const TSprint = types.model("TMember", {
    name: types.string,
    days: types.number,
    backlog: TBacklog
});

export interface ISprint extends Instance<typeof TSprint> {}
export interface ISprintSetSnapshotIn extends SnapshotIn<typeof TSprint> {}