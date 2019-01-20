import { Instance, SnapshotIn, types } from "mobx-state-tree";

export enum Role {
  Dev = "dev",
  SM = "sm",
  PO = "po"
}
const TMember = types
  .model("TMember", {
    /*index: types.number,*/
    name: types.maybe(types.string),
    role: types.enumeration("Role", [Role.PO, Role.Dev, Role.SM]),
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

export const TMembers = types
  .model("TMembers", {
    members: types.array(TMember)
  })
  .actions(self => ({
    addMember(Member: IMember) {
      self.members.push(Member);
    },
    setMember(MemberToSet: IMember, index: number) {
      if (self.members[index]) {
        self.members[index] = MemberToSet;
      } else {
        throw "Invalid member index";
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
