import {DataTypeProvider} from "@devexpress/dx-react-grid";
import {Chip, Input, MenuItem, Select} from "@material-ui/core";

import * as React from "react";

import ValueFormatterProps = DataTypeProvider.ValueFormatterProps;

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

export const BooleanTypeProvider = (props: IBooleanTypeProvider) => (
    <DataTypeProvider
        formatterComponent={BooleanFormatter}
        editorComponent={BooleanEditor}
        {...props}
    />
);