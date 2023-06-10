import axios from "axios";

export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = (info) => {
  return { type: FAV_ADD, payload: info };
};

export const removeFav = (id) => {
  return { type: FAV_REMOVE, payload: id };
};

const fetchLoading = () => ({
  type: FETCH_LOADING,
});

const fetchSuccess = (joke) => ({
  type: FETCH_SUCCESS,
  payload: { setup: joke.setup, punchline: joke.punchline },
});

const fetchFail = (error) => ({
  type: FETCH_ERROR,
  payload: error,
});
export function fetchAnother() {
  return function (dispatch) {
    dispatch(fetchLoading());
    axios
      .get("https://official-joke-api.appspot.com/random_joke")
      .then((response) => {
        const joke = response.data;
        dispatch(fetchSuccess(joke));
      })
      .catch((error) => {
        dispatch(fetchFail(error.message));
      });
  };
}
