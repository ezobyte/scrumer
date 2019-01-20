import { ThemeProvider } from "@material-ui/styles";
import { inject, observer } from "mobx-react";
import * as React from "react";
import "./App.css";
import Menu from "./components/Menu";
import { appTheme } from "./shared/withRoot";
import "./store/TRootStore";
import { IRootStore } from "./store/TRootStore";
import { Test } from "./Test";

interface AppProps {
  rootStore?: IRootStore;
}

@inject("rootStore")
@observer
class App extends React.Component<AppProps> {
  public render() {
    return (
      <ThemeProvider theme={appTheme}>
        <div className="App">
          <Menu activeItem={this.props.rootStore!.layout!.activeItem} />
          <Test />

          {/* <MyChart chartData={this.props.rootStore!.chartData.dataSet}/>*/}
          <div>{this.props.rootStore!.chartData.dataSet.length} </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
