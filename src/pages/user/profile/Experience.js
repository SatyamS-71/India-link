import { Form, Input, Row, Col } from "antd";
import React from "react";


function Experience() {
  return (
    <>
    <Form.List name="experiences">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Row gutter={[10, 10]} align="middle">
              <Col span={7}>
                <Form.Item
                  {...restField}
                  name={[name, "company"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Company"
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item
                  {...restField}
                  name={[name, "designation"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Designation"
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  {...restField}
                  name={[name, "duration"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Duration"
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  {...restField}
                  name={[name, "location"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Location"
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>


              <i class="ri-delete-bin-line" onClick={() => remove(name)}></i>
            </Row>
          ))}
          <Form.Item>
            <button className="primary-outlined-btn " onClick={() => add()}>
              ADD EXPERIENCE
            </button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.List name="project">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Row gutter={[10, 10]} align="middle">
              <Col span={7}>
                <Form.Item
                  {...restField}
                  name={[name, "title"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Title"
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              
              <Col span={11}>
                <Form.Item
                  {...restField}
                  name={[name, "Description"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Description"
                >
                  <textarea placeholder="" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  {...restField}
                  name={[name, "duration"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Duration"
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>


              <i class="ri-delete-bin-line" onClick={() => remove(name)}></i>
            </Row>
          ))}
          <Form.Item>
            <button className="primary-outlined-btn " onClick={() => add()}>
              ADD PROJECT
            </button>
          </Form.Item>
        </>
      )}
    </Form.List>
    </>
  )
}

export default Experience