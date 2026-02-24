let activeTab = "All";
let jobs = [];

const jobsContainer = document.getElementById("show-job");
const noJobsSection = document.getElementById("no-jobs");

const totalCountEl = document.getElementById("totalCount");
const interviewCountEl = document.getElementById("interviewCount");
const rejectedCountEl = document.getElementById("rejectedCount");
const tabJobCountEl = document.getElementById("tabJobCount");

const tabAllBtn = document.getElementById("tabAll");
const tabInterviewBtn = document.getElementById("tabInterview");
const tabRejectedBtn = document.getElementById("tabRejected");

window.onload = function () {
  bootstrapJobs();

  tabAllBtn.addEventListener("click", () => setTab("All"));
  tabInterviewBtn.addEventListener("click", () => setTab("Interview"));
  tabRejectedBtn.addEventListener("click", () => setTab("Rejected"));

  jobsContainer.addEventListener("click", handleClick);

  setTab("All");
};

function bootstrapJobs() {
  const cardEls = jobsContainer.querySelectorAll(".card");

  jobs = [];
  for (let i = 0; i < cardEls.length; i++) {
    const card = cardEls[i];

    
    const statusBtn = card.querySelector(".p-10 button");

    jobs.push({
      id: i + 1,
      element: card,
      statusBtn: statusBtn,
      status: null,
    });
  }
}

function setTab(tabName) {
  activeTab = tabName;
  updateTabStyles();
  render();
}

function updateTabStyles() {
  tabAllBtn.className = "btn btn-outline btn-info";
  tabInterviewBtn.className = "btn btn-outline btn-success";
  tabRejectedBtn.className = "btn btn-outline btn-error";

  if (activeTab === "All") tabAllBtn.className = "btn btn-info";
  if (activeTab === "Interview") tabInterviewBtn.className = "btn btn-success";
  if (activeTab === "Rejected") tabRejectedBtn.className = "btn btn-error";
}

function handleClick(e) {
  const card = e.target.closest(".card");
  if (!card) return;

  const job = jobs.find((j) => j.element === card);
  if (!job) return;


  if (e.target.closest(".fa-trash-can")) {
    job.element.remove();
    jobs = jobs.filter((j) => j !== job);
    render();
    return;
  }

  const btn = e.target.closest("button");
  if (!btn) return;

  const text = btn.innerText.trim().toUpperCase();

  if (text === "INTERVIEW") {
    job.status = "Interview";
    render();
    return;
  }

  if (text === "REJECTED") {
    job.status = "Rejected";
    render();
    return;
  }
}

function render() {
  
  let interviewCount = 0;
  let rejectedCount = 0;

  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].status === "Interview") interviewCount++;
    if (jobs[i].status === "Rejected") rejectedCount++;
  }

  totalCountEl.innerText = jobs.length;
  interviewCountEl.innerText = interviewCount;
  rejectedCountEl.innerText = rejectedCount;

 
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const b = job.statusBtn;
    if (!b) continue;

    if (job.status === "Interview") {
      b.innerText = "INTERVIEW";
      b.className = "btn btn-success mt-2"; 
    } else if (job.status === "Rejected") {
      b.innerText = "REJECTED";
      b.className = "btn btn-error mt-2";   
    } else {
      b.innerText = "NOT APPLIED";
      b.className = "btn btn-active mt-2";
    }
  }

  
  let visible = 0;

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];

    if (activeTab === "All") {
      job.element.classList.remove("hidden");
      visible++;
    } else {
      if (job.status === activeTab) {
        job.element.classList.remove("hidden");
        visible++;
      } else {
        job.element.classList.add("hidden");
      }
    }
  }

  
  tabJobCountEl.innerText = visible;

 
  if (visible === 0) {
    noJobsSection.classList.remove("hidden");
    jobsContainer.classList.add("hidden");
  } else {
    noJobsSection.classList.add("hidden");
    jobsContainer.classList.remove("hidden");
  }
}