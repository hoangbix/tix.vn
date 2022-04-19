import { combineReducers } from "redux";
import { DanhSachPhimReducer } from "./QuanLyPhimReducer/DanhSachPhimReducer";
import { DanhSachRapReducer } from "./QuanLyRapReducer/DanhSachRapReducer";
import { ThongTinLichChieuPhimReducer } from "./QuanLyPhimReducer/ThongTinLichChieuPhimReducer";
import { LayDanhSachPhongVeReducer } from "./QuanLyRapReducer/LayDanhSachPhongVeReducer";
import { LayChiTietPhimVaRapReducer } from "./QuanLyRapReducer/LayChiTietPhimVaRapReducer";
import { ThongTinNguoiDungReducer } from "./QuanLyNguoiDungReducer/ThongTinNguoiDungReducer";
import { DanhSachGheDangDatReducer } from "./QuanLyRapReducer/DanhSachGheDangDat";
import { ThongTinPhimReducer } from "./QuanLyPhimReducer/ThongTinPhimReducer";
import { LoadingReducer } from "./LoadingReducer";
import { DanhSachNguoiDungReducer } from "./QuanLyNguoiDungReducer/DanhSachNguoiDungReducer";
import { ChuyenHuongReducer } from "./QuanLyNguoiDungReducer/ChuyenHuongReducer";

const rootReducer = combineReducers({
  DanhSachPhimReducer,
  DanhSachRapReducer,
  ThongTinLichChieuPhimReducer,
  LayDanhSachPhongVeReducer,
  LayChiTietPhimVaRapReducer,
  ThongTinNguoiDungReducer,
  DanhSachGheDangDatReducer,
  ThongTinPhimReducer,
  LoadingReducer,
  DanhSachNguoiDungReducer,
  ChuyenHuongReducer,
});

export default rootReducer;
