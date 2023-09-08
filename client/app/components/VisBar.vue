<template>
    <div id="bar-content">
        <div id="phen-var">
            <div id="phen-var-titles">
                <h1 v-on:click="phenoSelected=true" :style="phenoSelected ? { 'text-decoration':'underline', 'text-decoration-color':'#bb91f3'} : {'text-decoration':'none'}">Phenotypes</h1>
                <h1 v-on:click="phenoSelected=false" :style="phenoSelected ? { 'text-decoration':'none'} : {'text-decoration':'underline', 'text-decoration-color':'#bb91f3'}">Variants</h1>
            </div>
            <p id="term-list-title">HPO Term</p>
            <div id="term-list">
                <p v-for="phen in currentPhenotypes" :key="phen" v-if="phenoSelected">
                    {{ phen }}
                </p>
                <p v-for="gene in currentGenes" :key="gene" v-if="!phenoSelected">
                    {{ gene }}
                </p>
            </div>
        </div>
        <div id="bar-key">
            <h1>Key</h1>
            <div id="query-patient-key">
                <p>Query Patient</p>
            </div>
            <div id="selected-patient-key">
                <p>Selected Patient</p>
            </div>
            <div id="diagnosed-key">
                <p>Diagnosed</p>
            </div>
            <div id="undiagnosed-key">
                <p>Undiagnosed</p>
            </div>
            <div id="gene-overlap-key">
                <p>Gene Overlap</p>
            </div>
            <div id="no-gene-overlap-key">
                <p>No Gene Overlap</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #bar-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #phen-var-titles {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    #phen-var {
        display: flex;
        flex-direction: column;
    }

    #term-list {
        margin-left: 15%;
    }

    #term-list-title {
        font-size: 25px;
        justify-self: center;
        align-self: center;
    }

    #bar-key {
        display: flex;
        flex-direction: column;
        margin-left: 5%;
    }

</style>

<script>
    export default {
        name: 'vis-bar',

        props: {
            currentPhenotypes: null,
            currentGenes: null
        },

        data() {
            return {
                phenoSelected: true
            }
        }
    }
</script>