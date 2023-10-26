import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditEmployeesMutation,
  useGetEmployeesQuery,
} from "../../app/services/employees";
import { Layout } from "../../components/layout";
import { Row } from "antd";
import { EmployeeForm } from "../../components/employee-form";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { EditOutlined } from "@ant-design/icons";

export const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetEmployeesQuery(params.id || "");
  const [editEmployee] = useEditEmployeesMutation();

  if (isLoading) {
    return <span>Se incarca</span>;
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };

      await editEmployee(editedEmployee).unwrap;

      navigate(`${Paths.status}/update`);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Eroare neidentificata");
      }
    }
  };

  const btnText = (
    <span>
      <EditOutlined style={{ marginRight: "10px"}} />
      Redactati
    </span>
  );

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Redactati angajatul"
          btnText={btnText}
          error={error}
          employee={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  );
};
