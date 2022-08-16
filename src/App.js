import { Form, Select, Input, Button, Dropdown, Menu } from "antd";
import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const { Option } = Select;

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            a
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            b
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            c
          </a>
        ),
      },
    ]}
  />
);

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

function CreateWidget() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Form
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
          hasFeedback
          rules={[{ required: true, message: "Please select your source!" }]}
        >
          <Select placeholder="Please select a source">
            <Option value="source1">source1</Option>
            <Option value="source2">source2</Option>
            <Option value="source3">source3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="information"
          label="Information"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Dropdown overlay={menu} placement="bottom">
          <Button>bottom</Button>
        </Dropdown>
      </Form>

      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{
            style: { height: "300px", width: "600px" },
          }}
        />
      </div>
    </>
  );
}

export default CreateWidget;
