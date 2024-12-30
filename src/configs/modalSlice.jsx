import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalIsOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onCloseModal(state) {
      state.modalIsOpen = false;
    },
    onOpenModal(state) {
      state.modalIsOpen = true;
    },
  },
});

export const { onOpenModal, onCloseModal } = modalSlice.actions;
export default modalSlice.reducer;
