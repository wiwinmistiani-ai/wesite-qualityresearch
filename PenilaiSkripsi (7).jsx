import React, { useState, useRef } from "react";
import mammoth from "mammoth";
import {
  LogIn,
  FileText,
  Stamp,
  ChevronRight,
  ChevronDown,
  Loader2,
  ClipboardList,
  LogOut,
  ArrowLeft,
  AlertCircle,
  UploadCloud,
  FileCheck2,
  X,
  UserPlus,
  User,
  Lock,
  GraduationCap,
  Building2,
  Download,
  ShieldAlert,
} from "lucide-react";

// ————————————————————————————————————————————
// Design tokens
// paper: #EDEEE7  ink: #1F2937  burgundy: #7A2331  brass: #A6832E  line: #C9CABF
// ————————————————————————————————————————————

// Institution logo (embedded so the app has no external asset dependency)
const LOGO_DATA_URI = "data:image/jpeg;base64,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";

const SECTIONS = [
  "Abstract",
  "Introduction",
  "Literature Review",
  "Research Methods",
  "Results and Discussion",
  "Conclusion",
];

// Sections evaluated specifically for PROPOSAL manuscripts (thesis/dissertation)
// — a proposal does not yet have research results or a final conclusion.
const PROPOSAL_SECTIONS = [
  "Background of the Problem",
  "Problem Statement and Research Objectives",
  "Literature Review and Theoretical Framework",
  "Conceptual Framework and Hypothesis",
  "Planned Research Methods",
];

const JENIS_OPTIONS = [
  "Undergraduate Thesis",
  "Master's Thesis",
  "Dissertation",
  "Journal Article",
  "Undergraduate Thesis Proposal",
  "Master's Thesis Proposal",
  "Dissertation Proposal",
];

function isProposalJenis(jenis = "") {
  return /proposal/i.test(jenis.trim());
}

function getSectionsForJenis(jenis) {
  return isProposalJenis(jenis) ? PROPOSAL_SECTIONS : SECTIONS;
}

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

function Stationery() {
  return (
    <style>{`
      ${FONT_IMPORT}
      .font-display { font-family: 'Lora', serif; }
      .font-body { font-family: 'Inter', sans-serif; }
      .font-mono { font-family: 'IBM Plex Mono', monospace; }
      .paper-texture {
        background-image:
          repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(122,35,49,0.035) 28px),
          radial-gradient(ellipse at top left, rgba(166,131,46,0.06), transparent 55%);
      }
      @keyframes stampIn {
        0% { transform: scale(2.4) rotate(-18deg); opacity: 0; }
        55% { transform: scale(0.92) rotate(-8deg); opacity: 1; }
        75% { transform: scale(1.06) rotate(-10deg); }
        100% { transform: scale(1) rotate(-9deg); opacity: 1; }
      }
      .stamp-anim { animation: stampIn 0.55s cubic-bezier(.2,.9,.3,1.2) both; }
      @keyframes fadeUp {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .fade-up { animation: fadeUp 0.4s ease both; }
      ::selection { background: #7A2331; color: #EDEEE7; }
      .focus-ring:focus-visible { outline: 2px solid #7A2331; outline-offset: 2px; }
      .dropzone-active { background: #F0E9E4 !important; border-color: #7A2331 !important; }
      @media (prefers-reduced-motion: reduce) {
        .stamp-anim, .fade-up { animation: none !important; }
      }
    `}</style>
  );
}

// ————————————————————————————————————————————
// File reading helpers
// ————————————————————————————————————————————
async function extractTextFromFile(file) {
  const nameLower = file.name.toLowerCase();

  if (nameLower.endsWith(".docx")) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  if (nameLower.endsWith(".txt") || nameLower.endsWith(".md")) {
    return await file.text();
  }

  if (nameLower.endsWith(".pdf")) {
    throw new Error("PDF format is not yet supported for automatic extraction. Please upload a .docx or .txt file, or paste the text manually.");
  }

  if (nameLower.endsWith(".doc")) {
    throw new Error("The legacy .doc format is not supported. Please re-save the file as .docx and upload it again.");
  }

  throw new Error("Unrecognized file type. Use .docx or .txt.");
}

// ————————————————————————————————————————————
// AI evaluation call — evaluates the full manuscript per section
// ————————————————————————————————————————————
async function evaluateWithAI({ judul, jenis, teks, mahasiswa }) {
  const sections = getSectionsForJenis(jenis);
  const proposal = isProposalJenis(jenis);

  const sys = `You are a senior academic review team helping a lecturer assess the quality of a ${
    proposal
      ? "PROPOSAL manuscript for a thesis/dissertation (this manuscript does not yet include a results chapter or final conclusion, since the research has not been carried out yet)"
      : "student's thesis/dissertation manuscript or journal article"
  } SECTION BY SECTION. You will receive the full manuscript; your task is to identify and assess the following sections if present in the manuscript:
${sections.map((s) => `- ${s}`).join("\n")}

For each section: if it is indeed present in the manuscript (even if the heading is slightly different, e.g. "Background" counts as Introduction, or "Methodology" counts as Research Methods, or "Results and Findings" counts as Results and Discussion), assess its quality. If a section is NOT found anywhere in the manuscript, mark found:false, score:null, and give one recommendation that the section needs to be added.

Reply with ONLY valid JSON, no markdown, no opening/closing text, with EXACTLY this structure:
{
  "overall_score": <number 0-100>,
  "overall_category": "<Excellent | Good | Fair | Needs Improvement | Poor>",
  "summary_note": "one to two sentences summarizing the overall assessment of the manuscript",
  "sections": [
    {
      "name": "<one of the section names above, exactly as written>",
      "found": <true/false>,
      "score": <number 0-100 or null if not found>,
      "strengths": ["short strength point", "..."],
      "recommendations": ["short, actionable improvement recommendation", "..."]
    }
  ]
}
The "sections" array must contain all ${sections.length} section names above exactly in the same order, no more, no less.`;

  const identitasMhs = mahasiswa
    ? `Identity of the student being assessed:
Name: ${mahasiswa.nama || "-"}
Student ID: ${mahasiswa.nim || "-"}
Study Program: ${mahasiswa.prodi || "-"}
University: ${mahasiswa.universitas || "-"}

`
    : "";

  const userMsg = `${identitasMhs}Document type: ${jenis}
Title: ${judul}

Full manuscript to be assessed section by section:
"""
${teks}
"""`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: sys,
      messages: [{ role: "user", content: userMsg }],
    }),
  });

  if (!response.ok) throw new Error("Failed to reach the AI assessment service.");
  const data = await response.json();
  const textBlock = (data.content || []).find((b) => b.type === "text");
  if (!textBlock) throw new Error("The AI response contained no text.");
  const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);
  return parsed;
}

