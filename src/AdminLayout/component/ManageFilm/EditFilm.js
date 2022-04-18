import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
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
import {
  CapNhatPhimAction,
  LayThongTinPhimAction,
} from "../../../redux/actions/QuanLyPhimAction";
import { ThongTinPhimReducer } from "../../../redux/reducers/QuanLyPhimReducer/ThongTinPhimReducer";
import { useDispatch, useSelector } from "react-redux";
import { MA_NHOM } from "../../../util/config";
import "./manage-film.scss";
import Swal from "sweetalert2";

const EditFilm = () => {
  const { id } = useParams();
  const { thongTinPhim } = useSelector((state) => state.ThongTinPhimReducer);
  const dispatch = useDispatch();
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    dispatch(LayThongTinPhimAction(id));
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values, { resetForm }) => {
      let formData = new FormData();
      values.maNhom = MA_NHOM;
      if (
        formik.initialValues.tenPhim === values.tenPhim &&
        formik.initialValues.trailer === values.trailer &&
        formik.initialValues.moTa === values.moTa &&
        formik.initialValues.ngayKhoiChieu === values.ngayKhoiChieu &&
        formik.initialValues.dangChieu === values.dangChieu &&
        formik.initialValues.sapChieu === values.sapChieu &&
        formik.initialValues.hot === values.hot &&
        formik.initialValues.danhGia === values.danhGia &&
        formik.initialValues.hinhAnh === values.hinhAnh
      ) {
        Swal.fire({
          icon: "error",
          title: "Cảnh báo",
          text: "Bạn chưa chỉnh sửa thông tin phim!",
        });
        dispatch(CapNhatPhimAction());
        return;
      }
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      dispatch(CapNhatPhimAction(formData));
    },
  });

  const handelChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    await formik.setFieldValue("hinhAnh", file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc(e.target.result);
    };
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const navigate = useNavigate();
  const localStor = JSON.parse(localStorage.getItem("USER_LOCAL"));

  if (localStor === null || localStor.maLoaiNguoiDung !== "QuanTri") {
    navigate("/login");
  }

  return (
    <>
      <div className="text-2xl	text-center">
        <h1>Chỉnh sửa phim</h1>
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
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input.TextArea
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày chiếu">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item>
                <DatePicker
                  format="DD/MM/YYYY"
                  onChange={handelChangeDatePicker}
                  value={moment(formik.values.ngayKhoiChieu)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số sao" className="input-ngaychieu">
                <InputNumber
                  min={0}
                  max={10}
                  type="number"
                  value={formik.values.danhGia}
                  onChange={handleChangeSwitch("danhGia")}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="Tình trạng">
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch
                  onChange={handleChangeSwitch("dangChieu")}
                  checked={formik.values.dangChieu}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch
                  onChange={handleChangeSwitch("sapChieu")}
                  checked={formik.values.sapChieu}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="HOT" valuePropName="checked">
                <Switch
                  onChange={handleChangeSwitch("hot")}
                  checked={formik.values.hot}
                />
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
              <img
                src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc}
                width="100px"
              />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item justify="center">
          <button
            type="submit"
            className="text-gray-900 bg-whindte hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium roued-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
          >
            Cập nhật
          </button>
        </Form.Item>
      </Form>
    </>
  );
};
export default EditFilm;
