import { TextField } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import * as React from "react";
import { FunctionComponent, useState } from "react";

const useStyles = makeStyles(theme => {
  return {
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: 2,
      width: 200
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    }
  };
});

export interface IInput {
  blurCallback: (value: string, index: number) => void;
  value?: string;
  index: number;
}

const Input: FunctionComponent<IInput> = ({ blurCallback, value, index }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [values, setValues] = useState({
    name: value ? value : "Developer Name"
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
    console.log("handleChange", values.name);
  };

  const handleBlur = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
    console.log("handleBlur", values.name);
    blurCallback(values.name, index);
  };

  const handleFocus = (name: string) => () => {
    setValues({ ...values, [name]: "" });
  };

  return (
    <TextField
      id="standard-name"
      label="Name"
      className={classes.textField}
      value={values.name}
      onChange={handleChange("name")}
      onFocus={handleFocus("name")}
      onBlur={handleBlur("name")}
      margin="normal"
    />
  );
};

export default Input;
