import axios from "axios";
import { useState } from "react";
import { IWilderProps } from "./Wilder";

const AddForm = () => {
  const [name, setName] = useState<IWilderProps["name"]>("");
  const [email, setEmail] = useState<IWilderProps["email"]>("");
  const [description, setDescription] =
    useState<IWilderProps["description"]>("");

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/wilder", {
      name: name,
      email: email,
      description: description,
    });
  };

  return (
    <form className="container" onSubmit={(e) => handleSubmit(e)}>
      <h2>Add a Wilder</h2>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      <button className="button">Add Wilder</button>
      <br />
    </form>
  );
};

export default AddForm;
