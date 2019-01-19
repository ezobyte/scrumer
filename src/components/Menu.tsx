import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import {Observer} from "mobx-react";
import React, {useContext} from "react";
import Team from "./Team";
import {StoreContext} from "..";

interface ITabContainer {
  children: JSX.Element;
}

function TabContainer(props: ITabContainer) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

interface IMenu {
  activeItem: string;
}

function Menu(props: IMenu) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
    const store = useContext(StoreContext)

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
        <Observer render={()=>{
            console.log(store);
            return (<div/>)
        }}/>

      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Team Setup" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer><Team team={store.team}/></TabContainer>}
   {/*   {value === 1 && <TabContainer>Item Two</TabContainer>}
      {value === 2 && <TabContainer>Item Three</TabContainer>}*/}
    </div>
  );
}

export default Menu;
