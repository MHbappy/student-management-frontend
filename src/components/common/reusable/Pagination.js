// eslint-disable-next-line import/no-unresolved
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ paginationAccess = null, onPageChange = null }) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (paginationAccess.pageSize && paginationAccess.totalElements) {
      setTotalPages(
        () =>
          Math.floor(
            paginationAccess?.totalElements / paginationAccess?.pageSize
          ) + 1
      );
    }
  }, [paginationAccess.pageSize, paginationAccess.totalElements]);

  return (
    <>
      {paginationAccess?.content?.length ? (
        <div className="" aria-label="Page navigation">
          <ReactPaginate
            containerClassName="pagination"
            previousLabel="<<"
            nextLabel=">>"
            previousClassName="page-item"
            previousLinkClassName="page-link text-dark"
            nextClassName="page-item"
            nextLinkClassName="page-link text-dark"
            disabledClassName="disabled"
            breakClassName="page-item"
            activePageClassName="active"
            activeClassName="active"
            pageLinkClassName="page-link"
            activeLinkClassName="active"
            pageClassName="page-item mx-1 rounded shadow-sm"
            breakLabel="..."
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={paginationAccess?.totalPages || totalPages}
            onPageChange={onPageChange}
            forcePage={
              paginationAccess?.pageable?.pageNumber ||
              paginationAccess?.pageNumber
            }
          />
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
