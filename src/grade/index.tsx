import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout";
import CommonCard from "../component/commonCard";
import CommonTable from "../component/commonTable";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import "./styles.scss";
const Grade = () => {
  const loggedInUser = window.localStorage.getItem("loggedInUser");
  let userLoggedIn: any = {};
  if (loggedInUser) {
    userLoggedIn = JSON.parse(loggedInUser);
  }
  const columns: GridColDef[] = [
    {
      field: "session",
      headerName: "Academic Year",
      width: 600,
      sortable: true,
      headerClassName: "table-header-cell",
    },
    {
      field: "subjects",
      headerName: "Total Subjects",
      width: 600,
      sortable: true,
      headerClassName: "table-header-cell",
    },

    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          label="Details"
          //onClick={handleDetails}
          showInMenu
        />,
      ],
    },
  ];

  const rows = [
    { id: 1, session: "2019-2020", subjects: 5 },
    { id: 2, session: "2020-2021", subjects: 6 },
    { id: 3, session: "2021-2022", subjects: 8 },
  ];
  return (
    <Layout>
      <div className="user-container">
        <section className="user-header">
          <CommonCard className="header-card" title="Grade" action={false} />
        </section>
        <section className="table-container">
          <CommonTable columns={columns} rows={rows} />
        </section>
      </div>
    </Layout>
  );
};
export default Grade;
