const revealTargets = document.querySelectorAll(".reveal");
const interactiveTargets = document.querySelectorAll(
  ".project-link, .work-mini-link, .sidebar-action, .project-summary, .work-action"
);
const languageSelect = document.querySelector("#language-select");
const pageName = document.body.dataset.page;
const descriptionMeta = document.querySelector("#page-description");

const translations = {
  "zh-Hant": {
    metaDescription: {
      home: "Jason Portfolio，整理精選專案、展示影片與補充資料。",
      project1: "AI Dementia Care System 專案頁，包含側邊欄導覽、展示影片與補充資料。",
      project2: "AI Drone-assisted Agriculture Job Marketplace 專案頁，包含展示影片與競賽資料。"
    },
    pageTitle: {
      home: "Jason Portfolio",
      project1: "AI Dementia Care System | Jason Portfolio",
      project2: "AI Drone-assisted Agriculture Job Marketplace | Jason Portfolio"
    },
    text: {
      sidebarIntro: "歡迎來到我的作品集，這裡整理了我精選的專案、展示影片與補充資料。",
      projectsLabel: "專案",
      worksLabel: "其他作品",
      linksLabel: "連結",
      viewWebsite: "瀏覽網站",
      githubRepo: "GitHub 專案",
      homeEyebrow: "首頁",
      homeHeroTitle: "專案與作品，始終來自於生活",
      homeHeroLead: "你可以從側邊欄查看專案、其他作品與詳細資訊",
      featuredProjectsLabel: "精選專案",
      project01Tag: "專案 01",
      project02Tag: "專案 02",
      project1Summary: "結合即時監控與個人化陪伴的失智照護 AI 系統。",
      project2Summary: "結合無人機巡檢、農務媒合與任務協調的農業平台。",
      project1Meta: "Android AI App",
      project2Meta: "Drone + Agri Platform",
      project2Subtitle: "一套結合無人機巡檢、YOLO 視覺辨識與 Web 平台協作的農業媒合系統，聚焦於解決農業缺工、巡田效率不足與任務協調不易的問題。系統讓農民能透過平台建立任務、安排田區與工作流程，並結合 DJI Tello 與即時影像回傳進行農地觀測，提升農務媒合與現場巡檢的效率。",
      worksSectionLabel: "其他作品",
      work1MiniMeta: "桌面軟體",
      work2MiniMeta: "網站",
      work1Tag: "Windows 工具",
      work1Description: "一套可攜式 Windows 轉檔工具，整合圖片、文件與媒體格式轉換，支援批次處理與免安裝使用情境。",
      typeLabel: "類型",
      platformLabel: "平台",
      techLabel: "技術",
      work1Type: "桌面軟體",
      work1Platform: "Windows",
      releases: "Releases",
      work2Tag: "網站",
      work2Description: "一個協助使用者搜尋、篩選與分析 GitHub 專案的 Web 平台，提供卡片、列表、快速檢視與深色模式切換。",
      work2Type: "網站",
      work2Platform: "Web",
      liveSite: "Live Site",
      project1Subtitle: "一套結合 AI、RAG 語義檢索、ChatGPT 與行為辨識技術的個人化失智陪伴系統，致力於解決高齡化社會下失智照護人力不足與陪伴缺口問題。系統透過「主動式陪伴」、「個人化互動」與「鼓勵式照顧」三大核心理念，陪伴患者進行日常聊天、飲食、運動與回憶互動，並透過 AI 分析使用者的聊天歷史、行為模式與生活習慣，提供更貼近個人的照護體驗。",
      demoVideo: "展示影片",
      functionsLabel: "功能",
      technologyLabel: "技術",
      achievementsLabel: "成果",
      project1Function1: "懷舊聊天與 RAG 知識庫",
      project1Function2: "MLKit 姿勢辨識運動偵測",
      project1Function3: "YOLOv11 飲食辨識",
      project1Function4: "安全區防走失系統",
      project1Function5: "每日量表互動檢測",
      project1Function6: "衛教諮詢與照護建議",
      project1Tech1: "YOLOv11（行為偵測）",
      project1Tech2: "Google ML Kit（姿態偵測）",
      project1Tech4: "ChatGPT API（對話互動）",
      project1Tech5: "Android（行動應用程式）",
      project1Tech6: "MySQL（使用者與照護資料管理）",
      project1Achievement1: "全國 AI 創新競賽第一名",
      project1Achievement2: "AI 驅動的個人化失智照護系統",
      project1Achievement3: "結合即時監控與對話式陪伴功能",
      projectPhotos: "專案照片",
      project2Function1: "無人機輔助農地巡檢",
      project2Function2: "農業工作媒合平台",
      project2Function3: "任務排程與田區設定",
      project2Function4: "即時影像回傳監控",
      project2Function5: "農民與青年協作流程",
      project2Tech6: "Web 平台",
      project2Achievement1: "2023 InnoServe Competition 無人機應用組第一名",
      project2Achievement2: "以無人機任務支援回應農業人力短缺問題",
      project2Achievement3: "透過數位化協調提升農地巡檢效率"
    }
  },
  en: {
    metaDescription: {
      home: "Jason Portfolio with selected projects, demos, and supporting materials.",
      project1: "AI Dementia Care System project page with sidebar navigation, demo video, and project materials.",
      project2: "AI Drone-assisted Agriculture Job Marketplace project page with demo video and competition materials."
    },
    pageTitle: {
      home: "Jason Portfolio",
      project1: "AI Dementia Care System | Jason Portfolio",
      project2: "AI Drone-assisted Agriculture Job Marketplace | Jason Portfolio"
    },
    text: {
      sidebarIntro: "Welcome to my portfolio. Here you'll find selected projects, demos, and supporting materials in one place.",
      projectsLabel: "Projects",
      worksLabel: "Works",
      linksLabel: "Links",
      viewWebsite: "View Live Website",
      githubRepo: "GitHub Repository",
      homeEyebrow: "Welcome",
      homeHeroTitle: "Projects and works, always begin from everyday life.",
      homeHeroLead: "Use the sidebar to explore projects, other works, and details.",
      featuredProjectsLabel: "Featured Projects",
      project01Tag: "Project 01",
      project02Tag: "Project 02",
      project1Summary: "Real-time monitoring and personalized companionship for dementia care.",
      project2Summary: "Drone-enabled agricultural inspection, job matching, and task coordination platform.",
      project1Meta: "Android AI App",
      project2Meta: "Drone + Agri Platform",
      project2Subtitle: "A drone-assisted agriculture matching system that combines UAV inspection, YOLO-based visual recognition, and a collaborative web platform to address labor shortages, low field inspection efficiency, and difficult task coordination. Farmers can create jobs, configure field tasks, and coordinate workflows through the platform while DJI Tello and real-time image return support field observation and improve both job matching and on-site inspection efficiency.",
      worksSectionLabel: "Works",
      work1MiniMeta: "Desktop software",
      work2MiniMeta: "Website",
      work1Tag: "Windows Utility",
      work1Description: "A portable Windows file conversion tool that brings image, document, and media conversion into one interface, with support for batch workflows and portable use.",
      typeLabel: "Type",
      platformLabel: "Platform",
      techLabel: "Tech",
      work1Type: "Desktop Software",
      work1Platform: "Windows",
      releases: "Releases",
      work2Tag: "Website",
      work2Description: "A web platform for searching, filtering, and analyzing GitHub projects with card and list views, quick inspection, and dark mode support.",
      work2Type: "Website",
      work2Platform: "Web",
      liveSite: "Live Site",
      project1Subtitle: "A personalized dementia companionship system that combines AI, RAG semantic retrieval, ChatGPT, and behavior recognition to address care workforce shortages and companionship gaps in an aging society. Built around proactive companionship, personalized interaction, and encouraging care, it supports daily conversation, meals, exercise, and memory-based interaction while analyzing chat history, behavior patterns, and lifestyle habits to deliver a more personal care experience.",
      demoVideo: "Demo Video",
      functionsLabel: "Functions",
      technologyLabel: "Technology",
      achievementsLabel: "Achievements",
      project1Function1: "Nostalgia chat with a RAG knowledge base",
      project1Function2: "ML Kit pose-based exercise detection",
      project1Function3: "YOLOv11 meal recognition",
      project1Function4: "Safe-zone anti-wandering system",
      project1Function5: "Daily scale-based interaction assessment",
      project1Function6: "Health education consultation and care suggestions",
      project1Tech1: "YOLOv11 (behavior detection)",
      project1Tech2: "Google ML Kit (pose detection)",
      project1Tech4: "ChatGPT API (conversational interaction)",
      project1Tech5: "Android (mobile application)",
      project1Tech6: "MySQL (user and care data management)",
      project1Achievement1: "1st Place - National AI Innovation Competition",
      project1Achievement2: "AI-powered personalized dementia care system",
      project1Achievement3: "Real-time monitoring with conversational companionship",
      projectPhotos: "Project Photos",
      project2Function1: "Drone-assisted farmland inspection",
      project2Function2: "Agricultural job matching platform",
      project2Function3: "Task scheduling and field setup",
      project2Function4: "Real-time image return for monitoring",
      project2Function5: "Farmer-youth collaboration workflow",
      project2Tech6: "Web Platform",
      project2Achievement1: "1st Place, InnoServe Competition (Drone Application Category), 2023",
      project2Achievement2: "Addressed agricultural labor shortages with drone-enabled task support",
      project2Achievement3: "Improved farmland inspection efficiency through digital coordination"
    }
  }
};

