<script setup>
  import { ref } from 'vue';

  const coins = ref([
        { code: 'USD', text: 'USD'},
        { code: 'EUR', text: 'Euro'},
        { code: 'GBP', text: 'British Pound'},
    ])
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

      </form>

    </div>
  </div>
  
</template>