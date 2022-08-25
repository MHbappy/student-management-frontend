import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/common/Card";
import LoadingFailedMessage from "../../components/common/LoadingFailedMessage";
import Loader from "../../components/common/reusable/Loader";
import Title from "../../components/common/Title";
import { IS_ADMIN } from "../../constants/APP_INFO";
import { useDepartment } from "../../context/Providers/DepartmentContext";
import { isEmpty } from "../../helper/functions";
import Error from "../../components/common/Error";

const DepartmentListScreen = () => {
  const {
    getDepartments: {
      getDepartments,
      departmentLoading,
      departmentError,
      departments,
    },
    deleteDepartments: {
      handleDepartmentDelete,
      deleteDepartmetLoading,
      deleteDepartmetError,
    },
  } = useDepartment();

  useEffect(() => {
    if (isEmpty(departments)) {
      getDepartments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {departmentLoading ? (
        <Loader />
      ) : (
        <Card className="pt-4">
          <Error error={departmentError} />
          <Error error={deleteDepartmetError} />
          <Title title="Department List" />
          <div className="table-responsive">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  {IS_ADMIN && <th scope="col">View</th>}
                  {IS_ADMIN && <th scope="col">Action</th>}
                </tr>
              </thead>
              <tbody>
                {departments?.map((department, index) => (
                  <tr key={department.id}>
                    <th scope="row">{index + 1}</th>
                    <td className="text-capitalize">{department?.name}</td>
                    {IS_ADMIN && (
                      <td>
                        <Link
                          className="btn btn-primary btn-sm"
                          to={`/edit-department/${department.id}`}
                        >
                          View/Update
                        </Link>
                      </td>
                    )}
                    {IS_ADMIN && (
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          disabled={deleteDepartmetLoading}
                          onClick={() => handleDepartmentDelete(department?.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <LoadingFailedMessage
              data={departments}
              loading={departmentLoading}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default DepartmentListScreen;
