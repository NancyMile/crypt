<script setup>
  import { reactive } from 'vue'
  import Alert from './components/Alert.vue'
  import Spinner from './components/Spinner.vue'
  import useCrypto from './composables/useCrypto'

  const { coins, criptoCoins, price, loading,error, getQuote, displayResult } = useCrypto()

  //quote will contain the user selection
  const quote = reactive({
    coin: '',
    criptoCoin: ''
  })

  const quoteCripto = () => {
    //validate that coin and cripto coin has been selected
    if (Object.values(quote).includes('')) {
      //console.log('Please select from both coins')
      error.value = 'Please select from both coins'
      return
    }
    error.value = ''
    //console.log('quoting...')
    getQuote(quote)
  }

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Quoter <span> Cripto currency</span></h1>
    <div class="contenido">
      <Alert v-if="error">
          {{error}}
      </Alert>
      <form
        class="formulario"
        @submit.prevent="quoteCripto"
      >
        <div class="campo">
          <label for="coin">Coin:</label>
          <select
            id="coin"
            v-model="quote.coin"
          >
            <option value="">-- Select --</option>
            <option
              v-for="coin in coins"
              :value="coin.code"
            >{{coin.text}}</option>
          </select>
        </div>

        <div class="campo">
          <label for="criptoCoin">Cripto Coin:</label>
          <select
            id="criptoCoin"
            v-model="quote.criptoCoin"
          >
            <option value="">-- Select --</option>
            <option
              v-for="criptoCoin in criptoCoins"
              :value="criptoCoin.CoinInfo.Name"
            >{{criptoCoin.CoinInfo.FullName}}</option>
          </select>
        </div>

        <input type="submit" value="">
      </form>
      <Spinner v-if="loading"/>
      <div v-if="displayResult" class="contenedor-resultado">
        <h2> Quote Price</h2>
        <div class="resultado">
          <img
            :src="'https://cryptocompare.com/'+ price.IMAGEURL"
            alt="cripto">
            <div>
              <p>
                Price is: <span>{{price.PRICE}}</span>
              </p>
              <p>
                Highest Price: <span>{{price.HIGHDAY}}</span>
              </p>
              <p>
                Lowest Price: <span>{{price.LOWDAY}}</span>
              </p>
              <p>
                Changes: <span>{{price.CHANGEPCT24HOUR}}%</span>
              </p>
              <p>
                Last update: <span>{{price.LASTUPDATE}}</span>
              </p>
            </div>
        </div>
      </div>
    </div>
  </div>
  
</template>