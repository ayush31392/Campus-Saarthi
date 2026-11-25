# Product Requirements Document (PRD)
**Project Name:** Campus Saarthi — Faculty Academic Documentation & AI Event Reporting Portal  
**Institution:** Vivekananda Global University (VGU), Jaipur  
**Version:** 1.1 (Pilot Release — Department of Architecture & Planning + AI `.docx` Automation)  
**Target Accreditation Standard:** NAAC Criteria 3.3 & Internal Quality Assurance Cell (IQAC)  

---

## 1. Executive Summary & Problem Statement
Faculty members at Vivekananda Global University (VGU) spend substantial non-teaching hours manually formatting post-event audit reports, aligning activities with United Nations Sustainable Development Goals (UN SDGs), calculating participant matrices, and compiling 13 mandatory supporting annexures for IQAC and NAAC audits. Manual compilation frequently causes formatting inconsistencies, missing annexures, and low-resolution mobile camera scans that fail institutional audits.

**Campus Saarthi** centralizes academic event documentation into an authoritative, institutional portal. With Version 1.1, faculty enter raw 14-point event details once and trigger an integrated LLM pipeline (NVIDIA NIM / Ollama via Python Flask) that refines shorthand inputs into formal NAAC/IQAC academic prose and automatically generates a ready-to-print `.docx` report matching VGU’s exact IQAC template.

---

## 2. Goals & Success Metrics
 **Standardization:** Enforce VGU’s 14-point IQAC event report structure and 6-column merged `.docx` layout across all submissions.
 **Administrative Time Reduction:** Reduce post-event report drafting and formatting time from hours to a few minutes per event.
 **Audit Compliance:** Enforce full visibility of the 13 mandatory supporting annexures and 300 DPI hardware flatbed scanner rules prior to HOD sign-off.
 **Non-Intrusive Modularity:** Maintain complete compatibility with the existing frontend UI/UX while extending `.docx` generation via a lightweight Python backend.

---

## 3. User Personas & Access Control
Public self-registration is disabled in accordance with VGU data governance policies; users authenticate using institutional Employee IDs:

| Persona | Sample Credential | Primary Responsibilities |
| :--- | :--- | :--- |
| **Faculty Coordinator / Convener** | Ar. Rajesh Sharma (`VGU-FAC-2018-042`) | Creates 14-point event drafts, uploads 13 flatbed-scanned supporting documents, triggers AI `.docx` report generation, and submits reports for HOD review. |
| **Head of Department (HOD) / IQAC Admin** | Prof. Dr. Neha Agarwal (`VGU-ADM-2015-008`) | Reviews department submissions, verifies 300 DPI flatbed scan compliance across all 13 documents, requests revisions with remarks, or approves reports with an official IQAC reference stamp. |

---

## 4. Scope & Phased Rollout
 **Version 1.0–1.1 (Active Pilot):** Operational for the **Department of Architecture & Planning (`VGU-DAP`)**, covering the **14-Point Event Report** ledger and AI `.docx` export.
 **Phase 2 (Scheduled):**
   Onboarding of remaining 8 VGU departments (CSE, Civil, Mechanical, Management, Law, Pharmacy, Agriculture, Design) via in-app onboarding status roadmaps.
   Activation of additional departmental ledgers: *Student Records & Participation*, *Faculty Publications & Patents*, and *Awards & Medals Won*.

---

## 5. Functional Requirements

### 5.1 Authentication, Session & Governance Controls
 **Role-Based Views:** Dynamic header switcher allowing instant toggling between Faculty and HOD/IQAC workflows.
 **Inactivity Timeout:** Automated 15-minute countdown timer that terminates inactive sessions and logs timeout events.
 **Immutable Audit Trail:** Logs critical actions (`USER_LOGIN`, `FILE_UPLOAD`, `SAVE_DRAFT`, `AI_GENERATE_DOCX`, `SUBMIT_APPROVAL`, `HOD_APPROVE`, `HOD_REVISION`, `PASSWORD_CHANGE`) with timestamps and user roles.

### 5.2 14-Point Event Report Data Capture
The reporting form captures all mandatory IQAC fields across four structured sections:
1. **Part I — Event Summary Metadata (Points 1–7):** Department Name (locked to active department), Date of Event, Duration & Schedule, Title of Activity, Type of Activity (Workshop, FDP, Conference, Expert Lecture, Seminar, Symposia, Studio, Exhibition), Venue & Location, Organizing Unit & Collaborators, Primary UN SDG (1–17 selector), and Specific SDG Targets Addressed.
2. **Part II — Narrative & Impact Bullets (Points 8, 10, 11):**
   * *Objectives:* 3 mandatory bullet points.
   * *Key Activities Conducted:* 3 to 5 chronological/technical bullet points.
   * *Outcomes & Impact:* 2 to 3 measurable impact bullet points explicitly linked to SDG targets.
