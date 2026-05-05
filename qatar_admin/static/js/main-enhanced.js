// ================================================================
//  FULL APPLICATION JS  —  Original + Enhanced Opportunities
//  All original sections preserved. Opportunities section upgraded.
// ================================================================

// ===== CAPTCHA =====
const captchas = { login:'', signup:'', forgot:'' };
function generateCaptcha(type) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let code = '';
    for (let i = 0; i < 5; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    captchas[type] = code;
    document.getElementById(type + 'CaptchaText').textContent = code;
}
generateCaptcha('login');
generateCaptcha('signup');
generateCaptcha('forgot');

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
    document.querySelectorAll('.form-page').forEach(p => p.classList.remove('active'));
    setTimeout(() => document.getElementById(pageId).classList.add('active'), 50);
    document.querySelectorAll('.error-msg').forEach(e => e.classList.remove('show'));
    document.querySelectorAll('input').forEach(i => i.classList.remove('error'));
}

function togglePass(inputId, btn) {
    const input = document.getElementById(inputId);
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    btn.innerHTML = isPass
        ? '<svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
}

// ===== HELPERS =====
function showError(id, msg) {
    const el = document.getElementById(id);
    if (msg) el.querySelector('span').textContent = msg;
    el.classList.add('show');
}
function clearAllErrors(formId) {
    document.querySelectorAll('#' + formId + ' .error-msg').forEach(e => e.classList.remove('show'));
    document.querySelectorAll('#' + formId + ' input').forEach(i => i.classList.remove('error'));
}
function shakeForm(formId) {
    const form = document.getElementById(formId);
    form.classList.add('shake');
    setTimeout(() => form.classList.remove('shake'), 400);
}
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function showToast(msg) {
    document.getElementById('toastMsg').textContent = msg;
    document.getElementById('toast').classList.add('show');
    setTimeout(() => document.getElementById('toast').classList.remove('show'), 3000);
}

function checkStrength(val) {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    const labels = ['','Weak','Medium','Strong','Very Strong'];
    const classes = ['','weak','medium','strong','very-strong'];
    for (let i = 1; i <= 4; i++) {
        const bar = document.getElementById('str' + i);
        bar.className = 'strength-bar';
        if (i <= score) bar.classList.add(classes[score]);
    }
    document.getElementById('strengthLabel').textContent = val.length > 0 ? labels[score] : '';
}

// ===== SHOW DASHBOARD =====
function showDashboard(email) {
    document.getElementById('authWrapper').style.display = 'none';
    document.getElementById('dashboardWrapper').classList.add('active');
    document.body.style.alignItems = 'stretch';

    const name = email.split('@')[0];
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById('dashName').textContent = displayName;
    document.getElementById('dashAvatar').textContent = displayName.substring(0, 2).toUpperCase();

    if (window.innerWidth <= 768) {
        document.getElementById('menuToggle').style.display = 'flex';
    }
}

function handleLogout() {
    document.getElementById('dashboardWrapper').classList.remove('active');
    document.getElementById('authWrapper').style.display = 'flex';
    document.body.style.alignItems = '';
    showToast('Signed out successfully');
    showPage('loginPage');
}

// ===== NAV ITEMS =====
document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));

        if (page === 'dashboard') {
            document.getElementById('dashboardSection').classList.add('active');
            document.getElementById('pageTitle').textContent = 'Dashboard';
        } else if (page === 'learner') {
            document.getElementById('learnerSection').classList.add('active');
            document.getElementById('pageTitle').textContent = 'Learner Management';
        } else if (page === 'verifier') {
            document.getElementById('verifierSection').classList.add('active');
            document.getElementById('pageTitle').textContent = 'Verifier Management';
        } else if (page === 'collaborator') {
            document.getElementById('collaboratorSection').classList.add('active');
            document.getElementById('pageTitle').textContent = 'Collaborator Management';
        } else if (page === 'opportunity') {
            document.getElementById('opportunitySection').classList.add('active');
            document.getElementById('pageTitle').textContent = 'Opportunity Management';
        } else if (page === 'reports') {
            document.getElementById('reportsSection').classList.add('active');
            document.getElementById('pageTitle').textContent = 'Reports and Analytics';
        }
    });
});

// ===== TABS =====
function changeChartPeriod(period) {
    document.querySelectorAll('.tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === period) btn.classList.add('active');
    });

    const chartData = {
        daily:     'M0,120 Q50,110 100,90 T200,70 T300,50 T400,40',
        weekly:    'M0,110 Q50,95 100,85 T200,65 T300,45 T400,35',
        monthly:   'M0,100 Q50,85 100,75 T200,55 T300,40 T400,30',
        quarterly: 'M0,90 Q50,75 100,65 T200,50 T300,35 T400,25',
        yearly:    'M0,80 Q50,65 100,55 T200,40 T300,30 T400,20'
    };

    const path = chartData[period];
    document.getElementById('linePath').setAttribute('d', path);
    document.getElementById('lineArea').setAttribute('d', path + ' L400,150 L0,150 Z');
}

// ===== NOTIFICATIONS =====
function toggleNotifications() {
    document.getElementById('notificationDropdown').classList.toggle('active');
}
function markAllRead() {
    document.querySelectorAll('.notif-item.unread').forEach(item => item.classList.remove('unread'));
    showToast('All notifications marked as read');
}
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('notificationDropdown');
    const btn = document.getElementById('notifBtn');
    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// ===== THEME TOGGLE =====
function toggleTheme() {
    const html = document.documentElement;
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    const icon = document.getElementById('themeIcon');
    if (newTheme === 'dark') {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    } else {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
    }
}

// ===== SEARCH =====
function openSearch() {
    document.getElementById('searchContainer').classList.add('active');
    document.getElementById('searchInput').focus();
}
function closeSearch() {
    document.getElementById('searchContainer').classList.remove('active');
}
document.getElementById('searchContainer').addEventListener('click', function(e) {
    if (e.target === this) closeSearch();
});

