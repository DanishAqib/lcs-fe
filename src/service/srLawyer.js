import axios from "axios";

const url = "http://localhost:8080/api/lawyer";

export const srChangeLawyerStatus = async (li_uid, li_status) => {
  try {
    const response = await axios.put(url + "/change_status/" + li_uid, {
      li_status,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const srGetAllLawyers = async () => {
  try {
    const response = await axios.get(url + "/all-lawyers");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const srGetAllLawyerReviews = async (lawyer_id) => {
  try {
    const response = await axios.get(url + "/reviews/" + lawyer_id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const srGiveLawyerReview = async (
  appointment_id,
  lawyer_id,
  client_id,
  rating,
  review
) => {
  try {
    const response = await axios.post(url + "/give-review/" + lawyer_id, {
      appointment_id,
      client_id,
      rating,
      review,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const srGetReviewOnAppointment = async (appointment_id) => {
  try {
    const response = await axios.get(url + "/review/" + appointment_id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
