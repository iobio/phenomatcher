<script setup>
import { RouterLink, RouterView } from 'vue-router';
import VisBar from './components/VisBar.vue';
import HPOAnnotation from './components/HPOAnnotation.vue';
import PatientSummary from './components/PatientSummary.vue';
import Overlap from './components/Overlap.vue';
import MainGraph from './components/MainGraph.vue';
import AppHeader from './components/AppHeader.vue';
import { onMounted } from 'vue';
</script>

<template>
  
  <div id="main-content">
    <div id="left-bar">
        <VisBar :currentPhenotypes="currentPhenotypes" />
    </div>
    <div id="main-panel">
        <div id="main-vis">
            <div id="main-anno">
                <HPOAnnotation />
            </div>
            <div id="main-graph">
                <MainGraph />
            </div>
        </div>
        <div id="main-desc">
            <div id="main-summary">
                <PatientSummary />
            </div>
            <div id="main-overlap">
                <Overlap />
            </div>
        </div>
    </div>
  </div>

</template>

<style scoped>
* {
    border: 1px solid black;
}

#main-content {
    height:100vh;
    width:100vw;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
}

#left-bar {
    display: flex;
    width: 20%;
    flex-direction: column;
}

#main-panel {
    width: 80%;
    display: flex;
    flex-direction: column;
}

#main-vis {
    height: 50%;
    display: flex;
    flex-direction: row;
}

#main-anno {
    width: 20%;
}

#main-graph {
    width: 80%;
}

#main-desc {
    height: 50%;
    display: flex;
    flex-direction: row;
}

#main-summary {
    width: 30%;
}

#main-overlap {
    width: 70%;
}
</style>

<script>
    import phenoData from '../../data/fake_person.json'

    export default {
        name: 'main-vue',

        data() {
            return { currentPhenotypes: phenoData.logged_user.phenotypes };
        }
    };
</script>
