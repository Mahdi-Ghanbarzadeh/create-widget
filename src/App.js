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
import { useState, useRef } from "react";

const { Option } = Select;

const fieldData = {
  Source1: {
    fields: ["Field1", "Field2", "first_bytes_ts"],
    time_column: "first_bytes_ts",
  },
  Source2: {
    fields: ["Field3", "Field4", "Time"],
    time_column: "Time",
  },
  Source3: {
    fields: ["Field5", "Field6", "Field7", "last_bytes_ts"],
    time_column: "last_bytes_ts",
  },
};

const sourceData = Object.keys(fieldData);

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

  const [source, setSource] = useState(fieldData[sourceData[0]].fields);
  const [field, setField] = useState(fieldData[sourceData[0]][0]);
  const [breakDisable, setBreakDisable] = useState(false);
  const [breakData, setBreakData] = useState([
    fieldData[sourceData[0]].time_column,
  ]);
  const [numberOfGroupByFields, setNumberOfGroupByFields] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredOptions = source.filter((o) => !selectedItems.includes(o));

  const HandleSelectedItems = () => {
    const data = form
      .getFieldValue("group_by")
      .filter((obj) => obj !== undefined)
      .map((obj) => obj["select-group"]);
    setSelectedItems(data);
  };

  const handleSourceChange = (value) => {
    console.log("handleSourceChange Run!");
    // console.log(value);
    // console.log(fieldData[value].fields);
    // console.log(fieldData[value].fields[0]);
    setSource(fieldData[value].fields);
    setField(fieldData[value].fields[0]);
    setNumberOfGroupByFields(0);
    setBreakDisable(false);
  };

  const onFieldChange = (value) => {
    setField(value);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleBreakDisable = () => {
    setBreakDisable(form.getFieldValue("group_by").length > 2);
  };

  const handleBreakData = (value) => {
    console.log("---handle break data---");
    console.log(value);
    // console.log("---");
    // console.log(form.getFieldValue("group_by"));
    // console.log(breakData);
    // const data = form.getFieldValue("group_by");
    // const len = data.length;
    // console.log(data);
    // console.log(len);
    // if (len === 1) {
    //   // console.log("len 1");
    //   // console.log(data);
    //   // console.log(data[0]["select-group"]);
    //   // const ddtest = data[0]["select-group"];
    //   // if (ddtest === "Time") {
    //   //   console.log("return");
    //   //   return;
    //   // }
    //   // const dd = data.map((d) => d["select-group"]);
    //   // // const ddtime = dd.filter((f) => f !== "Time");
    //   // console.log("--dd--");
    //   // console.log(dd);
    //   // dd.push("Time");
    //   // console.log(dd);
    //   // setBreakData(data);
    //   console.log("len 1");
    //   const dd = data.map((d) => d["select-group"]);
    //   console.log(dd);
    //   if (!dd.includes("Time")) dd.push("Time");
    //   setBreakData(dd);
    //   data.map((d) => console.log(d.value));
    // } else if (len === 2) {
    //   console.log("len 2");
    //   const dd = data.map((d) => d["select-group"]);
    //   console.log(dd);
    //   setBreakData(dd);
    //   data.map((d) => console.log(d.value));
    // }
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
              style={{
                width: 150,
              }}
              onChange={handleSourceChange}
              onSelect={getField}
            >
              {sourceData.map((source) => (
                <Option key={source} value={source}>
                  {source}
                </Option>
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
                          <Option key={src} value={src}>
                            {src}
                          </Option>
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
                <Form.List name="group_by">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Row key={index}>
                          <Col span={11}>
                            <Form.Item
                              name={[field.name, "select-group"]}
                              label="Field"
                            >
                              <Select
                                style={{
                                  width: 150,
                                }}
                                onChange={(value) => {
                                  handleBreakData(value);
                                  HandleSelectedItems();
                                }}
                              >
                                {filteredOptions.map((item) => (
                                  <Option key={item} value={item}>
                                    {item}
                                  </Option>
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
                              onClick={(value) => {
                                remove(field.name);
                                handleBreakDisable();
                                setNumberOfGroupByFields((prev) => prev - 1);
                                HandleSelectedItems();
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
                            setNumberOfGroupByFields((prev) => prev + 1);
                            HandleSelectedItems();
                          }}
                          style={{
                            width: "100%",
                          }}
                          icon={<PlusOutlined />}
                          disabled={numberOfGroupByFields >= source.length}
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
              disabled={breakDisable}
            >
              {breakData.map((source) => (
                <Option key={source} value={source}>
                  {source}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="order_by" label="Order by">
            <Select
              style={{
                width: 150,
              }}
            >
              {source.map((src) => (
                <Option key={src} value={src}>
                  {src}
                </Option>
              ))}
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
