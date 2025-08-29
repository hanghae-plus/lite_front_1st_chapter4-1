import { expect, test } from "@playwright/test";

declare global {
  interface Window {
    loadFlag?: boolean;
  }
}

// SSR 테스트는 4174 포트로 고정
const SSR_PORT = 4174;
const SSR_SERVER_URL = `http://localhost:${SSR_PORT}/front_6th_chapter4-1/vanilla/`;

test.describe("SSR E2E: 서버사이드 렌더링 쇼핑몰 테스트", () => {
  test.describe("1. SSR 초기 렌더링 검증", () => {
    test("SSR로 렌더링된 페이지가 서버에서 완전한 HTML을 제공한다", async ({ browser }) => {
      // JavaScript가 완전히 비활성화된 컨텍스트 생성
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();

      await page.goto(SSR_SERVER_URL);

      // SSR로 렌더링된 초기 HTML에 상품 목록이 포함되어야 함
      const bodyContent = await page.locator("body").textContent();
      expect(bodyContent).toContain("총");
      expect(bodyContent).toContain("개");

      // 기본 UI 요소들이 서버에서 렌더링되었는지 확인
      await expect(page.locator("#search-input")).toBeVisible();
      await expect(page.locator("#cart-icon-btn")).toBeVisible();
      await expect(page.locator("#limit-select")).toBeVisible();
      await expect(page.locator("#sort-select")).toBeVisible();

      await context.close();
    });

    test("SSR에서 초기 데이터가 window.__INITIAL_DATA__에 포함된다", async ({ page }) => {
      const response = await page.goto(SSR_SERVER_URL);
      const html = await response!.text();

      // HTML에 window.__INITIAL_DATA__ 스크립트가 포함되어 있는지 확인
      expect(html).toContain(
        `<script>window.__INITIAL_DATA__ = {"products":[{"title":"PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장","link":"https://smartstore.naver.com/main/products/7522712674","image":"https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg","lprice":"220","hprice":"","mallName":"기브N기브","productId":"85067212996","productType":"2","brand":"","maker":"","category1":"생활/건강","category2":"생활용품","category3":"생활잡화","category4":"쇼핑백"},{"title":"샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이","link":"https://smartstore.naver.com/main/products/9396357056","image":"https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg","lprice":"230","hprice":"","mallName":"EASYWAY","productId":"86940857379","productType":"2","brand":"이지웨이건축자재","maker":"","category1":"생활/건강","category2":"생활용품","category3":"생활잡화","category4":"문풍지"},{"title":"실리카겔 50g 습기제거제 제품 /산업 신발 의류 방습제","link":"https://smartstore.naver.com/main/products/4549948287","image":"https://shopping-phinf.pstatic.net/main_8209446/82094468339.4.jpg","lprice":"280","hprice":"","mallName":"제이제이상사","productId":"82094468339","productType":"2","brand":"","maker":"","category1":"생활/건강","category2":"생활용품","category3":"제습/방향/탈취","category4":"제습제"},{"title":"두꺼운 고급 무지쇼핑백 종이쇼핑백 주문제작 소량 로고인쇄 선물용 종이가방 세로형1호","link":"https://smartstore.naver.com/main/products/8643964296","image":"https://shopping-phinf.pstatic.net/main_8618846/86188464619.14.jpg","lprice":"350","hprice":"","mallName":"세모쇼핑백","productId":"86188464619","productType":"2","brand":"","maker":"","category1":"생활/건강","category2":"생활용품","category3":"생활잡화","category4":"쇼핑백"},{"title":"방충망 셀프교체 미세먼지 롤 창문 모기장 알루미늄망 60cmX20cm","link":"https://smartstore.naver.com/main/products/4814730329","image":"https://shopping-phinf.pstatic.net/main_8235925/82359253087.18.jpg","lprice":"420","hprice":"","mallName":"파머스홈","productId":"82359253087","productType":"2","brand":"","maker":"","category1":"생활/건강","category2":"생활용품","category3":"생활잡화","category4":"모기장"},{"title":"방충망 미세먼지 롤 창문 모기장 DIY 100cmx10cm","link":"https://smartstore.naver.com/main/products/668979777","image":"https://shopping-phinf.pstatic.net/main_1112415/11124150101.10.jpg","lprice":"450","hprice":"","mallName":"동백물산","productId":"11124150101","productType":"2","brand":"메쉬코리아","maker":"","category1":"생활/건강","category2":"생활용품","category3":"생활잡화","category4":"모기장"},{"title":"현관문고무패킹 문틈막이 방화문가스켓 현관 우풍 소음 벌레 외풍차단 틈새막이 방음재 일반형","link":"https://smartstore.naver.com/main/products/4976480580","image":"https://shopping-phinf.pstatic.net/main_8252100/82521000904.2.jpg","lprice":"1390","hprice":"","mallName":"나라종합","productId":"82521000904","productType":"2","brand":"","maker":"","category1":"생활/건강","category2":"생활용품","category3":"생활잡화","category4":"문풍지"},{"title":"풍지판 창문 틈새막이 샷시 바람막이 창틀 벌레차단 외풍차단","link":"https://smartstore.naver.com/main/products/261719599","image":"https://shopping-phinf.pstatic.net/main_8131970/8131970722.30.jpg","lprice":"1690","hprice":"","mallName":"리빙포유","productId":"8131970722","productType":"2","brand":"리빙포유","maker":"세일인터내셔널","category1":"생활/건강","category2":"생활용품","category3":"생활잡화","category4":"문풍지"},{"title":"태양 홈키파 엘비이 알파 수성 에어졸 500ml, 1개","link":"https://search.shopping.naver.com/catalog/52481568603","image":"https://shopping-phinf.pstatic.net/main_5248156/52481568603.20250114124554.jpg","lprice":"1820","hprice":"","mallName":"네이버","productId":"52481568603","productType":"1","brand":"홈키파","maker":"태양","category1":"생활/건강","category2":"생활용품","category3":"해충퇴치용품","category4":"에어졸/스프레이"},{"title":"탈부착 방충망 자석쫄대 방풍비닐 창문방충망 셀프시공 DIY 백색 100cm","link":"https://smartstore.naver.com/main/products/2042376373","image":"https://shopping-phinf.pstatic.net/main_1179488/11794889307.3.jpg","lprice":"2190","hprice":"","mallName":"한반도철망","productId":"11794889307","productType":"2","brand":"한반도철망","maker":"","category1":"생활/건강","category2":"생활용품","category3":"생활잡화","category4":"모기장"},{"title":"창틀벌레 모풍지판 창문 벌레 차단 틈새 창문틈 막이 방충망","link":"https://smartstore.naver.com/main/products/6293889960","image":"https://shopping-phinf.pstatic.net/main_8383839/83838392449.1.jpg","lprice":"2300","hprice":"","mallName":"우예스토어","productId":"83838392449","productType":"2","brand":"","maker":"","category1":"생활/건강","category2":"생활용품","category3":"생활잡화","category4":"문풍지"},{"title":"나노 아트2 전기 매립 콘센트 커버 2구","link":"https://smartstore.naver.com/main/products/7170895087","image":"https://shopping-phinf.pstatic.net/main_8471539/84715395409.1.jpg","lprice":"2500","hprice":"","mallName":"터치전기","productId":"84715395409","productType":"2","brand":"나노","maker":"나노","category1":"생활/건강","category2":"공구","category3":"전기용품","category4":"기타 전기용품"},{"title":"날파리 퇴치 초파리 트랩 뿌리파리 벌레 파리 벼룩파리 끈끈이 플라이스틱","link":"https://smartstore.naver.com/main/products/6792117787","image":"https://shopping-phinf.pstatic.net/main_8433661/84336618109.2.jpg","lprice":"2700","hprice":"","mallName":"메디데이","productId":"84336618109","productType":"2","brand":"","maker":"","category1":"생활/건강","category2":"생활용품","category3":"해충퇴치용품","category4":"끈끈이"},{"title":"나이키 리유저블 쇼핑백 소형 타포린백 쇼퍼백 에코백 장바구니 운동 헬스 가방 방수","link":"https://smartstore.naver.com/main/products/6642533357","image":"https://shopping-phinf.pstatic.net/main_8418703/84187033679.6.jpg","lprice":"2890","hprice":"","mallName":"소울 컴퍼니sc","productId":"84187033679","productType":"2","brand":"나이키","maker":"나이키","category1":"생활/건강","category2":"생활용품","category3":"생활잡화","category4":"쇼핑백"},{"title":"방문방음 문틈 창문 방문 틈새막이 소음차단 문틈막이 방음재 고무 문풍지 현관문 패킹 I형","link":"https://smartstore.naver.com/main/products/6106851858","image":"https://shopping-phinf.pstatic.net/main_8365135/83651351346.10.jpg","lprice":"2900","hprice":"","mallName":"주알보","productId":"83651351346","productType":"2","brand":"","maker":"","category1":"생활/건강","category2":"생활용품","category3":"생활잡화","category4":"문풍지"},{"title":"에어컨 세정제 세척제 청소 셀프 클리너 곰팡이 냄새 제거제 스프레이 330ml","link":"https://smartstore.naver.com/main/products/4426750526","image":"https://shopping-phinf.pstatic.net/main_8197127/81971273079.7.jpg","lprice":"3000","hprice":"","mallName":"-에띠리얼-","productId":"81971273079","productType":"2","brand":"산도깨비","maker":"산도깨비","category1":"생활/건강","category2":"생활용품","category3":"세제/세정제","category4":"에어컨세정제"},{"title":"포장용 롤 에어캡 뽁뽁이 0.2T 경포장용 20cm x 50M 1롤","link":"https://smartstore.naver.com/main/products/5182465882","image":"https://shopping-phinf.pstatic.net/main_8272698/82726987088.5.jpg","lprice":"3500","hprice":"","mallName":"황금상사스토어","productId":"82726987088","productType":"2","brand":"","maker":"","category1":"생활/건강","category2":"생활용품","category3":"생활잡화","category4":"단열시트"},{"title":"하수구트랩 배수구 냄새제거 차단 화장실 욕실 40-99mm","link":"https://smartstore.naver.com/main/products/5008920074","image":"https://shopping-phinf.pstatic.net/main_8255344/82553440741.14.jpg","lprice":"4000","hprice":"","mallName":"낭만 탐구소","productId":"82553440741","productType":"2","brand":"낭만탐구소","maker":"","category1":"생활/건강","category2":"욕실용품","category3":"샤워기/수전용품","category4":"배수구캡"},{"title":"땡큐 순수 천연펄프 3겹 14m, 30롤, 1팩","link":"https://search.shopping.naver.com/catalog/54647347924","image":"https://shopping-phinf.pstatic.net/main_5464734/54647347924.20250508140616.jpg","lprice":"4990","hprice":"","mallName":"네이버","productId":"54647347924","productType":"1","brand":"땡큐","maker":"","category1":"생활/건강","category2":"생활용품","category3":"화장지","category4":"롤화장지"},{"title":"고양이 난간 안전망 복층 베란다 방묘창 방묘문 방충망 캣도어 일반형검정1mx1m","link":"https://smartstore.naver.com/main/products/6187449408","image":"https://shopping-phinf.pstatic.net/main_8373194/83731948985.5.jpg","lprice":"5000","hprice":"","mallName":"나이스메쉬","productId":"83731948985","productType":"2","brand":"","maker":"","category1":"생활/건강","category2":"반려동물","category3":"리빙용품","category4":"안전문"}],"categories":{"생활/건강":{"생활용품":{},"주방용품":{},"문구/사무용품":{},"자동차용품":{},"구강위생용품":{},"수납/정리용품":{},"욕실용품":{},"세탁용품":{},"공구":{},"청소용품":{},"정원/원예용품":{},"수집품":{},"관상어용품":{},"반려동물":{}},"디지털/가전":{"태블릿PC":{},"노트북":{}}},"totalCount":340};</script>`,
      );
    });
  });

  test.describe("2. SSR 검색 및 필터링", () => {
    test("검색 파라미터가 포함된 URL이 SSR로 올바르게 렌더링된다", async ({ browser }) => {
      // JavaScript가 완전히 비활성화된 컨텍스트 생성
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();

      // 검색 파라미터를 포함한 URL로 직접 접근
      await page.goto(`${SSR_SERVER_URL}?search=%EC%A0%A4%EB%A6%AC`);

      // SSR로 필터링된 결과가 렌더링되었는지 확인
      const bodyContent = await page.locator("body").textContent();
      expect(bodyContent).toContain("3개");
      expect(bodyContent).toContain("젤리");

      // 검색 입력 필드에 값이 미리 설정되어 있는지 확인
      const searchInput = page.locator("#search-input");
      await expect(searchInput).toHaveValue("젤리");

      await context.close();
    });

    test("카테고리 필터링이 SSR로 올바르게 렌더링된다", async ({ browser }) => {
      // JavaScript가 완전히 비활성화된 컨텍스트 생성
      const context = await browser.newContext({
        javaScriptEnabled: false,
      });
      const page = await context.newPage();

      // 카테고리 파라미터를 포함한 URL로 직접 접근
      await page.goto(
        `${SSR_SERVER_URL}?category1=%EC%83%9D%ED%99%9C%2F%EA%B1%B4%EA%B0%95&category2=%EC%9E%90%EB%8F%99%EC%B0%A8%EC%9A%A9%ED%92%88`,
      );

      // SSR로 카테고리가 필터링되었는지 확인
      const bodyContent = await page.locator("body").textContent();
      expect(bodyContent).toContain("11개");
      expect(bodyContent).toContain("생활/건강");
      expect(bodyContent).toContain("자동차용품");

      await context.close();
    });

    test("복합 필터링(검색+카테고리+정렬)이 SSR로 올바르게 렌더링된다", async ({ browser }) => {
      // JavaScript가 완전히 비활성화된 컨텍스트 생성
      const context = await browser.newContext({
        javaScriptEnabled: false,
      });
      const page = await context.newPage();

      // 복합 쿼리 파라미터로 직접 접근
      await page.goto(
        `${SSR_SERVER_URL}?search=%EC%B0%A8%EB%9F%89%EC%9A%A9&category1=%EC%83%9D%ED%99%9C%2F%EA%B1%B4%EA%B0%95&category2=%EC%9E%90%EB%8F%99%EC%B0%A8%EC%9A%A9%ED%92%88&sort=price_desc&limit=10`,
      );

      // URL에서 복원된 상태가 SSR로 렌더링되었는지 확인
      const bodyContent = await page.locator("body").textContent();
      expect(bodyContent).toContain("9개");

      // 폼 요소들이 올바른 값으로 미리 설정되어 있는지 확인
      await expect(page.locator("#search-input")).toHaveValue("차량용");
      await expect(page.locator("#sort-select")).toHaveValue("price_desc");
      await expect(page.locator("#limit-select")).toHaveValue("10");

      await context.close();
    });
  });

  test.describe("3. SSR 상품 상세 페이지", () => {
    test("상품 상세 페이지가 SSR로 올바르게 렌더링된다", async ({ browser }) => {
      // JavaScript가 완전히 비활성화된 컨텍스트 생성
      const context = await browser.newContext({
        javaScriptEnabled: false,
      });
      const page = await context.newPage();

      // 직접 상품 상세 URL로 접근
      await page.goto(`${SSR_SERVER_URL}product/85067212996/`);

      // SSR로 렌더링된 상품 정보가 즉시 표시되는지 확인
      const bodyContent = await page.locator("body").textContent();
      expect(bodyContent).toContain("PVC 투명 젤리 쇼핑백");
      expect(bodyContent).toContain("220원");
      expect(bodyContent).toContain("상품 상세");

      // 관련 상품 섹션도 SSR로 렌더링되었는지 확인
      expect(bodyContent).toContain("관련 상품");

      await context.close();
    });
  });

  test.describe("4. SSR SEO 및 메타데이터", () => {
    test("SSR 페이지에 적절한 메타태그가 포함된다", async ({ browser }) => {
      // JavaScript가 완전히 비활성화된 컨텍스트 생성
      const context = await browser.newContext({
        javaScriptEnabled: false,
      });
      const page = await context.newPage();

      const response = await page.goto(SSR_SERVER_URL);
      const html = await response!.text();

      // HTML에 기본 메타태그들이 서버에서 렌더링되었는지 확인
      expect(html).toContain("<title>쇼핑몰 - 홈</title>");

      await context.close();
    });

    test("상품 상세 페이지에 동적 메타태그가 설정된다", async ({ browser }) => {
      // JavaScript가 완전히 비활성화된 컨텍스트 생성
      const context = await browser.newContext({
        javaScriptEnabled: false,
      });
      let page = await context.newPage();
      let response = await page.goto(`${SSR_SERVER_URL}product/85067212996/`);
      let html = await response!.text();

      // 상품별 동적 타이틀이 서버에서 설정되었는지 확인
      expect(html).toContain(
        "<title>PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장 - 쇼핑몰</title>",
      );

      page = await context.newPage();
      response = await page.goto(`${SSR_SERVER_URL}product/86940857379/`);
      html = await response!.text();

      // 상품별 동적 타이틀이 서버에서 설정되었는지 확인
      expect(html).toContain(
        "<title>샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이 - 쇼핑몰</title>",
      );

      await context.close();
    });
  });
});
