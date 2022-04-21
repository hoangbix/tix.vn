import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import {
  CloseCircleOutlined,
  UserAddOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import "./checkout.scss";
import {
  LayDanhSachPhongVeAction,
  DatVeAction,
  datGheAction,
} from "../../redux/actions/QuanLyRapAction";
import { LayDanhSachPhongVeReducer } from "../../redux/reducers/QuanLyRapReducer/LayDanhSachPhongVeReducer";
import { DanhSachGheDangDatReducer } from "../../redux/reducers/QuanLyRapReducer/DanhSachGheDangDat";
import Swal from "sweetalert2";
import { connection } from "../../index";

export const Checkout = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { danhSachGhe, thongTinPhim } = useSelector(
    (state) => state.LayDanhSachPhongVeReducer
  );
  const { danhSachGheDangDat, danhSachGheKhachDat } = useSelector(
    (state) => state.DanhSachGheDangDatReducer
  );
  const localStor = JSON.parse(localStorage.getItem("USER_LOCAL"));
  useEffect(() => {
    dispatch(LayDanhSachPhongVeAction(id));

    connection.on("datVeThanhCong", () => {
      dispatch(LayDanhSachPhongVeAction(id));
    });
    // LOAD DANH SÁCH GHẾ NGƯỜI KHÁC ĐANG ĐẶT KHI VÀO TRANG
    connection.invoke("loadDanhSachGhe", id);

    // Load danh sách ghế đang đặt từ server
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      // B1.Loại mình ra khỏi danh sách ghế
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== localStor?.taiKhoan
      );
      //B2. gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);
        return [...result, ...arrGhe];
      }, []);

      // Xóa ghế trùng nhau
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

      //B3 đưa dữ liệu ghế lên redux

      dispatch({
        type: "DAT_GHE",
        arrGheKhachDat,
      });

      // BẮT SỰ KIỆN KHI NGƯỜI CHỌN VÉ RELOAD LẠI TRANG
      window.addEventListener("beforeunload", clearGhe);
      return () => {
        clearGhe();
        window.removeEventListener("beforeunload", clearGhe);
      };
    });
  }, []);

  const clearGhe = function (event) {
    connection.invoke("huyDat", localStor?.taiKhoan, id);
  };

  const renderGhe = () => {
    return danhSachGhe?.map((ghe, i) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classDangDat = "";
      let classGheMinhDat = "";
      let classGheKhachDat = "";
      if (ghe.taiKhoanNguoiDat === localStor?.taiKhoan) {
        classGheMinhDat = "gheDangDat";
      }

      const index = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      const indexGheKD = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );

      if (indexGheKD !== -1) {
        classGheKhachDat = "gheDangCoNguoiDat";
      }

      if (index !== -1) {
        classDangDat = "gheDangDat";
      }
      return (
        <button
          key={i}
          className={`ghe ${classGheVip} ${classDaDat} ${classDangDat} ${classGheMinhDat} ${classGheKhachDat}`}
          onClick={() => {
            const action = datGheAction(ghe, id);
            dispatch(action);
          }}
          disabled={ghe.daDat || classGheKhachDat !== ""}
        >
          {classGheMinhDat !== "" ? (
            <UserAddOutlined />
          ) : ghe.daDat === true ? (
            <CloseCircleOutlined />
          ) : classGheKhachDat !== "" ? (
            <LoadingOutlined />
          ) : ghe.daDat === true ? (
            <CloseCircleOutlined />
          ) : (
            ghe.tenGhe
          )}
        </button>
      );
    });
  };

  if (localStor === null) {
    navigate("/login");
  }

  return (
    <div className="checkout">
      <div className="checkout__content grid grid-cols-1 md:grid-cols-8">
        <div className="checkout__right col-span-1 md:col-span-6">
          <div className="checkout__left__content ">
            <div
              className="man-hinh text-center text-white"
              style={{ fontSize: 12 }}
            >
              MÀN HÌNH
            </div>
            <div className="checkout__left__content--dsGhe ">{renderGhe()}</div>
          </div>
          <div className="ghe-demo">
            <div className="flex items-center">
              <button className="ghe"></button>
              Ghế trống
            </div>
            <div className="flex items-center">
              <button className="ghe gheVip "></button>Ghế VIP
            </div>
            <div className="">
              <button className="ghe gheDangDat">
                <UserAddOutlined />
              </button>
              Ghế bạn đã đặt
            </div>
            <div className="">
              <button className="ghe gheDangCoNguoiDat">
                <LoadingOutlined />
              </button>
              Ghế có người đang chọn
            </div>
            <div>
              <button className="ghe gheDaDat">
                <CloseCircleOutlined />
              </button>
              Ghế đã có người đặt
            </div>
          </div>
        </div>

        <div className="checkout__left col-span-1 md:col-span-2">
          <ul className=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex justify-center checkout__right-vnd">
              {danhSachGheDangDat
                ?.reduce((tongTien, ghe, index) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}
              đ
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              <span className="checkout__right-btn p-1">C18</span>
              <span className="checkout__right-title">
                {thongTinPhim?.tenPhim}
              </span>
              <div className="checkout__right-content">
                <p>{thongTinPhim?.tenCumRap}</p>
                <p>
                  {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu} -{" "}
                  {thongTinPhim?.tenRap}
                </p>
              </div>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex justify-between">
              <span className="checkout__right-ghe-dang-dat">
                Ghế:{" "}
                {danhSachGheDangDat?.map((ghe, i) => (
                  <span key={i} className="checkout__right-ghe-dang-chon">
                    {ghe.tenGhe}
                  </span>
                ))}
              </span>
              <span className="checkout__right-ghe-2">
                {danhSachGheDangDat
                  ?.reduce((tongTien, ghe, index) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}
                đ
              </span>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 rounded-b-lg checkout__right-email">
              <div>E-Mail: </div>
              <div>{localStor?.email}</div>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 rounded-b-lg checkout__right-email">
              <div>Phone: </div>
              <div>{localStor?.soDT}</div>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 rounded-b-lg checkout__right-voucher">
              <div className="grid grid-cols-3">
                <div className="col-span-2">
                  <div style={{ fontSize: 12 }}>Mã giảm giá</div>
                  <input type="text" placeholder="Nhập tại đây..." />
                </div>
                <div className="col-span-1 voucher-btn">
                  <button type="button">Áp dụng</button>
                </div>
              </div>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 rounded-b-lg checkout__right-thanh-toan">
              <div>Hình thức thanh toán</div>
              <div>
                Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp.
              </div>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 checkout__right__bottom-hoan-ve">
              <p>
                <img
                  src={require("../../assets/images/480px-OOjs_UI_icon_alert_destructive.svg.png")}
                  width="20px"
                  alt=""
                />
                Vé đã mua không thể đổi hoặc hoàn tiền
                <br />
                Mã vé sẽ được gữi qua mã <span className="sms-email">
                  SMS
                </span>{" "}
                và <span className="sms-email">Email</span> đã đăng ký
              </p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  const thongTinDatVe = {
                    maLichChieu: id,
                    danhSachVe: danhSachGheDangDat,
                  };

                  if (danhSachGheDangDat.length <= 0) {
                    Swal.fire({
                      icon: "error",
                      title: "Bạn chưa chọn vé!",
                      text: "Hãy kiểm tra và đặt lại",
                    });
                  } else {
                    Swal.fire({
                      title: "Bạn đang đặt vé",
                      text: "Vé sẽ không được hoàn trả sau khi đặt!",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#28a745",
                      confirmButtonText: "Đặt ngay!",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Hủy đặt",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        dispatch(DatVeAction(thongTinDatVe));
                        await dispatch(LayDanhSachPhongVeAction(id));
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Đặt vé thành công!",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }
                    });
                  }
                }}
                type="button"
                className="checkout-btn py-2.5 px-5  w-full text-sm font-medium  text-gray-900 focus:outline-none bg-[#d1e7dd] rounded-lg border border-blue-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                ĐẶT VÉ
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function (props) {
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  function callback(key) {
    dispatch({
      type: "CHANGE_TAB",
      key: key,
    });
  }
  return (
    <div className="ant__tabs">
      <div className="checkout__logo">
        <Link to="/">
          <img src={require("../../assets/images/logo.png")} />
        </Link>
      </div>
      <Tabs
        defaultActiveKey="1"
        // activeKey={tabActive}
        onChange={callback}
      >
        <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          {/* <LichSuDatVe /> */}
        </TabPane>
      </Tabs>
    </div>
  );
}
