import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/common/Card";
import Error from "../../components/common/Error";
import LoadingFailedMessage from "../../components/common/LoadingFailedMessage";
import Loader from "../../components/common/reusable/Loader";
import { SuccessMsg } from "../../components/common/reusable/ToasterNotification";
import Title from "../../components/common/Title";
import { IS_ADMIN } from "../../constants/APP_INFO";
import { isConfirm } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const InstructorListScreen = () => {
  const {
    fetcher: deleteInstructorFetcher,
    loading: deleteInstructorLoading,
    error: DeleteInstructorError,
  } = useAxios();
  const { fetcher, loading, error, data } = useAxios([]);
  const getInstructors = () =>
    fetcher({
      options: {
        url: "/api/instructors",
      },
    });

  const handleDelete = (id) => {
    isConfirm({
      callback: () => {
        deleteInstructorFetcher({
          options: {
            url: `/api/instructors/${id}`,
            method: "delete",
          },
          callback: () => {
            SuccessMsg("Instructors deleted successfully");
            getInstructors();
          },
        });
      },
    });
  };
  useEffect(() => {
    getInstructors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Card className="pt-4">
          <Error error={error} />
          <Error error={DeleteInstructorError} />
          <Title title="Instructor List" />
          <div className="table-responsive">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First name</th>
                  <th scope="col">Last name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Department</th>
                  {IS_ADMIN && <th scope="col">View</th>}
                  {IS_ADMIN && <th scope="col">Action</th>}
                </tr>
              </thead>
              <tbody>
                {data?.map((instructor, index) => (
                  <tr key={instructor.id}>
                    <th scope="row">{index + 1}</th>
                    <td className="text-capitalize">{instructor?.firstName}</td>
                    <td className="text-capitalize">{instructor?.lastName}</td>
                    <td>{instructor?.email}</td>{" "}
                    <td className="text-capitalize">
                      {instructor?.departments ? (
                        <span className="badge alert-success">
                          {instructor?.departments?.name}
                        </span>
                      ) : (
                        <span className="badge alert-danger">Not Assign</span>
                      )}
                    </td>
                    {IS_ADMIN && (
                      <td>
                        <Link
                          className="btn btn-primary btn-sm"
                          to={`/edit-instructor/${instructor.id}`}
                        >
                          View/Update
                        </Link>
                      </td>
                    )}
                    {IS_ADMIN && (
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          disabled={deleteInstructorLoading}
                          onClick={() => handleDelete(instructor?.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <LoadingFailedMessage data={data} loading={loading} />
          </div>
        </Card>
      )}
    </div>
  );
};

export default InstructorListScreen;
