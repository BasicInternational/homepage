/**
 * @component HeroSection
 * @description 페이지 상단 히어로 섹션 공통 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.badge          - 배지 텍스트
 * @param {string} [props.badgeIcon]    - 배지 bootstrap 아이콘 클래스 (기본값: 'bi-braces-asterisk')
 * @param {string} props.title          - 타이틀 (HTML 태그 사용 가능, 줄바꿈 시 <br /> 사용)
 * @param {string} props.sub            - 서브타이틀 (HTML 태그 사용 가능)
 * @param {string} [props.btnText]      - 버튼 텍스트 (기본값: '자세히 →')
 * @param {string} [props.btnHref]      - 버튼 링크 (기본값: 'javascript:void(0)')
 * @param {string} [props.scrollTarget] - 스크롤 인디케이터 앵커 타겟 (기본값: '#scroll-target')
 */

// hero section Type1 컴포넌트
function heroSection({
  badge = '',
  badgeIcon = 'bi-braces-asterisk',
  title = '',
  sub = '',
  btnText = '자세히 →',
  btnHref = 'javascript:void(0)',
  scrollTarget = '#scroll-target',
}) {
  return `
    <section class="syncany-hero">
      <!-- 배경 -->
      <div class="syncany__bg"></div>

      <!-- 본문 -->
      <div class="syncany__content">
        <!-- 배지 -->
        <div class="syncany__badge">
          <div class="syncany__badge-icon">
            <i class="bi ${badgeIcon}"></i>
          </div>
          <span class="syncany__badge-text">${badge}</span>
        </div>

        <!-- 타이틀 -->
        <h2 class="syncany__title">${title}</h2>

        <!-- 서브타이틀 -->
        <p class="syncany__sub">${sub}</p>

        <div class="syncany__btns">
          <a href="${btnHref}" class="syncany__btn-secondary">${btnText}</a>
        </div>
      </div>

      <!-- 스크롤 인디케이터 -->
      <div class="syncany__scroll">
        <span class="syncany__scroll-text"><a href="${scrollTarget}">Scroll</a></span>
        <div class="syncany__scroll-line"></div>
      </div>
    </section>
  `;
}

// 렌더 유틸
function render(selector, component) {
  document.querySelector(selector).insertAdjacentHTML('afterbegin', component);
}
