import {useEffect, useState} from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar"
import { TabView, TabPanel } from 'primereact/tabview';
import "./notifications.css"


function Notification() {
  const items = [
    { label: 'Read'},
    { label: 'Unread'},
  ];

  return (
    <SideBarNavBar>
      <section id="notifications">
        <TabView>
          <TabPanel header="read">
            <span><b>1</b> notifications</span>
            <div id="notification-list-container">
              <div id="notification-card">
                <div id="notification-left">
                  <div></div>
                  <p>Notification Message</p>
                </div>
                <div id="dot"></div>
              </div>

            </div>
          </TabPanel>
          <TabPanel header="unread">
            <span><b>1</b> new notifications</span>
            <div id="notification-list-container">
{/*              <div id="notification-card">
                <div id="notification-left">
                  <div></div>
                  <p>Notification Message</p>
                </div>
                <div id="dot"></div>
              </div>*/}
            </div>
          </TabPanel>
        </TabView>
      </section>
    </SideBarNavBar>
  )

}

export default Notification;
