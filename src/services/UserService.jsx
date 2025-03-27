import axios from "./CustomizeAxios";
import { toast } from "react-toastify";

export async function CreateUser(name, email, password) {
  try {
    const res = await axios.post("/users/add", {
      name,
      email,
      password,
    });

    return res;
  } catch (error) {
    console.error(error);
  }
}
