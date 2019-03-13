import { inject, observer } from "mobx-react";
import * as React from "react";

import EdiTable, { IColumnEdiTable, InputType } from "../shared/components/Table/EdiTable";
import { IRootStore } from "../store/TRootStore";

interface ISprintsProps {
  rootStore?: IRootStore;
}

//***************EDITABLE4

const shouldBeReadOnly = (row: IRowTest<RowFields>): boolean => {
  return row.title != "Mrs";
};

enum RowFields {
  Title = "title",
  ForeName = "foreName",
  Surname = "surname",
  Employed = "employed",
  MaidenName = "maidenName"
}

const colSpec: IColumnEdiTable[] = [
  {
    title: "Title",
    fieldName: RowFields.Title,
    inputType: InputType.SelectField,
    selectOptions: ["Mr", "Mrs", "Miss", "Other"],
    width: 200,
    defaultValue: "Mr"
  },
  {
    title: "Name",
    fieldName: RowFields.ForeName,
    inputType: InputType.TextField,
    width: 200
  },
  {
    title: "Surname",
    fieldName: RowFields.Surname,
    inputType: InputType.TextField,
    width: 200
  },
  {
    title: "Maiden Name",
    fieldName: RowFields.MaidenName,
    inputType: InputType.TextField,
    width: 200,
    isReadOnly: shouldBeReadOnly
  },
  {
    title: "Employed",
    fieldName: RowFields.Employed,
    inputType: InputType.Toggle,
    width: 200
  }
];

type IRowTest<O extends RowFields> = { [o in O]: string | boolean };

const rowData: IRowTest<RowFields>[] = [
  {
    [RowFields.Title]: "Mr",
    [RowFields.ForeName]: "John",
    [RowFields.Surname]: "Smith",
    [RowFields.Employed]: true,
    [RowFields.MaidenName]: "",

  },
  {
    [RowFields.Title]: "Miss",
    [RowFields.ForeName]: "Emily",
    [RowFields.Surname]: "Lockhart",
    [RowFields.Employed]: false,
    [RowFields.MaidenName]: "",
  },
  {
    [RowFields.Title]: "Mrs",
    [RowFields.ForeName]: "Marilyn",
    [RowFields.Surname]: "Monroe",
    [RowFields.Employed]: true,
    [RowFields.MaidenName]: "",
  }
];

const onChange = (dataTable: IRowTest<RowFields>[]) => {
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
