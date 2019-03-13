import { MenuItem } from "@material-ui/core";
import * as React from "react";

export interface ISelectOption {
  option: string;
}
export const SelectOption = (props: ISelectOption): JSX.Element => {
  return (
    <MenuItem value={props.option} key={props.option}>
      {props.option}
    </MenuItem>
  );
};
