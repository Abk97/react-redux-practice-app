import { useState } from "react";
import Table from "../UI/Table";
import Dropdown from "../UI/Dropdown";
import Pagination from "../UI/Pagination";
import debounce from "../../utils/debounce";
import useSort from "../../hooks/use-sort";
import {
  filterData,
  getPaginationCounts,
  getIcons,
} from "../../utils/tableHelpers";
import classes from "./Todos.module.css";

function TableView(props) {
  const [searchText, setSearchText] = useState("");
  const [pageData, setPageData] = useState({
    size: 10,
    page: 1,
    searchInput: "",
    searchBy: "date",
  });

  const config = [
    {
      label: "Date",
      render: (todo) => todo.date,
      sortValue: (todo) => todo.date,
    },
    {
      label: "Time",
      render: (todo) => todo.time,
      sortValue: (todo) => todo.time,
    },
    {
      label: "Action",
      render: (todo) => (
        <div className={classes.actions}>
          <a
            onClick={(e) => {
              e.preventDefault();
              props.onEdit(todo);
            }}
            href="Edit"
          >
            Edit
          </a>{" "}
          |{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              props.onRemove(todo.id);
            }}
            href="Delete"
          >
            Delete
          </a>
        </div>
      ),
    },
  ];

  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(
    props.data,
    config
  );
  const filteredData = filterData(sortedData, pageData);
  const totalCount = props.data.length;
  const { initialCount, finalCount } = getPaginationCounts(
    filteredData.length,
    pageData.page,
    pageData.size
  );

  const searchHandler = (e) => {
    const { value } = e.target;
    setSearchText(value);
    debounce(() => {
      setPageData((prevState) => ({
        ...prevState,
        searchInput: value,
      }));
    })();
  };

  const searchByHandler = (e) => {
    e.preventDefault();
    const { id } = e.target;
    setPageData((prevState) => ({
      ...prevState,
      searchBy: id,
    }));
  };

  const keyFn = (todo) => {
    return todo.id;
  };

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th onClick={() => setSortColumn(column.label)}>
          <div className={classes.sortableHeader}>
            {column.label}
            {getIcons(column.label, sortBy, sortOrder)}
          </div>
        </th>
      ),
    };
  });

  return (
    <div>
      <div className={classes.tableFilters}>
        <div className={classes.column}>
          <label htmlFor="pageSize">Show Entries</label>
          <Dropdown
            text={pageData.size}
            menuItems={[10, 25, 50]}
            handleSelection={(e) =>
              setPageData({
                ...pageData,
                size: Number(e),
              })
            }
          />
        </div>
        <div className={classes.column}>
          <div>
            <label htmlFor="searchText">
              Search by {pageData.searchBy} (
              <a href="date" id="date" onClick={searchByHandler}>
                date
              </a>
              ,{" "}
              <a href="time" id="time" onClick={searchByHandler}>
                time
              </a>
              )
            </label>
          </div>
          <input
            type="text"
            id="search"
            placeholder={`Search by ${pageData.searchBy}`}
            value={searchText}
            onChange={searchHandler}
          />
        </div>
      </div>
      <div>
        <Table keyFn={keyFn} data={filteredData} config={updatedConfig} />
        <span>
          Showing {initialCount}-{finalCount} of {totalCount} records
        </span>
      </div>
      <div className={classes.paginationSection}>
        <Pagination
          pageSize={pageData.size}
          currentPage={pageData.page}
          totalCount={totalCount}
          pageClickHandler={(value) => {
            setPageData((prevState) => ({
              ...prevState,
              page: value,
            }));
          }}
        />
      </div>
    </div>
  );
}

export default TableView;
