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
import { useDepartment } from "../../context/Providers/DepartmentContext";
import { useStudent } from "../../context/Providers/StudentContext";
import { isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const newStudentSchema = yup.object().shape({
  firstName: yup.string().required("Please enter student first name."),
  lastName: yup.string().required("Please enter student last name."),
  email: yup.string().required("Please enter student email."),
  studentId: yup.string().required("Please enter studentId."),
  dob: yup.string().required("Please enter date of birth."),
  address: yup.string(),
  contactNumber: yup.string().required("Please enter contact number."),
  department: yup.string(),
});

const EditStudentScreen = () => {
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const { getStudents } = useStudent();

  const {
    getDepartments: {
      departmentLoading,
      departmentError,
      departments: departmentData,
    },
  } = useDepartment();

  const history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(newStudentSchema),
  });
  const { fetcher, loading, error } = useAxios();
  const {
    fetcher: getinstructorById,
    loading: getinstructorByIdLoading,
    error: getinstructorByIdError,
    data,
  } = useAxios();

  const formHandler = (formData) => {
    let apiData = {
      ...formData,
      isActive: true,
    };
    if (formData.department) {
      apiData = {
        ...apiData,
        departments: {
          id: Number(formData.department),
        },
      };
    }
    fetcher({
      options: {
        url: `/api/students/${id}`,
        method: "put",
        data: { ...apiData, isActive: true, id },
      },
      callback: () => {
        SuccessMsg("Students updated successfully");
        reset();
        getStudents();
        history.push("/student-list");
      },
    });
  };
  const fetchCourse = () =>
    getinstructorById({
      options: {
        url: `/api/students/${id}`,
      },
    });

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(departmentData)) {
      setDepartments(
        departmentData.map((d) => ({
          id: d.id,
          value: d.id,
          name: d.name,
        }))
      );
    }
  }, [departmentData]);
  return (
    <div>
      {getinstructorByIdLoading || departmentLoading ? (
        <Loader />
      ) : (
        <div className="overflow-hidden">
          <Error error={getinstructorByIdError} />
          <Error error={departmentError} />

          <Form
            title="Edit Student"
            onSubmit={handleSubmit(formHandler)}
            formLoading={loading}
            formError={error}
          >
            <InputField
              label="First Name"
              defaultInputValue={data?.firstName}
              isRequired
              name="firstName"
              error={errors.firstName}
              inputRef={register}
            />
            <InputField
              label="Last Name"
              defaultInputValue={data?.lastName}
              isRequired
              name="lastName"
              error={errors.lastName}
              inputRef={register}
            />
            <InputField
              label="Email"
              defaultInputValue={data?.email}
              type="email"
              isRequired
              name="email"
              error={errors.email}
              inputRef={register}
            />
            <InputField
              label="Student ID"
              defaultInputValue={data?.studentId}
              isRequired
              name="studentId"
              error={errors.studentId}
              inputRef={register}
            />
            <InputField
              label="Date of birth"
              defaultInputValue={
                !isEmpty(data?.dob)
                  ? `${data?.dob[0]}-${
                      data?.dob[1] < 10 ? `0${data?.dob[1]}` : data?.dob[1]
                    }-${data?.dob[2] < 10 ? `0${data?.dob[2]}` : data?.dob[2]}`
                  : null
              }
              isRequired
              name="dob"
              type="date"
              error={errors.dob}
              inputRef={register}
            />

            <InputField
              isRequired
              label="Student Contact"
              name="contactNumber"
              defaultInputValue={data?.contactNumber}
              error={errors.contactNumber}
              inputRef={register}
            />
            {/* <InputField
              label="Students age"
              name="age"
              error={errors.age}
              inputRef={register}
            /> */}
            <InputField
              defaultInputValue={data?.address}
              label="Student address"
              name="address"
              error={errors.address}
              inputRef={register}
            />
            <InputSelectField
              type="text"
              label="Department"
              name="department"
              defaultInputValue={data?.departments?.id}
              inputRef={register}
              items={departments}
              error={errors.department}
              hasIcon
              initialIconName="fa fa-money-bill"
              iconClassNames="text-success"
              classNames="my-3"
            />
          </Form>
        </div>
      )}
    </div>
  );
};

export default EditStudentScreen;
