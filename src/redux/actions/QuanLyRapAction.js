import { connection } from "../../index";
import apiQuanLyRap from "../../api/apiQuanLyRap";
import Swal from "sweetalert2";

export const ChiTietPhimVaRapAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DISPLAY_LOAD",
      });
      const res = await apiQuanLyRap.apiLayThongTinLichChieuPhim(maLichChieu);

      res.statusCode === 200 &&
        dispatch({
          type: "CHI_TIET_PHIM_VA_RAP",
          chiTietPhimVaRap: res.content,
        });
      dispatch({
        type: "HIDE_LOAD",
      });
    } catch (error) {
      dispatch({
        type: "HIDE_LOAD",
      });
      console.log(error);
    }
  };
};

export const DanhSachRapAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DISPLAY_LOAD",
      });
      const res = await apiQuanLyRap.apiLayDanhSachRap();
      res.statusCode === 200 &&
        dispatch({
          type: "DANH_SACH_RAP",
          danhSachRap: res.content,
        });
      dispatch({
        type: "HIDE_LOAD",
      });
    } catch (error) {
      dispatch({
        type: "HIDE_LOAD",
      });
      console.log(error);
    }
  };
};

export const LayDanhSachPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const res = await apiQuanLyRap.apiLayDanhSachPhongVe(maLichChieu);
      res.statusCode === 200 &&
        dispatch({
          type: "DANH_SACH_GHE",
          thongTinPhongVe: res.content,
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const DatVeAction = (thongTinVe) => {
  const localStor = JSON.parse(localStorage.getItem("USER_LOCAL"));

  return async (dispatch) => {
    try {
      const res = await apiQuanLyRap.apiDatVe(thongTinVe);
      res.statusCode === 200 &&
        dispatch({
          type: "DAT_VE",
          datVe: res.content,
        });

      connection.invoke(
        "datGheThanhCong",
        localStor?.taiKhoan,
        thongTinVe.maLichChieu
      );
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: "GHE_DANG_DAT",
      gheDangDat: ghe,
    });

    let danhSachGheDangDat =
      getState().DanhSachGheDangDatReducer.danhSachGheDangDat;
    let taiKhoan =
      getState().ThongTinNguoiDungReducer.thongTinNguoiDung.taiKhoan;

    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

    connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
  };
};
