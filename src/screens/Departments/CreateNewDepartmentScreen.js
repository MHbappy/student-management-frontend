import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import Form from "../../components/common/Form";
import InputField from "../../components/common/InputField";
import { SuccessMsg } from "../../components/common/reusable/ToasterNotification";
import { useDepartment } from "../../context/Providers/DepartmentContext";
import useAxios from "../../hooks/useAxios";

const newDepartmentSchema = yup.object().shape({
  name: yup.string().required("Please enter department name."),
});

const CreateNewDepartmentScreen = () => {
  const {
    getDepartments: { getDepartments },
  } = useDepartment();

  const history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(newDepartmentSchema),
  });
  const { fetcher, loading, error } = useAxios();
  const formHandler = (formData) => {
    fetcher({
      options: {
        url: "/api/departments",
        method: "post",
        data: { ...formData, isActive: true },
      },
      callback: () => {
        SuccessMsg("Departments created successfully");
        reset();
        getDepartments();
        history.push("/department-list");
      },
    });
  };
  return (
    <div>
      <Form
        title="Create New Department"
        onSubmit={handleSubmit(formHandler)}
        formLoading={loading}
        formError={error}
      >
        <InputField
          label="Department Name"
          isRequired
          name="name"
          error={errors.name}
          inputRef={register}
        />
      </Form>
    </div>
  );
};

export default CreateNewDepartmentScreen;
