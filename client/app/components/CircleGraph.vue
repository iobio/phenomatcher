<template>
    <div id="graph"></div>
</template>

<style>

</style>

<script>

    export default {
        name: "circle-graph",


        props: {
            currentPatientID: null,
            comparisonPatients: null,
            minScore: 0,
            maxN: 100,
            nSliderCall: null,
            sPatientCallback: null
        },

        mounted() {
            this.renderGraph();
        },

        data() {
            return {
                displayPatients: this.filterPatients(this.comparisonPatients, this.minScore, this.maxN),
                phenoSelected: false
            }
        },

        methods: {
            filterPatients: function(currentPatients, minScore, maxN) {
                let filteredPatients = [];

                currentPatients = currentPatients.sort((a,b) => b.sim_score - a.sim_score);

                for (let i = 0; i < currentPatients.length; i++) {
                    if (currentPatients.at(i).sim_score >= minScore) {
                        filteredPatients.push(currentPatients.at(i));
                    }
                }

                if (filteredPatients.length > maxN) {
                    if (maxN === 1) {
                        filteredPatients = [filteredPatients.at(0)];
                    }
                    else if (maxN === 0) {
                        filteredPatients = [];
                    }
                    else {
                        for (let i = filteredPatients.length; i > maxN; i--) {
                            filteredPatients.pop()
                        }
                    }
                }
                else if (filteredPatients.length < maxN) {
                    maxN = filteredPatients.length;
                    this.nSliderCall(maxN);
                }


                return filteredPatients;
            },

            renderGraph: function() {
                let el = d3.select("#graph").node().getBoundingClientRect();
                let graphHeight = el.height;
                let graphWidth = el.width;
                var svg = d3.select("#graph")
                .append("svg")
                .attr("width", graphWidth)
                .attr("height", graphHeight)
                .attr("id", "main-svg");

                let circMaxRadius = 0;

                if (graphHeight < graphWidth) {
                    circMaxRadius = graphHeight / 2;
                }
                else {
                    circMaxRadius = graphWidth / 2;
                }
                
                let transformHeight = graphHeight / 2;
                let transformWidth = graphWidth / 2;
                for (let i = 0; i < this.maxN; i++) {
                    var val = 1 - this.comparisonPatients.at(i).sim_score;
                    svg.append("path")
                    .attr("transform", "translate(" + transformWidth + ", " + transformHeight + ")")
                    .attr("d", d3.arc() ({
                        innerRadius: circMaxRadius * val,
                        outerRadius: (circMaxRadius * val) + 1,
                        startAngle: 0,
                        endAngle: Math.PI * 2
                    }));
                    var circ = svg.append("circle")
                    .attr("id", "circ" + i)
                    .attr("cx", transformWidth + (transformWidth * val))
                    .attr("cy", transformHeight)
                    .attr("r", 5)
                    .on("click", data => {
                        var id = data.currentTarget.id;
                        var iid = id.substr(-1);
                        var svg = d3.select("#graph").select("#main-svg");
                        svg.selectAll("circle").style("fill", "black");
                        svg.select("#" + id).style("fill", "red");
                        this.sPatientCallback(this.comparisonPatients.at((parseInt(iid))));
                    });
                    if (this.currentPatientID == this.comparisonPatients.at(i).ID) {
                        circ.style("fill", "red");
                    }
                }
            },

            updateGraph: function() {
                let graphHeight = 400;
                let graphWidth = 400;

                let transformHeight = graphHeight / 2;
                let transformWidth = graphWidth / 2;
                d3.selectAll("svg > *").remove();
                var svg = d3.select("#graph").select("#main-svg");


                for (let i = 0; i < this.maxN; i++) {
                    var val = 1 - this.comparisonPatients.at(i).sim_score;
                    svg.append("path")
                    .attr("transform", "translate(" + transformHeight + ", " + transformWidth + ")")
                    .attr("d", d3.arc() ({
                        innerRadius: transformHeight * val,
                        outerRadius: (transformHeight * val) + 1,
                        startAngle: 0,
                        endAngle: Math.PI * 2
                    }));
                    var circ = svg.append("circle")
                    .attr("id", "circ" + i)
                    .attr("cx", transformWidth + (transformWidth * val))
                    .attr("cy", transformHeight)
                    .attr("r", 5)
                    .on("click", data => {
                        var id = data.currentTarget.id;
                        var iid = id.substr(-1);
                        var svg = d3.select("#graph").select("#main-svg");
                        svg.selectAll("circle").style("fill", "black");
                        svg.select("#" + id).style("fill", "red");
                        this.sPatientCallback(this.comparisonPatients.at((parseInt(iid))));
                    });
                    if (this.currentPatientID == this.comparisonPatients.at(i).ID) {
                        circ.style("fill", "red");
                    }
                }
            }
        },

        watch: {
            minScore(newVal, oldVal) {
                this.displayPatients = this.filterPatients(this.comparisonPatients, newVal, this.maxN);
            },

            maxN(newVal, oldVal) {
                this.displayPatients = this.filterPatients(this.comparisonPatients, this.minScore, newVal);
                this.updateGraph();
            }
        }
    }

</script>