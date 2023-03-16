import "../App.css";
import Skill from "./Skill";
import profile from "../assets/profile.png";
import ISkillProps from "../interfaces/ISkill";
import { useState } from "react";
import axios from "axios";
import IWilderProps from "../interfaces/IWilder";
import { SubmitHandler, useForm } from "react-hook-form";
interface WilderLocalProps {
  id: number;
  name: string;
  description: string;
  skills: ISkillProps[];
}

function Wilder({ id, name, description, skills }: WilderLocalProps) {
  const [modifyModale, setModifyModale] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:5000/api/wilder/${id}`);
  };

  type Inputs = IWilderProps;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios.put(`http://localhost:5000/api/wilder/${id}`, data);
  };

  return (
    <>
      {modifyModale ? (
        <article className="card">
          <img src={profile} alt="wilder profile" />
          <form className="container" onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input type="text" {...register("name")} defaultValue={name} />
            {errors.name && <p>This field is required</p>}
            <br />
            <label>Description</label>
            <input
              type="text"
              {...register("description")}
              defaultValue={description}
            />
            {errors.description && <p>This field is required</p>}
            <br />
            <button className="button">Modify the Wilder</button>
            <br />
          </form>
          <ul className="skills">
            {skills.map((skill) => (
              <Skill {...skill} key={skill.id} />
            ))}
          </ul>
          <button className="button" onClick={() => setModifyModale(false)}>
            Get back
          </button>
        </article>
      ) : (
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
          <button className="button" onClick={() => setModifyModale(true)}>
            Modify
          </button>
          <button className="button" onClick={() => handleDelete(id)}>
            Delete
          </button>
        </article>
      )}
    </>
  );
}

export default Wilder;
