function buildData(sample) {

    // Complete the following function that builds the data
  
    // Use `d3.json` to fetch the data for a sample
    d3.json(`/Data/${sample}`).then((fetchSample) => {
      console.log(fetchSample)
      
  
  
      // Use d3 to select the panel with id of `#sample-data`
      let dataSelector = d3.select("#sample-data");
  
      // Use `.html("") to clear any existing data
      dataSelector.html("");
   
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(fetchSample).forEach(([key, value]) => {
        dataSelector.append("div").text(`${key}: ${value}`);
      });
    })}
  
      // Build the Gauge Chart
      // buildGauge(data.WFREQ);
  
      
  
  function buildCharts(sample) {
  
    // Use `d3.json` to fetch the sample data for the plots
  
    d3.json(`/samples/${sample}`).then((sampleData) => {
      console.log(sampleData)
      const otu_ids = sampleData.otu_ids;
      const otu_labels = sampleData.otu_labels;
      const sample_values = sampleData.sample_values;
  
      //Build a Bubble Chart using the sample data
  
      let bubbleData = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Rainbow"
        }
      }];
  
      // Bubble layout
  
      let layout = {
        margin: { t: 0},
        hovermode: "closest",
        xaxis: {title: "OTU ID"}
      };
  
      Plotly.plot("bubble", bubbleData, layout)
  
      // Build a Pie Chart
      // You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
  
      let pieData = [{
        values: sample_values.slice(0,10),
        labels: otu_ids.slice(0,10),
        hovertext: otu_labels.slice(0,10),
        hoverinfo: "hovertext",
        type: "pie"
      }];
      
      // pie layout
  
      let layoutPie = {
        margin: {t: 0, 1:0}
      }
  
      Plotly.plot("pie", pieData, layoutPie)
  
    })
  }
  
  
  function init() {
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildData(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildData(newSample);
  }
  
  // Initialize the dashboard
  init();