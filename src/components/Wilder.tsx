import "../App.css";
import ISkillProps from "../interfaces/ISkill";
import { useState } from "react";
import IWilderProps from "../interfaces/IWilder";
import { SubmitHandler, useForm } from "react-hook-form";
import profile from "../assets/profile.png";
import { useWilders } from "../contexts/WildersContext";
import close from "../assets/close.png";
import { gql, useMutation } from "@apollo/client";

interface WilderLocalProps {
  id: number;
  name: string;
  description: string;
  avatar: string;
  skills: ISkillProps[];
}

const UPDATE_WILDER = gql`
  mutation updateWilder(
    $description: String!
    $name: String!
    $updateWilderId: Float!
  ) {
    updateWilder(description: $description, name: $name, id: $updateWilderId)
  }
`;

const DELETE_WILDER = gql`
  mutation deleteWilder($deleteWilderId: Float!) {
    deleteWilder(id: $deleteWilderId)
  }
`;

const ADD_SKILL_WILDER = gql`
  mutation addSkillToWilder($idSkill: Float!, $idWilder: Float!) {
    addSkillToWilder(idSkill: $idSkill, idWilder: $idWilder) {
      id
      name
      email
      description
    }
  }
`;

const DELETE_SKILL_WILDER = gql`
  mutation deleteSkillToWilder($idSkill: Float!, $idWilder: Float!) {
    deleteSkillToWilder(idSkill: $idSkill, idWilder: $idWilder) {
      id
      name
      email
      description
    }
  }
`;

function Wilder({ id, name, description, skills, avatar }: WilderLocalProps) {
  const [modifyModale, setModifyModale] = useState<boolean>(false);

  // modify Wilder
  type Inputs = IWilderProps;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [updateWilder] = useMutation(UPDATE_WILDER);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await updateWilder({
      variables: {
        description: data.description,
        name: data.name,
        updateWilderId: id,
      },
    });
    fetchDatas();
  };

  // delete Wilder
  const [deleteFunction] = useMutation(DELETE_WILDER);
  const handleDelete = async (id: number) => {
    await deleteFunction({
      variables: { deleteWilderId: id },
    });
    fetchDatas();
  };

  // display skills
  const { dataSkills, fetchDatas } = useWilders();

  // add skill to Wilder
  const [idSkill, setIdSkill] = useState<string>("");
  const [addSkillToWilderFunction] = useMutation(ADD_SKILL_WILDER);
  const addSkill = async () => {
    await addSkillToWilderFunction({
      variables: {
        idSkill: parseInt(idSkill),
        idWilder: id,
      },
    });
    fetchDatas();
  };

  // delete skill to Wilder
  const [deleteSkillToWilderFunction] = useMutation(DELETE_SKILL_WILDER);
  const handleDeleteSkill = async (skillId: number) => {
    await deleteSkillToWilderFunction({
      variables: {
        idSkill: skillId,
        idWilder: id,
      },
    });
    fetchDatas();
  };

  return (
    <>
      {modifyModale ? (
        <article className="card">
          <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            {/* <label>Avatar</label>
            <input type="file" {...register("avatar")} />
            {errors.name && <p>This field is required</p>} */}
            <br /> <label>Name</label>
            <input type="text" {...register("name")} defaultValue={name} />
            {errors.name && <p>This field is required</p>}
            <br />
            <label>Description</label>
            <input
              type="textarea"
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
              <li key={skill.id}>
                {skill.name}
                <img
                  src={close}
                  width="15px"
                  height="15px"
                  alt="cross"
                  onClick={() => handleDeleteSkill(skill.id)}
                />
              </li>
            ))}
          </ul>
          <div className="modifySkill">
            <label>Add a skill</label>
            <br />
            <select
              name="skills"
              id="skills"
              onChange={(e) => setIdSkill(e.target.value)}
            >
              {dataSkills.map((skill) => {
                return (
                  <option value={skill.id} key={skill.id}>
                    {skill.name}
                  </option>
                );
              })}
            </select>
            <br />
            <button className="button" onClick={addSkill}>
              Add skill
            </button>
          </div>
          <button className="button" onClick={() => setModifyModale(false)}>
            Get back
          </button>
        </article>
      ) : (
        <article className="card">
          <div className="card-img">
            <img
              src={avatar == null ? profile : `http://localhost:5000/${avatar}`}
              alt="wilder profile"
            />
          </div>
          <h3>{name}</h3>
          <p>{description}</p>
          <h4>Wild Skills</h4>
          <ul className="skills">
            {skills.map((skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
          <div>
            <button className="button" onClick={() => setModifyModale(true)}>
              Modify
            </button>
            <button className="button" onClick={() => handleDelete(id)}>
              Delete
            </button>
          </div>
        </article>
      )}
    </>
  );
}

export default Wilder;
