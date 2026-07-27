/**
 * The About screen's copy and geometry, transcribed from the Figma
 * "About_Screens" frame (1155:265017, 2048x1152).
 *
 * Every x/y/width below is a panel-local design pixel taken straight from the
 * frame — the same fixed-canvas convention the Timeline and group panels use,
 * so ScaleStage keeps it accurate at any viewport.
 *
 * The document is laid out as four 434px columns at x = 167, 637, 1131 and
 * 1601, alternating English and Korean, and it runs 1624px tall inside a
 * 1152px frame, so the screen scrolls.
 */
export type AboutBlock = {
  x: number;
  y: number;
  width: number;
  /** Section heading run. Omitted for the plain intro paragraphs. */
  heading?: string;
  /** Heading size in px — 20 for the numbered sections, 24 for the disclaimer. */
  headingSize?: 20 | 24;
  /** Body lines. Figma hand-breaks these, so each entry is its own line. */
  body: string[];
  /** Which body type ramp Figma applies to this block. */
  bodyStyle: "en" | "ko";
};

/** Content height in design px — taller than the 1152 frame, hence scrolling. */
/**
 * The About composition starts its first column at x=167, but the sidebar is
 * an opaque 170px panel drawn above the About layer — so the leftmost 3px of
 * every column-one line was clipped. Figma overlaps the two frames by the same
 * 3px; it simply never showed because the Nav_Bar sits under Frame 627 there.
 *
 * The whole document is nudged clear of the bar by exactly that difference.
 * Nothing is resized, re-typed or re-flowed: every authored coordinate keeps
 * its relationship to every other one, the block just starts at the sidebar's
 * edge instead of 3px behind it. The rightmost column ends at 2038 of 2048, so
 * nothing is pushed off the canvas.
 */
export const NAV_BAR_WIDTH = 170;
export const ABOUT_CONTENT_LEFT = 167;
export const ABOUT_SAFE_SHIFT = NAV_BAR_WIDTH - ABOUT_CONTENT_LEFT;

export const ABOUT_CONTENT_HEIGHT = 1624;

export const ABOUT_TITLE = {
  en: { x: 232.9, y: 40, width: 397, text: "K-BIZ Dataset Methodology" },
  ko: { x: 232.9, y: 80, width: 320, text: "케이비즈 데이터셋 방법론" },
};

export const ABOUT_INTRO: AboutBlock[] = [
  {
    x: 225,
    y: 134,
    width: 745,
    bodyStyle: "en",
    body: [
      "K-BIZ documents the evolution of K-pop using a consistent methodology, allowing groups to be compared fairly across generations, companies, and group types.",
    ],
  },
  {
    x: 225,
    y: 182,
    width: 745,
    bodyStyle: "ko",
    body: [
      "케이비즈는 일관된 방법론을 사용하여 케이팝의 진화를 기록하여 세대, 기업, 그룹 유형에 따라 그룹을 공정하게 비교할 수 있게 합다",
    ],
  },
];

/* Figma switches the English body ramp partway down the document: sections 1-5
 * use Satoshi 16/20, sections 6-10 use Pretendard Light 15/17. That is how the
 * frame is authored, so it is reproduced rather than regularised. */
