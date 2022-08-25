import AssignRoutes from "../components/common/reusable/AssignRoutes";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const routes = [
  {
    path: "/",
    component: LoginScreen,
  },
  { path: "/register", component: RegisterScreen },
];

function PublicAplication() {
  return <AssignRoutes routes={routes} />;
}

export default PublicAplication;
