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
      navHome: "Home",
      navProjects: "Projects",
      navWorks: "Works",
      navAwards: "Awards",
      navCertificates: "Certificates",
      navContact: "Contact",
      homeKicker: "Portfolio",
      homeHeroTitleLine1: "你好，我是邱世宇",
      homeHeroTitleLine2: "讓想法點石成金",
      homeHeroLead:
        "這裡收藏著我做過的專題、課程作品與實作成果，專注於 AI 應用、產品設計與系統開發，從真實需求出發，將想法轉化為實際可用的工具與服務。",
      homeHeroSupport:
        "首頁先看代表專案，再往下快速了解其他 projects、works 與聯絡方式。",
      homePrimaryCta: "查看代表專案",
      homeGithubCta: "GitHub 個人主頁",
      homeResumeCta: "查看履歷",
      featuredLabel: "Featured Project",
      spotlightAward: "全國 AI 創意實作競賽 第一名",
      spotlightCta: "查看專案",
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
      worksTitle: "課程作品 與 AI 協作開發",
      worksSectionTitle: "課程作品",
      worksSubsectionTitle: "AI 協作開發",
      worksLead: "",
      certificatesEyebrow: "Certificates",
      certificatesTitle: "證書",
      awardsTitle: "競賽獲獎",
      awardFirst: "第一名",
      awardMerit: "佳作",
      awardAiTitle: "全國 AI 創意實作競賽",
      awardInnoserveTitle: "InnoServe 無人機應用組",
      awardHackathonTitle: "永續智慧創新黑客松競賽",
      certificateErpTitle: "ERP 規劃師認證",
      certificateAutocadTitle: "AutoCAD 專業認證",
      certificatePdfFallbackBefore: "此瀏覽器無法直接預覽 PDF，請",
      download: "下載",
      certificatePdfFallbackAfter: "檢視。",
      work1Tag: "Windows Utility",
      work2Tag: "Website",
      work1Title: "萬用轉檔王",
      work3Tag: "3D Printing Tool",
      work5Title: "嵌入式 Linux 與機器人實作",
      work5Description: "從 ARM 交叉編譯、Linux 系統建置與裝置驅動，到 Raspberry Pi 電腦視覺實驗，收錄 Lab1–12 的程式與實驗紀錄，並延伸至機器狗實體組裝與系統設計。",
      work5Role: "我獨立完成機器狗實體組裝，並規劃接線、元件需求及後續軟體整合；影像辨識與步態控制目前為系統設計規劃。",
      work5Type: "課程實驗與期末專題",
      work3Title: "STL Splitter：3D 模型裁切與定位孔工具",
      work3Description: "讓超出列印尺寸的 3D 模型也能分件製作。在瀏覽器中載入 STL、調整切割位置並配置定位孔，將零件與定位銷一次匯出為 ZIP，方便後續列印與組裝。",
      work3Type: "3D 列印輔助工具",
      work3Efficiency: "以模型切成兩件、配置 2 個定位孔並匯出為例，預估操作時間可由手動建模的約 15 分鐘縮短至 5 分鐘，節省約 67%。",
      work4Tag: "3D Printing Tool",
      work4Title: "3D 條碼載具卡產生器",
      work4Description: "將條碼文字轉成可 3D 列印的實體載具卡。支援 Code 39 與 Code 128，可調整卡片尺寸、底板厚度及條碼凸起高度，匯出 STL、分件 3MF 與 SVG，方便單色或多色列印。",
      work4Type: "3D 列印輔助工具",
      work4Community: "已發布至 MakerWorld 3D 列印社群，讓使用者從線上產生條碼卡，到下載模型並實際列印。",
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
      githubPortfolioLabel: "Jasongod0916",
      siteLabel: "Website",
      livePortfolioLabel: "Live Portfolio",
      project1Subtitle:
        "針對失智照護人力不足與長者陪伴缺口，我負責從需求設計、AI 整合到 Android App 開發，打造一套具體可行的智慧陪伴系統。系統整合 RAG 與 ChatGPT，提供懷舊聊天互動與照護知識檢索，並結合 ML Kit 進行運動偵測、YOLOv11 進行飲食辨識，以及 GPS 安全監測，讓家屬與照護者能即時掌握異常狀況，同時為長者提供更具個人化的互動與照護支援。",
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
      project1Function1: "懷舊聊天與 RAG 知識庫，強化長者互動",
      project1Function2: "ML Kit 姿勢偵測，辨識運動與日常活動",
      project1Function3: "YOLOv11 飲食辨識，提供飲食安全回饋",
      project1Function4: "安全區防走失系統，立即發送離開警示",
      project1Function5: "每日量表互動，紀錄情緒與身體狀態",
      project1Function6: "衛教諮詢與照護建議，支援家屬決策",
      project1Tech1: "YOLOv11(飲食偵測)",
      project1Tech2: "Google ML Kit（運動偵測）",
      project1Tech3: "RAG（懷舊聊天、照護知識）",
      project1Tech4: "ChatGPT API（對話互動）",
      project1Tech5: "Android（行動應用程式）",
      project1Tech6: "MySQL（使用者與照護資料管理）",
      project1Achievement1: "全國 AI 創新競賽第一名",
      project1Achievement2: "2024 永續智慧創新黑客松競賽佳作",
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
      navAwards: "Awards",
      navCertificates: "Certificates",
      navContact: "Contact",
      homeKicker: "Portfolio",
      homeHeroTitleLine1: "Hi! I'm Jason Chiu",
      homeHeroTitleLine2: "Turning ideas into gold",
      homeHeroLead:
        "This portfolio brings together my major projects, coursework, and hands-on work, focusing on AI applications, product design, and systems development. Starting with real-world needs, I turn ideas into practical tools and services.",
      homeHeroSupport:
        "Start with the representative project, then quickly review the rest of the projects, works, and contact details below.",
      homePrimaryCta: "View Featured Project",
      homeGithubCta: "GitHub Profile",
      homeResumeCta: "View Resume",
      featuredLabel: "Featured Project",
      spotlightAward: "1st Place · National AI Competition",
      spotlightCta: "View project",
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
      worksTitle: "Course Work and AI-Assisted Development",
      worksSectionTitle: "Course Work",
      worksSubsectionTitle: "AI-Assisted Development",
      worksLead: "",
      certificatesEyebrow: "Certificates",
      certificatesTitle: "Certificates",
      awardsTitle: "Competition Awards",
      awardFirst: "First Place",
      awardMerit: "Honorable Mention",
      awardAiTitle: "National AI Creative Implementation Competition",
      awardInnoserveTitle: "InnoServe Competition — Drone Applications",
      awardHackathonTitle: "Sustainability and Smart Innovation Hackathon",
      certificateErpTitle: "ERP Planning Certification",
      certificateAutocadTitle: "AutoCAD Professional Certification",
      certificatePdfFallbackBefore:
        "This browser cannot preview PDF directly, please",
      download: "Download",
      certificatePdfFallbackAfter: "to view.",
      work1Tag: "Windows Utility",
      work2Tag: "Website",
      work1Description:
        "A portable Windows file conversion tool that combines image, document, and media conversion in one interface, with support for batch workflows and portable use.",
      work1Title: "Wanyong Converter",
      work3Tag: "3D Printing Tool",
      work5Title: "Embedded Linux & Robotics",
      work5Description: "Course labs spanning ARM cross-compilation, Linux system builds, device drivers, and Raspberry Pi computer vision. Includes code and records for Labs 1–12, extended into robot assembly and system design.",
      work5Role: "I independently assembled the robot and planned wiring, components, and subsequent software integration. Vision and gait control remain at the system-design stage.",
      work5Type: "Course Labs & Final Project",
      work3Title: "STL Splitter: Model Cutting and Alignment Pins",
      work3Description: "Prepare oversized 3D models for printing in separate parts. Load an STL in the browser, adjust the cut position, and place alignment holes, then export the parts and pins together as a ZIP for printing and assembly.",
      work3Type: "3D Printing Utility",
      work3Efficiency: "For splitting a model into two parts, adding two alignment holes, and exporting, estimated operation time drops from about 15 minutes of manual modeling to 5 minutes, saving approximately 67%.",
      work4Tag: "3D Printing Tool",
      work4Title: "3D Barcode Carrier Card Generator",
      work4Description: "Turn barcode text into a 3D-printable carrier card. Supports Code 39 and Code 128 with adjustable card dimensions, base thickness, and raised barcode height. Export STL, multi-part 3MF, and SVG files for single-color or multicolor printing.",
      work4Type: "3D Printing Utility",
      work4Community: "Published on the MakerWorld 3D printing community, helping users go from generating a barcode card online to downloading the model and printing it.",
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
      githubPortfolioLabel: "Jasongod0916",
      siteLabel: "Website",
      livePortfolioLabel: "Live Portfolio",
      project1Subtitle:
        "Focused on dementia care workforce shortages, I led the requirement definition, AI integration, and Android delivery for a practical companion system. It combines nostalgia chat, RAG semantic retrieval, ChatGPT interaction, and behavior recognition with YOLOv11 / ML Kit monitoring so caregivers receive real-time alerts and personalized support.",
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
      project1Function1:
        "Nostalgia chat with a RAG knowledge base for improved engagement",
      project1Function2:
        "ML Kit pose-based exercise detection for activity monitoring",
      project1Function3: "YOLOv11 meal recognition for dietary awareness",
      project1Function4:
        "Safe-zone anti-wandering system for immediate exit alerts",
      project1Function5:
        "Daily scale-based interaction assessment for mood and activity tracking",
      project1Function6:
        "Health education consultation and care suggestions for caregiver support",
      project1Tech1: "YOLOv11 (meal detection)",
      project1Tech2: "Google ML Kit (activity detection)",
      project1Tech3: "RAG (nostalgia chat and care knowledge)",
      project1Tech4: "ChatGPT API (conversational interaction)",
      project1Tech5: "Android (mobile application)",
      project1Tech6: "MySQL (user and care data management)",
      project1Achievement1: "1st Place - National AI Innovation Competition",
      project1Achievement2:
        "Merit Award, 2024 Sustainable Smart Innovation Hackathon",
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

