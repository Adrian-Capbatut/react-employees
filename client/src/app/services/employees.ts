import { Employee } from "@prisma/client";
import { api } from "./api";

export const employeesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
    }),

    getEmployees: builder.query<Employee, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
    }),

    editEmployees: builder.mutation<string, Employee>({
      query: (employee) => ({
        url: `/employees/edit/${employee.id}`,
        method: "PUT",
        body: employee
      }),
    }),

    removeEmployees: builder.mutation<string, string>({
      query: (id) => ({
        url: `/employees/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),

    addEmployees: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: `/employees/add`,
        method: "POST",
        body: employee,
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeesQuery,
  useEditEmployeesMutation,
  useRemoveEmployeesMutation,
  useAddEmployeesMutation,
} = employeesApi;

export const {
  endpoints: {
    getAllEmployees,
    getEmployees,
    editEmployees,
    removeEmployees,
    addEmployees,
  },
} = employeesApi;
