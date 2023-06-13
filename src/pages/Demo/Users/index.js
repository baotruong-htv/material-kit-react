/* eslint-disable react/prop-types */
/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Routes
import routes from "routes";

import UsersTable from "./sections/UsersTable";
import CreateUserModal from "./sections/CreateUserModal";
import { createUser, deleteUsers, getUsers } from "./api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  async function fetchUsers() {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error(error);
    }
  }

  async function createNewUser(user) {
    try {
      await createUser(user);
      setUsers((prev) => [user, ...prev]);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteSelectedUsers(userIds) {
    try {
      await deleteUsers(userIds);
      setUsers((prev) => prev.filter((user) => !userIds.includes(user.id)));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <CreateUserModal isOpen={isOpen} onClose={handleClose} onCreate={createNewUser} />
      <MKBox position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "https://www.creative-tim.com/product/material-kit-react",
            label: "free download",
            color: "info",
          }}
        />
      </MKBox>
      <MKBox mt={12} p={3}>
        <MKBox mb={3} align="right">
          <MKButton variant="outlined" color="info" startIcon={<Add />} onClick={handleOpen}>
            Create User
          </MKButton>
        </MKBox>
        <MKBox>
          <UsersTable users={users} onDelete={deleteSelectedUsers} />
        </MKBox>
      </MKBox>
    </>
  );
}
