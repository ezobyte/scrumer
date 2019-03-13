/*
import {Select, Switch, TextField} from "@material-ui/core";
import DemoteIcon from "@material-ui/icons/ArrowDropDown";
import PromoteIcon from "@material-ui/icons/ArrowDropUp";
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";
import {IColumnEdiTable, InputType} from "./EdiTable";
import {dataRowStyle} from "./EdiTableStyles";
import {IconButtonEdi} from "./IconButtonEdi";

interface IRowEdi<T>{
    data:T,
    index:number
    colSpec: IColumnEdiTable[];
}
export const RowEdi = <T extends object>(props:IRowEdi<T>)=> {
    return (
        <div key={props.index} style={dataRowStyle}>
            {props.colSpec.map((col: IColumnEdiTable) => (
                <div
                    className={"cell " + col.fieldName}
                    key={col.fieldName + props.index}
                    style={{ width: col.width }}
                >
                    {renderInputField(col, props.index, props.data)}
                </div>
            ))}
            {renderRowButtons(props.index)}
        </div>
    );
}

const renderRowButtons = (index: number) => {
    const buttons = [
        <IconButtonEdi
            rowKey={index}
            action={"delete"}
            clickEvent={() => {
                this.onDeleteRow(index);
            }}
            muiIcon={<DeleteIcon />}
        />
    ];

    if (this.state.reorderable) {
        if (index < this.state.rowData.length - 1 && this.state.rowData.length > 1) {
            buttons.push(
                <IconButtonEdi
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

const renderInputField =(column: IColumnEdiTable, index: number, rowData: T): JSX.Element => {
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
                (option: string): JSX.Element => EdiTable.createSelectOption(option)
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
*/
