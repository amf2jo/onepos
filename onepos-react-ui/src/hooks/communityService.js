import useAxios from "./useAxios";
const { http, setHeaders } = useAxios("community-service");

const setHttpHeaders = () => {
  setHeaders(http.defaults.headers);
}
const getAll = () => {
  return http.get("/communities");
};
const getMyList = (memberId) => {
  return http.get(`/communitiesByMember/${memberId}`);
};
const findByKeyword = (keyword) => {
  return http.get(`/communities/search?keyword=${keyword}`);
};
const get = id => {
  return http.get(`/communities/${id}`);
};
const create = data => {
  return http.post("/communities", data);
};
const update = (id, data) => {
  return http.put(`/communities/${id}`, data);
};
const remove = id => {
  return http.delete(`/communities/${id}`);
};
const joinMember = (id, data) => {
  return http.post(`/communities/${id}/members`, data);
};
const resignMember = (id, memberId) => {
  return http.delete(`/communities/${id}/members/${memberId}`);
};
const getMembers = (id) => {
  return http.get(`/communities/${id}/members`);
};
const appointManager = (id, memberId) => {
  return http.put(`/communities/${id}/appointManager/${memberId}`);
};
const disappointManager = (id, memberId) => {
  return http.put(`/communities/${id}/disappointManager/${memberId}`);
};
const blockMember = (id, memberId) => {
  return http.put(`/communities/${id}/${memberId}/blocked=true`);
};
const unblockMember = (id, memberId) => {
  return http.put(`/communities/${id}/${memberId}/blocked=false`);
};
const communityService = {
  getAll,
  getMyList,
  findByKeyword,
  get,
  create,
  update,
  remove,
  joinMember,
  resignMember,
  getMembers,
  appointManager,
  disappointManager,
  blockMember,
  unblockMember,
  setHttpHeaders
};

export default communityService;
