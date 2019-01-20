import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import ChartData from "./domain/ChartData";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { crateRootStoreFromSnapshot } from "./store/initRootStore";

import T from "./T";

const rootStore = crateRootStoreFromSnapshot();

const chartData = ChartData.getChartData();
rootStore.chartData.setData(chartData);

export const StoreContext = React.createContext(rootStore);

window["t"] = new T(rootStore);

ReactDOM.render(
  <Provider rootStore={rootStore}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
