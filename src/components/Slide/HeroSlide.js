import React, { useState, useEffect } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "antd";

import { DanhSachPhimReducer } from "../../redux/reducers/QuanLyPhimReducer/DanhSachPhimReducer";
import { ThongTinLichChieuPhimReducer } from "../../redux/reducers/QuanLyPhimReducer/ThongTinLichChieuPhimReducer";
import { LayDanhSachPhongVeReducer } from "../../redux/reducers/QuanLyRapReducer/LayDanhSachPhongVeReducer";
import apiSlide from "../../api/apiSlide.json";
import "./hero-slider.scss";
import "swiper/swiper-bundle.css";
import { ThongTinLichChieuPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { LayDanhSachPhongVeAction } from "../../redux/actions/QuanLyRapAction";
import apiQuanLyPhim from "../../api/apiQuanlyPhim";
import apiQuanLyRap from "../../api/apiQuanLyRap";
import Swal from "sweetalert2";

const HeroSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [heThongRap, setHeThongRap] = useState();
  const [ngayChieu, setNgayChieu] = useState([]);
  const [select, setSelect] = useState({
    tenPhim: "",
    chonRap: "",
    ngayXem: "",
    suatChieu: "",
  });
  SwiperCore.use([Autoplay]);
  const { Option } = Select;
  const { danhSachPhim } = useSelector((state) => state.DanhSachPhimReducer);

  const layHeThongRap = async (maPhim) => {
    try {
      const res = await apiQuanLyPhim.apiLayThongTinLichChieuPhim(maPhim);
      setHeThongRap(res.content.heThongRapChieu);
    } catch (error) {
      console.log(error);
    }
  };

  const layNgayXem = async (ngayChieu) => {
    try {
      const res = await apiQuanLyRap.apiLayDanhSachPhongVe(ngayChieu);
      setNgayChieu(res.content.thongTinPhim);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="hero-slide">
        <Swiper
          modules={[Autoplay]}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
        >
          {apiSlide.slides.map((item, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <HeroSliderItem
                  item={item}
                  className={`${isActive ? "active" : ""}`}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hero-slide__pos"></div>
      <div className="hero-slide__search">
        <div className="hero-slide__search__items">
          <div className="hero-slide__search__items__item">
            <Select
              showSearch
              onChange={(value) => {
                layHeThongRap(value);
                setSelect({
                  ...select,
                  tenPhim: value,
                });
              }}
              style={{ width: 200 }}
              optionFilterProp="children"
              placeholder="Chọn phim"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {danhSachPhim?.map((phim, i) => {
                return (
                  <Option key={i} value={phim.maPhim}>
                    {phim.tenPhim}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="hero-slide__search__items__item">
            <Select
              showSearch
              placeholder="Chọn rạp"
              onChange={(value) => {
                layNgayXem(value);
                setSelect({
                  ...select,
                  chonRap: value,
                });
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {heThongRap !== undefined &&
                heThongRap.map((item, i) => {
                  return item.cumRapChieu?.map((cumRap, index) => {
                    return cumRap.lichChieuPhim?.map((item2, key) => {
                      return (
                        <Option
                          key={item2.maLichChieu}
                          value={item2.maLichChieu}
                        >
                          {cumRap.tenCumRap}
                        </Option>
                      );
                    });
                  });
                })}
            </Select>
          </div>
          <div className="hero-slide__search__items__item">
            <Select
              showSearch
              placeholder="Ngày xem"
              onChange={(value) => {
                setSelect({
                  ...select,
                  ngayXem: value,
                });
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value={ngayChieu.ngayChieu}>{ngayChieu.ngayChieu}</Option>
            </Select>
          </div>
          <div className="hero-slide__search__items__item">
            <Select
              showSearch
              placeholder="Suất chiếu"
              onChange={(value) => {
                setSelect({
                  ...select,
                  suatChieu: value,
                });
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              <Option value={ngayChieu.gioChieu}>{ngayChieu.gioChieu}</Option>
            </Select>
          </div>
          <div className="hero-slide__search__items__item">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span
                onClick={() => {
                  const localStor = JSON.parse(
                    localStorage.getItem("USER_LOCAL")
                  );

                  if (
                    select.tenPhim !== "" &&
                    select.chonRap !== "" &&
                    select.ngayXem !== "" &&
                    select.suatChieu !== ""
                  ) {
                    if (localStor === null) {
                      Swal.fire({
                        icon: "error",
                        title: "Bạn chưa đăng nhập!",
                        text: "Vui lòng đăng nhập và thử lại.",
                      });
                    } else {
                      navigate(`/checkout/${ngayChieu.maLichChieu}`);
                    }
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Bạn chưa chọn",
                      text: "Vui lòng thử lại",
                    });
                  }
                }}
                className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
              >
                Đặt vé
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const HeroSliderItem = (props) => {
  const [isOpen, setOpen] = useState(false);

  const item = props.item;
  const background = item.backdrop_path ? item.backdrop_path : item.poster_path;

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background}` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            {/* <button className="btn-primary">VIEW DEMO</button> */}
          </div>
        </div>
        <div
          className="hero-slide__item__content__poster"
          onClick={() => setOpen(true)}
        >
          <img src={item.poster_path} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
