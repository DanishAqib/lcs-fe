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
  ui_image,
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
      ui_image,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const srGetUserInfo = async (u_id) => {
  try {
    const response = await axios.get(url + "/" + u_id);
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

export const srUpdateUser = async (u_id, u_info) => {
  try {
    const response = await axios.put(url + "/update_user/" + u_id, {
      u_info,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const srUpdatePassword = async (u_id, old_password, new_password) => {
  try {
    const response = await axios.put(url + "/update_password/" + u_id, {
      old_password,
      new_password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async ({ um_name, um_email, um_message }) => {
  try {
    const response = await axios.post(url + "/send-message", {
      um_name,
      um_email,
      um_message,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
