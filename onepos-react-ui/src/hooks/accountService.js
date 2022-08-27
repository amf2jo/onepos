import http from "./account-http-common";

// const getAll = () => {
//   // return http.get("/accounts");
//   return http.get(`/accounts/communityId/23`);
// };

const getAll = id => {
  return http.get(`/accounts/communityId/${id}`);
  // return http.get(`/accounts/communityId/23`);
};

const get = id => {
  return http.get(`/accounts/${id}`);
};
const create = data => {
  return http.post("/accounts", data);
};
const update = (id, data) => {
  // return http.put(`/accounts/${id}`, data);
  return http.put(`/accounts/${id}`, data);
  // return http.patch(`/accounts/${id}`, data);
};
const remove = id => {
  return http.delete(`/accounts/${id}`);
};
const removeAll = () => {
  return http.delete(`/accounts`);
};
// const findByTitle = title => {
//   return http.get(`/tutorials?title=${title}`);
// };

const approve = id => {
  return http.put(`/accounts/${id}/approve`);
  // return http.patch(`/accounts/${id}/approve`);
};

const stop = id => {
  return http.put(`/accounts/${id}/stop`);
  // return http.patch(`/accounts/${id}/stop`);
};

const cancel = id => {
  return http.put(`/accounts/${id}/cancel`);
  // return http.patch(`/accounts/${id}/cancel`);
};



// 개인 계좌
const getAllPrivate = id => {
  return http.get(`/accountsPrivate/communityId/${id}`);
  // return http.get(`/accounts/communityId/23`);
};
// const getAllPrivate = () => {
//   return http.get("/accountsPrivate");
// };
const getPrivate = id => {
  return http.get(`/accountsPrivate/${id}`);
  
};
const createPrivate = data => {
  return http.post("/accountsPrivate", data);
};
const updatePrivate = (id, data) => {
  // return http.put(`/accounts/${id}`, data);
  return http.put(`/accountsPrivate/${id}`, data);
  // return http.patch(`/accountsPrivate/${id}`, data);
};
const removePrivate = id => {
  return http.delete(`/accountsPrivate/${id}`); 
};
const removeAllPrivate = () => {
  return http.delete(`/accountsPrivate`);
};
// const findByTitle = title => {
//   return http.get(`/tutorials?title=${title}`);
// };

const approvePrivate = id => {
  return http.put(`/accountsPrivate/${id}/approve`);
  // return http.patch(`/accountsPrivate/${id}/approve`);
};

const stopPrivate = id => {
  return http.put(`/accountsPrivate/${id}/stop`);
  // return http.patch(`/accountsPrivate/${id}/stop`);
};

const cancelPrivate = id => {
  return http.put(`/accountsPrivate/${id}/cancel`);
  // return http.patch(`/accountsPrivate/${id}/cancel`);
};


// 계좌 이체
const transferAccount = (id, data) => {
  return http.put(`/accountsPrivate/${id}/privateToPublicAccount`, data);
  // return http.put(`/accountsPrivate/${id}/transferAccount`, data);
  // return http.patch(`/accountsPrivate/${id}/transferAccount`, data);
};


// 총 sum 금액
const getSumAccountByCommunityId = id => {
  return http.get(`/accounts/${id}/balanceamount`);
  // return http.get(`/accounts/communityId/23`);
};






const AccountService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  approve,
  stop,
  cancel, 

  getAllPrivate,
  getPrivate,
  createPrivate,
  updatePrivate,
  removePrivate,
  removeAllPrivate,
  approvePrivate,
  stopPrivate,
  cancelPrivate, 

  transferAccount, 
  getSumAccountByCommunityId 
  
};

export default AccountService;
