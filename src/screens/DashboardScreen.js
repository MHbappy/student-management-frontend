import { USER_INFO } from "../constants/APP_INFO";
import Card from "./../components/common/Card";

const DashboardScreen = () => {

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Card>
        <div className="text-center p-4 pb-0">
          <h3>
            Welcome to Student Management <br />
            <hr />
            <span className="text-primary text-capitalize">
              {USER_INFO?.sub}
            </span>
          </h3>
        </div>
      </Card>
    </div>
  );
};

export default DashboardScreen;
