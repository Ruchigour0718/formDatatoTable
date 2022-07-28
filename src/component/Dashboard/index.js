import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [allTableUsers, setAllTableUsers] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("alluser");
    setAllTableUsers(JSON.parse(data));
  }, []);

  // deleteData;
  const deleteData = (contact) => {
    // console.log("", contact);
    const filteredData = allTableUsers.filter(
      (data) => data.contact !== contact
    );
    setAllTableUsers(filteredData);
    localStorage.setItem("alluser", JSON.stringify(filteredData));
  };

  //editdata
  const oneditData = (id) => {
    let newEditItem = allTableUsers.find((element) => {
      return element.id === id;
    });
  
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>Contact</th>
            <th>IMAGE</th>
            <th>DELETE</th>
            <th>EDIT</th>
          </tr>
        </thead>

        <tbody>
          {allTableUsers &&
            allTableUsers.map((user) => {
              // console.log(user.id);
              return (
                <tr key={user.contact}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>
                    <img
                      src={user.baseImage}
                      height="150px"
                      width="150px"
                      alt="profileImage"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-md"
                      onClick={() => deleteData(user.contact)}
                    >
                      DELETE
                    </button>
                  </td>

                  <td>
                    <Link
                      className="btn btn-primary"
                      to={`/edit/users/${user.id}`}
                      onClick={() => oneditData(user.id)}
                    >
                      EDIT
                    </Link>
                  </td>
                </tr>
              );
            })}{" "}
        </tbody>
        <button
          className="btn btn-danger btn-md"
          onClick={() => setAllTableUsers([])}
        >
          REMOVE ALL
        </button>
      </table>
    </div>
  );
};

export default Dashboard;
