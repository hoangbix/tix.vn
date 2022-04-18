const initialState = {
  danhSachRap: [],
};

export const DanhSachRapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DANH_SACH_RAP":
      state.danhSachRap = action.danhSachRap;
      return { ...state };

    default:
      return { ...state };
  }
};
