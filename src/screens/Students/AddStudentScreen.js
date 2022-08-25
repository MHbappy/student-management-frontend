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
import { useDepartment } from "../../context/Providers/DepartmentContext";
import { useStudent } from "../../context/Providers/StudentContext";
import { isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const newStudentSchema = yup.object().shape({
  firstName: yup.string().required("Please enter student first name."),
  lastName: yup.string().required("Please enter student last name."),
  email: yup.string().required("Please enter student email."),
  dob: yup.string(),
  password: yup.string().required("Please enter password."),
  studentId: yup.string().required("Please enter studentId."),
  address: yup.string(),
  contactNumber: yup.string().required("Please enter contact number."),
  age: yup.number(),
  department: yup.string(),
});

const AddStudentScreen = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(newStudentSchema),
  });
  const { fetcher, loading, error } = useAxios();
  const [departmentList, setDepartmentList] = useState([]);
  const history = useHistory();
  const { getStudents } = useStudent();

  const {
    getDepartments: { departmentLoading, departmentError, departments },
  } = useDepartment();
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
        url: "/api/students",
        method: "post",
        data: apiData,
      },
      callback: () => {
        SuccessMsg("Students added successfully");
        reset();
        getStudents();
        history.push("/student-list");
      },
    });
  };

  useEffect(() => {
    if (!isEmpty(departments)) {
      setDepartmentList(
        departments.map((d) => ({
          id: d.id,
          value: d.id,
          name: d.name,
        }))
      );
    }
  }, [departments]);
  return (
    <>
      {departmentLoading ? (
        <Loader />
      ) : (
        <div className="overflow-hidden">
          <Error error={departmentError} />
          <Form
            title="Add new student"
            onSubmit={handleSubmit(formHandler)}
            formLoading={loading}
            formError={error}
          >
            <InputField
              label="First Name"
              isRequired
              name="firstName"
              error={errors.firstName}
              inputRef={register}
            />
            <InputField
              label="Last Name"
              isRequired
              name="lastName"
              error={errors.lastName}
              inputRef={register}
            />
            <InputField
              label="Email"
              type="email"
              isRequired
              name="email"
              error={errors.email}
              inputRef={register}
            />
            <InputField
              label="Password"
              type="password"
              isRequired
              name="password"
              error={errors.password}
              inputRef={register}
            />
            <InputField
              label="Student ID"
              isRequired
              name="studentId"
              error={errors.studentId}
              inputRef={register}
            />
            <InputField
              label="Date of birth"
              isRequired
              name="dob"
              type="date"
              error={errors.dob}
              inputRef={register}
            />

            <InputField
              label="Student Contact"
              isRequired
              name="contactNumber"
              error={errors.contactNumber}
              inputRef={register}
            />

            <InputField
              label="Student address"
              name="address"
              error={errors.address}
              inputRef={register}
            />
            <InputSelectField
              type="text"
              label="Department"
              name="department"
              inputRef={register}
              items={departmentList}
              error={errors.department}
              hasIcon
              initialIconName="fa fa-money-bill"
              iconClassNames="text-success"
              classNames="my-3"
            />
          </Form>
        </div>
      )}
    </>
  );
};

export default AddStudentScreen;
