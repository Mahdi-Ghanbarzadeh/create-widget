import {
  Form,
  Select,
  Input,
  Button,
  Card,
  Row,
  Col,
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
  const [breakDisable, setBreakDisable] = useState(false);
  const [breakData, setBreakData] = useState(["Time"]);

  console.log("source: " + source);
  console.log("field: " + field);

  const handleSourceChange = (value) => {
    console.log("handleSourceChange Run!");
    setSource(fieldData[value]);
    setField(fieldData[value][0]);
    // console.log(onFinish());
  };

  const onFieldChange = (value) => {
    setField(value);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleBreakDisable = () => {
    // console.log();
    // console.log("group by: ", form.getFieldValue("group_by"));
    // console.log("group by: ", form.getFieldValue("group_by").length);
    // if (form.getFieldValue("group_by") === undefined) return false;
    // else return form.getFieldValue("group_by").length > 2;
    setBreakDisable(form.getFieldValue("group_by").length > 2);
  };

  const handleBreakData = () => {
    console.log("---");
    console.log(form.getFieldValue("group_by"));
    console.log(breakData);
    const data = form.getFieldValue("group_by");
    const len = data.length;
    console.log(data);
    console.log(len);
    if (len === 1) {
      // console.log("len 1");
      // console.log(data);
      // console.log(data[0]["select-group"]);
      // const ddtest = data[0]["select-group"];
      // if (ddtest === "Time") {
      //   console.log("return");
      //   return;
      // }
      // const dd = data.map((d) => d["select-group"]);
      // // const ddtime = dd.filter((f) => f !== "Time");
      // console.log("--dd--");
      // console.log(dd);
      // dd.push("Time");
      // console.log(dd);
      // setBreakData(data);
      console.log("len 1");
      const dd = data.map((d) => d["select-group"]);
      console.log(dd);
      if (!dd.includes("Time")) dd.push("Time");
      setBreakData(dd);
      data.map((d) => console.log(d.value));
    } else if (len === 2) {
      console.log("len 2");
      const dd = data.map((d) => d["select-group"]);
      console.log(dd);
      setBreakData(dd);
      data.map((d) => console.log(d.value));
    }
    // console.log("group by: ", form.getFieldValue("group_by"));
    // console.log("group by: ", form.getFieldValue("group_by").length);
    // if (form.getFieldValue("group_by") === undefined) return false;
    // else return form.getFieldValue("group_by").length > 2;
    // setBreakData(form.getFieldValue("group_by").length > 2);
  };

  const getField = () => {
    form.setFieldsValue({ operand_field: null });
    form.setFieldsValue({ group_by: null });
    form.setFieldsValue({ order_by: null });
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
            source: sourceData[0],
          }}
        >
          <Form.Item
            name="source"
            label="Source"
            rules={[{ required: true, message: "Please select your source!" }]}
          >
            <Select
              // defaultValue={sourceData[0]}
              style={{
                width: 150,
              }}
              onChange={handleSourceChange}
              onSelect={getField}
            >
              {sourceData.map((source) => (
                <Option key={source}>{source}</Option>
              ))}
            </Select>
          </Form.Item>
          <Row>
            <Col span={13}>
              <Card
                title="Operand"
                style={{
                  width: 650,
                }}
              >
                <Row gutter={16}>
                  <Col>
                    <Form.Item
                      name="operand_function"
                      label="Function"
                      rules={[
                        {
                          required: true,
                          message: "Please select your function!",
                        },
                      ]}
                    >
                      <Select
                        style={{
                          width: 100,
                        }}
                      >
                        <Option value="count">count</Option>
                        <Option value="values">values</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col>
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
                      <Select
                        style={{
                          width: 120,
                        }}
                        value={field}
                        onChange={onFieldChange}
                      >
                        {source.map((src) => (
                          <Option key={src}>{src}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col>
                    <Form.Item name="operand_label" label="Label">
                      <Input
                        style={{
                          width: 150,
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={11}>
              <Card
                title="Group By"
                style={{
                  width: 600,
                }}
              >
                {/* <Row>
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
                </Row> */}
                <Form.List name="group_by">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {/* {console.log("-----")}
                      {console.log(fields)}
                      {console.log("add " + add)} */}
                      {/* {fields.length === 0 ? add() : ""}
                      {fields.length === 0
                        ? console.log("true")
                        : console.log("false")} */}
                      {fields.map((field, index) => (
                        <Row>
                          {console.log(field.name)}
                          <Col span={11}>
                            <Form.Item
                              name={[field.name, "select-group"]}
                              label="Field"
                            >
                              <Select
                                style={{
                                  width: 150,
                                }}
                                onChange={handleBreakData}
                              >
                                {source.map((src) => (
                                  <Option key={src}>{src}</Option>
                                ))}
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
                              onClick={() => {
                                remove(field.name);
                                handleBreakDisable();
                              }}
                            />
                          </Col>
                        </Row>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => {
                            add();
                            handleBreakDisable();
                          }}
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
          {console.log("---D---")}
          {/* {console.log(onDisable())} */}
          <Form.Item name="break-by" label="Break by">
            <Select
              style={{
                width: 150,
              }}
              disabled={breakDisable}
            >
              {breakData.map((source) => (
                <Option key={source}>{source}</Option>
              ))}
              {/* <Option value="source1">source1</Option>
              <Option value="source2">source2</Option>
              <Option value="source3">source3</Option> */}
            </Select>
          </Form.Item>
          <Form.Item name="order_by" label="Order by">
            <Select
              style={{
                width: 150,
              }}
            >
              {source.map((src) => (
                <Option key={src}>{src}</Option>
              ))}
              {/* <Option value="source1">source1</Option>
              <Option value="source2">source2</Option>
              <Option value="source3">source3</Option> */}
            </Select>
          </Form.Item>
          <Form.Item
            name="limit"
            label="Limit"
            rules={[{ type: "number", min: 1 }]}
          >
            <InputNumber />
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
          <Form.Item name="filters" label="Filters">
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
          <Col span={11}></Col>
        </Row>
      </div>
    </>
  );
}

export default CreateWidget;
