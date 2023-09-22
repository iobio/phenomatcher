<template>
    <v-app-bar id="header-bar" density="compact">
        <v-app-bar-title style="width: 300px" class="align-center">
        <span class="home-page-link">pheno.iobio</span>
      </v-app-bar-title>
    </v-app-bar>
</template>

<style>
    #header-bar {
        font-family: sans-serif;
        width: 100%;
        font-weight: 300;
        font-size: 26px;
        background-color: #bb91f3;
    }

    .home-page-link:hover {
        text-decoration: underline;
    }

    .home-page-link{
        margin-left: 2%;
        color: white;
        font-weight: 300;
        font-size: 26px;
    }
</style>

<script>
    export default {
        name: 'app-header',
        data() {
            return {}
        },
        methods: {

        }
    }
</script>