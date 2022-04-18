import React from "react";
import { Tabs } from "antd";

import "./news.scss";

import anhDemo from "../../assets/images/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16111317082644.jpg";
import like from "../../assets/images/like.png";
import comments from "../../assets/images/comment.png";
import anhDemo2 from "../../assets/images/da-n-my-nhan-trong-the-gio-i-die-n-a-nh-cu-a-qua-i-kie-t-christopher-nolan-15970503793246.png";

const { TabPane } = Tabs;

const News = () => {
  return (
    <section className="showFilms news ">
      <div className="tab-content showFilms__content news__content">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Điện Ảnh 24h" key="1">
            <div className="news__content__row ">
              <div className="news__content__list grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div className="news__content__list--items ">
                  <div className="news__content__list--items-item">
                    <a href="">
                      <img
                        className="news__content__list--items-item-img"
                        src={anhDemo}
                      />
                      <h2>
                        Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn
                      </h2>
                    </a>
                    <p>
                      Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành
                      khi sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu
                      phim mang phong cách Artistic Urban Lifestyle đầu tiên tại
                      Việt Nam!
                    </p>
                  </div>
                </div>
                <div className="news__content__list--items">
                  <div className="news__content__list--items-item">
                    <a href="">
                      <img
                        className="news__content__list--items-item-img"
                        src={require("../../assets/images/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056938333773.jpg")}
                      />
                      <h2>
                        “Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành
                      </h2>
                    </a>
                    <p>
                      Vào đúng ngày Nhà giáo Việt Nam 20/11, khu vui chơi sống
                      ảo độc-lạ-chill nhất từ trước đến giờ sẽ chính thức khai
                      trương tại 360 Giải Phóng!
                    </p>
                  </div>
                </div>
              </div>
              <div className="news__content__list grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="news__content__list--items">
                  <div className="news__content__list--items-item">
                    <a href="">
                      <img
                        className="news__content__list--items-item-img"
                        src={require("../../assets/images/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043752411629.png")}
                      />
                      <h2>
                        Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần
                        công chiếu
                      </h2>
                    </a>
                    <p>
                      Sau 2 tuần ra mắt, Tiệc Trăng Máu chính thức gia nhập câu
                      lạc bộ phim điện ảnh đạt 100 tỷ đồng doanh thu phòng vé.
                      Dàn ngôi sao “bạc tỷ” của ...
                    </p>
                  </div>
                </div>
                <div className="news__content__list--items">
                  <div className="news__content__list--items-item">
                    <a href="">
                      <img
                        className="news__content__list--items-item-img"
                        src={require("../../assets/images/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041597587981.jpg")}
                      />
                      <h2>
                        NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT KẾ
                        TRANG PHỤC
                      </h2>
                    </a>
                    <p>
                      Chiều tối ngày 30-10-2020, Ngô Thanh Vân và Studio68 đã
                      chính thức phát động cuộc thi thiết kế trang phục cho siêu
                      anh hùng VINAMAN với tổng ...
                    </p>
                  </div>
                </div>
                <div className="news__content__list--items ">
                  <div className="news__content__list--items-item">
                    <div className="news__content__list--items-item item-mini">
                      <a href="">
                        <img
                          className="news__content__list--items-item-img"
                          src={anhDemo2}
                          width="50"
                        />
                        <p>
                          [ANTEBELLUM] - 4 lý do không thể bỏ lỡ siêu phẩm kinh
                          dị ... Antebellum: Bẫy Thực Tại Kinh Hoàng
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="news__content__list--items-item">
                    <div className="news__content__list--items-item item-mini">
                      <a href="">
                        <img
                          className="news__content__list--items-item-img"
                          src={require("../../assets/images/truy-cung-giet-tan-cuoc-tai-ngo-cua-hai-ong-hoang-phong-ve-xu-han-15966122262210.png")}
                          width="50"
                        />
                        <p>
                          Ác Quỷ Đối Đầu soán ngôi Peninsula, trở thành phim
                          đứng... đầu doanh thu tại Hàn Quốc mùa dịch
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="news__content__list--items-item">
                    <div className="news__content__list--items-item item-mini">
                      <a href="">
                        <img
                          className="news__content__list--items-item-img"
                          src={require("../../assets/images/saostar-geqen7z9kw5qnqzh.webp")}
                          width="50"
                        />
                        <p>
                          Bom tấn Thanh Sói của Ngô Thanh Vân dời lịch chiếu
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="news__content__list--items-item">
                    <div className="news__content__list--items-item item-mini">
                      <a href="">
                        <img
                          className="news__content__list--items-item-img"
                          src={require("../../assets/images/saostar-geqen7z9kw5qnqzh.webp")}
                          width="50"
                        />
                        <p>
                          Pachinko: Lee Min Ho lần đầu xuất hiện với hình ảnh
                          khố rách áo ôm, ôm mặt khóc vì quá nghèo!
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Review" key="2">
            <div className="news__content__row ">
              <div className="news__content__list grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div className="news__content__list--items ">
                  <div className="news__content__list--items-item">
                    <a href="">
                      <img
                        className="news__content__list--items-item-img"
                        src={require("../../assets/images/review-tan-tich-quy-am-relic-ba-the-he-va-moi-lien-ket-15965255784224.png")}
                      />
                      <h2>
                        Review: Tàn Tích Quỷ Ám (Relic) - Ba thế hệ và mối liên
                        kết
                      </h2>
                    </a>
                    <p>
                      Điểm nhấn của phim kinh dị năm 2020 chính là Tàn Tích Quỷ
                      Ám
                    </p>
                  </div>
                </div>
                <div className="news__content__list--items">
                  <div className="news__content__list--items-item">
                    <a href="">
                      <img
                        className="news__content__list--items-item-img"
                        src={require("../../assets/images/dong-gia-1k-ve-khi-mua-ve-qua-tix-16010092946804.png")}
                      />
                      <h2>ĐỒNG GIÁ 1K/VÉ KHI MUA VÉ QUA TIX</h2>
                    </a>
                    <p>
                      ĐỒNG GIÁ 1K/VÉ KHI MUA VÉ QUA TIX Hành trình tìm Ròm và
                      Phúc chỉ với 1k cả tuần + nhận thêm 02 voucher khi đặt vé
                      qua TIX.
                    </p>
                  </div>
                </div>
              </div>
              <div className="news__content__list grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="news__content__list--items">
                  <div className="news__content__list--items-item">
                    <a href="">
                      <img
                        className="news__content__list--items-item-img"
                        src={require("../../assets/images/bhd-star-ve-chi-59-000d-ca-tuan-15937622264546.jpg")}
                      />
                      <h2>BHD STAR VÉ CHỈ 59.000Đ CẢ TUẦN!</h2>
                    </a>
                    <p>
                      Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với
                      giá 59k/vé khi mua vé trên TIX và thanh toán bằng ZaloPay
                      hoặc Mục Vé Phim
                    </p>
                  </div>
                </div>
                <div className="news__content__list--items">
                  <div className="news__content__list--items-item">
                    <a href="">
                      <img
                        className="news__content__list--items-item-img"
                        src={require("../../assets/images/bhd-59k-ve-ca-tuan-16088081864967.jpg")}
                      />
                      <h2>BHD 59K/VÉ CẢ TUẦN !!!</h2>
                    </a>
                    <p>
                      Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với
                      giá 59k/vé khi mua vé trên TIX hoặc Mục Vé Phim trên
                      ZaloPay.
                    </p>
                  </div>
                </div>
                <div className="news__content__list--items ">
                  <div className="news__content__list--items-item">
                    <div className="news__content__list--items-item item-mini">
                      <a href="">
                        <img
                          className="news__content__list--items-item-img"
                          src={anhDemo2}
                          width="50"
                        />
                        <p>
                          [ANTEBELLUM] - 4 lý do không thể bỏ lỡ siêu phẩm kinh
                          dị ... Antebellum: Bẫy Thực Tại Kinh Hoàng
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="news__content__list--items-item">
                    <div className="news__content__list--items-item item-mini">
                      <a href="">
                        <img
                          className="news__content__list--items-item-img"
                          src={require("../../assets/images/truy-cung-giet-tan-cuoc-tai-ngo-cua-hai-ong-hoang-phong-ve-xu-han-15966122262210.png")}
                          width="50"
                        />
                        <p>
                          Ác Quỷ Đối Đầu soán ngôi Peninsula, trở thành phim
                          đứng... đầu doanh thu tại Hàn Quốc mùa dịch
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="news__content__list--items-item">
                    <div className="news__content__list--items-item item-mini">
                      <a href="">
                        <img
                          className="news__content__list--items-item-img"
                          src={require("../../assets/images/saostar-geqen7z9kw5qnqzh.webp")}
                          width="50"
                        />
                        <p>
                          Bom tấn Thanh Sói của Ngô Thanh Vân dời lịch chiếu
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="news__content__list--items-item">
                    <div className="news__content__list--items-item item-mini">
                      <a href="">
                        <img
                          className="news__content__list--items-item-img"
                          src={require("../../assets/images/saostar-geqen7z9kw5qnqzh.webp")}
                          width="50"
                        />
                        <p>
                          Pachinko: Lee Min Ho lần đầu xuất hiện với hình ảnh
                          khố rách áo ôm, ôm mặt khóc vì quá nghèo!
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Khuyến Mãi" key="3">
            <div className="news__content__row ">
              <div className="news__content__list grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div className="news__content__list--items ">
                  <div className="news__content__list--items-item">
                    <a href="">
                      <img
                        className="news__content__list--items-item-img"
                        src={require("../../assets/images/bhd-59k-ve-ca-tuan-16088081864967.jpg")}
                      />
                      <h2>BHD 59K/VÉ CẢ TUẦN !!!</h2>
                    </a>
                    <p>
                      Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với
                      giá 59k/vé khi mua vé trên TIX hoặc Mục Vé Phim trên
                      ZaloPay.
                    </p>
                  </div>
                </div>
                <div className="news__content__list--items">
                  <div className="news__content__list--items-item">
                    <a href="">
                      <img
                        className="news__content__list--items-item-img"
                        src={require("../../assets/images/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056938333773.jpg")}
                      />
                      <h2>
                        “Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành
                      </h2>
                    </a>
                    <p>
                      Vào đúng ngày Nhà giáo Việt Nam 20/11, khu vui chơi sống
                      ảo độc-lạ-chill nhất từ trước đến giờ sẽ chính thức khai
                      trương tại 360 Giải Phóng!
                    </p>
                  </div>
                </div>
              </div>
              <div className="news__content__list grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="news__content__list--items">
                  <div className="news__content__list--items-item">
                    <a href="">
                      <img
                        className="news__content__list--items-item-img"
                        src={require("../../assets/images/dong-gia-1k-ve-khi-mua-ve-qua-tix-16010092946804.png")}
                      />
                      <h2>ĐỒNG GIÁ 1K/VÉ KHI MUA VÉ QUA TIX</h2>
                    </a>
                    <p>
                      ĐỒNG GIÁ 1K/VÉ KHI MUA VÉ QUA TIX Hành trình tìm Ròm và
                      Phúc chỉ với 1k cả tuần + nhận thêm 02 voucher khi đặt vé
                      qua TIX.
                    </p>
                  </div>
                </div>
                <div className="news__content__list--items">
                  <div className="news__content__list--items-item">
                    <a href="">
                      <img
                        className="news__content__list--items-item-img"
                        src={require("../../assets/images/american-sniper-chinh-nghia-hay-phi-nghia-15905660338111.png")}
                      />
                      <h2>
                        Phim Hoa ngữ quý 1 năm 2022: Lưu lượng tiểu Hoa, tiểu
                        Sinh thất thế bị chê kém tài lẫn sắc, lý do vì sao?
                      </h2>
                    </a>
                    <p>
                      Chiều tối ngày 30-10-2020, Ngô Thanh Vân và Studio68 đã
                      chính thức phát động cuộc thi thiết kế trang phục cho siêu
                      anh hùng VINAMAN với tổng ...
                    </p>
                  </div>
                </div>
                <div className="news__content__list--items ">
                  <div className="news__content__list--items-item">
                    <div className="news__content__list--items-item item-mini">
                      <a href="">
                        <img
                          className="news__content__list--items-item-img"
                          src={anhDemo2}
                          width="50"
                        />
                        <p>
                          [ANTEBELLUM] - 4 lý do không thể bỏ lỡ siêu phẩm kinh
                          dị ... Antebellum: Bẫy Thực Tại Kinh Hoàng
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="news__content__list--items-item">
                    <div className="news__content__list--items-item item-mini">
                      <a href="">
                        <img
                          className="news__content__list--items-item-img"
                          src={require("../../assets/images/truy-cung-giet-tan-cuoc-tai-ngo-cua-hai-ong-hoang-phong-ve-xu-han-15966122262210.png")}
                          width="50"
                        />
                        <p>
                          Ác Quỷ Đối Đầu soán ngôi Peninsula, trở thành phim
                          đứng... đầu doanh thu tại Hàn Quốc mùa dịch
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="news__content__list--items-item">
                    <div className="news__content__list--items-item item-mini">
                      <a href="">
                        <img
                          className="news__content__list--items-item-img"
                          src={require("../../assets/images/saostar-geqen7z9kw5qnqzh.webp")}
                          width="50"
                        />
                        <p>
                          Bom tấn Thanh Sói của Ngô Thanh Vân dời lịch chiếu
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="news__content__list--items-item">
                    <div className="news__content__list--items-item item-mini">
                      <a href="">
                        <img
                          className="news__content__list--items-item-img"
                          src={require("../../assets/images/saostar-vv3llzchxmlux99z.webp")}
                          width="50"
                        />
                        <p>
                          Pachinko: Lee Min Ho lần đầu xuất hiện với hình ảnh
                          khố rách áo ôm, ôm mặt khóc vì quá nghèo!
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
};

export default News;
