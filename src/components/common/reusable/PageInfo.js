const PageInfo = ({ paginationAccess = {} }) => (
  <div>
    <p>
      Showing items{' '}
      <strong>
        {paginationAccess?.pageable?.pageNumber * paginationAccess?.pageable?.pageSize +
          paginationAccess?.numberOfElements || 0}
      </strong>{' '}
      of <strong>{paginationAccess?.totalElements || 0}</strong>
    </p>
  </div>
);

export default PageInfo;
