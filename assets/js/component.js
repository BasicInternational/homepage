/**
 * @component HeroSection
 * @description 페이지 상단 히로 섹션 공통화 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.badge          - 배지 텍스트
 * @param {string} [props.badgeIcon]    - 배지 bootstrap 아이콘 클래스 (기본값: 'bi-braces-asterisk')
 * @param {string} props.title          - 타이틀 (HTML 태그 사용 가능, 줄바꿈 시 <br /> 사용)
 * @param {string} props.sub            - 서브타이틀 (HTML 태그 사용 가능)
 * @param {string} [props.btnText]      - 버튼 텍스트 (기본값: '자세히 →')
 * @param {string} [props.btnHref]      - 버튼 링크 (기본값: 'javascript:void(0)')
 * @param {string} [props.ctaLink]      - 우측 상단 CTA 버튼 링크 (없으면 버튼 미노출)
 * @param {string} [props.ctaText]      - 우측 상단 CTA 버튼 텍스트 (기본값: '시작하기')
 * @param {string} [props.scrollTarget] - 스크롤 인디케이터 앵커 타겟 (기본값: '#scroll-target')
 */

// hero section Type1 컴포넌트
function heroSection({
  badge = '',
  badgeIcon = 'bi-braces-asterisk',
  title = '',
  sub = '',
  btnText = '자세히 →',
  btnHref = null,
  ctaLink = null,
  ctaText = '시작하기',
  scrollTarget = '#scroll-target',
}) {
  return `
    <section class="syncany-hero">
      <div class="syncany__bg"></div>

      <div class="syncany__content">
        <div class="syncany__badge">
          <div class="syncany__badge-icon">
            <i class="bi ${badgeIcon}"></i>
          </div>
          <span class="syncany__badge-text">${badge}</span>
        </div>

        <h2 class="syncany__title">${title}</h2>
        <p class="syncany__sub">${sub}</p>

        <div class="syncany__btns">
          ${btnHref ? `<a href="${btnHref}" target="_blank" class="syncany__btn-secondary">${btnText}</a>` : ''}
          ${
            ctaLink
              ? `
          <button class="nav-cta">
            <a href="${ctaLink}" target="_blank">${ctaText}</a>
          </button>`
              : ''
          }
        </div>
      </div>

      <div class="syncany__scroll">
        <span class="syncany__scroll-text"><a href="${scrollTarget}">Scroll</a></span>
        <div class="syncany__scroll-line"></div>
      </div>
    </section>
  `;
}

// hero section Type2컴포넌트
function heroBigSection({
  badgeIcon = '',
  badgeText = '',
  title = '',
  titleSub = '',
  desc = '',
  btnText = '',
  btnHref = '#',
  statusLeft = '',
  statusRight = '',
  voiceLabel = '',
  cards = [],
} = {}) {
  const badgeHTML =
    badgeIcon || badgeText
      ? `
    <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-blue-500/30 rounded-md bg-blue-500/5 text-blue-400 text-[11px] font-bold tracking-tighter uppercase">
      ${badgeIcon ? `<span class="relative flex h-4 w-4 items-center justify-center"><i class="bi ${badgeIcon}"></i></span>` : ''}
      ${badgeText}
    </div>
  `
      : '';

  const titleHTML =
    title || titleSub
      ? `
    <h1 class="text-5xl md:text-7xl mb-8 leading-[1.1] tracking-tighter text-white">
      ${title}
      ${title && titleSub ? '<br>' : ''}
      ${titleSub ? `<span class="gradient-text italic">${titleSub}</span>` : ''}
    </h1>
  `
      : '';

  const descHTML = desc
    ? `
    <p class="text-lg text-white mb-10 max-w-xl leading-relaxed">${desc}</p>
  `
    : '';

  const btnHTML = btnText
    ? `
    <a href="${btnHref}" target="_blank" class="w-1/2 px-4 py-3 bg-white text-nowrap text-black rounded-xl hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-3 decoration-none">
      ${btnText} <i class="fas fa-arrow-right"></i>
    </a>
  `
    : '';

  const voiceLabelHTML = voiceLabel
    ? `
    <div class="flex w-1/2 items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
      <div class="spectrogram flex items-end gap-[2px] h-[20px]">
        <div class="spec-bar w-[3px] bg-blue-500 animate-pulse" style="height: 80%"></div>
        <div class="spec-bar w-[3px] bg-blue-400 animate-pulse" style="height: 40%; animation-delay: 0.2s"></div>
        <div class="spec-bar w-[3px] bg-pink-500 animate-pulse" style="height: 100%; animation-delay: 0.4s"></div>
        <div class="spec-bar w-[3px] bg-purple-500 animate-pulse" style="height: 60%; animation-delay: 0.1s"></div>
      </div>
      <span class="text-xs font-bold text-gray-300 uppercase tracking-widest">${voiceLabel}</span>
    </div>
  `
    : '';

  const cardHTML = cards.length
    ? cards
        .map(
          ({ label, text, color } = {}) => `
    <div class="p-4 bg-white/5 rounded-xl ${color ? `border-l-4 border-${color}-500` : ''}">
      ${label ? `<p class="text-[14px] text-gray-100 uppercase mb-1">${label}</p>` : ''}
      ${text ? `<p class="text-[16px] text-sm text-white">${text}</p>` : ''}
    </div>
  `,
        )
        .join('')
    : '';

  const rightPanelHTML =
    statusLeft || statusRight || cardHTML
      ? `
    <div class="hero__right-section relative hidden lg:block">
      <div class="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl"></div>
      <div class="relative bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
        ${
          statusLeft || statusRight
            ? `
          <div class="flex justify-between items-center mb-8">
            ${statusLeft ? `<span class="text-xs font-mono text-blue-400">${statusLeft}</span>` : ''}
            ${statusRight ? `<span class="text-xs font-mono text-pink-400 italic">${statusRight}</span>` : ''}
          </div>
        `
            : ''
        }
        ${cardHTML ? `<div class="space-y-6">${cardHTML}</div>` : ''}
      </div>
    </div>
  `
      : '';

  return `
    <section class="relative md:min-h-screen flex items-center justify-start md:justify-center pt-24 px-6 overflow-hidden bg-[#060608]">
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/10 blur-[150px] rounded-full"></div>

      <div class="max-w-6xl mx-auto grid grid-cols-1 ${rightPanelHTML ? 'lg:grid-cols-2' : ''} gap-12 items-center z-10">
        <div class="text-left">
          ${badgeHTML}
          ${titleHTML}
          ${descHTML}
          ${
            btnHTML || voiceLabelHTML
              ? `
            <div class="flex flex-nowrap gap-3">
              ${btnHTML}
              ${voiceLabelHTML}
            </div>
          `
              : ''
          }
        </div>
        ${rightPanelHTML}
      </div>
    </section>
  `;
}

// 렌더 유틸
function render(selector, component) {
  document.querySelector(selector).insertAdjacentHTML('afterbegin', component);
}
