import PageInfo from "./PageInfo";
import Pagination from "./Pagination";

const PaginationInformation = ({
  paginationAccess = {},
  handlePageChanges = null,
}) => (
  <>
    {paginationAccess?.totalPages > 1 && (
      <div className="container-fluid">
        <div className="row mt-4 bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <Pagination
              paginationAccess={paginationAccess}
              onPageChange={handlePageChanges}
            />
            <PageInfo paginationAccess={paginationAccess} />
          </div>
        </div>
      </div>
    )}
  </>
);

export default PaginationInformation;