3. **Part III — Participant Demographics Matrix (Point 9):** Live-calculating table splitting counts across **Students**, **Faculty Members**, and **Industry Persons & External Resource Persons** by **VGU Affiliated** vs. **Outside VGU / Abroad**, automatically computing row subtotals and consolidated grand totals.
4. **Part IV — 13-Point Supporting Documents Checklist:** Individual file upload rows tracking attachment status, file name, and file size for all 13 mandatory annexures, accompanied by a prominent **300 DPI Hardware Flatbed Scanner Directive** prohibiting mobile camera scans.

### 5.3 AI Report Enhancement & `.docx` Generation Engine (New Feature)
* **Trigger:** Clicking **Generate AI Report (.docx)** in the form’s sticky action bar validates required fields and sends the 14-point JSON payload to `POST /api/generate-ai-report`.
* **LLM Processing (`services/ai_report_enhancer.py`):**
  * Connects via OpenAI-compatible REST API (`requests`) to **NVIDIA NIM** (`https://integrate.api.nvidia.com/v1`)  configured via `.env`.
  * Refines raw faculty shorthand into formal NAAC/IQAC academic prose while strictly preserving factual dates, venues, SDG numbers, and participant counts.
  * Enforces exact bullet counts (3 objectives, 3–5 activities, 2–3 SDG-linked outcomes) and returns structured JSON.
* **Exact `.docx` Document Assembly (`services/docx_template_builder.py`):**
  * Generates an in-memory Word document using `python-docx` matching VGU’s exact template:
    * **Header Block:** Centered VGU header logo (`public/assets/vgu-header-logo.png` if present), `DATE OF EVENT:`, `DEPARTMENT NAME:`, `SDG No: SDG X`, and `SUMMARY` heading.
    * **Summary Table:** 6-column merged-cell grid containing `Title of Activity`, `Type of Activity`, `Date, Venue, Organizing Unit`, `SDG(s) and Target(s) Addressed`, `Objectives`, the nested `Participants (numbers)` matrix (`Students [VGU | Outside/ Abroad]`, `Faculty [VGU | Outside/ Abroad]`, `Industry Person`), `Key Activities`, and `Outcomes / Impact`.
    * **Content Index Page:** Page break followed by the 13-row `CONTENT` table (`S.no | Title | Pg.No`) and the bold flatbed scanner warning note.
    * **13 Annexure Cover Pages:** Dedicated page-separated divider sheets for all 13 supporting documents.

### 5.4 Report Repository & HOD Verification Workflow
* **Archived Reports Directory:** Searchable and filterable table (`All`, `Approved`, `Pending Review`, `Draft`, `Revision Requested`) allowing faculty to preview, edit, or re-download `.docx` files.
* **HOD Verification Queue:** Dashboard displaying department submission metrics and an audit modal with per-document checkboxes for verifying 300 DPI scan quality before issuing an institutional IQAC reference stamp (e.g., `VGU/IQAC/2026/ARCH-084`).

---

## 6. Technical Architecture & Design Constraints

### 6.1 Tech Stack & Directory Layout
* **Frontend (`public/`):** Vanilla HTML5, CSS3, and ES6 JavaScript (`index.html`, `styles.css`, `app.js`).
* **Backend (Python 3.10+):** Flask (`main.py`), `requests`, `python-docx`, and `python-dotenv`.
* **LLM Provider:** Configurable via `.env` (`LLM_BASE_URL`, `LLM_API_KEY`, `LLM_MODEL`) supporting NVIDIA NIM cloud endpoints.

### 6.2 UI/UX & Institutional Design Standards
* **Color Palette:** VGU Deep Navy (`#0A2540`), Slate Gray (`#1E293B` / `#334155`), Antique Academic Brass (`#8F6E28`), and muted semantic status badges (Forest Green, Amber, Slate, Crimson).
* **Visual Restraint:** High-contrast hairline borders, formal academic typography (`Times New Roman` in generated `.docx` reports; system sans-serif and monospace in UI), and zero emojis or decorative neon gradients.

---

## 7. Future Enhancements (Post-v1.1 Backlog)
* **Automated Annexure Merging:** Automatically append and convert uploaded PDF/image annexures (Documents 1–13) directly behind their respective divider pages inside the generated `.docx` or a consolidated audit PDF.
* **Persistent Database Storage:** Migrate client-side `localStorage` (`cs_submissions`, `cs_activity_logs`) to a centralized PostgreSQL/SQLite backend so HODs and faculty share real-time records across campus workstations.
* **Automated 300 DPI Scan Validation:** Add server-side image metadata checks on uploaded files to warn faculty automatically if a document’s DPI is below 300 or exhibits mobile-camera aspect ratios.