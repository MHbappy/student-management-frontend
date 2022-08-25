import { createContext, useContext, useEffect } from "react";
import { IS_LOGIN } from "../../constants/APP_INFO";
import { isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const CourseContext = createContext();
export const useCourse = () => {
  return useContext(CourseContext);
};
export const CourseProvider = ({ children }) => {
  const { fetcher, loading, error, data } = useAxios([]);
  const getCourses = (name = "", page = 0) => {
    fetcher({
      options: {
        url: "api/searchByName",
        params: {
          name,
          page,
          size: 20,
        },
      },
    });
  };
  useEffect(() => {
    if (isEmpty(data) && IS_LOGIN) {
      getCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    getCourses,
    courseLoading: loading,
    courseError: error,
    courses: data,
  };
  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export default CourseContext;
