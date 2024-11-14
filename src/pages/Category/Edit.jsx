import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../http";
import { LoadingComponent } from "../../components";

const Edit = () => {
  // console.log("category edit is running");

  const [category, setCategory] = useState({});

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

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
        .patch(`/cms/categories/${id}`, data)
        .then(({ data }) => navigate("/category"))
        .catch()
        .finally(() => setSubmitting(false));
    },
  });

  useEffect(() => {
    setLoading(true);
    http
      .get(`/cms/categories/${id}`)
      .then(({ data }) => setCategory(data))
      .catch()
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (Object.keys(category).length > 0) {
      for (let k in formik.values) {
        formik.setFieldValue(k, category[k]);
      }
    }
    // console.log(staff);
  }, [category]);

  //   console.log(category);

  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <Row>
                <Col>
                  <h1>Edit Page</h1>
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
                      <Form.Label htmlFor="status">Status</Form.Label>
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
                    <SubmitBtn formik={formik} label="Update" />
                  </Form>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Edit;