// ===== COURSE MODAL =====
function openCourseDetails(courseName, stats) {
    document.getElementById('modalCourseTitle').textContent = courseName;
    document.getElementById('modalEnrolled').textContent = stats.enrolled;
    document.getElementById('modalCompleted').textContent = stats.completed;
    document.getElementById('modalInProgress').textContent = stats.inProgress;
    document.getElementById('modalHalfDone').textContent = stats.halfDone;
    document.getElementById('courseModal').classList.add('active');
}
function closeCourseModal() {
    document.getElementById('courseModal').classList.remove('active');
}
document.getElementById('courseModal').addEventListener('click', function(e) {
    if (e.target === this) closeCourseModal();
});

// ===== OPPORTUNITY DETAILS MODAL (original — kept for compatibility) =====
function openOpportunityDetails(title, details) {
    document.getElementById('opportunityDetailTitle').textContent = title;
    document.getElementById('opportunityDetailDuration').textContent = details.duration;
    document.getElementById('opportunityDetailStartDate').textContent = details.startDate;
    document.getElementById('opportunityDetailApplicants').textContent = details.applicants;
    document.getElementById('opportunityDetailDescription').textContent = details.description;
    document.getElementById('opportunityDetailFuture').textContent = details.futureOpportunities;
    document.getElementById('opportunityDetailPrereqs').textContent = details.prerequisites;

    const skillsContainer = document.getElementById('opportunityDetailSkills');
    skillsContainer.innerHTML = '';
    details.skills.forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.textContent = skill;
        skillsContainer.appendChild(tag);
    });
    document.getElementById('opportunityDetailsModal').classList.add('active');
}
function closeOpportunityDetailsModal() {
    document.getElementById('opportunityDetailsModal').classList.remove('active');
}
function applyToOpportunity() {
    showToast('Application submitted successfully!');
    closeOpportunityDetailsModal();
}
document.getElementById('opportunityDetailsModal').addEventListener('click', function(e) {
    if (e.target === this) closeOpportunityDetailsModal();
});

// ===== COLLABORATOR COURSES MODAL =====
function openCollaboratorCourses(name, role) {
    document.getElementById('collaboratorName').textContent = name + "'s Submitted Courses";
    document.getElementById('collaboratorRole').textContent = 'Role: ' + role;
    document.getElementById('collaboratorCoursesModal').classList.add('active');
}
function closeCollaboratorCoursesModal() {
    document.getElementById('collaboratorCoursesModal').classList.remove('active');
}
function approveCourse(courseName) { showToast(courseName + ' has been approved!'); }
function rejectCourse(courseName)  { showToast(courseName + ' has been rejected.'); }
function viewCourseDetails(courseName) { showToast('Viewing details for ' + courseName); }
document.getElementById('collaboratorCoursesModal').addEventListener('click', function(e) {
    if (e.target === this) closeCollaboratorCoursesModal();
});

// ===== QUICK ADD STUDENT MODAL =====
function openQuickAddModal() { document.getElementById('quickAddModal').classList.add('active'); }
function closeQuickAddModal() { document.getElementById('quickAddModal').classList.remove('active'); }
document.getElementById('quickAddModal').addEventListener('click', function(e) {
    if (e.target === this) closeQuickAddModal();
});
document.getElementById('quickAddForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Student added successfully! Email invitation sent.');
    closeQuickAddModal();
    this.reset();
});

// ===== BULK UPLOAD MODAL =====
function openBulkUploadModal() { document.getElementById('bulkUploadModal').classList.add('active'); }
function closeBulkUploadModal() { document.getElementById('bulkUploadModal').classList.remove('active'); }
document.getElementById('bulkUploadModal').addEventListener('click', function(e) {
    if (e.target === this) closeBulkUploadModal();
});
document.getElementById('bulkUploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('csvFileInput');
    if (fileInput.files.length === 0) { showToast('Please select a CSV file'); return; }
    showToast('Students uploaded successfully! Email invitations sent.');
    closeBulkUploadModal();
    this.reset();
    document.getElementById('fileName').textContent = '';
});
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) document.getElementById('fileName').textContent = '✓ Selected: ' + file.name;
}
function downloadSampleCSV() {
    const csvContent = 'First Name,Last Name,Email\nJohn,Doe,john.doe@example.com\nJane,Smith,jane.smith@example.com';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'sample_students.csv'; a.click();
    window.URL.revokeObjectURL(url);
}

// ===== QUICK ADD VERIFIER MODAL =====
function openQuickAddVerifierModal() { document.getElementById('quickAddVerifierModal').classList.add('active'); }
function closeQuickAddVerifierModal() { document.getElementById('quickAddVerifierModal').classList.remove('active'); }
document.getElementById('quickAddVerifierModal').addEventListener('click', function(e) {
    if (e.target === this) closeQuickAddVerifierModal();
});
document.getElementById('quickAddVerifierForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Verifier added successfully! Email invitation sent.');
    closeQuickAddVerifierModal();
    this.reset();
});

// ===== BULK UPLOAD VERIFIER MODAL =====
function openBulkUploadVerifierModal() { document.getElementById('bulkUploadVerifierModal').classList.add('active'); }
function closeBulkUploadVerifierModal() { document.getElementById('bulkUploadVerifierModal').classList.remove('active'); }
document.getElementById('bulkUploadVerifierModal').addEventListener('click', function(e) {
    if (e.target === this) closeBulkUploadVerifierModal();
});
document.getElementById('bulkUploadVerifierForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('csvVerifierFileInput');
    if (fileInput.files.length === 0) { showToast('Please select a CSV file'); return; }
    showToast('Verifiers uploaded successfully! Email invitations sent.');
    closeBulkUploadVerifierModal();
    this.reset();
    document.getElementById('verifierFileName').textContent = '';
});
function handleVerifierFileSelect(event) {
    const file = event.target.files[0];
    if (file) document.getElementById('verifierFileName').textContent = '✓ Selected: ' + file.name;
}
function downloadSampleVerifierCSV() {
    const csvContent = 'First Name,Last Name,Email,Subject\nDr. John,Doe,john.doe@qf.edu.qa,Mathematics\nProf. Jane,Smith,jane.smith@qf.edu.qa,Physics';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'sample_verifiers.csv'; a.click();
    window.URL.revokeObjectURL(url);
}

