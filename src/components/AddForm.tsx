import axios from "axios";
import { useState } from "react";
import { IWilderProps } from "./Wilder";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = IWilderProps;

const AddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios.post("http://localhost:5000/api/wilder", data);
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
      <button className="button">Add Wilder</button>
      <br />
    </form>
  );
};

export default AddForm;
