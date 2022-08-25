const LoadingFailedMessage = ({
  data = [],
  loading = true,
  message = "No  data found!",
}) => (
  <div>
    {data?.length === 0 && !loading && (
      <div className="alert alert-info  p-2 text-center" role="alert">
        {message}
      </div>
    )}
  </div>
);

export default LoadingFailedMessage;
