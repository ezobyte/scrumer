import { Fab } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import { FunctionComponent } from "react";
import * as React from "react";

interface IRemoveBtn{
  onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}

const RemoveBtn: FunctionComponent<IRemoveBtn> = ({ onClick }) => (
  <Fab color="primary" aria-label="Add" onClick={onClick}>
    <RemoveIcon />
  </Fab>
);

export default RemoveBtn;