// ————————————————————————————————————————————
// Export the final assessment result to a Word (.doc) file
// Uses the browser's built-in HTML-to-Word technique (no external dependency)
// ————————————————————————————————————————————
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildResultDocHtml(record) {
  const m = record.mahasiswa || {};
  const sectionsHtml = (record.sections || [])
    .map((b) => {
      const strengths = (b.strengths || [])
        .map((k) => `<li>${escapeHtml(k)}</li>`)
        .join("");
      const recommendations = (b.recommendations || [])
        .map((r) => `<li>${escapeHtml(r)}</li>`)
        .join("");
      return `
        <tr>
          <td style="border:1px solid #999;padding:8px;vertical-align:top;width:22%;"><b>${escapeHtml(b.name)}</b>${
        !b.found ? '<br/><i style="color:#7A2331;">Not found in manuscript</i>' : ""
      }</td>
          <td style="border:1px solid #999;padding:8px;text-align:center;vertical-align:top;width:10%;">${
            b.score === null || b.score === undefined ? "—" : b.score
          }</td>
          <td style="border:1px solid #999;padding:8px;vertical-align:top;">
            ${strengths ? `<b>Strengths:</b><ul>${strengths}</ul>` : ""}
            ${recommendations ? `<b>Recommendations for Improvement:</b><ul>${recommendations}</ul>` : ""}
          </td>
        </tr>`;
    })
    .join("");

  return `
<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${escapeHtml(record.judul)}</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
</w:WordDocument>
</xml>
<![endif]-->
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #1F2937; }
  h1 { font-size: 16pt; color: #7A2331; margin-bottom: 2px; }
  h2 { font-size: 13pt; color: #1F2937; margin-top: 22px; margin-bottom: 6px; border-bottom: 1px solid #C9CABF; padding-bottom: 4px;}
  table { border-collapse: collapse; width: 100%; margin-top: 8px; }
  .label { font-size: 9pt; text-transform: uppercase; letter-spacing: 1px; color: #A6832E; }
  .idtable td { padding: 3px 8px 3px 0; vertical-align: top; }
  .skorbox { display:inline-block; border:3px solid ${categoryColor(record.overall_category)}; color:${categoryColor(
    record.overall_category
  )}; border-radius:50%; width:70px; height:70px; text-align:center; line-height:70px; font-size:20pt; font-weight:bold; }
</style>
</head>
<body>
  <p class="label">Final Assessment Result Sheet</p>
  <h1>${escapeHtml(record.judul)}</h1>
  <p>${escapeHtml(record.jenis)} &middot; Assessed on ${escapeHtml(record.tanggal)}</p>

  <h2>Student Identity</h2>
  <table class="idtable">
    <tr><td><b>Name</b></td><td>: ${escapeHtml(m.nama || "-")}</td></tr>
    <tr><td><b>Student ID</b></td><td>: ${escapeHtml(m.nim || "-")}</td></tr>
    <tr><td><b>Study Program</b></td><td>: ${escapeHtml(m.prodi || "-")}</td></tr>
    <tr><td><b>University</b></td><td>: ${escapeHtml(m.universitas || "-")}</td></tr>
  </table>

  <h2>Overall Score</h2>
  <p><span class="skorbox">${record.overall_score}</span>
     &nbsp;&nbsp;<b>${escapeHtml(record.overall_category || "")}</b><br/>
     ${escapeHtml(record.summary_note || "")}</p>

  <h2>Section-by-Section Assessment Details</h2>
  <table>
    <thead>
      <tr>
        <th style="border:1px solid #999;padding:8px;background:#EDEEE7;">Section</th>
        <th style="border:1px solid #999;padding:8px;background:#EDEEE7;">Score</th>
        <th style="border:1px solid #999;padding:8px;background:#EDEEE7;">Strengths &amp; Recommendations</th>
      </tr>
    </thead>
    <tbody>
      ${sectionsHtml}
    </tbody>
  </table>

  <p style="margin-top:30px;font-size:9pt;color:#9CA3AF;">This document was automatically generated by the Academic Reviewer's Desk &mdash; Thesis &amp; Article Assessor.${
    record.dosen ? ` Assessed by ${escapeHtml(record.dosen)}.` : ""
  }</p>
</body>
</html>`;
}

function buildResultDownloadHref(record) {
  const html = buildResultDocHtml(record);
  // A data URI is used (instead of a Blob + programmatic click) because some
  // browser/sandbox environments block programmatic download triggers. With a data URI,
  // the <a download> link is real and clicked directly by the user, making it far more reliable.
  return `data:application/msword;charset=utf-8,${encodeURIComponent(html)}`;
}

function resultFileName(record) {
  const safeTitle = (record.judul || "assessment-result").replace(/[^a-z0-9]+/gi, "_").slice(0, 60);
  return `Assessment_${safeTitle}.doc`;
}

// ————————————————————————————————————————————
// Small shared bits
// ————————————————————————————————————————————
function categoryColor(category = "") {
  if (/excellent/i.test(category)) return "#2F6B4F";
  if (/^good/i.test(category)) return "#3E7C57";
  if (/fair/i.test(category)) return "#A6832E";
  if (!category) return "#9CA3AF";
  return "#7A2331";
}

