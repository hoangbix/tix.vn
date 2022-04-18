import { MA_NHOM } from "../util/config";
import axiosClient from "./axiosClient";

const apiQuanLyRap = {
  apiLayDanhSachRap: () => {
    const url = `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${MA_NHOM}`;
    return axiosClient.get(url);
  },
  apiLayDanhSachPhongVe: (maLichChieu) => {
    const url = `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;
    return axiosClient.get(url);
  },
  apiLayThongTinLichChieuPhim: (maPhim) => {
    const url = `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`;
    return axiosClient.get(url);
  },
  apiDatVe: (thongTinVe) => {
    const url = `/api/QuanLyDatVe/DatVe`;
    return axiosClient.post(url, thongTinVe);
  },
  apiLayHeThongRap: () => {
    const url = `/api/QuanLyRap/LayThongTinHeThongRap`;
    return axiosClient.get(url);
  },
  apiLayThongTinCumRap: (maHeThongRap) => {
    const url = `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`;
    return axiosClient.get(url);
  },
  apiTaoLichChieu: (thongTinLichChieu) => {
    const url = `/api/QuanLyDatVe/TaoLichChieu`;
    return axiosClient.post(url, thongTinLichChieu);
  },
};

export default apiQuanLyRap;
