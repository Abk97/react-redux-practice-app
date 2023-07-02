import Pagination from "react-bootstrap/Pagination";

function CustomPagination(props) {
  const { currentPage, pageSize, totalCount, pageClickHandler } = props;
  const pageCount = Math.ceil(totalCount / pageSize);
  let items = [];

  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => pageClickHandler(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage <= 1}
        onClick={() =>
          pageClickHandler(currentPage - 1 === 0 ? 1 : currentPage - 1)
        }
      >
        Previous
      </Pagination.Prev>
      {items}
      <Pagination.Next
        disabled={currentPage >= pageCount}
        onClick={() =>
          pageClickHandler(
            currentPage + 1 > pageCount ? pageCount : currentPage + 1
          )
        }
      >
        Next
      </Pagination.Next>
    </Pagination>
  );
}

export default CustomPagination;
