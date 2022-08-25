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

const EditInstructorScreen = () => {
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const {
    fetcher: departmentsFetcher,
    loading: departmentLoading,
    error: departmentError,
    data: departmentData,
  } = useAxios([]);

  const getDepartments = () =>
    departmentsFetcher({
      options: {
        url: "/api/departments",
      },
    });

  const history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(newInstructorSchema),
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
        url: `/api/instructors/${id}`,
        method: "put",
        data: { ...apiData, isActive: true, id },
      },
      callback: () => {
        SuccessMsg("Instructors updated successfully");
        reset();
        history.push("/instructor-list");
      },
    });
  };
  const fetchCourse = () =>
    getinstructorById({
      options: {
        url: `/api/instructors/${id}`,
      },
    });

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getDepartments();
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
        <>
          <Error error={getinstructorByIdError} />
          <Error error={departmentError} />

          <Form
            title="Edit Instructor"
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
              label="Instructor ID"
              isRequired
              defaultInputValue={data?.teacherId}
              name="teacherId"
              error={errors.teacherId}
              inputRef={register}
            />
            {/* <InputField
              label="Instructors age"
              name="age"
              error={errors.age}
              inputRef={register}
            /> */}
            <InputField
              label="Instructor address"
              name="address"
              defaultInputValue={data?.address}
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
        </>
      )}
    </div>
  );
};

export default EditInstructorScreen;
