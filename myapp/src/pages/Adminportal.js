// src/pages/AdminPortal.jsx
import React, { useEffect, useState } from "react";
import { AdminAPI } from "../components/adminapi";
import { getAuth, logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function AdminPortal() {
    const nav = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [draft, setDraft] = useState({ email: "", passwordHash: "", isActive: true, isAdmin: false });

    useEffect(() => {
        const auth = getAuth();
        if (!auth || !auth.token) {
            nav("/login");
            return;
        }
        if (auth?.user?.email !== "admin@example.com" && !auth?.user?.isAdmin) {
            nav("/");
            return;
        }
        load();
    }, []);

    async function load() {
        try {
            setLoading(true);
            setErr("");
            const data = await AdminAPI.listAccounts();
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
            await AdminAPI.createAccount(draft);
            setDraft({ email: "", passwordHash: "", isActive: true, isAdmin: false });
            await load();
        } catch (e) {
            setErr(e?.response?.data || e?.message || "Create failed");
        }
    }

    async function onUpdate(row) {
        try {
            setErr("");
            await AdminAPI.updateAccount(row.accountId, row);
            await load();
        } catch (e) {
            setErr(e?.response?.data || e?.message || "Update failed");
        }
    }

    async function onDelete(id) {
        if (!window.confirm("Delete this account?")) return;
        try {
            setErr("");
            await AdminAPI.deleteAccount(id);
            await load();
        } catch (e) {
            setErr(e?.response?.data || e?.message || "Delete failed");
        }
    }

    function setRowField(id, field, value) {
        setRows(prev => prev.map(r => (r.accountId === id ? { ...r, [field]: value } : r)));
    }

    return (
        <div style={{ padding: 24 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Admin Portal — Accounts</h2>

                <div>
                    <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => nav("/postadmin")}
                    >
                        Manage Posts
                    </button>
                    <button className="btn btn-outline-secondary me-2" onClick={load} disabled={loading}>
                        {loading ? "Loading..." : "Refresh"}
                    </button>
                    {/* <button className="btn btn-outline-danger" onClick={() => { logout(); nav("/login"); }}>
                        Sign out
                    </button> */}
                </div>
            </div>

            {err && <div className="alert alert-danger">{String(err)}</div>}

            <form onSubmit={onCreate} className="card p-3 mb-4">
                <h5 className="mb-3">Create account (quick)</h5>
                <div className="row g-2">
                    <div className="col-md-4">
                        <input className="form-control" placeholder="Email" value={draft.email}
                            onChange={e => setDraft(d => ({ ...d, email: e.target.value }))} required />
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" placeholder="Password hash or leave empty"
                            value={draft.passwordHash}
                            onChange={e => setDraft(d => ({ ...d, passwordHash: e.target.value }))} />
                    </div>
                    <div className="col-md-2 form-check ms-2">
                        <input type="checkbox" className="form-check-input" id="dActive"
                            checked={draft.isActive}
                            onChange={e => setDraft(d => ({ ...d, isActive: e.target.checked }))} />
                        <label className="form-check-label" htmlFor="dActive">Active</label>
                    </div>
                    <div className="col-md-2 form-check">
                        <input type="checkbox" className="form-check-input" id="dAdmin"
                            checked={draft.isAdmin}
                            onChange={e => setDraft(d => ({ ...d, isAdmin: e.target.checked }))} />
                        <label className="form-check-label" htmlFor="dAdmin">Admin</label>
                    </div>
                </div>
                <div className="mt-2">
                    <button className="btn btn-primary" disabled={loading}>Create</button>
                </div>
            </form>

            <div className="table-responsive card p-0">
                <table className="table table-striped table-hover mb-0 align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th className="text-black">ID</th>
                            <th className="text-black">Email</th>
                            <th className="text-black">Active</th>
                            <th className="text-black">Admin</th>
                            <th className="text-black">Created</th>
                            <th className="text-black">Last login</th>
                            <th className="text-black"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(r => (
                            <tr key={r.accountId}>
                                <td className="text-black">{r.accountId}</td>
                                <td>
                                    <input className="form-control form-control-sm"
                                        value={r.email || ""}
                                        onChange={(e) => setRowField(r.accountId, "email", e.target.value)} />
                                </td>
                                <td>
                                    <input type="checkbox"
                                        checked={!!r.isActive}
                                        onChange={(e) => setRowField(r.accountId, "isActive", e.target.checked)} />
                                </td>
                                <td>
                                    <input type="checkbox"
                                        checked={!!r.isAdmin}
                                        onChange={(e) => setRowField(r.accountId, "isAdmin", e.target.checked)} />
                                </td>
                                <td className="text-black">{r.createdAt || "-"}</td>
                                <td className="text-black">{r.lastLogin || "-"}</td>
                                <td className="text-nowrap">
                                    <button className="btn btn-sm btn-outline-success me-2" onClick={() => onUpdate(r)}>
                                        Save
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(r.accountId)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && !loading && (
                            <tr><td colSpan="7" className="text-center py-4">No data</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
