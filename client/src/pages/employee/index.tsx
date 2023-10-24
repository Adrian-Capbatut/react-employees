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
import {
  DeleteOutlined,
  EditOutlined,
  BackwardOutlined,
} from "@ant-design/icons";
import { ErrorMessage } from "../../components/error-message";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    hideModal();

    try {
      await removeEmployee(data.id).unwrap();

      navigate(`${Paths.status}/deleted`);
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
      <Divider orientation="left">Actiune</Divider>
      {user?.id === data.userId ? (
        <>
          <Space>
            <Link to="/">
              <CustomButton
                shape="round"
                type="default"
                icon={<BackwardOutlined />}>
                Înapoi
              </CustomButton>
            </Link>
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
              onClick={showModal}
              icon={<DeleteOutlined />}>
              Stergeti
            </CustomButton>
          </Space>
        </>
      ) : (
        <>
          <Link to="/">
            <CustomButton
              shape="round"
              type="primary"
              icon={<BackwardOutlined />}>
              Înapoi
            </CustomButton>
          </Link>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Confimarti stergerea angajatului"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Confirmati"
        cancelText="Anulati">
        Doriti sa stergeti angajatul din tabel?
      </Modal>
    </Layout>
  );
};
