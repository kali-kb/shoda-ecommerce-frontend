import { useEffect, useState } from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar";
import { TabView, TabPanel } from "primereact/tabview";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import "./notifications.css";

function Notification() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [notificationUpdated, setNotificationUpdated] = useState(false);

  const merchant_token = localStorage.getItem("merchant_token");
  const merchant = merchant_token ? jwtDecode(merchant_token) : {};
  const items = [{ label: "Read" }, { label: "Unread" }];

  const updateNotifications = async (index) => {
    const unreadNotifications = data.filter(
      (notification) => !notification.read
    );
    if (index === 1 && !notificationUpdated && unreadNotifications.length > 0) {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND}/merchants/${
          merchant.merchant_id
        }/notifications/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notification_ids: data.map(
              (notification) => notification.notification_id
            ),
          }),
        }
      );
      if (response.ok) {
        setNotificationUpdated(true);
      }
    } else {
      void 0;
    }
  };

  const handleTabChange = (e) => {
    setActiveIndex(e.index);
    updateNotifications(e.index);
  };

  const fetchNotifications = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND}/merchants/${
        merchant.merchant_id
      }/notifications`
    );
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  return (
    <SideBarNavBar merchant={merchant}>
      <section id="notifications">
        <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
          <TabPanel header="read">
            <span>
              <b>
                {data &&
                  data.filter((notification) => notification.read).length}
              </b>{" "}
              notifications
            </span>
            <div id="notification-list-container">
              {data &&
                Array.isArray(data) &&
                data
                  .filter((notification) => notification.read)
                  .map((notification, index) => (
                    <div key={index} id="notification-card">
                      <div id="notification-left">
                        <div></div>
                        <p>{notification.message}</p>
                      </div>
                      <div id="dot"></div>
                    </div>
                  ))}
            </div>
          </TabPanel>
          <TabPanel header="unread">
            <span>
              <b>
                {data &&
                  data.filter((notification) => !notification.read).length}
              </b>{" "}
              new notifications
            </span>
            <div id="notification-list-container">
              {data &&
                Array.isArray(data) &&
                data
                  .filter((notification) => !notification.read)
                  .map((notification, index) => (
                    <div key={index} id="notification-card">
                      <div id="notification-left">
                        <div></div>
                        <p>{notification.message}</p>
                      </div>
                      <div id="dot"></div>
                    </div>
                  ))}
            </div>
          </TabPanel>
        </TabView>
      </section>
    </SideBarNavBar>
  );
}

export default Notification;
