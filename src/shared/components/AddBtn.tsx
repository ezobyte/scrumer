import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { FunctionComponent } from "react";
import * as React from "react";

interface IAddButton {
  onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}

const AddBtn: FunctionComponent<IAddButton> = ({ onClick }) => (
  <Fab color="primary" aria-label="Add" onClick={onClick}>
    <AddIcon />
  </Fab>
);

export default AddBtn;
