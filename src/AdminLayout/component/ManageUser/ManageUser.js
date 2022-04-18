import { useEffect, useState } from "react";
import { Table, Input, Button, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import {
  DeleteOutlined,
  EditOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import * as Yup from "yup";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import { XoaPhimAction } from "../../../redux/actions/QuanLyPhimAction";
import { DanhSachNguoiDungReducer } from "../../../redux/reducers/QuanLyNguoiDungReducer/DanhSachNguoiDungReducer";
import apiQuanLyPhim from "../../../api/apiQuanlyPhim";
import { LayDanhSachNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungAction";
import "./manage-user.scss";
import TextField from "../../../pages/login/TextField";
const ManageUser = () => {
  const { id } = useParams();
  const { Search } = Input;
  const dispatch = useDispatch();
  const { danhSachNguoiDung } = useSelector(
    (state) => state.DanhSachNguoiDungReducer
  );
  useEffect(() => {
    dispatch(LayDanhSachNguoiDungAction());
  }, []);
  const [typePass, setTypePass] = useState(false);
  const [visible, setVisible] = useState(false);
  const [maNhom, setMaNhom] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const { Option, OptGroup } = Select;
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleChangeMaNhom = (value) => {
    console.log(`selected ${value}`);
  };
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.hoTen.localeCompare(b.hoTen),
    },
    {
      title: "Tải khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.taiKhoan.localeCompare(b.taiKhoan),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      key: "soDt",
      dataIndex: "soDt",
    },

    {
      title: "Loại người dùng",
      key: "maLoaiNguoiDung",
      render: (text, film) => (
        <>{film.maLoaiNguoiDung === "QuanTri" ? "Quản trị" : "Khách hàng"}</>
      ),
    },

    {
      title: "Hành động",
      key: "1",
      render: (text, film) => (
        <>
          <span
            onClick={() => {
              Swal.fire({
                title: "Bạn chắc chắn xóa phim này?",
                text: "Thao tác này sẽ xóa toàn bộ dữ liệu về bộ phim",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#28a745",
                cancelButtonColor: "#dc3545",
                confirmButtonText: "Xóa phim!",
              }).then((result) => {
                const xoaPhim = async () => {
                  try {
                    if (result.isConfirmed) {
                      const res = await apiQuanLyPhim.apiXoaPhim(film.maPhim);
                      if (res.statusCode === 200) {
                        Swal.fire(
                          "Thành công!",
                          "Phim này đã được xóa.",
                          "success"
                        );
                        dispatch(XoaPhimAction(film.maPhim));
                      }
                    }
                  } catch (error) {
                    Swal.fire({
                      icon: "error",
                      title: "Thất bại",
                      text: `${error.response.statusText}`,
                    });
                    console.log(error.response);
                  }
                };
                xoaPhim();
              });
            }}
            className="px-3"
            style={{ fontSize: 16 }}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </span>
          <span
            style={{ fontSize: 16 }}
            onClick={() => {
              showModal();
              localStorage.setItem("edit_user", JSON.stringify(film));
            }}
          >
            <EditOutlined style={{ color: "#2ecc71", cursor: "pointer" }} />
          </span>
          <Link
            to={`/admin/showtime/${film.maPhim}`}
            style={{ fontSize: 16 }}
            className="px-3"
            onClick={() => {
              localStorage.setItem("film", JSON.stringify(film));
            }}
          >
            <ScheduleOutlined style={{ color: "#f1c40f", cursor: "pointer" }} />
          </Link>
        </>
      ),
    },
  ];

  const data = danhSachNguoiDung;
  function onChange(pagination, filters, sorter, extra) {}
  const onSearchUser = (e) => {
    dispatch(LayDanhSachNguoiDungAction(e.target.value));
  };

  const validateLogin = Yup.object({
    taiKhoan: Yup.string()
      .required("Vui lòng nhập tài khoản!")
      .min(6, "Tài khoản phải lớn hơn 6 ký tự"),
    matKhau: Yup.string()
      .required("Vui lòng nhập mật khẩu!")
      .min(6, "Mật khẩu phải lớn hơn 6 ký tự"),
    email: Yup.string()
      .required("Email là bắt buộc!")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không hợp lệ!"),
    soDt: Yup.string()
      .required("Số điện thoại là bắt buộc!")
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ!"),
    hoTen: Yup.string()
      .required("Họ tên là bắt buộc!")
      .min(6, "Họ & tên phải lớn hơn 6 ký tự")
      .max(30, "Tối đa 30 ký tự"),
  });
  const UserEdit = JSON.parse(localStorage.getItem("edit_user"));

  return (
    <div className="manage__user">
      <Modal
        title={<h4 className="text-center">Chỉnh sửa người dùng</h4>}
        visible={visible}
        confirmLoading={confirmLoading}
        width={800}
        onCancel={handleCancel}
      >
        <Formik
          initialValues={{
            taiKhoan: UserEdit.taiKhoan,
            matKhau: UserEdit.matKhau,
            email: UserEdit.email,
            maNhom: UserEdit.maNhom,
            soDt: UserEdit.soDt,
            hoTen: UserEdit.hoTen,
          }}
          enableReinitialize={true}
          validationSchema={validateLogin}
          onSubmit={(values) => {
            console.log(values);
            // dispatch(DangNhapAction(values));
          }}
        >
          {(formik) => {
            return (
              <Form>
                <div className="container flex justify-center edit__user__form">
                  <div className="col-5 px-4 pb-1">
                    <label htmlFor="taiKhoan">Tài khoản</label>
                    <TextField
                      name="taiKhoan"
                      id="taiKhoan"
                      placeholder="Nhập tài khoản"
                      type="text"
                    />
                    <br />
                  </div>
                  <div className="col-5 px-4 pb-1">
                    <label htmlFor="matKhau">Mật khẩu</label>
                    <TextField
                      name="matKhau"
                      id="matKhau"
                      placeholder="Nhập mật khẩu"
                      type={typePass === true ? "text" : "password"}
                      suffix={
                        typePass ? (
                          <EyeOutlined
                            className="site-form-item-icon"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              const isTypePass =
                                typePass === true ? false : true;
                              setTypePass(isTypePass);
                            }}
                          />
                        ) : (
                          <EyeInvisibleOutlined
                            className="site-form-item-icon"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              const isTypePass =
                                typePass === true ? false : true;
                              setTypePass(isTypePass);
                            }}
                          />
                        )
                      }
                    />
                  </div>
                </div>
                <div className="container flex justify-center edit__user__form">
                  <div className="col-5 px-4 pb-1">
                    <label htmlFor="email">Email</label>
                    <TextField
                      name="email"
                      id="email"
                      placeholder="Nhập email"
                      type="text"
                    />
                  </div>
                  <div className="col-5 px-4 pb-1">
                    <label htmlFor="soDt">Số điện thoại</label>
                    <TextField
                      id="soDt"
                      name="soDt"
                      placeholder="Nhập số điện thoại"
                      type="text"
                    />
                  </div>
                </div>
                <div className="container flex justify-center edit__user__form">
                  <div className="col-5 px-4 pb-1">
                    <label htmlFor="maNhom">Mã nhóm</label>
                    <Select
                      defaultValue={`${UserEdit.maNhom}`}
                      style={{ width: 273 }}
                      onChange={handleChangeMaNhom}
                    >
                      <Option value="GP00">GP00</Option>
                      <Option value="GP01">GP01</Option>
                      <Option value="GP02">GP02</Option>
                      <Option value="GP03">GP03</Option>
                      <Option value="GP04">GP04</Option>
                      <Option value="GP05">GP05</Option>
                      <Option value="GP06">GP06</Option>
                      <Option value="GP07">GP07</Option>
                      <Option value="GP08">GP08</Option>
                      <Option value="GP09">GP09</Option>
                      <Option value="GP10">GP10</Option>
                      <Option value="GP11">GP11</Option>
                      <Option value="GP12">GP12</Option>
                      <Option value="GP13">GP13</Option>
                      <Option value="GP14">GP14</Option>
                      <Option value="GP15">GP15</Option>
                      <Option value="GP16">GP16</Option>
                    </Select>
                  </div>
                  <div className="col-5 px-4 pb-1">
                    <label htmlFor="maNhom">Loại người dùng</label>
                    <Select
                      defaultValue="khachHang"
                      style={{ width: 273 }}
                      onChange={handleChange}
                    >
                      <Option value="khachHang">Khách hàng</Option>
                      <Option value="quanTri">Quản trị</Option>
                    </Select>
                  </div>
                </div>
                <div className="container flex justify-center edit__user__form">
                  <div className="col-5 px-4 pb-1">
                    <label htmlFor="hoTen">Họ và tên</label>
                    <TextField
                      id="hoTen"
                      name="hoTen"
                      placeholder="Nhập họ tên"
                      type="text"
                    />
                  </div>
                  <div className="col-5 px-4 pb-1"></div>
                </div>
                <div className="flex justify-end manager__form__footer">
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                  <Button type="dashed" onClick={handleCancel}>
                    Hủy
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>

      <div className="search-btn">
        <Button type="dashed">
          <Link to="/admin/addfilm">Thêm người dùng</Link>
        </Button>
        <Search
          placeholder="Tìm kiếm..."
          onChange={(e) => onSearchUser(e)}
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        size="small"
        rowKey={"taiKhoan"}
      />
    </div>
  );
};

export default ManageUser;
