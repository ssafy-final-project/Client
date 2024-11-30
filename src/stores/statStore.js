import { defineStore } from 'pinia';
// import { getDongStat, getAptStat } from "@/api/statAPI";
import { computed, ref, watch, watchEffect } from 'vue';
import { KMP } from '@/maps/util';

export const useStatStore = defineStore('stat', () => {
  const dongStats = ref([]);
  const matchedDongs = ref([]);
  const curStatName = ref('');
  const curSuperName = ref('');

  const isSelected = ref(false);
  const selectedDong = ref('');
  const nextDong = ref('');
  const moveFlag = ref(false);
  const dongStatMap = ref();

  watch(
    dongStats,
    (dongData) => {
      // console.log(dongData);
      dongStatMap.value = groupByToMap(dongData, 'superName');
      console.log(dongStatMap.value);
    },
    { once: true }
  );

  const groupByToMap = (array, key) => {
    return array.reduce((map, current) => {
      // 그룹 키 추출
      const groupKey = current[key];

      // Map에서 해당 키가 없으면 새로운 배열 초기화
      if (!map.has(groupKey)) {
        map.set(groupKey, []);
      }

      // 현재 객체를 해당 그룹의 배열에 추가
      map.get(groupKey).push(current);

      return map;
    }, new Map()); // 초기값은 빈 Map
  };

  const setMoveFlag = (status) => {
    moveFlag.value = status;
  };

  const setSelected = (status) => {
    isSelected.value = status;
  };

  const setSelectedDong = (fullJuso) => {
    console.log(fullJuso);
    console.log(matchedDongs);
    nextDong.value = matchedDongs.value.find((dong) => dong.fullJuso == fullJuso);
    if (nextDong.value) {
      selectedDong.value = nextDong.value;
      curStatName.value = nextDong.value.statName;
      curSuperName.value = nextDong.value.superName;
    } else {
      console.log('nextDong is null');
    }
  };

  const setDongData = (dongData) => {
    dongStats.value = dongData;
  };

  const setCurrDong = (dong) => {
    curStatName.value = dong;
  };

  const setSuperName = (name) => {
    curSuperName.value = name;
  };

  // watchEffect(() => (isDataExist.value = matchedDongs.value.length > 0 ? true : false));

  const findMatchedDong = (pattern) => {
    matchedDongs.value = dongStats.value
      .filter((dong) => !dong.statName.trim().endsWith(`리`) && KMP(`${dong.superName} ${dong.statName}`, pattern) >= 0)
      .map((dong) => {
        return { ...dong, fullJuso: `${dong.superName} ${dong.statName}` };
      });
    console.log(matchedDongs.value);
    return matchedDongs.value;
  };

  return {
    dongStats,
    setDongData,
    findMatchedDong,
    matchedDongs,
    // isDataExist,
    setCurrDong,
    setSuperName,
    currDong: curStatName,
    curSuperName,
    isSelected,
    setSelected,
    selectedDong,
    setSelectedDong,
    nextDong,
    moveFlag,
    setMoveFlag,
    dongStatMap,
  };
});
