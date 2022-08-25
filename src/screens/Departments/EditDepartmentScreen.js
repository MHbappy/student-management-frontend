import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import Error from "../../components/common/Error";
import Form from "../../components/common/Form";
import InputField from "../../components/common/InputField";
import Loader from "../../components/common/reusable/Loader";
import { useDepartment } from "../../context/Providers/DepartmentContext";

const newCourseSchema = yup.object().shape({
  name: yup.string().required("Please enter department name."),
});

const EditDepartmentScreen = () => {
  const { id } = useParams();
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(newCourseSchema),
  });

  const {
    getDepartmentById: {
      fetchDepartmentById,
      getDepartmentByIdLoading,
      getDepartmentByIdError,
      department,
    },
    editDepartment: {
      editDepartment,
      editDepartmentLoading,
      editDepartmentError,
    },
  } = useDepartment();

  const formHandler = (formData) => {
    const apiData = { ...formData, isActive: true, id };
    editDepartment({ data: apiData, id, reset });
  };

  useEffect(() => {
    fetchDepartmentById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {getDepartmentByIdLoading ? (
        <Loader />
      ) : (
        <Form
          title="Edit Department"
          onSubmit={handleSubmit(formHandler)}
          formLoading={editDepartmentLoading}
          formError={editDepartmentError}
        >
          <Error error={getDepartmentByIdError} />
          <InputField
            label="Department Name"
            isRequired
            defaultInputValue={department?.name}
            name="name"
            error={errors.name}
            inputRef={register}
          />
        </Form>
      )}
    </div>
  );
};

export default EditDepartmentScreen;
