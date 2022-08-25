import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/common/Card";
import Error from "../../components/common/Error";
import LoadingFailedMessage from "../../components/common/LoadingFailedMessage";
import Loader from "../../components/common/reusable/Loader";
import { SuccessMsg } from "../../components/common/reusable/ToasterNotification";
import Title from "../../components/common/Title";
import { IS_ADMIN } from "../../constants/APP_INFO";
import { useGrade } from "../../context/Providers/GradeContext";
import { isConfirm, isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const GradeListScreen = () => {
  const {
    fetcher: deleteGradeFetcher,
    loading: deleteGradeLoading,
    error: DeleteGradeError,
  } = useAxios();

  const { getGrades, gradeLoading, gradeError, grades } = useGrade();

  const handleDelete = (id) => {
    isConfirm({
      callback: () => {
        deleteGradeFetcher({
          options: {
            url: `/api/grades/${id}`,
            method: "delete",
          },
          callback: () => {
            SuccessMsg("Grade deleted successfully");
            getGrades();
          },
        });
      },
    });
  };

  useEffect(() => {
    if (isEmpty(grades)) {
      getGrades();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {gradeLoading ? (
        <Loader />
      ) : (
        <Card className="pt-4">
          <Error error={gradeError} />
          <Error error={DeleteGradeError} />
          <Title title="Grade List" />
          <div className="table-responsive">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Number</th>
                  <th scope="col">Student</th>
                  <th scope="col">Department</th>
                  {IS_ADMIN && <th scope="col">View</th>}
                  {IS_ADMIN && <th scope="col">Action</th>}
                </tr>
              </thead>
              <tbody>
                {grades?.map((grade, index) => (
                  <tr key={grade.id}>
                    <th scope="row">{index + 1}</th>
                    <td className="text-capitalize">{grade?.name}</td>
                    <td className="text-capitalize">{grade?.number}</td>
                    <td className="text-capitalize">
                      {grade?.student?.firstName +
                        " " +
                        grade?.student?.lastName || ""}
                    </td>
                    <td className="text-capitalize">
                      {grade?.student?.departments?.name}
                    </td>
                    {IS_ADMIN && (
                      <td>
                        <Link
                          className="btn btn-primary btn-sm"
                          to={`/edit-grade/${grade.id}`}
                        >
                          View/Update
                        </Link>
                      </td>
                    )}
                    {IS_ADMIN && (
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          disabled={deleteGradeLoading}
                          onClick={() => handleDelete(grade?.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <LoadingFailedMessage data={grades} loading={gradeLoading} />
          </div>
        </Card>
      )}
    </div>
  );
};

export default GradeListScreen;
