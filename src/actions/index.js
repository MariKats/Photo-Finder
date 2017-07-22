import axios from "axios";
export const FETCH_PHOTOLIST = "FETCH_PHOTOLIST";
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const ROOT_URL = `https://api.flickr.com/services/rest/?api_key=${API_KEY}&format=rest&format=json&nojsoncallback=1&content_type=1`

export function fetchPhotoList(term) {
  const url = `${ROOT_URL}&method=flickr.photos.search&text=${term}`;
  const request = axios.get(url);

  return {
    type: FETCH_PHOTOLIST,
    payload: request
  };
}
