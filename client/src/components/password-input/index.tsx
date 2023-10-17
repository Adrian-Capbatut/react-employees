import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";

type Props = {
  name: string;
  placeholder: string;
  dependecies?: NamePath[];
};

export const PasswordInput = ({ name, placeholder, dependecies }: Props) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependecies}
      hasFeedback
      rules={[
        { required: true, message: "Camp obligatoriu" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }

            if (name === "confirmPassword") {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Parola trebuie sa coincida"));
            } else {
              if (value.lenght < 6) {
                return Promise.reject(
                  new Error("Parola trebuie sa aiba mai mult de 6 simboluri")
                );
              }

              return Promise.resolve();
            }
          },
        }),
      ]}>
      <Input.Password placeholder={placeholder} size="large" />
    </Form.Item>
  );
};
