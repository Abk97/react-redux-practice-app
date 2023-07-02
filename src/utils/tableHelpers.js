import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

export const filterData = (data, pageFilters) => {
  let finalData = data;
  const { size, page, searchInput, searchBy } = pageFilters;
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;

  if (searchInput) {
    finalData = data.filter(
      (rowData) =>
        rowData[searchBy].toLowerCase().substring(0, searchInput.length) ===
        searchInput.toLowerCase()
    );
  }

  return finalData.slice(startIndex, endIndex);
};

export const getPaginationCounts = (count, page, size) => {
  let initialCount = 0;
  let finalCount = 0;
  if (count) {
    initialCount = 1 + (page - 1) * size;
    finalCount = initialCount + count - 1;
  }
  return {
    initialCount,
    finalCount,
  };
};

export const getIcons = (label, sortBy, sortOrder) => {
  if (label !== sortBy) {
    return (
      <div>
        <TiArrowUnsorted />
      </div>
    );
  }

  if (sortOrder === null) {
    return (
      <div>
        <TiArrowUnsorted />
      </div>
    );
  } else if (sortOrder === "asc") {
    return (
      <div>
        <TiArrowSortedUp />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div>
        <TiArrowSortedDown />
      </div>
    );
  }
};

// export const getActionsHtml = (actions) => {
//   return (
//     <div>
//       {actions.map((action, index) => {
//         const { label, handlerFn } = action;
//         const delimiter = index < actions.length - 1 ? " | " : "";
//         return (
//           <Fragment key={label}>
//             <a
//               onClick={(e) => {
//                 e.preventDefault();
//                 handlerFn();
//               }}
//               href={label}
//             >
//               {label}
//             </a>
//             {delimiter}
//           </Fragment>
//         );
//       })}
//     </div>
//   );
// };
