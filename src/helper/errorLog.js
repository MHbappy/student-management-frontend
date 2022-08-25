export const errorLog = (error) => {
  console.log(error);
  if (error?.response) {
    return (
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.response?.data?.title ??
      error.response?.data?.detail
    );
  }

  return error?.message ?? error?.error;
};
export const convertErrorStatusToText = (error) => {
  let message;

  if (
    error?.response?.status === 400 ||
    error?.response?.data?.status === 400
  ) {
    message =
      "400 Bad Request, Invalid request message framing, or deceptive request. Please try again with appropriate request.";
  }

  if (
    error?.response?.status === 401 ||
    error?.response?.data?.status === 401
  ) {
    message =
      "401 Unauthorized Request, The client must authenticate itself to get the requested response. Please try again with appropriate request.";
  }

  if (
    error?.response?.status === 403 ||
    error?.response?.data?.status === 403
  ) {
    message =
      "403 Forbidden Request, The server is refusing to give the requested resource. Please try again with appropriate request.";
  }

  if (
    error?.response?.status === 404 ||
    error?.response?.data?.status === 404
  ) {
    message =
      "404 Not Found, The server can not find the requested resource. Please try again with appropriate request.";
  }

  if (
    error?.response?.status === 500 ||
    error?.response?.data?.status === 500
  ) {
    message =
      "500 Internal Server Error, The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again with appropriate request.";
  }
  if (error?.response?.status === 0 || error?.response?.data?.status === 0) {
    message = "Network Error";
  }

  console.log(error?.response?.data);

  return message;
};
