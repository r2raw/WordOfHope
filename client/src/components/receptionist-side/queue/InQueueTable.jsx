import React, { useEffect, useMemo, useState } from "react";
import { Zoom } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import axios from "axios";
import { inQueueColumn } from "./InQueuColumn";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
function InQueueTable() {
  const [success,  setSuccess] = useState(false);
  const { backendData, updateQueue } = useOutletContext();
  const columns = useMemo(() => inQueueColumn, []);
  const data = useMemo(() => backendData.inQueue, [backendData.inQueue]);
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
  const handleRemove = async (row)=>{
    try {
      const response = await axios.post("/remove-queue", row)

      if(response.status === 200){
        updateQueue();
        setSuccess(true)
      }
    } catch (error) {
      console.error("handleRemove ERROR: " + error.message)
    }
  }

  useEffect(()=>{
    if(success){
      setTimeout(()=>{
        setSuccess(false);
      },3000)
    }
  },[success])
  return (
    <Zoom in={true}>
      <div className="table-container">
        {/* <DepartmentFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((header) => (
              <tr {...header.getHeaderGroupProps()}>
                {header.headers.map((col) => (
                  <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                    {/* {console.log(col)} */}
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
              {
                /* console.log(row.original.id) */
              }
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        <p
                          style={
                            dayjs(row.original.appointmentdate)
                              .startOf("day")
                              .isBefore(dayjs().startOf("day"))
                              ? { color: "red" }
                              : {}
                          }
                        >
                          {cell.render("Cell")}
                        </p>
                      </td>
                    );
                  })}
                  <td className="action-button"><div><button className="solid danger fade" onClick={()=>{handleRemove(row.original)}}>Remove</button></div></td>
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
          {success && <p className="success">Queue removed successfully!</p>}
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

export default InQueueTable;
