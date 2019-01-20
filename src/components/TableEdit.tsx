import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ChangeSet, DataTypeProvider, EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn
} from "@devexpress/dx-react-grid-material-ui";
import ValueFormatterProps = DataTypeProvider.ValueFormatterProps;

const getRowId = (row: Sprint) => row.id;

enum BooleanValues {
  Yes = "Yes",
  No = "No"
}

const BooleanFormatter = ({ value }: ValueFormatterProps) => (
  <Chip label={value ? BooleanValues.Yes : BooleanValues.No} />
);

interface IBooleanEditor {
  value: string;
  onValueChange: (value: boolean) => void;
}

const BooleanEditor = (props: IBooleanEditor) => (
  <Select
    input={<Input />}
    value={props.value ? BooleanValues.Yes : BooleanValues.No}
    onChange={event => props.onValueChange(event.target.value === BooleanValues.Yes)}
    style={{ width: "100%" }}
  >
    <MenuItem value={BooleanValues.Yes}>Yes</MenuItem>
    <MenuItem value={BooleanValues.No}>No</MenuItem>
  </Select>
);

interface IBooleanTypeProvider {
  for: string[];
}

const BooleanTypeProvider = (props: IBooleanTypeProvider) => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    editorComponent={BooleanEditor}
    {...props}
  />
);

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
        const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row
          }))
        ];
      }
      if (changed) {
        rows = rows.map((row: Sprint) => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      }
      if (deleted) {

        rows = this.deleted(deleted, rows);
      }
      this.setState({ rows });
    };
  }
  private deleted = (deleted: (string | number)[], rows:Sprint[]) => {
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
