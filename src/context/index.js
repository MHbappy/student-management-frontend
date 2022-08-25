import CombinedProvider from "./CombinedProvider";
import { AssignmentProvider } from "./Providers/AssignmenrContext";
import { CourseProvider } from "./Providers/CourseContext";
import { DepartmentProvider } from "./Providers/DepartmentContext";
import { GradeProvider } from "./Providers/GradeContext";
import { StudentProvider } from "./Providers/StudentContext";
import { UserProvider } from "./Providers/UserContext";

const AppProvider = ({ children = null }) => (
  <CombinedProvider
    components={[
      StudentProvider,
      DepartmentProvider,
      CourseProvider,
      GradeProvider,
      AssignmentProvider,
      UserProvider,
    ]}
  >
    {children}
  </CombinedProvider>
);
export default AppProvider;
