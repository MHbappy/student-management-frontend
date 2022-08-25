import { useState } from "react";
import axiosApiInstance from "../helper/axiosInstance";
import { convertErrorStatusToText, errorLog } from "../helper/errorLog";

const useAxios = (initialValue = {}) => {
  const [response, setResponse] = useState({
    loading: false,
    error: null,
    data: initialValue,
  });
  const { loading, error, data } = response;

  const fetcher = async ({ options, callback }) => {
    setResponse((prev) => ({
      ...prev,
      loading: true,
      error: null,
      data: initialValue,
    }));

    axiosApiInstance(options)
      .then(({ data }) => {
        if (data) {
          setResponse((prev) => ({
            ...prev,
            loading: false,
            error: null,
            data: data,
          }));
          // if any success message or function dispatch required, we can do this by passing this callback function
          if (typeof callback === "function") {
            return callback();
          }
        }
      })
      .catch((error) => {
        setResponse((prev) => ({
          ...prev,
          loading: false,
          error: errorLog(error) ?? convertErrorStatusToText(error),
          data: initialValue,
        }));
      });
  };

  return { fetcher, loading, error, data };
};

export default useAxios;
