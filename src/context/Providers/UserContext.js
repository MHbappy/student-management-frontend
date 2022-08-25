import { createContext, useContext, useEffect } from "react";
import { IS_LOGIN } from "../../constants/APP_INFO";
import { isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};
export const UserProvider = ({ children }) => {
  const { fetcher, loading, error, data } = useAxios();
  const getUsers = () => {
    fetcher({
      options: {
        url: "/users/me",
      },
    });
  };
  useEffect(() => {
    if (isEmpty(data) && IS_LOGIN) {
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    getUsers,
    userLoading: loading,
    userError: error,
    user: data,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
