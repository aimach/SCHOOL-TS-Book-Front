import IWilderProps from "../interfaces/IWilder";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const ADD_WILDER = gql`
  mutation addWilder($description: String!, $email: String!, $name: String!) {
    createWilder(description: $description, email: $email, name: $name) {
      id
      name
      email
      description
      skills {
        id
        name
      }
    }
  }
`;

const AddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWilderProps>();

  const [addWilder, { loading }] = useMutation(ADD_WILDER);

  const onSubmit: SubmitHandler<IWilderProps> = async (data) => {
    await addWilder({
      variables: {
        name: data.name,
        email: data.email,
        description: data.description,
      },
    });
  };

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Add a Wilder</h2>
      <label>Name</label>
      <input type="text" {...register("name")} defaultValue="" />
      {errors.name && <p>This field is required</p>}
      <br />
      <label>Email</label>
      <input type="text" {...register("email")} defaultValue="" />
      {errors.email && <p>This field is required</p>}
      <br />
      <label>Description</label>
      <input type="text" {...register("description")} defaultValue="" />
      {errors.description && <p>This field is required</p>}
      <br />
      <button disabled={loading} className="button">
        {loading ? "Submitting..." : "Add wilder"}
      </button>
      <br />
    </form>
  );
};

export default AddForm;
