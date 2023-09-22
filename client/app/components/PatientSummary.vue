<template>
    <v-card raised="True" id="patient-summary-content">
        <div id="patient-summary-data">
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
    </v-card>
</template>

<style scoped>
    #patient-summary-content {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    #patient-summary-data {
        margin-left: 5%;
        margin-top: 2%;
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