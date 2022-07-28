import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const EditData = () => {
  const [show, setShow] = useState(true);
  function changeState() {
    setShow(!show);
  }
  const initialValues = {
    name: "",
    email: "",
    contact: "",
    image: ""
  };

  let users = localStorage.getItem("alluser");
  users = users ? JSON.parse(users) : [];
  const { id } = useParams();
  console.log("id", typeof Number(id));

  //  let myindex =users.indexOf(id);
  //  console.log("myindex")

  let index = users.findIndex(({ id: userId }) => userId == id);
  let faveGif = users.map((users) => users.id);
  console.log(index);

  const [edit, setEdit] = useState(users[index]);
  const [alluser, setAllUser] = useState({});
  const { name, email, contact, image, baseImage } = edit;

  const handleEditInputChangeName = (e) => {
    setAllUser({ ...alluser, name: e.target.value });
    console.log(alluser);
  };

  const handleEditInputChangeEmail = (e) => {
    setAllUser({ ...alluser, email: e.target.value });
    console.log(alluser);
  };

  const handleEditInputChangeContact = (e) => {
    setAllUser({ ...alluser, contact: e.target.value });
    console.log(alluser);
  };
  const handleEditInputChangeImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    localStorage["img"] = base64;
    setAllUser({ ...alluser, baseImage: base64 });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // handleinput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEdit({ ...edit, [name]: value });
  };

  // const deleteImage = () => {};

  const handleSubmit = (e, id) => {
    e.preventDefault();

    let newuser = {
      name,
      email,
      contact,
      image
    };
    setAllUser([...alluser, newuser]);
  };

  return (
    <>
      <div className="wrapper">
        <div className="main">
          <div className="container my-5">
            <div className="row">
              <div className="col-4">
                <form className="row g-3">
                  <div className="md-4">
                    <label htmlFor="exampleInputName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      name="name"
                      value={alluser.name}
                      onChange={handleEditInputChangeName}
                    />
                  </div>
                  <div className="md-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={alluser.email}
                      onChange={handleEditInputChangeEmail}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Contactnumber" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={alluser.contact}
                      name="contact"
                      onChange={handleEditInputChangeContact}
                    />
                  </div>{" "}
                  <br></br>
                  {show ? (
                    <img
                      src={baseImage}
                      height="200px"
                      width="200px"
                      alt=" No image"
                    />
                  ) : null}
                  {show ? (
                    <button onClick={changeState}> Change</button>
                  ) : (
                    <input
                      type="file"
                      value={alluser.image}
                      name="image"
                      onChange={handleEditInputChangeImage}
                    />
                  )}
                  <Link
                    className="btn btn-primary mx-auto w-100"
                    to="/"
                    onClick={handleSubmit}
                  >
                    Update User
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditData;
