import { createContext, useContext, useEffect } from "react";
import { IS_LOGIN } from "../../constants/APP_INFO";
import { isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const GradeContext = createContext();
export const useGrade = () => {
  return useContext(GradeContext);
};
export const GradeProvider = ({ children }) => {
  const { fetcher, loading, error, data } = useAxios([]);
  const getGrades = () => {
    fetcher({
      options: {
        url: "/api/grades",
      },
    });
  };
  useEffect(() => {
    if (isEmpty(data) && IS_LOGIN) {
      getGrades();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    getGrades,
    gradeLoading: loading,
    gradeError: error,
    grades: data,
  };
  return (
    <GradeContext.Provider value={value}>{children}</GradeContext.Provider>
  );
};

export default GradeContext;
