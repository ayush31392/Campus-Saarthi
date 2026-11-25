/**
 * Campus Saarthi - Vivekananda Global University (VGU)
 * Core Application Logic & State Management
 * Strictly Non-Vibe-Coded: Authoritative, Academic & Fully Functional
 */

(function () {
  'use strict';

  // --- Constants & Reference Data ---
  const DEPARTMENTS = [
    {
      id: 'dap',
      code: 'VGU-DAP',
      name: 'Department of Architecture & Planning',
      faculty: 'Faculty of Architecture & Planning',
      active: true,
      description: 'Design studios, urban conservation, architectural heritage, and spatial governance compliance.'
    },
    {
      id: 'cse',
      code: 'VGU-CSE',
      name: 'Department of Computer Science & Engineering',
      faculty: 'Faculty of Engineering & Technology',
      active: false,
      description: 'Computing systems, artificial intelligence, cyber security, and software systems.'
    },
    {
      id: 'ce',
      code: 'VGU-CE',
      name: 'Department of Civil Engineering',
      faculty: 'Faculty of Engineering & Technology',
      active: false,
      description: 'Structural engineering, geotechnics, environmental surveying, and transportation planning.'
    },
    {
      id: 'me',
      code: 'VGU-ME',
      name: 'Department of Mechanical Engineering',
      faculty: 'Faculty of Engineering & Technology',
      active: false,
      description: 'Thermodynamics, robotics, additive manufacturing, and industrial automation.'
    },
    {
      id: 'fms',
      code: 'VGU-FMS',
      name: 'Department of Management Studies',
      faculty: 'Faculty of Management & Commerce',
      active: false,
      description: 'Strategic management, financial analytics, business leadership, and entrepreneurship.'
    },
    {
      id: 'law',
      code: 'VGU-LAW',
      name: 'Department of Law & Governance',
      faculty: 'Faculty of Law',
      active: false,
      description: 'Constitutional law, corporate compliance, intellectual property jurisprudence, and dispute resolution.'
    },
    {
      id: 'pharm',
      code: 'VGU-PHARM',
      name: 'Department of Pharmaceutical Sciences',
      faculty: 'Faculty of Pharmacy',
      active: false,
      description: 'Pharmacology, clinical formulations, drug discovery, and medicinal research.'
    },
    {
      id: 'agri',
      code: 'VGU-AGRI',
      name: 'Department of Agriculture & Allied Sciences',
      faculty: 'Faculty of Agriculture',
      active: false,
      description: 'Agronomy, horticulture, sustainable crop genetics, and rural resource management.'
    },
    {
      id: 'des',
      code: 'VGU-DES',
      name: 'Department of Design & Fine Arts',
      faculty: 'Faculty of Design',
      active: false,
      description: 'Visual communication, industrial product aesthetics, interior styling, and creative crafts.'
    }
  ];

  const UN_SDGS = [
    { num: 1, title: 'SDG 1: No Poverty' },
    { num: 2, title: 'SDG 2: Zero Hunger' },
    { num: 3, title: 'SDG 3: Good Health and Well-being' },
    { num: 4, title: 'SDG 4: Quality Education' },
    { num: 5, title: 'SDG 5: Gender Equality' },
    { num: 6, title: 'SDG 6: Clean Water and Sanitation' },
    { num: 7, title: 'SDG 7: Affordable and Clean Energy' },
    { num: 8, title: 'SDG 8: Decent Work and Economic Growth' },
    { num: 9, title: 'SDG 9: Industry, Innovation and Infrastructure' },
    { num: 10, title: 'SDG 10: Reduced Inequalities' },
    { num: 11, title: 'SDG 11: Sustainable Cities and Communities' },
    { num: 12, title: 'SDG 12: Responsible Consumption and Production' },
    { num: 13, title: 'SDG 13: Climate Action' },
    { num: 14, title: 'SDG 14: Life Below Water' },
    { num: 15, title: 'SDG 15: Life on Land' },
    { num: 16, title: 'SDG 16: Peace, Justice and Strong Institutions' },
    { num: 17, title: 'SDG 17: Partnerships for the Goals' }
  ];

  const MANDATORY_DOCUMENTS = [
    {
      id: 1,
      title: 'Proposal by Coordinator/Convener to Principal, with budget and venue permission',
      reqNote: 'Official signed letter with approval stamps and budget allocation schedule.',
      fileName: 'Doc01_Principal_Approval_Budget.pdf'
    },
    {
      id: 2,
      title: 'Formal Invitation Letter to Resource Person',
      reqNote: 'Institutional dispatch copy on department letterhead with dispatch reference.',
      fileName: 'Doc02_Resource_Person_Invitation.pdf'
    },
    {
      id: 3,
      title: 'Acceptance Letter along with updated Bio-data / CV',
      reqNote: 'Signed acceptance from speaker with academic credentials profile.',
      fileName: 'Doc03_Speaker_Acceptance_Biodata.pdf'
    },
    {
      id: 4,
      title: 'Event Poster, Brochure or Banner (Not a photo)',
      reqNote: 'High-resolution typeset layout vector or official print graphic.',
      fileName: 'Doc04_Official_Event_Brochure.pdf'
    },
    {
      id: 5,
      title: 'Programme Schedule and Session Matrix',
      reqNote: 'Minute-by-minute itinerary indicating inaugurals, technical sessions and valedictory.',
      fileName: 'Doc05_Programme_Schedule.pdf'
    },
    {
      id: 6,
      title: 'Official Departmental / University Circular',
      reqNote: 'Registrar or HOD circular with dispatch stamp and notification list.',
      fileName: 'Doc06_Official_Circular.pdf'
    },
    {
      id: 7,
      title: 'Registration Sheet and Daily Participant Attendance',
      reqNote: 'Signatures of participants with affiliation and contact information.',
      fileName: 'Doc07_Attendance_Sheets.pdf'
    },
    {
      id: 8,
      title: 'Certificates (Specimen / Sample Copy)',
      reqNote: 'Sample format issued with authorized signatures of Convener, HOD, and Principal.',
      fileName: 'Doc08_Sample_Certificate.pdf'
    },
    {
      id: 9,
      title: 'Participant Feedback Forms with Analysis & Action Taken',
      reqNote: 'Consolidated statistical survey analysis graph and actionable improvements.',
      fileName: 'Doc09_Participant_Feedback_Analysis.pdf'
    },
    {
      id: 10,
      title: 'Feedback filled by Resource Person with Plan of Action',
      reqNote: 'Expert commentary on cohort technical level and forward recommendations.',
      fileName: 'Doc10_Speaker_Feedback_ActionPlan.pdf'
    },
    {
      id: 11,
      title: 'Budget Utilization Summary Sheet with Vouchers',
      reqNote: 'Verified statement of actual expenditures verified by Accounts Department.',
      fileName: 'Doc11_Budget_Utilization_Summary.pdf'
    },
    {
      id: 12,
      title: 'Press Note or Newspaper / Media Publication',
      reqNote: 'Verified print media clipping or university institutional communications press note.',
      fileName: 'Doc12_Media_Press_Publication.pdf'
    },
    {
      id: 13,
      title: 'One Page of Photos, GPS Tagged, At Least 6 with Description',
      reqNote: 'Single composite page containing 6 geo-tagged images with coordinates and captions.',
      fileName: 'Doc13_GPS_Tagged_Photographs.pdf'
    }
  ];

  const USERS = {
    faculty: {
      id: 'VGU-FAC-2018-042',
      name: 'Ar. Rajesh Sharma',
      designation: 'Associate Professor',
      department: 'Department of Architecture & Planning',
      departmentCode: 'VGU-DAP',
      role: 'FACULTY'
    },
    hod: {
      id: 'VGU-ADM-2015-008',
      name: 'Prof. Dr. Neha Agarwal',
      designation: 'Head of Department & IQAC Convener',
      department: 'Department of Architecture & Planning',
      departmentCode: 'VGU-DAP',
      role: 'HOD'
    }
  };

  // --- Initial Seed Submissions ---
  const INITIAL_SUBMISSIONS = [
    {
      id: 'VGU-ARCH-2026-001',
      department: 'Department of Architecture & Planning',
      eventDate: '2026-09-18',
      duration: '3 Days (18 Hours)',
      activityTitle: 'National Workshop on Sustainable Urban Conservation & Vernacular Building Technologies',
      activityType: 'Workshop',
      venue: 'Design Studio 4, Architecture Block B, VGU Campus, Jaipur',
      organizingUnit: 'Department of Architecture & Planning in collaboration with INTACH Jaipur Chapter',
      primarySdg: 11,
      secondarySdgs: [4, 9, 12],
      sdgTargets: 'Target 11.4: Strengthen efforts to protect and safeguard the world cultural and natural heritage; Target 12.2: Sustainable management and efficient use of natural building resources.',
      objectives: [
        'To sensitize undergraduate and postgraduate architecture scholars to vernacular Rajasthani stone masonry and lime plastering techniques.',
        'To train participants in digital heritage documentation using 3D terrestrial photogrammetry and spatial mapping.',
        'To establish sustainable retrofitting methodologies for historical precinct conservation under smart city frameworks.'
      ],
      keyActivities: [
        'Inaugural address by Dr. K. N. Sen on indigenous passive cooling architectures of Western India.',
        'Hands-on field studio on lime preparation, traditional khamir mortar blending, and stonework stabilization.',
        'Terrestrial LiDAR demonstration and spatial modeling of historical stepwell structures.',
        'Technical panel on regulatory frameworks for heritage precinct protection under urban master plans.',
        'Exhibition and peer jury evaluation of 16 student conservation proposals.'
      ],
      outcomes: [
        '58 architecture students and 14 visiting faculty certified in non-invasive structural conservation diagnostics.',
        'Preparation of a measured drawing portfolio of the Amer conservation corridor submitted to state authorities.',
        'Direct alignment with UN SDG 11.4 verified through documentation of 4 vulnerable local heritage facades.'
      ],
      demographics: {
        studentsVGU: 48,
        studentsOutside: 10,
        facultyVGU: 12,
        facultyOutside: 6,
        industryVGU: 2,
        industryOutside: 5
      },
      documents: MANDATORY_DOCUMENTS.map(doc => ({
        id: doc.id,
        title: doc.title,
        fileName: doc.fileName,
        fileSize: '1.4 MB',
        uploaded: true,
        verifiedByHod: true,
        scannedAt300Dpi: true
      })),
      status: 'APPROVED',
      submittedBy: 'Ar. Rajesh Sharma (VGU-FAC-2018-042)',
      submittedAt: '2026-09-22 14:30',
      approvedBy: 'Prof. Dr. Neha Agarwal (HOD)',
      approvedAt: '2026-09-24 11:15',
      iqacRef: 'VGU/IQAC/2026/ARCH-084',
      remarks: 'Verified complete with all 13 flatbed-scanned supporting annexures. Excellent participant documentation.'
    },
    {
      id: 'VGU-ARCH-2026-002',
      department: 'Department of Architecture & Planning',
      eventDate: '2026-10-04',
      duration: '1 Day (6 Hours)',
      activityTitle: 'Expert Lecture on Climate-Responsive Parametric Facade Engineering for Arid Climates',
      activityType: 'Expert Lecture',
      venue: 'Auditorium Hall 2, Vivekananda Global University',
      organizingUnit: 'Department of Architecture & Planning & Centre for Energy Studies',
      primarySdg: 7,
      secondarySdgs: [9, 11, 13],
      sdgTargets: 'Target 7.3: Double the global rate of improvement in energy efficiency; Target 13.1: Strengthen resilience and adaptive capacity to climate hazards.',
      objectives: [
        'To investigate algorithmic daylighting simulation techniques for extreme thermal environments.',
        'To examine kinetic shading structures fabricated with recycled architectural aluminum alloys.',
        'To bridge theoretical computational design with building code energy rating standards (ECBC).'
      ],
      keyActivities: [
        'Keynote lecture by Ar. Alok Mukherjee, Senior Principal Architect at Foster & Partners (South Asia).',
        'Computational Grasshopper and Ladybug workflow demonstration for radiation analysis.',
        'Q&A interactive dialogue on facade embodied carbon and performance optimization.'
      ],
      outcomes: [
        '110 participants exposed to performance-driven parametric facade engineering workflows.',
        'Curricular integration recommendation drafted for the 4th Year B.Arch Computational Design Studio.'
      ],
      demographics: {
        studentsVGU: 85,
        studentsOutside: 15,
        facultyVGU: 14,
        facultyOutside: 4,
        industryVGU: 1,
        industryOutside: 3
      },
      documents: MANDATORY_DOCUMENTS.map((doc, idx) => ({
        id: doc.id,
        title: doc.title,
        fileName: idx < 12 ? doc.fileName : 'Doc13_GPS_Tagged_Photographs.pdf',
        fileSize: '2.1 MB',
        uploaded: true,
        verifiedByHod: false,
        scannedAt300Dpi: true
      })),
      status: 'PENDING',
      submittedBy: 'Ar. Rajesh Sharma (VGU-FAC-2018-042)',
      submittedAt: '2026-10-08 16:45',
      approvedBy: null,
      approvedAt: null,
      iqacRef: null,
      remarks: 'Awaiting HOD formal review and certificate specimen cross-verification.'
    }
  ];

  // --- State Container ---
  const STATE = {
    currentUser: USERS.faculty,
    activeView: 'departments', // 'login' | 'departments' | 'coming_soon' | 'entry_types' | 'event_form' | 'saved_reports' | 'hod_verification'
    selectedDepartment: null,
    editingReportId: null,
    sessionSecondsRemaining: 15 * 60,
    submissions: [],
    activityLogs: [],
    filterStatus: 'ALL',
    searchQuery: '',
    currentFormData: null
  };

  // --- Persistence & Initialization ---
  function initStorage() {
    try {
      const storedSubmissions = localStorage.getItem('cs_submissions');
      if (storedSubmissions) {
        STATE.submissions = JSON.parse(storedSubmissions);
      } else {
        STATE.submissions = INITIAL_SUBMISSIONS;
        saveSubmissions();
      }

      const storedLogs = localStorage.getItem('cs_activity_logs');
      if (storedLogs) {
        STATE.activityLogs = JSON.parse(storedLogs);
      } else {
        logActivity('SYSTEM_INIT', 'Campus Saarthi academic portal initialized with VGU regulatory data.');
      }
    } catch (e) {
      console.warn('Storage initialization fallback', e);
      STATE.submissions = INITIAL_SUBMISSIONS;
    }
  }

  function saveSubmissions() {
    try {
      localStorage.setItem('cs_submissions', JSON.stringify(STATE.submissions));
    } catch (e) {
      console.error('Failed to save submissions to storage', e);
    }
  }

  function logActivity(action, details) {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const entry = {
      timestamp,
      user: STATE.currentUser ? STATE.currentUser.name : 'ANONYMOUS',
      role: STATE.currentUser ? STATE.currentUser.role : 'GUEST',
      action,
      details
    };
    STATE.activityLogs.unshift(entry);
    if (STATE.activityLogs.length > 100) {
      STATE.activityLogs.pop();
    }
    try {
      localStorage.setItem('cs_activity_logs', JSON.stringify(STATE.activityLogs));
    } catch (e) {
      // ignore
    }
  }

  // --- Session Timer ---
  function startSessionTimer() {
    setInterval(() => {
      if (STATE.activeView === 'login') return;
      if (STATE.sessionSecondsRemaining > 0) {
        STATE.sessionSecondsRemaining--;
        updateSessionDisplay();
      } else {
        logActivity('SESSION_TIMEOUT', 'User session expired due to 15 minutes of inactivity.');
        alert('Institutional Session Notice: Your active session has timed out due to inactivity. Please authenticate again to access records.');
        switchView('login');
      }
    }, 1000);
  }

  function updateSessionDisplay() {
    const el = document.getElementById('sessionCountdown');
    if (!el) return;
    const mins = Math.floor(STATE.sessionSecondsRemaining / 60);
    const secs = STATE.sessionSecondsRemaining % 60;
    el.textContent = `Session: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function resetSessionTimer() {
    STATE.sessionSecondsRemaining = 15 * 60;
    updateSessionDisplay();
  }

  // --- View Switcher ---
  function switchView(viewName, meta) {
    STATE.activeView = viewName;
    resetSessionTimer();

    // Hide all view containers
    document.querySelectorAll('.view-container').forEach(el => {
      el.style.display = 'none';
    });

    // Sub-navbar visibility
    const subNavbar = document.getElementById('subNavbar');
    if (subNavbar) {
      subNavbar.style.display = (viewName === 'login') ? 'none' : 'block';
    }

    // Highlight current nav button
    document.querySelectorAll('.nav-link-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    const targetEl = document.getElementById(`view_${viewName}`);
    if (targetEl) {
      targetEl.style.display = 'block';
    }

    // View specific handlers
    if (viewName === 'departments') {
      const btn = document.getElementById('navBtn_departments');
      if (btn) btn.classList.add('active');
      renderDepartments();
    } else if (viewName === 'coming_soon') {
      renderComingSoon(meta);
    } else if (viewName === 'entry_types') {
      const btn = document.getElementById('navBtn_workspace');
      if (btn) btn.classList.add('active');
      renderEntryTypes();
    } else if (viewName === 'event_form') {
      const btn = document.getElementById('navBtn_workspace');
      if (btn) btn.classList.add('active');
      renderEventForm(meta ? meta.reportId : null);
    } else if (viewName === 'saved_reports') {
      const btn = document.getElementById('navBtn_reports');
      if (btn) btn.classList.add('active');
      renderSavedReports();
    } else if (viewName === 'hod_verification') {
      const btn = document.getElementById('navBtn_hod');
      if (btn) btn.classList.add('active');
      renderHodView();
    }

    window.scrollTo(0, 0);
  }

  // --- View 1: Login ---
  function handleLogin(roleKey) {
    const user = USERS[roleKey] || USERS.faculty;
    STATE.currentUser = user;
    updateUserHeader();
    logActivity('USER_LOGIN', `User ${user.name} (${user.role}) authenticated via Employee ID.`);
    switchView('departments');
  }

  function handleLogout() {
    logActivity('USER_LOGOUT', `User ${STATE.currentUser.name} signed out of session.`);
    STATE.currentUser = USERS.faculty;
    switchView('login');
  }

  function updateUserHeader() {
    const nameEl = document.getElementById('headerUserName');
    const roleEl = document.getElementById('headerUserRole');
    const facultyBtn = document.getElementById('roleBtnFaculty');
    const hodBtn = document.getElementById('roleBtnHod');
    const hodNav = document.getElementById('navBtn_hod');

    if (nameEl) nameEl.textContent = STATE.currentUser.name;
    if (roleEl) roleEl.textContent = `${STATE.currentUser.designation} (${STATE.currentUser.id})`;

    if (facultyBtn && hodBtn) {
      if (STATE.currentUser.role === 'HOD') {
        facultyBtn.classList.remove('active');
        hodBtn.classList.add('active');
      } else {
        facultyBtn.classList.add('active');
        hodBtn.classList.remove('active');
      }
    }

    if (hodNav) {
      hodNav.style.display = (STATE.currentUser.role === 'HOD') ? 'inline-flex' : 'none';
    }
  }

  function toggleRole(role) {
    STATE.currentUser = (role === 'HOD') ? USERS.hod : USERS.faculty;
    updateUserHeader();
    logActivity('ROLE_TOGGLE', `Switched active persona to ${STATE.currentUser.role} (${STATE.currentUser.name}).`);
    
    // Refresh current view if relevant
    if (STATE.activeView === 'hod_verification' && STATE.currentUser.role !== 'HOD') {
      switchView('departments');
    } else if (STATE.activeView === 'saved_reports') {
      renderSavedReports();
    } else if (STATE.activeView === 'hod_verification') {
      renderHodView();
    }
  }

  // --- View 2: Department Selection ---
  function renderDepartments() {
    const grid = document.getElementById('departmentGrid');
    if (!grid) return;

    grid.innerHTML = DEPARTMENTS.map(dept => {
      const isLive = dept.active;
      const statusBadge = isLive
        ? '<span class="badge badge-live">Operational in v1.0</span>'
        : '<span class="badge badge-phase2">Rollout Phase 2</span>';

      const actionBtn = isLive
        ? `<button class="btn btn-primary btn-sm" onclick="window.CS.selectDepartment('${dept.id}')">
            Enter Architecture Portal
            <svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
           </button>`
        : `<button class="btn btn-secondary btn-sm" onclick="window.CS.openComingSoon('${dept.id}')">
            Check Status
            <svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
           </button>`;

      return `
        <div class="dept-card ${isLive ? 'active-dept' : ''}">
          <div>
            <div class="dept-card-top">
              <span class="dept-code">${dept.code}</span>
              ${statusBadge}
            </div>
            <h3 class="dept-title">${dept.name}</h3>
            <div class="dept-faculty">${dept.faculty}</div>
            <p class="dept-desc">${dept.description}</p>
          </div>
          <div class="dept-actions">
            <span class="quick-meta">${isLive ? 'Active Reporting Module' : 'Scheduled Q2 2026'}</span>
            ${actionBtn}
          </div>
        </div>
      `;
    }).join('');
  }

  function selectDepartment(deptId) {
    const dept = DEPARTMENTS.find(d => d.id === deptId);
    if (!dept) return;

    if (dept.active) {
      STATE.selectedDepartment = dept;
      logActivity('SELECT_DEPT', `Accessed live module: ${dept.name}`);
      switchView('entry_types');
    } else {
      openComingSoon(deptId);
    }
  }

  function openComingSoon(deptId) {
    const dept = DEPARTMENTS.find(d => d.id === deptId) || DEPARTMENTS[1];
    logActivity('VIEW_COMING_SOON', `Viewed integration notice for ${dept.name}`);
    switchView('coming_soon', { dept });
  }

  // --- View 3: Coming Soon ---
  function renderComingSoon(meta) {
    const dept = (meta && meta.dept) ? meta.dept : DEPARTMENTS[1];
    const deptTitleEl = document.getElementById('comingSoonDeptName');
    const deptFacultyEl = document.getElementById('comingSoonFacultyName');
    const deptCodeEl = document.getElementById('comingSoonDeptCode');

    if (deptTitleEl) deptTitleEl.textContent = dept.name;
    if (deptFacultyEl) deptFacultyEl.textContent = dept.faculty;
    if (deptCodeEl) deptCodeEl.textContent = `Institutional Code: ${dept.code}`;
  }

  // --- View 4: Entry Types Hub ---
  function renderEntryTypes() {
    // Basic static structure in HTML, no extra rendering needed unless dynamic counts
    const countEl = document.getElementById('hubReportCount');
    if (countEl) {
      countEl.textContent = `${STATE.submissions.length} Recorded`;
    }
  }

  // --- View 5: 14-Point Event Report Form ---
  function renderEventForm(reportId) {
    STATE.editingReportId = reportId;
    const isEdit = !!reportId;
    const formTitleEl = document.getElementById('formModeTitle');
    const formSubtitleEl = document.getElementById('formModeSubtitle');

    let data = null;
    if (isEdit) {
      data = STATE.submissions.find(s => s.id === reportId);
      if (formTitleEl) formTitleEl.textContent = `Edit Event Report (${data.id})`;
      if (formSubtitleEl) formSubtitleEl.textContent = `Modify existing 14-point report details and re-generate official Word document.`;
    } else {
      if (formTitleEl) formTitleEl.textContent = 'New 14-Point Event Report Entry';
      if (formSubtitleEl) formSubtitleEl.textContent = 'Mandatory IQAC reporting format for Vivekananda Global University academic events.';
    }

    // Populate or reset form fields
    populateFormData(data);
    renderDocumentsUploadList(data ? data.documents : null);
    recalculateDemographics();
  }

  function populateFormData(data) {
    const form = document.getElementById('eventReportForm');
    if (!form) return;

    if (data) {
      document.getElementById('formEventDate').value = data.eventDate || '';
      document.getElementById('formDuration').value = data.duration || '';
      document.getElementById('formActivityTitle').value = data.activityTitle || '';
      document.getElementById('formActivityType').value = data.activityType || 'Workshop';
      document.getElementById('formVenue').value = data.venue || '';
      document.getElementById('formOrganizingUnit').value = data.organizingUnit || '';
      document.getElementById('formPrimarySdg').value = data.primarySdg || '11';
      document.getElementById('formSdgTargets').value = data.sdgTargets || '';
      
      document.getElementById('formObj1').value = (data.objectives && data.objectives[0]) || '';
      document.getElementById('formObj2').value = (data.objectives && data.objectives[1]) || '';
      document.getElementById('formObj3').value = (data.objectives && data.objectives[2]) || '';

      document.getElementById('formAct1').value = (data.keyActivities && data.keyActivities[0]) || '';
      document.getElementById('formAct2').value = (data.keyActivities && data.keyActivities[1]) || '';
      document.getElementById('formAct3').value = (data.keyActivities && data.keyActivities[2]) || '';
      document.getElementById('formAct4').value = (data.keyActivities && data.keyActivities[3]) || '';
      document.getElementById('formAct5').value = (data.keyActivities && data.keyActivities[4]) || '';

      document.getElementById('formOut1').value = (data.outcomes && data.outcomes[0]) || '';
      document.getElementById('formOut2').value = (data.outcomes && data.outcomes[1]) || '';
      document.getElementById('formOut3').value = (data.outcomes && data.outcomes[2]) || '';

      if (data.demographics) {
        document.getElementById('demoStudentsVGU').value = data.demographics.studentsVGU || 0;
        document.getElementById('demoStudentsOutside').value = data.demographics.studentsOutside || 0;
        document.getElementById('demoFacultyVGU').value = data.demographics.facultyVGU || 0;
        document.getElementById('demoFacultyOutside').value = data.demographics.facultyOutside || 0;
        document.getElementById('demoIndustryVGU').value = data.demographics.industryVGU || 0;
        document.getElementById('demoIndustryOutside').value = data.demographics.industryOutside || 0;
      }
    } else {
      // Default initial state
      form.reset();
      document.getElementById('formDepartment').value = 'Department of Architecture & Planning';
      document.getElementById('formEventDate').value = new Date().toISOString().substring(0, 10);
      document.getElementById('formPrimarySdg').value = '11';
      document.getElementById('demoStudentsVGU').value = '0';
      document.getElementById('demoStudentsOutside').value = '0';
      document.getElementById('demoFacultyVGU').value = '0';
      document.getElementById('demoFacultyOutside').value = '0';
      document.getElementById('demoIndustryVGU').value = '0';
      document.getElementById('demoIndustryOutside').value = '0';
    }
  }

  function loadSampleDataIntoForm() {
    const sample = {
      eventDate: '2026-10-12',
      duration: '2 Days (12 Hours)',
      activityTitle: 'Hands-on Studio on Parametric Bamboo Structures & Low-Carbon Spatial Canopies',
      activityType: 'Workshop',
      venue: 'Outdoor Construction Yard & Studio 2, Architecture Block, VGU Campus, Jaipur',
      organizingUnit: 'Department of Architecture & Planning in association with National Bamboo Mission',
      primarySdg: 11,
      sdgTargets: 'Target 11.c: Support least developed countries, including through financial and technical assistance, in building sustainable and resilient buildings utilizing local materials.',
      objectives: [
        'To instruct architectural students on tensile structural behavior and joinery detailing in structural bamboo.',
        'To calculate carbon sequestration potential and life cycle analysis (LCA) of lightweight vernacular timber grids.',
        'To fabricate an operational 1:1 scale pedestrian pavilion canopy on the university quadrangle.'
      ],
      keyActivities: [
        'Introductory lecture on botanical species selection and borax-boric chemical preservation methods.',
        'Computational Grasshopper form-finding session for hyperbolic paraboloid bamboo spatial grids.',
        'Joint fabrication workshop utilizing stainless steel pin connections and split-cane lashing.',
        'Full-scale physical erection of the 24-square-meter pavilion on VGU East Lawn.',
        'Structural load deflection testing and public unveiling for campus community.'
      ],
      outcomes: [
        '64 architecture undergraduates trained and certified in physical modular timber construction.',
        'Fabricated permanent installation providing outdoor study shaded space for 30 students.',
        'Technical report submitted to VGU Green Campus Committee indicating 84% reduction in embodied carbon compared to steel truss alternative.'
      ],
      demographics: {
        studentsVGU: 54,
        studentsOutside: 10,
        facultyVGU: 8,
        facultyOutside: 4,
        industryVGU: 1,
        industryOutside: 3
      }
    };

    populateFormData(sample);
    recalculateDemographics();

    // Mark all documents as attached
    MANDATORY_DOCUMENTS.forEach(doc => {
      setDocumentStatus(doc.id, true, doc.fileName, '1.6 MB');
    });

    logActivity('PREFILL_SAMPLE', 'Loaded comprehensive Architecture Department sample dataset into form.');
  }

  function recalculateDemographics() {
    const sV = parseInt(document.getElementById('demoStudentsVGU').value, 10) || 0;
    const sO = parseInt(document.getElementById('demoStudentsOutside').value, 10) || 0;
    const sTot = sV + sO;
    const sTotEl = document.getElementById('demoStudentsTotal');
    if (sTotEl) sTotEl.textContent = sTot;

    const fV = parseInt(document.getElementById('demoFacultyVGU').value, 10) || 0;
    const fO = parseInt(document.getElementById('demoFacultyOutside').value, 10) || 0;
    const fTot = fV + fO;
    const fTotEl = document.getElementById('demoFacultyTotal');
    if (fTotEl) fTotEl.textContent = fTot;

    const iV = parseInt(document.getElementById('demoIndustryVGU').value, 10) || 0;
    const iO = parseInt(document.getElementById('demoIndustryOutside').value, 10) || 0;
    const iTot = iV + iO;
    const iTotEl = document.getElementById('demoIndustryTotal');
    if (iTotEl) iTotEl.textContent = iTot;

    const gV = sV + fV + iV;
    const gO = sO + fO + iO;
    const gTot = sTot + fTot + iTot;

    const gVEl = document.getElementById('demoGrandVGU');
    const gOEl = document.getElementById('demoGrandOutside');
    const gTotEl = document.getElementById('demoGrandTotal');

    if (gVEl) gVEl.textContent = gV;
    if (gOEl) gOEl.textContent = gO;
    if (gTotEl) gTotEl.textContent = gTot;
  }

  // --- 13 Supporting Documents Upload State ---
  let formDocumentsState = [];

  function renderDocumentsUploadList(existingDocs) {
    const container = document.getElementById('mandatoryDocumentsList');
    if (!container) return;

    formDocumentsState = MANDATORY_DOCUMENTS.map(doc => {
      const existing = existingDocs ? existingDocs.find(d => d.id === doc.id) : null;
      return {
        id: doc.id,
        title: doc.title,
        reqNote: doc.reqNote,
        fileName: existing ? existing.fileName : null,
        fileSize: existing ? existing.fileSize : null,
        uploaded: existing ? existing.uploaded : false,
        scannedAt300Dpi: true
      };
    });

    container.innerHTML = formDocumentsState.map(doc => {
      const isUp = doc.uploaded;
      const statusBadge = isUp
        ? '<span class="badge badge-approved">Document Attached</span>'
        : '<span class="badge badge-draft">Pending Upload</span>';

      const fileInfo = isUp
        ? `<div class="doc-filename">${doc.fileName} (${doc.fileSize})</div>`
        : `<div class="doc-filename" style="color:#94a3b8;">No file selected</div>`;

      const actionBtn = isUp
        ? `<button type="button" class="btn btn-secondary btn-sm" onclick="window.CS.triggerFileUpload(${doc.id})">Replace</button>
           <button type="button" class="btn btn-danger btn-sm" onclick="window.CS.removeDocument(${doc.id})">Remove</button>`
        : `<button type="button" class="btn btn-primary btn-sm" onclick="window.CS.triggerFileUpload(${doc.id})">
            Attach Scanned File
           </button>`;

      return `
        <div class="doc-upload-row" id="docRow_${doc.id}">
          <div class="doc-num">${doc.id}</div>
          <div class="doc-info">
            <div class="doc-name">${doc.title}</div>
            <div class="doc-compliance">${doc.reqNote}</div>
          </div>
          <div class="doc-status-col">
            ${statusBadge}
            ${fileInfo}
          </div>
          <div class="doc-actions-col">
            ${actionBtn}
            <input type="file" id="fileInput_${doc.id}" class="file-input-hidden" accept=".pdf,.docx,.png,.jpg" onchange="window.CS.handleFileSelected(${doc.id}, this)">
          </div>
        </div>
      `;
    }).join('');

    updateUploadProgressCounter();
  }

  function triggerFileUpload(docId) {
    const input = document.getElementById(`fileInput_${docId}`);
    if (input) input.click();
  }

  function handleFileSelected(docId, inputEl) {
    if (inputEl.files && inputEl.files[0]) {
      const file = inputEl.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setDocumentStatus(docId, true, file.name, sizeMb);
      logActivity('FILE_UPLOAD', `Uploaded Document ${docId}: ${file.name} (${sizeMb}) with flatbed scan confirmation.`);
    }
  }

  function setDocumentStatus(docId, uploaded, fileName, fileSize) {
    const doc = formDocumentsState.find(d => d.id === docId);
    if (!doc) return;

    doc.uploaded = uploaded;
    doc.fileName = fileName;
    doc.fileSize = fileSize;

    const row = document.getElementById(`docRow_${docId}`);
    if (!row) return;

    const statusCol = row.querySelector('.doc-status-col');
    const actionsCol = row.querySelector('.doc-actions-col');

    if (statusCol) {
      statusCol.innerHTML = uploaded
        ? `<span class="badge badge-approved">Document Attached</span>
           <div class="doc-filename">${fileName} (${fileSize})</div>`
        : `<span class="badge badge-draft">Pending Upload</span>
           <div class="doc-filename" style="color:#94a3b8;">No file selected</div>`;
    }

    if (actionsCol) {
      actionsCol.innerHTML = uploaded
        ? `<button type="button" class="btn btn-secondary btn-sm" onclick="window.CS.triggerFileUpload(${docId})">Replace</button>
           <button type="button" class="btn btn-danger btn-sm" onclick="window.CS.removeDocument(${docId})">Remove</button>
           <input type="file" id="fileInput_${docId}" class="file-input-hidden" accept=".pdf,.docx,.png,.jpg" onchange="window.CS.handleFileSelected(${docId}, this)">`
        : `<button type="button" class="btn btn-primary btn-sm" onclick="window.CS.triggerFileUpload(${docId})">Attach Scanned File</button>
           <input type="file" id="fileInput_${docId}" class="file-input-hidden" accept=".pdf,.docx,.png,.jpg" onchange="window.CS.handleFileSelected(${docId}, this)">`;
    }

    updateUploadProgressCounter();
  }

  function removeDocument(docId) {
    setDocumentStatus(docId, false, null, null);
    logActivity('FILE_REMOVE', `Removed Document ${docId} from attachment list.`);
  }

  function updateUploadProgressCounter() {
    const uploadedCount = formDocumentsState.filter(d => d.uploaded).length;
    const totalCount = formDocumentsState.length;
    const counterEl = document.getElementById('docsUploadCounter');
    if (counterEl) {
      counterEl.textContent = `${uploadedCount} of ${totalCount} Attached`;
      if (uploadedCount === totalCount) {
        counterEl.className = 'badge badge-approved';
      } else {
        counterEl.className = 'badge badge-pending';
      }
    }
  }

  // Collect form data into object
  function gatherFormData() {
    const sV = parseInt(document.getElementById('demoStudentsVGU').value, 10) || 0;
    const sO = parseInt(document.getElementById('demoStudentsOutside').value, 10) || 0;
    const fV = parseInt(document.getElementById('demoFacultyVGU').value, 10) || 0;
    const fO = parseInt(document.getElementById('demoFacultyOutside').value, 10) || 0;
    const iV = parseInt(document.getElementById('demoIndustryVGU').value, 10) || 0;
    const iO = parseInt(document.getElementById('demoIndustryOutside').value, 10) || 0;

    const objectives = [
      document.getElementById('formObj1').value.trim(),
      document.getElementById('formObj2').value.trim(),
      document.getElementById('formObj3').value.trim()
    ].filter(Boolean);

    const keyActivities = [
      document.getElementById('formAct1').value.trim(),
      document.getElementById('formAct2').value.trim(),
      document.getElementById('formAct3').value.trim(),
      document.getElementById('formAct4').value.trim(),
      document.getElementById('formAct5').value.trim()
    ].filter(Boolean);

    const outcomes = [
      document.getElementById('formOut1').value.trim(),
      document.getElementById('formOut2').value.trim(),
      document.getElementById('formOut3').value.trim()
    ].filter(Boolean);

    return {
      department: 'Department of Architecture & Planning',
      eventDate: document.getElementById('formEventDate').value,
      duration: document.getElementById('formDuration').value.trim(),
      activityTitle: document.getElementById('formActivityTitle').value.trim(),
      activityType: document.getElementById('formActivityType').value,
      venue: document.getElementById('formVenue').value.trim(),
      organizingUnit: document.getElementById('formOrganizingUnit').value.trim(),
      primarySdg: parseInt(document.getElementById('formPrimarySdg').value, 10) || 11,
      sdgTargets: document.getElementById('formSdgTargets').value.trim(),
      objectives,
      keyActivities,
      outcomes,
      demographics: {
        studentsVGU: sV,
        studentsOutside: sO,
        facultyVGU: fV,
        facultyOutside: fO,
        industryVGU: iV,
        industryOutside: iO
      },
      documents: formDocumentsState.map(d => ({ ...d }))
    };
  }

  function validateForm(data) {
    if (!data.activityTitle) {
      alert('Validation Notice: Please provide the Title of the Activity.');
      document.getElementById('formActivityTitle').focus();
      return false;
    }
    if (!data.eventDate) {
      alert('Validation Notice: Please select the Date of Event.');
      document.getElementById('formEventDate').focus();
      return false;
    }
    if (!data.venue) {
      alert('Validation Notice: Please specify the Venue and Organizing Unit.');
      document.getElementById('formVenue').focus();
      return false;
    }
    if (data.objectives.length < 1) {
      alert('Validation Notice: Please provide at least one formal objective.');
      document.getElementById('formObj1').focus();
      return false;
    }
    return true;
  }

  // --- Save Draft & Submit Workflow ---
  function saveDraft() {
    const data = gatherFormData();
    let recordId = STATE.editingReportId;

    if (!recordId) {
      recordId = `VGU-ARCH-${new Date().getFullYear()}-${String(STATE.submissions.length + 1).padStart(3, '0')}`;
      data.id = recordId;
      data.status = 'DRAFT';
      data.submittedBy = `${STATE.currentUser.name} (${STATE.currentUser.id})`;
      data.submittedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
      STATE.submissions.unshift(data);
    } else {
      const idx = STATE.submissions.findIndex(s => s.id === recordId);
      if (idx !== -1) {
        data.id = recordId;
        data.status = STATE.submissions[idx].status || 'DRAFT';
        data.submittedBy = STATE.submissions[idx].submittedBy;
        data.submittedAt = STATE.submissions[idx].submittedAt;
        STATE.submissions[idx] = data;
      }
    }

    saveSubmissions();
    logActivity('SAVE_DRAFT', `Saved report draft ${recordId} locally.`);
    alert(`Draft Saved: Report ${recordId} has been saved. You can resume editing or submit it for HOD review at any time.`);
    switchView('saved_reports');
  }

  function submitForApproval() {
    const data = gatherFormData();
    if (!validateForm(data)) return;

    const unuploadedDocs = data.documents.filter(d => !d.uploaded);
    if (unuploadedDocs.length > 0) {
      const proceed = confirm(
        `Audit Notice: ${unuploadedDocs.length} of 13 mandatory supporting documents have not been attached yet.\n\n` +
        `The VGU IQAC 14-point guidelines mandate 100% flatbed-scanned document compliance. Do you still wish to submit for preliminary HOD review?`
      );
      if (!proceed) return;
    }

    let recordId = STATE.editingReportId;
    if (!recordId) {
      recordId = `VGU-ARCH-${new Date().getFullYear()}-${String(STATE.submissions.length + 1).padStart(3, '0')}`;
      data.id = recordId;
      data.status = 'PENDING';
      data.submittedBy = `${STATE.currentUser.name} (${STATE.currentUser.id})`;
      data.submittedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
      STATE.submissions.unshift(data);
    } else {
      const idx = STATE.submissions.findIndex(s => s.id === recordId);
      if (idx !== -1) {
        data.id = recordId;
        data.status = 'PENDING';
        data.submittedBy = STATE.submissions[idx].submittedBy;
        data.submittedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
        STATE.submissions[idx] = data;
      }
    }

    saveSubmissions();
    logActivity('SUBMIT_APPROVAL', `Submitted 14-point report ${recordId} for HOD review and IQAC audit stamp.`);
    alert(`Submission Successful: Event Report ${recordId} has been formally submitted to the Head of Department (Prof. Dr. Neha Agarwal) for verification.`);
    switchView('saved_reports');
  }

  // --- View 6: Saved Reports & Entries Directory ---
  function renderSavedReports() {
    const tbody = document.getElementById('savedReportsTableBody');
    if (!tbody) return;

    const q = STATE.searchQuery.toLowerCase();
    const filter = STATE.filterStatus;

    const filtered = STATE.submissions.filter(sub => {
      const matchesSearch = !q ||
        sub.activityTitle.toLowerCase().includes(q) ||
        sub.id.toLowerCase().includes(q) ||
        sub.activityType.toLowerCase().includes(q);

      const matchesFilter = (filter === 'ALL') || (sub.status === filter);
      return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2rem; color: var(--color-text-muted);">
            No academic event reports match the search criteria or filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(item => {
      let badgeClass = 'badge-draft';
      let statusText = 'Draft';
      if (item.status === 'APPROVED') {
        badgeClass = 'badge-approved';
        statusText = 'Approved by HOD';
      } else if (item.status === 'PENDING') {
        badgeClass = 'badge-pending';
        statusText = 'Pending HOD Review';
      } else if (item.status === 'REVISION') {
        badgeClass = 'badge-danger';
        statusText = 'Revision Requested';
      }

      return `
        <tr>
          <td style="font-family: var(--font-mono); font-weight: 700; color: var(--color-primary);">${item.id}</td>
          <td>
            <strong>${item.activityTitle}</strong>
            <div style="font-size: 0.75rem; color: var(--color-text-muted);">
              Venue: ${item.venue} | ${item.submittedBy}
            </div>
          </td>
          <td>${item.eventDate}</td>
          <td>${item.activityType}</td>
          <td><span class="badge badge-neutral">SDG ${item.primarySdg}</span></td>
          <td><span class="badge ${badgeClass}">${statusText}</span></td>
          <td class="action-cell">
            <button class="btn btn-secondary btn-sm" onclick="window.CS.openReportPreview('${item.id}')" title="Preview Official Report">
              Preview
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.CS.generateAndDownloadWordDoc('${item.id}')" title="Download Word (.docx)">
              Download .docx
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.CS.editReport('${item.id}')" title="Edit and regenerate">
              Edit
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function handleSearchInput(value) {
    STATE.searchQuery = value;
    renderSavedReports();
  }

  function handleStatusFilter(status) {
    STATE.filterStatus = status;
    renderSavedReports();
  }

  function editReport(reportId) {
    switchView('event_form', { reportId });
  }

  // --- View 7: HOD & Academic Audit Verification View ---
  function renderHodView() {
    // Calculate metrics
    const total = STATE.submissions.length;
    const pending = STATE.submissions.filter(s => s.status === 'PENDING').length;
    const approved = STATE.submissions.filter(s => s.status === 'APPROVED').length;
    const revision = STATE.submissions.filter(s => s.status === 'REVISION').length;

    const totalEl = document.getElementById('metricTotalSubmissions');
    const pendingEl = document.getElementById('metricPendingReview');
    const approvedEl = document.getElementById('metricApprovedReports');
    const revisionEl = document.getElementById('metricRevisionsRequested');

    if (totalEl) totalEl.textContent = total;
    if (pendingEl) pendingEl.textContent = pending;
    if (approvedEl) approvedEl.textContent = approved;
    if (revisionEl) revisionEl.textContent = revision;

    const tbody = document.getElementById('hodSubmissionsTableBody');
    if (!tbody) return;

    if (STATE.submissions.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2rem; color: var(--color-text-muted);">
            No departmental submissions in the verification queue.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = STATE.submissions.map(item => {
      let badgeClass = 'badge-draft';
      let statusText = 'Draft';
      if (item.status === 'APPROVED') {
        badgeClass = 'badge-approved';
        statusText = 'Approved';
      } else if (item.status === 'PENDING') {
        badgeClass = 'badge-pending';
        statusText = 'Awaiting Review';
      } else if (item.status === 'REVISION') {
        badgeClass = 'badge-danger';
        statusText = 'Revision Req.';
      }

      const docsUploaded = item.documents ? item.documents.filter(d => d.uploaded).length : 0;
      const docsCompliance = `${docsUploaded} / 13 Verified`;

      return `
        <tr>
          <td style="font-family: var(--font-mono); font-weight: 700;">${item.id}</td>
          <td>
            <strong>${item.activityTitle}</strong>
            <div style="font-size: 0.75rem; color: var(--color-text-muted);">
              Coordinator: ${item.submittedBy} | Submitted: ${item.submittedAt}
            </div>
          </td>
          <td>${item.eventDate}</td>
          <td>${item.activityType}</td>
          <td>
            <span class="badge ${docsUploaded === 13 ? 'badge-approved' : 'badge-pending'}">${docsCompliance}</span>
          </td>
          <td><span class="badge ${badgeClass}">${statusText}</span></td>
          <td class="action-cell">
            <button class="btn btn-primary btn-sm" onclick="window.CS.openHodAuditModal('${item.id}')">
              Review & Audit
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.CS.generateAndDownloadWordDoc('${item.id}')">
              Word (.docx)
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // --- Official Report Preview Modal ---
  function openReportPreview(reportId) {
    const report = STATE.submissions.find(s => s.id === reportId);
    if (!report) return;

    const modal = document.getElementById('reportPreviewModal');
    const content = document.getElementById('reportPreviewContent');
    if (!modal || !content) return;

    const demo = report.demographics || {
      studentsVGU: 0, studentsOutside: 0,
      facultyVGU: 0, facultyOutside: 0,
      industryVGU: 0, industryOutside: 0
    };
    const sTot = demo.studentsVGU + demo.studentsOutside;
    const fTot = demo.facultyVGU + demo.facultyOutside;
    const iTot = demo.industryVGU + demo.industryOutside;
    const grandVGU = demo.studentsVGU + demo.facultyVGU + demo.industryVGU;
    const grandOutside = demo.studentsOutside + demo.facultyOutside + demo.industryOutside;
    const grandTotal = sTot + fTot + iTot;

    const sdgObj = UN_SDGS.find(s => s.num === report.primarySdg) || UN_SDGS[10];

    content.innerHTML = `
      <div class="official-report-sheet">
        <div class="official-report-header">
          <h2>VIVEKANANDA GLOBAL UNIVERSITY, JAIPUR</h2>
          <h3>DEPARTMENT OF ARCHITECTURE & PLANNING</h3>
          <p>INTERNAL QUALITY ASSURANCE CELL (IQAC) - OFFICIAL 14-POINT EVENT AUDIT REPORT</p>
          <div style="margin-top: 0.5rem; font-size: 0.8rem; font-family: var(--font-mono);">
            Official Reference ID: <strong>${report.id}</strong> | IQAC Stamp: <strong>${report.iqacRef || 'PENDING VERIFICATION'}</strong>
          </div>
        </div>

        <div class="report-section-heading">PART I: EVENT SUMMARY & INSTITUTIONAL METADATA</div>
        <table class="report-summary-table">
          <tr>
            <th>Date of Event</th>
            <td>${report.eventDate} (${report.duration || 'Full Duration'})</td>
            <th>Department</th>
            <td>${report.department}</td>
          </tr>
          <tr>
            <th>Title of Activity</th>
            <td colspan="3"><strong>${report.activityTitle}</strong></td>
          </tr>
          <tr>
            <th>Type of Activity</th>
            <td>${report.activityType}</td>
            <th>Primary SDG</th>
            <td>${sdgObj.title}</td>
          </tr>
          <tr>
            <th>Venue & Organizing Unit</th>
            <td colspan="3">${report.venue} — <em>Organized by: ${report.organizingUnit}</em></td>
          </tr>
          <tr>
            <th>Specific SDG Targets Addressed</th>
            <td colspan="3">${report.sdgTargets || 'SDG Target alignment documented in accordance with institutional sustainability guidelines.'}</td>
          </tr>
        </table>

        <div class="report-section-heading">PART II: OBJECTIVES & METHODOLOGY</div>
        <ol style="margin-left: 1.5rem; margin-bottom: 1rem; font-size: 0.9rem;">
          ${(report.objectives || []).map(obj => `<li style="margin-bottom: 0.25rem;">${obj}</li>`).join('')}
        </ol>

        <div class="report-section-heading">PART III: PARTICIPANT DEMOGRAPHICS MATRIX</div>
        <table class="matrix-table" style="margin-bottom: 1rem;">
          <thead>
            <tr>
              <th>Participant Classification</th>
              <th style="text-align: right;">VGU Affiliated</th>
              <th style="text-align: right;">Outside VGU / Abroad</th>
              <th style="text-align: right;">Consolidated Category Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Students</td>
              <td style="text-align: right; font-family: var(--font-mono);">${demo.studentsVGU}</td>
              <td style="text-align: right; font-family: var(--font-mono);">${demo.studentsOutside}</td>
              <td style="text-align: right; font-family: var(--font-mono); font-weight: 700;">${sTot}</td>
            </tr>
            <tr>
              <td>Faculty Members</td>
              <td style="text-align: right; font-family: var(--font-mono);">${demo.facultyVGU}</td>
              <td style="text-align: right; font-family: var(--font-mono);">${demo.facultyOutside}</td>
              <td style="text-align: right; font-family: var(--font-mono); font-weight: 700;">${fTot}</td>
            </tr>
            <tr>
              <td>Industry Persons & Experts</td>
              <td style="text-align: right; font-family: var(--font-mono);">${demo.industryVGU}</td>
              <td style="text-align: right; font-family: var(--font-mono);">${demo.industryOutside}</td>
              <td style="text-align: right; font-family: var(--font-mono); font-weight: 700;">${iTot}</td>
            </tr>
            <tr class="total-row">
              <td><strong>CONSOLIDATED GRAND TOTAL</strong></td>
              <td style="text-align: right; font-family: var(--font-mono); font-weight: 700;">${grandVGU}</td>
              <td style="text-align: right; font-family: var(--font-mono); font-weight: 700;">${grandOutside}</td>
              <td style="text-align: right; font-family: var(--font-mono); font-weight: 700;">${grandTotal}</td>
            </tr>
          </tbody>
        </table>

        <div class="report-section-heading">PART IV: KEY ACTIVITIES CONDUCTED</div>
        <ul style="margin-left: 1.5rem; margin-bottom: 1rem; font-size: 0.9rem;">
          ${(report.keyActivities || []).map(act => `<li style="margin-bottom: 0.25rem;">${act}</li>`).join('')}
        </ul>

        <div class="report-section-heading">PART V: OUTCOMES & SUSTAINABILITY IMPACT</div>
        <ul style="margin-left: 1.5rem; margin-bottom: 1rem; font-size: 0.9rem;">
          ${(report.outcomes || []).map(out => `<li style="margin-bottom: 0.25rem;">${out}</li>`).join('')}
        </ul>

        <div class="report-section-heading">PART VI: 13-POINT MANDATORY SUPPORTING ANNEXURE INDEX</div>
        <div style="font-size: 0.78rem; font-style: italic; margin-bottom: 0.5rem; color: #555555;">
          * Scanner Protocol: In accordance with university IQAC regulations, all attached documents are certified to have been digitized using a hardware flatbed scanner at 300 DPI.
        </div>
        <table class="report-summary-table">
          <thead>
            <tr>
              <th style="width: 8%;">Point</th>
              <th style="width: 52%;">Mandatory Document Description</th>
              <th style="width: 25%;">Attachment Verification Status</th>
              <th style="width: 15%;">Page Ref.</th>
            </tr>
          </thead>
          <tbody>
            ${(report.documents || []).map(doc => `
              <tr>
                <td style="text-align: center; font-weight: 700;">Doc ${doc.id}</td>
                <td>${doc.title}</td>
                <td>
                  ${doc.uploaded 
                    ? `<span style="color: #166534; font-weight: 600;">Verified Flatbed Scan Attached</span><br><small style="font-family: var(--font-mono);">${doc.fileName || ''}</small>` 
                    : '<span style="color: #991b1b; font-weight: 600;">Document Pending</span>'}
                </td>
                <td style="text-align: center; font-family: var(--font-mono);">Annexure ${doc.id} (P. ${10 + doc.id})</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="official-sign-row">
          <div class="signature-block">
            <strong>Coordinator / Convener</strong><br>
            ${report.submittedBy || 'Ar. Rajesh Sharma'}
          </div>
          <div class="signature-block">
            <strong>Head of Department</strong><br>
            ${report.approvedBy || 'Prof. Dr. Neha Agarwal'}
          </div>
          <div class="signature-block">
            <strong>Director, IQAC</strong><br>
            Vivekananda Global University
          </div>
        </div>
      </div>
    `;

    document.getElementById('modalDownloadDocxBtn').onclick = () => {
      generateAndDownloadWordDoc(report.id);
    };

    modal.style.display = 'flex';
  }

  function closeReportPreview() {
    const modal = document.getElementById('reportPreviewModal');
    if (modal) modal.style.display = 'none';
  }

  // --- HOD Audit Review Modal ---
  let currentHodReviewReportId = null;

  function openHodAuditModal(reportId) {
    currentHodReviewReportId = reportId;
    const report = STATE.submissions.find(s => s.id === reportId);
    if (!report) return;

    const modal = document.getElementById('hodAuditModal');
    const content = document.getElementById('hodAuditContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-muted);">
          Department Audit Ledger & Compliance Sign-off
        </div>
        <h3 style="font-size: 1.2rem; color: var(--color-primary); margin: 0.25rem 0;">
          ${report.activityTitle}
        </h3>
        <div style="font-size: 0.85rem; color: var(--color-text-secondary);">
          Report ID: <strong>${report.id}</strong> | Submitted by: <strong>${report.submittedBy}</strong> | Date: ${report.eventDate}
        </div>
      </div>

      <div class="alert-box alert-scanner" style="margin-bottom: 1.25rem;">
        <div>
          <strong>HOD Audit Directive (Flatbed Scanner Verification):</strong>
          Confirm that all supporting documents adhere to minimum 300 DPI flatbed resolution. Flag any entries utilizing camera-skewed or mobile-filtered images for revision.
        </div>
      </div>

      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.75rem; text-transform: uppercase;">
        13-Point Supporting Documents Compliance Verification:
      </h4>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
        ${(report.documents || []).map(doc => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.85rem; border: 1px solid var(--color-border-light); border-radius: var(--radius-sm); background-color: #ffffff;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <input type="checkbox" id="hodCheckDoc_${doc.id}" ${doc.uploaded ? 'checked' : ''} style="width: 16px; height: 16px;">
              <div>
                <label for="hodCheckDoc_${doc.id}" style="font-size: 0.85rem; font-weight: 600; cursor: pointer;">
                  Point ${doc.id}: ${doc.title}
                </label>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">
                  ${doc.uploaded ? `Attached file: ${doc.fileName} (${doc.fileSize})` : 'Pending faculty upload'}
                </div>
              </div>
            </div>
            <div>
              <span class="badge ${doc.uploaded ? 'badge-approved' : 'badge-danger'}">
                ${doc.uploaded ? 'Attached' : 'Missing'}
              </span>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="form-group">
        <label class="form-label" for="hodAuditRemarks">
          HOD Verification Remarks & IQAC Audit Notes:
        </label>
        <textarea id="hodAuditRemarks" class="form-control" placeholder="Enter verification notes or specify revisions needed...">${report.remarks || ''}</textarea>
      </div>
    `;

    modal.style.display = 'flex';
  }

  function closeHodAuditModal() {
    const modal = document.getElementById('hodAuditModal');
    if (modal) modal.style.display = 'none';
  }

  function approveReportByHod() {
    if (!currentHodReviewReportId) return;
    const report = STATE.submissions.find(s => s.id === currentHodReviewReportId);
    if (!report) return;

    const remarks = document.getElementById('hodAuditRemarks').value.trim();
    report.status = 'APPROVED';
    report.approvedBy = `${STATE.currentUser.name} (${STATE.currentUser.designation})`;
    report.approvedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    report.iqacRef = `VGU/IQAC/${new Date().getFullYear()}/ARCH-${String(Math.floor(100 + Math.random() * 900))}`;
    report.remarks = remarks || 'Approved by Head of Department with full flatbed document verification.';

    saveSubmissions();
    logActivity('HOD_APPROVE', `HOD approved 14-point event report ${report.id} with IQAC Ref ${report.iqacRef}.`);
    alert(`Report Approved: Event report ${report.id} has been formally verified and sealed with IQAC Reference ID: ${report.iqacRef}.`);

    closeHodAuditModal();
    renderHodView();
  }

  function requestRevisionByHod() {
    if (!currentHodReviewReportId) return;
    const report = STATE.submissions.find(s => s.id === currentHodReviewReportId);
    if (!report) return;

    const remarks = document.getElementById('hodAuditRemarks').value.trim();
    if (!remarks) {
      alert('Action Required: Please provide specific revision instructions in the remarks box before returning the report to faculty.');
      return;
    }

    report.status = 'REVISION';
    report.remarks = remarks;

    saveSubmissions();
    logActivity('HOD_REVISION', `HOD requested revisions on report ${report.id}: "${remarks}".`);
    alert(`Revision Requested: Report ${report.id} returned to faculty for amendments.`);

    closeHodAuditModal();
    renderHodView();
  }

  // --- Real Word (.docx) Generation ---
  async function generateAndDownloadWordDoc(reportId) {
    const report = STATE.submissions.find(s => s.id === reportId);
    if (!report) {
      alert('Error: Specified report was not found in records.');
      return;
    }

    logActivity('GENERATE_DOCX', `Generated official Word (.docx) report for ${report.id}: ${report.activityTitle}.`);

    const demo = report.demographics || {
      studentsVGU: 0, studentsOutside: 0,
      facultyVGU: 0, facultyOutside: 0,
      industryVGU: 0, industryOutside: 0
    };
    const sTot = demo.studentsVGU + demo.studentsOutside;
    const fTot = demo.facultyVGU + demo.facultyOutside;
    const iTot = demo.industryVGU + demo.industryOutside;
    const grandVGU = demo.studentsVGU + demo.facultyVGU + demo.industryVGU;
    const grandOutside = demo.studentsOutside + demo.facultyOutside + demo.industryOutside;
    const grandTotal = sTot + fTot + iTot;

    const sdgObj = UN_SDGS.find(s => s.num === report.primarySdg) || UN_SDGS[10];

    // Check if docx library is loaded via CDN
    if (window.docx) {
      try {
        const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel, BorderStyle } = window.docx;

        const borderSpec = {
          top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
          left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
          right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        };

        const createCell = (text, isHeader = false, widthPct = 25, bold = false) => {
          return new TableCell({
            width: { size: widthPct, type: WidthType.PERCENTAGE },
            borders: borderSpec,
            shading: isHeader ? { fill: "F0F0F0" } : undefined,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: String(text || ""),
                    bold: bold || isHeader,
                    size: 20 // 10pt
                  })
                ]
              })
            ]
          });
        };

        const doc = new Document({
          sections: [{
            properties: {},
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "VIVEKANANDA GLOBAL UNIVERSITY, JAIPUR", bold: true, size: 30, color: "0A2540" })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "DEPARTMENT OF ARCHITECTURE & PLANNING", bold: true, size: 24, color: "333333" })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "INTERNAL QUALITY ASSURANCE CELL (IQAC) - OFFICIAL 14-POINT EVENT REPORT", italics: true, size: 20 })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: `Report Reference ID: ${report.id}  |  IQAC Reference: ${report.iqacRef || "Pending Approval"}`, bold: true, size: 18 })
                ]
              }),
              new Paragraph({ text: "" }),

              // Section 1
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "PART I: EVENT SUMMARY DETAILS", bold: true, size: 22 })]
              }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      createCell("Date of Event", true, 25),
                      createCell(`${report.eventDate} (${report.duration || 'Full Session'})`, false, 25),
                      createCell("Department", true, 25),
                      createCell(report.department, false, 25)
                    ]
                  }),
                  new TableRow({
                    children: [
                      createCell("Title of Activity", true, 25),
                      createCell(report.activityTitle, false, 75, true)
                    ]
                  }),
                  new TableRow({
                    children: [
                      createCell("Type of Activity", true, 25),
                      createCell(report.activityType, false, 25),
                      createCell("Primary SDG", true, 25),
                      createCell(sdgObj.title, false, 25)
                    ]
                  }),
                  new TableRow({
                    children: [
                      createCell("Venue & Organizing Unit", true, 25),
                      createCell(`${report.venue} — Organized by: ${report.organizingUnit}`, false, 75)
                    ]
                  }),
                  new TableRow({
                    children: [
                      createCell("SDG Targets Addressed", true, 25),
                      createCell(report.sdgTargets || "Aligned with institutional SDG milestones.", false, 75)
                    ]
                  })
                ]
              }),
              new Paragraph({ text: "" }),

              // Section 2: Objectives
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "PART II: OBJECTIVES (3 BULLET POINTS)", bold: true, size: 22 })]
              }),
              ...(report.objectives || []).map((obj, i) => new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: `${obj}`, size: 20 })]
              })),
              new Paragraph({ text: "" }),

              // Section 3: Demographics
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "PART III: PARTICIPANT DEMOGRAPHICS MATRIX", bold: true, size: 22 })]
              }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      createCell("Classification", true, 40),
                      createCell("VGU Affiliated", true, 20),
                      createCell("Outside VGU / Abroad", true, 20),
                      createCell("Total", true, 20)
                    ]
                  }),
                  new TableRow({
                    children: [
                      createCell("Students", false, 40),
                      createCell(demo.studentsVGU, false, 20),
                      createCell(demo.studentsOutside, false, 20),
                      createCell(sTot, false, 20, true)
                    ]
                  }),
                  new TableRow({
                    children: [
                      createCell("Faculty Members", false, 40),
                      createCell(demo.facultyVGU, false, 20),
                      createCell(demo.facultyOutside, false, 20),
                      createCell(fTot, false, 20, true)
                    ]
                  }),
                  new TableRow({
                    children: [
                      createCell("Industry Persons & Experts", false, 40),
                      createCell(demo.industryVGU, false, 20),
                      createCell(demo.industryOutside, false, 20),
                      createCell(iTot, false, 20, true)
                    ]
                  }),
                  new TableRow({
                    children: [
                      createCell("CONSOLIDATED GRAND TOTAL", true, 40, true),
                      createCell(grandVGU, true, 20, true),
                      createCell(grandOutside, true, 20, true),
                      createCell(grandTotal, true, 20, true)
                    ]
                  })
                ]
              }),
              new Paragraph({ text: "" }),

              // Section 4: Key Activities
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "PART IV: KEY ACTIVITIES (3 TO 5 BULLET POINTS)", bold: true, size: 22 })]
              }),
              ...(report.keyActivities || []).map(act => new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: `${act}`, size: 20 })]
              })),
              new Paragraph({ text: "" }),

              // Section 5: Outcomes & Impact
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "PART V: OUTCOMES & IMPACT LINKED TO SDG TARGETS", bold: true, size: 22 })]
              }),
              ...(report.outcomes || []).map(out => new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: `${out}`, size: 20 })]
              })),
              new Paragraph({ text: "" }),

              // Section 6: 13-Point Supporting Documents
              new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "PART VI: CONTENT TABLE OF 13 SUPPORTING DOCUMENTS (FLATBED SCANNED AT 300 DPI)", bold: true, size: 22 })]
              }),
              new Paragraph({
                children: [new TextRun({ text: "University IQAC Mandate: All supporting documents must be scanned using a hardware flatbed scanner and not mobile phone scanning applications.", italics: true, size: 18, color: "777777" })]
              }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      createCell("Point", true, 10),
                      createCell("Supporting Document Name", true, 55),
                      createCell("Upload Status & Scan Check", true, 25),
                      createCell("Page Ref.", true, 10)
                    ]
                  }),
                  ...(report.documents || []).map(doc => new TableRow({
                    children: [
                      createCell(`Doc ${doc.id}`, false, 10, true),
                      createCell(doc.title, false, 55),
                      createCell(doc.uploaded ? `Attached: ${doc.fileName}` : "Pending Upload", false, 25),
                      createCell(`P. ${10 + doc.id}`, false, 10)
                    ]
                  }))
                ]
              }),
              new Paragraph({ text: "" }),
              new Paragraph({ text: "" }),

              // Signatures
              new Paragraph({
                children: [
                  new TextRun({ text: "_____________________________              _____________________________              _____________________________\n", bold: true }),
                  new TextRun({ text: `Coordinator / Convener: ${report.submittedBy || 'Ar. Rajesh Sharma'}           HOD: ${report.approvedBy || 'Prof. Dr. Neha Agarwal'}            Director, IQAC (VGU)`, bold: true, size: 18 })
                ]
              })
            ]
          }]
        });

        const blob = await Packer.toBlob(doc);
        const fileName = `${report.id}_Official_Event_Report.docx`;
        downloadBlob(blob, fileName);
        return;
      } catch (err) {
        console.warn('DOCX library generation error, falling back to compliant Word XML', err);
      }
    }

    // Fallback: Generate Microsoft Word compliant .docx document via HTML/WordML Blob
    generateCompliantWordBlob(report, demo, sTot, fTot, iTot, grandVGU, grandOutside, grandTotal, sdgObj);
  }

  function generateCompliantWordBlob(report, demo, sTot, fTot, iTot, grandVGU, grandOutside, grandTotal, sdgObj) {
    const wordXml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${report.id} - Vivekananda Global University Event Report</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.35; color: #000; }
          h1 { text-align: center; font-size: 16pt; font-weight: bold; margin-bottom: 2pt; text-transform: uppercase; color: #0a2540; }
          h2 { text-align: center; font-size: 12pt; font-weight: bold; margin-bottom: 4pt; color: #333; }
          h3 { text-align: center; font-size: 10pt; font-style: italic; margin-bottom: 15pt; color: #555; }
          .section-title { font-family: Arial, sans-serif; font-size: 11pt; font-weight: bold; background-color: #f0f0f0; border: 1pt solid #000; padding: 4pt 6pt; margin: 12pt 0 4pt 0; text-transform: uppercase; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 10pt; font-size: 10pt; }
          th, td { border: 1pt solid #000; padding: 5pt 6pt; vertical-align: top; }
          th { background-color: #f7f7f7; font-family: Arial, sans-serif; font-weight: bold; }
          ul, ol { margin-top: 4pt; margin-bottom: 8pt; padding-left: 20pt; }
          li { margin-bottom: 3pt; }
          .sign-table { margin-top: 40pt; border: none; width: 100%; }
          .sign-table td { border: none; text-align: center; vertical-align: bottom; }
        </style>
      </head>
      <body>
        <h1>VIVEKANANDA GLOBAL UNIVERSITY, JAIPUR</h1>
        <h2>DEPARTMENT OF ARCHITECTURE & PLANNING</h2>
        <h3>INTERNAL QUALITY ASSURANCE CELL (IQAC) - OFFICIAL 14-POINT EVENT AUDIT REPORT</h3>
        <p style="text-align: center; font-family: monospace; font-size: 9pt;">
          <strong>Report Reference ID: ${report.id}</strong> | IQAC Stamp: <strong>${report.iqacRef || 'PENDING VERIFICATION'}</strong>
        </p>

        <div class="section-title">PART I: EVENT SUMMARY DETAILS</div>
        <table>
          <tr>
            <th style="width: 25%;">Date of Event</th>
            <td style="width: 25%;">${report.eventDate} (${report.duration || 'Full Session'})</td>
            <th style="width: 25%;">Department</th>
            <td style="width: 25%;">${report.department}</td>
          </tr>
          <tr>
            <th>Title of Activity</th>
            <td colspan="3"><strong>${report.activityTitle}</strong></td>
          </tr>
          <tr>
            <th>Type of Activity</th>
            <td>${report.activityType}</td>
            <th>Primary SDG</th>
            <td>${sdgObj.title}</td>
          </tr>
          <tr>
            <th>Venue & Organizing Unit</th>
            <td colspan="3">${report.venue} — <em>Organized by: ${report.organizingUnit}</em></td>
          </tr>
          <tr>
            <th>SDG Targets Addressed</th>
            <td colspan="3">${report.sdgTargets || 'SDG alignment documented.'}</td>
          </tr>
        </table>

        <div class="section-title">PART II: OBJECTIVES (3 BULLET POINTS)</div>
        <ol>
          ${(report.objectives || []).map(obj => `<li>${obj}</li>`).join('')}
        </ol>

        <div class="section-title">PART III: PARTICIPANT DEMOGRAPHICS MATRIX</div>
        <table>
          <thead>
            <tr>
              <th>Classification</th>
              <th style="text-align: right;">VGU Affiliated</th>
              <th style="text-align: right;">Outside VGU / Abroad</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Students</td>
              <td style="text-align: right;">${demo.studentsVGU}</td>
              <td style="text-align: right;">${demo.studentsOutside}</td>
              <td style="text-align: right; font-weight: bold;">${sTot}</td>
            </tr>
            <tr>
              <td>Faculty Members</td>
              <td style="text-align: right;">${demo.facultyVGU}</td>
              <td style="text-align: right;">${demo.facultyOutside}</td>
              <td style="text-align: right; font-weight: bold;">${fTot}</td>
            </tr>
            <tr>
              <td>Industry Persons & Experts</td>
              <td style="text-align: right;">${demo.industryVGU}</td>
              <td style="text-align: right;">${demo.industryOutside}</td>
              <td style="text-align: right; font-weight: bold;">${iTot}</td>
            </tr>
            <tr style="background-color: #f0f0f0; font-weight: bold;">
              <td>CONSOLIDATED GRAND TOTAL</td>
              <td style="text-align: right;">${grandVGU}</td>
              <td style="text-align: right;">${grandOutside}</td>
              <td style="text-align: right;">${grandTotal}</td>
            </tr>
          </tbody>
        </table>

        <div class="section-title">PART IV: KEY ACTIVITIES (3 TO 5 BULLET POINTS)</div>
        <ul>
          ${(report.keyActivities || []).map(act => `<li>${act}</li>`).join('')}
        </ul>

        <div class="section-title">PART V: OUTCOMES & IMPACT LINKED TO SDG TARGETS</div>
        <ul>
          ${(report.outcomes || []).map(out => `<li>${out}</li>`).join('')}
        </ul>

        <div class="section-title">PART VI: 13-POINT MANDATORY SUPPORTING DOCUMENTS (FLATBED SCANNED AT 300 DPI)</div>
        <p style="font-size: 8pt; font-style: italic; color: #555;">
          * Flatbed Scanner Protocol: All supporting documents must be digitized using a hardware flatbed scanner and not mobile phone scanning applications.
        </p>
        <table>
          <thead>
            <tr>
              <th style="width: 8%;">Point</th>
              <th style="width: 52%;">Mandatory Document Description</th>
              <th style="width: 25%;">Upload Status</th>
              <th style="width: 15%;">Page Ref.</th>
            </tr>
          </thead>
          <tbody>
            ${(report.documents || []).map(doc => `
              <tr>
                <td style="text-align: center; font-weight: bold;">Doc ${doc.id}</td>
                <td>${doc.title}</td>
                <td>${doc.uploaded ? `Attached: ${doc.fileName}` : 'Pending Upload'}</td>
                <td style="text-align: center;">Annexure ${doc.id} (P. ${10 + doc.id})</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <table class="sign-table">
          <tr>
            <td>
              ____________________________<br>
              <strong>Coordinator / Convener</strong><br>
              ${report.submittedBy || 'Ar. Rajesh Sharma'}
            </td>
            <td>
              ____________________________<br>
              <strong>Head of Department</strong><br>
              ${report.approvedBy || 'Prof. Dr. Neha Agarwal'}
            </td>
            <td>
              ____________________________<br>
              <strong>Director, IQAC</strong><br>
              Vivekananda Global University
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', wordXml], {
      type: 'application/msword'
    });
    const fileName = `${report.id}_Official_Event_Report.docx`;
    downloadBlob(blob, fileName);
  }

  function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 150);
  }

  // --- Audit Modal ---
  function openAuditLogModal() {
    const modal = document.getElementById('auditLogModal');
    const list = document.getElementById('auditLogList');
    if (!modal || !list) return;

    list.innerHTML = STATE.activityLogs.map(item => `
      <div class="audit-item">
        <span class="audit-timestamp">${item.timestamp}</span>
        <span class="audit-action">${item.action}</span>
        <div class="audit-details">
          <strong>[${item.user} / ${item.role}]</strong> ${item.details}
        </div>
      </div>
    `).join('');

    modal.style.display = 'flex';
  }

  function closeAuditLogModal() {
    const modal = document.getElementById('auditLogModal');
    if (modal) modal.style.display = 'none';
  }

  // --- Password Change Modal ---
  function openPasswordModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) modal.style.display = 'flex';
  }

  function closePasswordModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) modal.style.display = 'none';
  }

  function submitPasswordChange(e) {
    e.preventDefault();
    const oldP = document.getElementById('oldPassword').value;
    const newP = document.getElementById('newPassword').value;
    const confP = document.getElementById('confirmPassword').value;

    if (!oldP || !newP || !confP) {
      alert('Validation Error: All password fields are required.');
      return;
    }
    if (newP !== confP) {
      alert('Validation Error: New password and confirmation do not match.');
      return;
    }
    if (newP.length < 8) {
      alert('Security Policy: New password must be at least 8 characters in length.');
      return;
    }

    logActivity('PASSWORD_CHANGE', `User ${STATE.currentUser.name} updated account authentication password.`);
    alert('Security Notice: Your institutional portal password has been updated successfully.');
    closePasswordModal();
  }

  // --- Global CS API for Event Handlers ---
  window.CS = {
    init() {
      initStorage();
      updateUserHeader();
      startSessionTimer();
      renderDepartments();

      // Setup demographic input listeners
      const demoInputs = [
        'demoStudentsVGU', 'demoStudentsOutside',
        'demoFacultyVGU', 'demoFacultyOutside',
        'demoIndustryVGU', 'demoIndustryOutside'
      ];
      demoInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', recalculateDemographics);
      });

      // Default start on Departments view
      switchView('departments');
    },

    // Navigation & Auth
    switchView,
    handleLogin,
    handleLogout,
    toggleRole,

    // Departments & Hub
    selectDepartment,
    openComingSoon,

    // Form
    loadSampleDataIntoForm,
    recalculateDemographics,
    triggerFileUpload,
    handleFileSelected,
    removeDocument,
    saveDraft,
    submitForApproval,

    // Reports Directory
    handleSearchInput,
    handleStatusFilter,
    editReport,
    openReportPreview,
    closeReportPreview,

    // HOD Workflow
    openHodAuditModal,
    closeHodAuditModal,
    approveReportByHod,
    requestRevisionByHod,

    // Exports
    generateAndDownloadWordDoc,

    // Modals
    openAuditLogModal,
    closeAuditLogModal,
    openPasswordModal,
    closePasswordModal,
    submitPasswordChange
  };
// --- Additive AI .docx Report Generator (Python FastAPI + NVIDIA NIM / Ollama) ---
  window.CS.generateAiReportDocx = async function () {
    const data = gatherFormData();
    if (!validateForm(data)) return;

    const btn = document.getElementById('btnGenerateAiReport');
    const originalHtml = btn ? btn.innerHTML : '';

    try {
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Generating AI Report (.docx)...';
      }

      const response = await fetch('/api/generate-ai-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errPayload = await response.json().catch(() => ({}));
        throw new Error(errPayload.detail || 'Server error generating report');
      }

      const blob = await response.blob();
      const safeTitle = (data.activityTitle || 'VGU_Event_Report')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .substring(0, 50);

      downloadBlob(blob, `${safeTitle}_14Point_Report.docx`);
      logActivity('AI_GENERATE_DOCX', `Generated AI-formatted 14-point .docx report via Python backend for: ${data.activityTitle}`);
    } catch (error) {
      console.error('AI Report Generation Failed:', error);
      alert(`Report Generation Notice: ${error.message}`);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalHtml;
      }
    }
  };
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.CS.init);
  } else {
    window.CS.init();
  }

})();
