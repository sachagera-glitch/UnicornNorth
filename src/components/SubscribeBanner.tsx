"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SubscribeBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        // Try to parse JSON error, but fall back if server returned HTML
        let msg = "Something went wrong. Please try again.";
        try {
          const data = await res.json();
          if (data.error) msg = data.error;
        } catch { /* non-JSON response (e.g. HTML error page) */ }
        setErrorMsg(msg);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="subscribe-banner">
        <div className="subscribe-inner subscribe-success">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4ADE80"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "var(--white)",
            }}
          >
            You&apos;re in — updates coming soon
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="subscribe-banner">
      <div className="subscribe-inner">
        {/* Left: headline */}
        <div className="subscribe-headline">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--cream)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="subscribe-icon"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
          </svg>
          <span className="subscribe-title">
            Stay informed on Canada&apos;s tech ecosystem
          </span>
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} className="subscribe-form">
          <div className="subscribe-input-wrap">
            <input
              id="subscribe-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              className="subscribe-input"
              required
              aria-label="Email address"
              autoComplete="email"
            />
            <button
              type="submit"
              className="subscribe-btn"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <span className="subscribe-spinner" />
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
          {status === "error" && (
            <p className="subscribe-error">{errorMsg}</p>
          )}
          <p className="subscribe-disclaimer">
            Occasional updates only. No spam, unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
}
