import useAxios from "./useAxios";
const { http, setHeaders } = useAxios("");

const setHttpHeaders = () => {
  setHeaders(http.defaults.headers);
}

const get = id => {
  setHttpHeaders();
  return http.get(`/users/${id}`);
};
const getDetail = id => {
  setHttpHeaders();
  return http.get(`/users/${id}/details`);
};
const updateDetail = (id, data)  => {
  return http.put(`/users/${id}/details`, data);
};
const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};
const remove = id => {
  return http.delete(`/users/${id}`);
};


const userService = {

  get,
  getDetail,
  updateDetail,
  update,
  remove,
};

export default userService;
