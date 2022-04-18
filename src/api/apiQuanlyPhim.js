import { MA_NHOM } from "../util/config";
import axiosClient from "./axiosClient";

const apiQuanLyPhim = {
  apiLayDanhSachPhim: (tenPhim = "") => {
    if (tenPhim.trim() !== "") {
      const url = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${MA_NHOM}&tenPhim=${tenPhim}`;
      return axiosClient.get(url);
    } else {
      const url = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${MA_NHOM}`;
      return axiosClient.get(url);
    }
  },
  apiLayThongTinLichChieuPhim: (maPhim) => {
    const url = `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`;
    return axiosClient.get(url);
  },
  apiThemPhim: (formData) => {
    const url = `/api/QuanLyPhim/ThemPhimUploadHinh`;
    return axiosClient.post(url, formData);
  },
  apiLayThongTinPhim: (maPhim) => {
    const url = `/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`;
    return axiosClient.get(url);
  },
  apiCapNhatPhim: (formData) => {
    const url = `/api/QuanLyPhim/CapNhatPhimUpload`;
    return axiosClient.post(url, formData);
  },
  apiXoaPhim: (maPhim) => {
    const url = `/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;
    return axiosClient.delete(url);
  },
};

export default apiQuanLyPhim;
