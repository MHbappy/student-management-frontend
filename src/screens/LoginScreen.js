import { yupResolver } from "@hookform/resolvers/yup";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import Error from "../components/common/Error";
import { isEmpty } from "../helper/functions";
import InvalidInputAlert from "./../components/common/InvalidInputAlert";
import useAxios from "./../hooks/useAxios";
const loginSchema = yup.object().shape({
  username: yup.string().required("Please enter your username."),
  password: yup.string().required(" Please enter your password."),
});

const LoginScreen = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { fetcher, loading, error, data } = useAxios();
  const handleLogin = (formData) => {
    fetcher({
      options: {
        url: "/users/signin",
        params: formData,
        method: "post",
      },
      callback: () => {
        reset();
      },
    });
  };
  useEffect(() => {
    if (!isEmpty(data)) {
      const user = jwtDecode(data);
      if (user) {
        localStorage.setItem("userInfo", JSON.stringify(user));
      }
      localStorage.setItem("access_token", data);
      history.push("/");
      window.location.reload();
    }
  }, [data, history]);

  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
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
                      Login to Your Account
                    </h5>
                    <p className="text-center small">
                      Enter your username & password to login
                    </p>
                  </div>
                  <Error error={error} />

                  <form
                    className="row g-3"
                    onSubmit={handleSubmit(handleLogin)}
                  >
                    <div className="col-12">
                      <label htmlFor="yourUsername" className="form-label">
                        Username
                      </label>
                      <div className="input-group has-validation">
                        <span className="input-group-text">@</span>
                        <input
                          id="yourUsername"
                          type="email"
                          name="username"
                          ref={register}
                          className="form-control"
                          required
                        />
                        <InvalidInputAlert error={errors.username} />
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="yourPassword" className="form-label">
                        Password
                      </label>
                      <input
                        id="yourPassword"
                        type="password"
                        name="password"
                        className="form-control"
                        ref={register}
                        required
                      />
                      <InvalidInputAlert error={errors.password} />
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Please wait..." : "Login"}
                      </button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">
                        Don't have account?{" "}
                        <Link to="/register">Create an account</Link>
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

export default LoginScreen;
