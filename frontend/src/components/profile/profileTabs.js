import { Tabs } from "antd";
import React from "react";
import Profile from "./profile";
import ProfileJourneys from "./profileJourneys";
import ProfileOrders from "./profileOrders";
import ProfileOtherOrders from "./profileOtherOrders";
import { useLocation } from "react-router-dom";

const ProfileTabs = () => {
  const { TabPane } = Tabs;
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  console.log(searchParams);
  return (
    <>
      <h3>Profile</h3>
      <Tabs
          // activeKey={searchParams.get("activeTab")}
      >
        <TabPane tab="User info" key="1">
          <Profile></Profile>
        </TabPane>
        <TabPane tab="Journeys" key="2">
          <ProfileJourneys></ProfileJourneys>
        </TabPane>
        <TabPane tab="Orders" key="3">
          <ProfileOrders></ProfileOrders>
        </TabPane>
        <TabPane tab="Orders request" key="4">
          <ProfileOtherOrders></ProfileOtherOrders>
        </TabPane>
      </Tabs>
    </>
  );
};
export default ProfileTabs;
