import PropagateLoader from "react-spinners/PropagateLoader";

function FullscreenLoader() {
  return (
    <div
      className="container"
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <PropagateLoader color="#0B5ED7" size={15} />
    </div>
  );
}

export default FullscreenLoader;
