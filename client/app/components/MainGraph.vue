
<template>
    <div id="main-graph-content">
        <div id="graph" style="width: 75%">graph</div>
        <div id="graph-sliders" style="width: 25%; margin-right: 2%; margin-top: 5%;">
            <VueSlider v-model="scoreSlider" :interval="0.1" :min="0" :max="1"/>
            <VueSlider v-model="nSlider" :interval="1"/>
        </div>
    </div>
</template>

<style>
    #main-graph-content {
        display: flex;
        flex-direction: row;
        height: 100%;
    }
</style>



<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'

    export default {
        components: {
            VueSlider
        },

        data() {
            return {
                scoreSlider: 0,
                nSlider: 0
            }
        }
    }
</script>
