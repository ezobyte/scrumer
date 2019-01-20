import TRootStore from "./TRootStore";
import {IRootStoreSnapshotIn} from "./TRootStore";
import {Role} from "./TTeam";

export const crateRootStoreFromSnapshot = () => {
    const members = [
        { role: Role.PO, name: "PO name"},
        { role: Role.SM, name: "SM name"},
        { role: Role.Dev }
    ];
    const rootStoreSnapshotIn: IRootStoreSnapshotIn = {
        team : {
            members: members
        }
    };
    return TRootStore.create(rootStoreSnapshotIn);
};