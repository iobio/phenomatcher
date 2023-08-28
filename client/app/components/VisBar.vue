<template>
    <div id="bar-content">
        <div id="phen-var">
            <div id="phen-var-titles">
                <h1>Phenotypes</h1>
                <h1>Variants</h1>
            </div>
            <p v-for="phen in currentPhenotypes" :key="phen">
                {{ phen }}
            </p>
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
    }

</style>

<script>
    export default {
        name: 'vis-bar',

        props: {
            currentPhenotypes: null
        },

        data() {
            return {

            }
        }
    }
</script>