import axios from 'axios';
import { API_BASE_URL } from '../constants';

const getAll = async () => {
  const res = await axios.get(`${API_BASE_URL}/recipes`);
  return res.data;
};

const getByName = async (name) => {
  const res = await axios.get(`${API_BASE_URL}/recipes?name=${name}`);
  return res.data;
};

const getByDiet = async (diet) => {
  const res = await axios.get(`${API_BASE_URL}/recipes?diet=${diet}`);
  return res.data;
};

const getByCreatedFilter = async (payload) => {
  const res = await axios.get(`${API_BASE_URL}/recipes?created=${payload}`);
  return res.data;
};

const getDetail = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/recipes/${id}`);
  return res.data;
};

const create = async (object) => {
  const res = await axios.post(`${API_BASE_URL}/recipes`, object);
  return res.data;
};

export default {
  getAll,
  getByName,
  getByDiet,
  getByCreatedFilter,
  getDetail,
  create,
};
