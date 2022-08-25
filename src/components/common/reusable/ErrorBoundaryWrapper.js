import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import swal from "sweetalert";

function ErrorFallback() {
  useEffect(() => {
    swal({
      title: "Error detected while running application.",
      text: "Clear cache and reload by pressing CTRL+SHIFT+R",
      icon: "error",
      buttons: ["Cancel", "Try again"],
      dangerMode: true,
    }).then((clicked) => {
      if (clicked) {
        window.location.assign("/");
      }
    });
  }, []);
  return <></>;
}

const handleBoundayError = (error, errorInfo) => {
  console.log("Error Occured ", error, errorInfo);
};

function ErrorBoundaryWrapper({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleBoundayError}
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundaryWrapper;
