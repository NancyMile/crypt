<script setup>
  import { ref, onMounted, reactive, computed } from 'vue'
  import Alert from './components/Alert.vue'

  const coins = ref([
        { code: 'USD', text: 'USD'},
        { code: 'EUR', text: 'Euro'},
        { code: 'GBP', text: 'British Pound'},
  ])

  const criptoCoins = ref([])

  //quote will contain the user selection
  const quote = reactive({
    coin: '',
    criptoCoin: ''
  })

  const price = ref({})

  const error = ref('')

  onMounted(() => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    fetch(url)
      .then(response => response.json())
      .then(({Data}) => criptoCoins.value = Data)
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
    getQuote()
  }

  const getQuote = async () => {
    const { coin, criptoCoin } = quote
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoCoin}&tsyms=${coin}`
    //console.log(url)
    const response = await fetch(url)
    const data = await response.json()
    //console.log(data.DISPLAY[criptoCoin][coin])
    price.value = data.DISPLAY[criptoCoin][coin]
  }

  const displayResult = computed(() => {
     return Object.values(price.value).length > 0  //check if the object is empty
  })

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