// ===== VERIFIER DETAILS MODAL =====
function openVerifierDetails(name, stats) {
    document.getElementById('verifierName').textContent = name;
    document.getElementById('verifierTotalStudents').textContent = stats.totalStudents;
    document.getElementById('verifierCertified').textContent = stats.certified;
    document.getElementById('verifierInProgress').textContent = stats.inProgress;
    const container = document.getElementById('subjectsContainer');
    container.innerHTML = '';
    stats.subjects.forEach(subject => {
        const div = document.createElement('div');
        div.className = 'subject-item';
        div.innerHTML = `<span class="subject-name">${subject.name}</span><span class="subject-students">${subject.students} students</span>`;
        container.appendChild(div);
    });
    document.getElementById('verifierDetailsModal').classList.add('active');
}
function closeVerifierDetailsModal() {
    document.getElementById('verifierDetailsModal').classList.remove('active');
}
document.getElementById('verifierDetailsModal').addEventListener('click', function(e) {
    if (e.target === this) closeVerifierDetailsModal();
});

// ===== STUDENT FILTERS =====
function filterStudents() {
    const statusFilter = document.getElementById('statusFilter').value;
    document.querySelectorAll('#studentsTableBody tr').forEach(row => {
        const rowStatus = row.getAttribute('data-status');
        row.style.display = (statusFilter === 'all' || rowStatus === statusFilter) ? '' : 'none';
    });
}

// ===== VERIFIER FILTERS =====
function filterVerifiers() {
    const statusFilter = document.getElementById('verifierStatusFilter').value;
    document.querySelectorAll('#verifiersTableBody tr').forEach(row => {
        const rowStatus = row.getAttribute('data-status');
        row.style.display = (statusFilter === 'all' || rowStatus === statusFilter) ? '' : 'none';
    });
}

// ===== LOGIN =====
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    clearAllErrors('loginForm');
    let valid = true;
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const captchaInput = document.getElementById('loginCaptchaInput').value.trim();

    if (!email || !isValidEmail(email)) { showError('loginEmailErr'); document.getElementById('loginEmail').classList.add('error'); valid = false; }
    if (!password) { showError('loginPasswordErr','Please enter your password'); document.getElementById('loginPassword').classList.add('error'); valid = false; }
    if (!captchaInput) { showError('loginCaptchaErr','Please enter the captcha code'); valid = false; }
    else if (captchaInput !== captchas.login) { showError('loginCaptchaErr','Captcha does not match. Please try again.'); valid = false; generateCaptcha('login'); }

    if (!valid) { shakeForm('loginForm'); return; }

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            showToast('Login successful!');
            setTimeout(() => showDashboard(email), 1200);
        } else {
            showToast(data.error || 'Login failed');
            generateCaptcha('login');   // ✅ only on failure
        }
    });
    generateCaptcha('login');
});

// ===== SIGNUP =====
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    clearAllErrors('signupForm');
    let valid = true;
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('signupConfirmPassword').value.trim();
    const captchaInput = document.getElementById('signupCaptchaInput').value.trim();

    if (!name) { showError('signupNameErr'); document.getElementById('signupName').classList.add('error'); valid = false; }
    if (!email || !isValidEmail(email)) { showError('signupEmailErr'); document.getElementById('signupEmail').classList.add('error'); valid = false; }
    if (!password || password.length < 8) { showError('signupPasswordErr'); document.getElementById('signupPassword').classList.add('error'); valid = false; }
    if (!confirmPassword || password !== confirmPassword) { showError('signupConfirmPasswordErr'); document.getElementById('signupConfirmPassword').classList.add('error'); valid = false; }
    if (!captchaInput) { showError('signupCaptchaErr','Please enter the captcha code'); valid = false; }
    else if (captchaInput !== captchas.signup) { showError('signupCaptchaErr','Captcha does not match.'); valid = false; generateCaptcha('signup'); }

    if (!valid) { shakeForm('signupForm'); return; }

    fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ full_name: name, email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            showToast('Account created successfully!');
            setTimeout(() => showPage('loginPage'), 1500);
        } else {
            showToast(data.error || 'Signup failed');
        }
    });
    generateCaptcha('signup');
    this.reset(); checkStrength('');
});

// ===== FORGOT =====
document.getElementById('forgotForm').addEventListener('submit', function(e) {
    e.preventDefault();
    clearAllErrors('forgotForm');
    let valid = true;
    const email = document.getElementById('forgotEmail').value.trim();
    const captchaInput = document.getElementById('forgotCaptchaInput').value.trim();

    if (!email || !isValidEmail(email)) { showError('forgotEmailErr'); document.getElementById('forgotEmail').classList.add('error'); valid = false; }
    if (!captchaInput) { showError('forgotCaptchaErr','Please enter the captcha code'); valid = false; }
    else if (captchaInput !== captchas.forgot) { showError('forgotCaptchaErr','Captcha does not match.'); valid = false; generateCaptcha('forgot'); }

    if (!valid) { shakeForm('forgotForm'); return; }
    showToast('Reset link sent to your email!');
    generateCaptcha('forgot');
    this.reset();
});

// Clear errors on input
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('error');
        const err = this.closest('.form-group')?.querySelector('.error-msg');
        if (err) err.classList.remove('show');
    });
});

// Responsive sidebar
window.addEventListener('resize', () => {
    const toggle = document.getElementById('menuToggle');
    if (toggle) toggle.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
});

// ================================================================
//  OPPORTUNITIES  —  ENHANCED SECTION
// ================================================================

/* ── State ─────────────────────────────────────────────────── */
let allOpportunities = [];
let currentEditId    = null;
let currentViewOp    = null;

