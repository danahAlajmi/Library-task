import React from "react";
import membersStore from "../stores/membersStore";
import booksStore from "../stores/booksStore";

import { useParams, Navigate } from "react-router-dom";

function MemberDetails() {
  const { memberSlug } = useParams();
  const member = membersStore.members.find(
    (member) => member.slug == memberSlug
  );
  if (member == undefined) {
    return <Navigate to="/" />;
  }
  let cbb = [];
  member.currentlyBorrowedBooks.map((mem) => {
    booksStore.books.forEach((boook) => {
      if (boook._id == mem) {
        cbb.push(boook.title);
      }
    });
  });
  if (cbb.length == 0) {
    cbb = "None";
  }
  return (
    <div className="body">
      <div className="textt detail-member">
        {" "}
        <br />
        <h3>{`Member: `}</h3>
        <h2>
          {member.firstName} {member.lastName}
        </h2>
        <h3>{`Membership: `}</h3> <h2>{member.membership}</h2>
        <h3>{`Currently Borrowed Books: `} </h3>
        <div>
          {cbb.map((element) => (
            <h2>
              <ul>
                <li>{element}</li>
              </ul>
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MemberDetails;
