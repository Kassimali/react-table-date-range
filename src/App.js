// Original Thread: https://github.com/TanStack/table/discussions/2453

import React, { useEffect, useState, useMemo } from "react";

import TableContainer from "./TableContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SelectColumnFilter,
  DateRangeColumnFilter,
  dateBetweenFilterFn
} from "./filters";

const App = () => {
  const rowData = React.useMemo(
    () => [
      {
        date: "11/23/2022 02:58:12"
      },
      {
        date: "09/29/2022 07:58:12"
      },
      {
        date: "10/13/2022 19:58:12"
      }
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Filter: DateRangeColumnFilter,
        filter: dateBetweenFilterFn
      }
    ],
    []
  );

  return <TableContainer columns={columns} data={rowData} />;
};

export default App;
