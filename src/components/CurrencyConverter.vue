<template>
  <div class="currency-converter-container">
    <section class="currency-info">
      <p>
        {{ inputFrom }} {{ currencyFrom }} equals
        <span class="info-to">{{ inputTo }} {{ currencyTo }}</span>
      </p>
      <div class="date">{{ data?.date }}</div>
    </section>
    <section class="currency-converter">
      <div class="currency-column">
        <input type="number" v-model.number="inputFrom" />
        <select v-model="currencyFrom">
          <option v-for="(value, name) in data?.rates" :value="name" :key="value">
            {{ name }}
          </option>
        </select>
      </div>
      <div class="currency-column">
        <input type="number" v-model="inputTo" readonly />
        <select v-model="currencyTo">
          <option v-for="(value, name) in data?.rates" :value="name" :key="value">
            {{ name }}
          </option>
        </select>
      </div>
      <span class="data-provider-info"
        >Data provided by Foreign exchange rates API (<a
          target="_blank"
          href="https://exchangeratesapi.io/"
          >exchangeratesapi.io</a
        >)</span
      >
    </section>
    <CurrencyConverterChart :currencyTo="currencyTo" :currencyFrom="currencyFrom" />
  </div>
</template>

<script lang="ts">
import * as ratesApi from "@/api/ExchangeRatesApi";
import { ExchangeRates } from "@/models/ExchangeRates";
import { RatesEnum } from "@/models/RatesEnum";
import { defineComponent, onMounted, ref, watch } from "vue";
import CurrencyConverterChart from "./CurrencyConverterChart.vue";

export default defineComponent({
  name: "CurrencyConverter",
  components: { CurrencyConverterChart },

  setup() {
    const inputFrom = ref<number>(1);
    const inputTo = ref<number | null>(null);
    const currencyFrom = ref<RatesEnum>(RatesEnum.USD);
    const currencyTo = ref<RatesEnum>(RatesEnum.CAD);
    const data = ref<ExchangeRates | null>(null);

    const getLatestRates = async (base?: RatesEnum) => {
      data.value = await ratesApi.getExchangeRates(base);
    };

    watch(currencyFrom, (base) => {
      getLatestRates(base);
    });

    watch(
      [inputFrom, data, currencyTo],
      ([inputFrom, data, currencyTo]: [number, any, RatesEnum]) => {
        if (data !== null)
          inputTo.value = +(inputFrom * data.rates[currencyTo]).toFixed(3);
      }
    );

    onMounted(getLatestRates);

    return {
      data,
      inputFrom,
      inputTo,
      currencyFrom,
      currencyTo,
    };
  },
});
</script>

<style lang="scss" scoped>
$border-color: #dfe1e5;
$font-color-gray: #70757a;
$margin-sm: 8px;

%form-field {
  width: 100%;
  padding: 12px 20px;
  margin: $margin-sm 0;
  box-sizing: border-box;
}

.currency-converter-container {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid $border-color;
  padding: 1em;
  background-color: white;

  .currency-converter {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    align-items: center;

    .currency-column {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    input[type="number"] {
      @extend %form-field;
    }

    select {
      @extend %form-field;
    }

    input + select {
      margin-left: 1em;
    }
  }

  .currency-info {
    .date {
      color: $font-color-gray;
      margin-top: $margin-sm;
      margin-bottom: $margin-sm * 2;
      font-size: 12px;
    }
    .info-to {
      font-size: 24px;
    }
  }

  .data-provider-info {
    font-size: 12px;
    color: $font-color-gray;
    margin-top: $margin-sm;
  }
}
</style>
