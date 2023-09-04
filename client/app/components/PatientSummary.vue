<template>
    <div id="patient-summary-content">
        <h1 class="region-title">Patient Summary</h1>
        <h1>Phenotypes</h1>
        <p v-for="term in currentSelectedPatientTerms" :key="term">
            {{ term }}
        </p>
        <h1>Diagnosis</h1>
        <p>{{ currentSelectedPatientClinDiagnosis }}</p>
        <p>Gene: {{ currentSelectedPatientGeneDiagnosis }}</p>
    </div>
</template>

<style scoped>
    #patient-summary-content {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
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