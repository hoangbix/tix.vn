import React from "react";
import Slider from "react-slick";

import "./app.scss";

const App = () => {
  var settings = {
    infinite: true,
    autoplay: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="app">
      <div className="container mx-auto app__body ">
        <div className="app__body__content grid grid-cols-1 sm:grid-cols-2 gap-7 ">
          <div className="app__body__content__left ">
            <h1>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h1>
            <p>
              Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và
              đổi quà hấp dẫn.
            </p>
            <button className=" text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              App miễn phí - Tải về ngay!
            </button>
            <div>
              TIX có hai phiên bản <a href="">iOS</a> & <a href="">Android</a>
            </div>
          </div>
          <div className="app__body__content__right">
            <div className="app__body__content__right--mobile">
              <div className="app__body__content__right--mobile-bg">
                <img src={require("../../assets/images/mobiles.png")} />
              </div>
              <div className="app__body__content__right--mobile-slide">
                <Slider
                  {...settings}
                  className="app__body__content__right--mobile-slide-list"
                >
                  <div className="app__body__content__right--mobile-slide-list-item">
                    <img src={require("../../assets/images/slide2.jpg")} />
                  </div>
                  <div className="app__body__content__right--mobile-slide-list-item">
                    <img src={require("../../assets/images/slide3.jpg")} />
                  </div>
                  <div className="app__body__content__right--mobile-slide-list-item">
                    <img src={require("../../assets/images/slide5.jpg")} />
                  </div>
                  <div className="app__body__content__right--mobile-slide-list-item">
                    <img src={require("../../assets/images/slide5.jpg")} />
                  </div>
                  <div className="app__body__content__right--mobile-slide-list-item">
                    <img src={require("../../assets/images/slide6.jpg")} />
                  </div>
                  <div className="app__body__content__right--mobile-slide-list-item">
                    <img src={require("../../assets/images/slide7.jpg")} />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
