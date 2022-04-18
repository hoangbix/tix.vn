const initialState = {
  lichChieuPhim: [],
};

export const ThongTinLichChieuPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LICH_CHIEU_PHIM":
      state.lichChieuPhim = action.lichChieuPhim;
      return { ...state };

    default:
      return { ...state };
  }
};
