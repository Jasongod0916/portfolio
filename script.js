const revealTargets = document.querySelectorAll(".reveal");
const languageSelect = document.querySelector("#language-select");
const pageName = document.body.dataset.page;
const descriptionMeta = document.querySelector("#page-description");

const translations = {
  "zh-Hant": {
    pageTitle: {
      home: "Jason Portfolio",
      project1: "AI失智照護系統 | Jason Portfolio",
      project2: "AI 無人機農務媒合平台 | Jason Portfolio",
    },
    metaDescription: {
      home: "Jason Portfolio，整理代表專案、作品與聯絡方式。",
      project1: "AI失智照護系統專案頁，包含展示影片、技術重點與專案資料。",
      project2:
        "AI無人機農務媒合平台專案頁，包含展示影片、技術重點與競賽資料。",
    },
    text: {
      navHome: "首頁",
      navProjects: "Projects",
      navWorks: "Works",
      navCertificates: "Certificates",
      navContact: "Contact",
      homeKicker: "Portfolio",
      homeHeroTitleLine1: "專案與作品，",
      homeHeroTitleLine2: "始終來自於生活。",
      homeHeroLead:
        "這裡整理我做過的專題、課程作品與實作成果，聚焦在用 AI、產品設計與系統開發回應真實問題。",
      homeHeroSupport:
        "首頁先看代表專案，再往下快速了解其他 projects、works 與聯絡方式。",
      homePrimaryCta: "查看代表專案",
      homeSecondaryCta: "瀏覽所有專案",
      featuredLabel: "Featured Project",
      project01Tag: "專案 01",
      project02Tag: "專案 02",
      project1Title: "AI失智照護系統",
      project2Title: "AI 無人機農務媒合平台",
      project2ChineseTitle: "AI 無人機農務媒合平台",
      project2EnglishTitle: "AI Drone-assisted Agriculture Job Marketplace",
      project1Meta: "Android App",
      project2Meta: "Drone + Agri Platform",
      project1Summary: "專注於個人化陪伴的失智照護 AI 系統。",
      project2Summary: "結合無人機巡檢、農務媒合與任務協調的農業平台。",
      homeProject1Point1: "運動監控與失智陪伴整合",
      homeProject1Point2: "RAG 與 ChatGPT 驅動互動體驗",
      homeProject1Point3: "全國 AI 創新競賽第一名",
      homeProject2Point1: "無人機巡檢與任務媒合整合",
      homeProject2Point2: "YOLO 與即時影像支援田區觀測",
      homeProject2Point3: "2023 InnoServe 無人機組第一名",
      projectsEyebrow: "Projects",
      projectsTitle: "專題",
      projectsLead:
        "兩個專案都以真實情境為出發點，從需求、功能到成果都可以快速看到核心價值。",
      worksEyebrow: "Works",
      worksTitle: "課程作品 與 日常開發",
      worksSectionTitle: "課程作品",
      worksSubsectionTitle: "日常開發",
      worksLead: "",
      certificatesEyebrow: "Certificates",
      certificatesTitle: "證書",
      certificatesLead: "本區呈現與 AI、軟體開發與專案管理相關的專業證照。",
      certificateErpTitle: "ERP 規劃師認證",
      certificateAutocadTitle: "AutoCAD 專業認證",
      certificatePdfDescription:
        "內嵌 PDF 檢視，如果瀏覽器無法顯示，可下載檔案檢視。",
      certificatePdfFallbackBefore: "此瀏覽器無法直接預覽 PDF，請",
      download: "下載",
      certificatePdfFallbackAfter: "檢視。",
      work1Tag: "Windows Utility",
      work2Tag: "Website",
      work1Title: "萬用轉檔王",
      work2Title: "SEO 實作：GitHub 專案分析平台",
      work1Description:
        "一套可攜式 Windows 轉檔工具，整合圖片、文件與媒體格式轉換，支援批次處理與免安裝使用情境。",
      work1Role: "我負責工具整合、轉檔流程設計，以及可攜版桌面軟體封裝。",
      work2Description:
        "一個協助使用者搜尋、篩選與分析 GitHub 專案的 Web 平台，提供卡片、列表與深色模式切換。",
      work2Role: "我負責整體介面設計、前端互動與 GitHub 專案探索流程整理。",
      typeLabel: "類型",
      platformLabel: "平台",
      techLabel: "技術",
      work1Type: "桌面軟體",
      work1Platform: "Windows",
      work2Type: "網站",
      work2Platform: "Web",
      releases: "Releases",
      liveSite: "Live Site",
      contactEyebrow: "Contact",
      contactTitle: "聯絡與連結",
      contactLead:
        "如果你想進一步了解專案細節、履歷背景或合作可能，歡迎直接聯絡我。",
      emailLabel: "Email",
      githubPortfolioLabel: "Portfolio Repository",
      siteLabel: "Website",
      livePortfolioLabel: "Live Portfolio",
      project1Subtitle:
        "一套結合 AI、RAG 語義檢索、ChatGPT 與行為辨識技術的個人化失智陪伴系統，致力於解決高齡化社會下失智照護人力不足與陪伴缺口問題。系統透過「主動式陪伴」、「個人化互動」與「鼓勵式照顧」三大核心理念，陪伴患者進行日常聊天、飲食、運動與回憶互動，並透過 AI 分析使用者的聊天歷史、行為模式與生活習慣，提供更貼近個人的照護體驗。",
      project2Subtitle:
        "一套結合無人機巡檢、YOLO 視覺辨識與 Web 平台協作的農業媒合系統，聚焦於解決農業缺工、巡田效率不足與任務協調不易的問題。系統讓農民能透過平台建立任務、安排田區與工作流程，並結合 DJI Tello 與即時影像回傳進行農地觀測，提升農務媒合與現場巡檢的效率。",
      projectHighlightLabel: "Project Focus",
      demoVideoEyebrow: "Demo",
      demoVideo: "展示影片",
      functionsLabel: "功能",
      technologyLabel: "技術",
      achievementsLabel: "成果",
      projectPhotosEyebrow: "Materials",
      projectPhotos: "競賽經歷",
      project1Function1: "懷舊聊天與 RAG 知識庫",
      project1Function2: "MLKit 姿勢辨識運動偵測",
      project1Function3: "YOLOv11 飲食辨識",
      project1Function4: "安全區防走失系統",
      project1Function5: "每日量表互動檢測",
      project1Function6: "衛教諮詢與照護建議",
      project1Tech1: "YOLOv11（行為偵測）",
      project1Tech2: "Google ML Kit（姿態偵測）",
      project1Tech3:
        "RAG（nostalgia content retrieval and response generation）",
      project1Tech4: "ChatGPT API（對話互動）",
      project1Tech5: "Android（行動應用程式）",
      project1Tech6: "MySQL（使用者與照護資料管理）",
      project1Achievement1: "全國 AI 創新競賽第一名",
      project1Achievement2: "AI 驅動的個人化失智照護系統",
      project1Achievement3: "結合即時監控與對話式陪伴功能",
      project2Function1: "無人機輔助農地巡檢",
      project2Function2: "農業工作媒合平台",
      project2Function3: "任務排程與田區設定",
      project2Function4: "即時影像回傳監控",
      project2Function5: "農民與青年協作流程",
      project2Tech6: "Web 平台",
      project2Achievement1: "2023 InnoServe Competition 無人機應用組第一名",
      project2Achievement2: "以無人機任務支援回應農業人力短缺問題",
      project2Achievement3: "透過數位化協調提升農地巡檢效率",
    },
  },
  en: {
    pageTitle: {
      home: "Jason Portfolio",
      project1: "AI Dementia Care System | Jason Portfolio",
      project2:
        "AI Drone-assisted Agriculture Job Marketplace | Jason Portfolio",
    },
    metaDescription: {
      home: "Jason Portfolio featuring selected projects, works, and contact details.",
      project1:
        "AI Dementia Care System project page with demo video, technology highlights, and project materials.",
      project2:
        "AI Drone-assisted Agriculture Job Marketplace project page with demo video, technology highlights, and competition materials.",
    },
    text: {
      navHome: "Home",
      navProjects: "Projects",
      navWorks: "Works",
      navCertificates: "Certificates",
      navContact: "Contact",
      homeKicker: "Portfolio",
      homeHeroTitleLine1: "Projects and works,",
      homeHeroTitleLine2: "shaped by real problems.",
      homeHeroLead:
        "This portfolio brings together my major projects, course work, and product-oriented implementations, with a focus on using AI, system design, and product thinking to respond to real-world needs.",
      homeHeroSupport:
        "Start with the representative project, then quickly review the rest of the projects, works, and contact details below.",
      homePrimaryCta: "View Featured Project",
      homeSecondaryCta: "Browse All Projects",
      featuredLabel: "Featured Project",
      project01Tag: "Project 01",
      project02Tag: "Project 02",
      project1Title: "AI Dementia Care System",
      project2Title: "AI Drone-assisted Agriculture Job Marketplace",
      project2ChineseTitle: "AI 無人機農務媒合平台",
      project2EnglishTitle: "AI Drone-assisted Agriculture Job Marketplace",
      project1Meta: "Android App",
      project2Meta: "Drone + Agri Platform",
      project1Summary:
        "An AI dementia care system focused on personalized companionship.",
      project2Summary:
        "An agricultural platform combining drone inspection, job matching, and task coordination.",
      homeProject1Point1:
        "Integrated activity monitoring and dementia companionship",
      homeProject1Point2: "RAG and ChatGPT powered interaction design",
      homeProject1Point3: "1st Place, National AI Innovation Competition",
      homeProject2Point1:
        "Integrated drone inspection and task matching workflow",
      homeProject2Point2: "YOLO and live image return for field observation",
      homeProject2Point3: "1st Place, InnoServe Drone Category 2023",
      projectsEyebrow: "Projects",
      projectsTitle: "Projects",
      projectsLead:
        "Both projects start from real scenarios, making it easy to understand the problem, solution, and outcome at a glance.",
      worksEyebrow: "Works",
      worksTitle: "Course Work and Daily Development",
      worksSectionTitle: "Course Work",
      worksSubsectionTitle: "Daily Development",
      worksLead: "",
      certificatesEyebrow: "Certificates",
      certificatesTitle: "Certificates",
      certificatesLead:
        "This section highlights certificates related to AI, software development, and project management.",
      certificateErpTitle: "ERP Planning Certification",
      certificateAutocadTitle: "AutoCAD Professional Certification",
      certificatePdfDescription:
        "Embedded PDF preview. If your browser cannot display it, download the file to view.",
      certificatePdfFallbackBefore:
        "This browser cannot preview PDF directly, please",
      download: "Download",
      certificatePdfFallbackAfter: "to view.",
      work1Tag: "Windows Utility",
      work2Tag: "Website",
      work1Description:
        "A portable Windows file conversion tool that combines image, document, and media conversion in one interface, with support for batch workflows and portable use.",
      work1Title: "Wanyong Converter",
      work2Title: "SEO Case Study: GitHub Project Analysis Platform",
      work1Role:
        "I handled tool integration, conversion flow design, and packaging the portable desktop build.",
      work2Description:
        "A web platform for searching, filtering, and analyzing GitHub projects with card and list views plus dark mode support.",
      work2Role:
        "I handled the interface design, front-end interaction, and the overall GitHub project exploration flow.",
      typeLabel: "Type",
      platformLabel: "Platform",
      techLabel: "Tech",
      work1Type: "Desktop Software",
      work1Platform: "Windows",
      work2Type: "Website",
      work2Platform: "Web",
      releases: "Releases",
      liveSite: "Live Site",
      contactEyebrow: "Contact",
      contactTitle: "Contact and Links",
      contactLead:
        "If you would like to learn more about the projects, my background, or collaboration opportunities, feel free to contact me directly.",
      emailLabel: "Email",
      githubPortfolioLabel: "Portfolio Repository",
      siteLabel: "Website",
      livePortfolioLabel: "Live Portfolio",
      project1Subtitle:
        "A personalized dementia companionship system that combines AI, RAG semantic retrieval, ChatGPT, and behavior recognition to address care workforce shortages and companionship gaps in an aging society. Built around proactive companionship, personalized interaction, and encouraging care, it supports daily conversation, meals, exercise, and memory-based interaction while analyzing chat history, behavior patterns, and lifestyle habits to deliver a more personal care experience.",
      project2Subtitle:
        "A drone-assisted agriculture matching system that combines UAV inspection, YOLO-based visual recognition, and a collaborative web platform to address labor shortages, low field inspection efficiency, and difficult task coordination. Farmers can create jobs, configure field tasks, and coordinate workflows through the platform while DJI Tello and real-time image return support field observation and improve both job matching and on-site inspection efficiency.",
      projectHighlightLabel: "Project Focus",
      demoVideoEyebrow: "Demo",
      demoVideo: "Demo Video",
      functionsLabel: "Functions",
      technologyLabel: "Technology",
      achievementsLabel: "Achievements",
      projectPhotosEyebrow: "Materials",
      projectPhotos: "Competition Experience",
      project1Function1: "Nostalgia chat with a RAG knowledge base",
      project1Function2: "ML Kit pose-based exercise detection",
      project1Function3: "YOLOv11 meal recognition",
      project1Function4: "Safe-zone anti-wandering system",
      project1Function5: "Daily scale-based interaction assessment",
      project1Function6: "Health education consultation and care suggestions",
      project1Tech1: "YOLOv11 (behavior detection)",
      project1Tech2: "Google ML Kit (pose detection)",
      project1Tech3:
        "RAG (nostalgia content retrieval and response generation)",
      project1Tech4: "ChatGPT API (conversational interaction)",
      project1Tech5: "Android (mobile application)",
      project1Tech6: "MySQL (user and care data management)",
      project1Achievement1: "1st Place - National AI Innovation Competition",
      project1Achievement2: "AI-powered personalized dementia care system",
      project1Achievement3:
        "Real-time monitoring with conversational companionship",
      project2Function1: "Drone-assisted farmland inspection",
      project2Function2: "Agricultural job matching platform",
      project2Function3: "Task scheduling and field setup",
      project2Function4: "Real-time image return for monitoring",
      project2Function5: "Farmer-youth collaboration workflow",
      project2Tech6: "Web Platform",
      project2Achievement1:
        "1st Place, InnoServe Competition (Drone Application Category), 2023",
      project2Achievement2:
        "Addressed agricultural labor shortages with drone-enabled task support",
      project2Achievement3:
        "Improved farmland inspection efficiency through digital coordination",
    },
  },
};

