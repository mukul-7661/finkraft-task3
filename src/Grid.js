import React, { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
// import { gridApi } from "ag-grid-community";

function Grid() {
  const [rowData, setRowData] = useState([]);

  //   const model = AgGridReact.getFilterModel({
  //     Gender: {
  //       filterType: "text",
  //       type: "startsWith",
  //       filter: "mich",
  //     },
  //   });

  //   AgGridReact.setFilterModel(model);

  const [columnDefs] = useState([
    {
      field: "Gender",
      sortable: true,
      pagination: true,
    },
    { field: "Name", sortable: true, pagination: true },
    { field: "Location", sortable: true, pagination: true },
  ]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(
        "https://finkraft-task-default-rtdb.firebaseio.com/details.json"
      );
      const responseData = await response.json();

      const loadedEvents = [];

      for (const key in responseData) {
        loadedEvents.push({
          id: key,
          Location: responseData[key].location,
          Gender: responseData[key].gender,
          Name: responseData[key].name,
        });
      }

      setRowData(loadedEvents);
    };
    fetchEvents();
  }, []);
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
}

export default Grid;
