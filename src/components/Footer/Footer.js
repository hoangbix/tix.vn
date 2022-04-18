import React from "react";

import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content container mx-auto">
        <div className="footer__content__top grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <div className="footer__content__top-menu1">
            <h3>Chính sách</h3>
            <div className="footer__content__top-ul">
              <a href="">FAQ</a>
              <a href="">Brand Guideanes</a>
              <a href="">Thỏa thuận sử dụng</a>
              <a href="">Chính sách bảo mật</a>
            </div>
          </div>
          <div className="footer__content__top-menu2">
            <h3>Đối tác</h3>
            <div className="footer__content__top-menu2-doitac grid grid-cols-5">
              <a href="">
                <img src={require("../../assets/images/cgv.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/bhd.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/galaxycine.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/cinestar.png")} />
              </a>
              <a href="">
                <img
                  src={require("../../assets/images/404b8c4b80d77732e7426cdb7e24be20.png")}
                />
              </a>
            </div>
            <div className="footer__content__top-menu2-doitac grid grid-cols-5">
              <a href="">
                <img src={require("../../assets/images/megags.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/bt.jpg")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/dongdacinema.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/TOUCH.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/cnx.jpg")} />
              </a>
            </div>
            <div className="footer__content__top-menu2-doitac grid grid-cols-5">
              <a href="">
                <img src={require("../../assets/images/STARLIGHT.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/dcine.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/zalopay_icon.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/VCB.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/payoo.jpg")} />
              </a>
            </div>
            <div className="footer__content__top-menu2-doitac grid grid-cols-5">
              <a href="">
                <img src={require("../../assets/images/AGRIBANK.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/VIETTINBANK.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/IVB.png")} />
              </a>
              <a href="">
                <img src={require("../../assets/images/123go.png")} />
              </a>{" "}
              <a href="">
                <img src={require("../../assets/images/laban.png")} />
              </a>
            </div>
          </div>
          <div className="footer__content__top-menu3">
            <h3>SOCIAL</h3>
            <div className="footer__content__top-social">
              <ul>
                <li>
                  <img src={require("../../assets/images/apple-logo.png")} />
                </li>
                <li>
                  <img src={require("../../assets/images/android-logo.png")} />
                </li>
                <li>
                  <img src={require("../../assets/images/facebook-logo.png")} />
                </li>
                <li>
                  <img src={require("../../assets/images/zalo-logo.png")} />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__content__footer grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div className="footer__content__footer--top">
            <img src={require("../../assets/images/zion-logo.jpg")} />
          </div>
          <div className="footer__content__footer--body col-span-4 sm:ol-span-2">
            <h4>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</h4>
            <p>
              Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
              Chí Minh, Việt Nam.
            </p>
            <p>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,.</p>
            <p>
              đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
              hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
            </p>
            <p>Số Điện Thoại (Hotline): 1900 545 436</p>
            <p>Email: support@tix.vn</p>
          </div>
          <div className="footer__content__footer--bottom">
            <img
              src={require("../../assets/images/d1e6bd560daa9e20131ea8a0f62e87f8.png")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
