import { useState } from "react";
import { Layout } from "../../components/layout";
import { Row, Card, Form, Space, Typography } from "antd";
import { CustomInput } from "../../components/costum-input";
import { PasswordInput } from "../../components/password-input";
import { CustomButton } from "../../components/custom-button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message";

export const Login = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState("");

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate("/")
      
    } catch (err) {
      const maybeError = isErrorWithMessage(err);


      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Eroare neidentificata");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Intrati" style={{ width: "30rem" }}>
          <Form onFinish={login}>
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
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
