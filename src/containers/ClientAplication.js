import AssignRoutes from "../components/common/reusable/AssignRoutes";
import AssignmentListScreen from "../screens/Assignments/AssignmentListScreen";
import CourseListScreen from "../screens/Courses/CourseListScreen";
import DashboardScreen from "../screens/DashboardScreen";
import DepartmentListScreen from "../screens/Departments/DepartmentListScreen";
import GradeListScreen from "../screens/Grade/GradeListScreen";
import InstructorListScreen from "../screens/Instructors/InstructorListScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import StudentListScreenByCourseId from "../screens/Students/StudentListScreenByCourseId";

const routes = [
  {
    path: "/",
    component: DashboardScreen,
    auth: true,
  },

  {
    path: "/department-list",
    component: DepartmentListScreen,
    auth: true,
  },
  {
    path: "/course-list",
    component: CourseListScreen,
    auth: true,
  },
  {
    path: "/instructor-list",
    component: InstructorListScreen,
    auth: true,
  },
  {
    path: "/assignment-list",
    component: AssignmentListScreen,
    auth: true,
  },
  {
    path: "/student-list/:courseId",
    component: StudentListScreenByCourseId,
    auth: true,
  },

  {
    path: "/grade-list",
    component: GradeListScreen,
    auth: true,
  },

  { path: "*", component: NotFoundScreen, auth: true },
];

function ClientAplication() {
  return <AssignRoutes routes={routes} />;
}

export default ClientAplication;
