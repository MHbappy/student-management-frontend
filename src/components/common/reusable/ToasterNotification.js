import swal from "sweetalert";

export const SuccessMsg = (text = "") => {
  if (text) {
    swal("Good job!", text, "success");
  }
};
export const FailMsg = (text = "") => {
  if (text) {
    swal("opps!", text, "error");
  }
};
