import { ChangeSet, EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableEditColumn,
  TableEditRow,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";
import {observer} from "mobx-react";
import * as React from "react";
import { BooleanTypeProvider } from "./BooleanEditor";

const getRowId = (row: any) => row.id;

export interface IColumn {
  name: string;
  title: string;
  dataType?: string;
}

export interface IRow {
  id: number;
  [key: string]: number | string;
}

export interface ITableEdit {
  columns: IColumn[];
  booleanColumns: string[];
  rows: IRow[];
}

interface ITableEditState {
  rows: IRow[];
}

@observer
export default class TableEdit extends React.PureComponent<ITableEdit, ITableEditState> {
  private readonly commitChanges: (changeSet: ChangeSet) => void;

  constructor(props: ITableEdit) {
    super(props);

    this.state = {
      rows: this.props.rows
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
  private added = (added: any[], rows: any[]) => {
    const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
    return [
      ...rows,
      ...added.map((row, index) => ({
        id: startingAddedId + index,
        ...row
      }))
    ];
  };

  private changed = (changed: {}, rows: any[]) => {
    return rows.map((row: any) => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
  };

  private deleted = (deleted: (string | number)[], rows: any[]) => {
    const deletedSet = new Set(deleted);
    return rows.filter((row: any) => !deletedSet.has(row.id));
  };

  public render() {
    const { rows} = this.state;

    return (
      <Paper>
        <Grid rows={rows} columns={this.props.columns} getRowId={getRowId}>
          <BooleanTypeProvider for={this.props.booleanColumns} />
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