function applyLanguage(language) {
  const locale = translations[language] || translations["zh-Hant"];

  document.documentElement.lang =
    language in translations ? language : "zh-Hant";

  if (languageSelect) {
    languageSelect.value = document.documentElement.lang;
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
    localStorage.setItem("portfolio-language", document.documentElement.lang);
  } catch (error) {
    // Ignore storage failures.
  }
}

if (!("IntersectionObserver" in window)) {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

if ("IntersectionObserver" in window) {
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
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealTargets.forEach((element) => observer.observe(element));
}

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

document.querySelectorAll(".work-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const panelId = button.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;

    if (!panel) {
      return;
    }

    const nextExpanded = !isExpanded;
    button.setAttribute("aria-expanded", String(nextExpanded));
    panel.hidden = !nextExpanded;

    const workCard = panel.querySelector(".work-card");
    if (workCard) {
      workCard.hidden = !nextExpanded;
    }
  });
});

function initGalleries() {
  document.querySelectorAll(".work-gallery").forEach((gallery) => {
    const slides = Array.from(gallery.querySelectorAll(".work-slide"));
    const dotsContainer = gallery.querySelector(".gallery-dots");
    const prevButton = gallery.querySelector(".gallery-prev");
    const nextButton = gallery.querySelector(".gallery-next");

    if (slides.length <= 1) {
      if (prevButton) prevButton.style.display = "none";
      if (nextButton) nextButton.style.display = "none";
      return;
    }

    let currentIndex = 0;

    const updateGallery = (index) => {
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
      });
      if (dotsContainer) {
        Array.from(dotsContainer.children).forEach((dot, dotIndex) => {
          dot.classList.toggle("is-active", dotIndex === index);
        });
      }
    };

    slides.forEach((slide, slideIndex) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.addEventListener("click", () => {
        currentIndex = slideIndex;
        updateGallery(currentIndex);
      });
      dotsContainer?.appendChild(dot);
    });

    prevButton?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateGallery(currentIndex);
    });

    nextButton?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateGallery(currentIndex);
    });

    updateGallery(currentIndex);
  });
}

function initAutoPlayVideos() {
  const videos = document.querySelectorAll("video[data-autoplay]");
  if (videos.length === 0 || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          video.muted = true;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: [0.4],
      rootMargin: "0px 0px -20% 0px",
    },
  );

  videos.forEach((video) => observer.observe(video));
}

initGalleries();
initAutoPlayVideos();
