const initialState = {
  thongTinPhim: [],
};

export const ThongTinPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case "THONG_TIN_PHIM":
      state.thongTinPhim = action.thongTinPhim;
      return { ...state };

    default:
      return { ...state };
  }
};
