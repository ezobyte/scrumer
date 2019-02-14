import { ChangeSet, EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableEditColumn,
  TableEditRow,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";
import { observer } from "mobx-react";
import * as React from "react";
import { BooleanTypeProvider } from "../../shared/components/Table/BooleanEditor";

const getRowId: <T extends IRow>(row: T) => number = row => row.id;

//const getRowId = (row: IRow) => row.id;

export interface IColumn {
  name: string;
  title: string;
  dataType?: string;
}

export interface IRow {
  id: number;
  // [key: string]: number | string;
}

export interface ITableEdit<T> {
  columns: IColumn[];
  booleanColumns: string[];
  rows: T[];
  update: (rows: T[]) => void;
}

interface ITableEditState<T> {
  rows: IRow[];
}

@observer
export default class TableEdit<T extends IRow> extends React.Component<
  ITableEdit<T>,
  ITableEditState<T>
> {
  private readonly commitChanges: (changeSet: ChangeSet) => void;

  constructor(props: ITableEdit<T>) {
    super(props);

    this.commitChanges = ({ added, changed, deleted }) => {
      if (added) {
        this.props.update(this.added(added, this.props.rows));
      }
      if (changed) {
        this.props.update(this.changed(changed, this.props.rows));
      }
      if (deleted) {
        this.props.update(this.deleted(deleted, this.props.rows));
      }
    };
  }

  private added = (added: any[], rows: T[]): T[] => {
    const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
    return [
      ...rows,
      ...added.map((row, index) => ({
        id: startingAddedId + index,
        ...row
      }))
    ];
  };

  private changed = (changed: {}, rows: T[]): T[] => {
    return rows.map((row: T) => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
  };

  private deleted = (deleted: (string | number)[], rows: T[]): T[] => {
    const deletedSet = new Set(deleted);
    return rows.filter((row: T) => !deletedSet.has(row.id));
  };

  public render() {
    return (
      <Paper>
        <Grid rows={this.props.rows} columns={this.props.columns} getRowId={getRowId}>
          <BooleanTypeProvider for={this.props.booleanColumns} />
          <EditingState onCommitChanges={this.commitChanges} defaultEditingRowIds={[0]} />
          <Table />
          <TableHeaderRow />
          <TableEditRow  />
          <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        </Grid>
      </Paper>
    );
  }
}
