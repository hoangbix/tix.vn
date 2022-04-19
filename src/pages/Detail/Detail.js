import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Tabs, Rate } from "antd";

import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import Navbar from "../../components/Navbar/Navbar";
import { ChiTietPhimVaRapAction } from "../../redux/actions/QuanLyRapAction";
import { LayChiTietPhimVaRapReducer } from "../../redux/reducers/QuanLyRapReducer/LayChiTietPhimVaRapReducer";
import { NavLink } from "react-router-dom";
import "./detail.scss";
import "./circle.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { chiTietPhimVaRap } = useSelector(
    (state) => state.LayChiTietPhimVaRapReducer
  );
  const { TabPane } = Tabs;
  const { tabPosition } = {
    tabPosition: "left",
  };

  useEffect(() => {
    dispatch(ChiTietPhimVaRapAction(id));
  }, []);

  const renderRevies = () => {
    if (chiTietPhimVaRap?.danhGia > 0 && chiTietPhimVaRap?.danhGia <= 2.5) {
      return "c100 p25 green";
    } else if (
      chiTietPhimVaRap?.danhGia > 2.5 &&
      chiTietPhimVaRap?.danhGia <= 5
    ) {
      return "c100 p50 green";
    } else if (
      chiTietPhimVaRap?.danhGia > 5 &&
      chiTietPhimVaRap?.danhGia <= 7.5
    ) {
      return "c100 p75 green";
    } else if (
      chiTietPhimVaRap?.danhGia > 7.5 &&
      chiTietPhimVaRap?.danhGia <= 10
    ) {
      return "c100 p100 green";
    } else {
      return "c100 p0 green";
    }
  };
  const renderReviesText = () => {
    if (chiTietPhimVaRap?.danhGia > 0 && chiTietPhimVaRap?.danhGia <= 2.5) {
      return "25%";
    } else if (
      chiTietPhimVaRap?.danhGia > 2.5 &&
      chiTietPhimVaRap?.danhGia <= 5
    ) {
      return "50%";
    } else if (
      chiTietPhimVaRap?.danhGia > 5 &&
      chiTietPhimVaRap?.danhGia <= 7.5
    ) {
      return "75%";
    } else if (
      chiTietPhimVaRap?.danhGia > 7.5 &&
      chiTietPhimVaRap?.danhGia <= 10
    ) {
      return "100%";
    }
  };
  return (
    <>
      <Navbar />
      <div
        className="detail"
        style={{ backgroundImage: `url('${chiTietPhimVaRap?.hinhAnh}')` }}
      >
        <div className="detail__content">
          <CustomCard
            style={{ minHeight: "100vh" }}
            effectColor="#000"
            blur={5}
          >
            <div className="detail__content__header">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <div className="detail__content__header__left d-flex align-items-center col-span-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 ">
                    <div className="detail__content--card">
                      <div className="detail__content__header__left__poster">
                        <img src={chiTietPhimVaRap?.hinhAnh} alt="" />
                      </div>
                    </div>
                    <div className="detail__content__header__left__content">
                      <div className="detail__content__header__left__content-title">
                        <h2>{chiTietPhimVaRap?.tenPhim}</h2>
                      </div>
                      <p className="imdb">
                        Tình trạng:{" "}
                        {chiTietPhimVaRap?.dangChieu == true
                          ? "Đang chiếu"
                          : "Sắp chiếu"}
                      </p>
                      <p className="imdb2">{chiTietPhimVaRap?.moTa}</p>
                    </div>
                  </div>
                  <div className="detail__content__right ">
                    <div className="clearfix detail__content__right--review ">
                      <div className={renderRevies()}>
                        <span>{renderReviesText()}</span>
                        <div className="slice">
                          <div className="bar" />
                          <div className="fill" />
                        </div>
                      </div>
                    </div>
                    <div className="detail__content--review-title">
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={chiTietPhimVaRap?.danhGia / 2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {chiTietPhimVaRap.heThongRapChieu?.length !== 0 ? (
              <div className="detail-list container">
                <Tabs tabPosition={tabPosition}>
                  {chiTietPhimVaRap.heThongRapChieu?.map((rap, i) => (
                    <TabPane
                      tab={
                        <img
                          src={rap.logo}
                          alt={rap.tenHeThongRap}
                          width="40px"
                        />
                      }
                      key={i}
                    >
                      {rap.cumRapChieu?.map((cumRap, i) => (
                        <div key={i} className="detail-list--item">
                          <div className="detail-list--item--top">
                            <div className="detail-list--item--top-img">
                              <img
                                src={cumRap.hinhAnh}
                                width="50px"
                                height="60px"
                              />
                            </div>
                            <span className="detail-list--item--top-text">
                              <h5>{cumRap.tenCumRap}</h5>
                              <span>{cumRap.diaChi}</span>
                            </span>
                          </div>
                          <div className="detail-list--item-footer">
                            <div className="detail-list--item-footer-btn">
                              {cumRap.lichChieuPhim
                                .slice(0, 12)
                                .map((lichChieu, i) => (
                                  <span key={i}>
                                    <NavLink
                                      to={`/checkout/${lichChieu.maLichChieu}`}
                                    >
                                      {lichChieu.ngayChieuGioChieu.slice(
                                        11,
                                        16
                                      )}
                                    </NavLink>
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            ) : (
              <div className="detail-no-list">
                <h5>Phim này chưa có lịch chiếu, vui lòng quay lại sau</h5>
              </div>
            )}
          </CustomCard>
        </div>
      </div>
    </>
  );
};

export default Detail;
