import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useGetEmployeesQuery,
  useRemoveEmployeesMutation,
} from "../../app/services/employees";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Descriptions } from "antd";
import { Layout } from "../../components/layout";

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
    </Layout>
  );
};
