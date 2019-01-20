import { observer } from "mobx-react";
import * as React from "react";
import AddBtn from "../shared/components/AddBtn";
import Input from "../shared/components/Input";
import RemoveBtn from "../shared/components/RemoveBtn";
import {IMember, IMembers, Role} from "../store/TTeam";

interface ITeamProps {
  team?: IMembers;
}

@observer
class Team extends React.Component<ITeamProps> {
  private addEmptyMember = (role: Role) => {
    this.props.team!.addMember({
      role: role
    } as IMember);
  };

  private onRemoveHandler = () => {
    this.props.team!.popMember();
    console.log(this.props.team!.members.length);
  };

  private onUpdateMemberName = (name: string, index: number) => {
    console.log("onUpdateMemberName", name, index, this.props.team!.members[index]);
    if (this.props.team!.members[index]) {
      this.props.team!.members[index].setName(name);
    }
  };

  private renderMembers() {
    return this.props.team!.members.map((member: IMember, index) => {
      return (
        <Input key={index} blurCallback={this.onUpdateMemberName} index={index} value={member.name} />
      );
    });
  }

  render() {
    const members = this.renderMembers();
    const hideRemoveBtn = this.props.team!.members.length <= 3;

    return (
      <div style={{ flexDirection: "column", display: "flex" }}>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <AddBtn
            onClick={() => {
              this.addEmptyMember(Role.Dev);
            }}
          />
          {!hideRemoveBtn && <RemoveBtn onClick={this.onRemoveHandler} />}
        </div>
        {members}
      </div>
    );
  }
}

export default Team;
