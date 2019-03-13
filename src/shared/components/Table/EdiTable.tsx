import { Select, Switch, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DemoteIcon from "@material-ui/icons/ArrowDropDown";
import PromoteIcon from "@material-ui/icons/ArrowDropUp";
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";
import { ChangeEvent, CSSProperties } from "react";
import { dataRowStyle, editableTableStyle, headerRowStyle } from "./EdiTableStyles";
import { IconButtonEdi } from "./IconButtonEdi";
import { SelectOption } from "./MenuItem";

export enum InputType {
  TextField = "TextField",
  SelectField = "SelectField",
  Toggle = "Toggle"
}

export interface IColumnEdiTable {
  defaultValue?: string | number;
  fieldName: string;
  inputType: InputType;
  isReadOnly?: (row: any) => boolean;
  selectOptions?: string[];
  title: string;
  width?: number;
}

export interface IEdiTable<T> {
  colSpec: IColumnEdiTable[];
  containerStyle?: CSSProperties;
  onChange?: (arg: T[]) => void;
  reorderable?: boolean;
  rowData: T[];
}


class EdiTable<T> extends React.Component<IEdiTable<T>, IEdiTable<T>> {
  constructor(props: IEdiTable<T>) {
    super(props);

    this.state = {
      colSpec: [],
      rowData: []
    };
  }

  public componentDidMount() {
    this.setState({
      colSpec: this.props.colSpec,
      onChange: this.props.onChange,
      rowData: [...this.props.rowData]
    });
  }

  public render() {
    return (
      <div style={this.state.containerStyle ? this.props.containerStyle : {}}>
        <div style={editableTableStyle}>
          {this.renderHeader()}
          {this.state.rowData.map((dataRow: T, i: number) => this.renderRow(dataRow, i))}
        </div>
      </div>
    );
  }

  private renderHeader() {
    return (
      <div style={headerRowStyle}>
        {this.state.colSpec.map((col: IColumnEdiTable) => (
          <div className={col.fieldName} key={col.fieldName} style={{ width: col.width }}>
            {col.title}
          </div>
        ))}
        <div style={{ width: "100px", height: 20 }}>
          <IconButtonEdi action={"add"} clickEvent={this.onAddRow} muiIcon={<AddIcon />} />
        </div>
      </div>
    );
  }

  private renderRow(dataRow: T, index: number) {
    return (
      <div key={index} style={dataRowStyle}>
        {this.state.colSpec.map((col: IColumnEdiTable) => (
          <div
            className={"cell " + col.fieldName}
            key={col.fieldName + index}
            style={{ width: col.width }}
          >
            {this.renderInputField(col, index, dataRow)}
          </div>
        ))}
        {this.renderRowButtons(index)}
      </div>
    );
  }

  private renderInputField(column: IColumnEdiTable, index: number, rowData: T): JSX.Element {
    if (column.isReadOnly && column.isReadOnly(rowData)) {
      return <div style={{ width: column.width }} />;
    }

    let inputFiled;

    switch (column.inputType) {
      case InputType.TextField:
        inputFiled = this.getTextFieldInput(column, index, rowData);
        break;
      case InputType.SelectField:
        inputFiled = this.getSelectInput(column, index, rowData);
        break;
      case InputType.Toggle:
        inputFiled = this.getSwitchInput(column, index, rowData);
        break;
      default:
        throw new Error("Input field type " + column.inputType + " not supported");
    }
    return inputFiled;
  }

  private getTextFieldInput(column: IColumnEdiTable, index: number, rowData: T) {
    return (
      <TextField
        id={column.fieldName + index}
        style={{ width: column.width }}
        value={column.fieldName in rowData ? rowData[column.fieldName] : ""}
        onChange={this.onTextFieldChange(index, column.fieldName)}
      />
    );
  }

  private getSelectInput(column: IColumnEdiTable, index: number, rowData: T) {
    return (
      <Select
        id={column.fieldName + index}
        style={{ width: column.width }}
        value={column.fieldName in rowData ? rowData[column.fieldName] : ""}
        onChange={this.onSelectFieldChange(index, column.fieldName)}
      >
        {column!.selectOptions!.map(
          (option: string, index: number): JSX.Element => (
            <SelectOption option={option} key={index} />
          )
        )}
      </Select>
    );
  }

  private getSwitchInput(column: IColumnEdiTable, index: number, rowData: T) {
    return (
      <Switch
        id={column.fieldName + index}
        checked={column.fieldName in rowData ? rowData[column.fieldName] : false}
        onChange={this.onSwitchFieldChange(index, column.fieldName)}
      />
    );
  }

  private renderRowButtons(index: number) {
    const buttons = [
      <IconButtonEdi
          key={index}
        rowKey={index}
        action={"delete"}
        clickEvent={() => {
          this.onDeleteRow(index);
        }}
        muiIcon={<DeleteIcon />}
      />
    ];

    if (this.props.reorderable) {
      if (index < this.state.rowData.length - 1 && this.state.rowData.length > 1) {
        buttons.push(
          <IconButtonEdi
            key={index}
            rowKey={index}
            action={"demote"}
            clickEvent={() => {
              this.onReorderRow(index, +1);
            }}
            muiIcon={<DemoteIcon />}
          />
        );
      }
      if (index > 0) {
        buttons.push(
          <IconButtonEdi
            rowKey={index}
            action={"promote"}
            clickEvent={() => {
              this.onReorderRow(index, -1);
            }}
            muiIcon={<PromoteIcon />}
          />
        );
      }
    }

    return <div>{buttons}</div>;
  }

  private onAddRow = () => {
    console.log("onAddRow Click");
    const tempDataRow: T[] = [...this.state.rowData];

    // TODO fix any
    const newRow = {};
    this.state.colSpec.map((column: IColumnEdiTable) => {
      console.log("column.fieldName", column.fieldName);
      return (newRow[column.fieldName] = column.defaultValue || "");
    });

    tempDataRow.push(newRow as T);

    this.setState({ rowData: tempDataRow });
    this.state.onChange!(tempDataRow);
  };

  private onDeleteRow = (rowId: number) => {
    const tempDataRow = [...this.state.rowData];
    tempDataRow.splice(rowId, 1);
    this.setState({ rowData: tempDataRow });
  };

  private onReorderRow = (rowId: number, direction: number) => {
    const tempDataRow = [...this.state.rowData];
    const oldIndex = rowId;
    const newIndex = rowId + direction;

    tempDataRow.splice(newIndex, 0, tempDataRow.splice(oldIndex, 1)[0]);

    this.setState({ rowData: tempDataRow });
    this.state.onChange!(tempDataRow);
  };

  private onSwitchFieldChange = (rowId: number, fieldName: string) => {
    return (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      this.updateRow(rowId, fieldName, checked);
    };
  };

  private onSelectFieldChange = (rowId: number, fieldName: string) => {
    return (event: ChangeEvent<HTMLSelectElement>) => {
      this.updateRow(rowId, fieldName, event.target.value);
    };
  };

  private onTextFieldChange = (rowId: number, fieldName: string) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      this.updateRow(rowId, fieldName, event.target.value);
    };
  };

  private updateRow = (rowId: number, fieldName: string, value: string | number | boolean) => {
    const tempDataRow = [...this.state.rowData];

    tempDataRow[rowId][fieldName] = value;

    this.setState({ rowData: tempDataRow });
    this.state.onChange!(tempDataRow);
  };
}

export default EdiTable;
