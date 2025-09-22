import axios from "axios";
const BASE = "http://localhost:8080/api/admin/posts";

export const AdminPosts = {
    list: () => axios.get(BASE).then(r => r.data),
    get: (id) => axios.get(`${BASE}/${id}`).then(r => r.data),
    create: (payload) => axios.post(BASE, payload).then(r => r.data),
    update: (id, payload) => axios.put(`${BASE}/${id}`, payload).then(r => r.data),
    remove: (id) => axios.delete(`${BASE}/${id}`).then(r => r.status === 204),
};