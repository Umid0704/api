import React, { useState } from "react";
import axiosClient from "../plugins/axiosClient";
import ModalApp from "./ModalApp";
export default function Auth() {
  const [roles, setRoles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;
    axiosClient.post("/admins/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data.roles);
        localStorage.setItem("token", res?.data?.token);
        setRoles(res?.data?.roles);
        if (res.status === 202) {
          setModalVisible(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(roles);
  return (
    <div className="flex justify-center w-[100%] h-[100vh] items-center  ">
      <ModalApp
        open={modalVisible}
        toggel={() => setModalVisible(false)}
        roles={roles}
      />
      <div className="border p-4 rounded-md shadow-2xl ">
        <h1 className="text-3xl text-center font-semibold mb-4">Auth</h1>
        <form
          className="  flex flex-col gap-4 "
          id="form"
          onSubmit={handleSubmit}
        >
          <input
            className="px-2 py-1 border rounded-md w-[350px]"
            type="text"
            placeholder="User Name"
          />
          <input
            className="px-2 py-1 border rounded-md w-[350px]"
            type="password"
            placeholder="Password"
          />
        </form>
        <button
          form="form"
          className="bg-green-500 text-white px-4 py-1 rounded-md mt-4"
        >
          Login
        </button>
      </div>
    </div>
  );
}
