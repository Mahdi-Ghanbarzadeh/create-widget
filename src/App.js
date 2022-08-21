import {
  Form,
  Select,
  Input,
  Button,
  Dropdown,
  Menu,
  Card,
  Row,
  Col,
  Space,
  InputNumber,
  Divider,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";

const { Option } = Select;

const sourceData = ["Source1", "Source2", "Source3"];
const fieldData = {
  Source1: ["Field1", "Field2", "Time"],
  Source2: ["Field3", "Field4", "Time"],
  Source3: ["Field5", "Field6", "Time"],
};

const options = {
  chart: {
    type: "bar",
  },
  title: {
    text: "Fruit Consumption",
  },
  xAxis: {
    categories: ["Apples", "Bananas", "Oranges"],
  },
  yAxis: {
    title: {
      text: "Fruit eaten",
    },
  },
  series: [
    {
      name: "Jane",
      data: [1, 0, 4],
    },
    {
      name: "John",
      data: [5, 7, 3],
    },
  ],
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

function CreateWidget() {
  const [form] = Form.useForm();
  console.log(form);

  const [source, setSource] = useState(fieldData[sourceData[0]]);
  const [field, setField] = useState(fieldData[sourceData[0]][0]);

  console.log("source: " + source);
  console.log("field: " + field);

  const handleSourceChange = (value) => {
    console.log("handleSourceChange Run!");
    setSource(fieldData[value]);
    setField(fieldData[value][0]);
  };

  const onFieldChange = (value) => {
    setField(value);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const getField = (city) => {
    console.log("getField Run!");
    console.log(city);
    // console.log(form);
    form.setFieldsValue({ operand_field: null });
  };

  return (
    <>
      <div className="site-layout-content">
        <Form
          form={form}
          // layout="vertical"
          name="validate_other"
          onFinish={onFinish}
          initialValues={{
            "input-number": 3,
            "checkbox-group": ["A", "B"],
            rate: 3.5,
          }}
        >
          <Form.Item
            name="source"
            label="Source"
            rules={[{ required: true, message: "Please select your source!" }]}
          >
            <Select
              defaultValue={sourceData[0]}
              style={{
                width: 150,
              }}
              onChange={handleSourceChange}
              onSelect={getField}
            >
              {sourceData.map((source) => (
                <Option key={source}>{source}</Option>
              ))}
              {/* <Option value="source1">source1</Option>
              <Option value="source2">source2</Option>
              <Option value="source3">source3</Option> */}
            </Select>
          </Form.Item>

          <Row>
            <Col span={12}>
              <Card
                title="Operand"
                style={{
                  width: 600,
                }}
              >
                <Form.Item
                  name="operand_function"
                  label="Function"
                  rules={[
                    { required: true, message: "Please select your function!" },
                  ]}
                >
                  <Select
                    style={{
                      width: 150,
                    }}
                  >
                    <Option value="count">count</Option>
                    <Option value="values">values</Option>
                  </Select>
                </Form.Item>

                <Row>
                  <Col span={12}>
                    <Form.Item
                      name="operand_field"
                      label="Field"
                      rules={[
                        {
                          required: true,
                          message: "Please select your field!",
                        },
                      ]}
                    >
                      {/* {console.log("field+: " + field)} */}
                      {/* {field} */}
                      <Select
                        style={{
                          width: 150,
                        }}
                        value={field}
                        onChange={onFieldChange}
                      >
                        {source.map((src) => (
                          <Option key={src}>{src}</Option>
                        ))}
                        {/* {console.log("field+: " + field)} */}
                        {/* <Option value="field1">field1</Option>
                        <Option value="field2">field2</Option> */}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="operand_label" label="Label">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Group By"
                style={{
                  width: 600,
                }}
              >
                <Row>
                  <Col span={11}>
                    <Form.Item name="group_field" label="Field">
                      <Select
                        style={{
                          width: 150,
                        }}
                      >
                        <Option value="field1">field1</Option>
                        <Option value="field2">field2</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item name="group_label" label="Label">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.List name="users">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Row>
                          <Col span={11}>
                            <Form.Item
                              name={[field.name, "select-group"]}
                              label="Field"
                            >
                              <Select
                                style={{
                                  width: 150,
                                }}
                              >
                                <Option value="field1">field1</Option>
                                <Option value="field2">field2</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={11}>
                            <Form.Item
                              name={[field.name, "label-group"]}
                              label="Label"
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={2}>
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          </Col>
                        </Row>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          style={{
                            width: "100%",
                          }}
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>

                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            </Col>
          </Row>

          <br />
          <br />

          <Form.Item name="break-by" label="Break by">
            <Select
              style={{
                width: 150,
              }}
            >
              <Option value="source1">source1</Option>
              <Option value="source2">source2</Option>
              <Option value="source3">source3</Option>
            </Select>
          </Form.Item>

          <Form.Item name="order-by" label="Order by">
            <Select
              style={{
                width: 150,
              }}
            >
              <Option value="source1">source1</Option>
              <Option value="source2">source2</Option>
              <Option value="source3">source3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="limit"
            // {...formItemLayout}
            label="Limit"
            // validateStatus={number.validateStatus}
            // help={number.errorMsg}
            rules={[{ type: "number", min: 1 }]}
          >
            <InputNumber
            // min={1}
            // value={number.value} dont use value !!!! describe mohandes
            // onChange={onNumberChange}
            />
          </Form.Item>

          <Divider />

          <Form.Item
            name="time"
            label="Time"
            style={{
              width: 250,
            }}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="filters"
            label="Filters"
            // style={{
            //   width: 250,
            // }}
          >
            <Input />
          </Form.Item>

          <Divider />

          <Row justify="center">
            <Col span={2}>
              <Form.Item>
                <Button icon={<AreaChartOutlined />}></Button>
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item>
                <Button icon={<PieChartOutlined />}></Button>
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item>
                <Button icon={<BarChartOutlined />}></Button>
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item>
                <Button icon={<DotChartOutlined />}></Button>
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item>
                <Button icon={<LineChartOutlined />}></Button>
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item>
                <Button icon={<RadarChartOutlined />}></Button>
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item>
                <Button>Button7</Button>
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item>
                <Button>Button8</Button>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <Row justify="center">
          <Col span={11}>
            <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{
                  style: { height: "300px", width: "600px" },
                }}
              />
            </div>
          </Col>
          <Col span={2} push={1}>
            <Divider type="vertical" style={{ height: "100%" }} />
          </Col>
          <Col span={11}>
            {/* <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{
                  style: { height: "300px", width: "600px" },
                }}
              />
            </div> */}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreateWidget;
