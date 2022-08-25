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
import { IS_ADMIN } from "../../constants/APP_INFO";
import { useCourse } from "../../context/Providers/CourseContext";
import { isConfirm, isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";
const newDepartmentSchema = yup.object().shape({
  name: yup.string(),
});

const CourseListScreen = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(newDepartmentSchema),
  });
  const {
    fetcher: deleteCourseFetcher,
    loading: deleteCourseLoading,
    error: DeleteCourseError,
  } = useAxios();
  const { getCourses, courseLoading, courseError, courses } = useCourse();

  const handleDelete = (id) => {
    isConfirm({
      callback: () => {
        deleteCourseFetcher({
          options: {
            url: `/api/courses/${id}`,
            method: "delete",
          },
          callback: () => {
            SuccessMsg("Courses deleted successfully");
            getCourses();
          },
        });
      },
    });
  };
  const handleCourseSearch = ({ name }) => {
    getCourses(name);
  };
  const handlePageChanges = (pageNumber) => {
    getCourses("", pageNumber.selected);
  };
  useEffect(() => {
    if (isEmpty(courses)) {
      getCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        {courseLoading ? (
          <Loader />
        ) : (
          <>
            <Form
              label="Search"
              formLoading={courseLoading}
              title="Search courses"
              onSubmit={handleSubmit(handleCourseSearch)}
            >
              <InputField
                label="Course Name"
                name="name"
                error={errors.name}
                inputRef={register}
              />
            </Form>

            <Card className="pt-4">
              <Error error={courseError} />
              <Error error={DeleteCourseError} />
              <Title title="Course List" />
              <div className="table-responsive">
                <table className="table table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Code</th>
                      <th scope="col">Department</th>
                      <th scope="col">Students List</th>
                      {IS_ADMIN && <th scope="col">View</th>}
                      {IS_ADMIN && <th scope="col">Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {courses?.content?.map((course, index) => (
                      <tr key={course.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{course?.name}</td>
                        <td className="text-capitalize">{course?.code}</td>
                        <td className="text-capitalize">
                          {course?.departments ? (
                            <span className="badge alert-success">
                              {course?.departments?.name}
                            </span>
                          ) : (
                            <span className="badge alert-danger">
                              Not Assign
                            </span>
                          )}
                        </td>
                        {true && (
                          <td>
                            <Link
                              className="btn btn-success btn-sm"
                              to={`/student-list/${course.id}`}
                            >
                              Details
                            </Link>
                          </td>
                        )}
                        {IS_ADMIN && (
                          <td>
                            <Link
                              className="btn btn-primary btn-sm"
                              to={`/edit-course/${course.id}`}
                            >
                              View/Update
                            </Link>
                          </td>
                        )}
                        {IS_ADMIN && (
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              disabled={deleteCourseLoading}
                              onClick={() => handleDelete(course?.id)}
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
                  data={courses?.content}
                  loading={courseLoading}
                />
              </div>
              <PaginationInformation
                paginationAccess={courses}
                handlePageChanges={handlePageChanges}
              />
            </Card>
          </>
        )}
      </div>
    </>
  );
};

export default CourseListScreen;
