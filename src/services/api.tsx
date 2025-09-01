import axios from "axios";

const API_URL = "http://localhost:5000";

export const getLogin = (email, password) => axios.post(`${API_URL}/login/login`, { email, password });

export const getKategori = (token) => axios.get(`${API_URL}/kategori`, {headers: {Authorization: token}});
export const createKategori = (data, token) => axios.post(`${API_URL}/kategori`, data, {headers: {Authorization: token}});
export const updateKategori = (id, data, token) => axios.put(`${API_URL}/kategori/${id}`, data, {headers: {Authorization: token}});
export const deleteKategori = (id, token) => axios.delete(`${API_URL}/kategori/${id}`, {headers: {Authorization: token}});

export const getKontak = (token) => axios.get(`${API_URL}/kontak`, {headers: {Authorization: token}});
export const createKontak = (data, token) => axios.post(`${API_URL}/kontak`, data, {headers: {Authorization: token}});
export const updateKontak = (id, data, token) => axios.put(`${API_URL}/kontak/${id}`, data, {headers: {Authorization: token}});
export const deleteKontak = (id, token) => axios.delete(`${API_URL}/kontak/${id}`, {headers: {Authorization: token}});

export const getBalasOtomatis = (token) => axios.get(`${API_URL}/balas-otomatis`, {headers: {Authorization: token}});
export const createBalasOtomatis = (data, token) => axios.post(`${API_URL}/balas-otomatis`, data, {headers: {Authorization: token}});
export const updateBalasOtomatis = (id, data, token) => axios.put(`${API_URL}/balas-otomatis/${id}`, data, {headers: {Authorization: token}});
export const deleteBalasOtomatis = (id, token) => axios.delete(`${API_URL}/balas-otomatis/${id}`, {headers: {Authorization: token}});

export const getGroup = (token) => axios.get(`${API_URL}/group`, {headers: {Authorization: token}});
export const createGroup = (data, token) => axios.post(`${API_URL}/group`, data, {headers: {Authorization: token}});
export const updateGroup = (id, data, token) => axios.put(`${API_URL}/group/${id}`, data, {headers: {Authorization: token}});
export const deleteGroup = (id, token) => axios.delete(`${API_URL}/group/${id}`, {headers: {Authorization: token}});

export const getJadwalPesan = (token) => axios.get(`${API_URL}/jadwal-pesan`, {headers: {Authorization: token}});
export const createJadwalPesan = (data, token) => axios.post(`${API_URL}/jadwal-pesan`, data, {headers: {Authorization: token}});
export const updateJadwalPesan = (id, data, token) => axios.put(`${API_URL}/jadwal-pesan/${id}`, data, {headers: {Authorization: token}});
export const deleteJadwalPesan = (id, token) => axios.delete(`${API_URL}/jadwal-pesan/${id}`, {headers: {Authorization: token}});

export const getUser = (token) => axios.get(`${API_URL}/user`, {headers: {Authorization: token}});
export const createUser = (data, token) => axios.post(`${API_URL}/user`, data, {headers: {Authorization: token}});
export const updateUser = (id, data, token) => axios.put(`${API_URL}/user/${id}`, data, {headers: {Authorization: token}});
export const resetUserPassword = (id, data, token) => axios.post(`${API_URL}/user/reset${id}`, data, {headers: {Authorization: token}});
export const deleteUser = (id, token) => axios.delete(`${API_URL}/user/${id}`, {headers: {Authorization: token}});

export const getListRole = (token) => axios.get(`${API_URL}/listrole`, {headers: {Authorization: token}});


const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 15000,
});
export default API;

// Lakukan hal yang sama untuk kontak, grup, balasan otomatis, dan jadwal pesan
