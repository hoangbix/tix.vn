const initialState = {
  danhSachGhe: [],
  thongTinPhim: [],
};

export const LayDanhSachPhongVeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DANH_SACH_GHE":
      state.danhSachGhe = action.thongTinPhongVe.danhSachGhe;
      state.thongTinPhim = action.thongTinPhongVe.thongTinPhim;
      return { ...state };

    default:
      return { ...state };
  }
};
