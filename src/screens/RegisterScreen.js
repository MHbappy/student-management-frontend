import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import Error from "../components/common/Error";
import InvalidInputAlert from "../components/common/InvalidInputAlert";
import { SuccessMsg } from "../components/common/reusable/ToasterNotification";
import { isEmpty } from "../helper/functions";
import useAxios from "../hooks/useAxios";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Please enter student first name."),
  lastName: yup.string().required("Please enter student last name."),
  email: yup.string().required("Please enter student email."),
  password: yup.string().required("Please enter password."),
  dob: yup.string(),
  address: yup.string(),
  contactNumber: yup.string().required("Please enter contact number."),
});

/* eslint-disable jsx-a11y/anchor-is-valid */
const RegisterScreen = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { fetcher, loading, error, data } = useAxios();
  const handleRegister = (formData) => {
    const apiData = {
      ...formData,
      studentId: " ",
      appUserRoles: ["ROLE_CLIENT"],
    };

    fetcher({
      options: {
        url: "/api/studentsRegistration",
        data: apiData,
        method: "post",
      },
      callback: () => {
        reset();
      },
    });
  };
  useEffect(() => {
    if (!isEmpty(data)) {
      SuccessMsg("Successfully registered, please login!");

      history.push("/");
    }
  }, [data, history]);
  return (
    <div className="container overflow-hidden">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-9 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <Link to="/" className="logo d-flex align-items-center w-auto">
                  <span className="d-none d-lg-block">Student Management</span>
                </Link>
              </div>
              {/* <!-- End Logo --> */}

              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Create an Account
                    </h5>
                    <p className="text-center small">
                      Enter your personal details to create account
                    </p>
                  </div>
                  <Error error={error} />
                  <form
                    className="row g-4"
                    onSubmit={handleSubmit(handleRegister)}
                  >
                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">
                        First Name{" "}
                        <font color="red" className="ms-1">
                          *
                        </font>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        id="firstName"
                        ref={register}
                      />
                      <InvalidInputAlert error={errors.firstName} />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">
                        Last Name{" "}
                        <font color="red" className="ms-1">
                          *
                        </font>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        id="lastName"
                        ref={register}
                      />
                      <InvalidInputAlert error={errors.lastName} />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email{" "}
                        <font color="red" className="ms-1">
                          *
                        </font>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        ref={register}
                      />
                      <InvalidInputAlert error={errors.email} />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="yourPassword" className="form-label">
                        Password{" "}
                        <font color="red" className="ms-1">
                          *
                        </font>
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="yourPassword"
                        ref={register}
                      />
                      <InvalidInputAlert error={errors.password} />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="dob" className="form-label">
                        Date of Birth
                        <font color="red" className="ms-1">
                          *
                        </font>
                      </label>
                      <input
                        type="date"
                        name="dob"
                        className="form-control"
                        id="dob"
                        ref={register}
                      />
                      <InvalidInputAlert error={errors.dob} />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="contactNumber" className="form-label">
                        Student Contact
                        <font color="red" className="ms-1">
                          *
                        </font>
                      </label>
                      <input
                        type="text"
                        name="contactNumber"
                        className="form-control"
                        id="contactNumber"
                        ref={register}
                      />
                      <InvalidInputAlert error={errors.contactNumber} />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="address" className="form-label">
                        Student address
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        id="address"
                        ref={register}
                      />
                      <InvalidInputAlert error={errors.address} />
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100"
                        type="submit"
                        disabled={loading}
                      >
                        Create Account
                      </button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">
                        Already have an account? <Link to="/">Log in</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterScreen;
