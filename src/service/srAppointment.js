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

export const srGetAllClientAppointmentRequests = async (car_client_id) => {
  try {
    const response = await axios.get(
      url + "/all-appointments/" + car_client_id
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const srGetAllLawyerAppointmentRequests = async (car_lawyer_id) => {
  try {
    const response = await axios.get(
      url + "/all-appointment-req/" + car_lawyer_id
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const srCancelAppointment = async (car_id) => {
  try {
    const response = await axios.delete(url + "/cancel-appointment/" + car_id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const changeAppointmentStatus = async (car_id, car_status) => {
  try {
    const response = await axios.put(
      url + "/change-appointment-status/" + car_id,
      {
        car_status,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
