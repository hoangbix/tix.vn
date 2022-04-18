const initialState = {
  chiTietPhimVaRap: [],
};

export const LayChiTietPhimVaRapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHI_TIET_PHIM_VA_RAP":
      state.chiTietPhimVaRap = action.chiTietPhimVaRap;
      return { ...state };
    default:
      return { ...state };
  }
};
