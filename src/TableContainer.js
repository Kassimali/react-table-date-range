import React, { Fragment } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination
} from "react-table";
import { Filter, DefaultColumnFilter } from "./filters";

const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Fragment>
      <table className="table table-hover" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
                {row.isExpanded && (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent(row)}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>

      <div
        className="row"
        style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}
      >
        <div className="col" md={3}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {"<"}
          </button>
        </div>
        <div className="col" md={2} style={{ marginTop: 7 }}>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </div>
        <div className="col" md={2}>
          <input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          ></input>
        </div>
        <div className="col" md={2}>
          <select
            id="custom-select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="col" md={3}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            {">"}
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default TableContainer;
