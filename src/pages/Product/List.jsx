import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../../http";
import { LoadingComponent } from "../../components";
import { dtFormat, imgURL } from "../../library";

import "./List.css";

export const List = () => {
  useEffect(() => {
    document.title = "Product";
  }, []);

  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    http
      .get("/cms/products")
      .then(({ data }) => setProducts(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  function handleDelete(index) {
    setIsLoading(true);

    http
      .delete(`/cms/products/${index}`)
      .then(() => http.get("/cms/products"))
      .then(({ data }) => setProducts(data))
      .catch()
      .finally(() => setIsLoading(false));
  }

  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <>
              <Row className="">
                <Col>
                  <h1>Products</h1>
                </Col>

                <Col xs="auto">
                  <Link
                    className="btn btn-dark btn-sm me-2"
                    to="/product/create"
                  >
                    <i className="fa-solid fa-plus me-2"></i>
                    Add Products
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col>
                  {products.length > 0 ? (
                    <Table bordered hover size="sm">
                      <thead className="table-dark">
                        <tr>
                          <th>Name</th>
                          <th>Images</th>
                          <th>Category</th>
                          <th>Brand</th>
                          <th>Price</th>
                          <th>Discounted Price</th>
                          <th>Created at</th>
                          <th>Updated at</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr>
                            <td>{product.name}</td>
                            <td>
                              <a
                                href={imgURL(product.images[0])}
                                target="_blank"
                              >
                                <img
                                  src={imgURL(product.images[0])}
                                  className="img-sm"
                                  alt=""
                                  srcset=""
                                />
                              </a>
                            </td>
                            <td>{product?.brand?.name}</td>
                            <td>{product?.category?.name}</td>
                            <td>{`Rs ${product.price}`}</td>
                            <td>{product.status ? "Active" : "Inactive"}</td>
                            <td>{dtFormat(product.updatedAt)}</td>
                            <td>{dtFormat(product.updatedAt)}</td>
                            <td>
                              <Link
                                className="btn btn-dark btn-sm me-2"
                                to={`/product/edit/${product._id}`}
                              >
                                <i className="fa-solid fa-edit me-2"></i>Edit
                              </Link>

                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(product._id)}
                              >
                                <i className="fa-solid fa-trash me-2"></i>Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <h4 className="text-muted">No products</h4>
                  )}
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
