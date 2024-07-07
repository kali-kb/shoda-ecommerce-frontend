import React, { useState, useEffect } from "react";
import UploadButton from "../../components/UploadButton/UploadButton";
import { Link } from "react-router-dom";
import cloudinaryUploader from "../../../utils";
import { useNavigate } from "react-router-dom";
import "./seller-sign-up.css";

function SellerSignUp() {
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: "", // Add image URL to formData initially
  });
  const [avatarName, setAvatarName] = useState(null);
  const [avatarImg, setAvatarImg] = useState(null);
  const [submitting, setSubmitting] = useState(null);
  const navigate = useNavigate();

  const avatarUpload = async (e) => {
    setSubmitting(true);
    setAvatarName(`${e.target.files[0].name}`);
    const data = await cloudinaryUploader(e);
    setSubmitting(false);

    setUserFormData({
      ...userFormData,
      image: data.secure_url,
    });
    console.log(userFormData);
  };

  const handleFormSubmit = async (event) => {
    setSubmitting(true);
    event.preventDefault();
    try {
      // Replace with your actual API call
      const payload = {
        "first_name": userFormData.firstName,
        "last_name": userFormData.lastName,
        "email": userFormData.email,
        "password": userFormData.password,
        "avatar_img_url": userFormData.image
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND}/auth/merchants`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ merchant: payload }),
        }
      );

      if (!response.ok) {
        alert("Failed to register, try again")
      }

      const data = await response.json();
      localStorage.setItem("merchant_token", data.token);
      navigate("/vendor");
    } catch (error) {
      alert(error)
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    console.log(userFormData);
  }, [userFormData]);

  return (
    <>
      <div id="form-container">
        <h2 id="form-heading">Create a seller account</h2>
        <form onSubmit={handleFormSubmit}>
          <div class="field-row">
            <div class="signup-field-container">
              <label>
                First name<b>*</b>
              </label>
              <input
                type="text"
                value={userFormData.firstName}
                onChange={(e) =>
                  setUserFormData({
                    ...userFormData,
                    firstName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div class="signup-field-container">
              <label>Last name</label>
              <input
                value={userFormData.lastName}
                onChange={(e) =>
                  setUserFormData({ ...userFormData, lastName: e.target.value })
                }
                type="text"
              />
            </div>
          </div>
          <div class="field-row">
            <div class="signup-field-container">
              <label>
                Email<b>*</b>
              </label>
              <input
                value={userFormData.email}
                onChange={(e) =>
                  setUserFormData({ ...userFormData, email: e.target.value })
                }
                placeholder="johndoe@gmail.com"
                type="email"
                required
              />
            </div>
            <div class="signup-field-container">
              <label>
                Password<b>*</b>
              </label>
              <input
                value={userFormData.password}
                onChange={(e) =>
                  setUserFormData({ ...userFormData, password: e.target.value })
                }
                placeholder="abc123"
                type="password"
                required
              />
            </div>
          </div>
          <div class="signup-field-container">
            <label>Avatar image</label>
            <UploadButton imageName={avatarName} onUploadEvent={avatarUpload} />
          </div>
          <p id="log-in-link">
            Already have an account <Link to="/login">Log in</Link>
          </p>
          {submitting ? (
            <input
              style={{ backgroundColor: "gray" }}
              id="seller-signup-btn"
              type="submit"
              value="..."
              disabled
            />
          ) : (
            <input
              id="seller-signup-btn"
              type="submit"
              value="Create Account"
            />
          )}
        </form>
      </div>
    </>
  );
}

export default SellerSignUp;
