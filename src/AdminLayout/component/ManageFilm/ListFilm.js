import { useEffect } from "react";
import { Table, Input, Button } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import {
  DanhSachPhimAction,
  XoaPhimAction,
} from "../../../redux/actions/QuanLyPhimAction";
import { DanhSachPhimReducer } from "../../../redux/reducers/QuanLyPhimReducer/DanhSachPhimReducer";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import apiQuanLyPhim from "../../../api/apiQuanlyPhim";

const ListFilm = () => {
  const { id } = useParams();
  const { Search } = Input;
  const dispatch = useDispatch();
  const { danhSachPhim } = useSelector((state) => state.DanhSachPhimReducer);
  useEffect(() => {
    dispatch(DanhSachPhimAction());
  }, []);

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.maPhim - b.maPhim,
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tenPhim.localeCompare(b.tenPhim),
    },
    {
      title: "Ngày chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
    },
    {
      title: "Trạng thái",
      key: "dangChieu",
      render: (text, film) => (
        <>{film.sapChieu === true ? "Sắp Chiếu" : "Đang Chiếu"}</>
      ),
    },
    {
      title: "Hành động",
      key: "1",
      render: (text, film) => (
        <>
          <span
            onClick={() => {
              Swal.fire({
                title: "Bạn chắc chắn xóa phim này?",
                text: "Thao tác này sẽ xóa toàn bộ dữ liệu về bộ phim",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#28a745",
                cancelButtonColor: "#dc3545",
                confirmButtonText: "Xóa phim!",
              }).then((result) => {
                const xoaPhim = async () => {
                  try {
                    if (result.isConfirmed) {
                      const res = await apiQuanLyPhim.apiXoaPhim(film.maPhim);
                      if (res.statusCode === 200) {
                        Swal.fire(
                          "Thành công!",
                          "Phim này đã được xóa.",
                          "success"
                        );
                        dispatch(XoaPhimAction(film.maPhim));
                      }
                    }
                  } catch (error) {
                    Swal.fire({
                      icon: "error",
                      title: "Thất bại",
                      text: `${error.response.statusText}`,
                    });
                    console.log(error.response);
                  }
                };
                xoaPhim();
              });
            }}
            className="px-3"
            style={{ fontSize: 16 }}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </span>
          <Link to={`/admin/edit/${film.maPhim}`} style={{ fontSize: 16 }}>
            <EditOutlined style={{ color: "#2ecc71" }} />
          </Link>
          <Link
            to={`/admin/showtime/${film.maPhim}`}
            style={{ fontSize: 16 }}
            className="px-3"
            onClick={() => {
              localStorage.setItem("film", JSON.stringify(film));
            }}
          >
            <ScheduleOutlined style={{ color: "#f1c40f", cursor: "pointer" }} />
          </Link>
        </>
      ),
    },
  ];

  const data = danhSachPhim;
  function onChange(pagination, filters, sorter, extra) {}
  const onSearch = (e) => {
    console.log(e.target.value);
    dispatch(DanhSachPhimAction(e.target.value));
  };
  return (
    <>
      <div className="search-btn">
        <Button type="dashed">
          <Link to="/admin/addfilm">Thêm phim</Link>
        </Button>

        <Search
          placeholder="Tìm kiếm..."
          onChange={(e) => onSearch(e)}
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        size="small"
        rowKey={"maPhim"}
      />
    </>
  );
};

export default ListFilm;
