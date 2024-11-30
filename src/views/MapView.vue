<template>
  <div class="relative" id="container">
    <div
      id="mapContainer"
      ref="mapContainer"
      style="width: 100%; height: 100%"
      :lat="33.450701"
      :lng="126.570667"
    ></div>
    <RouterView></RouterView>
    <v-fade-transition>
      <SwitchButton
        style="position: absolute"
        class="z-10 top-1/80 left-1/2 -translate-x-1/2 transform bg-neutral-50/95 hover:bg-neutral-100/90 p-3 rounded-full"
        v-show="switchToggle"
        v-model="toggleStatus"
        size="large"
      ></SwitchButton>
    </v-fade-transition>
    <!-- <v-fade-transition>
      <SearchResult
        @mv-dong="mvDong"
        v-show="statStore.isDataExist"
        :dongs="statStore.matchedDongs"
        class="z-30"
      ></SearchResult>
    </v-fade-transition> -->
    <v-fade-transition>
      <CurrentDong class="left-1/2 -translate-x-1/2" :dongName="currDong" v-show="currDongToggle"></CurrentDong>
    </v-fade-transition>
    <Carousel :statInfo="currDongInfo" v-show="currDongToggle"></Carousel>
  </div>
</template>

<script setup>
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue';
import Man from '@/maps/mapv2';
import { ElLoading } from 'element-plus';
import { useRouter } from 'vue-router';
import { useMapStore } from '@/stores/map';
import { useStatStore } from '@/stores/statStore';
import { getRoutes } from '@/api/route';
import SwitchButton from '@/components/common/SwitchButton.vue';
import SearchResult from '@/components/maps/SearchResult.vue';
import CurrentDong from '@/components/maps/CurrentDong.vue';
import Carousel from '@/components/maps/Carousel.vue';
import _ from 'lodash';

const router = useRouter();
const mapContainer = ref(null);
const mapStore = useMapStore();
const statStore = useStatStore();
const switchToggle = ref(false);
const toggleStatus = ref(false);
const currDongToggle = ref(false);
const currDong = ref('');
const currDongInfo = ref();

const loadingInstance = () => {
  const instance = ElLoading.service({
    text: 'Loading..',
    background: 'rgba(0, 0, 0, 0.7)',
    lock: true,
  });
  return instance;
};

const man = Man.MapManager;

// 검색 결과 감시
watch(
  () => statStore.isSelected,
  (newValue) => {
    if (newValue) {
      const nextDong = statStore.nextDong;
      mvDong(nextDong.latitude, nextDong.longitude);
      statStore.isSelected = false;
    }
  }
);

// 중하단의 어디 동인지 띄워주는거
watch(
  () => statStore.currDong,
  (newValue) => {
    const superName = statStore.curSuperName;
    const statName = statStore.currDong;
    // const [superName, statName] = newValue.split(" ");
    console.log(statStore.currDong);
    console.log(statStore.curSuperName);
    console.log(statStore.dongStatMap);
    const dongChunk = statStore.dongStatMap.get(superName);
    const matchedDong = dongChunk.find((dong) => dong.statName == statName);
    currDongInfo.value = _.omit(matchedDong, [
      'aux_overlay',
      'dongCode',
      'latitude',
      'longitude',
      'overlay',
      'statName',
      'superName',
    ]);

    currDong.value = newValue;
  }
);

watch(
  () => mapStore.currentLevel,
  (level) => {
    if (4 <= level && level <= 6) {
      switchToggle.value = true;
      currDongToggle.value = false;
    } else if (level < 4) {
      switchToggle.value = false;
      currDongToggle.value = true;
    } else {
      man.MarkerManager.chunkRepository.mode_aux = false;
      toggleStatus.value = false;
      switchToggle.value = false;
      currDongToggle.value = false;
    }
  }
);

watch(toggleStatus, () => {
  if (4 <= mapStore.currentLevel && mapStore.currentLevel <= 6)
    man.MarkerManager.toggleAuxMarkers(man.map, toggleStatus.value);
});

onMounted(async () => {
  // resultView 초기화
  // statStore.isDataExist = false;
  const loader = loadingInstance();

  if (window.kakao && window.kakao.maps) {
    man.init(mapContainer);
  } else {
    const script = document.createElement('script');
    script.onload = () => {
      man.init(mapContainer);
    };
    script.type = 'text/javascript';
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=2621b45f3e14deb49c3159dfbfcc533a&autoload=false&libraries=services';
    await document.head.appendChild(script);
  }

  window.onLowOverlayClicked = async (aptSeq) => {
    router.push({ name: 'sidebar', params: { aptSeq } });
  };

  window.onHighOverlayClicked = async (lat, lng, level) => {
    const latlng = new window.kakao.maps.LatLng(lat, lng);
    man.map.jump(latlng, level, {
      animate: {
        duration: 250,
      },
    });
  };

  window.onAuxOverlayClicked = async (elem, dong_code, name) => {
    await getRoutes(
      dong_code,
      ({ data }) => {
        man.MarkerManager.chunkRepository.setRouteInfo(data);
      },
      console.log
    );
  };

  await loader.close();
});

const mvDong = async (lat, lng) => {
  const location = new kakao.maps.LatLng(lat, lng);
  man.map.jump(location, 4, {
    animate: {
      duration: 250,
    },
  });
  const loader = loadingInstance();
  await man.map.setCenter(location);
  await man.MarkerManager.updateVerticalMarkers(man.map);
  // await loader.close();
  statStore.setMoveFlag(true);
};
</script>

<style scoped>
#container {
  height: 100%;
}
</style>
