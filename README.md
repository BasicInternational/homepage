퍼블 작업환경: vscode > live server

live server 폴더 위치기준은 hompage로 잡았습니다.
설정을 만질 수 없어 git page 설정불가.
기존 css 파일 대신 style_after.css 를 새로 만들어 사용 중입니다.

디자인 상의:1
  1. Main Features 애니메이션이 과하고 사이즈가 너무 크게 잡혔다는 피드백 있음. (추후 확인필요)
  2. business-commerce.html 에서 Main Features 의 슬라이드 수정필요.(너무 손이 많이가서 보류)
-  퍼블리셔:  윤상기 차장


##  참고 
/public.html 퍼블리스트

---
## 2024-12-27 호스팅 완료

- 금일 오후 4시 10분경으로 www.basicit.co.kr 접속 시 변경된 프론트를 확인 할 수 있습니다.
- main 브렌치에 머지 하면 변경 사항이 즉시 반영 되는 구조입니다. (https://brunch.co.kr/@everiwon/42 참고) (브렌치 변경 가능합니다.)
- 기존 홈페이지가 도메인을 2개를 사용하고 있어서 https://eagersync.github.io/ 접속 하면 기존 홈페이지도 확인할 수 있습니다. (basicit 도메인을 이 프로젝트로 연결 하였습니다.)
---

## 2025-01-03 호스팅 수정
- 현 홈페이지 수정을 위해 이전 홈페이지로 도메인을 변경하였습니다.
- 회사소개서 다운로드 및 이메일 관련 기능 추가하였습니다. (sisocore@gmail.com으로 메일이 발송)
- 상단에 Contact 및 우상단 메뉴에서 문화/행사에 관한 모든 탭 및 회사소개의 핵심인력 소개 부분이 안보이도록 주석 처리하였습니다.
- essets 폴더 안에 file 폴더를 만들어 회사 소개서 pdf를 담았습니다. 다운로드 버튼을 클릭 시 해당 파일이 다운로드됩니다.
---

## 2025-01-07 공통 코드 정리
- 공통으로 사용되는 Header, Footer, Floating Menu 부분을 include 폴더에서 따로 관리 할 수 있도록 코드를 수정하였습니다. (jquery의 load 사용)
- 위 html을 load하면 DOM 구성 이전에 common.js가 실행이 되어 init을 함수화 하여 DOM 구성 후 호출 할 수 있도록 수정