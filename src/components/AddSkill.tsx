import axios from "axios";
import ISkillProps from "../interfaces/ISkill";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = ISkillProps;

const AddSkill = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios.post("http://localhost:5000/api/skill", data);
  };

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Add a Skill</h2>
      <label>Name</label>
      <input type="text" {...register("name")} defaultValue="" />
      {errors.name && <p>This field is required</p>}
      <br />
      <button className="button">Add skill</button>
    </form>
  );
};

export default AddSkill;
