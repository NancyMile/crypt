import { ref, onMounted, computed } from 'vue'

export default function useCrypto() {
    
    
    const criptoCoins = ref([])

    const coins = ref([
        { code: 'USD', text: 'USD'},
        { code: 'EUR', text: 'Euro'},
        { code: 'GBP', text: 'British Pound'},
    ])
    
    const error = ref('')
    const price = ref({})
    const loading = ref(false)
    
    onMounted(() => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        fetch(url)
          .then(response => response.json())
          .then(({Data}) => criptoCoins.value = Data)
    })
    
    const getQuote = async (quote) => {
        loading.value = true
        price.value == {}
        try {
            const { coin, criptoCoin } = quote
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoCoin}&tsyms=${coin}`
            //console.log(url)
            const response = await fetch(url)
            const data = await response.json()
            //console.log(data.DISPLAY[criptoCoin][coin])
            price.value = data.DISPLAY[criptoCoin][coin]
            loading.value = false
        } catch (error) {
            console.log(error)
        }
    }

    const displayResult = computed(() => {
        return Object.values(price.value).length > 0  //check if the object is empty
     })

    return {
        coins,
        criptoCoins,
        price,
        loading,
        error,
        getQuote,
        displayResult
    }
}