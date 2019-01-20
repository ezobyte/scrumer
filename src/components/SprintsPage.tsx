import { observer } from "mobx-react";
import * as React from "react";
import SprintTable from "./Table";
import TableEdit, { IColumn, IRow } from "./Table/TableEdit";

interface ISprintsProps {
  /*    Sprints?: IMembers;*/
}

//type Sprint = { id: number; name: string; duration: number; dateRange: string };

const sprintTableColumns: IColumn[] = [
  { name: "id", title: "Number" },
  { name: "name", title: "Sprint name" },
  { name: "duration", title: "Duration" },
  { name: "shipped", title: "Shipped", dataType: "boolean" }
];

const rows: IRow[] = [{ name: "first", duration: 1, dateRange: "1-2", id: 0 }];

const booleanColumns = ["shipped"];

@observer
class SprintsPage extends React.Component<ISprintsProps> {
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <SprintTable />;
        <TableEdit booleanColumns={booleanColumns} columns={sprintTableColumns} rows={rows} />
      </React.Fragment>
    );
  }
}

export default SprintsPage;
