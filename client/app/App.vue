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
  <v-app>
  <v-content id="main-page">
    <AppHeader />
  <div class="main-section" id="main-content">
    <div id="left-bar">
        <VisBar :currentPhenotypes="currentPhenotypes" :currentGenes="currentGenes" />
    </div>
    <div class="main-section" id="main-panel">
        <div class="main-section" id="main-vis">
            <MainGraph :comparisonPatients="comparisonPatients"
                       :patientCallback="selectedPatientCallback"
                       :curScore="selectedPatient.sim_score"
                       :curPatientID="selectedPatient.ID"/>
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
  </v-content>
</v-app>

</template>

<style>
* {
    font-family: sans-serif;
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
    margin-top: 4%;
    margin-bottom: 1%;
    height: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: space-evenly;
}

#left-bar {
    display: flex;
    width: 21%;
    height: 100%;
    flex-direction: column;
    /*border-right: 5px solid gray;*/
}

#main-panel {
    width: 77%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-evenly;
}

#main-vis {
    height: 58%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: space-evenly;
    /*border-bottom: 5px solid gray;*/
}

#main-graph {
    width: 100%;
}

#main-desc {
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: space-evenly;
}

#main-summary {
    width: 33%;
    /*border-right: 5px solid gray;*/
}

#main-overlap {
    width: 65%;
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
    import csv from '../../data/651_Dx_333_UDx_Trios_ID_Terms_Diagnoses_8.29.23.csv'
    import scores from '../../data/651_Dx_333_UDx_Trios_jacccard_similarity_table_8.29.23.csv'

    export default {
        name: 'main-vue',

        data() {
            return { 
                currentUserTerms: phenoData.logged_user.Terms,
                selectedPatient: otherPatientData.users.at(0),
                comparisonPatients: otherPatientData.users,
                currentPhenotypes: null,
                currentGenes: null,
                overlappingPhenotypes: null,
                overlappingGenes: null
            };
        },

        mounted() {
            //var patients = csv;
            //var completePatients = this.matchPatientsToScores(patients);
            //this.selectedPatient = completePatients.at(1);
            //this.comparisonPatients = completePatients
            var m = this.matchTermsToTypes(HPOMatchingData);
            //var t = this.phenotypeAndGeneGet(m, csv.at(0).Terms);
            var t = this.phenotypeAndGeneGet(m, otherPatientData.users.at(0).Terms)
            this.currentPhenotypes = t[0];
            this.currentGenes = t[1];
            //var newMatching = this.findOverlappedTerms(csv.at(0).Terms, this.selectedPatient.Terms);
            var newMatching = this.findOverlappedTerms(phenoData.logged_user.Terms, this.selectedPatient.Terms)
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
            },

            matchPatientsToScores: function(curPatients) {
                var scoreChart = scores;
                for (let i = 1; i < curPatients.length; i++) {
                    var thisID = curPatients.at(i).ID;
                    curPatients.at(i).sim_score = scoreChart.at(0)[thisID];
                }
                return curPatients;
            }


        }
    };
</script>
