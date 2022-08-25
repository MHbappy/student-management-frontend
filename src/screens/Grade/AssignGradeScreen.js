import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import Error from "../../components/common/Error";
import Form from "../../components/common/Form";
import InputField from "../../components/common/InputField";
import InputSelectField from "../../components/common/InputSelectField";
import Loader from "../../components/common/reusable/Loader";
import { SuccessMsg } from "../../components/common/reusable/ToasterNotification";
import { useGrade } from "../../context/Providers/GradeContext";
import { useStudent } from "../../context/Providers/StudentContext";
import { isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const newCourseSchema = yup.object().shape({
  name: yup.string().required("Please enter course name."),
  number: yup
    .number()
    .required("Please enter number")
    .typeError("Please enter a number"),
  student: yup
    .number()
    .required("Please select a student")
    .typeError("Please select a student"),
});

const AssignGradeScreen = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(newCourseSchema),
  });
  const { fetcher, loading, error } = useAxios();

  const [student, setStudent] = useState([]);
  const history = useHistory();
  const { getGrades } = useGrade();

  const { studentLoading, studentError, students } = useStudent();

  const formHandler = (formData) => {
    let apiData = {
      name: formData.name,
      number: formData.number,
      student: {
        id: formData.student,
        departments: {
          id: formData.department,
        },
      },
      isActive: true,
    };

    fetcher({
      options: {
        url: "/api/grades",
        method: "post",
        data: apiData,
      },
      callback: () => {
        SuccessMsg("Grade assign successfully");
        reset();
        getGrades();
        history.push("/grade-list");
      },
    });
  };

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

  return (
    <>
      {studentLoading ? (
        <Loader />
      ) : (
        <div>
          <Error error={studentError} />
          <Form
            title="Assign Grade"
            onSubmit={handleSubmit(formHandler)}
            formLoading={loading}
            formError={error}
          >
            <InputSelectField
              isRequired
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
            <InputField
              label="Grade"
              isRequired
              name="name"
              error={errors.name}
              inputRef={register}
            />
            <InputField
              label="Number"
              isRequired
              name="number"
              error={errors.number}
              inputRef={register}
            />
          </Form>
        </div>
      )}
    </>
  );
};

export default AssignGradeScreen;
