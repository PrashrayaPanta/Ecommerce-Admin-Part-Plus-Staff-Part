import { Col, Container, Form, Row } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import http from "../../http";
import { setUser } from "../../store";
import * as Yup from "yup";
import { BackendvalidationError } from "../../library";

export const Edit = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: user.name,
      phone: user.phone,
      address: user.address,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      phone: Yup.string().required(),
      address: Yup.string().required(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      console.log(data);

      http
        .put("/profile/edit", data)
        // .then((data) => console.log(data))

        // .then((data) => console.log(data))
        .then(() => http.get("/profile"))
        .then(({ data }) => dispatch(setUser(data)))

        .catch(({ response }) => {
          BackendvalidationError(formik, response);
        })
        .finally(() => setSubmitting(false));
    },
  });
  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          <Row>
            <Col className="text-center">
              <h1>Change Profile</h1>
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
                <InputField
                  type="text"
                  label="Phone"
                  name="phone"
                  formik={formik}
                />
                <InputField
                  type="text"
                  label="Address"
                  name="address"
                  formik={formik}
                />

                <SubmitBtn formik={formik} label="Save" icon="fa fa-edit" />
                {/* <SubmitBtn formik={formik} label="Add" icon="fa fa-plus" /> */}
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
