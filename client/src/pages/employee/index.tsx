import React, { useState } from "react";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import {
  useGetEmployeesQuery,
  useRemoveEmployeesMutation,
} from "../../app/services/employees";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Descriptions, Divider, Modal, Space } from "antd";
import { Layout } from "../../components/layout";
import { CustomButton } from "../../components/custom-button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ErrorMessage } from "../../components/error-message";

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeesQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeesMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <span>Se incarca</span>;
  }

  if (!data) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <Descriptions title="Informatie denspre angajat" bordered>
        <Descriptions.Item label="Nume" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Varsta" span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label="Adresa" span={3}>
          {data.adress}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Actiune</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}>
                Redacteaza
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={() => null}
              icon={<DeleteOutlined />}>
              Stergeti
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Confimarti stergerea angajatului"
        open={isModalOpen}
        onOk={() => null}
        onCancel={() => null}
        okText="Confirmati"
        cancelText="Anulati">
        Doriti sa stergeti angajatul din tabel?
      </Modal>
    </Layout>
  );
};
