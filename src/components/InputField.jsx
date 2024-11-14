import { Form } from "react-bootstrap";

export const InputField = ({ type = "text", label, name, formik, as }) => {
  // console.log(label);
  // console.log(name);
  // console.log(formik);

  return (
    <div className="mb-3">
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.Control
        type={type}
        as={as}
        name={name}
        id={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        onBlur={formik.handleBlur}
        isInvalid={formik.touched[name] && formik.errors[name]}
        isValid={formik.values[name] && !formik.errors[name]}
      />
      {formik.touched[name] && formik.errors[name] && (
        <Form.Control.Feedback type="invalid">
          {formik.errors[name]}
        </Form.Control.Feedback>
      )}
    </div>
  );
};
