import { IconButton } from "@material-ui/core";
import * as React from "react";

export interface IIconButtonProps {
  rowKey?: number | string;
  action: string;
  clickEvent: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  muiIcon: JSX.Element;
}

export const IconButtonEdi = (props: IIconButtonProps) => {
  return (
    <div
      className="cell action"
      key={"action" + props.action + props.rowKey}
      style={{ width: "45px", display: "inline" }}
    >
      <IconButton
        color="primary"
        className={"action-button " + props.action + "-row-button" + props.rowKey}
        onClick={props.clickEvent}
        style={{ minWidth: "45px" }}
      >
        {props.muiIcon}
      </IconButton>
    </div>
  );
};
