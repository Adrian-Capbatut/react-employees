import React from "react";
import { Layout } from "../../components/layout";
import { Row, Card, Form, Space, Typography } from "antd";
import { CustomInput } from "../../components/costum-input";
import { PasswordInput } from "../../components/password-input";
import { CustomButton } from "../../components/custom-button";
import { Link } from "react-router-dom"
import { Paths } from "../../paths";

export const Login = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Intrati" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Parola" />
            <CustomButton type="primary" htmlType="submit">
              Intrati
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Nu aveti profil? <Link to={Paths.register}>Inregistrativa</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
