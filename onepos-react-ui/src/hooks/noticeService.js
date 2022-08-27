import http from "./notice-http-common";

const getAll = () => {
  return http.get("/notices");
};
const get = id => {
  return http.get(`/notices/${id}`);
};
const create = data => {
  return http.post("/notices", data);
};
const update = (id, data) => {
  return http.put(`/notices/${id}`, data);
};
const remove = id => {
  return http.delete(`/notices/${id}`);
};

const NoticeService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default NoticeService;
