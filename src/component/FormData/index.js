import React, { useState } from "react";
import "./styles.module.css";
import { useNavigate } from "react-router-dom";
const FormData = () => {
  const [errMSg, setErrMsg] = useState(false); //error msg
  const [emailErr, setEmailErr] = useState(false); //email blank
  const [contactErr, setContactErr] = useState(false); //contact err

  //input field states
  const [id, setId] = useState(Math.random() * 10);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [baseImage, setBaseImage] = useState("");

  const navigate = useNavigate();

  //form onsubmit  // form onsubmit me objectof data wil get into allUser state
  const submitData = (e) => {
    e.preventDefault();
    console.log("data");
    if (!name && !email && !contact) {
      //if all are null

      setErrMsg(true);
      setEmailErr(true);
      setContactErr(true);
    } else if (name && !email && !contact) {
      // if email = null , contact = null , name = !null

      setEmailErr(true);
      setContactErr(true);
    } else if (!name && email && contact) {
      //if name = null , email = !null , contact = !null

      setErrMsg(true);
    } else if (name && !email && contact) {
      //if name = !null , email = null , contact = !null
      setEmailErr(true);
    } else if (contact && !email && !name) {
      //if name = !null , email = !null , contact = null

      setErrMsg(true);
      setEmailErr(true);
    } else if (name && email && !contact) {
      //if name = !null , email = !null , contact = null
      setContactErr(true);
    } else if (name && email && contact) {
      setName("");
      setEmail("");
      setContact("");
      setBaseImage("");
      setId((Math.random() + 1).toString().substring(2, 5));
      console.log(id, "myid");

      let users = localStorage.getItem("alluser");

      users = users ? JSON.parse(users) : [];
      let newuser = {
        name,
        email,
        contact,
        baseImage,
        id: users.length + 1
      };
      localStorage.setItem("alluser", JSON.stringify([...users, newuser]));
      navigate("/");
    }
  };

  const onBlur = () => {
    setErrMsg(false);
    setEmailErr(false);
    setContactErr(false);
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    localStorage["img"] = base64;

    setBaseImage(base64);
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

  return (
    <>
      <div className="wrapper ">
        <div className="main bg">
          <div className="container my-5">
            <div className="row justify-content-center">
              <div className="col-4">
                <form className="form-container" onSubmit={submitData}>
                  <div className="md-4">
                    <label htmlFor="exampleInputName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      name="name"
                      onInput={onBlur}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errMSg ? (
                      <>
                        <div className="errMsg">
                          <label style={{ color: "#fff", textAlign: "center" }}>
                            ! Please Fill the required Name
                          </label>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="md-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      onInput={onBlur}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="emailHelp"
                    />
                    {emailErr ? (
                      <>
                        <div className="errMsg">
                          <label style={{ color: "#fff", textAlign: "center" }}>
                            ! Please Fill the required Email
                          </label>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Contactnumber" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={contact}
                      onInput={onBlur}
                      onChange={(e) => setContact(e.target.value)}
                      id="exampleInputContactnumber"
                    />
                    {contactErr ? (
                      <>
                        <div className="errMsg">
                          <label style={{ color: "#fff", textAlign: "center" }}>
                            ! Please Fill the required Contact number
                          </label>
                        </div>
                      </>
                    ) : null}
                  </div>{" "}
                  <br></br>
                  <input
                    type="file"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                  />
                  <br></br>
                  <br></br>
                  {baseImage ? (
                    <img
                      src={baseImage}
                      height="200px"
                      width="200px"
                      alt="no-image"
                    />
                  ) : null}
                  <div className="form-actions">
                    <centre>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block w-50 mx-auto "
                      >
                        Submit
                      </button>
                    </centre>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FormData;
