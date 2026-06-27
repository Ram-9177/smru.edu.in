"use client";

import React, { useEffect, useState } from "react";
import DeveloperDashboardClient from "@/components/developer/DeveloperDashboardClient";

const AUTH_KEY = "smru_developer_auth_v1";
const AUTH_USER = "Stmarys University";
const AUTH_PASS = "Stmarys University@9177";

export default function DeveloperAccessGate() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = window.sessionStorage.getItem(AUTH_KEY);
    if (saved === "1") setAuthenticated(true);
  }, []);

  if (authenticated) {
    return <DeveloperDashboardClient />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 16px",
        background:
          "radial-gradient(circle at top left, #e8f6ff 0%, rgba(232,246,255,0) 42%), #f7f9fc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          margin: "0 auto",
          borderRadius: 24,
          border: "1px solid #e2e8f0",
          background: "#fff",
          padding: 24,
          boxShadow: "0 8px 30px rgba(13,49,92,0.08)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "#019e6e" }}>
          Internal Access
        </p>
        <h1 style={{ margin: "8px 0 0", fontSize: 40, lineHeight: 1.1, fontWeight: 900, color: "#0d315c", fontFamily: "Outfit, Inter, sans-serif" }}>
          Stmarys University Developer CMS
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: 14, color: "#64748b" }}>
          Enter credentials to open the internal CMS panel.
        </p>

        <form
          style={{ marginTop: 20, display: "grid", gap: 12 }}
          onSubmit={async (event) => {
            event.preventDefault();

            const normalizedUser = username.trim().toUpperCase();
            const normalizedPass = password.trim();

            if (normalizedUser === AUTH_USER && normalizedPass === AUTH_PASS) {
              window.sessionStorage.setItem(AUTH_KEY, "1");
              setAuthenticated(true);
              setError("");
              setSubmitting(true);
              window.setTimeout(() => {
                window.location.replace("/developer");
              }, 50);
              return;
            }
            setError("Invalid username or password");
            setSubmitting(false);
          }}
        >
          <label style={{ display: "block" }}>
            <span style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
              Username
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 12,
                border: "1px solid #cbd5e1",
                padding: "10px 12px",
                fontSize: 14,
                outline: "none",
              }}
              autoComplete="username"
            />
          </label>

          <label style={{ display: "block" }}>
            <span style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 12,
                border: "1px solid #cbd5e1",
                padding: "10px 12px",
                fontSize: 14,
                outline: "none",
              }}
              autoComplete="current-password"
            />
          </label>

          {error && <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#e11d48" }}>{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              borderRadius: 12,
              background: "#0d315c",
              color: "#fff",
              border: 0,
              padding: "11px 12px",
              fontSize: 12,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              cursor: "pointer",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? "Opening..." : "Open Developer CMS"}
          </button>
        </form>
      </div>
    </div>
  );
}
