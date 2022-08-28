import http from "./campaign-http-common";

const getAll = () => {
  return http.get("/campaigns");
};
const getByCommunityId = id => {
  return http.get(`/campaigns/communityId=${id}`);
};
const get = id => {
  return http.get(`/campaigns/${id}`);
};
const create = data => {
  return http.post("/campaigns", data);
};
const update = (id, data) => {
  return http.put(`/campaigns/${id}`, data);
};
const remove = id => {
  return http.delete(`/campaigns/${id}`);
};
const removeAll = () => {
  return http.delete(`/campaigns`);
};
// const findByTitle = title => {
//   return http.get(`/tutorials?title=${title}`);
// };

const approve = id => {
  return http.patch(`/campaigns/${id}/approve`);
};

const stop = id => {
  return http.patch(`/campaigns/${id}/stop`);
};

const cancel = id => {
  return http.patch(`/campaigns/${id}/cancel`);
};

const CampaignService = {
  getAll,
  getByCommunityId,
  get,
  create,
  update,
  remove,
  removeAll,
  approve,
  stop,
  cancel
};

export default CampaignService;
