import AssignRoutes from "../components/common/reusable/AssignRoutes";
import AssignmentListScreen from "../screens/Assignments/AssignmentListScreen";
import EditAssignmentScreen from "../screens/Assignments/EditAssignmentScreen";
import SubmitAssignmentScreen from "../screens/Assignments/SubmitAssignmentScreen";
import CourseListScreen from "../screens/Courses/CourseListScreen";
import CreateNewCourseScreen from "../screens/Courses/CreateNewCourseScreen";
import EditCourseScreen from "../screens/Courses/EditCourseScreen";
import DashboardScreen from "../screens/DashboardScreen";
import CreateNewDepartmentScreen from "../screens/Departments/CreateNewDepartmentScreen";
import DepartmentListScreen from "../screens/Departments/DepartmentListScreen";
import EditDepartmentScreen from "../screens/Departments/EditDepartmentScreen";
import AssignGradeScreen from "../screens/Grade/AssignGradeScreen";
import EditGradeScreen from "../screens/Grade/EditGradeScreen";
import GradeListScreen from "../screens/Grade/GradeListScreen";
import AddInstructorScreen from "../screens/Instructors/AddInstructorScreen";
import EditInstructorScreen from "../screens/Instructors/EditInstructorScreen";
import InstructorListScreen from "../screens/Instructors/InstructorListScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import AddStudentScreen from "../screens/Students/AddStudentScreen";
import EditStudentScreen from "../screens/Students/EditStudentScreen";
import StudentListScreen from "../screens/Students/StudentListScreen";
import StudentListScreenByCourseId from "../screens/Students/StudentListScreenByCourseId";

const routes = [
  {
    path: "/",
    component: DashboardScreen,
    auth: true,
  },
  {
    path: "/create-new-department",
    component: CreateNewDepartmentScreen,
    auth: true,
  },
  {
    path: "/edit-department/:id",
    component: EditDepartmentScreen,
    auth: true,
  },
  {
    path: "/edit-course/:id",
    component: EditCourseScreen,
    auth: true,
  },
  {
    path: "/edit-instructor/:id",
    component: EditInstructorScreen,
    auth: true,
  },
  {
    path: "/edit-student/:id",
    component: EditStudentScreen,
    auth: true,
  },
  {
    path: "/edit-grade/:id",
    component: EditGradeScreen,
    auth: true,
  },
  {
    path: "/edit-assignment/:id",
    component: EditAssignmentScreen,
    auth: true,
  },
  {
    path: "/create-new-course",
    component: CreateNewCourseScreen,
    auth: true,
  },
  {
    path: "/add-student",
    component: AddStudentScreen,
    auth: true,
  },
  {
    path: "/add-instructor",
    component: AddInstructorScreen,
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
    path: "/student-list",
    component: StudentListScreen,
    auth: true,
  },
  {
    path: "/student-list/:courseId",
    component: StudentListScreenByCourseId,
    auth: true,
  },
  {
    path: "/assignment-list",
    component: AssignmentListScreen,
    auth: true,
  },
  {
    path: "/submit-assignment",
    component: SubmitAssignmentScreen,
    auth: true,
  },
  {
    path: "/assign-grade",
    component: AssignGradeScreen,
    auth: true,
  },
  {
    path: "/grade-list",
    component: GradeListScreen,
    auth: true,
  },

  { path: "*", component: NotFoundScreen, auth: true },
];

function AdminAplication() {
  return <AssignRoutes routes={routes} />;
}

export default AdminAplication;
