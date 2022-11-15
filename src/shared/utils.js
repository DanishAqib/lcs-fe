export const getCurrentUserSession = () => {
  return JSON.parse(localStorage.getItem("userInfo"));
};

export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const formatDateAndTime = (date) => {
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const year = date.slice(0, 4);
  const time = date.slice(11, 16);
  const monthName = new Date(year, month - 1, day).toLocaleString("default", {
    month: "long",
  });
  const AMPM = time.slice(0, 2) >= 12 ? "PM" : "AM";
  return `${monthName} ${day}, ${year} at ${time} ${AMPM}`;
};
