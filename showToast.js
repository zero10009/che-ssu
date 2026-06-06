/*
showToast.js
2026.06.04


*/

// 일정 시간 나타났다가 사라지는 토스트 알림 함수
function showToast(msg) {
  // 1. 텍스트를 담을 div 요소 생성
  let toast = createDiv(msg);

  // 2. CSS 스타일로 예쁘게 꾸미기 및 화면 중앙 상단 배치
  toast.style("position", "fixed");
  toast.style("top", "10%");
  toast.style("left", "50%");
  toast.style("transform", "translate(-50%, 0)");
  toast.style("background", "rgba(0, 0, 0, 0.7)"); // 반투명 검은색 배경
  toast.style("color", "#fff");
  toast.style("padding", "12px 24px");
  toast.style("border-radius", "30px"); // 둥근 테두리
  toast.style("z-index", "9999"); // 무조건 맨 위에 오도록
  toast.style("font-size", "16px");
  toast.style("pointer-events", "none"); // 클릭 방해 방지

  // 3. 서서히 사라지는 애니메이션 효과
  toast.style("opacity", "1");
  toast.style("transition", "opacity 0.5s ease-out");

  // 4. 1.5초 뒤에 투명도를 0으로 만들기 (서서히 사라짐)
  setTimeout(() => {
    toast.style("opacity", "0");
  }, 1500);

  // 5. 2초 뒤에 화면(DOM)에서 완전히 삭제하여 메모리 정리
  setTimeout(() => {
    toast.remove();
  }, 2000);
}
