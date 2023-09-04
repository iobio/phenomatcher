<template>
    <h1 class="region-title">HPO Annotations</h1>
    <div id="anno-titles">
        <h1>Gene</h1>
        <h1>Disease</h1>
    </div>
    <p v-for="gene in currentSelectedPatientGenes" :key="gene">
        {{ gene }}
    </p>
</template>

<style>
    #anno-titles {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
</style>

<script>

    export default {
        name: 'hpo-annotation',

        props: {
            currentSelectedPatientGenes: null
        }
    }

</script>