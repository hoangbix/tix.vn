import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";

import "./login.scss";
import logo from "../../assets/images/logo.png";
import bg from "../../assets/images/bg2.jpg";

import { ThongTinNguoiDungReducer } from "../../redux/reducers/QuanLyNguoiDungReducer/ThongTinNguoiDungReducer";
import {
  DangKyAction,
  DangNhapAction,
} from "../../redux/actions/QuanLyNguoiDungAction";

const Login = () => {
  const [classContainers, setClassContainers] = useState("");
  const dispatch = useDispatch();

  const validateLogin = Yup.object({
    taiKhoan: Yup.string()
      .required("Vui lòng nhập tài khoản!")
      .min(3, "Tài khoản phải lớn hơn 3 ký tự"),
    matKhau: Yup.string()
      .required("Vui lòng nhập mật khẩu!")
      .min(3, "Mật khẩu phải lớn hơn 3 ký tự"),
  });

  const validate = Yup.object({
    taiKhoan: Yup.string()
      .required("Vui lòng nhập tài khoản!")
      .min(6, "Vui lòng nhập tối thiểu 6 ký tự"),
    matKhau: Yup.string()
      .required("Mật khẩu là bắt buộc!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Tối thiểu 8 ký tự, ít nhất một chữ hoa, một chữ thường và một số"
      ),
    confirmPassword: Yup.string()
      .required("Vui lòng nhập trường này!")
      .oneOf([Yup.ref("matKhau"), null], "Mật khẩu nhập lại không trùng khớp!"),
    email: Yup.string()
      .required("Email là bắt buộc!")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không hợp lệ!"),
    soDt: Yup.string()
      .required("Số điện thoại là bắt buộc!")
      .matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        "Số điện thoại nhập vào không hợp lệ!"
      ),
    maNhom: Yup.string()
      .required("Vui lòng nhập mã nhóm (từ 00 -> 16)")
      .max(2, "Vui lòng chọn mã nhóm từ 00 đến 16"),
    hoTen: Yup.string()
      .required("Họ tên là bắt buộc!")
      .min(6, "Họ & tên phải lớn hơn 6 ký tự")
      .max(30, "Tối đa 30 ký tự"),
  });

  return (
    <Formik
      initialValues={{
        taiKhoan: "",
        matKhau: "",
        confirmPassword: "",
        email: "",
        soDt: "",
        maNhom: "",
        hoTen: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        console.log(values);
        const thongTinDangKy = {
          taiKhoan: values.taiKhoan,
          matKhau: values.matKhau,
          email: values.email,
          soDt: values.soDt,
          maNhom: values.maNhom,
          hoTen: values.hoTen,
        };
        const thongTinDangNhap = {
          taiKhoan: values.taiKhoan,
          matKhau: values.matKhau,
        };
        await dispatch(DangKyAction(thongTinDangKy));
        dispatch(DangNhapAction(thongTinDangNhap));
      }}
    >
      {(formik) => {
        return (
          <div
            style={{
              backgroundImage: `url(${bg})`,
              backgroundPosition: `center`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="login__logo">
              <NavLink to="/">
                <img src={logo} alt="logo" />
              </NavLink>
            </div>
            <div className="form__login">
              <div className={`login__container ${classContainers}`}>
                <div className="form-container sign-up-container form__dang-ky">
                  <Form>
                    <h3>Đăng ký</h3>
                    <TextField
                      name="taiKhoan"
                      placeholder="Tài khoản"
                      type="text"
                    />
                    <TextField
                      name="matKhau"
                      placeholder="Mật khẩu"
                      type="password"
                    />
                    <TextField
                      name="confirmPassword"
                      placeholder="Nhập lại mật khẩu"
                      type="password"
                    />
                    <TextField name="email" placeholder="Email" type="text" />
                    <TextField
                      name="soDt"
                      placeholder="Số điện thoại"
                      type="text"
                    />
                    <TextField
                      name="maNhom"
                      placeholder="Mã nhóm"
                      type="text"
                    />
                    <TextField
                      name="hoTen"
                      placeholder="Họ & tên"
                      type="text"
                    />
                    <button type="submit">Đăng Ký</button>
                  </Form>
                </div>
                <div className="form-container sign-in-container form__dang-nhap">
                  <Formik
                    initialValues={{
                      taiKhoan: "",
                      matKhau: "",
                    }}
                    validationSchema={validateLogin}
                    onSubmit={(values) => {
                      dispatch(DangNhapAction(values));
                    }}
                  >
                    {(formik) => {
                      return (
                        <Form>
                          <h3>Đăng nhập</h3>
                          <TextField
                            name="taiKhoan"
                            placeholder="Tài khoản"
                            type="text"
                          />
                          <TextField
                            name="matKhau"
                            placeholder="Mật khẩu"
                            type="password"
                          />
                          <a href="#">Quên mật khẩu?</a>
                          <button
                            type="submit"
                            onClick={() => {
                              setClassContainers("");
                            }}
                          >
                            Đăng nhập
                          </button>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
                <div className="overlay-container">
                  <div className="overlay">
                    <div className="overlay-panel overlay-left">
                      <h3>Chào mừng bạn quay lại!</h3>
                      <p>Nếu đã có tài khoản, vui lòng đăng nhập tại đây</p>
                      <button
                        className="ghost"
                        id="signIn"
                        onClick={() => {
                          setClassContainers("");
                        }}
                      >
                        Đăng nhập
                      </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                      <h3>Xin chào, bạn mới!</h3>
                      <p>Nếu chưa có tài khoản, vui lòng đăng ký tại đây</p>
                      <button
                        className="ghost"
                        id="signUp"
                        onClick={() => {
                          setClassContainers("right-panel-active");
                        }}
                      >
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