function applyLanguage(language) {
  const fallbackLanguage = translations[language] ? language : "zh-Hant";
  const locale = translations[fallbackLanguage];

  document.documentElement.lang = fallbackLanguage;
  if (languageSelect) {
    languageSelect.value = fallbackLanguage;
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (locale.text[key]) {
      element.textContent = locale.text[key];
    }
  });

  if (pageName && locale.pageTitle[pageName]) {
    document.title = locale.pageTitle[pageName];
  }

  if (pageName && descriptionMeta && locale.metaDescription[pageName]) {
    descriptionMeta.setAttribute("content", locale.metaDescription[pageName]);
  }

  try {
    localStorage.setItem("portfolio-language", fallbackLanguage);
  } catch (error) {
    // Ignore storage failures in restricted contexts.
  }
}

if (!("IntersectionObserver" in window)) {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -5% 0px"
  }
);

if ("IntersectionObserver" in window) {
  revealTargets.forEach((element) => observer.observe(element));
}

interactiveTargets.forEach((element) => {
  const clearPressed = () => element.classList.remove("is-pressed");

  element.addEventListener("pointerdown", (event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    element.style.setProperty("--press-x", `${x}px`);
    element.style.setProperty("--press-y", `${y}px`);
    element.classList.remove("is-pressed");

    window.requestAnimationFrame(() => {
      element.classList.add("is-pressed");
    });
  });

  element.addEventListener("pointerup", clearPressed);
  element.addEventListener("pointerleave", clearPressed);
  element.addEventListener("blur", clearPressed);
});

if (languageSelect) {
  let initialLanguage = "zh-Hant";

  try {
    initialLanguage = localStorage.getItem("portfolio-language") || "zh-Hant";
  } catch (error) {
    initialLanguage = "zh-Hant";
  }

  applyLanguage(initialLanguage);

  languageSelect.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });
}
