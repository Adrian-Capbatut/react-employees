import React from "react";
import { Layout } from "../../components/layout";
import { Row, Card, Form, Space, Typography } from "antd";
import { CustomInput } from "../../components/costum-input";
import { PasswordInput } from "../../components/password-input";
import { CustomButton } from "../../components/custom-button";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

export const Register = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Inregistrativa" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <CustomInput type="name" placeholder="Nume" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Parola" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Repetati parola"
            />
            <CustomButton type="primary" htmlType="submit">
              Inregistrativa
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Deja sunteti inregistrat ? <Link to={Paths.login}>Intrati</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