const richTranslations = {
  "zh-Hant": {
    homeHeroTitleLine2: [
      "讓想法點",
      { text: "石", className: "hero-material hero-material-stone" },
      "成",
      { text: "金", className: "hero-material hero-material-gold" },
    ],
    project1Subtitle: [
      "針對",
      { tag: "strong", text: "失智照護人力不足" },
      "與",
      { tag: "strong", text: "長者陪伴缺口" },
      "，我負責從需求設計、AI 整合到 Android App 開發，打造一套具體可行的智慧陪伴系統。 系統整合 ",
      { tag: "strong", text: "RAG 與 ChatGPT" },
      "，提供懷舊聊天互動與照護知識檢索，並結合 ",
      { tag: "strong", text: "ML Kit" },
      " 進行運動偵測、",
      { tag: "strong", text: "YOLOv11" },
      " 進行飲食辨識，以及 ",
      { tag: "strong", text: "GPS" },
      " 安全監測，讓家屬與照護者能即時掌握異常狀況，同時為長者提供更具個人化的互動與照護支援。",
    ],
  },
};

function renderRichText(element, parts) {
  const fragment = document.createDocumentFragment();

  parts.forEach((part) => {
    if (typeof part === "string") {
      fragment.append(document.createTextNode(part));
      return;
    }

    const node = document.createElement(part.tag === "strong" ? "strong" : "span");
    node.textContent = part.text;
    if (part.className) node.className = part.className;
    fragment.append(node);
  });

  element.replaceChildren(fragment);
}

