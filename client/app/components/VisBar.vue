<template>
    <v-card id="bar-content">
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

    </v-card>
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