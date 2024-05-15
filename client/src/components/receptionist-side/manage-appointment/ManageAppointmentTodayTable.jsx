import React, { useEffect, useMemo, useState } from "react";
import { Zoom } from "@mui/material";
import dayjs from "dayjs";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { todayAppointmentColumn } from "../dashboard/AppointmentTodayColumn";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ManageAppointmentTodayFilter from "./ManageAppointmentTodayFilter";
function ManageAppointmentTodayTable() {
  const { backendData, updateQueue } = useOutletContext();
  const [success, setSuccess] = useState(false)
  const columns = useMemo(() => todayAppointmentColumn, []);
  const data = useMemo(
    () => backendData.appointmentsToday.filter(i => i.status === 'Upcoming'),
    [backendData.appointmentsToday]
  );
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

  const handleAddQueue = async (id)=>{
    try {
      const response = await axios.post(`/add-to-queue/${id}`)

      if(response.status === 200){
        updateQueue();
        setSuccess(true);
      }
    } catch (error) {
      console.error("handleAddQueue error: " + error.message)
    }
  }

  useEffect(()=>{
    if(success){
      setTimeout(()=>{
        setSuccess(false);
      }, 3000)
    }
  },[success])
  return (
    <Zoom in={true}>
      <div className="table-container">
        <ManageAppointmentTodayFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
        />
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
                        <p
                          style={
                            dayjs(
                              row.original.appointmenttime,
                              "HH:mm:ss"
                            ).isBefore(dayjs().subtract(1, "hour"))
                              ? { color: "red" }
                              : {}
                          }
                        >
                          {cell.render("Cell")}
                        </p>
                      </td>
                    );
                  })}
                  <td className="action-button">
                    <div>
                      <button className="solid submit fade" onClick={()=>{handleAddQueue(row.original.id)}}>
                        Add to queue
                      </button>
                    </div>
                  </td>
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

          {success && <p className="success">Appointment added to queue successfully!</p>}
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
export default ManageAppointmentTodayTable;