/* ── Inject styles ─────────────────────────────────────────── */
function injectOpportunityStyles() {
    if (document.getElementById('opp-enhanced-styles')) return;
    const style = document.createElement('style');
    style.id = 'opp-enhanced-styles';
    style.textContent = `
        /* ── Toolbar ── */
        .opp-toolbar {
            display: flex; align-items: center; gap: 10px;
            flex-wrap: wrap; margin-bottom: 22px;
        }
        .opp-search-wrap { position: relative; flex: 1; min-width: 180px; }
        .opp-search-wrap svg {
            position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
            width: 16px; height: 16px; stroke: #888; fill: none;
            stroke-width: 2; stroke-linecap: round; pointer-events: none;
        }
        .opp-search-input {
            width: 100%; padding: 9px 12px 9px 38px;
            border: 1.5px solid var(--border, #e0e0e0); border-radius: 10px;
            font-size: 13.5px; background: var(--card-bg, #fff);
            color: var(--text, #222); outline: none;
            transition: border-color .2s; box-sizing: border-box;
        }
        .opp-search-input:focus { border-color: var(--primary, #4f46e5); }
        .opp-filter-select, .opp-sort-select {
            padding: 9px 14px; border: 1.5px solid var(--border, #e0e0e0);
            border-radius: 10px; font-size: 13px;
            background: var(--card-bg, #fff); color: var(--text, #222);
            cursor: pointer; outline: none;
        }
        .opp-add-btn {
            display: flex; align-items: center; gap: 7px;
            padding: 9px 18px; background: var(--primary, #4f46e5); color: #fff;
            border: none; border-radius: 10px; font-size: 13.5px; font-weight: 600;
            cursor: pointer; transition: background .2s, transform .15s; white-space: nowrap;
        }
        .opp-add-btn:hover { background: var(--primary-dark, #4338ca); transform: translateY(-1px); }
        .opp-add-btn svg { width: 16px; height: 16px; stroke: #fff; fill: none; stroke-width: 2.5; stroke-linecap: round; }

        /* ── Results bar ── */
        .opp-results-bar {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 16px; font-size: 13px; color: var(--text-muted, #666);
        }
        .opp-results-bar strong { color: var(--text, #222); }

        /* ── Grid ── */
        .opp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

        /* ── Card ── */
        .opp-card {
            background: var(--card-bg, #fff); border: 1.5px solid var(--border, #e8e8e8);
            border-radius: 16px; padding: 20px 22px 18px;
            display: flex; flex-direction: column; gap: 14px;
            transition: box-shadow .25s, transform .2s;
            animation: oppCardIn .35s ease both; position: relative; overflow: hidden;
        }
        .opp-card::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
            background: var(--primary, #4f46e5); border-radius: 16px 16px 0 0;
            opacity: 0; transition: opacity .2s;
        }
        .opp-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,.10); transform: translateY(-3px); }
        .opp-card:hover::before { opacity: 1; }
        @keyframes oppCardIn {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Card header ── */
        .opp-card-header { display: flex; align-items: flex-start; gap: 12px; }
        .opp-icon {
            width: 44px; height: 44px; border-radius: 12px;
            background: var(--primary-light, #ede9fe);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; font-size: 20px;
        }
        .opp-card-title-wrap { flex: 1; min-width: 0; }
        .opp-card-title {
            font-size: 15px; font-weight: 700; color: var(--text, #1a1a2e);
            margin: 0 0 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .opp-category-badge {
            display: inline-block; padding: 2px 10px; border-radius: 20px;
            font-size: 11px; font-weight: 600;
            background: var(--primary-light, #ede9fe); color: var(--primary, #4f46e5);
            letter-spacing: .3px; text-transform: uppercase;
        }

        /* ── Stats ── */
        .opp-stats {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
            background: var(--bg-soft, #f7f7fb); border-radius: 10px; padding: 10px 12px;
        }
        .opp-stat { text-align: center; }
        .opp-stat-val { font-size: 15px; font-weight: 700; color: var(--text, #222); }
        .opp-stat-lbl { font-size: 10.5px; color: var(--text-muted, #888); margin-top: 2px; }

        /* ── Skills ── */
        .opp-skills { display: flex; flex-wrap: wrap; gap: 5px; }
        .opp-skill-tag {
            padding: 3px 10px; border-radius: 20px;
            background: var(--tag-bg, #f0f0f5); color: var(--text-muted, #555);
            font-size: 11px; font-weight: 500;
        }
        .opp-skill-more {
            padding: 3px 10px; border-radius: 20px;
            border: 1px solid var(--border, #ddd); color: var(--text-muted, #888);
            font-size: 11px; background: transparent;
        }

        /* ── Card actions ── */
        .opp-card-actions {
            display: flex; gap: 7px; margin-top: auto;
            padding-top: 4px; border-top: 1px solid var(--border, #f0f0f0);
        }
        .opp-btn {
            flex: 1; padding: 7px 0; border-radius: 8px; border: none;
            font-size: 12.5px; font-weight: 600; cursor: pointer;
            transition: background .18s, transform .12s;
            display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        .opp-btn:hover { transform: translateY(-1px); }
        .opp-btn svg { width: 13px; height: 13px; stroke: currentColor; fill: none; stroke-width: 2.5; stroke-linecap: round; }
        .opp-btn-view   { background: var(--primary-light, #ede9fe); color: var(--primary, #4f46e5); }
        .opp-btn-view:hover { background: #ddd6fe; }
        .opp-btn-edit   { background: var(--success-light, #d1fae5); color: #059669; }
        .opp-btn-edit:hover { background: #a7f3d0; }
        .opp-btn-delete { background: var(--danger-light, #fee2e2); color: #dc2626; }
        .opp-btn-delete:hover { background: #fecaca; }

        /* ── Empty state ── */
        .opp-empty { grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted, #888); }
        .opp-empty-icon { font-size: 48px; margin-bottom: 12px; }
        .opp-empty h3 { font-size: 18px; margin: 0 0 6px; color: var(--text, #333); }
        .opp-empty p  { font-size: 13.5px; margin: 0; }

        /* ── Skeleton ── */
        .opp-skeleton {
            background: var(--card-bg, #fff); border: 1.5px solid var(--border, #e8e8e8);
            border-radius: 16px; padding: 20px 22px; display: flex; flex-direction: column; gap: 14px;
        }
        .skel { border-radius: 8px; background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size: 200% 100%; animation: skel-shimmer 1.4s infinite; }
        .skel-title { height: 16px; width: 70%; }
        .skel-sub   { height: 11px; width: 40%; }
        .skel-box   { height: 56px; }
        .skel-row   { height: 28px; }
        @keyframes skel-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        /* ══ MODAL BASE ══ */
        .opp-modal-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,.45);
            backdrop-filter: blur(4px);
            display: flex; align-items: center; justify-content: center;
            z-index: 9999; opacity: 0; pointer-events: none; transition: opacity .25s;
        }
        .opp-modal-overlay.open { opacity: 1; pointer-events: all; }
        .opp-modal {
            background: var(--card-bg, #fff); border-radius: 20px;
            width: min(540px, 94vw); max-height: 88vh; overflow-y: auto;
            box-shadow: 0 24px 64px rgba(0,0,0,.2);
            transform: scale(.93) translateY(24px);
            transition: transform .28s cubic-bezier(.34,1.56,.64,1);
        }
        .opp-modal-overlay.open .opp-modal { transform: scale(1) translateY(0); }
        .opp-modal-header {
            display: flex; align-items: flex-start; justify-content: space-between;
            padding: 24px 26px 18px; border-bottom: 1px solid var(--border, #f0f0f0);
            position: sticky; top: 0; background: var(--card-bg, #fff);
            border-radius: 20px 20px 0 0; z-index: 1;
        }
        .opp-modal-title { font-size: 18px; font-weight: 800; color: var(--text, #111); margin: 0; }
        .opp-modal-close {
            background: var(--bg-soft, #f5f5fa); border: none; border-radius: 50%;
            width: 32px; height: 32px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            color: var(--text, #555); font-size: 18px; transition: background .15s; flex-shrink: 0;
        }
        .opp-modal-close:hover { background: var(--danger-light, #fee2e2); color: #dc2626; }
        .opp-modal-body { padding: 20px 26px 26px; display: flex; flex-direction: column; gap: 18px; }

        /* ── View modal details ── */
        .opp-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .opp-detail-item { display: flex; flex-direction: column; gap: 3px; }
        .opp-detail-item label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; color: var(--text-muted, #888); }
        .opp-detail-item span  { font-size: 14px; font-weight: 600; color: var(--text, #222); }
        .opp-detail-desc { background: var(--bg-soft, #f7f7fb); border-radius: 10px; padding: 12px 14px; font-size: 13.5px; color: var(--text, #444); line-height: 1.6; }
        .opp-detail-skills { display: flex; flex-wrap: wrap; gap: 6px; }
        .opp-detail-skill-tag {
            padding: 4px 12px; border-radius: 20px;
            background: var(--primary-light, #ede9fe); color: var(--primary, #4f46e5);
            font-size: 12px; font-weight: 600;
        }

        /* ── Modal footer ── */
        .opp-modal-footer {
            padding: 16px 26px 24px; display: flex; justify-content: flex-end; gap: 10px;
        }
        .opp-modal-footer-btn {
            padding: 9px 22px; border-radius: 10px; border: none;
            font-size: 13.5px; font-weight: 600; cursor: pointer;
            transition: background .18s, transform .12s;
        }
        .opp-modal-footer-btn:hover { transform: translateY(-1px); }
        .opp-btn-secondary { background: var(--bg-soft, #f5f5fa); color: var(--text, #444); }
        .opp-btn-primary   { background: var(--primary, #4f46e5); color: #fff; }
        .opp-btn-primary:hover { background: var(--primary-dark, #4338ca); }

        /* ── Edit modal form ── */
        .opp-edit-modal { width: min(560px, 94vw); }
        .opp-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .opp-form-full { grid-column: 1 / -1; }
        .opp-form-group { display: flex; flex-direction: column; gap: 5px; }
        .opp-form-group label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .4px; color: var(--text-muted, #777); }
        .opp-form-group input,
        .opp-form-group select,
        .opp-form-group textarea {
            padding: 9px 12px; border: 1.5px solid var(--border, #e0e0e0); border-radius: 9px;
            font-size: 13.5px; background: var(--card-bg, #fff); color: var(--text, #222);
            outline: none; transition: border-color .2s; resize: vertical;
        }
        .opp-form-group input:focus,
        .opp-form-group select:focus,
        .opp-form-group textarea:focus { border-color: var(--primary, #4f46e5); }

        /* ── Delete confirm ── */
        .opp-confirm-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,.5);
            backdrop-filter: blur(4px);
            display: flex; align-items: center; justify-content: center;
            z-index: 10000; opacity: 0; pointer-events: none; transition: opacity .2s;
        }
        .opp-confirm-overlay.open { opacity: 1; pointer-events: all; }
        .opp-confirm-box {
            background: var(--card-bg, #fff); border-radius: 18px;
            padding: 30px 28px 24px; width: min(380px, 92vw); text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,.18);
            transform: scale(.9); transition: transform .22s cubic-bezier(.34,1.56,.64,1);
        }
        .opp-confirm-overlay.open .opp-confirm-box { transform: scale(1); }
        .opp-confirm-icon { font-size: 42px; margin-bottom: 12px; }
        .opp-confirm-box h3 { font-size: 18px; font-weight: 800; margin: 0 0 8px; color: var(--text, #111); }
        .opp-confirm-box p  { font-size: 13.5px; color: var(--text-muted, #666); margin: 0 0 22px; line-height: 1.5; }
        .opp-confirm-btns { display: flex; gap: 10px; justify-content: center; }
        .opp-confirm-cancel { padding: 9px 24px; border-radius: 10px; border: 1.5px solid var(--border,#ddd); background: none; color: var(--text,#444); font-size: 13.5px; font-weight: 600; cursor: pointer; }
        .opp-confirm-delete { padding: 9px 24px; border-radius: 10px; border: none; background: #dc2626; color: #fff; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: background .18s; }
        .opp-confirm-delete:hover { background: #b91c1c; }
    `;
    document.head.appendChild(style);
}

