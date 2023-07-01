<script setup>
  import { ref, onMounted } from 'vue';

  const coins = ref([
        { code: 'USD', text: 'USD'},
        { code: 'EUR', text: 'Euro'},
        { code: 'GBP', text: 'British Pound'},
  ])

  const criptoCoins = ref([])

  onMounted(() => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    fetch(url)
      .then(response => response.json())
      .then(({Data}) => {
        //console.log(Data) //data it comes as 'Data'
        criptoCoins.value = Data
      })
  })
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Quoter <span> Cripto currency</span></h1>
    <div class="contenido">
      <form class="formulario">
        <div class="campo">
          <label for="coin">Coin:</label>
          <select id="coin">
            <option value="">-- Select --</option>
            <option
              v-for="coin in coins"
              :value="coin.code"
            >{{coin.text}}</option>
          </select>
        </div>

        <div class="campo">
          <label for="criptoCoin">Cripto Coin:</label>
          <select id="criptoCoin">
            <option value="">-- Select --</option>
            <option
              v-for="criptoCoin in criptoCoins"
              :value="criptoCoin.CoinInfo.Name"
            >{{criptoCoin.CoinInfo.FullName}}</option>
          </select>
        </div>

        <input type="submit" value="">
      </form>
    </div>
  </div>
  
</template>