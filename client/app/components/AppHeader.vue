<template>
    <v-app-bar id="header-bar">
        <v-toolbar-title style="width: 300px" class="headline text-uppercase">
        <span class="home-page-link">pheno.iobio</span>
      </v-toolbar-title>
    </v-app-bar>
</template>

<style>
    #header-bar {
        font-family: sans-serif;
        width: 100%;
        height: 5%;
        font-weight: 300;
        font-size: 26px;
        padding-bottom: 2px;
        background-color: #bb91f3;
    }

    .home-page-link:hover {
        text-decoration: underline;
    }

    .home-page-link{
        margin-left: 2%;
        color: white;
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