/* ── Build UI into #opportunitySection ─────────────────── */
function buildOpportunityUI() {
    const section = document.getElementById('opportunitySection');
    if (!section) return;

    section.innerHTML = `
        <!-- Toolbar -->
        <div class="opp-toolbar">
            <div class="opp-search-wrap">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input id="oppSearchInput" class="opp-search-input" type="text" placeholder="Search opportunities…" oninput="filterAndRenderOpportunities()">
            </div>
            <select id="oppCategorySelect" class="opp-filter-select" onchange="filterAndRenderOpportunities()">
                <option value="all">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Engineering">Engineering</option>
                <option value="Research">Research</option>
            </select>
            <select id="oppSortSelect" class="opp-sort-select" onchange="filterAndRenderOpportunities()">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
                <option value="applicants">Most Applicants</option>
            </select>
            <button class="opp-add-btn" onclick="openOpportunityModal()">
                <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New Opportunity
            </button>
        </div>

        <!-- Results bar -->
        <div class="opp-results-bar">
            <span id="oppResultsText">Loading…</span>
        </div>

        <!-- Card grid -->
        <div class="opp-grid" id="opportunityContainer">
            ${[1,2,3,4,5,6].map(() => `
                <div class="opp-skeleton">
                    <div class="skel skel-title"></div>
                    <div class="skel skel-sub"></div>
                    <div class="skel skel-box"></div>
                    <div class="skel skel-row"></div>
                </div>`).join('')}
        </div>

        <!-- VIEW MODAL -->
        <div class="opp-modal-overlay" id="oppViewOverlay" onclick="handleOppOverlayClick(event,'oppViewOverlay')">
            <div class="opp-modal">
                <div class="opp-modal-header">
                    <div>
                        <p id="oppViewCategory" style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--primary,#4f46e5);margin:0 0 4px"></p>
                        <h2 class="opp-modal-title" id="oppViewTitle">—</h2>
                    </div>
                    <button class="opp-modal-close" onclick="closeOppViewModal()">✕</button>
                </div>
                <div class="opp-modal-body">
                    <div class="opp-detail-grid">
                        <div class="opp-detail-item"><label>Duration</label><span id="oppViewDuration">—</span></div>
                        <div class="opp-detail-item"><label>Start Date</label><span id="oppViewStart">—</span></div>
                        <div class="opp-detail-item"><label>Max Applicants</label><span id="oppViewMax">—</span></div>
                        <div class="opp-detail-item"><label>Category</label><span id="oppViewCat2">—</span></div>
                    </div>
                    <div>
                        <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted,#888);margin:0 0 6px">Description</p>
                        <div class="opp-detail-desc" id="oppViewDesc">—</div>
                    </div>
                    <div>
                        <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted,#888);margin:0 0 8px">Required Skills</p>
                        <div class="opp-detail-skills" id="oppViewSkills"></div>
                    </div>
                    <div>
                        <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted,#888);margin:0 0 6px">Future Opportunities</p>
                        <div class="opp-detail-desc" id="oppViewFuture">—</div>
                    </div>
                </div>
                <div class="opp-modal-footer">
                    <button class="opp-modal-footer-btn opp-btn-secondary" onclick="closeOppViewModal()">Close</button>
                    <button class="opp-modal-footer-btn opp-btn-primary" onclick="openEditFromView()">✏️ Edit</button>
                </div>
            </div>
        </div>

        <!-- EDIT MODAL -->
        <div class="opp-modal-overlay" id="oppEditOverlay" onclick="handleOppOverlayClick(event,'oppEditOverlay')">
            <div class="opp-modal opp-edit-modal">
                <div class="opp-modal-header">
                    <h2 class="opp-modal-title" id="oppEditModalTitle">Edit Opportunity</h2>
                    <button class="opp-modal-close" onclick="closeOppEditModal()">✕</button>
                </div>
                <div class="opp-modal-body">
                    <div class="opp-form-grid">
                        <div class="opp-form-group opp-form-full">
                            <label>Title *</label>
                            <input type="text" id="editOppTitle" placeholder="e.g. Frontend Engineering Internship">
                        </div>
                        <div class="opp-form-group">
                            <label>Category *</label>
                            <select id="editOppCategory">
                                <option value="">Select…</option>
                                <option value="Technology">Technology</option>
                                <option value="Business">Business</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Education">Education</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Research">Research</option>
                            </select>
                        </div>
                        <div class="opp-form-group">
                            <label>Duration *</label>
                            <input type="text" id="editOppDuration" placeholder="e.g. 3 months">
                        </div>
                        <div class="opp-form-group">
                            <label>Start Date *</label>
                            <input type="date" id="editOppStart">
                        </div>
                        <div class="opp-form-group">
                            <label>Max Applicants</label>
                            <input type="number" id="editOppMax" placeholder="e.g. 50" min="1">
                        </div>
                        <div class="opp-form-group opp-form-full">
                            <label>Description *</label>
                            <textarea id="editOppDesc" rows="3" placeholder="Describe the opportunity…"></textarea>
                        </div>
                        <div class="opp-form-group opp-form-full">
                            <label>Skills (comma-separated)</label>
                            <input type="text" id="editOppSkills" placeholder="e.g. React, Node.js, SQL">
                        </div>
                        <div class="opp-form-group opp-form-full">
                            <label>Future Opportunities</label>
                            <textarea id="editOppFuture" rows="2" placeholder="What doors does this open?"></textarea>
                        </div>
                    </div>
                </div>
                <div class="opp-modal-footer">
                    <button class="opp-modal-footer-btn opp-btn-secondary" onclick="closeOppEditModal()">Cancel</button>
                    <button class="opp-modal-footer-btn opp-btn-primary" onclick="submitEditOpportunity()">💾 Save Changes</button>
                </div>
            </div>
        </div>

        <!-- DELETE CONFIRM -->
        <div class="opp-confirm-overlay" id="oppConfirmOverlay">
            <div class="opp-confirm-box">
                <div class="opp-confirm-icon">🗑️</div>
                <h3>Delete Opportunity?</h3>
                <p id="oppConfirmText">This action cannot be undone.</p>
                <div class="opp-confirm-btns">
                    <button class="opp-confirm-cancel" onclick="closeOppConfirm()">Cancel</button>
                    <button class="opp-confirm-delete" onclick="confirmDeleteOpportunity()">Yes, Delete</button>
                </div>
            </div>
        </div>
    `;
}

