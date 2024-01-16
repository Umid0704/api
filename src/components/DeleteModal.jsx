import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axiosClient from "../plugins/axiosClient";

export default function DeleteModal({ open, toggel, id }) {
  const deleteUser = () => {
    axiosClient.delete(`/users/${id}`);
    window.location.reload();
    toggel();
  };
  return (
    <div>
      <Modal isOpen={open} toggle={toggel}>
        <ModalHeader>
          <h4>Delete</h4>
        </ModalHeader>
        <ModalFooter>
          <button className="btn btn-success" onClick={toggel}>
            close
          </button>
          <button className="btn btn-success" onClick={deleteUser}>
            delete
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
