import axios from 'axios';
import propTypes from 'prop-types';

const KEY = '25783532-c25c49afce5183be9881181c4';
axios.defaults.baseURL = 'https://pixabay.com/api/';  


const fetchImages = ({searchQuery='', currentPage=1, pageSize=12})=>{
  const searchParams = new URLSearchParams({
    key: KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: pageSize,
    });
    return axios
        .get(`?${searchParams}`)
        .then(response => response.data);
}

fetchImages.propTypes = {
    searchQuery: propTypes.string.isRequired,
    currentPage: propTypes.number,
    pageSize: propTypes.number       
  }

export default fetchImages;