/* ── Load from server ───────────────────────────────────── */
function loadOpportunities() {
    fetch('/opportunities', { method: 'GET', credentials: 'include' })
        .then(res => res.json())
        .then(data => {
            allOpportunities = data || [];
            filterAndRenderOpportunities();
        })
        .catch(err => { console.error(err); renderOpportunities([]); });
}

/* ── Filter + Sort ──────────────────────────────────────── */
function filterAndRenderOpportunities() {
    const q    = (document.getElementById('oppSearchInput')?.value || '').toLowerCase();
    const cat  = document.getElementById('oppCategorySelect')?.value || 'all';
    const sort = document.getElementById('oppSortSelect')?.value    || 'newest';

    let list = allOpportunities.filter(op => {
        const matchQ   = !q || op.title?.toLowerCase().includes(q) || op.description?.toLowerCase().includes(q) || op.skills?.toLowerCase().includes(q);
        const matchCat = cat === 'all' || op.category === cat;
        return matchQ && matchCat;
    });

    if (sort === 'az')         list.sort((a,b) => (a.title||'').localeCompare(b.title||''));
    else if (sort === 'za')    list.sort((a,b) => (b.title||'').localeCompare(a.title||''));
    else if (sort === 'applicants') list.sort((a,b) => (b.max_applicants||0) - (a.max_applicants||0));
    else if (sort === 'oldest') list.sort((a,b) => (a.id||0) - (b.id||0));
    else list.sort((a,b) => (b.id||0) - (a.id||0));

    const bar = document.getElementById('oppResultsText');
    if (bar) bar.innerHTML = `<strong>${list.length}</strong> opportunit${list.length === 1 ? 'y' : 'ies'} found`;

    renderOpportunities(list);
}

