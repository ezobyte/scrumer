import { ChangeSet, EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableEditColumn,
  TableEditRow,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";
import * as React from "react";
import {BooleanTypeProvider} from "./Table/BooleanEditor";

const getRowId = (row: Sprint) => row.id;

type Column = { name: string; title: string; dataType?: string };

type Sprint = { id: number; name: string; duration: number; dateRange: string };

interface ITableEdit {
  test?: "lala";
}

interface ITableEditState {
  columns: Column[];
  booleanColumns: string[];
  rows: Sprint[];
}

export default class Demo extends React.PureComponent<ITableEdit, ITableEditState> {
  private readonly commitChanges: (changeSet: ChangeSet) => void;
  constructor(props: ITableEdit) {
    super(props);

    this.state = {
      columns: [
        { name: "id", title: "Number" },
        { name: "name", title: "Sprint name" },
        { name: "duration", title: "Duration" },
        { name: "shipped", title: "Shipped", dataType: "boolean" }
      ],
      booleanColumns: ["shipped"],
      rows: [{ name: "first", duration: 1, dateRange: "1-2", id: 0 } as Sprint]
    };

    this.commitChanges = ({ added, changed, deleted }) => {
      let { rows } = this.state;
      if (added) {
        rows = this.added(added, rows);
      }
      if (changed) {
        rows = this.changed(changed, rows);
      }
      if (deleted) {
        rows = this.deleted(deleted, rows);
      }
      this.setState({ rows });
    };
  }
  private added = (added: any[], rows: Sprint[]) => {
    const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
    return [
      ...rows,
      ...added.map((row, index) => ({
        id: startingAddedId + index,
        ...row
      }))
    ];
  };

  private changed = (changed: {}, rows: Sprint[]) => {
    return rows.map((row: Sprint) => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
  };

  private deleted = (deleted: (string | number)[], rows: Sprint[]) => {
    const deletedSet = new Set(deleted);
    return rows.filter((row: Sprint) => !deletedSet.has(row.id));
  };

  public render() {
    const { rows, columns, booleanColumns } = this.state;

    return (
      <Paper>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <BooleanTypeProvider for={booleanColumns} />
          <EditingState onCommitChanges={this.commitChanges} defaultEditingRowIds={[0]} />
          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        </Grid>
      </Paper>
    );
  }
}
