import React from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";

import * as Yup from "yup";
import http from "../../http";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      status: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      status: Yup.boolean().required(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      http
        .post("/cms/categories", data)
        .then(({ data }) => navigate("/category"))
        .catch()
        .finally(() => setSubmitting(false));
    },
  });
  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          <Row>
            <Col>
              <h1> Create Category </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={formik.handleSubmit}>
                <InputField
                  label="Name"
                  name="name"
                  formik={formik}
                  type="text"
                />

                <div className="mb-2">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    id="status"
                    value={formik.values.status}
                    isValid={formik.values.status && !formik.errors.status}
                    isInvalid={formik.touched.email && formik.errors.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </Form.Select>
                  {formik.errors.status && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.status}
                    </Form.Control.Feedback>
                  )}
                </div>
                <SubmitBtn formik={formik} label="Create" />
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
