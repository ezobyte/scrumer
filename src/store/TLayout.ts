import { Instance, SnapshotIn, types } from "mobx-state-tree";

export const TLayout = types
  .model("TLayout", {
    activeItem: types.optional(types.string, "")
  })
  .actions(self => ({
    setActiveItem(item: string) {
      self.activeItem = item;
    }
  }));

export interface ILayout extends Instance<typeof TLayout> {}
export interface ILayoutSetSnapshotIn extends SnapshotIn<typeof TLayout> {}
