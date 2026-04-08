import React from "react";
import { Avatar, Card, Col, Descriptions, Row, Space, Statistic, Tag, Typography } from "antd";
import { FaBoxesStacked, FaEnvelope, FaPhone, FaShieldHalved, FaUserTie } from "react-icons/fa6";

import AdminMenu from "../../commponets/Layouts/AdminMenu";
import Layout from "./../../commponets/Layouts/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const adminName = auth?.user?.username || "Admin";

  return (
    <Layout title="Admin Dashboard">
      <div className="container dashboard-shell">
        <div className="row g-4">
          <div className="col-lg-4 col-xl-3">
            <AdminMenu />
          </div>
          <div className="col-lg-8 col-xl-9">
            <div className="dashboard-hero">
              <Space size={20} align="center" wrap>
                <Avatar size={72} className="dashboard-avatar dashboard-avatar--admin">
                  {adminName.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <Typography.Text className="dashboard-hero__eyebrow">Administration</Typography.Text>
                  <Typography.Title level={2} className="dashboard-hero__title">
                    Welcome back, {adminName}
                  </Typography.Title>
                  <Space wrap>
                    <Tag color="gold">Full access</Tag>
                    <Tag color="geekblue">Role: Admin</Tag>
                  </Space>
                </div>
              </Space>
            </div>

            <Row gutter={[16, 16]} className="mb-4">
              <Col xs={24} md={8}>
                <Card className="dashboard-stat-card">
                  <Statistic title="Catalog Control" value="Products" prefix={<FaBoxesStacked />} />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="dashboard-stat-card">
                  <Statistic title="Customer Access" value="Users" prefix={<FaUserTie />} />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="dashboard-stat-card">
                  <Statistic title="Security Level" value="Protected" prefix={<FaShieldHalved />} />
                </Card>
              </Col>
            </Row>

            <Card className="dashboard-profile-card" bordered={false}>
              <Typography.Title level={4} className="mb-3">
                Admin Profile
              </Typography.Title>
              <Descriptions column={1} size="middle" labelStyle={{ fontWeight: 600, width: "160px" }}>
                <Descriptions.Item label="Name">{adminName}</Descriptions.Item>
                <Descriptions.Item label="Email">
                  <span className="dashboard-inline-detail"><FaEnvelope /> {auth?.user?.email || "Not available"}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Contact">
                  <span className="dashboard-inline-detail"><FaPhone /> {auth?.user?.phone || "Not available"}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Access">
                  <Tag color="green">Administrator</Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
