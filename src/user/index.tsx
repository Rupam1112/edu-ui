import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../layout";
import CommonCard from "../component/commonCard";
import CommonTable from "../component/commonTable";
import { GridColDef, GridRowId, GridActionsCellItem } from "@mui/x-data-grid";
import "./styles.scss";
import AddEditUser from "./addEditUser";
const User = () => {
  const loggedInUser = window.localStorage.getItem("loggedInUser");
  let userLoggedIn: any = {};
  if (loggedInUser) {
    userLoggedIn = JSON.parse(loggedInUser);
  }
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rows, setRows] = useState([]);
  const [userData, setUserData] = useState({});

  const getRows = async () => {
    let data;
    if (userLoggedIn.role === "Staff" || userLoggedIn.role === "Student") {
      data = await axios.get(
        `http://127.0.0.1:8000/usersBySchool/${userLoggedIn.schoolId}`
      );
      const isArray = data.data instanceof Array;
      if (isArray) {
        setRows(data.data);
      } else {
        const array: any = [];
        array.push(data.data);
        setRows(array);
      }
    } else {
      data = await axios.get("http://127.0.0.1:8000/users");
      setRows(data.data);
    }
  };
  useEffect(() => {
    getRows();
  }, []);

  const getUser = async (id: string | number) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/users/${id}`);
    setUserData(data);
    setEdit(true);
  };

  const isDisabled = (role: any) => {
    if (userLoggedIn.role === "Staff" && role === "Staff") {
      return true;
    }
    return false;
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
      field: "role",
      headerName: "Role",
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
          label="Edit User"
          onClick={onEdit(params.id)}
          showInMenu
          disabled={isDisabled(params.row.role)}
        />,
      ],
    },
  ];

  const onEdit = React.useCallback(
    (id: GridRowId) => () => {
      getUser(id);
    },
    []
  );
  const onAdd = () => {
    setAdd(true);
  };
  const onCancel = () => {
    if (edit) {
      setEdit(false);
      setUserData({});
    } else {
      console.log("HERE");
      setAdd(false);
    }
    getRows();
  };
  return (
    <Layout>
      <div className="user-container">
        {add ? (
          <AddEditUser onCancel={onCancel} />
        ) : edit ? (
          <AddEditUser onCancel={onCancel} type="edit" userData={userData} />
        ) : (
          <>
            <section className="user-header">
              <CommonCard
                className="header-card"
                title="Users"
                action={false}
                headerButton
                onAdd={onAdd}
              />
            </section>
            <section className="table-container">
              <CommonTable columns={columns} rows={rows} />
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};
export default User;
