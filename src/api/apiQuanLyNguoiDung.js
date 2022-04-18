import { MA_NHOM } from "../util/config";
import axiosClient from "./axiosClient";

const apiQuanLyNguoiDung = {
  apiLayDanhSachNguoiDung: (tuKhoa = "") => {
    if (tuKhoa.trim() !== "") {
      const url = `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${MA_NHOM}&tuKhoa=${tuKhoa}`;
      return axiosClient.get(url);
    } else {
      const url = `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${MA_NHOM}`;
      return axiosClient.get(url);
    }
  },
  apiDangNhap: (thongTinDangNhap) => {
    const url = `/api/QuanLyNguoiDung/DangNhap`;
    return axiosClient.post(url, thongTinDangNhap);
  },
  apiDangKy: (thongTinDangKy) => {
    const url = `/api/QuanLyNguoiDung/DangKy`;
    return axiosClient.post(url, thongTinDangKy);
  },
};

export default apiQuanLyNguoiDung;
