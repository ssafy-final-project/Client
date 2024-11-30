import axios from "axios";

const { VITE_RANDOM_USER_API_URL } = import.meta.env;

export const getRandomImg = () => {
  axios
    .get(VITE_RANDOM_USER_API_URL)
    .then(({ data }) => console.log(data.results[0].picture.large));
};
