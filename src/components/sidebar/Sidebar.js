/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link, useLocation } from "react-router-dom";
import { IS_ADMIN } from "../../constants/APP_INFO";
import { useCourse } from "./../../context/Providers/CourseContext";
import { useStudent } from "./../../context/Providers/StudentContext";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { getStudents } = useStudent();
  const { getCourses } = useCourse();

  const adminSidebar = [
    {
      title: "Dashboard",
      icon: "bi bi-grid",
      link: "/",
    },
    {
      title: "Departments",
      icon: "bi bi-chevron-down",
      child: [
        {
          title: "Create department",
          link: "/create-new-department",
        },
        {
          title: "Departments List",
          link: "/department-list",
        },
      ],
    },
    {
      title: "Courses",
      icon: "bi bi-chevron-down",
      child: [
        {
          title: "Create course",
          link: "/create-new-course",
        },
        {
          title: "Courses List",
          link: "/course-list",
          handleClick: getCourses,
        },
      ],
    },
    {
      title: "Instructors",
      icon: "bi bi-chevron-down",
      child: [
        {
          title: "Add Instructors",
          link: "/add-instructor",
        },
        {
          title: "Instructors List",
          link: "/instructor-list",
        },
      ],
    },
    {
      title: "Students",
      icon: "bi bi-chevron-down",
      child: [
        {
          title: "Add Students",
          link: "/add-student",
        },
        {
          title: "Students List",
          link: "/student-list",
          handleClick: getStudents,
        },
      ],
    },
    {
      title: "Grade",
      icon: "bi bi-chevron-down",
      child: [
        {
          title: "Assign Grade",
          link: "/assign-grade",
        },
        {
          title: "Grade List",
          link: "/grade-list",
        },
      ],
    },
    {
      title: "Assignments",
      icon: "bi bi-chevron-down",
      child: [
        {
          title: "Submit Assignments",
          link: "/submit-assignment",
        },
        {
          title: "Assignments List",
          link: "/assignment-list",
        },
      ],
    },
  ];
  const clientSidebar = [
    {
      title: "Dashboard",
      icon: "bi bi-grid",
      link: "/",
    },
    {
      title: "Departments",
      icon: "bi bi-chevron-down",
      child: [
        {
          title: "Departments List",
          link: "/department-list",
        },
      ],
    },
    {
      title: "Courses",
      icon: "bi bi-chevron-down",
      child: [
        {
          title: "Courses List",
          link: "/course-list",
          handleClick: getCourses,
        },
      ],
    },
    {
      title: "Instructors",
      icon: "bi bi-chevron-down",
      child: [
        {
          title: "Instructors List",
          link: "/instructor-list",
        },
      ],
    },

    {
      title: "Grade",
      icon: "bi bi-chevron-down",
      child: [
        {
          title: "Grade List",
          link: "/grade-list",
        },
      ],
    },
    {
      title: "Assignments",
      icon: "bi bi-chevron-down",
      child: [
        {
          title: "Assignments List",
          link: "/assignment-list",
        },
      ],
    },
  ];

  const sidebar = IS_ADMIN ? adminSidebar : clientSidebar;

  return (
    <aside id="sidebar" data-testid="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {/* <!-- End Dashboard Nav --> */}
        {sidebar.map((nav, index) =>
          nav.child ? (
            <li className="nav-item" key={index}>
              <a
                className="nav-link collapsed"
                data-bs-target={`#${nav.title}-nav`}
                data-bs-toggle="collapse"
                href="#!"
              >
                <i className="bi bi-menu-button-wide"></i>
                <span className="text-capitalize">{nav.title}</span>
                <i className={`bi bi-chevron-down ms-auto`}></i>
              </a>
              <ul
                id={`${nav.title}-nav`}
                className={`nav-content collapse ${
                  nav.child.map((childNav) => childNav.link).includes(pathname)
                    ? "show"
                    : "hide"
                }`}
                data-bs-parent="#sidebar-nav"
              >
                {nav.child.map((childNav, index) => (
                  <li key={index} onClick={() => childNav?.handleClick()}>
                    <Link to={childNav.link}>
                      <i className="bi bi-circle"></i>
                      <span
                        className={
                          pathname === childNav.link
                            ? "text-primary  text-capitalize"
                            : " text-capitalize"
                        }
                      >
                        {childNav.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li className="nav-item" key={index + nav.title}>
              <Link className="nav-link collapsed" to={nav.link}>
                <i className={nav.icon}></i>
                <span className={pathname === nav.link ? "text-primary" : ""}>
                  {nav.title}
                </span>
              </Link>
            </li>
          )
        )}

        {/* <!-- End Components Nav --> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
