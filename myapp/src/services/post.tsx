// src/services/posts.ts
import axios from "axios";
const BASE = "http://localhost:8080/post";

export type CreatePostPayload = {
    title: string;
    imageUrl?: string;
    fullText: string;
};

export async function createPost(payload: CreatePostPayload) {
    const res = await axios.post(`${BASE}/post`, payload);
    return res.data; 
}
