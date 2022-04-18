import React from "react";
import { Input } from "antd";
import { ErrorMessage, useField } from "formik";

const TextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2 input__error">
      <Input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
      />
      <ErrorMessage name={field.name} />
    </div>
  );
};

export default TextField;
