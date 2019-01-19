import { observer } from "mobx-react";
import * as React from "react";

@observer
export class Test extends React.Component {
  public render = () => (
    <>
      <div>Playground Component</div>
    </>
  );
}
