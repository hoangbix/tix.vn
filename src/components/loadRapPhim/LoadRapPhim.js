import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { DanhSachRapReducer } from "../../redux/reducers/QuanLyRapReducer/DanhSachRapReducer";
import "./load-rap-phim.scss";
import { DanhSachRapAction } from "../../redux/actions/QuanLyRapAction";

const LoadRapPhim = () => {
  const dispatch = useDispatch();
  const { danhSachRap } = useSelector((state) => state.DanhSachRapReducer);
  const { TabPane } = Tabs;
  const { tabPosition } = {
    tabPosition: "left",
  };
  useEffect(() => {
    dispatch(DanhSachRapAction());
  }, []);

  const renderHeThongRap = () => {
    return danhSachRap?.map((raps, i) => {
      return (
        <TabPane
          tab={<img src={raps.logo} alt={raps.tenHeThongRap} />}
          className="load__phim__logo"
          key={i}
        >
          <Tabs tabPosition={tabPosition} key={i}>
            {raps.lstCumRap.map((lstRap, i) => (
              <TabPane
                tab={
                  <div className="tabs-content-menu--item">
                    <div className="tabs-content-body">
                      <div className="tabs-content-img">
                        <img src={lstRap.hinhAnh} alt="" />
                      </div>
                      <div className="tabs-content-text">
                        <h5>{lstRap.tenCumRap}</h5>
                        <p>{lstRap.diaChi}</p>
                      </div>
                    </div>
                  </div>
                }
                className="load__phim__cum__rap"
                key={i}
              >
                {lstRap.danhSachPhim.slice(0, 12).map((phims, i) => (
                  <span className="load__film--item" key={i}>
                    <NavLink
                      to={`/detail/${phims.maPhim}`}
                      className="load__film--item-flex"
                    >
                      <div className="load__film--item-img">
                        <img
                          src={phims.hinhAnh}
                          onError={(e) => {
                            e.target.onError = null;
                            e.target.src =
                              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
                          }}
                        />
                      </div>
                      <div className="load__film--item-text">
                        <h5>
                          <span className="tabs-text-c">{phims.tenPhim}</span>
                        </h5>
                        <p>100 phút - TIX 9 - IMDb 8</p>
                      </div>
                    </NavLink>
                    <div className="load__film--item-footer">
                      <span className="load__film--item-btn">
                        {phims.lstLichChieuTheoPhim
                          .slice(0, 11)
                          .map((lichPhim, i) => (
                            <NavLink
                              to={`/checkout/${lichPhim.maLichChieu}`}
                              className="load__film--item-btn-span"
                              key={i}
                            >
                              {lichPhim.ngayChieuGioChieu.slice(11, 16)}
                            </NavLink>
                          ))}
                      </span>
                    </div>
                  </span>
                ))}
              </TabPane>
            ))}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <div className="container mx-auto load__phim">
      <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
    </div>
  );
};

export default LoadRapPhim;
