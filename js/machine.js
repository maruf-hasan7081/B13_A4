// ================================
// Job Tracker - Vanilla JS (DOM)
// ================================

let activeTab = "All"; // "All" | "Interview" | "Rejected"
let jobs = []; // { id, element, status }

// -------- DOM --------
const jobsContainer = document.getElementById("show-job");
const noJobsSection = document.getElementById("no-jobs");

const tabAllBtn = document.getElementById("tabAll");
const tabInterviewBtn = document.getElementById("tabInterview");
const tabRejectedBtn = document.getElementById("tabRejected");

const totalCountEl = document.getElementById("totalCount");
const interviewCountEl = document.getElementById("interviewCount");
const rejectedCountEl = document.getElementById("rejectedCount");

const tabJobCountEl = document.getElementById("tabJobCount");

// -------- INIT --------
window.onload = function () {
  bootstrapJobs();   // read existing cards once
  wireTabs();        // tab click listeners
  wireCardActions(); // interview/reject/delete
  render();          // initial
};

// -------- Read existing HTML cards into JS state --------
function bootstrapJobs() {
  const cardEls = jobsContainer.querySelectorAll(".card");

  jobs = [];
  for (let i = 0; i < cardEls.length; i++) {
    jobs.push({
      id: i + 1,
      element: cardEls[i],
      status: null, // null | "Interview" | "Rejected"
    });
  }
}

// -------- Tabs --------
function wireTabs() {
  tabAllBtn.addEventListener("click", function () {
    setTab("All");
  });

  tabInterviewBtn.addEventListener("click", function () {
    setTab("Interview");
  });

  tabRejectedBtn.addEventListener("click", function () {
    setTab("Rejected");
  });
}

function setTab(tabName) {
  activeTab = tabName;
  updateTabButtonStyles();
  render();
}

function updateTabButtonStyles() {
  // reset to outline
  tabAllBtn.className = "btn btn-outline btn-info";
  tabInterviewBtn.className = "btn btn-outline btn-success";
  tabRejectedBtn.className = "btn btn-outline btn-error";

  // active
  if (activeTab === "All") tabAllBtn.className = "btn btn-info";
  if (activeTab === "Interview") tabInterviewBtn.className = "btn btn-success";
  if (activeTab === "Rejected") tabRejectedBtn.className = "btn btn-error";
}

// -------- Card actions (Interview / Rejected / Delete) --------
// NOTE: Uses Event Delegation (still vanilla JS)
function wireCardActions() {
  jobsContainer.addEventListener("click", function (e) {
    // find the card that was clicked
    const cardEl = findParentCard(e.target);
    if (!cardEl) return;

    // get job index from current jobs list
    const jobIndex = findJobIndexByElement(cardEl);
    if (jobIndex === -1) return;

    // identify which button was clicked
    if (isInterviewButton(e.target)) {
      // toggle logic: set Interview
      jobs[jobIndex].status = "Interview";
      render();
      return;
    }

    if (isRejectedButton(e.target)) {
      // toggle logic: set Rejected
      jobs[jobIndex].status = "Rejected";
      render();
      return;
    }

    if (isDeleteButton(e.target)) {
      // remove from DOM
      jobs[jobIndex].element.remove();

      // remove from state
      jobs.splice(jobIndex, 1);

      render();
      return;
    }
  });
}

// ---- helpers for event delegation without closest() ----
function findParentCard(el) {
  while (el && el !== jobsContainer) {
    if (el.classList && el.classList.contains("card")) return el;
    el = el.parentNode;
  }
  return null;
}

function findJobIndexByElement(cardEl) {
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].element === cardEl) return i;
  }
  return -1;
}

function isInterviewButton(el) {
  // your interview button uses: btn-outline btn-accent
  // also handle click on inner text nodes etc.
  const btn = findParentButton(el);
  if (!btn) return false;
  return btn.innerText.trim().toUpperCase() === "INTERVIEW";
}

function isRejectedButton(el) {
  // your rejected button uses: btn-outline btn-secondary
  const btn = findParentButton(el);
  if (!btn) return false;
  return btn.innerText.trim().toUpperCase() === "REJECTED";
}

function isDeleteButton(el) {
  // trash icon click
  // user may click <i> or <button>
  if (el.classList && el.classList.contains("fa-trash-can")) return true;
  const icon = findChildTrashIcon(el);
  return !!icon;
}

function findParentButton(el) {
  while (el && el !== jobsContainer) {
    if (el.tagName && el.tagName.toLowerCase() === "button") return el;
    el = el.parentNode;
  }
  return null;
}

function findChildTrashIcon(el) {
  // if user clicks the button around icon
  if (!el || !el.querySelector) return null;
  return el.querySelector(".fa-trash-can");
}

// -------- Render (filter + counts + empty state) --------
function render() {
  // counts
  let interviewCount = 0;
  let rejectedCount = 0;

  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].status === "Interview") interviewCount++;
    if (jobs[i].status === "Rejected") rejectedCount++;
  }

  // dashboard counts
  totalCountEl.innerText = String(jobs.length);
  interviewCountEl.innerText = String(interviewCount);
  rejectedCountEl.innerText = String(rejectedCount);

  // show/hide cards by tab
  let visibleCount = 0;

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];

    if (activeTab === "All") {
      job.element.classList.remove("hidden");
      visibleCount++;
    } else {
      if (job.status === activeTab) {
        job.element.classList.remove("hidden");
        visibleCount++;
      } else {
        job.element.classList.add("hidden");
      }
    }
  }

  // tab job count (right side "X jobs")
  tabJobCountEl.innerText = String(visibleCount);

  // empty state
  if (visibleCount === 0) {
    noJobsSection.classList.remove("hidden");
    jobsContainer.classList.add("hidden");
  } else {
    noJobsSection.classList.add("hidden");
    jobsContainer.classList.remove("hidden");
  }
}