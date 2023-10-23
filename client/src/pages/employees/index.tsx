import { PlusCircleOutlined } from "@ant-design/icons";
import { CustomButton } from "../../components/custom-button";
import { Layout } from "../../components/layout";
import { Table } from "antd";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import type { ColumnsType } from "antd/es/table";
import { Employee } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";

const columns: ColumnsType<Employee> = [
  {
    title: "Nume",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Varsta",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Adresa",
    dataIndex: "address",
    key: "address",
  },
];

export const Employees = () => {
    const navigate = useNavigate();
  const { data, isLoading } = useGetAllEmployeesQuery();

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={() => null}
        icon={<PlusCircleOutlined />}>
        Adaugati
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id }
        onRow={(record) => {
            return {
                onClick: () => navigate(`${Paths.employee}/${record.id}`)
            }
        }}
      />
    </Layout>
  );
};
