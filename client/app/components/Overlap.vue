<template>
    <div id="overlap-content">
        <div id="pheno-overlap">
            <h1 class="region-title">Phenotype Overlap</h1>
            <h2>Exact Match</h2>
            <p v-for="phen in overlapPhenotypes" :key="phen">
                {{ phen }}
            </p>
            <h2>Related</h2>
        </div>
        <div id="gene-overlap">
            <h1 class="region-title">Gene Overlap</h1>
            <p v-for="gene in overlapGenes" :key="gene">
                {{ gene }}
            </p>
        </div>
    </div>
</template>

<style scoped>
    #overlap-content {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    #pheno-overlap {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
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