import { createContext, useContext, useEffect } from "react";
import { IS_LOGIN } from "../../constants/APP_INFO";
import { isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const StudentContext = createContext();
export const useStudent = () => {
  return useContext(StudentContext);
};
export const StudentProvider = ({ children }) => {
  const { fetcher, loading, error, data } = useAxios([]);
  const getStudents = (name = "", page = 0) => {
    fetcher({
      options: {
        url: "api/searchByStudentName",
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
      getStudents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    getStudents,
    studentLoading: loading,
    studentError: error,
    students: data,
  };
  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export default StudentContext;
