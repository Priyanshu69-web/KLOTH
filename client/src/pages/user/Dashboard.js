import React from "react";
import { Avatar, Card, Col, Descriptions, Row, Space, Tag, Typography } from "antd";
import { FaBagShopping, FaEnvelope, FaLocationDot, FaPhone, FaUser } from "react-icons/fa6";
import Layout from "../../commponets/Layouts/Layout";

import { useAuth } from "../../context/auth";
import UserMenu from "../../commponets/Layouts/UserMenu";

const UserDashboard = () => {
  const [auth] = useAuth();
  const userName = auth?.user?.username
    ? auth.user.username.charAt(0).toUpperCase() + auth.user.username.slice(1)
    : "Guest";

  return (
    <Layout title="User Dashboard">
      <div className="container dashboard-shell">
        <div className="row g-4">
          <div className="col-lg-4 col-xl-3">
            <UserMenu />
          </div>
          <div className="col-lg-8 col-xl-9">
            <div className="dashboard-hero dashboard-hero--user">
              <Space size={20} align="center" wrap>
                <Avatar size={72} className="dashboard-avatar dashboard-avatar--user">
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <Typography.Text className="dashboard-hero__eyebrow">Account Overview</Typography.Text>
                  <Typography.Title level={2} className="dashboard-hero__title">
                    Hi, {userName}
                  </Typography.Title>
                  <Typography.Paragraph className="dashboard-hero__text">
                    Everything important about your profile and shopping activity lives here.
                  </Typography.Paragraph>
                </div>
              </Space>
            </div>

            <Row gutter={[16, 16]} className="mb-4">
              <Col xs={24} md={8}>
                <Card className="dashboard-stat-card">
                  <div className="dashboard-summary-item">
                    <FaUser />
                    <div>
                      <span className="dashboard-summary-item__label">Account Type</span>
                      <strong>Customer</strong>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="dashboard-stat-card">
                  <div className="dashboard-summary-item">
                    <FaBagShopping />
                    <div>
                      <span className="dashboard-summary-item__label">Orders</span>
                      <strong>Track from dashboard</strong>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="dashboard-stat-card">
                  <div className="dashboard-summary-item">
                    <FaLocationDot />
                    <div>
                      <span className="dashboard-summary-item__label">Address</span>
                      <strong>{auth?.user?.address ? "Saved" : "Missing"}</strong>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Card className="dashboard-profile-card" bordered={false}>
              <Typography.Title level={4} className="mb-3">
                Profile Details
              </Typography.Title>
              <Descriptions column={1} size="middle" labelStyle={{ fontWeight: 600, width: "160px" }}>
                <Descriptions.Item label="Name">
                  <span className="dashboard-inline-detail"><FaUser /> {userName}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  <span className="dashboard-inline-detail"><FaEnvelope /> {auth?.user?.email || "Not available"}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  <span className="dashboard-inline-detail"><FaPhone /> {auth?.user?.phone || "Not available"}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  <span className="dashboard-inline-detail"><FaLocationDot /> {auth?.user?.address || "Add your delivery address in profile settings."}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color="blue">Active account</Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
