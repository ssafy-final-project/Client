<template>
  <div ref="chartdiv"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import ApexCharts from 'apexcharts';
import { priceToUkFull } from '@/maps/util';
import { PolynomialRegression } from 'ml-regression';

const props = defineProps(['data', 'aptName']);
const chartdiv = ref(null);
const chart = ref(null);

function normalize(array) {
  const min = Math.min(...array);
  const max = Math.max(...array);
  const normalized = array.map((value) => (value - min) / (max - min));
  return { normalized, min, max };
}

function denormalize(value, min, max) {
  return value * (max - min) + min;
}

function generateMonthlyTimestamps(startTimestamp, endTimestamp) {
  const dates = [];
  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);

  let current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  while (current <= endDate) {
    dates.push(current.getTime());
    current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
  }
  dates.push(current.getTime());

  return dates;
}

watch(
  () => props.data,
  () => {
    let is_valid_regression = true;
    let noise_data;
    let prediction;

    let xaxis_minimum;
    let xaxis_maximum;
    let yaxis_minimum;
    let yaxis_maximum;

    try {
      const epsilonx = 10; // 작은 값
      const epsilony = 0.1; // 작은 값

      noise_data = props.data.map((e) => [e[0] + epsilonx * Math.random(), e[1] + epsilony * Math.random()]);
      noise_data.sort((a, b) => a[0] - b[0]);

      const x = noise_data.map((e) => e[0]);
      const y = noise_data.map((e) => e[1]);
      const start = performance.now();

      const { normalized: xNormalized, min: xMin, max: xMax } = normalize(x);
      const { normalized: yNormalized, min: yMin, max: yMax } = normalize(y);
      xaxis_minimum = xMin;
      xaxis_maximum = xMax;
      yaxis_minimum = yMin - (yMax - yMin) * 0.1;
      yaxis_maximum = yMax + (yMax - yMin) * 0.1;

      const degree = Math.max(1, parseInt(x.length / 20));
      const polyRegression = new PolynomialRegression(xNormalized, yNormalized, degree);

      const end = performance.now();
      console.log(`Regression time: ${end - start} ms`);

      const monthSlice = generateMonthlyTimestamps(xMin, xMax);
      prediction = monthSlice.map((m) => [
        m,
        denormalize(polyRegression.predict((m - xMin) / (xMax - xMin)), yMin, yMax),
      ]);

      const threshold = yMax - yMin;
      is_valid_regression = !prediction.some((e) => {
        return e[1] < yMin - threshold || e[1] > yMax + threshold;
      });
    } catch (error) {
      console.log('LU Matrix is Singular');
      is_valid_regression = false;
    }

    const series_array = is_valid_regression
      ? [
          {
            name: '평당 가격',
            data: noise_data,
          },
          {
            name: '평당 가격 Regression',
            data: noise_data.length > 1 ? prediction : noise_data,
          },
        ]
      : [{ name: '평당 가격', data: props.data }];

    const options = {
      series: series_array,
      chart: {
        type: 'area',
        stacked: false,
        height: 300,
        animations: {
          enabled: false,
        },
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          show: false,
          autoSelected: 'zoom',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        horizontalAlign: 'right',
        fontSize: '12px',
        fontFamily: 'Noto Sans KR',
        fontWeight: 400,
        showForSingleSeries: true,
        position: 'top',
      },
      stroke: {
        width: 1,
        curve: 'straight',
      },
      markers: {
        size: 0,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: (price) => priceToUkFull(price),
        },
        ...(is_valid_regression ? { min: yaxis_minimum, max: yaxis_maximum } : {}),
      },
      xaxis: {
        type: 'datetime',
        labels: {
          dateFormatter: {
            year: 'yyyy', // 연도 표시
            month: 'MMM dd', // 월, 일 표시
            day: 'MMM dd',
          },
        },
        ...(is_valid_regression ? { min: xaxis_minimum, max: xaxis_maximum } : {}),
      },
      tooltip: {
        shared: false,
        y: {
          formatter: (val) => priceToUkFull(val),
        },
      },
    };

    if (chart.value) chart.value.destroy();
    chart.value = new ApexCharts(chartdiv.value, options);
    chart.value.render();
  }
);

onMounted(() => {});
onBeforeUnmount(() => {
  if (chart.value && chart.value.destroy) {
    chart.value.destroy();
  }
});
</script>

<style scoped>
div[ref='chartdiv'] {
  max-width: 100%;
  margin: 0px;
}
</style>
