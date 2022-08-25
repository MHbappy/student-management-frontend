import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/common/Card";
import Error from "../../components/common/Error";
import LoadingFailedMessage from "../../components/common/LoadingFailedMessage";
import Loader from "../../components/common/reusable/Loader";
import Title from "../../components/common/Title";
import { NEW_DATE_IN_ARRAY } from "../../constants/APP_INFO";
import { isEmpty } from "../../helper/functions";
import useAxios from "./../../hooks/useAxios";

const StudentListScreenByCourseId = () => {
  const { fetcher, loading, error, data } = useAxios([]);
  const { courseId } = useParams();
  useEffect(() => {
    fetcher({
      options: {
        url: `/api/studentByCourseId`,
        params: { courseId },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Card className="pt-4">
              <Error error={error} />
              <Title title="Student List" />
              <div className="table-responsive">
                <table className="table table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First name</th>
                      <th scope="col">Last name</th>
                      <th scope="col">Student Id</th>
                      <th scope="col">Age</th>
                      <th scope="col">Email</th>
                      <th scope="col">Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((student, index) => (
                      <tr key={student.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{student?.firstName}</td>
                        <td>{student?.lastName}</td>
                        <td>{student?.studentId}</td>
                        <td>
                          {!isEmpty(student?.dob) &&
                            `${NEW_DATE_IN_ARRAY[0] - student?.dob[0]} Years`}
                        </td>
                        <td>{student?.email}</td>
                        <td className="text-capitalize">
                          {student?.departments ? (
                            <span className="badge alert-success">
                              {student?.departments?.name}
                            </span>
                          ) : (
                            <span className="badge alert-danger">
                              Not Assign
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <LoadingFailedMessage data={data} loading={loading} />
              </div>
            </Card>
          </>
        )}
      </div>
    </>
  );
};

export default StudentListScreenByCourseId;
