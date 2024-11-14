import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import http from "../../http";
import { LoadingComponent } from "../../components";
import { dtFormat } from "../../library";

const List = () => {
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setLoading(true);

    http
      .get("/cms/orders")
      .then(({ data }) => setOrders(data))
      .catch()
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = (id, status) => {
    // console.log(id);
    // console.log(status);

    setLoading(true);

    http
      .patch(`/cms/orders/${id}`, { status })
      .then(() => http.get("/cms/orders"))
      .then(({ data }) => setOrders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          {loading ? (
            <LoadingComponent />
          ) : (
            <React.Fragment>
              <Row>
                <Col>
                  <h1>Order List</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  {orders.length > 0 ? (
                    <Table bordered hover size="sm">
                      <thead className="table-dark">
                        <tr>
                          <th>Order By Name</th>
                          <th>Order By Email</th>

                          {/* <th>Status</th> */}
                          <th>Total Price</th>
                          <th>Status</th>

                          <th>Created at</th>
                          <th>Updated at</th>

                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => (
                          <tr>
                            <td>{order.user?.name}</td>
                            <td>{order.user?.email}</td>
                            {/* <td>{order.status}</td> */}
                            {/* <td>
                              {order.details.map(
                                (detail) => detail?.product?.name
                              )}
                            </td>
                            <td>
                              {order.details.map(
                                (detail) => detail.qty * detail.price
                              )}
                            </td> */}
                            <td>
                              <ul>
                                {order.details.map((detail) => (
                                  <li key={detail._id}>
                                    {detail.qty} x {detail.product?.name}
                                    @Rs {detail.price} = Rs . {detail.total}
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td>
                              <Form.Select
                                value={order.status}
                                onChange={({ target }) =>
                                  handleUpdate(order._id, target.value)
                                }
                              >
                                <option value="Processing">Processing</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Shipping">Shipping</option>
                                <option value="Delivered">Deliverd</option>
                                <option value="cancelled">Cancelled</option>
                              </Form.Select>
                            </td>

                            <td>{dtFormat(order.createdAt)}</td>
                            <td>{dtFormat(order.updatedAt)}</td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(order._id)}
                              >
                                <i className="fa-solid fa-trash me-2"></i>Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <h4 className="text-muted">No orders</h4>
                  )}
                </Col>
              </Row>
            </React.Fragment>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default List;
