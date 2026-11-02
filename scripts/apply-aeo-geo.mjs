import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const OLD_GEO = {
  placename: 'content="서울"',
  position: "37.5665;126.9780",
  icbm: "37.5665, 126.9780",
  lat: '"37.5665"',
  lng: '"126.9780"',
};

const NEW = {
  placename: 'content="서울 금천구"',
  position: "37.4815;126.8838",
  icbm: "37.4815, 126.8838",
  lat: "37.4815",
  lng: "126.8838",
};

const FAQ_PAGES = {
  "pages/aboutus/aboutus_history.html": {
    title: "회사 소개",
    faqs: [
      [
        "베이직인터내셔널은 언제 설립되었나요?",
        "2019년 11월 1일에 설립되었으며, 대표이사는 김명아입니다.",
      ],
      [
        "본사 위치는 어디인가요?",
        "서울특별시 금천구 벚꽃로 368 가산SKV1 701~708호에 위치합니다.",
      ],
      [
        "주요 사업 분야는 무엇인가요?",
        "SI/ANS, AI부설연구소, SW Sales, Big Data/DW를 중심으로 금융·유통·제조 등 산업의 시스템 구축과 유지보수를 수행합니다.",
      ],
    ],
  },
  "pages/aboutus/research-basic.html": {
    title: "AI 연구소",
    faqs: [
      [
        "베이직인터내셔널 AI연구소는 무엇을 하나요?",
        "AI 서비스·모델 적용·공공 R&D 등 인공지능 기반 연구개발과 사업화를 수행합니다.",
      ],
      [
        "AI연구소는 언제 출범했나요?",
        "2025년 1월 AI부설연구소가 출범했으며, 이후 AI 공공 연구개발과 AI 서비스 런칭을 진행했습니다.",
      ],
      [
        "연구소 성과는 어디에 반영되나요?",
        "AI 동화책, AI 음원, 픽업서비스, SyncLLM 등 서비스와 고객 프로젝트에 반영됩니다.",
      ],
    ],
  },
  "pages/aiservice/ai-book.html": {
    title: "AI 동화책 생성",
    faqs: [
      [
        "AI 동화책 생성 서비스는 무엇인가요?",
        "아이들의 상상력을 스토리와 삽화로 구현하는 인공지능 기반 스토리텔링 서비스입니다.",
      ],
      [
        "어떤 용도로 활용할 수 있나요?",
        "교육, 콘텐츠 제작, 브랜드 스토리텔링 등 다양한 플랫폼 연동 시나리오에 활용할 수 있습니다.",
      ],
      [
        "문의는 어떻게 하나요?",
        "베이직인터내셔널 홈페이지 또는 sisocore@gmail.com, 02-2025-1010으로 문의할 수 있습니다.",
      ],
    ],
  },
  "pages/aiservice/aisound.html": {
    title: "AI 음원 생성",
    faqs: [
      [
        "AI 음원 생성은 어떤 서비스인가요?",
        "원하는 테마와 가사를 고품질 음원으로 생성하는 서비스로 벨소리, 연출음, 악기송 등에 활용합니다.",
      ],
      [
        "비즈니스에서도 사용할 수 있나요?",
        "가능합니다. 마케팅, 교육, 콘텐츠 제작 등 비즈니스·교육 목적의 음원 제작에 적합합니다.",
      ],
      [
        "생성 속도는 어느 정도인가요?",
        "테마와 가사 입력 후 단시간에 음원을 생성하도록 설계되어 있습니다.",
      ],
    ],
  },
  "pages/aiservice/pickup.html": {
    title: "픽업 서비스",
    faqs: [
      [
        "픽업 서비스는 무엇인가요?",
        "AI 최적화 경로 알고리즘을 적용한 픽업·배송 물류 관리 시스템입니다.",
      ],
      [
        "어떤 효과가 있나요?",
        "경로 최적화로 이동 효율을 높이고, 운영 현황을 체계적으로 관리할 수 있습니다.",
      ],
      [
        "기존 물류 시스템과 연동되나요?",
        "플랫폼 연동을 전제로 설계되어 있으며, 구축 범위는 상담을 통해 맞춤 정의합니다.",
      ],
    ],
  },
  "pages/aiservice/tabtopay.html": {
    title: "탭투페이",
    faqs: [
      [
        "탭투페이(Tap to Pay)란 무엇인가요?",
        "별도 단말기 없이 스마트폰만으로 결제가 가능한 차세대 결제 솔루션입니다.",
      ],
      [
        "매장에 추가 장비가 필요한가요?",
        "전용 단말기 없이도 스마트폰 기반으로 결제 경험을 구성할 수 있습니다.",
      ],
      [
        "도입 문의는 어디로 하면 되나요?",
        "베이직인터내셔널 02-2025-1010 또는 sisocore@gmail.com으로 문의하면 됩니다.",
      ],
    ],
  },
  "pages/aiservice/sllm.html": {
    title: "SyncLLM",
    faqs: [
      [
        "SyncLLM은 어떤 솔루션인가요?",
        "LLM 기반 음성·대화형 경험을 지원하는 베이직인터내셔널의 AI 솔루션입니다.",
      ],
      [
        "STT/TTS도 포함되나요?",
        "음성인식(STT)·음성합성(TTS)을 포함한 대화형 서비스 구성이 가능합니다.",
      ],
      [
        "온프레미스 환경에도 적용할 수 있나요?",
        "기업 보안·내부망 요구에 맞춰 구축 범위를 설계할 수 있습니다. 상세는 상담을 통해 확인합니다.",
      ],
    ],
  },
  "pages/business/communication.html": {
    title: "통신/인증",
    faqs: [
      [
        "통신/인증 사업은 무엇을 다루나요?",
        "통신·인증 영역의 시스템 구축과 연동, 인증 파트너십 기반의 디지털 서비스 구현을 지원합니다.",
      ],
      [
        "PASS 인증과도 관련이 있나요?",
        "LGU+ PASS 인증 전략적 파트너 등록 등 인증·통신 영역 협업 경험을 보유하고 있습니다.",
      ],
      [
        "맞춤 구축이 가능한가요?",
        "가능합니다. 요구사항 분석 후 인증·연동·운영까지 통합 지원합니다.",
      ],
    ],
  },
  "pages/business/commerce.html": {
    title: "AI 커머스",
    faqs: [
      [
        "AI 커머스 솔루션은 무엇인가요?",
        "커머스 운영에 AI를 결합해 고객 경험과 운영 효율을 높이는 베이직인터내셔널의 사업 영역입니다.",
      ],
      [
        "어떤 기능을 기대할 수 있나요?",
        "상품·고객·운영 데이터 기반의 자동화와 맞춤형 커머스 경험 구현을 목표로 합니다.",
      ],
      [
        "기존 쇼핑몰과도 연계되나요?",
        "기존 커머스/백오피스 환경에 맞춘 연계 구축이 가능합니다.",
      ],
    ],
  },
  "pages/business/education.html": {
    title: "AI 교육",
    faqs: [
      [
        "AI 교육(LMS/LRS) 사업은 무엇인가요?",
        "학습관리(LMS)와 학습기록(LRS)을 중심으로 AI 기반 교육 플랫폼 구축을 지원합니다.",
      ],
      [
        "공공·민간 모두 가능한가요?",
        "가능합니다. 교육 기관과 기업 교육 환경에 맞춰 설계·구축합니다.",
      ],
      [
        "Sync LMS와도 관련이 있나요?",
        "네. 베이직 싱크 교육 LMS 등 자체 교육 솔루션과 연계한 구축이 가능합니다.",
      ],
    ],
  },
  "pages/business/logistics.html": {
    title: "AI 물류",
    faqs: [
      [
        "AI 물류 솔루션은 무엇인가요?",
        "경로 최적화·관제·운영 자동화를 통해 물류 효율을 높이는 AI 기반 물류 사업 영역입니다.",
      ],
      [
        "픽업 서비스와 어떤 관계인가요?",
        "픽업서비스는 AI 경로 최적화를 적용한 대표 물류·배송 시나리오 중 하나입니다.",
      ],
      [
        "글로벌 물류에도 적용되나요?",
        "통합 관제·운영 요구에 맞춰 확장 설계가 가능하며, 범위는 프로젝트별로 정의합니다.",
      ],
    ],
  },
  "pages/business/benevolent.html": {
    title: "공제회 통합시스템",
    faqs: [
      [
        "공제회 통합시스템이란 무엇인가요?",
        "공제회 업무를 통합 관리하기 위한 시스템 구축·운영 솔루션입니다.",
      ],
      [
        "어떤 업무를 지원하나요?",
        "회원·상품·정산·운영 등 공제회 핵심 업무의 디지털화를 지원합니다.",
      ],
      [
        "기존 레거시 시스템 전환도 가능한가요?",
        "가능합니다. 현황 분석 후 단계적 전환·통합을 설계합니다.",
      ],
    ],
  },
  "pages/business/bi-solution.html": {
    title: "BI 솔루션",
    faqs: [
      [
        "BI 솔루션은 무엇을 제공하나요?",
        "데이터 기반 의사결정을 위한 분석·시각화·리포팅 중심의 BI 구축을 지원합니다.",
      ],
      [
        "Big Data/DW와도 연계되나요?",
        "네. Big Data/DW 역량과 결합해 데이터 파이프라인부터 대시보드까지 구성할 수 있습니다.",
      ],
      [
        "도입 절차는 어떻게 되나요?",
        "요구사항 정의 → 데이터 모델/연동 설계 → 구축 → 운영 지원 순으로 진행합니다.",
      ],
    ],
  },
  "pages/business/finance.html": {
    title: "금융 IT 솔루션",
    faqs: [
      [
        "금융 IT 솔루션은 어떤 영역인가요?",
        "보험·은행 등 금융권 SI와 유지보수, 금융 업무 시스템 구축을 수행하는 사업 영역입니다.",
      ],
      [
        "금융권 구축 경험이 있나요?",
        "보험, 은행, 서비스 분야 SI와 금융권·유통·제조 유지보수 경험을 보유하고 있습니다.",
      ],
      [
        "보안·규제 요구도 반영하나요?",
        "금융권 보안·운영 요구사항을 반영한 설계·구축을 기본으로 합니다.",
      ],
    ],
  },
  "pages/business/business-certification.html": {
    title: "인증 사업",
    faqs: [
      [
        "인증 관련 사업은 무엇을 다루나요?",
        "디지털 인증·본인확인 등 인증 체계와 연동되는 서비스 구축을 지원합니다.",
      ],
      [
        "파트너 인증과도 연계되나요?",
        "PASS 등 인증 파트너십 기반의 서비스 연동 경험을 바탕으로 구축합니다.",
      ],
      [
        "상담은 어떻게 하나요?",
        "02-2025-1010 또는 sisocore@gmail.com으로 문의할 수 있습니다.",
      ],
    ],
  },
  "pages/business/business-commerce.html": {
    title: "커머스 사업",
    faqs: [
      [
        "커머스 사업 페이지에서는 무엇을 볼 수 있나요?",
        "베이직인터내셔널의 커머스 관련 구축·운영 역량과 서비스 방향을 확인할 수 있습니다.",
      ],
      [
        "AI 커머스와 다른가요?",
        "커머스 전반의 사업 소개와 AI 특화 커머스 역량이 함께 연결되는 구조입니다.",
      ],
      [
        "구축 범위는 어떻게 정해지나요?",
        "고객 채널·백오피스·데이터 현황을 기준으로 맞춤 범위를 정의합니다.",
      ],
    ],
  },
  "pages/business/business-portal.html": {
    title: "포털 사업",
    faqs: [
      [
        "포털 구축은 어떤 서비스를 제공하나요?",
        "기업·기관 포털의 정보 구조, 콘텐츠, 인증·연동을 포함한 디지털 창구 구축을 지원합니다.",
      ],
      [
        "CMS와도 연계되나요?",
        "SyncCMS 등 콘텐츠 관리 플랫폼과 연계한 포털 구축이 가능합니다.",
      ],
      [
        "반응형·접근성도 고려하나요?",
        "네. 다양한 디바이스와 사용성을 고려한 UI/UX 구성을 지원합니다.",
      ],
    ],
  },
  "pages/business/cloudsol.html": {
    title: "클라우드 솔루션",
    faqs: [
      [
        "클라우드 솔루션은 무엇을 다루나요?",
        "클라우드 인프라·마이그레이션·운영 체계 구축을 지원하는 솔루션 영역입니다.",
      ],
      [
        "온프레미스와 혼합 구성도 가능한가요?",
        "가능합니다. 하이브리드 환경을 포함한 아키텍처 설계가 가능합니다.",
      ],
      [
        "관련 상세 페이지가 있나요?",
        "클라우드 솔루션 상세는 cloudsolution 페이지와 기술 허브에서 함께 확인할 수 있습니다.",
      ],
    ],
  },
  "pages/business/solution.html": {
    title: "솔루션",
    faqs: [
      [
        "솔루션 페이지에서는 무엇을 확인하나요?",
        "베이직인터내셔널이 제공하는 주요 솔루션 라인업과 적용 방향을 확인할 수 있습니다.",
      ],
      [
        "Sync 제품과도 연결되나요?",
        "네. Sync 플랫폼과 산업 솔루션이 함께 고객 과제에 맞춰 조합됩니다.",
      ],
      [
        "도입 상담은 가능한가요?",
        "가능합니다. 요구사항을 바탕으로 적합한 솔루션 조합을 제안합니다.",
      ],
    ],
  },
  "pages/experience/experience.html": {
    title: "구축사례",
    faqs: [
      [
        "구축사례 페이지에서는 무엇을 볼 수 있나요?",
        "베이직인터내셔널이 수행한 주요 프로젝트와 산업별 적용 사례를 확인할 수 있습니다.",
      ],
      [
        "업종별 사례가 있나요?",
        "금융, 물류, 교육 등 산업별 디지털 전환·시스템 구축 사례를 중심으로 소개합니다.",
      ],
      [
        "유사 프로젝트 상담이 가능한가요?",
        "가능합니다. 유사 사례를 참고해 요구사항에 맞는 구축 방안을 상담받을 수 있습니다.",
      ],
    ],
  },
  "pages/experience/experience_customers.html": {
    title: "고객사",
    faqs: [
      [
        "고객사 페이지는 무엇을 보여주나요?",
        "베이직인터내셔널과 함께한 주요 고객·파트너 현황을 확인할 수 있습니다.",
      ],
      [
        "어떤 산업 고객이 있나요?",
        "금융·유통·제조·공공 등 다양한 산업의 시스템 구축·운영 고객을 포함하고 있습니다.",
      ],
      [
        "레퍼런스 문의는 어떻게 하나요?",
        "프로젝트 문의 메일 또는 전화로 레퍼런스·유사 사례 상담을 요청할 수 있습니다.",
      ],
    ],
  },
  "pages/experience/experience_example.html": {
    title: "사례 상세",
    faqs: [
      [
        "사례 상세에서는 무엇을 확인하나요?",
        "개별 구축 사례의 배경, 적용 기술, 성과 포인트를 확인할 수 있습니다.",
      ],
      [
        "자사 환경에도 적용 가능한가요?",
        "가능 여부는 시스템 현황과 목표에 따라 달라지며, 상담을 통해 적합성을 검토합니다.",
      ],
      [
        "추가 자료가 필요하면?",
        "회사소개서 다운로드 또는 이메일 문의를 통해 상세 자료를 요청할 수 있습니다.",
      ],
    ],
  },
  "pages/sync/sync-any.html": {
    title: "SyncAny",
    faqs: [
      [
        "SyncAny는 어떤 솔루션인가요?",
        "파일·데이터 공유와 연계를 중심으로 한 베이직인터내셔널 Sync 플랫폼 제품입니다.",
      ],
      [
        "기업 내부 협업에 적합한가요?",
        "네. 조직 내 안전한 공유·전달 흐름을 구성할 때 활용할 수 있습니다.",
      ],
      [
        "다른 Sync 제품과 함께 쓰나요?",
        "SyncCMS, SyncBoot 등 다른 Sync 제품과 조합해 엔터프라이즈 환경을 구성할 수 있습니다.",
      ],
    ],
  },
  "pages/sync/sync-boot.html": {
    title: "SyncBoot",
    faqs: [
      [
        "SyncBoot는 무엇인가요?",
        "엔터프라이즈 애플리케이션 구축을 지원하는 베이직인터내셔널의 개발·운영 플랫폼입니다.",
      ],
      [
        "어떤 개발 환경에 맞나요?",
        "자바 기반 마이크로서비스·엔터프라이즈 애플리케이션 생산성 향상을 목표로 합니다.",
      ],
      [
        "도입 효과는 무엇인가요?",
        "공통 기반과 표준화된 구성으로 개발 속도·운영 일관성을 높일 수 있습니다.",
      ],
    ],
  },
  "pages/sync/aiops.html": {
    title: "AIOps",
    faqs: [
      [
        "AIOps 운영 프로세스는 무엇인가요?",
        "AI가 분석·수정·검증·문서화를 자동화하고 사람이 승인하는 개발·운영 자동화 체계입니다.",
      ],
      [
        "사람 개입이 완전히 없나요?",
        "아닙니다. 핵심 승인·판단 단계는 사람이 개입하도록 설계되어 있습니다.",
      ],
      [
        "기존 DevOps와 어떻게 다른가요?",
        "단순 배포 자동화를 넘어 AI 기반 분석·수정·검증 루프를 운영 프로세스에 결합합니다.",
      ],
    ],
  },
  "pages/sync/sync-lms.html": {
    title: "Sync LMS",
    faqs: [
      [
        "베이직 싱크 교육 LMS는 무엇인가요?",
        "학습 운영을 위한 베이직인터내셔널의 교육 LMS 솔루션입니다.",
      ],
      [
        "AI 교육 사업과 연결되나요?",
        "네. AI 교육(LMS/LRS) 사업 영역과 연계해 학습 플랫폼을 구성할 수 있습니다.",
      ],
      [
        "맞춤 기능 확장이 가능한가요?",
        "가능합니다. 기관·기업 교육 요구에 맞춰 기능 범위를 설계합니다.",
      ],
    ],
  },
  "pages/sync/v2v_demo.html": {
    title: "v2v 데모",
    faqs: [
      [
        "v2v 데모에서 무엇을 볼 수 있나요?",
        "LLM, API, DB, Webhook, Tool Runner를 캔버스에서 연결하는 온프레미스 자동화 시나리오를 확인할 수 있습니다.",
      ],
      [
        "실제 도입 전 검증에 쓰이나요?",
        "네. 업무 자동화 흐름을 시각적으로 검증하는 데모 환경으로 활용합니다.",
      ],
      [
        "상세 제품 설명은 어디에 있나요?",
        "v2v 워크플로우 페이지에서 제품 개념과 FAQ를 함께 확인할 수 있습니다.",
      ],
    ],
  },
};

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function fixGeo(html) {
  let next = html;
  next = next.replaceAll(OLD_GEO.position, NEW.position);
  next = next.replaceAll(OLD_GEO.icbm, NEW.icbm);
  next = next.replace(
    /<meta name="geo\.placename" content="서울"\s*\/>/g,
    `<meta name="geo.placename" content="서울 금천구" />`
  );
  next = next.replace(
    /<meta name="geo\.placename" content="서울">/g,
    `<meta name="geo.placename" content="서울 금천구">`
  );
  next = next.replace(
    /"latitude"\s*:\s*"37\.5665"/g,
    `"latitude": "${NEW.lat}"`
  );
  next = next.replace(
    /"longitude"\s*:\s*"126\.9780"/g,
    `"longitude": "${NEW.lng}"`
  );
  next = next.replace(
    /"latitude"\s*:\s*37\.5665/g,
    `"latitude": ${NEW.lat}`
  );
  next = next.replace(
    /"longitude"\s*:\s*126\.9780/g,
    `"longitude": ${NEW.lng}`
  );
  // Enrich incomplete addressLocality-only org blocks when Seoul-only
  next = next.replace(
    /"addressLocality"\s*:\s*"서울특별시"/g,
    `"addressLocality": "금천구",\n              "addressRegion": "서울특별시"`
  );
  return next;
}

