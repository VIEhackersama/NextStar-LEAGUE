// src/services/posts.ts
import axios from "axios";
const BASE = "http://localhost:8080/post";

export type CreatePostPayload = {
    title: string;
    imageUrl?: string;
    fullText: string;
};

export async function createPost(payload: CreatePostPayload) {
    // axios đã có Authorization từ auth.js (defaults.headers.common.Authorization)
    const res = await axios.post(`${BASE}/post`, payload);
    return res.data; // server trả về Post entity
}
