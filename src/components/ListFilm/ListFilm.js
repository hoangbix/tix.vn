import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { Tabs } from "antd";
import ModalVideo from "react-modal-video";
import "./list-film.scss";
import DanhSachPhimReducer from "../../redux/reducers/QuanLyPhimReducer/DanhSachPhimReducer";
import { DanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import playImg from "../../assets/images/play-video.png";
import preArrow from "../../assets/images/next-session.png";
import nextArrow from "../../assets/images/back-session.png";

const { TabPane } = Tabs;

const ListFilm = () => {
  const dispatch = useDispatch();
  const { danhSachPhim } = useSelector((state) => state.DanhSachPhimReducer);

  const [slideStop, setSlideStop] = useState(true);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  const ref = useRef({});

  const next = () => {
    ref.current.slickNext();
  };

  const previous = () => {
    ref.current.slickPrev();
  };
  const settings = {
    className: "center",
    centerMode: true,
    // autoplay: slideStop,
    infinite: true,
    pauseOnHover: true,
    dots: true,
    arrows: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerPadding: "0px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          infinite: true,
          dots: true,
          centerMode: true,
          // centerPadding: "-35px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          // centerPadding: "-35px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          centerMode: true,
        },
      },
    ],
  };
  useEffect(() => {
    dispatch(DanhSachPhimAction());
  }, []);
  const phimDangChieu = _.filter(
    danhSachPhim,
    (person) => person.dangChieu === true
  );
  const phimSapChieu = _.filter(
    danhSachPhim,
    (person) => person.dangChieu === false
  );
  const [urlModal, setUrlModal] = useState("");
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={urlModal}
        onClose={() => {
          setSlideStop(true);
          setOpen(false);
          <Slider {...settings}></Slider>;
        }}
      />
      <section className="showFilms">
        <div className="tab-content showFilms__content">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Đang Chiếu" key="1">
              <span className="button-pre" onClick={previous}>
                <img src={preArrow} />
              </span>

              <Slider ref={ref} {...settings}>
                {phimDangChieu?.map((dangChieu, i) => {
                  return (
                    <div
                      key={i}
                      className="col-lg-3 col-md-3 col-12 showFilms__content--col"
                    >
                      <div className="showFilms__item">
                        <div className="showFilms__item__top">
                          <div className="showFilms__top--img">
                            <img src={dangChieu.hinhAnh} alt="" />
                          </div>
                          <div className="showFilms__top--play">
                            <img
                              src={playImg}
                              onClick={() => {
                                const index =
                                  dangChieu.trailer.includes(
                                    "youtube.com/watch"
                                  );
                                const index2 =
                                  dangChieu.trailer.includes("youtu.be");
                                if (index) {
                                  const videoId = dangChieu.trailer.slice(32);
                                  setUrlModal(videoId);
                                } else if (index2) {
                                  const videoId = dangChieu.trailer.slice(17);
                                  setUrlModal(videoId);
                                } else {
                                  const videoId = dangChieu.trailer.slice(30);
                                  setUrlModal(videoId);
                                }
                                setOpen(true);
                                setSlideStop(false);
                              }}
                            />
                          </div>
                        </div>
                        <div className="showFilms__item__footer">
                          <div className="showFilms__footer--title">
                            <h5>
                              <span>C18</span>
                              {dangChieu.tenPhim}
                            </h5>
                            <p>110 phút</p>
                          </div>
                          <div className="showFilms__footer--btn">
                            <NavLink to={`/detail/${dangChieu.maPhim}`}>
                              ĐẶT VÉ
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
              <span className="button-next" onClick={next}>
                <img src={nextArrow} />
              </span>
            </TabPane>
            <TabPane tab="Sắp Chiếu" key="2">
              <Slider {...settings}>
                {phimSapChieu?.map((sapChieu, i) => {
                  return (
                    <div
                      key={i}
                      className="col-lg-3 col-md-3 col-12 showFilms__content--col"
                    >
                      <div className="showFilms__item">
                        <div className="showFilms__item__top">
                          <div className="showFilms__top--img">
                            <img src={sapChieu.hinhAnh} alt="" />
                          </div>

                          <div className="showFilms__top--play">
                            <img
                              src={playImg}
                              onClick={() => {
                                const index =
                                  sapChieu.trailer.includes(
                                    "youtube.com/watch"
                                  );
                                const index2 =
                                  sapChieu.trailer.includes("youtu.be");
                                if (index) {
                                  const videoId = sapChieu.trailer.slice(32);
                                  setUrlModal(videoId);
                                } else if (index2) {
                                  const videoId = sapChieu.trailer.slice(17);
                                  setUrlModal(videoId);
                                } else {
                                  const videoId = sapChieu.trailer.slice(30);
                                  setUrlModal(videoId);
                                }
                                setOpen(true);
                                setSlideStop(false);
                              }}
                            />
                          </div>
                        </div>
                        <div className="showFilms__item__footer">
                          <div className="showFilms__footer--title">
                            <h5>
                              <span>C18</span>
                              {sapChieu.tenPhim}
                            </h5>
                            <p>110 phút</p>
                          </div>
                          <div className="showFilms__footer--btn">
                            <NavLink to={`/detail/${sapChieu.maPhim}`}>
                              ĐẶT VÉ
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </TabPane>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default ListFilm;
