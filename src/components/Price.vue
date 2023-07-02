<script setup>

    defineProps({
        price: {
            type: Object,
            required: true
        }        
    })
    
</script>
<template>
    <div class="contenedor-resultado">
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
</template>