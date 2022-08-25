import { createContext, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SuccessMsg } from "../../components/common/reusable/ToasterNotification";
import { IS_LOGIN } from "../../constants/APP_INFO";
import { isConfirm, isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const DepartmentContext = createContext();
export const useDepartment = () => {
  return useContext(DepartmentContext);
};
export const DepartmentProvider = ({ children }) => {
  const history = useHistory();
  // getting all departments
  const {
    fetcher,
    loading: departmentLoading,
    error: departmentError,
    data: departments,
  } = useAxios([]);

  // getting department by id
  const {
    fetcher: getDepartmentById,
    loading: getDepartmentByIdLoading,
    error: getDepartmentByIdError,
    data: department,
  } = useAxios();

  // deleting departments
  const {
    fetcher: deleteDepartmentFetcher,
    loading: deleteDepartmetLoading,
    error: deleteDepartmetError,
  } = useAxios();
  // edit department
  const {
    fetcher: editDepartmentFetcher,
    loading: editDepartmentLoading,
    error: editDepartmentError,
  } = useAxios();

  const getDepartments = () =>
    fetcher({
      options: {
        url: "/api/departments",
      },
    });
  const fetchDepartmentById = (id) =>
    getDepartmentById({
      options: {
        url: `/api/departments/${id}`,
      },
    });

  const editDepartment = ({ data, id, reset }) => {
    editDepartmentFetcher({
      options: {
        url: `/api/departments/${id}`,
        method: "put",
        data: data,
      },
      callback: () => {
        SuccessMsg("Departments updated successfully");
        reset();
        getDepartments();
        history.push("/department-list");
      },
    });
  };

  const handleDepartmentDelete = (id) => {
    isConfirm({
      callback: () => {
        deleteDepartmentFetcher({
          options: {
            url: `/api/departments/${id}`,
            method: "delete",
          },
          callback: () => {
            SuccessMsg("Departments deleted successfully");
            getDepartments();
          },
        });
      },
    });
  };
  useEffect(() => {
    if (isEmpty(departments) && IS_LOGIN) {
      getDepartments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    getDepartments: {
      getDepartments,
      departmentLoading,
      departmentError,
      departments,
    },
    getDepartmentById: {
      fetchDepartmentById,
      getDepartmentByIdLoading,
      getDepartmentByIdError,
      department,
    },
    deleteDepartments: {
      handleDepartmentDelete,
      deleteDepartmetLoading,
      deleteDepartmetError,
    },
    editDepartment: {
      editDepartment,
      editDepartmentLoading,
      editDepartmentError,
    },
  };
  return (
    <DepartmentContext.Provider value={value}>
      {children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentContext;
