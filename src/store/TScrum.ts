import {cast, Instance, SnapshotIn, types} from "mobx-state-tree";


const TBacklogItem = types.model("TBacklogItem", {
    name: types.string,
    estimation: types.number
});

export interface IBacklogItem extends Instance<typeof TBacklogItem> {}
export interface IBacklogItemSetSnapshotIn extends SnapshotIn<typeof TBacklogItem> {}

const TBacklog = types
    .model("TBacklog", {
        items: types.array(TBacklogItem)
    })
    .actions(self => ({
        addBacklogItem(item: IBacklogItem) {
            self.items.push(item);
        }
    }));

export interface IBacklog extends Instance<typeof TBacklog> {}
export interface IBacklogSetSnapshotIn extends SnapshotIn<typeof TBacklog> {}

export const TSprint = types.model("TSprint", {
    id:types.number,
    name: types.string,
    duration: types.number,
  //  dateRange:types.string,

});

export interface ISprint extends Instance<typeof TSprint> {}
export interface ISprintSetSnapshotIn extends SnapshotIn<typeof TSprint> {}

export const TSprintList = types.model("TSprintList", {
    sprints: types.array(TSprint)
}).actions(self => ({
    addEmptySprint() {
        self.sprints.push( <ISprint>{})
    },
    setSprints(sprints:ISprint[]) {

        self.sprints = cast(sprints);
    },
    addSprint(sprint:ISprint) {
        self.sprints.push(sprint)
    },
    removeSprint(id:number){
        self.sprints.splice(self.sprints.findIndex(item => item.id === id), 1);
    }
}));

export interface ISprintList extends Instance<typeof TSprintList> {}
export interface ISprintListSetSnapshotIn extends SnapshotIn<typeof TSprintList> {}