/* ── Render cards ───────────────────────────────────────── */
const CATEGORY_EMOJI = {
    Technology:'💻', Business:'💼', Design:'🎨', Marketing:'📣',
    Education:'📚', Healthcare:'🏥', Engineering:'⚙️', Research:'🔬',
};

function renderOpportunities(list) {
    const container = document.getElementById('opportunityContainer');
    if (!container) return;

    if (!list.length) {
        container.innerHTML = `
            <div class="opp-empty">
                <div class="opp-empty-icon">🔍</div>
                <h3>No opportunities found</h3>
                <p>Try adjusting your search or filters, or create a new opportunity.</p>
            </div>`;
        return;
    }

    container.innerHTML = list.map((op, idx) => {
        const emoji        = CATEGORY_EMOJI[op.category] || '📋';
        const skills       = (op.skills || '').split(',').map(s => s.trim()).filter(Boolean);
        const visibleSkills = skills.slice(0, 3);
        const hiddenCount  = skills.length - visibleSkills.length;
        const skillTagsHtml = visibleSkills.map(s => `<span class="opp-skill-tag">${escapeHtml(s)}</span>`).join('');
        const moreHtml      = hiddenCount > 0 ? `<span class="opp-skill-more">+${hiddenCount} more</span>` : '';

        return `
            <div class="opp-card" style="animation-delay:${idx * 0.04}s">
                <div class="opp-card-header">
                    <div class="opp-icon">${emoji}</div>
                    <div class="opp-card-title-wrap">
                        <h3 class="opp-card-title" title="${escapeHtml(op.title)}">${escapeHtml(op.title)}</h3>
                        <span class="opp-category-badge">${escapeHtml(op.category || 'General')}</span>
                    </div>
                </div>
                <div class="opp-stats">
                    <div class="opp-stat">
                        <div class="opp-stat-val">${escapeHtml(op.duration || '—')}</div>
                        <div class="opp-stat-lbl">Duration</div>
                    </div>
                    <div class="opp-stat">
                        <div class="opp-stat-val">${escapeHtml(op.start_date || '—')}</div>
                        <div class="opp-stat-lbl">Start Date</div>
                    </div>
                    <div class="opp-stat">
                        <div class="opp-stat-val">${op.max_applicants || 0}</div>
                        <div class="opp-stat-lbl">Max Spots</div>
                    </div>
                </div>
                ${skills.length ? `<div class="opp-skills">${skillTagsHtml}${moreHtml}</div>` : ''}
                <div class="opp-card-actions">
                    <button class="opp-btn opp-btn-view" onclick="openOppViewModal(${op.id})">
                        <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        View
                    </button>
                    <button class="opp-btn opp-btn-edit" onclick="openOppEditModal(${op.id})">
                        <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        Edit
                    </button>
                    <button class="opp-btn opp-btn-delete" onclick="promptDeleteOpportunity(${op.id},'${escapeHtml(op.title).replace(/'/g,"\\'")}')">
                        <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        Delete
                    </button>
                </div>
            </div>`;
    }).join('');
}

/* ── VIEW MODAL ─────────────────────────────────────────── */
function openOppViewModal(id) {
    const op = allOpportunities.find(o => o.id === id);
    if (!op) return;
    currentViewOp = op;

    document.getElementById('oppViewTitle').textContent    = op.title || '—';
    document.getElementById('oppViewCategory').textContent = op.category || '—';
    document.getElementById('oppViewCat2').textContent     = op.category || '—';
    document.getElementById('oppViewDuration').textContent = op.duration || '—';
    document.getElementById('oppViewStart').textContent    = op.start_date || '—';
    document.getElementById('oppViewMax').textContent      = op.max_applicants || '—';
    document.getElementById('oppViewDesc').textContent     = op.description || '—';
    document.getElementById('oppViewFuture').textContent   = op.future_opportunities || '—';

    const skillsWrap = document.getElementById('oppViewSkills');
    const skills = (op.skills || '').split(',').map(s => s.trim()).filter(Boolean);
    skillsWrap.innerHTML = skills.map(s => `<span class="opp-detail-skill-tag">${escapeHtml(s)}</span>`).join('')
        || '<em style="color:#999;font-size:13px">No skills listed</em>';

    document.getElementById('oppViewOverlay').classList.add('open');
}
function closeOppViewModal() { document.getElementById('oppViewOverlay').classList.remove('open'); }
function openEditFromView()  { closeOppViewModal(); if (currentViewOp) openOppEditModal(currentViewOp.id); }

