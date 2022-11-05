import axios from "axios";

const url = "http://localhost:8080/api/user";

export const srCreateUser = async ({
  u_firstname,
  u_lastname,
  u_email,
  u_password,
  u_city,
  u_phone,
  u_role,
  u_services,
}) => {
  try {
    const response = await axios.post(url + "/register", {
      u_firstname,
      u_lastname,
      u_email,
      u_password,
      u_city,
      u_phone,
      u_role,
      u_services,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const srAuthenticateUser = async ({ u_email, u_password, u_role }) => {
  try {
    const response = await axios.post(url + "/login", {
      u_email,
      u_password,
      u_role,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
