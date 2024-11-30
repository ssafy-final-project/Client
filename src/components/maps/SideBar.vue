<template>
  <main class="float-start grid" style="--bs-rows: 13; row-gap: 0">
    <header id="aptInfo" class="g-col-12 d-flex align-items-end" style="grid-row: span 4; padding: 5px">
      <div class="text-white mb-1 ms-2">
        <div class="text-2xl text-slate-200 mb-1">{{ data.apt_name }}</div>
        <div id="description">
          <span class="text-lg">{{ data.build_year }}년 준공</span>
          <!-- <button id="detailBtn">자세히</button> -->
          <p class="text-base">{{ data.juso }}({{ data.doro_juso }})</p>
        </div>
        <!-- <p>apt 상세정보</p> -->
      </div>
      <svg
        id="arrow"
        @click="goBack"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          vector-effect="non-scaling-stroke"
          d="m18.696 23-9.32-8.928a.1.1 0 0 1 0-.144L18.695 5"
          stroke="#fff"
          stroke-width="1.4"
        ></path>
      </svg>
      <!-- <i @click="goBack" class="bi bi-caret-right"></i> -->
    </header>

    <section id="dealGraph" class="g-col-12 pe-1" style="grid-row: span 4; padding: 10px">
      <div class="mt-1">
        <h5 id="aptPriceRange">
          매매 {{ f_priceToUkFull(statData.minPrice) }} ~
          {{ f_priceToUkFull(statData.maxPrice) }}
        </h5>
        <div id="aptPriceAvg">평균 {{ f_priceToUkFull(statData.avgPrice) }}</div>
        <div id="priceGraph" style="margin-left: -15px; margin-top: -20px">
          <PriceChart :data="chartDatas" :aptName="data.apt_name"></PriceChart>
        </div>
        <!-- <div id="filterTime">
          <span>최근 1년 |</span>
          <span>최근 3년 |</span>
          <span>전체기간</span>
        </div> -->
      </div>
    </section>
    <section id="dealHistory" class="g-col-12" style="grid-row: span 5; padding: 10px">
      <div class="grid h-100" style="--bs-rows: 6">
        <div class="g-col-12" style="grid-row: span 5">
          <div class="title" style="font-weight: 700">실거래가</div>
          <v-table fixed-header class="h-100">
            <thead>
              <tr>
                <th calss="text-left">계약일</th>
                <th calss="text-left">실거래 정보</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="deal in data.deals" :key="deal.no">
                <th class="aptTableContractDate">
                  {{ `${deal.deal_year}.${deal.deal_month}.${deal.deal_day}` }}
                </th>
                <td>
                  <div class="aptTablePrice">매매 {{ f_priceToUk(deal.deal_price) }}</div>
                  <div class="aptTableInfo">{{ f_areaToPY(deal.exclu_use_ar) }} - {{ deal.floor }}층</div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
        <v-footer class="mt-3 d-flex flex-column g-col-12 p-0" style="grid-row: span 1">
          <div class="d-flex align-center justify-center h-100 bg-light-blue-darken-4 text-center w-100">
            &copy; SSAFY HOME
          </div>
        </v-footer>
      </div>
    </section>
  </main>
</template>

<script setup>
import { localAxios } from '@/util/http-commons';
import { computed, onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { priceToUk, areaToPY, priceToUkFull } from '@/maps/util';
import PriceChart from './PriceChart.vue';

const f_priceToUk = priceToUk;
const f_areaToPY = areaToPY;
const f_priceToUkFull = priceToUkFull;

const route = useRoute();
const router = useRouter();
const axios = localAxios();

const aptSeq = ref(null);
const data = ref({});
const statData = ref({});

const chartDatas = ref([]);

const goBack = () => {
  router.go(-1);
};

const fetchData = () => {
  console.log(`${aptSeq.value} APT INFO REQUESTED`);

  Promise.all([
    axios.get(`/apt/${aptSeq.value}`).then((res) => {
      data.value = res.data;
      data.value.deals.sort((a, b) => {
        if (a.deal_year !== b.deal_year) {
          return b.deal_year - a.deal_year;
        } else if (a.deal_month !== b.deal_month) {
          return b.deal_month - a.deal_month;
        } else {
          return b.deal_day - a.deal_day;
        }
      });
      chartDatas.value = data.value.deals.map((deal) => [
        new Date(deal.deal_year, deal.deal_month - 1, deal.deal_day).getTime(),
        deal.deal_price / (deal.exclu_use_ar / 3.33),
      ]);
    }),
    axios.get(`/stat/apt/single/${aptSeq.value}`).then((res) => {
      statData.value = res.data;
    }),
  ]);
};

onMounted(() => {
  aptSeq.value = route.params.aptSeq;
  fetchData();
});

watch(
  () => route.fullPath,
  () => {
    aptSeq.value = route.params.aptSeq;
    fetchData();
  }
);
</script>

<style lang="scss" scoped>
button {
  border: none;
  background-color: $primary-color;
  color: white;
  border-radius: 5px;
  padding: 3px 4px;
}

main {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: #fff;
  z-index: 1000;
  // overflow-y: auto; /* 세로 스크롤이 필요할 때 스크롤을 추가 */
}

// /* 스크롤바 전체 */
// main::-webkit-scrollbar {
//   width: 5px; /* 스크롤바 너비 */
// }

// /* 스크롤바 막대 */
// main::-webkit-scrollbar-thumb {
//   background-color: $primary-color; /* 부트스트랩 기본 색상인 파란색 사용 */
//   border-radius: 5px; /* 스크롤바의 모서리를 둥글게 */
// }

// /* 스크롤바 트랙 */
// main::-webkit-scrollbar-track {
//   background: #f8f9fa; /* 부트스트랩의 밝은 회색 */
//   border-radius: 5px; /* 스크롤바 트랙 모서리 둥글게 */
// }

// /* 스크롤바 막대 호버 시 */
// main::-webkit-scrollbar-thumb:hover {
//   background-color: #007bff; /* 조금 더 어두운 색상으로 변경 */
// }

#aptInfo {
  position: relative;
  background-color: black;
  background-image: url('@/assets/img/apt_sample.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* 오버레이 추가 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 검은색 반투명 오버레이 */
    pointer-events: none; /* 오버레이로 인한 클릭 방지 */
  }

  div {
    z-index: 1001;
  }

  svg#arrow {
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    font-size: xx-large;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 5px;
  }
}

#description {
  font-size: small;

  * {
    margin-right: 2px;
  }
}

#aptPriceRange {
  font-weight: 700;
}

#dealGraph {
  background-color: white;
}

#dealHistory {
  background-color: white;
}

.divider {
  height: 1px;
  background-color: gray;
}
</style>
