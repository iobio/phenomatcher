
<template>
    <v-card raised="true" id="main-graph-content">
            <CircleGraph :currentPatientID="curPatientID"
                         :comparisonPatients="comparisonPatients" 
                         :minScore="scoreSlider" 
                         :maxN="nSlider"
                         :nSliderCall="nSliderCallback"
                         :sPatientCallback="patientCallback"
                         style="height: 100%; width: 75%;"/>
        <div id="graph-sliders">
            <div class="graph-slider">
                <p class="slider-label">Score</p>
                <VueSlider style="width: 60%" v-model="scoreSlider" :interval="0.1" :min="0" :max="1"/>
            </div>
            <div class="graph-slider">
                <p class="slider-label">N</p>
                <VueSlider style="width: 60%" theme v-model="nSlider" :interval="1" :min="0" :max="comparisonPatients.length"/>
            </div>
            <div id="score-display">
                <p>Similarity Score: {{ curScore }}</p>
            </div>
        </div>
    </v-card>
</template>

<style>
    #main-graph-content {
        width: 100%;
        display: flex;
        flex-direction: row;
        height: 100%;
    }

    #graph-sliders {
        width: 30%;
        margin-right: 2%;
        margin-top: 5%;
    }
    .graph-slider {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .slider-label {
        width: 25%;
        margin-right: 2%;
    }
    #score-display {
        height: 50%;
        display: flex;
        align-items: center;
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
            curPatientID: null,
            curScore: null,
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
