import { createContext, useContext, useEffect } from "react";
import { IS_LOGIN } from "../../constants/APP_INFO";
import { isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const AssignmentContext = createContext();
export const useAssignment = () => {
  return useContext(AssignmentContext);
};
export const AssignmentProvider = ({ children }) => {
  const { fetcher, loading, error, data } = useAxios([]);
  const getAssignments = () => {
    fetcher({
      options: {
        url: "/api/assignments",
      },
    });
  };
  useEffect(() => {
    if (isEmpty(data) && IS_LOGIN) {
      getAssignments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    getAssignments,
    assignmentLoading: loading,
    assignmentError: error,
    assignments: data,
  };
  return (
    <AssignmentContext.Provider value={value}>
      {children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentContext;
