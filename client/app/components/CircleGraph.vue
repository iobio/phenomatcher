<template>
    <p v-for="patient in displayPatients" :key="patient" v-on:click="sPatientCallback(patient)">
        {{ patient.ID }} {{ patient.sim_score }}
    </p>
    <p>{{ minScore }}</p>
    <p>{{ displayPatients.length }}</p>
</template>

<style>

</style>

<script>

    export default {
        name: "circle-graph",


        props: {
            comparisonPatients: null,
            minScore: 0,
            maxN: 100,
            nSliderCall: null,
            sPatientCallback: null
        },

        data() {
            return {
                displayPatients: this.filterPatients(this.comparisonPatients, this.minScore, this.maxN),
                phenoSelected: false
            }
        },

        methods: {
            filterPatients: function(currentPatients, minScore, maxN) {
                let filteredPatients = [];

                currentPatients = currentPatients.sort((a,b) => b.sim_score - a.sim_score);

                for (let i = 0; i < currentPatients.length; i++) {
                    if (currentPatients.at(i).sim_score >= minScore) {
                        filteredPatients.push(currentPatients.at(i));
                    }
                }

                if (filteredPatients.length > maxN) {
                    if (maxN === 1) {
                        filteredPatients = [filteredPatients.at(0)];
                    }
                    else if (maxN === 0) {
                        filteredPatients = [];
                    }
                    else {
                        for (let i = filteredPatients.length; i > maxN; i--) {
                            filteredPatients.pop()
                        }
                    }
                }
                else if (filteredPatients.length < maxN) {
                    maxN = filteredPatients.length;
                    this.nSliderCall(maxN);
                }


                return filteredPatients;
            }
        },

        watch: {
            minScore(newVal, oldVal) {
                this.displayPatients = this.filterPatients(this.comparisonPatients, newVal, this.maxN);
            },

            maxN(newVal, oldVal) {
                this.displayPatients = this.filterPatients(this.comparisonPatients, this.minScore, newVal);
            }
        }
    }

</script>