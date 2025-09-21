import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "../services/auth";

interface Post {
  postId: number;
  title: string;
  fullText: string;
  imageUrl: string;
  createdAt: string;
  username: string;
}

const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const auth = getAuth(); 
            const token = auth?.token;
    axios
      .get<Post[]>("http://localhost:8080/post/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="container max-w-6xl mx-auto p-6 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">News Feed</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.postId}
            className="bg-[#0A0A32] text-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-yellow-400">
                {post.title}
              </h3>
              <p className="text-sm text-gray-400">by {post.username}</p>
            </div>

            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-60 object-cover"
              />
            )}

            <div className="p-4 flex-1">
              <p className="text-gray-200">
                {expanded === post.postId
                  ? post.fullText
                  : post.fullText.slice(0, 120) +
                    (post.fullText.length > 120 ? "..." : "")}
              </p>
              {post.fullText.length > 120 && (
                <button
                  onClick={() =>
                    setExpanded(expanded === post.postId ? null : post.postId)
                  }
                  className="mt-2 text-sm text-yellow-400 hover:underline"
                >
                  {expanded === post.postId ? "Show less" : "Show more"}
                </button>
              )}
            </div>

            <div className="p-4 border-t border-gray-700 flex justify-between items-center">
              <div className="flex gap-4">
                <button className="px-3 py-1 rounded-lg bg-yellow-400 text-[#0A0A32] font-bold hover:bg-yellow-500">
                  ↑ Upvote
                </button>
                <button className="px-3 py-1 rounded-lg bg-gray-600 text-white font-bold hover:bg-gray-500">
                  ↓ Downvote
                </button>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
