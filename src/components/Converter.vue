<template>
  <div>
    <div class="ui form">
      <div class="fields inline">
        <div class="field seven wide">
          <div>
          <select class="ui fluid search selection dropdown">
              <option class="item" v-for="currency in currencies" data-value="currency.currencyCode" :key="currency.currencyCode">
                <i class="flag" :class="currency.countryCode.toLowerCase()"></i>{{currency.currencyCode}} ({{currency.currencyName}})
              </option>
          </select>
          </div>
        </div>
        <div class="field two wide">
          <button class="ui icon fluid teal button" @click="exchangeCurrencies">
            <i class="exchange icon"></i>
          </button>
        </div>
        <div class="field seven wide">
          <div>
          <select class="ui fluid search selection dropdown">
              <option class="item" v-for="currency in currencies" :data-value="currency.currencyCode">
                <i class="flag" :class="currency.countryCode.toLowerCase()"></i>{{currency.currencyCode}} ({{currency.currencyName}})
              </option>
            </select>
          </div>
          </div>
        </div>
      </div>
      <div class="fields inline">
        <div class="field eight wide">
          <div class="ui big input">
            <input type="number" placeholder="1">
          </div>
        </div>
        <div class="field six wide">
          <button class="ui big teal fluid button right floated" @click="changeBase(model.fromCurrency)">
            Convert
          </button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'converter',
  props: ['currencies', 'base'],
  methods: {
    exchangeCurrencies: function () {
      this.model = Object.assign({}, { fromCurrency: this.model.toCurrency, toCurrency: this.model.fromCurrency })
      /* eslint-disable no-undef */
      jQuery('#toCurrency').dropdown('set value', this.model.toCurrency)
      /* eslint-disable no-undef */
      jQuery('#fromCurrency').dropdown('set value', this.model.fromCurrency)
    },
    changeBase: function (base) {
      this.$emit('changeBase', base)
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
