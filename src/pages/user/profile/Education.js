import { Form, Input, Row, Col } from "antd";
import React from "react";

function Education() {
  return (
<>
<Form.List name="education">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Row gutter={[10, 10]} align="middle">
              <Col span={8}>
                <Form.Item
                  {...restField}
                  name={[name, "institution"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Institution"
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...restField}
                  name={[name, "degree"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Degree"
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  {...restField}
                  name={[name, "percentage"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Percentage"
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>


              <i class="ri-delete-bin-line" onClick={() => remove(name)}></i>
            </Row>
          ))}
          <Form.Item>
            <button className="primary-outlined-btn " onClick={() => add()}>
              ADD EDUCATION
            </button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.List name="skills">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Row gutter={[10, 10]} align="middle">
              <Col span={8}>
                <Form.Item
                  {...restField}
                  name={[name, "technology"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Technology"
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...restField}
                  name={[name, "rating"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Rating"
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>

              <i class="ri-delete-bin-line" onClick={() => remove(name)}></i>
            </Row>
          ))}
          <Form.Item>
            <button className="primary-outlined-btn " onClick={() => add()}>
              ADD SKILLS
            </button>
          </Form.Item>
        </>
      )}
    </Form.List>
</>
);
}

export default Education;

/*
    <Form.List name="education">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Row gutter={[10, 10]} align="middle">
              <Col span={8}>
                <Form.Item
                  {...restField}
                  name={[name, "institution"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Institution"
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  {...restField}
                  name={[name, "degree"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Degree"
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  {...restField}
                  name={[name, "percentage"]}
                  rules={[
                    {
                      required: true,
                      message: "required",
                    },
                  ]}
                  label="Percentage"
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>


              <i class="ri-delete-bin-line" onClick={() => remove(name)}></i>
            </Row>
          ))}
          <Form.Item>
            <button className="primary-outlined-btn " onClick={() => add()}>
              ADD EDUCATION
            </button>
          </Form.Item>
        </>
      )}
    </Form.List>
 */