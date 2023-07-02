import { Fragment } from "react";
import Table from "react-bootstrap/Table";

function CustomTable({ data, config, keyFn }) {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }

    return <th key={column.label}>{column.label}</th>;
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return <td key={column.label}>{column.render(rowData)}</td>;
    });

    return <tr key={keyFn(rowData)}>{renderedCells}</tr>;
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>
        {renderedRows}
        {renderedRows.length === 0 && (
          <tr>
            <td colSpan={3}>No Records to display</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default CustomTable;
