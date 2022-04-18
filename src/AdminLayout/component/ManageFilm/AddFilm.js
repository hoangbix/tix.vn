import React, { useState } from "react";
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
  Row,
  Col,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { ThemPhimAction } from "../../../redux/actions/QuanLyPhimAction";
import { useDispatch } from "react-redux";
import { MA_NHOM } from "../../../util/config";

const AddFilm = () => {
  const dispatch = useDispatch();
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values, { resetForm }) => {
      let formData = new FormData();
      values.maNhom = MA_NHOM;
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }

      dispatch(ThemPhimAction(formData));
      resetForm();
    },
  });

  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Vui lòng chọn ngày chiếu!",
      },
    ],
  };

  const handelChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc(e.target.result);
    };
    formik.setFieldValue("hinhAnh", file);
  };
  return (
    <>
      <div className="text-2xl	text-center">
        <h1>Thêm mới phim</h1>
      </div>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Tên phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input.TextArea name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày chiếu">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name="date-picker" {...config}>
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={handelChangeDatePicker}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số sao">
                <InputNumber
                  min={0}
                  max={10}
                  type="number"
                  onChange={(value) => formik.setFieldValue("danhGia", value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="Tình trạng">
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch("dangChieu")} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch("sapChieu")} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="HOT" valuePropName="checked">
                <Switch onChange={handleChangeSwitch("hot")} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item>
                <input
                  type="file"
                  onChange={handleChangeFile}
                  accept="image/*"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <img src={imgSrc} width="100px" />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
          >
            Gửi phim
          </button>
        </Form.Item>
      </Form>
    </>
  );
};
export default AddFilm;
