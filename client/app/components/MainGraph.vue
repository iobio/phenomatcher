
<template>
    <div id="main-graph-content">
        <div id="graph" style="width: 75%">
            <CircleGraph :comparisonPatients="comparisonPatients" 
                         :minScore="scoreSlider" 
                         :maxN="nSlider"
                         :nSliderCall="nSliderCallback"
                         :sPatientCallback="patientCallback"/>
        </div>
        <div id="graph-sliders" style="width: 40%; margin-right: 2%; margin-top: 5%;">
            <div class="graph-slider">
                <p class="slider-label">Score</p>
                <VueSlider style="width: 60%" v-model="scoreSlider" :interval="0.1" :min="0" :max="1"/>
            </div>
            <div class="graph-slider">
                <p class="slider-label">N</p>
                <VueSlider style="width: 60%" theme v-model="nSlider" :interval="1" :min="0" :max="comparisonPatients.length"/>
            </div>
        </div>
    </div>
</template>

<style>
    #main-graph-content {
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    .graph-slider {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .slider-label {
        width: 5%;
        margin-right: 2%;
    }

</style>

<style lang="scss">
$themeColor: #BB91F3;
@import 'vue-slider-component/lib/theme/default.scss';
</style>



<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'
    import CircleGraph from './CircleGraph.vue'

    export default {
        components: {
            VueSlider,
            CircleGraph
        },

        props: {
            comparisonPatients: null,
            patientCallback: null
        },

        data() {
            return {
                scoreSlider: 0,
                nSlider: this.comparisonPatients.length
            }
        },

        methods: {
            nSliderCallback(newVal) {
                this.nSlider = newVal;
            }
        }
    }
</script>
