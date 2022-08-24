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
  Typography,
  Space,
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
import { useState, useRef, useEffect } from "react";

const { Option } = Select;
const { Text } = Typography;

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
  const codeRef = useRef(null);

  const [source, setSource] = useState(fieldData[sourceData[0]].fields);
  const [field, setField] = useState(fieldData[sourceData[0]][0]);
  const [breakDisable, setBreakDisable] = useState(false);
  const [breakData, setBreakData] = useState([
    fieldData[sourceData[0]].time_column,
  ]);
  const [numberOfGroupByFields, setNumberOfGroupByFields] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredOptions = source.filter((o) => !selectedItems.includes(o));

  const [functionRequired, setFunctionRequired] = useState(true);

  useEffect(() => {
    console.log("run");
    console.log(form.getFieldValue("group_by"));
    console.log(numberOfGroupByFields);
    // console.log(functionRequired);
    if (numberOfGroupByFields === 0) setFunctionRequired(true);
    else setFunctionRequired(false);
    form.validateFields(["Function"]);
  }, [numberOfGroupByFields, form]);

  useEffect(() => {
    console.log("run2");
    console.log(functionRequired);
    console.log(form.validateFields(["Function"]));
    form.validateFields(["Function"]);
  }, [functionRequired, form]);

  // const functionRequiredHandler = () => {
  //   console.log("run");
  //   console.log(form.getFieldValue("group_by"));
  //   console.log(numberOfGroupByFields);
  //   if (numberOfGroupByFields === 0) setFunctionRequired(true);
  //   else setFunctionRequired(false);
  // };

  const HandleSelectedItems = () => {
    const data = form
      .getFieldValue("group_by")
      .filter((groupObject) => groupObject !== undefined)
      .map((groupObject) => groupObject["select-group"]);
    setSelectedItems(data);
  };

  const handleSourceChange = (value) => {
    setSource(fieldData[value].fields);
    setField(fieldData[value].fields[0]);
    setNumberOfGroupByFields(0);
    setBreakDisable(false);
    setBreakData([fieldData[value].time_column]);
  };

  const onFieldChange = (value) => {
    setField(value);
  };

  const onFinish = (values) => {
    let queryOutput = "select";
    // add select options to query, example: select count(Field1)
    // if function selected, add it to select
    // example: select count(Field1)
    if (values.operand_function !== undefined)
      queryOutput += ` ${values.operand_function} (${values.operand_field})`;
    // if function doesn't selected, only add the field
    // example: select Field1
    else queryOutput += ` ${values.operand_field}`;

    // add label of select to query, example: select count(Field1) as f1
    if (values.operand_label !== undefined && values.operand_label !== "")
      queryOutput += ` as ${values.operand_label}`;

    // add Group by objects to select
    // example: select count (Field1), Field2 as f2
    if (values.group_by !== undefined && values.group_by.length !== 0)
      queryOutput += `,${values.group_by.map(
        (obj) =>
          `${obj["select-group"]} ${
            obj["label-group"] !== undefined && obj["label-group"] !== ""
              ? `as ${obj["label-group"]}`
              : ""
          }`
      )}`;

    // add from to query, example: from Source1
    queryOutput += `\nfrom ${values.source}`;

    // add where to query
    // example: where Field1 > 10 and first_bytes_ts=1390
    queryOutput += `\nwhere ${
      values.filters !== undefined && values.filters !== ""
        ? `${values.filters} and `
        : ""
    }${fieldData[form.getFieldValue("source")].time_column}=${values.time}`;

    // add group by to query, example: group by Field2
    if (values.group_by !== undefined && values.group_by.length !== 0)
      queryOutput += `\ngroup by ${values.group_by.map(
        (obj) => obj["select-group"]
      )}`;

    // add order by to query, example: order by Field1
    if (values.order_by !== undefined)
      queryOutput += `\norder by ${values.order_by}`;

    // add limit to query, example: limit 1000
    if (values.limit !== undefined && values.limit !== null)
      queryOutput += `\nlimit ${values.limit}`;

    codeRef.current.textContent = queryOutput;
  };

  const handleBreakDisable = () => {
    setBreakDisable(form.getFieldValue("group_by").length > 2);
  };

  const handleBreakData = (value) => {
    form.setFieldsValue({ break_by: undefined });
    const data = form
      .getFieldValue("group_by")
      .map((groupObject) => groupObject?.[["select-group"]]);
    const lengthOfGroup = data.length;

    if (lengthOfGroup === 0) {
      if (
        !breakData.includes(fieldData[form.getFieldValue("source")].time_column)
      )
        setBreakData([
          ...new Set([fieldData[form.getFieldValue("source")].time_column]),
        ]);
    } else if (lengthOfGroup === 1 && !breakData.includes(value)) {
      setBreakData([
        ...new Set([
          ...data,
          fieldData[form.getFieldValue("source")].time_column,
        ]),
      ]);
    } else {
      setBreakData([...new Set(data)]);
    }
  };

  const getField = () => {
    form.setFieldsValue({ operand_function: undefined });
    form.setFieldsValue({ operand_field: undefined });
    form.setFieldsValue({ operand_label: undefined });
    form.setFieldsValue({ group_by: undefined });
    form.setFieldsValue({ order_by: undefined });
    form.setFieldsValue({ break_by: undefined });
    form.setFieldsValue({ limit: undefined });
    form.setFieldsValue({ time: undefined });
    form.setFieldsValue({ filters: undefined });
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
                          required: functionRequired,
                          message:
                            "Please select Function or add Group By Field!",
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
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Field!",
                                },
                              ]}
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
                                handleBreakData();
                                // functionRequiredHandler();
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
                            // functionRequiredHandler();
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

          <Form.Item name="break_by" label="Break by">
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
          <Space size={"large"} direction="vertical">
            <Text code>
              <span ref={codeRef}>Submit the form to show query</span>
            </Text>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Space>
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
