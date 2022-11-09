import axios from "axios";

const url = "http://localhost:8080/api/appointment";

export const srCreateAppointment = async ({
  car_client_id,
  car_lawyer_id,
  car_title,
  car_description,
}) => {
  try {
    const response = await axios.post(url + "/create-appointment", {
      car_client_id,
      car_lawyer_id,
      car_title,
      car_description,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
