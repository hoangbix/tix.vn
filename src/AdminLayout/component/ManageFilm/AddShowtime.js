import React, { useEffect, useState } from "react";
import { Form, Button, Select, DatePicker, InputNumber, Row } from "antd";
import { useFormik } from "formik";
import { useParams } from "react-router";
import moment from "moment";
import { useDispatch } from "react-redux";

import apiQuanLyRap from "../../../api/apiQuanLyRap";
import Swal from "sweetalert2";
import { DanhSachPhimAction } from "../../../redux/actions/QuanLyPhimAction";
import { history } from "../../../App";
const AddShowtime = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  let localStorFilm = {};

  if (localStorage.getItem("film")) {
    localStorFilm = JSON.parse(localStorage.getItem("film"));
  }

  useEffect(() => {
    const LayThongTinHeThongRap = async () => {
      try {
        let res = await apiQuanLyRap.apiLayHeThongRap();
        setState({
          ...state,
          heThongRapChieu: res.content,
        });
      } catch (error) {
        console.log(error);
      }
    };
    LayThongTinHeThongRap();
  }, []);
  function disabledDate(current) {
    return current && current < moment().endOf("day");
  }

  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await apiQuanLyRap.apiTaoLichChieu(values);
        res.statusCode === 200 &&
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thêm lịch chiếu thành công!",
            showConfirmButton: false,
            timer: 1500,
          });
        history.back();
        dispatch(DanhSachPhimAction());
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Đã xẩy ra lỗi!",
          text: `${error.response.statusText}`,
        });
        console.log(error.response);
      }
    },
  });
  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  const renderHeThongRap = () => {
    return state.heThongRapChieu?.map((item, index) => {
      return (
        <Select.Option key={index} value={item.maHeThongRap}>
          {item.tenHeThongRap}
        </Select.Option>
      );
    });
  };
  const renderCumRap = () => {
    return state.cumRapChieu?.map((item, index) => {
      return (
        <Select.Option key={index} value={item.maCumRap}>
          {item.tenCumRap}
        </Select.Option>
      );
    });
  };

  const handleChangeHeThongRap = async (value) => {
    try {
      const res = await apiQuanLyRap.apiLayThongTinCumRap(value);
      setState({
        ...state,
        cumRapChieu: res.content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };
  return (
    <div className="showtime__admin">
      <div className="showtime__admin__content">
        <h3>Thêm lịch chiếu</h3>
        <h5>{localStorFilm.tenPhim}</h5>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: "100%" }}
        >
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 6,
            }}
            onSubmitCapture={formik.handleSubmit}
          >
            <Form.Item>
              <Select
                style={{ width: 300 }}
                onChange={handleChangeHeThongRap}
                placeholder="Chọn hệ thống rạp"
              >
                {renderHeThongRap()}
              </Select>
            </Form.Item>
            <Form.Item>
              <Select
                style={{ width: 300 }}
                onChange={handleChangeCumRap}
                placeholder="Chọn Rạp"
              >
                {renderCumRap()}
              </Select>
            </Form.Item>
            <Form.Item>
              <DatePicker
                format="DD/MM/YYYY hh:mm:ss"
                disabledDate={disabledDate}
                showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                onChange={onChangeDate}
                placeholder="Chọn ngày chiếu"
                style={{ width: 300 }}
              />
            </Form.Item>
            <Form.Item>
              <InputNumber
                type="number"
                style={{ width: 300 }}
                onChange={onChangeNumber}
                placeholder="Giá vé"
              />
            </Form.Item>

            <Form.Item justify="center">
              <Button htmlType="submit">Tạo lịch chiếu</Button>
            </Form.Item>
          </Form>
        </Row>
      </div>
    </div>
  );
};

export default AddShowtime;
