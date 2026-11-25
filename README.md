# Campus Saarthi - Vivekananda Global University (VGU)

**Campus Saarthi** is an institutional faculty documentation and academic audit web application designed specifically for the faculty and administration of **Vivekananda Global University (VGU), Jaipur**.

The platform streamlines non-teaching administrative burdens by providing a single, standardized, compliant system for recording events, managing documentation, and automatically generating formal audit-ready event reports in Microsoft Word (`.docx`) format.

---

## Key Specifications & PRD Compliance


- **Academic Palette**: Built with a formal university color system:
  - **Primary**: VGU Deep Navy (`#0A2540`)
  - **Secondary**: Slate Gray (`#1E293B`, `#334155`)
  - **Collegiate Trim**: Antique Academic Brass (`#8F6E28`)
  - **Status Indicators**: Muted Forest Green (Approved), Amber (Pending), Slate (Draft), Crimson (Revision Required).
  - High-contrast, sharp hairline borders, clean typography stack, and zero neon/cyber gradient fluff.

---

## Application Flow

1. **Authentication Portal (`/login`)**:
   - Access restricted to authorized faculty and administrative staff.
   - Built-in persona switcher to test as:
     - **Faculty Member**: Ar. Rajesh Sharma (`VGU-FAC-2018-042`), Associate Professor
     - **Head of Department (HOD) / IQAC Admin**: Prof. Dr. Neha Agarwal (`VGU-ADM-2015-008`)
   - Inactivity session countdown with auto-timeout simulation (15 minutes).

2. **Academic Departments Directory (Home Page)**:
   - Displays department cards (Architecture, CSE, Civil, Mechanical, Management, Law, Pharmacy, Agriculture, Design).
   - **Department of Architecture & Planning** is active in Version 1.0.
   - Any other department opens an **in-app "Coming Soon" onboarding roadmap** without leaving the website.

3. **Entry Types Hub (Architecture Workspace)**:
   - **Event Report (14-Point IQAC Format)**: Live and fully operational.
   - **Student Records & Participation**: Scheduled for Phase 2.
   - **Faculty Publications & Patents**: Scheduled for Phase 2.
   - **Awards & Medals Won**: Scheduled for Phase 2.

4. **14-Point Event Report Form**:
   - **Part I: Event Metadata**: Department, Event Date, Duration, Activity Title, Activity Type (Workshop, FDP, Conference, Expert Lecture, etc.), Venue, Organizing Unit, Primary SDG (from the 17 UN SDGs), and Specific SDG Targets.
   - **Part II: Objectives, Key Activities & Outcomes**:
     - 3 distinct mandatory objective bullet inputs.
     - 3 to 5 structured key activity inputs.
     - 2 to 3 outcome & impact bullet inputs linked directly to SDG targets.
   - **Part III: Participant Demographics Matrix**:
     - Live-calculating matrix for Students, Faculty, and Industry Persons (split by VGU vs. Outside/Abroad) with automatic category totals and consolidated grand total.
   - **Part IV: 13-Point Supporting Documents Checklist**:
     - Prominent **Mandatory Flatbed Scanner Notice** (300 DPI flatbed scanner required; mobile phone camera scans prohibited).
     - 13 distinct document attachment rows with upload status, file name, and file size tracking:
       1. Proposal by Coordinator/Convener to Principal, with budget and venue permission
       2. Formal Invitation letter to Resource Person
       3. Resource Person Acceptance letter with updated Bio-data / CV
       4. Event Poster, Brochure or Banner (official typeset layout, not event photo)
       5. Programme Schedule & Minute-by-Minute Session Plan
       6. Official Departmental / University Circular
       7. Registration and Daily Attendance Sheets
       8. Specimen Certificate Issued
       9. Participant Feedback Forms with Analysis & Action Taken
       10. Feedback submitted by the Resource Person with Recommendations
       11. Budget Utilization Summary Sheet with Certified Expenditure Vouchers
       12. Press Release, Newspaper Publication Clipping, or Media Report
       13. GPS-Tagged Field Photographs (minimum 6 photographs with coordinates & captions)
   - **Actions**: "Save Draft", "Preview Preset Format", "Load Architecture Sample Data" (pre-fills realistic data for instant evaluation), and "Submit for HOD Approval".

5. **Word Document (`.docx`) Report Generation**:
   - Automatic generation and direct client-side download of genuine `.docx` reports formatted to VGU's institutional 14-point template layout.
   - Summary page, Demographics Matrix table, 13-Point Annexure Index, and official institutional sign-off lines.

6. **Saved Reports Repository & Search**:
   - Filter by status (All, Approved, Pending Review, Draft, Revisions Requested).
   - Search by activity title, reference ID, or activity type.
   - Actions to Preview, Download `.docx`, and Edit/Regenerate existing entries.

7. **HOD & IQAC Review Portal**:
   - Overview metrics (Total Submissions, Pending Review, Approved, Revisions Requested).
   - Document verification modal with checkboxes for all 13 documents to verify 300 DPI flatbed scan adherence.
   - "Approve Entry & Issue IQAC Stamp" and "Request Revisions" with mandatory remarks.

8. **Security & Governance**:
   - Immutable Activity Audit Trail (`Audit Log` modal tracking logins, file uploads, drafts, submissions, and approvals).
   - Inactivity session timeout management.
   - Password update modal with validation.

---

## How to Run Locally


You can open `index.html` directly in modern web browsers (Chrome, Edge, Firefox, Safari).

---