function ScoreStamp({ score, size = "md" }) {
  const dims = size === "sm" ? "w-11 h-11 text-sm" : "w-20 h-20 text-2xl";
  if (score === null || score === undefined) {
    return (
      <span
        className={`inline-flex items-center justify-center ${dims} rounded-full border-2 border-dashed font-mono font-semibold shrink-0`}
        style={{ borderColor: "#C9CABF", color: "#9CA3AF" }}
      >
        —
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center justify-center ${dims} rounded-full border-2 font-mono font-semibold shrink-0`}
      style={{ borderColor: categoryColor(score >= 80 ? "Excellent" : score >= 65 ? "Good" : score >= 50 ? "Fair" : "Poor"), color: categoryColor(score >= 80 ? "Excellent" : score >= 65 ? "Good" : score >= 50 ? "Fair" : "Poor"), transform: "rotate(-6deg)" }}
    >
      {score}
    </span>
  );
}

// ————————————————————————————————————————————
// Authentication: shared account storage
// ————————————————————————————————————————————
const ACCOUNTS_KEY = "penilai-accounts-v1";

// Simple hash used only to avoid storing plain-text passwords in storage.
// Note: this is NOT production-grade encryption.
function simpleHash(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return str;
  }
}

async function loadAccounts() {
  try {
    const res = await window.storage.get(ACCOUNTS_KEY, true);
    return res?.value ? JSON.parse(res.value) : {};
  } catch {
    return {};
  }
}

async function saveAccounts(accounts) {
  await window.storage.set(ACCOUNTS_KEY, JSON.stringify(accounts), true);
}

// ————————————————————————————————————————————
// Login / Register page
// ————————————————————————————————————————————
function AuthPage({ onAuthenticated }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [namaDosen, setNamaDosen] = useState("");
  const [nip, setNip] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const switchMode = (next) => {
    setMode(next);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  const submitLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!username.trim() || !password) {
      setError("Username and password are required.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const accounts = await loadAccounts();
      const key = username.trim().toLowerCase();
      const acc = accounts[key];
      if (!acc || acc.passwordHash !== simpleHash(password)) {
        setError("Incorrect username or password.");
        return;
      }
      onAuthenticated({ username: key, nama: acc.nama, nip: acc.nip || "" });
    } catch {
      setError("Failed to verify account. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const submitRegister = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!username.trim() || !password || !namaDosen.trim()) {
      setError("Username, password, and lecturer name are required.");
      return;
    }
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password confirmation does not match.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      const accounts = await loadAccounts();
      const key = username.trim().toLowerCase();
      if (accounts[key]) {
        setError("Username already registered. Use a different username or sign in.");
        return;
      }
      const nextAccounts = {
        ...accounts,
        [key]: {
          passwordHash: simpleHash(password),
          nama: namaDosen.trim(),
          nip: nip.trim(),
        },
      };
      await saveAccounts(nextAccounts);
      onAuthenticated({ username: key, nama: namaDosen.trim(), nip: nip.trim() });
    } catch {
      setError("Failed to register account. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const submit = mode === "login" ? submitLogin : submitRegister;
  const handleKeyDown = (e) => {
    if (e.key === "Enter") submit(e);
  };

  return (
    <div className="min-h-screen paper-texture flex items-center justify-center px-6" style={{ background: "#EDEEE7" }}>
      <div className="w-full max-w-md fade-up">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 overflow-hidden border p-1.5"
            style={{ background: "#FFFFFF", borderColor: "#C9CABF" }}
          >
            <img src={LOGO_DATA_URI} alt="UIN Datokarama Palu logo" className="w-full h-full object-contain" />
          </div>
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase mb-2" style={{ color: "#A6832E" }}>
            Academic Reviewer's Desk
          </p>
          <h1 className="font-display text-3xl font-semibold" style={{ color: "#1F2937" }}>
            Thesis &amp; Article Assessor
          </h1>
          <p className="font-body text-sm mt-2" style={{ color: "#4B5563" }}>
            {mode === "login" ? "Sign in to start assessing student manuscripts with AI assistance." : "Register as a new lecturer/reviewer."}
          </p>
        </div>

        <div className="border rounded-sm p-8" style={{ background: "#F7F7F2", borderColor: "#C9CABF" }}>
          <div className="flex mb-6 border rounded-sm overflow-hidden" style={{ borderColor: "#C9CABF" }}>
            <button
              type="button"
              onClick={() => switchMode("login")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 font-body text-sm font-medium focus-ring"
              style={{ background: mode === "login" ? "#1F2937" : "transparent", color: mode === "login" ? "#EDEEE7" : "#1F2937" }}
            >
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 font-body text-sm font-medium focus-ring"
              style={{ background: mode === "register" ? "#1F2937" : "transparent", color: mode === "register" ? "#EDEEE7" : "#1F2937" }}
            >
              <UserPlus className="w-3.5 h-3.5" /> Register
            </button>
          </div>

          {mode === "register" && (
            <>
              <label className="block font-mono text-[11px] tracking-widest uppercase mb-1" style={{ color: "#4B5563" }}>
                Lecturer Name
              </label>
              <input
                className="w-full font-body text-sm px-3 py-2.5 mb-4 bg-transparent border rounded-sm focus-ring"
                style={{ borderColor: "#C9CABF", color: "#1F2937" }}
                placeholder="Dr. Ayu Kartika, M.Pd."
                value={namaDosen}
                onChange={(e) => setNamaDosen(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </>
          )}

          <label className="block font-mono text-[11px] tracking-widest uppercase mb-1" style={{ color: "#4B5563" }}>
            Username
          </label>
          <input
            className="w-full font-body text-sm px-3 py-2.5 mb-4 bg-transparent border rounded-sm focus-ring"
            style={{ borderColor: "#C9CABF", color: "#1F2937" }}
            placeholder="ayu.kartika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            autoCapitalize="none"
          />

          <label className="block font-mono text-[11px] tracking-widest uppercase mb-1" style={{ color: "#4B5563" }}>
            Password
          </label>
          <input
            type="password"
            className="w-full font-body text-sm px-3 py-2.5 mb-4 bg-transparent border rounded-sm focus-ring"
            style={{ borderColor: "#C9CABF", color: "#1F2937" }}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {mode === "register" && (
            <>
              <label className="block font-mono text-[11px] tracking-widest uppercase mb-1" style={{ color: "#4B5563" }}>
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full font-body text-sm px-3 py-2.5 mb-4 bg-transparent border rounded-sm focus-ring"
                style={{ borderColor: "#C9CABF", color: "#1F2937" }}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <label className="block font-mono text-[11px] tracking-widest uppercase mb-1" style={{ color: "#4B5563" }}>
                Staff ID / Institution ID <span style={{ color: "#9CA3AF" }}>(optional)</span>
              </label>
              <input
                className="w-full font-body text-sm px-3 py-2.5 mb-2 bg-transparent border rounded-sm focus-ring"
                style={{ borderColor: "#C9CABF", color: "#1F2937" }}
                placeholder="19800101 200501 2 001"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </>
          )}

          {mode === "register" && (
            <div className="flex items-start gap-2 mt-3 mb-1 text-xs font-body" style={{ color: "#9CA3AF" }}>
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Accounts are stored in this app's shared storage for demo/internal purposes only, not a production-grade authentication system.</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 mt-3 mb-2 text-sm font-body" style={{ color: "#7A2331" }}>
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={busy}
            className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-sm font-body text-sm font-medium transition-opacity hover:opacity-90 focus-ring cursor-pointer disabled:opacity-60"
            style={{ background: "#1F2937", color: "#EDEEE7" }}
          >
            {busy ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : mode === "login" ? (
              <>
                <LogIn className="w-4 h-4" /> Sign In to Workbench
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" /> Register &amp; Sign In
              </>
            )}
          </button>
        </div>

        <p className="text-center font-mono text-[10px] tracking-widest uppercase mt-6" style={{ color: "#9CA3AF" }}>
          This draft is confidential &amp; intended for internal review purposes only
        </p>
      </div>
    </div>
  );
}

// ————————————————————————————————————————————
// Shared header/nav
// ————————————————————————————————————————————
function TopBar({ nama, page, setPage, onLogout, count }) {
  return (
    <div className="border-b sticky top-0 z-10" style={{ background: "#EDEEE7", borderColor: "#C9CABF" }}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border p-1"
            style={{ background: "#FFFFFF", borderColor: "#C9CABF" }}
          >
            <img src={LOGO_DATA_URI} alt="UIN Datokarama Palu logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="font-display text-base font-semibold leading-none" style={{ color: "#1F2937" }}>
              Thesis &amp; Article Assessor
            </p>
            <p className="font-mono text-[10px] tracking-widest uppercase mt-1" style={{ color: "#A6832E" }}>
              {nama}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage("assess")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-body text-sm focus-ring"
            style={{
              background: page === "assess" ? "#1F2937" : "transparent",
              color: page === "assess" ? "#EDEEE7" : "#1F2937",
            }}
          >
            <FileText className="w-3.5 h-3.5" /> Assess Manuscript
          </button>
          <button
            onClick={() => setPage("results")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-body text-sm focus-ring"
            style={{
              background: page === "results" ? "#1F2937" : "transparent",
              color: page === "results" ? "#EDEEE7" : "#1F2937",
            }}
          >
            <ClipboardList className="w-3.5 h-3.5" /> Assessment Results
            {count > 0 && (
              <span className="font-mono text-[10px] px-1.5 rounded-full" style={{ background: "#A6832E", color: "#EDEEE7" }}>
                {count}
              </span>
            )}
          </button>
          <button onClick={onLogout} className="ml-2 p-2 rounded-sm hover:opacity-70 focus-ring" title="Sign out">
            <LogOut className="w-4 h-4" style={{ color: "#4B5563" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ————————————————————————————————————————————
// Section result card (used in Assess result panel)
// ————————————————————————————————————————————
function SectionCard({ bagian }) {
  const [open, setOpen] = useState(false);
  const hasNotes = (bagian.strengths?.length || 0) + (bagian.recommendations?.length || 0) > 0;

  return (
    <div className="border rounded-sm" style={{ borderColor: "#C9CABF" }}>
      <button
        type="button"
        onClick={() => hasNotes && setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left focus-ring"
        style={{ cursor: hasNotes ? "pointer" : "default" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <ScoreStamp score={bagian.score} size="sm" />
          <div className="min-w-0">
            <p className="font-body text-sm font-medium truncate" style={{ color: "#1F2937" }}>{bagian.name}</p>
            {!bagian.found && (
              <p className="font-mono text-[10px] uppercase tracking-wide" style={{ color: "#7A2331" }}>Not found in manuscript</p>
            )}
          </div>
        </div>
        {hasNotes && (
          <ChevronDown className="w-4 h-4 shrink-0 transition-transform" style={{ color: "#4B5563", transform: open ? "rotate(180deg)" : "none" }} />
        )}
      </button>
      {open && hasNotes && (
        <div className="px-3 pb-3 pt-1 border-t" style={{ borderColor: "#EDEEE7" }}>
          {bagian.strengths?.length > 0 && (
            <div className="mb-2">
              <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: "#A6832E" }}>Strengths</p>
              <ul className="space-y-0.5">
                {bagian.strengths.map((k, i) => (
                  <li key={i} className="font-body text-xs flex gap-1.5" style={{ color: "#1F2937" }}>
                    <span style={{ color: "#A6832E" }}>+</span> {k}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {bagian.recommendations?.length > 0 && (
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: "#7A2331" }}>Recommendations for Improvement</p>
              <ul className="space-y-0.5">
                {bagian.recommendations.map((r, i) => (
                  <li key={i} className="font-body text-xs flex gap-1.5" style={{ color: "#1F2937" }}>
                    <span style={{ color: "#7A2331" }}>—</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ————————————————————————————————————————————
// Assessment page
// ————————————————————————————————————————————
function AssessPage({ onSaved, goResults, dosen }) {
  const [judul, setJudul] = useState("");
  const [jenis, setJenis] = useState("Undergraduate Thesis");
  const [teks, setTeks] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [showManualPaste, setShowManualPaste] = useState(false);
  const fileInputRef = useRef(null);

  // Identity of the student whose manuscript is being assessed
  const [mhsNama, setMhsNama] = useState("");
  const [mhsNim, setMhsNim] = useState("");
  const [mhsProdi, setMhsProdi] = useState("");
  const [mhsUniversitas, setMhsUniversitas] = useState("");

  const identitasLengkap =
    mhsNama.trim().length > 0 && mhsNim.trim().length > 0 && mhsProdi.trim().length > 0 && mhsUniversitas.trim().length > 0;

  const canSubmit = judul.trim().length > 0 && identitasLengkap && teks.trim().length > 100 && !loading && !parsing;

  const handleFile = async (file) => {
    if (!file) return;
    setError("");
    setParsing(true);
    setTeks("");
    setFileName("");
    try {
      const extracted = await extractTextFromFile(file);
      if (!extracted || extracted.trim().length < 50) {
        throw new Error("Too little text was extracted. Make sure the file contains the full manuscript.");
      }
      setTeks(extracted);
      setFileName(file.name);
    } catch (err) {
      setError(err.message || "Failed to read file.");
    } finally {
      setParsing(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const clearFile = () => {
    setTeks("");
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!canSubmit) {
      if (!identitasLengkap) setError("Please complete the student's identity (Name, Student ID, Study Program, University) first.");
      else if (teks.trim().length <= 100) setError("Upload the full manuscript (or paste it manually) first — at least a few paragraphs so each section can be assessed.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    const mahasiswa = {
      nama: mhsNama.trim(),
      nim: mhsNim.trim(),
      prodi: mhsProdi.trim(),
      universitas: mhsUniversitas.trim(),
    };
    try {
      const evalResult = await evaluateWithAI({ judul, jenis, teks, mahasiswa });
      const record = {
        id: Date.now(),
        judul: judul.trim(),
        jenis,
        fileName,
        mahasiswa,
        dosen,
        tanggal: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
        ...evalResult,
      };
      setResult(record);
      onSaved(record);
    } catch (err) {
      setError(err.message || "An error occurred while assessing the manuscript. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setJudul("");
    setMhsNama("");
    setMhsNim("");
    setMhsProdi("");
    setMhsUniversitas("");
    clearFile();
    setResult(null);
    setError("");
    setShowManualPaste(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8 fade-up">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase mb-1" style={{ color: "#A6832E" }}>
          Review Desk — 01
        </p>
        <h2 className="font-display text-2xl font-semibold" style={{ color: "#1F2937" }}>
          New Manuscript to Assess
        </h2>
        <p className="font-body text-sm mt-1" style={{ color: "#4B5563" }}>
          Upload the full manuscript (.docx or .txt). The AI will recognize and assess each section separately: Abstract, Introduction, Literature Review, Methods, Results &amp; Discussion, and Conclusion.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 border rounded-sm p-6 fade-up" style={{ background: "#F7F7F2", borderColor: "#C9CABF" }}>
          <div className="flex gap-3 mb-5">
            <div className="flex-1">
              <label className="block font-mono text-[11px] tracking-widest uppercase mb-1" style={{ color: "#4B5563" }}>
                Manuscript Title
              </label>
              <input
                className="w-full font-body text-sm px-3 py-2.5 bg-transparent border rounded-sm focus-ring"
                style={{ borderColor: "#C9CABF", color: "#1F2937" }}
                placeholder="The Effect of ... on ..."
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
              />
            </div>
            <div className="w-40">
              <label className="block font-mono text-[11px] tracking-widest uppercase mb-1" style={{ color: "#4B5563" }}>
                Type
              </label>
              <select
                className="w-full font-body text-sm px-3 py-2.5 bg-transparent border rounded-sm focus-ring"
                style={{ borderColor: "#C9CABF", color: "#1F2937" }}
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
              >
                {JENIS_OPTIONS.map((j) => (
                  <option key={j}>{j}</option>
                ))}
              </select>
            </div>
          </div>

          {isProposalJenis(jenis) && (
            <div className="flex items-start gap-2 mb-5 text-xs font-body px-3 py-2 rounded-sm border" style={{ borderColor: "#A6832E", color: "#7A2937", background: "#F0E9E4" }}>
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "#A6832E" }} />
              <span>Proposal manuscripts are assessed based on: Background, Problem Statement &amp; Objectives, Literature Review, Conceptual Framework/Hypothesis, and Planned Research Methods (no Results &amp; Conclusion yet).</span>
            </div>
          )}

          <div className="border rounded-sm p-4 mb-5" style={{ borderColor: "#C9CABF", background: "#FCFCFA" }}>
            <p className="font-mono text-[10px] tracking-widest uppercase mb-3 flex items-center gap-1.5" style={{ color: "#A6832E" }}>
              <GraduationCap className="w-3.5 h-3.5" /> Student Identity Being Assessed
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: "#4B5563" }}>Student Name</label>
                <input
                  className="w-full font-body text-sm px-3 py-2 bg-transparent border rounded-sm focus-ring"
                  style={{ borderColor: "#C9CABF", color: "#1F2937" }}
                  placeholder="Student's full name"
                  value={mhsNama}
                  onChange={(e) => setMhsNama(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: "#4B5563" }}>Student ID</label>
                <input
                  className="w-full font-body text-sm px-3 py-2 bg-transparent border rounded-sm focus-ring"
                  style={{ borderColor: "#C9CABF", color: "#1F2937" }}
                  placeholder="2201010001"
                  value={mhsNim}
                  onChange={(e) => setMhsNim(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: "#4B5563" }}>Study Program</label>
                <input
                  className="w-full font-body text-sm px-3 py-2 bg-transparent border rounded-sm focus-ring"
                  style={{ borderColor: "#C9CABF", color: "#1F2937" }}
                  placeholder="Islamic Religious Education"
                  value={mhsProdi}
                  onChange={(e) => setMhsProdi(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label className="block font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: "#4B5563" }}>University</label>
                <input
                  className="w-full font-body text-sm px-3 py-2 bg-transparent border rounded-sm focus-ring"
                  style={{ borderColor: "#C9CABF", color: "#1F2937" }}
                  placeholder="UIN Datokarama Palu"
                  value={mhsUniversitas}
                  onChange={(e) => setMhsUniversitas(e.target.value)}
                />
              </div>
            </div>
          </div>

          <label className="block font-mono text-[11px] tracking-widest uppercase mb-1" style={{ color: "#4B5563" }}>
            Full Manuscript
          </label>

          {!fileName ? (
            <label
              htmlFor="naskah-file-input"
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={onDrop}
              style={{ borderColor: dragActive ? "#7A2331" : "#C9CABF", minHeight: "220px" }}
              className={`flex flex-col items-center justify-center text-center border-2 border-dashed rounded-sm px-4 py-10 cursor-pointer transition-colors ${dragActive ? "dropzone-active" : ""}`}
            >
              <input
                id="naskah-file-input"
                ref={fileInputRef}
                type="file"
                accept=".docx,.txt,.md"
                style={{ position: "absolute", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }}
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              {parsing ? (
                <>
                  <Loader2 className="w-8 h-8 mb-3 animate-spin" style={{ color: "#A6832E" }} />
                  <p className="font-body text-sm" style={{ color: "#4B5563" }}>Reading manuscript content...</p>
                </>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 mb-3" style={{ color: "#A6832E" }} />
                  <p className="font-body text-sm font-medium" style={{ color: "#1F2937" }}>Drag a file here, or click to select</p>
                  <p className="font-mono text-[10px] tracking-wide mt-1" style={{ color: "#9CA3AF" }}>Supports .docx and .txt</p>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowManualPaste(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowManualPaste(true);
                      }
                    }}
                    className="mt-4 font-mono text-[10px] tracking-widest uppercase underline underline-offset-2 focus-ring cursor-pointer"
                    style={{ color: "#7A2331" }}
                  >
                    or paste text manually
                  </span>
                </>
              )}
            </label>
          ) : (
            <div className="flex items-center justify-between border rounded-sm px-4 py-3" style={{ borderColor: "#C9CABF" }}>
              <div className="flex items-center gap-2 min-w-0">
                <FileCheck2 className="w-4 h-4 shrink-0" style={{ color: "#3E7C57" }} />
                <div className="min-w-0">
                  <p className="font-body text-sm font-medium truncate" style={{ color: "#1F2937" }}>{fileName}</p>
                  <p className="font-mono text-[10px]" style={{ color: "#9CA3AF" }}>{teks.trim().length.toLocaleString("en-US")} characters read</p>
                </div>
              </div>
              <button type="button" onClick={clearFile} className="p-1.5 rounded-sm hover:opacity-70 focus-ring shrink-0" title="Remove file">
                <X className="w-4 h-4" style={{ color: "#7A2331" }} />
              </button>
            </div>
          )}

          {showManualPaste && !fileName && (
            <div className="mt-3">
              <textarea
                className="w-full font-body text-sm px-3 py-2.5 bg-transparent border rounded-sm focus-ring resize-none"
                style={{ borderColor: "#C9CABF", color: "#1F2937", minHeight: "160px" }}
                placeholder="Paste the full manuscript here..."
                value={teks}
                onChange={(e) => setTeks(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit(e);
                }}
              />
              <p className="font-mono text-[10px] mt-1" style={{ color: "#9CA3AF" }}>{teks.trim().length.toLocaleString("en-US")} characters</p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 mt-4 text-sm font-body" style={{ color: "#7A2331" }}>
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={!canSubmit}
            className="w-full mt-5 flex items-center justify-center gap-2 py-2.5 rounded-sm font-body text-sm font-medium transition-opacity focus-ring disabled:opacity-50 cursor-pointer"
            style={{ background: "#7A2331", color: "#EDEEE7" }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Assessing each section...
              </>
            ) : (
              <>
                <Stamp className="w-4 h-4" /> Assess with AI
              </>
            )}
          </button>
        </div>

        <div className="md:col-span-2">
          {!result && !loading && (
            <div
              className="h-full border rounded-sm p-6 flex flex-col items-center justify-center text-center fade-up"
              style={{ borderColor: "#C9CABF", background: "transparent", minHeight: "260px" }}
            >
              <Stamp className="w-8 h-8 mb-3" style={{ color: "#C9CABF" }} />
              <p className="font-body text-sm" style={{ color: "#9CA3AF" }}>
                Section-by-section assessment results will appear here once the manuscript is assessed.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full border rounded-sm p-6 flex flex-col items-center justify-center text-center" style={{ borderColor: "#C9CABF", minHeight: "260px" }}>
              <Loader2 className="w-8 h-8 mb-3 animate-spin" style={{ color: "#A6832E" }} />
              <p className="font-body text-sm" style={{ color: "#4B5563" }}>The AI reviewer is reading each section of the manuscript...</p>
            </div>
          )}

          {result && !loading && (
            <div className="border rounded-sm p-5 fade-up" style={{ borderColor: "#C9CABF", background: "#F7F7F2" }}>
              <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#9CA3AF" }}>Overall Score</p>
              <p className="font-display text-base font-semibold mt-0.5" style={{ color: "#1F2937" }}>{result.judul}</p>
              {result.mahasiswa?.nama && (
                <p className="font-body text-xs mb-3" style={{ color: "#4B5563" }}>
                  {result.mahasiswa.nama} · Student ID {result.mahasiswa.nim} · {result.mahasiswa.prodi}
                </p>
              )}

              <div className="flex items-center gap-4 mb-4">
                <div
                  className="stamp-anim shrink-0 w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center"
                  style={{ borderColor: categoryColor(result.overall_category), color: categoryColor(result.overall_category), transform: "rotate(-9deg)" }}
                >
                  <span className="font-mono text-xl font-semibold leading-none">{result.overall_score}</span>
                  <span className="font-mono text-[7px] tracking-widest uppercase mt-0.5">/ 100</span>
                </div>
                <div>
                  <p className="font-body text-sm font-medium" style={{ color: categoryColor(result.overall_category) }}>{result.overall_category}</p>
                  <p className="font-body text-xs mt-1" style={{ color: "#4B5563" }}>{result.summary_note}</p>
                </div>
              </div>

              <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: "#A6832E" }}>Section-by-Section Assessment</p>
              <div className="space-y-2 mb-4 max-h-80 overflow-y-auto pr-1">
                {result.sections?.map((b, i) => (
                  <SectionCard key={i} bagian={b} />
                ))}
              </div>

              <a
                href={buildResultDownloadHref(result)}
                download={resultFileName(result)}
                className="w-full mb-2 flex items-center justify-center gap-1.5 py-2 rounded-sm font-body text-xs font-medium border focus-ring hover:opacity-80"
                style={{ borderColor: "#A6832E", color: "#A6832E" }}
              >
                <Download className="w-3.5 h-3.5" /> Download Final Assessment Result (.doc)
              </a>

              <div className="flex gap-2">
                <button onClick={reset} className="flex-1 py-2 rounded-sm font-body text-xs font-medium border focus-ring" style={{ borderColor: "#C9CABF", color: "#1F2937" }}>
                  Assess Another Manuscript
                </button>
                <button onClick={goResults} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-sm font-body text-xs font-medium focus-ring" style={{ background: "#1F2937", color: "#EDEEE7" }}>
                  View Results Table <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ————————————————————————————————————————————
// Results table page
// ————————————————————————————————————————————
function ResultsPage({ records, goAssess }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8 fade-up flex items-end justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase mb-1" style={{ color: "#A6832E" }}>
            Grade Book — Summary
          </p>
          <h2 className="font-display text-2xl font-semibold" style={{ color: "#1F2937" }}>
            Assessment Results
          </h2>
        </div>
        <button onClick={goAssess} className="flex items-center gap-1.5 font-body text-sm px-3 py-2 rounded-sm border focus-ring" style={{ borderColor: "#C9CABF", color: "#1F2937" }}>
          <ArrowLeft className="w-3.5 h-3.5" /> Assess new manuscript
        </button>
      </div>

      {records.length === 0 ? (
        <div className="border rounded-sm p-12 text-center fade-up" style={{ borderColor: "#C9CABF" }}>
          <ClipboardList className="w-8 h-8 mx-auto mb-3" style={{ color: "#C9CABF" }} />
          <p className="font-body text-sm" style={{ color: "#9CA3AF" }}>No manuscripts assessed yet. Start from the "Assess Manuscript" page.</p>
        </div>
      ) : (
        <div className="border rounded-sm overflow-hidden fade-up" style={{ borderColor: "#C9CABF" }}>
          <table className="w-full font-body text-sm">
            <thead>
              <tr style={{ background: "#1F2937" }}>
                <th className="text-left px-4 py-3 font-mono text-[10px] tracking-widest uppercase font-medium" style={{ color: "#EDEEE7" }}>Title</th>
                <th className="text-left px-4 py-3 font-mono text-[10px] tracking-widest uppercase font-medium" style={{ color: "#EDEEE7" }}>Student</th>
                <th className="text-left px-4 py-3 font-mono text-[10px] tracking-widest uppercase font-medium" style={{ color: "#EDEEE7" }}>Type</th>
                <th className="text-center px-4 py-3 font-mono text-[10px] tracking-widest uppercase font-medium" style={{ color: "#EDEEE7" }}>Score</th>
                <th className="text-left px-4 py-3 font-mono text-[10px] tracking-widest uppercase font-medium" style={{ color: "#EDEEE7" }}>Top Recommendation</th>
                <th className="text-center px-4 py-3 font-mono text-[10px] tracking-widest uppercase font-medium" style={{ color: "#EDEEE7" }}>Download</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, idx) => {
                const topRecommendation =
                  r.sections?.find((b) => b.recommendations?.length > 0)?.recommendations?.[0] || r.summary_note || "—";
                const totalRekomendasi = (r.sections || []).reduce((sum, b) => sum + (b.recommendations?.length || 0), 0);

                return (
                  <React.Fragment key={r.id}>
                    <tr
                      onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                      className="cursor-pointer transition-colors"
                      style={{
                        background: idx % 2 === 0 ? "#F7F7F2" : "#EDEEE7",
                        borderTop: "1px solid #C9CABF",
                      }}
                    >
                      <td className="px-4 py-3 align-top" style={{ color: "#1F2937" }}>
                        <p className="font-medium">{r.judul}</p>
                        <p className="font-mono text-[10px] mt-0.5" style={{ color: "#9CA3AF" }}>{r.tanggal}{r.fileName ? ` · ${r.fileName}` : ""}</p>
                      </td>
                      <td className="px-4 py-3 align-top" style={{ color: "#1F2937" }}>
                        <p className="font-medium">{r.mahasiswa?.nama || "—"}</p>
                        <p className="font-mono text-[10px] mt-0.5" style={{ color: "#9CA3AF" }}>{r.mahasiswa?.nim ? `Student ID ${r.mahasiswa.nim}` : ""}{r.mahasiswa?.prodi ? ` · ${r.mahasiswa.prodi}` : ""}</p>
                      </td>
                      <td className="px-4 py-3 align-top" style={{ color: "#4B5563" }}>{r.jenis}</td>
                      <td className="px-4 py-3 align-top text-center">
                        <ScoreStamp score={r.overall_score} size="sm" />
                      </td>
                      <td className="px-4 py-3 align-top" style={{ color: "#1F2937" }}>
                        {topRecommendation}
                        {totalRekomendasi > 1 && (
                          <span className="font-mono text-[10px] ml-1" style={{ color: "#A6832E" }}>
                            +{totalRekomendasi - 1} more
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top text-center">
                        <a
                          href={buildResultDownloadHref(r)}
                          download={resultFileName(r)}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex p-1.5 rounded-sm border hover:opacity-70 focus-ring"
                          style={{ borderColor: "#C9CABF", color: "#A6832E" }}
                          title="Download assessment result (.doc)"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                    {expanded === r.id && (
                      <tr style={{ background: idx % 2 === 0 ? "#F7F7F2" : "#EDEEE7", borderTop: "1px dashed #C9CABF" }}>
                        <td colSpan={6} className="px-4 py-4">
                          <p className="font-body text-xs italic mb-3" style={{ color: "#4B5563" }}>{r.summary_note}</p>
                          <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: "#A6832E" }}>Section-by-Section Assessment Details</p>
                          <div className="border rounded-sm overflow-hidden" style={{ borderColor: "#C9CABF" }}>
                            <table className="w-full text-xs">
                              <thead>
                                <tr style={{ background: "#EDEEE7" }}>
                                  <th className="text-left px-3 py-2 font-mono text-[9px] tracking-widest uppercase" style={{ color: "#4B5563" }}>Section</th>
                                  <th className="text-center px-3 py-2 font-mono text-[9px] tracking-widest uppercase" style={{ color: "#4B5563" }}>Score</th>
                                  <th className="text-left px-3 py-2 font-mono text-[9px] tracking-widest uppercase" style={{ color: "#4B5563" }}>Recommendations for Improvement</th>
                                </tr>
                              </thead>
                              <tbody>
                                {r.sections?.map((b, i) => (
                                  <tr key={i} style={{ borderTop: "1px solid #EDEEE7", background: "#FCFCFA" }}>
                                    <td className="px-3 py-2 align-top font-medium" style={{ color: "#1F2937" }}>
                                      {b.name}
                                      {!b.found && (
                                        <p className="font-mono text-[9px] uppercase tracking-wide mt-0.5" style={{ color: "#7A2331" }}>Not found</p>
                                      )}
                                    </td>
                                    <td className="px-3 py-2 align-top text-center">
                                      <ScoreStamp score={b.score} size="sm" />
                                    </td>
                                    <td className="px-3 py-2 align-top" style={{ color: "#1F2937" }}>
                                      <ul className="space-y-1">
                                        {(b.recommendations || []).map((rec, ri) => (
                                          <li key={ri} className="flex gap-1.5">
                                            <span style={{ color: "#7A2331" }}>—</span> {rec}
                                          </li>
                                        ))}
                                      </ul>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ————————————————————————————————————————————
// Root app
// ————————————————————————————————————————————
const RECORDS_KEY_PREFIX = "penilaian-records-v2:";

export default function App() {
  const [session, setSession] = useState(null); // { username, nama, nip }
  const [page, setPage] = useState("assess");
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [storageError, setStorageError] = useState("");

  const recordsKey = session ? `${RECORDS_KEY_PREFIX}${session.username}` : null;

  React.useEffect(() => {
    if (!recordsKey) return;
    let cancelled = false;
    (async () => {
      setLoadingRecords(true);
      try {
        const res = await window.storage.get(recordsKey, true);
        if (!cancelled && res?.value) {
          setRecords(JSON.parse(res.value));
        } else if (!cancelled) {
          setRecords([]);
        }
      } catch (e) {
        // key not found yet is normal on first use — treat as empty history
        if (!cancelled) setRecords([]);
      } finally {
        if (!cancelled) setLoadingRecords(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [recordsKey]);

  const persist = async (next) => {
    setRecords(next);
    try {
      const res = await window.storage.set(recordsKey, JSON.stringify(next), true);
      if (!res) setStorageError("History failed to save permanently; it remains available for this session only.");
      else setStorageError("");
    } catch (e) {
      setStorageError("History failed to save permanently; it remains available for this session only.");
    }
  };

  if (!session) {
    return (
      <>
        <Stationery />
        <AuthPage onAuthenticated={(s) => setSession(s)} />
      </>
    );
  }

  return (
    <div className="min-h-screen paper-texture" style={{ background: "#EDEEE7" }}>
      <Stationery />
      <TopBar nama={session.nama} page={page} setPage={setPage} onLogout={() => setSession(null)} count={records.length} />
      <div className="max-w-5xl mx-auto px-6 pt-3">
        <p className="flex items-center gap-1.5 font-mono text-[9px] tracking-wide" style={{ color: "#9CA3AF" }}>
          <ShieldAlert className="w-3 h-3 shrink-0" /> Accounts &amp; assessment history are stored in this app's shared storage (not an encrypted private database).
        </p>
      </div>
      {storageError && (
        <div className="max-w-5xl mx-auto px-6 pt-4">
          <div className="flex items-center gap-2 text-xs font-body px-3 py-2 rounded-sm border" style={{ borderColor: "#A6832E", color: "#7A2331", background: "#F7F7F2" }}>
            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {storageError}
          </div>
        </div>
      )}
      {page === "assess" ? (
        <AssessPage dosen={session.nama} onSaved={(r) => persist([r, ...records])} goResults={() => setPage("results")} />
      ) : loadingRecords ? (
        <div className="max-w-5xl mx-auto px-6 py-10 flex items-center gap-2 font-body text-sm" style={{ color: "#4B5563" }}>
          <Loader2 className="w-4 h-4 animate-spin" /> Loading assessment history...
        </div>
      ) : (
        <ResultsPage records={records} goAssess={() => setPage("assess")} />
      )}
    </div>
  );
}
