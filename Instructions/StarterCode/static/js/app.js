function buildCharts(id) {
    d3.json("samples.json")
        .then(function (data) {
            // console.log("test", data)
            //copy new object for filtering
            let d2 = data;
            let filteredData = data.samples.filter(sample => sample.id === id);
            //demo meta data not being populated
            let demog = d2.metadata.filter(meta => meta.id == id);
            // console.log("d2 metadata", d2.metadata)
            // console.log("my id is", id)
            // console.log('demo data is', demog)
            //clear html for next sample
            let pbody = d3.select("#sample-metadata");
            pbody.html('')
            Object.entries(demog[0]).forEach(
                ([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
            );
            // console.log(filteredData[0].otu_ids)
            // console.log(filteredData[0].otu_labels)
            let topTenSV = [filteredData[0].sample_values[0], filteredData[0].sample_values[1], filteredData[0].sample_values[2], filteredData[0].sample_values[3], filteredData[0].sample_values[4], filteredData[0].sample_values[5], filteredData[0].sample_values[6], filteredData[0].sample_values[7], filteredData[0].sample_values[8], filteredData[0].sample_values[9]]
            let topTenOTU = [filteredData[0].otu_ids[0], filteredData[0].otu_ids[1], filteredData[0].otu_ids[2], filteredData[0].otu_ids[3], filteredData[0].otu_ids[4], filteredData[0].otu_ids[5], filteredData[0].otu_ids[6], filteredData[0].otu_ids[7], filteredData[0].otu_ids[8], filteredData[0].otu_ids[9]]
            let topTenOTULabels = [filteredData[0].otu_labels[0], filteredData[0].otu_labels[1], filteredData[0].otu_labels[2], filteredData[0].otu_labels[3], filteredData[0].otu_labels[4], filteredData[0].otu_labels[5], filteredData[0].otu_labels[6], filteredData[0].otu_labels[7], filteredData[0].otu_labels[8], filteredData[0].otu_labels[9]]
            let labelArray = []
            //concat OTU to array for labels
            for (let i = 0; i < 10; i++) {
                labelArray.push("OTU " + filteredData[0].otu_ids[i])
                // console.log("label array ", labelArray)
            }
            // console.log("labels array complete is ", labelArray)
            // console.log("top ten is:", topTenOTU)
            // Create the Trace
            let trace1 = {
                x: topTenSV,
                y: labelArray,
                mode: 'markers',
                marker: { size: 16 },
                text: topTenOTULabels,
                type: 'bar',
                orientation: 'h'
            };
            // console.log("first value is :", filteredData[0].sample_values[0])
            // // Create the data array for our plot
            let data2 = [trace1];
            // // Define our plot layout
            let layout = {
                title: "OTU vs Sample Values",
                xaxis: { title: "Sample Values" },
                yaxis: { title: "OTU IDs" },
                showlegend: false,
                // xaxis: {
                //     tickangle: -45
                //   },
                // yaxis: {
                //     zeroline: false,
                //     gridwidth: 2
                //   },
            };
            // // Plot the chart to a div tag with id "bar-plot"
            Plotly.newPlot("bar", data2, layout, { displayModeBar: true });
            //BUBBLE PLOT 
            let bubbleTrace = {
                x: topTenOTU, //[0, 1, 2, 3, 4, 5, 6],
                y: topTenSV, //[1, 9, 4, 7, 5, 2, 4],
                mode: 'markers',
                marker: {
                    size: topTenSV,
                    color: topTenOTU
                },
                text: topTenOTULabels
            };
            let bubbleData = [bubbleTrace];
            let bubbleLayout = {
                title: 'Marker Size',
                showlegend: false,
                height: 600,
                width: 600
            };
            Plotly.newPlot('bubble', bubbleData, bubbleLayout);
        })
}
//sends new id in everytime drop down changes
function optionChanged(dropDownValue) {
    console.log("onchange dropdown value", dropDownValue)
    buildCharts(dropDownValue)
}
function init() {
    console.log("Initilize page")
    let dropDownBtn = d3.select("#selDataset");
    d3.json("samples.json")
        .then(function (data) {
            console.log("test", data)
            let names = data.names
            names.forEach(name => {
                dropDownBtn.append("option")
                    .text(name)
                    .attr("value", name)
            })
            data.samples.forEach(sv => console.log(sv));
            // for demographics area on load
            let demo = data.metadata.filter(sample => sample.id)[0];
            console.log(demo);
            Object.entries(demo).forEach(
                ([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
            );
            buildCharts(names[0])
        });
}


function buildCharts(id) {
    d3.json("samples.json")
        .then(function (data) {
            // console.log("test", data)
            //copy new object for filtering
            let d2 = data;
            let filteredData = data.samples.filter(sample => sample.id === id);
            //demo meta data not being populated
            let demog = d2.metadata.filter(meta => meta.id == id);
            // console.log("d2 metadata", d2.metadata)
            // console.log("my id is", id)
            // console.log('demo data is', demog)
            //clear html for next sample
            let pbody = d3.select("#sample-metadata");
            pbody.html('')
            Object.entries(demog[0]).forEach(
                ([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
            );
            // console.log(filteredData[0].otu_ids)
            // console.log(filteredData[0].otu_labels)
            let topTenSV = [filteredData[0].sample_values[0], filteredData[0].sample_values[1], filteredData[0].sample_values[2], filteredData[0].sample_values[3], filteredData[0].sample_values[4], filteredData[0].sample_values[5], filteredData[0].sample_values[6], filteredData[0].sample_values[7], filteredData[0].sample_values[8], filteredData[0].sample_values[9]]
            let topTenOTU = [filteredData[0].otu_ids[0], filteredData[0].otu_ids[1], filteredData[0].otu_ids[2], filteredData[0].otu_ids[3], filteredData[0].otu_ids[4], filteredData[0].otu_ids[5], filteredData[0].otu_ids[6], filteredData[0].otu_ids[7], filteredData[0].otu_ids[8], filteredData[0].otu_ids[9]]
            let topTenOTULabels = [filteredData[0].otu_labels[0], filteredData[0].otu_labels[1], filteredData[0].otu_labels[2], filteredData[0].otu_labels[3], filteredData[0].otu_labels[4], filteredData[0].otu_labels[5], filteredData[0].otu_labels[6], filteredData[0].otu_labels[7], filteredData[0].otu_labels[8], filteredData[0].otu_labels[9]]
            let labelArray = []
            //concat OTU to array for labels
            for (let i = 0; i < 10; i++) {
                labelArray.push("OTU " + filteredData[0].otu_ids[i])
                // console.log("label array ", labelArray)
            }
            // console.log("labels array complete is ", labelArray)
            // console.log("top ten is:", topTenOTU)
            // Create the Trace
            let trace1 = {
                x: topTenSV,
                y: labelArray,
                mode: 'markers',
                marker: { size: 16 },
                text: topTenOTULabels,
                type: 'bar',
                orientation: 'h'
            };
            // console.log("first value is :", filteredData[0].sample_values[0])
            // // Create the data array for our plot
            let data2 = [trace1];
            // // Define our plot layout
            let layout = {
                title: "OTU vs Sample Values",
                xaxis: { title: "Sample Values" },
                yaxis: { title: "OTU IDs" },
                showlegend: false,
                // xaxis: {
                //     tickangle: -45
                //   },
                // yaxis: {
                //     zeroline: false,
                //     gridwidth: 2
                //   },
            };
            // // Plot the chart to a div tag with id "bar-plot"
            Plotly.newPlot("bar", data2, layout, { displayModeBar: true });
            //BUBBLE PLOT 
            let bubbleTrace = {
                x: topTenOTU, //[0, 1, 2, 3, 4, 5, 6],
                y: topTenSV, //[1, 9, 4, 7, 5, 2, 4],
                mode: 'markers',
                marker: {
                    size: topTenSV,
                    color: topTenOTU
                },
                text: topTenOTULabels
            };
            let bubbleData = [bubbleTrace];
            let bubbleLayout = {
                title: 'Marker Size',
                showlegend: false,
                height: 600,
                width: 600
            };
            Plotly.newPlot('bubble', bubbleData, bubbleLayout);
        })
}
//sends new id in everytime drop down changes
function optionChanged(dropDownValue) {
    console.log("onchange dropdown value", dropDownValue)
    buildCharts(dropDownValue)
}
function init() {
    console.log("Initilize page")
    let dropDownBtn = d3.select("#selDataset");
    d3.json("samples.json")
        .then(function (data) {
            console.log("test", data)
            let names = data.names
            names.forEach(name => {
                dropDownBtn.append("option")
                    .text(name)
                    .attr("value", name)
            })
            data.samples.forEach(sv => console.log(sv));
            // for demographics area on load
            let demo = data.metadata.filter(sample => sample.id)[0];
            console.log(demo);
            Object.entries(demo).forEach(
                ([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
            );
            buildCharts(names[0])
        });
}
init();

