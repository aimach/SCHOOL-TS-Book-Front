import ISkillProps from "./ISkill";

export default interface IWilderProps {
  id: number;
  name: string;
  email: string;
  description: string;
  skills: ISkillProps[];
}
