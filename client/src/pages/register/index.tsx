import React, { useState } from "react";
import { Layout } from "../../components/layout";
import { Row, Card, Form, Space, Typography } from "antd";
import { CustomInput } from "../../components/costum-input";
import { PasswordInput } from "../../components/password-input";
import { CustomButton } from "../../components/custom-button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();

      navigate("/");
    } catch (error) {
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Eroare neidentificata");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Inregistrativa" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <CustomInput type="name" name="name" placeholder="Nume" />
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
            <ErrorMessage message={error} />
          </Space>          
        </Card>
      </Row>
    </Layout>
  );
};
