export const fetchBanners = (axios) => axios.get("/banner");
export const initalizeBanner = (axios) => axios.post("/banner/initialize");
export const updateBanner = (axios, data) => axios.put("/banner", data);
