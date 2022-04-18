const initialState = {
  danhSachPhim: [],
};

export const DanhSachPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DANH_SACH_PHIM":
      state.danhSachPhim = action.danhSachPhim;
      return { ...state };

    default:
      return { ...state };
  }
};