function applyLanguage(language) {
  const locale = translations[language] || translations["zh-Hant"];
  const richLocale = richTranslations[language] || {};

  document.documentElement.lang =
    language in translations ? language : "zh-Hant";

  if (languageSelect) {
    languageSelect.value = document.documentElement.lang;
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (richLocale[key]) {
      renderRichText(element, richLocale[key]);
      return;
    }

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

    if (nextExpanded) {
      panel.classList.add("is-open");
      panel.hidden = false;
      const panelHeight = panel.scrollHeight;
      panel.style.maxHeight = `${panelHeight}px`;
      panel.style.opacity = "1";
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
      requestAnimationFrame(() => {
        panel.style.maxHeight = "0";
        panel.style.opacity = "0";
      });
      panel.addEventListener(
        "transitionend",
        () => {
          if (!nextExpanded) {
            panel.hidden = true;
            panel.classList.remove("is-open");
            panel.style.maxHeight = "";
          }
        },
        { once: true },
      );
    }

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
      const controls = gallery.querySelector(".gallery-bottom-controls");
      if (controls) controls.style.display = "none";
      if (prevButton) prevButton.style.display = "none";
      if (nextButton) nextButton.style.display = "none";
      return;
    }

    let currentIndex = 0;

    const updateGallery = (index) => {
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
        if (slide.matches("img")) slide.tabIndex = slideIndex === index ? 0 : -1;
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

function initImagePreview() {
  const dialog = document.querySelector(".image-preview");
  if (!dialog) return;
  const image = dialog.querySelector(".image-preview-image");
  const title = dialog.querySelector(".image-preview-title");
  let trigger;

  document.querySelectorAll("[data-image-preview]").forEach((link) => {
    const isImage = link.matches("img");
    if (isImage) {
      link.setAttribute("role", "button");
      link.setAttribute("aria-haspopup", "dialog");
      link.tabIndex = link.matches(".work-slide:not(.is-active)") ? -1 : 0;
      link.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          link.click();
        }
      });
    }
    link.addEventListener("click", (event) => {
      event.preventDefault();
      trigger = link;
      const source = isImage ? link : link.querySelector("img");
      image.src = isImage ? source.currentSrc || source.src : link.href;
      image.alt = source.alt;
      title.textContent = source.alt;
      dialog.showModal();
      document.documentElement.classList.add("image-preview-open");
    });
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("image-preview-open");
    image.removeAttribute("src");
    trigger?.focus({ preventScroll: true });
  });
}

initImagePreview();
