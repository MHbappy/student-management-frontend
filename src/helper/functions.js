/* eslint-disable no-return-assign */
import swal from "sweetalert";
/* eslint-disable no-param-reassign */
export const jumpTo = (history, routeName) => history.push(routeName);

export const isEmpty = (value) => {
  // eslint-disable-next-line valid-typeof
  if (typeof value === undefined || value === null || value === undefined) {
    return true;
  }
  if (Array.isArray(value) && value.length <= 0) {
    return true;
  }
  if (typeof value === "object") {
    return Object.values(value).filter((item) => item).length <= 0;
  }
  if (typeof value === "string") {
    return value.length <= 0;
  }
  if (typeof value === "number") {
    return value <= 0;
  }
  return !value;
};

// eslint-disable-next-line no-unused-vars
const fileToArrayBuffer = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);
    // eslint-disable-next-line prefer-promise-reject-errors
    reader.onerror = (error) => reject(error);

    if (blob) {
      reader.readAsArrayBuffer(blob);
    }
  });

// eslint-disable-next-line consistent-return
export const convertExcelFileToByteArray = async (value) => {
  const fileArrayBuffer = [];
  const buffer = await fileToArrayBuffer(value);

  if (buffer) {
    const unit8Array = new Uint8Array(buffer);
    unit8Array.map((byte) => fileArrayBuffer.push(byte));
    return fileArrayBuffer;
  }
};

export const isCurrentPageValid = (pageNumber) =>
  pageNumber > 0 ? pageNumber - 1 : pageNumber;

// Seperating roles, based on decoded token
export const getAppropriateRole = (roles) => {
  if (roles?.includes(",")) {
    return roles.split(",")[0] === "ROLE_ADMIN"
      ? roles.split(",")[0]
      : roles.split(",")[1];
  }

  return roles;
};

export const isRequireField = (fieldName) => `${fieldName} is required field.`;

export const formdataImage = (data, imageKey) => {
  let formData = new FormData();
  Object.entries(data).map(([key, value]) =>
    formData.append(key, key === imageKey ? value[0] : value)
  );
  return formData;
};

export const isConfirm = ({ title = "", text = "", callback }) => {
  swal({
    title: title || "Are you sure?",
    text: text || "Once deleted, you will not be able to recover this!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      if (typeof callback === "function") {
        return callback();
      }
    }
  });
};

export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

export const base64ToPdfDownload = ({ filename, fileSource }) => {
  let a = document.createElement("a"); //Create <a>
  a.href = "data:application/pdf;base64," + fileSource; //Pdf Base64 Goes here
  a.download = `${filename}.pdf`; //File name Here
  a.click(); //Downloaded file
};
