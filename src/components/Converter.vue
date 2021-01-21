<template>
  <div>
    <div class="ui form">

      <div class="fields inline">
        <div class="field three wide">
          <div class="ui input">
            <input type="number" placeholder="1">
          </div>
        </div>
        <div class="field six wide">
          <div>
          <select class="ui fluid search selection dropdown">
              <option class="item" v-for="currency in currencies" data-value="currency.currencyCode" :key="currency.currencyCode">
                <i class="flag" :class="currency.countryCode.toLowerCase()"></i>{{currency.currencyCode}} ({{currency.currencyName}})
              </option>
          </select>
          </div>
        </div>
        <div class="field six wide">
          <div>
          <select class="ui fluid search selection dropdown">
              <option class="item" v-for="currency in currencies" :data-value="currency.currencyCode">
                <i class="flag" :class="currency.countryCode.toLowerCase()"></i>{{currency.currencyCode}} ({{currency.currencyName}})
              </option>
            </select>
          </div>
          </div>
        <div>
          <input id="convresult" readonly>
        </div>
        </div>
      </div>
      <div class="fields inline">
        <div class="field six wide">
          <button class="ui big teal fluid button right floated" @click="changeBase(model.fromCurrency, model.toCurrency)">
            Convert
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import jQuery from "jquery";
export default {
  name: 'converter',
  props: ['currencies', 'base'],
  methods: {
    changeBase: function (fromCurrency, toCurrency) {
      this.$emit('changeBase', fromCurrency);
      let rate = new Promise((resolve, reject) => {
        let xmlHttp = new XMLHttpRequest();
        console.log(`fromCurrency = `,fromCurrency); // Отладка
        console.log(`toCurrency = `,toCurrency); // Отладка
        const url = `https://api.exchangeratesapi.io/latest?symbols=` + fromCurrency + `,` + toCurrency;
        xmlHttp.open('GET', url, true)
        xmlHttp.onload = function () {
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            resolve(JSON.parse(xmlHttp.responseText).rates);
          } else {
            reject()
          }
        };
        xmlHttp.onerror = reject;
        xmlHttp.send();
      });
      rate.then(data => {
          console.log(data); // Отладка
          console.log(JSON.stringify(data)); // Отладка
          jQuery("#convresult").val(JSON.stringify(data));
        });
    }
  },
  data: function () {
    return {
      model: {}
    }
  },
  mounted: function () {
    /* eslint-disable no-undef */
    jQuery('.ui .dropdown').dropdown();
  }
}
</script>
