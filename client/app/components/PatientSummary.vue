<template>
    <div id="patient-summary-content">
        <h1 class="region-title">Patient Summary</h1>
        <h2>Phenotypes</h2>
        <p v-for="term in currentSelectedPatientTerms" :key="term">
            {{ term }}
        </p>
        <h2>Diagnosis</h2>
        <p>{{ currentSelectedPatientClinDiagnosis }}</p>
        <div id="gene-diagnosis-summary">
            <p>Gene:</p>
            <p style="font-weight: bold; margin-left: 5px;">{{ currentSelectedPatientGeneDiagnosis }}</p>
        </div>
    </div>
</template>

<style scoped>
    #patient-summary-content {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left: 5%;
    }

    #gene-diagnosis-summary {
        display: flex;
        flex-direction: row;
    }
</style>

<script>
    export default {
        name: "patient-summary",

        mounted() {

        },

        props: {
            currentSelectedPatientTerms: null,
            currentSelectedPatientGeneDiagnosis: null,
            currentSelectedPatientClinDiagnosis: null
        },
    }

</script>