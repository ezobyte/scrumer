import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import ChartData from "./domain/ChartData";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import RootStore, {IRootStoreSnapshotIn, Role} from "./store/model";
import TT from "./T";

 const members = [
     { role: Role.BA, name: "BA name"},
     { role: Role.SM, name: "SM name"},
     { role: Role.Dev }
     ];
const rootStoreSnapshotIn: IRootStoreSnapshotIn = {
    team : {
        members: members
    }
};
const rootStore = RootStore.create(rootStoreSnapshotIn);
const chartData = ChartData.getChartData();
rootStore.chartData.setData(chartData);
export const StoreContext = React.createContext(rootStore);
window["t"] = new TT(rootStore);

ReactDOM.render(
  <Provider rootStore={rootStore}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
