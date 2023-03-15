import axios from "axios";
import { useState } from "react";
import { ISkillProps } from "./Skill";

const AddSkill = () => {
  const [name, setName] = useState<ISkillProps["name"]>("");

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/skill", {
      name: name,
    });
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h2>Add a Skill</h2>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <button className="button">Add skill</button>
    </form>
  );
};

export default AddSkill;
