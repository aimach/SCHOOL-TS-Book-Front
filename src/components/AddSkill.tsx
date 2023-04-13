import ISkillProps from "../interfaces/ISkill";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

type Inputs = ISkillProps;

const ADD_SKILL = gql`
  mutation AddSkill($name: String!) {
    createSkill(name: $name) {
      id
      name
    }
  }
`;

const AddSkill = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [addSkill, { loading }] = useMutation(ADD_SKILL);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await addSkill({
      variables: { name: data.name },
    });
  };

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Add a Skill</h2>
      <label>Name</label>
      <input type="text" {...register("name")} defaultValue="" />
      {errors.name && <p>This field is required</p>}
      <br />
      <button disabled={loading} className="button">
        {loading ? "Submitting..." : "Add skill"}
      </button>
    </form>
  );
};

export default AddSkill;
