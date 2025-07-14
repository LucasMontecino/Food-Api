import axios from 'axios';
import { API_BASE_URL } from '../constants';

const getAll = async () => {
  const res = await axios.get(`${API_BASE_URL}/diets`);
  return res.data;
};

export default {
  getAll,
};
