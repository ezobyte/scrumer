import { TableHead } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/styles";
import React from "react";

let counter = 0;
function createData(nr: number, name: string, duration: string, dateRange: string) {
  counter += 1;
  return { number: counter, name, duration, dateRange };
}

const useStyles2 = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing.unit * 3
  },
  table: {
    maxWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
}));

function SprintTable() {
  const classes = useStyles2();
  const [rows] = React.useState([
    createData(1, "Project bootstrap", "1 Week", "1/19/2019 - 1/26/2019")
  ]);

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row" style={{ backgroundColor: "#e0e0e0" }}>
                Number
              </TableCell>
              <TableCell style={{ backgroundColor: "#c7c7c7" }}>Name</TableCell>
              <TableCell style={{ backgroundColor: "#e1e1e1" }}>Duration</TableCell>
              <TableCell style={{ backgroundColor: "#c7c7c7" }}>Date range</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.number}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ backgroundColor: "#f1efef" }}
                  align={"center"}
                  numeric
                >
                  {row.number}
                </TableCell>
                <TableCell style={{ backgroundColor: "#e0e0e0" }} align={"center"}>
                  {row.name}
                </TableCell>
                <TableCell numeric style={{ backgroundColor: "#f1efef" }} align={"center"}>
                  {row.duration}
                </TableCell>
                <TableCell numeric style={{ backgroundColor: "#e0e0e0" }} align={"center"}>
                  {row.dateRange}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

export default SprintTable;
