import { useState, useEffect } from "react";
import React from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./settings.css";

const Settings = () => {
  const merchant_token = localStorage.getItem("merchant_token");
  const merchant = merchant_token ? jwtDecode(merchant_token) : {};
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [accountDetail, setAccountDetail] = useState({
    firstName: "",
    lastName: "",
    bankDetail: "",
  });

  const handleInputChange = (e) => {
    setAccountDetail({
      ...accountDetail,
      [e.target.name]: e.target.value,
    });
  };

  const fetchMerchant = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND}/merchants/${merchant.merchant_id}`,
        {
          headers: {
            Authorization: `Bearer ${merchant_token}`,
          },
        }
      );
      const data = await response.json();
      setAccountDetail({
        firstName: data.first_name,
        lastName: data.last_name,
        bankDetail: data.bank_detail,
      });
    } catch (error) {
      console.error("Error fetching merchant:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const updateMerchant = async () => {
    //
    setIsFetching(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND}/merchants/${merchant.merchant_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${merchant_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: accountDetail.firstName,
          last_name: accountDetail.lastName,
          bank_detail: accountDetail.bankDetail,
        }),
      }
    );
    if (response.ok) {
      const data = response.json();
      setIsEditing(false);
      setIsFetching(false);
    } else {
      alert("Data Failed to Update");
      setIsEditing(false);
    }
  };

  //   getData()

  useEffect(() => {
    console.log(accountDetail);
  }, [accountDetail]);

  useEffect(() => {
    if (merchant_token) {
      fetchMerchant();
    } else {
      navigate("/login");
    }
  }, [merchant_token]);

  return (
    <>
      <SideBarNavBar merchant={merchant}>
        <div id="account-details">
          <h3>Account Settings</h3>
          <div>
            <p>First Name</p>
            <div className="data-container">
              {isEditing ? (
                <input
                  name="firstName"
                  onChange={handleInputChange}
                  defaultValue={accountDetail.firstName}
                  className="edit-text-input"
                  type="text"
                ></input>
              ) : (
                <p>{accountDetail.firstName}</p>
              )}
            </div>
          </div>
          <hr></hr>
          <div>
            <p>Last Name</p>
            <div className="data-container">
              {isEditing ? (
                <input
                  name="lastName"
                  onChange={handleInputChange}
                  defaultValue={accountDetail.lastName}
                  className="edit-text-input"
                  type="text"
                />
              ) : (
                <p>{accountDetail.lastName}</p>
              )}
            </div>
          </div>
          <hr></hr>
          <div>
            <p>Bank details (CBE)</p>
            <div className="data-container">
              {isEditing ? (
                <input
                  name="bankDetail"
                  onChange={handleInputChange}
                  defaultValue={accountDetail.bankDetail}
                  className="edit-text-input"
                  type="text"
                />
              ) : (
                <p>
                  {!accountDetail.bankDetail || accountDetail.bankDetail == ""
                    ? "Not given"
                    : accountDetail.bankDetail}
                </p>
              )}
            </div>
          </div>
          <hr></hr>
          <button
            onClick={!isEditing ? () => setIsEditing(true) : updateMerchant}
            id="account-edit-btn"
          >
            {isEditing
              ? "Update Account Details"
              : isEditing && isFetching
              ? "..."
              : "Edit"}
          </button>
        </div>
      </SideBarNavBar>
    </>
  );
};

export default Settings;
