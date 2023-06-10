import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";
import { toast } from "react-toastify";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("0223Rules", JSON.stringify(state));
}

function readFavsFromLocalStorage() {
  const favs = JSON.parse(localStorage.getItem("0223Rules"));
  return favs === null ? [] : favs;
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      let isAlreadyFav = state.favs.find(
        (item) => item.id === action.payload.id
      );
      const newFavList = !!isAlreadyFav
        ? [...state.favs]
        : [...state.favs, action.payload];
      toast.success("Favorilere eklendi!!!");

      writeFavsToLocalStorage(newFavList);
      return {
        ...state,
        favs: newFavList,
      };

    case FAV_REMOVE:
      const newRemFavList = state.favs.filter(
        (item) => item.id !== action.payload
      );
      writeFavsToLocalStorage(newRemFavList);
      toast.warning("Favori silindi!!");
      return {
        ...state,
        favs: newRemFavList,
      };

    case FETCH_SUCCESS:
      toast.success("Şaka Şukalar");
      return {
        ...state,
        loading: false,
        current: action.payload,
        error: null,
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
        current: null,
        error: null,
      };

    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        current: null,
        error: action.payload,
      };

    case GET_FAVS_FROM_LS:
      return {
        ...state,
        favs: readFavsFromLocalStorage() || [],
        //favs:readFavsFromLocalStorage() === null ? [] : readFavsFromLocalStorage,
      };

    default:
      return state;
  }
}
