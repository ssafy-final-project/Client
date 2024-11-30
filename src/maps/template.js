import { priceToUk } from "./util";

// 아파트 단위 마커 템플릿 생성 함수
export function createLowLevelMarkerTemplate(data) {
  let count = data.dealCount + " 건";
  let price = data.avgPrice;

  return `
  <button class="wrapper"
          onclick="javascript:onLowOverlayClicked('${data.aptSeq}')">
        <div class="deals-box">${count}</div>
        <div class="price-box">${priceToUk(price)}</div>
        <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" d="M0.5 8.7929L8.29289 1V0H0.5V8.7929Z"></path><path stroke="#1E41D0" d="M0.5 0V8.7929L7.79289 1.5L9 1.5"></path>
        </svg>
  </button>
  `;
}

// 구군, 동 단위 마커 템플릿 생성 함수
export function createHighLevelMarkerTemplate(data) {
  const name = data.statName;
  const price = data.avgPrice;
  const level = data.dongCode.endsWith("00000") ? 6 : 3;
  return `
    <button class = "card ${
      price != 0 ? "text-bg-primary" : "text-bg-secondary"
    } align-items-center"
    style = "display: inline-block; border-radius: 30px;" ${price != 0 ? "" : "disabled"}
    onclick = "javascript:onHighOverlayClicked(${data.latitude}, ${
    data.longitude
  }, ${level})">
        <div class = "text-center mx-5"
      style = "font-size: 12px;">
            ${name}</br>
    <strong style = "font-size: 14px;">${priceToUk(price)}</strong>
        </div>
    </button>
  `;
}

// 동 단위 탐색 마커 템플릿 생성 함수
export function createRouteMarkerTemplateDefault(data, mode, route) {
  return `
    <button class = "card align-items-center"
    style = "display: inline-block; border-radius: 30px;"}
    onclick = "javascript:onAuxOverlayClicked(this, '${data.dongCode}', '${
    data.statName
  }')">
        ${createRouterMarkerDefaultInnerTemplate(data)}
    </button>
  `;
}

// 동 단위 탐색 마커 템플릿 생성 함수
export function createRouteMarkerTemplate(data, mode, route) {
  const name = data.statName;
  let innerTemplate = null;
  if (mode == "default") innerTemplate = createRouterMarkerDefaultInnerTemplate(data);
  if (mode == "activate") innerTemplate = createRouterMarkerActivatedInnerTemplate(data);
  if (mode == "target")
    innerTemplate = createRouterMarkerTargetInnerTemplate(data, route);

  return `
    <button class = "card align-items-center"
    style = "display: inline-block; border-radius: 30px;"}
    onclick = "javascript:onAuxOverlayClicked(this, '${data.dongCode}', '${data.statName}')">
        ${innerTemplate}
    </button>
  `;
}

export function createRouterMarkerDefaultInnerTemplate(data) {
  return `
  <div class = "text-center mx-5 py-0">
    <p class = "marker-inner-title" style = "font-size: 12px;">${data.statName}</p>
    <p class = "marker-inner-content" style = "font-size: 14px; font-weight: 700">-</p>
  </div>
  `;
}

export function createRouterMarkerActivatedInnerTemplate(data) {
  return `
  <div class = "text-center mx-5"
      style = "font-size: 12px;">
            선택됨</br>
    <strong style = "font-size: 14px;">${data.statName}</strong>
  </div>`;
}

export function createRouterMarkerTargetInnerTemplate(data, route) {
  return `
  <div class = "text-center mx-5"
      style = "font-size: 12px;">
            ${data.statName}</br>
    <strong style = "font-size: 14px;">${parseInt(route.durationWeight / 60)}분</strong>
  </div>`;
}
