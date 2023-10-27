import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { CustomInput } from "../costum-input";
import { ErrorMessage } from "../error-message";
import { CustomButton } from "../custom-button";
import { ReactNode } from "react";
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: ReactNode;
  title: string;
  error?: string;
  employee?: T;
};

export const EmployeeForm = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CustomInput type="text" name="firstName" placeholder="Nume" />
        <CustomInput type="text" name="lastName" placeholder="Familie" />
        <CustomInput type="number" name="age" placeholder="Varsta" />
        <CustomInput type="text" name="adress" placeholder="Adresa" />
        <Space>
          <CustomButton htmlType="submit" icon={<EditOutlined />}>
            {btnText}
          </CustomButton>
          <Link to="/">
            <CustomButton icon={<HomeOutlined />} type="default">
              Înapoi
            </CustomButton>
          </Link>
          <ErrorMessage message={error} />
        </Space>
      </Form>
    </Card>
  );
};
