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
