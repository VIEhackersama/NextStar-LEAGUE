// src/pages/PostAdmin.jsx
import React, { useEffect, useState } from "react";
import { AdminPosts } from "../components/adminpost";
import { getAuth } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function PostAdmin() {
    const nav = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [draft, setDraft] = useState({ title: "", imageUrl: "", fullText: "", accountId: "" });

    useEffect(() => {
        const auth = getAuth();
        if (!auth?.token) { nav("/login"); return; }
        if (auth?.user?.email !== "admin@example.com" && !auth?.user?.isAdmin) {
            nav("/"); return;
        }
        load();
        // eslint-disable-next-line
    }, []);

    async function load() {
        try {
            setLoading(true);
            setErr("");
            const data = await AdminPosts.list();
            setRows(data);
        } catch (e) {
            setErr(e?.response?.data || e?.message || "Load failed");
        } finally {
            setLoading(false);
        }
    }

    async function onCreate(e) {
        e.preventDefault();
        try {
            setErr("");
            const payload = {
                title: draft.title,
                imageUrl: draft.imageUrl,
                fullText: draft.fullText,
                accountId: draft.accountId ? Number(draft.accountId) : undefined,
            };
            await AdminPosts.create(payload);
            setDraft({ title: "", imageUrl: "", fullText: "", accountId: "" });
            await load();
        } catch (e) {
            setErr(e?.response?.data || e?.message || "Create failed");
        }
    }

    async function onUpdate(row) {
        try {
            setErr("");
            const payload = {
                title: row.title,
                imageUrl: row.imageUrl,
                fullText: row.fullText,
                accountId: row.accountId || undefined, // nếu bạn render thêm cột owner
            };
            await AdminPosts.update(row.postId, payload);
            await load();
        } catch (e) {
            setErr(e?.response?.data || e?.message || "Update failed");
        }
    }

    async function onDelete(id) {
        if (!window.confirm("Delete this post?")) return;
        try {
            setErr("");
            await AdminPosts.remove(id);
            await load();
        } catch (e) {
            setErr(e?.response?.data || e?.message || "Delete failed");
        }
    }

    function setRowField(id, field, value) {
        setRows(prev => prev.map(r => (r.postId === id ? { ...r, [field]: value } : r)));
    }

    return (
        <div className="container" style={{ padding: 24 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Admin Portal — Posts</h2>
                <div>
                    <button className="btn btn-outline-secondary me-2" onClick={load} disabled={loading}>
                        {loading ? "Loading..." : "Refresh"}
                    </button>
                    <button className="btn btn-outline-primary" onClick={() => nav("/admin")}>
                        Back to Accounts
                    </button>
                </div>
            </div>

            {err && <div className="alert alert-danger">{String(err)}</div>}

            {/* Create */}
            <form onSubmit={onCreate} className="card p-3 mb-4">
                <h5 className="mb-3">Create post</h5>
                <div className="row g-2">
                    <div className="col-md-4">
                        <input className="form-control" placeholder="Title" value={draft.title}
                            onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} required />
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" placeholder="Image URL" value={draft.imageUrl}
                            onChange={e => setDraft(d => ({ ...d, imageUrl: e.target.value }))} />
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" placeholder="Owner accountId (optional)" value={draft.accountId}
                            onChange={e => setDraft(d => ({ ...d, accountId: e.target.value }))} />
                    </div>
                    <div className="col-12">
                        <textarea className="form-control" rows={3} placeholder="Full text"
                            value={draft.fullText}
                            onChange={e => setDraft(d => ({ ...d, fullText: e.target.value }))} required />
                    </div>
                </div>
                <div className="mt-2">
                    <button className="btn btn-primary" disabled={loading}>Create</button>
                </div>
            </form>

            {/* Table */}
            <div className="table-responsive card p-0">
                <table className="table table-striped table-hover mb-0 align-middle">
                    <thead className="table-light">
                        <tr>
                            <th className="text-black">ID</th>
                            <th className="text-black">Title</th>
                            <th className="text-black">Image URL</th>
                            <th className="text-black">Full text</th>
                            <th className="text-black">Created</th>
                            <th className="text-black"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(r => (
                            <tr key={r.postId}>
                                <td className="text-black">{r.postId}</td>
                                <td>
                                    <input className="form-control form-control-sm"
                                        value={r.title || ""}
                                        onChange={e => setRowField(r.postId, "title", e.target.value)} />
                                </td>
                                <td>
                                    <input className="form-control form-control-sm"
                                        value={r.imageUrl || ""}
                                        onChange={e => setRowField(r.postId, "imageUrl", e.target.value)} />
                                </td>
                                <td style={{ minWidth: 260 }}>
                                    <textarea className="form-control form-control-sm" rows={2}
                                        value={r.fullText || ""}
                                        onChange={e => setRowField(r.postId, "fullText", e.target.value)} />
                                </td>
                                <td className=" text-black">{r.createdAt || "-"}</td>
                                <td className="text-nowrap">
                                    <button className="btn btn-sm btn-outline-success me-2" onClick={() => onUpdate(r)}>
                                        Save
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(r.postId)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && !loading && (
                            <tr><td colSpan="6" className="text-center py-4">No posts</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
