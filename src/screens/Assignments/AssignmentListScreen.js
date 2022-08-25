import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/common/Card";
import Error from "../../components/common/Error";
import LoadingFailedMessage from "../../components/common/LoadingFailedMessage";
import Loader from "../../components/common/reusable/Loader";
import { SuccessMsg } from "../../components/common/reusable/ToasterNotification";
import Title from "../../components/common/Title";
import { IS_ADMIN } from "../../constants/APP_INFO";
import { useAssignment } from "../../context/Providers/AssignmenrContext";
import {
  base64ToPdfDownload,
  isConfirm,
  isEmpty,
} from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const AssignmentListScreen = () => {
  const {
    fetcher: deleteAssignmentFetcher,
    loading: deleteAssinmentLoading,
    error: DeleteAssignmentError,
  } = useAxios();

  const { getAssignments, assignmentLoading, assignmentError, assignments } =
    useAssignment();

  const handleDelete = (id) => {
    isConfirm({
      callback: () => {
        deleteAssignmentFetcher({
          options: {
            url: `/api/assignments/${id}`,
            method: "delete",
          },
          callback: () => {
            SuccessMsg("Assignments deleted successfully");
            getAssignments();
          },
        });
      },
    });
  };
  useEffect(() => {
    if (isEmpty(assignments)) {
      getAssignments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {assignmentLoading ? (
        <Loader />
      ) : (
        <Card className="pt-4">
          <Error error={assignmentError} />
          <Error error={DeleteAssignmentError} />
          <Title title="Assignment List" />
          <div className="table-responsive">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Assignment Name</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">Student ID</th>
                  <th scope="col">Attachment</th>
                  <th scope="col">Course Name</th>
                  {IS_ADMIN && <th scope="col">View</th>}
                  {IS_ADMIN && <th scope="col">Action</th>}
                </tr>
              </thead>
              <tbody>
                {assignments?.map((assignment, index) => (
                  <tr key={assignment.id}>
                    <th scope="row">{index + 1}</th>
                    <td className="text-capitalize">{assignment?.name}</td>
                    <td className="text-capitalize">
                      {assignment?.student?.firstName +
                        " " +
                        assignment?.student?.lastName}
                    </td>
                    <td className="text-capitalize">
                      {assignment?.student?.id}
                    </td>

                    <td className="text-uppercase">
                      {assignment?.fileContentType ? (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            base64ToPdfDownload({
                              filename: assignment?.name,
                              fileSource: assignment?.file,
                            })
                          }
                        >
                          Download
                        </button>
                      ) : (
                        <button className="btn btn-danger btn-sm px-4" disabled>
                          N/A
                        </button>
                      )}
                    </td>
                    <td className="text-capitalize">
                      {assignment?.course?.name}
                    </td>

                    {IS_ADMIN && (
                      <td>
                        <Link
                          className="btn btn-primary btn-sm"
                          to={`/edit-assignment/${assignment.id}`}
                        >
                          View/Update
                        </Link>
                      </td>
                    )}
                    {IS_ADMIN && (
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          disabled={deleteAssinmentLoading}
                          onClick={() => handleDelete(assignment?.id)}
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
              data={assignments}
              loading={assignmentLoading}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default AssignmentListScreen;
