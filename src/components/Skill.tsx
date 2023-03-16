import "../App.css";
import ISkillProps from "../interfaces/ISkill";

function Skill({ id, name }: ISkillProps) {
  return <li>{name}</li>;
}

export default Skill;