export const ABOUT_SECTIONS: AboutBlock[] = [
  {
    x: 167,
    y: 259,
    width: 434,
    heading: "1. What is considered K-pop?",
    headingSize: 20,
    bodyStyle: "en",
    body: [
      "K-BIZ follows J.Y. Park's definition of K-pop, viewing it as an industry rather than a nationality-based genre. Any group developed through the Korean idol system is considered K-pop, regardless of its members' nationalities or primary language.",
      "",
      "This methodology includes global groups created by Korean entertainment companies as part of the continued evolution of the K-pop industry.",
    ],
  },
  {
    x: 637,
    y: 259,
    width: 434,
    heading: "1. 케이팝은 무엇으로 간주되나요?",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "케이비즈는 케이팝을 국적 기반 장르가 아닌 산업으로 보는 박제이의 정의를 따릅니다. 한국 아이돌 시스템을 통해 발전한 그룹은 멤버의 국적이나 모국어에 관계없이 케이팝으로 간주됩니다.",
      "",
      "이 방법론은 케이비즈산업의 지속적인 진화의 일환으로 한국 엔터테인먼트 회사들이 만든 글로벌 그룹을 포함합니다.",
    ],
  },
  {
    x: 1131,
    y: 259,
    width: 434,
    heading: "2. Group Eligibility",
    headingSize: 20,
    bodyStyle: "en",
    body: [
      "",
      "Only groups that meet all of the following requirements are included:",
      "A minimum of three members",
      "Developed through the Korean idol industry",
      "Recognized as a notable or historically significant K-pop group",
      "Officially debuted",
      "",
      "The database is curated rather than exhaustive, focusing on groups that have shaped the history, development, or globalization of K-pop.",
    ],
  },
  {
    x: 1601,
    y: 259,
    width: 434,
    heading: "2. 그룹 자격",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "다음 요구 사항을 모두 충족하는 그룹만 포함됩니다:",
      "최소 세 명의 회원",
      "한국 아이돌 산업을 통해 발전한",
      "주목할 만한 또는 역사적으로 중요한 케이팝그룹으로 인정받고 있습니다",
      "공식 데뷔",
      "",
      "데이터베이스는 케이팝의 역사, 발전, 또는 세계화를 형성한 그룹들에 초점을 맞추어 전체적인 것이 아니라 선별된 것입니다.",
    ],
  },
  {
    x: 167,
    y: 591,
    width: 434,
    heading: "3. One Representation per Group",
    headingSize: 20,
    bodyStyle: "en",
    body: [
      "",
      "Each group appears only once in the database.",
      "Groups with multiple generations, member changes, rebranding, or temporary additions are represented by a single version to maintain consistency throughout the project.",
    ],
  },
  {
    x: 637,
    y: 591,
    width: 434,
    heading: "3. 그룹당 하나의 표현",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "각 그룹은 데이터베이스에 한 번만 나타납니다.",
      "여러 세대, 구성원 변경, 리브랜딩 또는 임시 추가가 있는 그룹은 프로젝트 전반에 걸쳐 일관성을 유지하기 위해 단일 버전으로 표현됩니다.",
    ],
  },
  {
    x: 1131,
    y: 591,
    width: 434,
    heading: "4. Selected Lineup",
    headingSize: 20,
    bodyStyle: "en",
    body: [
      "",
      "Each group is represented by its most iconic or historically significant lineup.",
      "This lineup was selected based on the period most commonly associated with the group's identity, public recognition, and major achievements, rather than its current or debut lineup.",
    ],
  },
  {
    x: 1601,
    y: 591,
    width: 434,
    heading: "4. 선택된 라인업",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "각 그룹은 가장 상징적이거나 역사적으로 중요한 라인업으로 대표됩니다.",
      "이 라인업은 현재나 데뷔 라인업보다는 그룹의 정체성, 대중의 인지도, 주요 성과와 가장 일반적으로 연관된 기간을 기준으로 선정되었습니다.",
    ],
  },
  {
    x: 167,
    y: 805,
    width: 434,
    heading: "5. Member Count",
    headingSize: 20,
    bodyStyle: "en",
    body: [
      "",
      "The displayed member count reflects only the selected lineup.",
      "It does not represent the current lineup or every member who has ever joined the group.",
    ],
  },
  {
    x: 637,
    y: 805,
    width: 434,
    heading: "5. 회원 수",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "표시된 회원 수는 선택된 라인업만 반영합니다.",
      "현재 라인업이나 그룹에 가입한 모든 멤버를 대표하지는 않습니다.",
    ],
  },
  {
    x: 1131,
    y: 803,
    width: 434,
    heading: "6. Nationality Classification",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "Nationality statistics are calculated using the selected lineup only.",
      "For the purposes of this project, a member is considered Korean if both biological parents are ethnically Korean, regardless of birthplace, dual citizenship, or current nationality.",
    ],
  },
  {
    x: 1601,
    y: 810.5,
    width: 434,
    heading: "6. 국적 분류",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "국적 통계는 선택된 라인업만을 사용하여 계산됩니다.",
      "이 프로젝트의 목적상, 출생지, 이중 국적, 현재 국적에 관계없이 두 친부모가 모두 한국인인 경우 회원은 한국인으로 간주됩니다.",
    ],
  },
  {
    x: 167,
    y: 979,
    width: 434,
    heading: "7. Language Classification",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "Each group is classified according to the language in which the majority of its officially released songs have been recorded.",
      "This classification represents the group's overall discography rather than recent releases or promotional activities.",
    ],
  },
  {
    x: 637,
    y: 996.5,
    width: 434,
    heading: "7. 언어 분류",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "각 그룹은 공식적으로 발매된 곡의 대부분이 녹음된 언어에 따라 분류됩니다.",
      "이 분류는 최근 발매나 홍보 활동보다는 그룹 전체의 음반 목록을 나타냅니다.",
    ],
  },
  {
    x: 1131,
    y: 979,
    width: 434,
    heading: "8. Formation Type",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "Groups are categorized according to how they were originally formed:",
      "Company Assembly – Created directly by an entertainment company.",
      "Survival Show – Formed through a televised audition or competition program.",
      "Global Project – Created specifically as part of a multinational or international project.",
    ],
  },
  {
    x: 1601,
    y: 979,
    width: 434,
    heading: "8. 포메이션 유형",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "그룹은 원래 어떻게 형성되었는지에 따라 분류됩니다:",
      "회사 어셈블리 - 엔터테인먼트 회사에서 직접 제작했습니다.",
      "서바이벌 쇼 – 텔레비전 오디션 또는 경연 프로그램을 통해 제작되었습니다.",
      "글로벌 프로젝트 - 다국적 또는 국제 프로젝트의 일환으로 특별히 제작되었습니다.",
    ],
  },
  {
    x: 167,
    y: 1222,
    width: 434,
    heading: "9. Activity Status",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "Groups are classified according to their current official status.",
      "Possible classifications include:",
      "Active",
      "Disbanded",
    ],
  },
  {
    x: 637,
    y: 1222,
    width: 434,
    heading: "9. 활동 상태",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "그룹은 현재 공식적인 지위에 따라 분류됩니다.",
      "가능한 분류에는 다음이 포함됩니다:",
      "활동적인",
      "해체됨",
    ],
  },
  {
    x: 1131,
    y: 1222,
    width: 434,
    heading: "10. Historical Accuracy",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "The project combines information from official company announcements, artist profiles, album releases, and other reliable industry sources.",
      "Whenever historical information differs across sources, the dataset prioritizes consistency and represents each group using the methodology described above rather than attempting to document every historical variation.",
    ],
  },
  {
    x: 1601,
    y: 1222,
    width: 434,
    heading: "10. 역사적 정확성",
    headingSize: 20,
    bodyStyle: "ko",
    body: [
      "",
      "이 프로젝트는 공식 회사 발표, 아티스트 프로필, 앨범 발매 및 기타 신뢰할 수 있는 업계 출처의 정보를 결합합니다.",
      "출처에 따라 역사적 정보가 다를 때마다 데이터셋은 일관성을 우선시하며, 모든 역사적 변화를 기록하려고 시도하는 대신 위에서 설명한 방법론을 사용하여 각 그룹을 나타냅니다.",
    ],
  },
  {
    x: 650.5,
    y: 1455,
    width: 434,
    heading: "Disclaimer",
    headingSize: 24,
    bodyStyle: "ko",
    body: [
      "",
      "K-BIZ is an educational project that visualizes the evolution of K-pop through a consistent research methodology. While every effort has been made to ensure accuracy, some classifications may differ from other databases.",
    ],
  },
  {
    x: 1109.5,
    y: 1455,
    width: 434,
    heading: "부인",
    headingSize: 24,
    bodyStyle: "ko",
    body: [
      "",
      "케이비즈는 일관된 연구 방법론을 통해 케이팝의 진화를 시각화하는 교육 프로젝트입니다. 정확성을 확보하기 위해 모든 노력을 기울였지만, 일부 분류는 다른 데이터베이스와 다를 수 있습니다.",
    ],
  },
];
