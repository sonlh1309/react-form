import moment from "moment";

const words = "abcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += words.charAt(Math.floor(Math.random() * words.length));
  }
  return result;
};

export const getRandomNumberString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

/**
 * @description: format date to format dd / mm / yyyy
 * @param {*} date
 * @returns
 */
export const formatDateDisplay = (date) => {
  return date && moment(date).isValid()
    ? moment(date).format("DD / MM / YYYY")
    : "";
};

/**
 * @description: format number to currency format
 * @param {*} value
 * @returns
 */
export const formatCurrency = (value) => {
  return value
    ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ"
    : "";
};

/**
 * @description: format date to format yyyy-mm-dd
 * @param {*} date
 * @returns date in format yyyy-mm-dd if date is valid else return null
 */
export const formatDateValue = (date) => {
  return date && moment(date).isValid()
    ? moment(date).format("YYYY-MM-DD")
    : "";
};

export const currencyToNumber = (value) => {
  return value
    ? Number(value.toString().replaceAll(".", "").replaceAll(",", ""))
    : 0;
};

export const getDirectlyLink = (url) => {
  if (url.startsWith("http" || "https")) {
    return url;
  } else {
    if (url.startsWith("/")) {
      return "https://api.wlin.com.vn" + url;
    }
    return "https://api.wlin.com.vn/" + url;
  }
};
