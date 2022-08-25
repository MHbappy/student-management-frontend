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
import { useCourse } from "../../context/Providers/CourseContext";
import { useDepartment } from "../../context/Providers/DepartmentContext";
import { isEmpty } from "../../helper/functions";
import useAxios from "../../hooks/useAxios";

const newCourseSchema = yup.object().shape({
  name: yup.string().required("Please enter course name."),
  code: yup.string().required("Please enter course name."),
  department: yup.string(),
});

const CreateNewCourseScreen = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(newCourseSchema),
  });
  const { fetcher, loading, error } = useAxios();
  const [departmentList, setDepartmentList] = useState([]);
  const history = useHistory();
  const { getCourses } = useCourse();

  const {
    getDepartments: { departmentLoading, departmentError, departments },
  } = useDepartment();

  const formHandler = (formData) => {
    let apiData = {
      name: formData.name,
      code: formData.code,
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
        url: "/api/courses",
        method: "post",
        data: apiData,
      },
      callback: () => {
        SuccessMsg("Courses created successfully");
        reset();
        getCourses();
        history.push("/course-list");
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
            title="Create New Course"
            onSubmit={handleSubmit(formHandler)}
            formLoading={loading}
            formError={error}
          >
            <InputField
              label="Course Name"
              isRequired
              name="name"
              error={errors.name}
              inputRef={register}
            />
            <InputField
              label="Course Code"
              isRequired
              name="code"
              error={errors.code}
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

export default CreateNewCourseScreen;
