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
  
  <div id="main-page">
    <AppHeader />
  <div class="main-section" id="main-content">
    <div id="left-bar">
        <VisBar :currentPhenotypes="currentPhenotypes" :currentGenes="currentGenes" />
    </div>
    <div class="main-section" id="main-panel">
        <div class="main-section" id="main-vis">
            <div class="main-section" id="main-anno">
                <HPOAnnotation :currentSelectedPatientGenes="overlappingGenes"/>
            </div>
            <div class="main-section" id="main-graph">
                <MainGraph :comparisonPatients="comparisonPatients"
                           :patientCallback="selectedPatientCallback"/>
            </div>
        </div>
        <div class="main-section" id="main-desc">
            <div class="main-section" id="main-summary">
                <PatientSummary :currentSelectedPatientTerms="overlappingPhenotypes" 
                                :currentSelectedPatientClinDiagnosis="selectedPatient.Clin_Diagnosis"
                                :currentSelectedPatientGeneDiagnosis="selectedPatient.Gene_Diagnosis"/>
            </div>
            <div class="main-section" id="main-overlap">
                <Overlap :overlapPhenotypes="overlappingPhenotypes"
                         :overlapGenes="overlappingGenes"/>
            </div>
        </div>
    </div>
  </div>
  </div>

</template>

<style>
* {
    font-family: sans-serif;
}

.main-section {
    border: 1px gray solid;
}

#main-page {
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
}

#main-content {
    width: 100%;
    height: 95%;
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

.region-title {
    text-decoration: underline;
    text-decoration-color: #bb91f3;
}
</style>

<script>
    import phenoData from '../../data/fake_person.json'
    import otherPatientData from '../../data/fake_matrix.json'
    import HPOMatchingData from '../../data/genes_to_phenotype.txt?raw'

    export default {
        name: 'main-vue',

        data() {
            return { 
                currentUserTerms: phenoData.logged_user.Terms,
                selectedPatient: otherPatientData.users[0],
                comparisonPatients: otherPatientData.users,
                currentPhenotypes: null,
                currentGenes: null,
                overlappingPhenotypes: null,
                overlappingGenes: null
            };
        },

        mounted() {
            var m = this.matchTermsToTypes(HPOMatchingData);
            var t = this.phenotypeAndGeneGet(m, phenoData.logged_user.Terms);
            this.currentPhenotypes = t[0];
            this.currentGenes = t[1];
            var newMatching = this.findOverlappedTerms(phenoData.logged_user.Terms, otherPatientData.users[0].Terms);
            var t = this.phenotypeAndGeneGet(m, newMatching);
            this.overlappingPhenotypes = t[0];
            this.overlappingGenes = t[1];
        },

        methods: {
            matchTermsToTypes: function(data) {
                var split = data.split('\n').map(function (el) { return el.split(/\t+/); });
                var head = split.shift();
                var obj = split.map(function (el) {
                    var obj = {};
                    for (var i = 0, l = el.length; i < l; i++) {
                        obj[head[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
                    }
                    return obj;
                });

                return obj;
            },

            phenotypeAndGeneGet: function(matchers, matching) {
                let pTerms = []
                let gTerms = []
                for (let i = 0; i < matching.length; i++) {
                    for (let j = 0; j < matchers.length; j++) {
                        if (matching.at(i) == matchers.at(j).hpo_id) {
                            pTerms.push(matchers.at(j).hpo_name);
                            gTerms.push(matchers.at(j).gene_symbol);
                            break;
                        }
                    }
                }
                return [pTerms, gTerms];
            },

            findOverlappedTerms: function(setOne, setTwo) {
                let overlappers = []

                for (let i = 0; i < setOne.length; i++) {
                    for (let j = 0; j < setTwo.length; j++) {
                        if (setOne.at(i) == setTwo.at(j)) {
                            overlappers.push(setOne.at(i));
                            break;
                        }
                    }
                }

                return overlappers;
            },

            selectedPatientCallback: function(newPatient) {
                this.selectedPatient = newPatient;
                var o = this.findOverlappedTerms(phenoData.logged_user.Terms, newPatient.Terms);
                var t = this.phenotypeAndGeneGet(this.matchTermsToTypes(HPOMatchingData), o);
                this.overlappingPhenotypes = t[0];
                this.overlappingGenes = t[1];
            }


        },

        watch: {
            selectedPatient(newVal, oldVal) {
                //var t = this.findOverlappedTerms(phenoData.logged_user.Terms, newVal.Terms);
                //this.overlappingPhenotypes = t[0];
                //this.overlappingGenes = t[1];
            }
        }
    };
</script>
