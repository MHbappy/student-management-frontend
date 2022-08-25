import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Card from "../../components/common/Card";
import Error from "../../components/common/Error";
import Form from "../../components/common/Form";
import InputField from "../../components/common/InputField";
import LoadingFailedMessage from "../../components/common/LoadingFailedMessage";
import Loader from "../../components/common/reusable/Loader";
import PaginationInformation from "../../components/common/reusable/PaginationInformation";
import { SuccessMsg } from "../../components/common/reusable/ToasterNotification";
import Title from "../../components/common/Title";
import { NEW_DATE_IN_ARRAY } from "../../constants/APP_INFO";
import { useStudent } from "../../context/Providers/StudentContext";
import { isConfirm, isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";
const studentSchema = yup.object().shape({
  name: yup.string(),
});
const StudentListScreen = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(studentSchema),
  });
  const { getStudents, studentLoading, studentError, students } = useStudent();
  const {
    fetcher: deleteStudentFetcher,
    loading: deleteStudentLoading,
    error: deleteStudentError,
  } = useAxios();

  const handleDelete = (id) => {
    isConfirm({
      callback: () => {
        deleteStudentFetcher({
          options: {
            url: `/api/students/${id}`,
            method: "delete",
          },
          callback: () => {
            SuccessMsg("Students deleted successfully");
            getStudents();
          },
        });
      },
    });
  };
  const handleSearchSearch = ({ name }) => {
    getStudents(name);
  };
  const handlePageChanges = (pageNumber) => {
    getStudents("", pageNumber.selected);
  };

  useEffect(() => {
    if (isEmpty(students)) {
      getStudents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        {studentLoading ? (
          <Loader />
        ) : (
          <>
            <Form
              label="Search"
              formLoading={studentLoading}
              title="Search student"
              onSubmit={handleSubmit(handleSearchSearch)}
            >
              <InputField
                label="Student Name"
                name="name"
                error={errors.name}
                inputRef={register}
              />
            </Form>

            <Card className="pt-4">
              <Error error={studentError} />
              <Error error={deleteStudentError} />
              <Title title="Student List" />
              <div className="table-responsive">
                <table className="table table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First name</th>
                      <th scope="col">Last name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Student Id</th>
                      <th scope="col">Age</th>
                      <th scope="col">Department</th>
                      <th scope="col">View</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students?.content?.map((student, index) => (
                      <tr key={student.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{student?.firstName}</td>
                        <td>{student?.lastName}</td>
                        <td>{student?.email}</td>
                        <td>{student?.studentId}</td>
                        <td>
                          {!isEmpty(student?.dob) &&
                            `${NEW_DATE_IN_ARRAY[0] - student?.dob[0]} Years`}
                        </td>
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
                        <td>
                          <Link
                            className="btn btn-primary btn-sm"
                            to={`/edit-student/${student.id}`}
                          >
                            View/Update
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            disabled={deleteStudentLoading}
                            onClick={() => handleDelete(student?.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <LoadingFailedMessage
                  data={students?.content}
                  loading={studentLoading}
                />
              </div>
              <PaginationInformation
                paginationAccess={students}
                handlePageChanges={handlePageChanges}
              />
            </Card>
          </>
        )}
      </div>
    </>
  );
};

export default StudentListScreen;