/* ── EDIT MODAL ─────────────────────────────────────────── */
function openOppEditModal(id) {
    const op = allOpportunities.find(o => o.id === id);
    if (!op) { showToast('Opportunity not found'); return; }
    currentEditId = id;

    document.getElementById('oppEditModalTitle').textContent = '✏️ Edit: ' + op.title;
    document.getElementById('editOppTitle').value    = op.title || '';
    document.getElementById('editOppCategory').value = op.category || '';
    document.getElementById('editOppDuration').value = op.duration || '';
    document.getElementById('editOppStart').value    = op.start_date || '';
    document.getElementById('editOppMax').value      = op.max_applicants || '';
    document.getElementById('editOppDesc').value     = op.description || '';
    document.getElementById('editOppSkills').value   = op.skills || '';
    document.getElementById('editOppFuture').value   = op.future_opportunities || '';

    document.getElementById('oppEditOverlay').classList.add('open');
}
function closeOppEditModal() {
    document.getElementById('oppEditOverlay').classList.remove('open');
    currentEditId = null;
}
function submitEditOpportunity() {
    if (!currentEditId) return;
    const title    = document.getElementById('editOppTitle').value.trim();
    const category = document.getElementById('editOppCategory').value;
    const duration = document.getElementById('editOppDuration').value.trim();
    const start    = document.getElementById('editOppStart').value;
    const max      = document.getElementById('editOppMax').value;
    const desc     = document.getElementById('editOppDesc').value.trim();
    const skills   = document.getElementById('editOppSkills').value.trim();
    const future   = document.getElementById('editOppFuture').value.trim();

    if (!title || !category || !duration || !start || !desc) {
        showToast('Please fill all required fields'); return;
    }

    const payload = { title, category, duration, start_date: start, max_applicants: max, description: desc, skills, future_opportunities: future };

    fetch(`/opportunities/${currentEditId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(() => {
        const idx = allOpportunities.findIndex(o => o.id === currentEditId);
        if (idx !== -1) allOpportunities[idx] = { ...allOpportunities[idx], ...payload };
        showToast('Opportunity updated successfully!');
        closeOppEditModal();
        filterAndRenderOpportunities();
    })
    .catch(() => showToast('Failed to update opportunity'));
}

/* ── DELETE CONFIRM ─────────────────────────────────────── */
let _pendingDeleteId = null;

function promptDeleteOpportunity(id, name) {
    _pendingDeleteId = id;
    document.getElementById('oppConfirmText').textContent = `"${name}" will be permanently removed.`;
    document.getElementById('oppConfirmOverlay').classList.add('open');
}
function closeOppConfirm() {
    document.getElementById('oppConfirmOverlay').classList.remove('open');
    _pendingDeleteId = null;
}
function confirmDeleteOpportunity() {
    if (!_pendingDeleteId) return;
    const id = _pendingDeleteId;
    closeOppConfirm();

    fetch(`/opportunities/${id}`, { method: 'DELETE', credentials: 'include' })
        .then(res => res.json())
        .then(() => {
            allOpportunities = allOpportunities.filter(o => o.id !== id);
            showToast('Opportunity deleted');
            filterAndRenderOpportunities();
        })
        .catch(() => showToast('Delete failed'));
}

/* ── CREATE MODAL (your existing HTML modal) ────────────── */
function openOpportunityModal()  { document.getElementById('opportunityModal').classList.add('active'); }
function closeOpportunityModal() { document.getElementById('opportunityModal').classList.remove('active'); }

document.getElementById('opportunityModal').addEventListener('click', function(e) {
    if (e.target === this) closeOpportunityModal();
});

document.getElementById('opportunityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name      = document.getElementById('oppName').value.trim();
    const duration  = document.getElementById('oppDuration').value.trim();
    const startDate = document.getElementById('oppStartDate').value;
    const desc      = document.getElementById('oppDescription').value.trim();
    const skillsRaw = document.getElementById('oppSkills').value.trim();
    const category  = document.getElementById('oppCategory').value;
    const future    = document.getElementById('oppFuture').value.trim();
    const maxApp    = document.getElementById('oppMaxApplicants').value.trim();

    if (!name || !duration || !startDate || !desc || !skillsRaw || !category || !future) {
        showToast('Please fill all required fields'); return;
    }

    fetch('/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            title: name, duration, start_date: startDate, description: desc,
            skills: skillsRaw, category, future_opportunities: future, max_applicants: maxApp
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) { showToast('Opportunity created!'); loadOpportunities(); }
        else showToast(data.error || 'Error saving opportunity');
    })
    .catch(() => showToast('Server error'));

    closeOpportunityModal();
    this.reset();
});

/* ── Overlay click helper ───────────────────────────────── */
function handleOppOverlayClick(e, overlayId) {
    if (e.target.id === overlayId) {
        if (overlayId === 'oppViewOverlay') closeOppViewModal();
        if (overlayId === 'oppEditOverlay') closeOppEditModal();
    }
}

/* ── Escape key (merged with existing) ─────────────────── */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearch();
        closeCourseModal();
        closeOpportunityModal();
        closeOpportunityDetailsModal();
        closeCollaboratorCoursesModal();
        closeQuickAddModal();
        closeBulkUploadModal();
        closeQuickAddVerifierModal();
        closeBulkUploadVerifierModal();
        closeVerifierDetailsModal();
        // Enhanced opportunity modals
        closeOppViewModal();
        closeOppEditModal();
        closeOppConfirm();
    }
});

/* ── HTML escape utility ────────────────────────────────── */
function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ================================================================
//  INIT
// ================================================================
window.onload = function () {
    injectOpportunityStyles();
    buildOpportunityUI();
    loadOpportunities();
};
