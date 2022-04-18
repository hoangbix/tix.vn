import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  HomeOutlined,
  UnorderedListOutlined,
  VideoCameraAddOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { ThongTinNguoiDungReducer } from "../../../redux/reducers/QuanLyNguoiDungReducer/ThongTinNguoiDungReducer";

import "./navbar.scss";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { history } from "../../../App";

const Navbar = () => {
  useEffect(() => {
    const list = document.querySelectorAll(".list");
    function activeLink() {
      list.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    }
    list.forEach((item) => item.addEventListener("click", activeLink));
  }, []);
  const { thongTinNguoiDung } = useSelector(
    (state) => state.ThongTinNguoiDungReducer
  );
  if (
    !localStorage.getItem("USER_LOCAL") ||
    thongTinNguoiDung.maLoaiNguoiDung !== "QuanTri"
  ) {
    let timerInterval;
    return Swal.fire({
      icon: "error",
      title: "Bạn không có quyền truy cập vào trang này!",
      html: "Đang tự động chuyển hướng sau <b></b> ms.",
      timer: 4000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        history.back();
      }
    });
  }

  return (
    <>
      <div className="navbar__header">
        <div className="navigation">
          <Link to="/" className="logo">
            <img src={require("../../../assets/images/logo.png")} />
          </Link>
          <ul>
            <li className="list active">
              <Link to="admin">
                <span className="icon">
                  <HomeOutlined />
                </span>
                <span className="title">Trang chủ</span>
              </Link>
            </li>
            <li className="list ">
              <Link to="admin/listfilm">
                <span className="icon">
                  <UnorderedListOutlined />
                </span>
                <span className="title">Danh sách phim</span>
              </Link>
            </li>
            <li className="list">
              <Link to="admin/addfilm">
                <span className="icon">
                  <VideoCameraAddOutlined />
                </span>
                <span className="title">Thêm phim</span>
              </Link>
            </li>
            <li className="list">
              <Link to="admin/manageuser">
                <span className="icon">
                  <UsergroupAddOutlined />
                </span>
                <span className="title">Người dùng</span>
              </Link>
            </li>
            <li className="list">
              <a href="#">
                <span className="icon">
                  <MessageOutlined />
                </span>
                <span className="title">Thông báo</span>
              </a>
            </li>
            <li className="list">
              <a href="#">
                <span className="icon">
                  <LoginOutlined />
                </span>
                <span className="title">Đăng xuất</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar__header__content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navbar;
