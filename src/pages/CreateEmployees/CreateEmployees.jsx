import React, { useState } from "react";
import { CreateUser } from "../../services/UserService";
import { createUser } from "../../services/api.service";
import { Input } from "antd";

const CreateEmployees = () => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  const [name, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async () => {
    const res = await createUser(name, email, password)
    console.log(">>>>check", res)
  };



  return (
    <div className="mx-auto mt-10 p-6 bg-white rounded-lg shadow-md w-[500px]">
      <h2 className="text-xl font-bold mb-4">Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(event) => { setFullName(event.target.value) }}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(event) => { setEmail(event.target.value) }}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(event) => { setPassword(event.target.value) }}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateEmployees;
