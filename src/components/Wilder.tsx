import "../App.css";
import Skill from "./Skill";
import ISkillProps from "../interfaces/ISkill";
import { useState } from "react";
import axios from "axios";
import IWilderProps from "../interfaces/IWilder";
import { SubmitHandler, useForm } from "react-hook-form";
import profile from "../assets/profile.png";
interface WilderLocalProps {
  id: number;
  name: string;
  description: string;
  avatar: string;
  skills: ISkillProps[];
}

function Wilder({ id, name, description, skills, avatar }: WilderLocalProps) {
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
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    await axios.put(`http://localhost:5000/api/wilder/${id}/avatar`, formData);
    await axios.put(`http://localhost:5000/api/wilder/${id}`, data);
  };

  return (
    <>
      {modifyModale ? (
        <article className="card">
          <form
            className="container"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>Avatar</label>
            <input type="file" {...register("avatar")} />
            {errors.name && <p>This field is required</p>}
            <br /> <label>Name</label>
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
          <img
            src={avatar == null ? profile : `http://localhost:5000/${avatar}`}
            alt="wilder profile"
          />
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
