const BASE_URL = "http://localhost:3000/";

const registerUserURL = `${BASE_URL}user/signup`;
const loginUserURL = `${BASE_URL}user/login`;

const createFolderURL = `${BASE_URL}api/folders`;
const getFolderByUserIdURL = `${BASE_URL}api/folders/user/`;
const getFolderbyIdURL = `${BASE_URL}api/folders/:id`;
const deleteFolderByIdURL = `${BASE_URL}api/folders`;
const createSubFoldersURL = `${BASE_URL}folders/subfolder`;
const deleteFormByIdURL = `${BASE_URL}formapi/form/delete`;
const getFormsByUserIdURL = `${BASE_URL}formapi/folder/forms`;

export {
  registerUserURL,
  loginUserURL,
  createFolderURL,
  getFolderByUserIdURL,
  getFolderbyIdURL,
  deleteFolderByIdURL,
  createSubFoldersURL,
  deleteFormByIdURL,
  getFormsByUserIdURL,
};
