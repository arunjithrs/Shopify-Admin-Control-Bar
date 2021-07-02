export const fetchToolbar = (axios) => axios.get("/toolbar");
export const initalizeTheme = (axios) => axios.post("/theme/initialize");
export const updateToolbar = (axios, data) => axios.put("/toolbar", data);
export const fetchThemeStatus = (axios) => axios.get("/theme/status");
