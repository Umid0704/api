import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axiosClient from "../plugins/axiosClient";
import { useNavigate } from "react-router-dom";

export default function ModalApp({ open, toggel, roles }) {
  const navigate = useNavigate();
  const handleRole = (e) => {
    toggel();
    e.preventDefault();
    let role = e.target[0].value;
    axiosClient
      .post("/admins/set-role", {
        role: role,
      })
      .then((res) => {
        if (res.status === 202) {
          if (role === "admin") {
            navigate("/admin");
          } else if ((role = "superadmin")) {
            navigate("/superadmin");
          }
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Modal isOpen={open} toggle={toggel}>
        <ModalHeader>
          <h4>Select your role</h4>
        </ModalHeader>
        <ModalBody>
          <form className="" id="select" onSubmit={handleRole}>
            <select className="form-control m-2">
              <option value="" hidden>
                Select your role
              </option>
              {roles?.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" type="submit" form="select">
            click
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