function faqSchema(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

function faqHtml(title, faqs) {
  const cards = faqs
    .map(
      ([q, a]) => `        <article class="faq-card">
          <div class="faq-card__header">
            <h3 class="faq-card__q"><span class="faq-card__icon" aria-hidden="true">Q</span>${escapeHtml(q)}</h3>
          </div>
          <div class="faq-card__body">${escapeHtml(a)}</div>
        </article>`
    )
    .join("\n");
  return `
    <section class="cms-faq aeo-faq" aria-label="자주 묻는 질문">
      <h2 class="section-title">자주 묻는 질문</h2>
      <p class="section-desc">${escapeHtml(title)} 관련 자주 묻는 질문입니다.</p>
      <div class="cms-faq__list">
${cards}
      </div>
    </section>
`;
}

function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function injectFaq(html, rel, cfg) {
  if (html.includes('"@type": "FAQPage"') || html.includes('"@type":"FAQPage"')) {
    return { html, skipped: "schema-exists" };
  }
  if (html.includes("자주 묻는 질문") && html.includes("faq-card")) {
    return { html, skipped: "ui-exists" };
  }

  const block = faqSchema(cfg.faqs);
  let next = html;
  let injectedSchema = false;

  // Prefer inserting into existing @graph array
  if (next.includes('"@graph"')) {
    next = next.replace(/("(@graph)"\s*:\s*\[)/, (m) => {
      injectedSchema = true;
      return `${m}\n          ${JSON.stringify(block, null, 2).replace(/\n/g, "\n          ")},`;
    });
  } else if (next.includes("application/ld+json")) {
    // Append a new FAQ JSON-LD block before </head>
    const script = `  <script type="application/ld+json">\n${JSON.stringify(
      { "@context": "https://schema.org", ...block },
      null,
      2
    )}\n  </script>\n`;
    next = next.replace(/<\/head>/i, `${script}</head>`);
    injectedSchema = true;
  } else {
    const script = `  <script type="application/ld+json">\n${JSON.stringify(
      { "@context": "https://schema.org", ...block },
      null,
      2
    )}\n  </script>\n`;
    next = next.replace(/<\/head>/i, `${script}</head>`);
    injectedSchema = true;
  }

  const section = faqHtml(cfg.title, cfg.faqs);
  let injectedUi = false;
  if (/<\/main>/i.test(next)) {
    next = next.replace(/<\/main>/i, `${section}\n  </main>`);
    injectedUi = true;
  } else if (/<div id="footer-include"><\/div>/i.test(next)) {
    next = next.replace(
      /<div id="footer-include"><\/div>/i,
      `${section}\n  <div id="footer-include"></div>`
    );
    injectedUi = true;
  } else if (/<\/body>/i.test(next)) {
    next = next.replace(/<\/body>/i, `${section}\n</body>`);
    injectedUi = true;
  }

  return { html: next, injectedSchema, injectedUi };
}

const files = walk(ROOT);
let geoFixed = 0;
let faqAdded = 0;
const report = [];

for (const file of files) {
  const rel = path.relative(ROOT, file).replaceAll("\\", "/");
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  html = fixGeo(html);
  if (html !== before) {
    geoFixed++;
    report.push(`geo: ${rel}`);
  }

  if (FAQ_PAGES[rel]) {
    const result = injectFaq(html, rel, FAQ_PAGES[rel]);
    html = result.html;
    if (result.injectedSchema || result.injectedUi) {
      faqAdded++;
      report.push(`faq: ${rel}`);
    } else if (result.skipped) {
      report.push(`skip-faq(${result.skipped}): ${rel}`);
    }
  }

  if (html !== before) fs.writeFileSync(file, html, "utf8");
}

console.log(
  JSON.stringify({ geoFixed, faqAdded, totalHtml: files.length, report }, null, 2)
);
