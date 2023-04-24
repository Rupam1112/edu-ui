import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout";
import CommonCard from "../component/commonCard";
import CommonTable from "../component/commonTable";
import { GridColDef, GridRowId, GridActionsCellItem } from "@mui/x-data-grid";
import AddEditSchool from "./addEditSchool";
import "./styles.scss";
const School = () => {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rows, setRows] = useState([]);
  const [schoolData, setSchoolData] = useState({});

  const loggedInUser = window.localStorage.getItem("loggedInUser");
  let userLoggedIn: any = {};
  if (loggedInUser) {
    userLoggedIn = JSON.parse(loggedInUser);
  }

  const getRows = async () => {
    let data;
    if (userLoggedIn.role === "Staff" || userLoggedIn.role === "Student") {
      data = await axios.get(
        `http://127.0.0.1:8000/schools/${userLoggedIn.schoolId}`
      );
      const array: any = [];
      array.push(data.data);
      setRows(array);
    } else {
      data = await axios.get("http://127.0.0.1:8000/schools");
      setRows(data.data);
    }
  };
  useEffect(() => {
    getRows();
  }, []);

  const getSchool = async (id: string | number) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/schools/${id}`);
    setSchoolData(data);
    setEdit(true);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
      sortable: true,
      headerClassName: "table-header-cell",
    },
    {
      field: "address",
      headerName: "Address",
      width: 300,
      sortable: true,
      headerClassName: "table-header-cell",
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      sortable: true,
      headerClassName: "table-header-cell",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 300,
      sortable: true,
      headerClassName: "table-header-cell",
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          label="Edit School"
          onClick={onEdit(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  const filterColumns = () => {
    if (userLoggedIn.role !== "Super Admin") {
      return columns.filter((item) => item.field !== "actions");
    } else return columns;
  };
  const onEdit = React.useCallback(
    (id: GridRowId) => () => {
      getSchool(id);
    },
    []
  );
  const onAdd = () => {
    setAdd(true);
  };
  const onCancel = () => {
    if (edit) {
      setEdit(false);
      setSchoolData({});
    } else {
      setAdd(false);
    }
    getRows();
  };
  return (
    <Layout>
      {" "}
      <div className="user-container">
        {add ? (
          <AddEditSchool onCancel={onCancel} />
        ) : edit ? (
          <AddEditSchool
            onCancel={onCancel}
            type="edit"
            schoolData={schoolData}
          />
        ) : (
          <>
            <section className="user-header">
              <CommonCard
                className="header-card"
                title="Schools"
                action={false}
                headerButton
                onAdd={onAdd}
              />
            </section>
            <section className="table-container">
              <CommonTable columns={filterColumns()} rows={rows} />
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};
export default School;
