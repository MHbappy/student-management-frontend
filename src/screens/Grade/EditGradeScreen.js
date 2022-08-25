import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
import Card from "../../components/common/Card";
import Error from "../../components/common/Error";
import Form from "../../components/common/Form";
import InputField from "../../components/common/InputField";
import InputSelectField from "../../components/common/InputSelectField";
import LoadingFailedMessage from "../../components/common/LoadingFailedMessage";
import Loader from "../../components/common/reusable/Loader";
import { SuccessMsg } from "../../components/common/reusable/ToasterNotification";
import Title from "../../components/common/Title";
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

const EditGradeScreen = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(newCourseSchema),
  });
  const { fetcher, loading, error } = useAxios();
  const { studentLoading, studentError, students } = useStudent();

  const [student, setStudent] = useState([]);
  const history = useHistory();
  const { getGrades } = useGrade();
  const { id } = useParams();

  const {
    fetcher: getGradeById,
    loading: getGradeByIdLoading,
    error: getGradeByIdError,
    data: grade,
  } = useAxios();

  const fetchGradeById = () =>
    getGradeById({
      options: {
        url: `/api/grades/${id}`,
      },
    });

  const [toggleMode, setToggleMode] = useState(false);

  const formHandler = (formData) => {
    let apiData = {
      id,
      name: formData.name,
      number: formData.number,
      student: {
        id: formData.student,
      },
      isActive: true,
    };

    fetcher({
      options: {
        url: `/api/grades/${id}`,
        method: "put",
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
    fetchGradeById();
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

  return (
    <>
      {studentLoading || getGradeByIdLoading ? (
        <Loader />
      ) : (
        <div>
          <Error error={studentError} />
          <Error error={getGradeByIdError} />
          {toggleMode ? (
            <>
              <Form
                title="Edit Grade"
                onSubmit={handleSubmit(formHandler)}
                formLoading={loading}
                formError={error}
              >
                <InputSelectField
                  isRequired
                  label="Student"
                  name="student"
                  defaultInputValue={grade?.student?.id}
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
                  defaultInputValue={grade?.name}
                  name="name"
                  error={errors.name}
                  inputRef={register}
                />
                <InputField
                  label="Number"
                  isRequired
                  name="number"
                  defaultInputValue={grade?.number}
                  error={errors.number}
                  inputRef={register}
                />
              </Form>
              <button
                className="btn btn-danger"
                onClick={() => setToggleMode(!toggleMode)}
              >
                Switch to view
              </button>
            </>
          ) : (
            <>
              <Card className="pt-4">
                <Title
                  title={`Viewing grade : ${
                    grade?.student?.firstName + " " + grade?.student?.lastName
                  }`}
                />
                <div className="table-responsive">
                  <table className="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Key</th>
                        <th scope="col">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-bold">Student Name</td>
                        <td>
                          {grade?.student?.firstName +
                            " " +
                            grade?.student?.lastName}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Student ID</td>
                        <td>{grade?.student?.id}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Student Contact</td>
                        <td>{grade?.student?.contactNumber}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Student Address</td>
                        <td>{grade?.student?.address}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Department</td>
                        <td>{grade?.student?.departments?.name}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Grade</td>
                        <td>{grade?.name}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Number</td>
                        <td>{grade?.number}</td>
                      </tr>
                    </tbody>
                  </table>
                  <LoadingFailedMessage
                    data={grade}
                    loading={getGradeByIdLoading}
                  />
                </div>
              </Card>
              <button
                className="btn btn-danger"
                onClick={() => setToggleMode(!toggleMode)}
              >
                Edit grade
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default EditGradeScreen;
