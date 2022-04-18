import apiQuanLyPhim from "../../api/apiQuanlyPhim";
import Swal from "sweetalert2";
import { history } from "../../App";
export const DanhSachPhimAction = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const response = await apiQuanLyPhim.apiLayDanhSachPhim(tenPhim);
      response.statusCode === 200 &&
        dispatch({
          type: "DANH_SACH_PHIM",
          danhSachPhim: response.content,
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const ThemPhimAction = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DISPLAY_LOAD",
      });
      const res = await apiQuanLyPhim.apiThemPhim(formData);

      res.statusCode === 200 &&
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thêm phim mới thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
      dispatch({
        type: "HIDE_LOAD",
      });
      history.back();
      dispatch(DanhSachPhimAction());
    } catch (error) {
      dispatch({
        type: "HIDE_LOAD",
      });
      Swal.fire({
        icon: "error",
        title: "Lỗi rồi",
        text: `${error.response.data.content}`,
      });
    }
  };
};

export const LayThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DISPLAY_LOAD",
      });
      const res = await apiQuanLyPhim.apiLayThongTinPhim(maPhim);

      res.statusCode === 200 &&
        dispatch({
          type: "THONG_TIN_PHIM",
          thongTinPhim: res.content,
        });
      dispatch({
        type: "HIDE_LOAD",
      });
    } catch (error) {
      dispatch({
        type: "HIDE_LOAD",
      });
      console.log(error.response);
    }
  };
};

export const CapNhatPhimAction = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DISPLAY_LOAD",
      });
      const res = await apiQuanLyPhim.apiCapNhatPhim(formData);

      res.statusCode === 200 &&
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cập nhật phim thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
      dispatch({
        type: "HIDE_LOAD",
      });
      history.back();
      dispatch(DanhSachPhimAction());
    } catch (error) {
      dispatch({
        type: "HIDE_LOAD",
      });
      Swal.fire({
        icon: "error",
        title: "Lỗi rồi",
        text: `${error.response.data.content}`,
      });
      console.log(error.response);
    }
  };
};

export const XoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DISPLAY_LOAD",
      });
      await apiQuanLyPhim.apiXoaPhim(maPhim);
      dispatch(DanhSachPhimAction());
      dispatch({
        type: "HIDE_LOAD",
      });
    } catch (error) {
      dispatch({
        type: "HIDE_LOAD",
      });
      console.log(error.response);
    }
  };
};
