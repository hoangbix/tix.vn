const initialState = {
  danhSachNguoiDung: [],
};

export const DanhSachNguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DANH_SACH_NGUOI_DUNG":
      state.danhSachNguoiDung = action.danhSachNguoiDung;
      return { ...state };

    default:
      return { ...state };
  }
};
