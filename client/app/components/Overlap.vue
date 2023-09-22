<template>
    <v-card id="overlap-content">
        <div id="pheno-overlap">
            <h1 class="region-title">Phenotype Overlap</h1>
            <h2>Exact Match</h2>
            <p v-for="phen in overlapPhenotypes" :key="phen">
                {{ phen }}
            </p>
        </div>
        <div id="gene-overlap">
            <h1 class="region-title">Gene Overlap</h1>
            <p v-for="gene in overlapGenes" :key="gene">
                {{ gene }}
            </p>
        </div>
    </v-card>
</template>

<style scoped>
    #overlap-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: space-between;
    }

    #pheno-overlap {
        display: flex;
        flex-direction: column;
    }
</style>

<script>

    export default {
        name: "overlap",

        props: {
            overlapPhenotypes: null,
            overlapGenes: null
        }
    }
</script>