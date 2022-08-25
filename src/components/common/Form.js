import Card from "./Card";
import Error from "./Error";
import SubmitBtn from "./SubmitBtn";
import Title from "./Title";

const Form = ({
  title = "",
  onSubmit = null,
  children,
  formdata = false,
  formLoading = false,
  formError = "",
  label,
}) => {
  return (
    <Card>
      <Title title={title} />
      <Error error={formError} />
      <form
        onSubmit={onSubmit}
        encType={formdata ? "multipart/form-data" : null}
      >
        {children}
        <SubmitBtn label={label} loading={formLoading} />
      </form>
    </Card>
  );
};

export default Form;
