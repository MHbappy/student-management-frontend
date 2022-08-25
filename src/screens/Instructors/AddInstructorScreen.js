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
import { isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const newInstructorSchema = yup.object().shape({
  firstName: yup.string().required("Please enter instructor first name."),
  lastName: yup.string().required("Please enter instructor last name."),
  email: yup.string().required("Please enter instructor email."),
  teacherId: yup.string().required("Please enter teacherId."),
  address: yup.string(),
  age: yup.number(),
  department: yup.string(),
});

const AddInstructorScreen = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(newInstructorSchema),
  });
  const { fetcher, loading, error } = useAxios();
  const [departmentList, setDepartmentList] = useState([]);
  const history = useHistory();

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
        url: "/api/instructors",
        method: "post",
        data: apiData,
      },
      callback: () => {
        SuccessMsg("Instructors added successfully");
        reset();
        history.push("/instructor-list");
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
        <div>
          <Error error={departmentError} />
          <Form
            title="Add new instructor"
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
              label="Instructor ID"
              isRequired
              name="teacherId"
              error={errors.teacherId}
              inputRef={register}
            />
            <InputField
              label="Instructor address"
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

export default AddInstructorScreen;
