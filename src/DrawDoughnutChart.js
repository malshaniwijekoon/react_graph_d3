import * as d3 from "d3";

const DrawDoughnutChart = (element, data) => {
  const colors = ["#d9e3f0", "#8bc34a"];
  const boxSize = 1000;
  const width = 640; // outer width, in pixels
  const height = 400;
  const innerRadius = 100; // inner radius of pie, in pixels (non-zero for donut)
  const outerRadius = Math.min(width, height) / 2; // outer radius of pie, in pixels
  
  d3.select(element).select("svg").remove(); // Remove the old svg

  // Create new svg
  const svg = d3
    .select(element)
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("height", "100%")
    .attr("width",  "100%")
    .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
    .append("g")
    .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);

//add first line of text in middle  of doughnut
  svg.append("text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("style","font-family")
    .attr("font-size","20")
    .attr("fill","#000000")
    .attr("dy", "0em")
    .text("60% ");

//add second line of text in middle of doughnut
  svg.append("text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("style","font-family")
    .attr("font-size","20")
    .attr("fill","#000000")
    .attr("dy", "1em") // how far apart it shows up
    .text("complete")   

  const arcGenerator = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  const pieGenerator = d3.pie().value((d) => d.value);

  const arcs = svg.selectAll().data(pieGenerator(data)).enter();
  arcs
    .append("path")
    .attr("d", arcGenerator)
    .style("fill", (d, i) => colors[i % data.length]);

//add label inside doughnut chart
  arcs
    .append("text")
    .attr("text-anchor", "middle")
    .text((d) => `${d.data.value}%`)
    .style("fill","#000000")
    .style("font-size","30px")
    .attr("transform", (d) => {
      const[x,y] = arcGenerator.centroid(d);
      return `translate(${x}, ${y})`;
    });

  const div = d3.select("body").append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 0);    
};  

export default DrawDoughnutChart;
