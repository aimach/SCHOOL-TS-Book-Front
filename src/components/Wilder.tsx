import "../App.css";
import Skill from "./Skill";
import profile from "../assets/profile.png";
import ISkillProps from "../interfaces/ISkill";
interface WilderLocalProps {
  name: string;
  description: string;
  skills: ISkillProps[];
}

function Wilder({ name, description, skills }: WilderLocalProps) {
  return (
    <article className="card">
      <img src={profile} alt="wilder profile" />
      <h3>{name}</h3>
      <p>{description}</p>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {skills.map((skill) => (
          <Skill {...skill} key={skill.id} />
        ))}
      </ul>
    </article>
  );
}

export default Wilder;
