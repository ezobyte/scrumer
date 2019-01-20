import { observer } from "mobx-react";
import * as React from "react";
import SprintTable from "./Table";
import Demo from "./TableEdit";

interface ISprintsProps {
  /*    Sprints?: IMembers;*/
}

@observer
class SprintsPage extends React.Component<ISprintsProps> {
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <SprintTable />;
          <Demo />
      </React.Fragment>
    );
  }
}

export default SprintsPage;
