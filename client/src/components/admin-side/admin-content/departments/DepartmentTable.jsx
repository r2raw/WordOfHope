import React, { useMemo } from "react";
import { Zoom } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { departmentColumn } from "./departmentColumns";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DepartmentFilter from "./DepartmentFilter";
function DepartmentTable(props) {
  const { backendData } = useOutletContext();
  const columns = useMemo(() => departmentColumn, []);
  const data = useMemo(() => backendData.departments, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  const { pageIndex, pageSize } = state;
  return (
    <Zoom in={true}>
      <div className="table-container">
        <DepartmentFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((header) => (
              <tr {...header.getHeaderGroupProps()}>
                {header.headers.map((col) => (
                  <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                    <div className="table-header">
                      {col.render("Header")}
                      <span className="sort-indicator">
                        {col.isSorted ? (
                          col.isSortedDesc ? (
                            <ArrowDropDownSharpIcon />
                          ) : (
                            <ArrowDropUpSharpIcon />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="action">Action</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        <p>{cell.render("Cell")}</p>
                      </td>
                    );
                  })}
                  {row.original.id !== 1 && row.original.id !== 2 ? (
                    <td className="action-button">
                      <div>
                        <button
                          className="solid submit fade"
                          onClick={() => {
                            props.handleOpenEditDepartment(row.original.id);
                          }}
                        >
                          Edit
                        </button>
                        {row.original.availability === "Available" ? (
                          <button className="solid danger fade">Delete</button>
                        ) : (
                          <button className="solid primary fade">
                            Activate
                          </button>
                        )}
                      </div>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <div id="new-input-group">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize, index) => (
                <option key={index} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <span className="dropdown">
              <ArrowDropDownSharpIcon />
            </span>
          </div>
          <div>
            <div
              className="pagination-arrow"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <ArrowBackIosNewSharpIcon />
            </div>
            <p>
              Page: {pageIndex + 1} of {pageOptions.length}
            </p>
            <div
              className="pagination-arrow"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <ArrowForwardIosSharpIcon />
            </div>
          </div>
        </div>
      </div>
    </Zoom>
  );
}

export default DepartmentTable;
