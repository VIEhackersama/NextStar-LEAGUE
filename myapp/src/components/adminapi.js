import axios from "axios";
const BASE = "http://localhost:8080/api/admin";

export const AdminAPI = {
    listAccounts() {
        return axios.get(`${BASE}/accounts`).then(r => r.data);
    },
    getAccount(id) {
        return axios.get(`${BASE}/accounts/${id}`).then(r => r.data);
    },
    createAccount(payload) {
        return axios.post(`${BASE}/accounts`, payload).then(r => r.data);
    },
    updateAccount(id, payload) {
        return axios.put(`${BASE}/accounts/${id}`, payload).then(r => r.data);
    },
    deleteAccount(id) {
        return axios.delete(`${BASE}/accounts/${id}`).then(r => r.status === 204);
    },
};
