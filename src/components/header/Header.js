/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { USER_INFO } from "../../constants/APP_INFO";

const Header = () => {
  const [isToggle, setIsToggle] = useState(false);
  const history = useHistory();

  useEffect(() => {
    isToggle
      ? document.body.classList.add("toggle-sidebar")
      : document.body.classList.remove("toggle-sidebar");
  }, [isToggle]);
  return (
    <header id="header" data-testid="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <span className="d-none d-lg-block fs-4">Student Management</span>
        </Link>
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={() => {
            setIsToggle(!isToggle);
          }}
        ></i>
      </div>
      {/* <!-- End Logo --> */}

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-person-circle fs-2"></i>
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {USER_INFO?.sub?.split("@")[0]}
              </span>
            </a>
            {/* <!-- End Profile Iamge Icon --> */}

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{USER_INFO?.sub}</h6>
                <span>{USER_INFO?.auth?.map((e) => e.authority)}</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <div
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => {
                    localStorage.clear();
                    history.push("/");
                    window.location.reload();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </div>
              </li>
            </ul>
            {/* <!-- End Profile Dropdown Items --> */}
          </li>
          {/* <!-- End Profile Nav --> */}
        </ul>
      </nav>
      {/* <!-- End Icons Navigation --> */}
    </header>
  );
};

export default Header;
