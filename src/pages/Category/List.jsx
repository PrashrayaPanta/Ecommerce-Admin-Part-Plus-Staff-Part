import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { LoadingComponent } from "../../components";
import { Link } from "react-router-dom";
import http from "../../http";
import { dtFormat } from "../../library";

const List = () => {
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    http
      .get("/cms/categories")
      .then(({ data }) => setCategories(data))
      .catch()
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    // console.log("clicked");

    // console.log(id);

    http
      .delete(`/cms/categories/${id}`)
      .then(() => http.get("/cms/categories"))
      .then(({ data }) => setCategories(data))
      .catch();
  };
  return (
    <div>
      <Container>
        <Row>
          <Col
            xs="12"
            className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto"
          >
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <Row>
                  <Col>
                    <h1>category</h1>
                  </Col>
                  <Col xs="auto">
                    <Link
                      className="btn btn-dark btn-sm me-2"
                      to="/category/create"
                    >
                      <i className="fa-solid fa-plus me-2"></i>
                      Add category
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {categories.length > 0 ? (
                      <Table bordered hover size="sm">
                        <thead className="table-dark">
                          <tr>
                            <th>Name</th>

                            <th>Status</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((category, index) => (
                            <tr key={index}>
                              <td>{category.name}</td>
                              <td>{category.status ? "Active" : "Inactive"}</td>

                              <td>{dtFormat(category.createdAt)}</td>
                              <td>{dtFormat(category.updatedAt)}</td>
                              <td>
                                <Link
                                  className="btn btn-dark btn-sm me-2"
                                  to={`/category/edit/${category._id}`}
                                >
                                  <i className="fa-solid fa-edit me-2"></i>Edit
                                </Link>

                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDelete(category._id)}
                                >
                                  <i className="fa-solid fa-trash me-2"></i>
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <h4 className="text-muted">No categorys</h4>
                    )}
                  </Col>
                </Row>
              </>
            )}
            {/* <Row>
            <Col>
              <h1>Welcome to category</h1>
            </Col>
          </Row> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default List;
