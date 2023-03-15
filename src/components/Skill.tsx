import "../App.css";

export interface ISkillProps {
  name: string;
}

function Skill({ name }: ISkillProps) {
  return <li>{name}</li>;
}

export default Skill;
