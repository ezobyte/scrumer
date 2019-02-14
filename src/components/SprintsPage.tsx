import {inject, observer} from "mobx-react";
import * as React from "react";

import EdiTable, {IColumnEdiTable, InputType} from "../shared/components/Table/EdiTable";
import {IRootStore} from "../store/TRootStore";

interface ISprintsProps {
  rootStore?: IRootStore;
}

//***************EDITABLE4

interface IRowEdiTable {
  title: string;
  foreName: string;
  surname: string;
  employed: boolean;
}

const shouldBeReadOnly = (row: IRowEdiTable): boolean => {
  return row.title != "Mrs";
};

const colSpec: IColumnEdiTable[] = [
  {
    title: "Title",
    fieldName: "title",
    inputType: InputType.SelectField,
    selectOptions: ["Mr", "Mrs", "Miss", "Other"],
    width: 200,
    defaultValue: "Mr"
  },
  { title: "Name", fieldName: "foreName", inputType: InputType.TextField, width: 200 },
  { title: "Surname", fieldName: "surname", inputType: InputType.TextField, width: 200 },
  {
    title: "Maiden Name",
    fieldName: "maidenName",
    inputType: InputType.TextField,
    width: 200,
    isReadOnly: shouldBeReadOnly
  },
  { title: "Employed", fieldName: "employed", inputType: InputType.Toggle, width: 200 }
];

const rowData: IRowEdiTable[] = [
  { title: "Mr", foreName: "John", surname: "Smith", employed: true },
  { title: "Miss", foreName: "Emily", surname: "Lockhart", employed: false },
  { title: "Mrs", foreName: "Marilyn", surname: "Monroe", employed: true }
];

const onChange = (dataTable: IRowEdiTable[]) => {
  console.log(dataTable);
};
//***************

//type Sprint = { id: number; name: string; duration: number; dateRange: string };

/*const sprintTableColumns: IColumn[] = [
  { name: "id", title: "Number" },
  { name: "name", title: "Sprint name" },
  { name: "duration", title: "Duration" },
  { name: "shipped", title: "Shipped", dataType: "boolean" }
];*/

/*
  const rows: IRow[] = [{ name: "first", duration: 1, dateRange: "1-2", id: 0 }];
*/

/*const booleanColumns = ["shipped"];*/

@inject("rootStore")
@observer
class SprintsPage extends React.Component<ISprintsProps> {
  /*private updateSprints = (rows: ISprint[]) => {
    console.log(rows, this.props.rootStore);
    rows = rows.map(item => {
      item.id = Number(item.id);
      item.duration = Number(item.duration);
      return item;
    });
    this.props.rootStore!.scrum!.setSprints(rows as ISprint[]);
  };*/

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <EdiTable colSpec={colSpec} rowData={rowData} onChange={onChange} />
      </React.Fragment>
    );
  }
}

export default SprintsPage;
