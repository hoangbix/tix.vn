import apiQuanLyNguoiDung from "../../api/apiQuanLyNguoiDung";
import Swal from "sweetalert2";
import { history } from "../../App";

export const LayDanhSachNguoiDungAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      const response = await apiQuanLyNguoiDung.apiLayDanhSachNguoiDung(tuKhoa);
      response.statusCode === 200 &&
        dispatch({
          type: "DANH_SACH_NGUOI_DUNG",
          danhSachNguoiDung: response.content,
        });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const DangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DISPLAY_LOAD",
      });
      const res = await apiQuanLyNguoiDung.apiDangNhap(thongTinDangNhap);
      res.statusCode === 200 &&
        dispatch({
          type: "THONG_TIN_NGUOI_DUNG",
          thongTinNguoiDung: res.content,
        });
      dispatch({
        type: "HIDE_LOAD",
      });
      let timerInterval;
      Swal.fire({
        title: "Đăng nhập thành công",
        html: "Bạn sẽ được chuyển hướng sau <b></b> ",
        timer: 2000,
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
        if (result.dismiss === Swal.DismissReason.timer) {
          history.back();
        }
      });
    } catch (error) {
      dispatch({
        type: "HIDE_LOAD",
      });
      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại!",
        text: `${error.response.data.content}`,
      });
      console.log(error.response.data);
    }
  };
};

export const DangKyAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      const res = await apiQuanLyNguoiDung.apiDangKy(thongTinDangKy);

      res.statusCode === 200 &&
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Đăng ký thành công! Vui lòng đăng nhập lại",
          showConfirmButton: false,
          timer: 1500,
        });
      res.statusCode === 200 &&
        setTimeout(
          dispatch({
            type: "CHUYEN_HUONG_NULL",
          }),
          3000
        );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Đăng ký thất bại!",
        text: `${error.response.data.content}`,
      });
      console.log(error.response);
    }
  };
};
