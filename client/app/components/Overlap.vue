<template>
    <div id="overlap-content">
        <div id="pheno-overlap">
            <h1>Phenotype Overlap</h1>
            <h2>Exact Match</h2>
            <h2>Related</h2>
        </div>
        <div id="gene-overlap">
            <h1>Gene Overlap</h1>
        </div>
    </div>
</template>

<style scoped>
    #overlap-content {
        display: flex;
        flex-direction: row;
    }

    #pheno-overlap {
        display: flex;
        flex-direction: column;
    }
</style>