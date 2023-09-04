<template>
    <div id="bar-content">
        <div id="phen-var">
            <div id="phen-var-titles">
                <h1 v-on:click="phenoSelected=true" :style="phenoSelected ? { 'text-decoration':'underline', 'text-decoration-color':'#bb91f3'} : {'text-decoration':'none'}">Phenotypes</h1>
                <h1 v-on:click="phenoSelected=false" :style="phenoSelected ? { 'text-decoration':'none'} : {'text-decoration':'underline', 'text-decoration-color':'#bb91f3'}">Variants</h1>
            </div>
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
            <p>Query Patient</p>
            <p>Selected Patient</p>
            <p>Diagnosed</p>
            <p>Undiagnosed</p>
            <p>Gene Overlap</p>
            <p>No Gene Overlap</p>
        </div>
    </div>
</template>

<style scoped>
    #bar-content {
        display: flex;
        flex-direction: column;
    }

    #phen-var-titles {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    #term-list {
        margin-left: 15%;
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