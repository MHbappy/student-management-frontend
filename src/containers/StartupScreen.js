import { lazy, Suspense } from "react";
import FullscreenLoader from "../components/common/reusable/FullscreenLoader";
import { IS_ADMIN, IS_LOGIN } from "../constants/APP_INFO";
import PublicAplication from "./PublicAplication";

const ClientAplication = lazy(() => import("./ClientAplication"));
const AdminAplication = lazy(() => import("./AdminAplication"));

function StartupScreen() {
  return (
    <Suspense fallback={<FullscreenLoader />}>
      {!IS_LOGIN ? (
        <PublicAplication />
      ) : IS_ADMIN ? (
        <AdminAplication />
      ) : (
        <ClientAplication />
      )}
    </Suspense>
  );
}

export default StartupScreen;
