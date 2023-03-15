import "../App.css";
import Skill from "./Skill";
import profile from "../assets/profile.png";
import { ISkillProps } from "./Skill";

export interface IWilderProps {
  name: string;
  email: string;
  description: string;
  skills: ISkillProps[];
}

function Wilder({ name, email, description, skills }: IWilderProps) {
  return (
    <article className="card">
      <img src={profile} alt="wilder profile" />
      <h3>{name}</h3>
      <p>{email}</p>
      <p>{description}</p>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {skills.map((skill, index) => (
          <Skill name={skill.name} key={index} />
        ))}
      </ul>
    </article>
  );
}

export default Wilder;
