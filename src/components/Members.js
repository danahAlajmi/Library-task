import React, { useState } from "react";
import membersStore from "../stores/membersStore";
import MemberItem from "./MemberItem";
import { observer } from "mobx-react";
import CreateMemberModal from "./createMemberModal";

function Members() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const membersList = membersStore.members.map((member) => (
    <MemberItem member={member} key={member._id} />
  ));
  return (
    <div className="body">
      <button className="btn">
        {/* <i className="fa fa-plus"></i> */}
        <span className="add-btn" onClick={openModal}>
          Add Member
        </span>
        <CreateMemberModal isOpen={isOpen} closeModal={closeModal} />
      </button>
      <div className="grid-container">{membersList}</div>
    </div>
  );
}

export default observer(Members);
