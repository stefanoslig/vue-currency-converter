<template>
  <apexchart :options="chartOptions" :series="series"></apexchart>
</template>

<script lang="ts">
import { RatesEnum } from "../models/RatesEnum";
import { defineComponent, onMounted, PropType, Ref, ref, toRefs, watch } from "vue";
// @ts-ignore
import VueApexCharts from "vue3-apexcharts";
import * as ratesApi from "../api/ExchangeRatesApi";
import { HistoryRates } from "../models/HistoryRates";
import { ChartOptions, ChartSeries } from "../models/ChartConf";

export default defineComponent({
  name: "CurrencyConverterChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    currencyTo: String as PropType<RatesEnum>,
    currencyFrom: String as PropType<RatesEnum>,
  },

  setup(props) {
    const data = ref<HistoryRates | null>(null);
    const currencyTo = toRefs(props).currencyTo;
    const currencyFrom = toRefs(props).currencyFrom;

    const series = ref<ChartSeries[]>([
      {
        name: "Rate",
        data: [],
      },
    ]);

    const chartOptions = ref<ChartOptions>({
      chart: {
        type: "line",
        height: 300,
        width: 450,
        zoom: {
          enabled: true,
        },
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        opposite: true,
      },
    });

    /**
     * Calculates the data for the chart based on the new history data
     * @param {RatesEnum} symbols
     */
    const getHistoryRates = async (currencyTo: RatesEnum, currencyFrom: RatesEnum) => {
      data.value = await ratesApi.getHistoryRates([currencyTo], currencyFrom);

      chartOptions.value = {
        ...chartOptions.value,
        xaxis: {
          categories: Object.keys(data.value.rates),
        },
      };
      series.value = [
        {
          ...series.value,
          data: Object.values(data.value.rates)?.map((item) => item[currencyTo]),
        },
      ];
    };

    watch(
      [currencyTo as Ref<RatesEnum>, currencyFrom as Ref<RatesEnum>],
      ([currencyTo, currencyFrom]: [RatesEnum, any]) => {
        getHistoryRates(currencyTo, currencyFrom);
      }
    );

    onMounted(() => getHistoryRates(RatesEnum.CAD, RatesEnum.USD));

    return { chartOptions, series };
  },
});
</script>

<style lang="scss" scoped>
.vue-apexcharts {
  margin-top: 8px;
}
</style>
