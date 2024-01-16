import React, { useEffect, useState } from "react";
import axiosClient from "../plugins/axiosClient";
import UsersModal from "./UsersModal";
import DeleteModal from "./DeleteModal";

export default function SuperAdmin() {
  const [users, setUsers] = useState([]);
  const [usersModal, setUsersModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userId, setUserId] = useState([]);
  const [defaultUser, setDefaultUser] = useState([])
  const deleteUser = (id) => {
    setUserId(id);
    setDeleteModal(true);
  };
  const editUser =(id)=> {
    axiosClient.get(`/users/${id}`).then((res)=> {
        setDefaultUser(res?.data?.user)
        console.log(res.data.user);
    })
    setUserId(id)
    setUsersModal(true)
  }
  useEffect(() => {
    axiosClient
      .get("/users")
      .then((res) => {
        setUsers(res?.data?.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const addUsers = () => {
    setUsersModal(true);
  };
  console.log(users.is_diploma);
  return (
    <div className="m-2">
      <UsersModal open={usersModal} toggel={() => setUsersModal(false)} id={userId} defaultUser={defaultUser}/>
      <DeleteModal
        open={deleteModal}
        toggel={() => setDeleteModal(false)}
        id={userId}
      />
      <div className=" mb-2 ">
        <button
          onClick={addUsers}
          className="px-3 py-1 bg-green-500 rounded text-white"
        >
          Add user
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="border border-black py-1 text-center w-[40px]">
              T/R
            </th>
            <th className="border border-black py-1 text-center w-[200px]">
              Name
            </th>
            <th className="border border-black py-1 text-center w-[200px]">
              Surname
            </th>
            <th className="border border-black py-1 text-center w-[40px]">
              Age
            </th>
            <th className="border border-black py-1 text-center w-[200px]">
              Is diploma
            </th>
            <th className="border border-black py-1 text-center w-[200px]">
              Address
            </th>
            <th className="border border-black py-1 text-center w-[200px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            return (
              <tr key={index}>
                <td className="border border-black py-1 text-center w-[40px]">
                  {index + 1}
                </td>
                <td className="border border-black py-1 text-center w-[200px]">
                  {item.name}
                </td>
                <td className="border border-black py-1 text-center w-[200px]">
                  {item.surname}
                </td>
                <td className="border border-black py-1 text-center w-[40px]">
                  {item.age}
                </td>
                <td className="border border-black py-1 text-center w-[200px]">
                  {item.is_diploma ? "yes" : "no"}
                </td>
                <td className="border border-black py-1 text-center w-[200px]">
                  {item.address}
                </td>
                <td className="border border-black py-1 text-center w-[200px]">
                  <button className="px-3 py-1 bg-blue-500 rounded  text-white mx-2"
                  onClick={()=>editUser(item._id)}>
                    edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500  rounded text-white mx-2"
                    onClick={() => deleteUser(item._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
