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
            this.renderGraph(false);
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

            renderGraph: function(alreadyCreated) {
                let el = d3.select("#graph").node().getBoundingClientRect();
                let graphHeight = el.height;
                let graphWidth = el.width;
                if(!alreadyCreated) {
                    var svg = d3.select("#graph")
                    .append("svg")
                    .attr("width", graphWidth)
                    .attr("height", graphHeight)
                    .attr("id", "main-svg");
                }
                else {
                    d3.selectAll("svg > *").remove();
                    var svg = d3.select("#main-svg");
                }

                let sinOfFortyFive = 0.707106781

                let circMaxRadius = 0;

                if (graphHeight < graphWidth) {
                    circMaxRadius = (graphHeight - 100) / 2;
                }
                else {
                    circMaxRadius = (graphWidth - 100) / 2;
                }

                var nPatients = this.comparisonPatients.filter((item, i) => i<this.maxN);
                if (nPatients.length == 1) {
                    var maxRad = nPatients.at(0);
                    var minRad = nPatients.at(0);
                }
                else if (nPatients.length == 0) {
                    var maxRad = 0;
                    var minRad = 0;
                }
                else {
                    var maxRad = nPatients.reduce(function(prev, current) {
                        return (prev.sim_score < current.sim_score) ? prev : current
                    })
                    var minRad = nPatients.reduce(function(prev, current) {
                        return (prev.sim_score > current.sim_score) ? prev : current
                    })
                }
                maxRad = maxRad.sim_score;
                minRad = minRad.sim_score + 0.1;
                
                for (let i = 0; i < this.maxN; i++) {
                    var val = this.comparisonPatients.at(i).sim_score - minRad;
                    val = val / (maxRad - minRad);
                    let curRadius = circMaxRadius * val;
                    let transformWidth = (sinOfFortyFive * curRadius) + 100;
                    let transformHeight = graphHeight - (sinOfFortyFive * curRadius) - 100;
                    svg.append("path")
                    .attr("transform", "translate(" + transformWidth + ", " + transformHeight+ ")")
                    .attr("d", d3.arc() ({
                        innerRadius: curRadius,
                        outerRadius: curRadius + 1,
                        startAngle: 0,
                        endAngle: Math.PI * 2
                    }));
                    var circ = svg.append("circle")
                    .attr("id", "circ" + i)
                    .attr("cx", (transformWidth + (sinOfFortyFive * curRadius)))
                    .attr("cy", (transformHeight - (sinOfFortyFive * curRadius)))
                    .attr("r", 10)
                    .on("mouseover", data => {
                            var id = data.currentTarget.id;
                            svg.select("#" + id).style("fill", "white").style("stroke", "#bb91f3");
                    })
                    .on("mouseout", data => {
                            var id = data.currentTarget.id;
                            svg.select("#" + id).style("fill", "black").style("stroke", "transparent");
                    })
                    .on("click", data => {
                        var id = data.currentTarget.id;
                        var iid = id.substr(-1);
                        var svg = d3.select("#graph").select("#main-svg");
                        svg.selectAll("circle").style("fill", "black").style("stroke", " transparent")
                        .on("mouseover", data => {
                            var id = data.currentTarget.id;
                            svg.select("#" + id).style("fill", "white").style("stroke", "#bb91f3");
                        }).on("mouseout", data => {
                            var id = data.currentTarget.id;
                            svg.select("#" + id).style("fill", "black").style("stroke", "transparent");
                        });
                        svg.select("#" + id).style("fill", "#bb91f3")
                        .on("mouseout", data => {
                            var id = data.currentTarget.id;
                            svg.select("#" + id).style("fill", "#bb91f3").style("stroke", "transparent");
                        });
                        this.sPatientCallback(this.comparisonPatients.at((parseInt(iid))));
                    });
                    if (this.currentPatientID == this.comparisonPatients.at(i).ID) {
                        circ.style("fill", "#bb91f3")
                        .on("mouseout", data => {
                            var id = data.currentTarget.id;
                            svg.select("#" + id).style("fill", "#bb91f3").style("stroke", "transparent");
                        });
                    }
                }
            }
        },

        watch: {
            minScore(newVal, oldVal) {
                this.displayPatients = this.filterPatients(this.comparisonPatients, newVal, this.maxN);
                this.renderGraph(true);
            },

            maxN(newVal, oldVal) {
                this.displayPatients = this.filterPatients(this.comparisonPatients, this.minScore, newVal);
                this.renderGraph(true);
            }
        }
    }

</script>