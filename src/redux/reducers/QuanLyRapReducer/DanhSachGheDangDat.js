import Swal from "sweetalert2";

const initialState = {
  danhSachGheDangDat: [],
  datVe: [],
  danhSachGheKhachDat: [],
};

export const DanhSachGheDangDatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GHE_DANG_DAT":
      const danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
      const index = danhSachGheDangDatUpdate.findIndex(
        (gheDD) => gheDD.maGhe === action.gheDangDat.maGhe
      );

      if (index !== -1) {
        danhSachGheDangDatUpdate.splice(index, 1);
      } else {
        state.danhSachGheDangDat.length < 6
          ? danhSachGheDangDatUpdate.push(action.gheDangDat)
          : Swal.fire({
              icon: "error",
              title: "Không được phép...!",
              text: "Bạn chỉ được đặt tối đa 6 vé cùng lúc.",
              footer:
                'Nếu có thắc mắc xin vui lòng liên hệ &nbsp;<a href="tel:+19001234">19001234</a>',
            });
      }

      state.danhSachGheDangDat = danhSachGheDangDatUpdate;
      return { ...state };

    case "DAT_GHE":
      state.danhSachGheKhachDat = action.arrGheKhachDat;
      return { ...state };

    default:
      return { ...state };
  }
};
