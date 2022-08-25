import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
import Error from "../../components/common/Error";
import Form from "../../components/common/Form";
import InputField from "../../components/common/InputField";
import InputSelectField from "../../components/common/InputSelectField";
import Loader from "../../components/common/reusable/Loader";
import { SuccessMsg } from "../../components/common/reusable/ToasterNotification";
import { useAssignment } from "../../context/Providers/AssignmenrContext";
import { useCourse } from "../../context/Providers/CourseContext";
import { useStudent } from "../../context/Providers/StudentContext";
import { convertExcelFileToByteArray, isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const newCourseSchema = yup.object().shape({
  name: yup.string().required("Please enter assignment name."),
  course: yup.string().required("Please enter course name."),
  file: yup.mixed(),
  student: yup
    .number()
    .required("Please select a student")
    .typeError("Please select a student"),
});

const EditAssignmentScreen = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(newCourseSchema),
  });
  const { getCourses, courseLoading, courseError, courses } = useCourse();

  const { fetcher, loading, error } = useAxios();

  const [student, setStudent] = useState([]);
  const [course, setCourse] = useState([]);
  const history = useHistory();
  const { getAssignments } = useAssignment();
  const { id } = useParams();

  const { studentLoading, studentError, students } = useStudent();

  const [file, setFile] = useState([]);
  const {
    fetcher: getAssignmentById,
    loading: getAssignmentByIdLoading,
    error: getAssignmentByIdError,
    data: assignment,
  } = useAxios();
  const formHandler = (formData) => {
    let fileContentType;
    if (formData.file[0]) {
      fileContentType = formData.file[0].type;
      fileContentType = fileContentType.split("/")[1];
    }
    let apiData = {
      id,
      name: formData.name,
      student: {
        id: formData.student,
      },
      course: {
        id: formData.course,
      },
      isActive: true,
    };
    if (fileContentType) {
      apiData.fileContentType = fileContentType;
    }
    if (!isEmpty(file)) {
      apiData.file = file;
    }

    fetcher({
      options: {
        url: `/api/assignments/${id}`,
        method: "put",
        data: apiData,
      },
      callback: () => {
        SuccessMsg("Assignments updated successfully");
        reset();
        getAssignments();
        history.push("/assignment-list");
      },
    });
  };
  const fetchAssignmentById = () =>
    getAssignmentById({
      options: {
        url: `/api/assignments/${id}`,
      },
    });

  useEffect(() => {
    fetchAssignmentById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(students)) {
      setStudent(
        students?.content?.map((d) => ({
          id: d.id,
          value: d.id,
          name: d?.firstName + " " + d?.lastName,
        }))
      );
    }
  }, [students]);

  useEffect(() => {
    if (isEmpty(courses)) {
      getCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(courses)) {
      setCourse(
        courses?.content?.map((d) => ({
          id: d.id,
          value: d.id,
          name: d?.name,
        }))
      );
    }
  }, [courses]);

  return (
    <>
      {studentLoading || getAssignmentByIdLoading || courseLoading ? (
        <Loader />
      ) : (
        <div>
          <Error error={studentError} />
          <Error error={courseError} />
          <Error error={getAssignmentByIdError} />
          <Form
            formdata
            title="Edit Assignment"
            onSubmit={handleSubmit(formHandler)}
            formLoading={loading}
            formError={error}
          >
            <InputField
              label="Assignment Name"
              isRequired
              name="name"
              defaultInputValue={assignment?.name}
              error={errors.name}
              inputRef={register}
            />
            <InputSelectField
              isRequired
              defaultInputValue={assignment?.student?.id}
              label="Student"
              name="student"
              inputRef={register}
              items={student}
              error={errors.student}
              hasIcon
              initialIconName="fa fa-money-bill"
              iconClassNames="text-success"
              classNames="my-3"
            />
            <InputSelectField
              isRequired
              defaultInputValue={assignment?.course?.id}
              label="Course"
              name="course"
              inputRef={register}
              items={course}
              error={errors.course}
              hasIcon
              initialIconName="fa fa-money-bill"
              iconClassNames="text-success"
              classNames="my-3"
            />

            <InputField
              handleOnChange={(e) => {
                const excel = convertExcelFileToByteArray(e.target.files[0]);
                if (excel) {
                  excel.then((result) => setFile(result));
                }
              }}
              accept="application/pdf"
              type="file"
              label="Update file"
              name="file"
              error={errors.file}
              inputRef={register}
            />
          </Form>
        </div>
      )}
    </>
  );
};

export default EditAssignmentScreen;
