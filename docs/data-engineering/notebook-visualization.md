---
title: Notebook visualization
description: Learn about data visualization options in notebooks.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: how-to
ms.date: 02/24/2023
---

# Notebook visualization

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

[!INCLUDE [product-name](../includes/product-name.md)] is an integrated analytics service that accelerates time to insight, across data warehouses and big data analytics systems. Data visualization in notebook is a key component in being able to gain insight into your data. It helps make big and small data easier for humans to understand. It also makes it easier to detect patterns, trends, and outliers in groups of data.

When you use Apache Spark in [!INCLUDE [product-name](../includes/product-name.md)], there are various built-in options to help you visualize your data, including [!INCLUDE [product-name](../includes/product-name.md)] notebook chart options, and access to popular open-source libraries.

## Notebook chart options

When using a [!INCLUDE [product-name](../includes/product-name.md)] notebook, you can turn your tabular results view into a customized chart using chart options. Here, you can visualize your data without having to write any code.

### display(df) function

The _display_ function allows you to turn SQL queries and Apache Spark dataframes and RDDs into rich data visualizations. The _display_ function can be used on dataframes or Resilient Distributed Datasets (RDDs) created in PySpark and Scala.

To access the chart options:

1. The output of _%%sql_ magic commands appear in the rendered table view by default. You can also call _display(df)_ on Spark DataFrames or Resilient Distributed Datasets (RDD) function to produce the rendered table view.
1. Once you have a rendered table view, switch to the **Chart** view.

   :::image type="content" source="media\notebook-visualization\chart-view.png" alt-text="Screenshot showing the Chart view" lightbox="media\notebook-visualization\chart-view.png":::

1. You can now customize your visualization by specifying the following values:

   | **Configuration** | **Description** |
   |---|---|
   | Chart Type | The display function supports a wide range of chart types, including bar charts, scatter plots, line graphs, and more. |
   | Key | Specify the range of values for the x-axis. |
   | Value | Specify the range of values for the y-axis values. |
   | Series Group | Used to determine the groups for the aggregation. |
   | Aggregation | Method to aggregate data in your visualization. |

   > [!NOTE]
   > By default the _display(df)_ function will only take the first 1000 rows of the data to render the charts. Select **Aggregation over all results** and then select **Apply** to apply the chart generation from the whole dataset. A Spark job will be triggered when the chart setting changes. Please note that it may take several minutes to complete the calculation and render the chart.

1. Once done, you can view and interact with your final visualization!

### display(df) statistic details

You can use _display(df, summary = true)_ to check the statistics summary of a given Apache Spark DataFrame that includes the column name, column type, unique values, and missing values for each column. You can also select a specific column to see its minimum value, maximum value, mean value, and standard deviation.

:::image type="content" source="media\notebook-visualization\display-statistic-details.png" alt-text="Screenshot of the statistics summary of a dataframe." lightbox="media\notebook-visualization\display-statistic-details.png":::

### displayHTML() option

[!INCLUDE [product-name](../includes/product-name.md)] notebooks support HTML graphics using the _displayHTML_ function.

The following image is an example of creating visualizations using [D3.js](https://d3js.org/).\

:::image type="content" source="media\notebook-visualization\d3js-example.png" alt-text="Screenshot of an example of a chart created using D3.js." lightbox="media\notebook-visualization\d3js-example.png":::

Run the following code to create this visualization.

```
displayHTML("""<!DOCTYPE html>
<meta charset="utf-8">

<!-- Load d3.js -->
<script src="https://d3js.org/d3.v4.js"></script>

<!-- Create a div where the graph will take place -->
<div id="my_dataviz"></div>
<script>

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Create Data
var data = [12,19,11,13,12,22,13,4,15,16,18,19,20,12,11,9]

// Compute summary statistics used for the box:
var data_sorted = data.sort(d3.ascending)
var q1 = d3.quantile(data_sorted, .25)
var median = d3.quantile(data_sorted, .5)
var q3 = d3.quantile(data_sorted, .75)
var interQuantileRange = q3 - q1
var min = q1 - 1.5 * interQuantileRange
var max = q1 + 1.5 * interQuantileRange

// Show the Y scale
var y = d3.scaleLinear()
  .domain([0,24])
  .range([height, 0]);
svg.call(d3.axisLeft(y))

// a few features for the box
var center = 200
var width = 100

// Show the main vertical line
svg
.append("line")
  .attr("x1", center)
  .attr("x2", center)
  .attr("y1", y(min) )
  .attr("y2", y(max) )
  .attr("stroke", "black")

// Show the box
svg
.append("rect")
  .attr("x", center - width/2)
  .attr("y", y(q3) )
  .attr("height", (y(q1)-y(q3)) )
  .attr("width", width )
  .attr("stroke", "black")
  .style("fill", "#69b3a2")

// show median, min and max horizontal lines
svg
.selectAll("toto")
.data([min, median, max])
.enter()
.append("line")
  .attr("x1", center-width/2)
  .attr("x2", center+width/2)
  .attr("y1", function(d){ return(y(d))} )
  .attr("y2", function(d){ return(y(d))} )
  .attr("stroke", "black")
</script>

"""
)
```

## Popular libraries

When it comes to data visualization, Python offers multiple graphing libraries that come packed with many different features. By default, every Apache Spark pool in [!INCLUDE [product-name](../includes/product-name.md)] contains a set of curated and popular open-source libraries.

### Matplotlib

You can render standard plotting libraries, like Matplotlib, using the built-in rendering functions for each library.

The following image is an example of creating a bar chart using **Matplotlib**.

:::image type="content" source="media\notebook-visualization\line-graph-example.png" alt-text="Screenshot of a line graph created with Matplotlib." lightbox="media\notebook-visualization\line-graph-example.png":::

:::image type="content" source="media\notebook-visualization\bar-chart-example.png" alt-text="Screenshot of a bar chart created with Matplotlib" lightbox="media\notebook-visualization\bar-chart-example.png":::

Run the following sample code to draw this bar chart.

```
# Bar chart

import matplotlib.pyplot as plt

x1 = [1, 3, 4, 5, 6, 7, 9]
y1 = [4, 7, 2, 4, 7, 8, 3]

x2 = [2, 4, 6, 8, 10]
y2 = [5, 6, 2, 6, 2]

plt.bar(x1, y1, label="Blue Bar", color='b')
plt.bar(x2, y2, label="Green Bar", color='g')
plt.plot()

plt.xlabel("bar number")
plt.ylabel("bar height")
plt.title("Bar Chart Example")
plt.legend()
plt.show()
```

### Bokeh

You can render HTML or interactive libraries, like **bokeh**, using the _displayHTML(df)._

The following image is an example of plotting glyphs over a map using **bokeh**.

:::image type="content" source="media\notebook-visualization\bokeh-plotting-map.png" alt-text="Screenshot of an example of plotting glyphs over a map." lightbox="media\notebook-visualization\bokeh-plotting-map.png":::

Run the following sample code to draw this image.

```
from bokeh.plotting import figure, output_file
from bokeh.tile_providers import get_provider, Vendors
from bokeh.embed import file_html
from bokeh.resources import CDN
from bokeh.models import ColumnDataSource

tile_provider = get_provider(Vendors.CARTODBPOSITRON)

# range bounds supplied in web mercator coordinates
p = figure(x_range=(-9000000,-8000000), y_range=(4000000,5000000),
           x_axis_type="mercator", y_axis_type="mercator")
p.add_tile(tile_provider)

# plot datapoints on the map
source = ColumnDataSource(
    data=dict(x=[ -8800000, -8500000 , -8800000],
              y=[4200000, 4500000, 4900000])
)

p.circle(x="x", y="y", size=15, fill_color="blue", fill_alpha=0.8, source=source)

# create an html document that embeds the Bokeh plot
html = file_html(p, CDN, "my plot1")

# display this html
displayHTML(html)
```

### Plotly

You can render HTML or interactive libraries like **Plotly**, using the **displayHTML()**.

Run the following sample code to draw this image:

:::image type="content" source="media\notebook-visualization\plotly-map.png" alt-text="Screenshot of a map of the United States created with plotly." lightbox="media\notebook-visualization\plotly-map.png":::

```
from urllib.request import urlopen
import json
with urlopen('https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json') as response:
    counties = json.load(response)

import pandas as pd
df = pd.read_csv("https://raw.githubusercontent.com/plotly/datasets/master/fips-unemp-16.csv",
                   dtype={"fips": str})

import plotly
import plotly.express as px

fig = px.choropleth(df, geojson=counties, locations='fips', color='unemp',
                           color_continuous_scale="Viridis",
                           range_color=(0, 12),
                           scope="usa",
                           labels={'unemp':'unemployment rate'}
                          )
fig.update_layout(margin={"r":0,"t":0,"l":0,"b":0})

# create an html document that embeds the Plotly plot
h = plotly.offline.plot(fig, output_type='div')

# display this html
displayHTML(h)
```

### Pandas

You can view html output of pandas dataframe as the default output, notebook automatically shows the styled html content.

:::image type="content" source="media\notebook-visualization\pandas-table.png" alt-text="Screenshot of a table created with pandas." lightbox="media\notebook-visualization\pandas-table.png":::

```
import pandas as pd 
import numpy as np 

df = pd.DataFrame([[38.0, 2.0, 18.0, 22.0, 21, np.nan],[19, 439, 6, 452, 226,232]], 

                  index=pd.Index(['Tumour (Positive)', 'Non-Tumour (Negative)'], name='Actual Label:'), 

                  columns=pd.MultiIndex.from_product([['Decision Tree', 'Regression', 'Random'],['Tumour', 'Non-Tumour']], names=['Model:', 'Predicted:'])) 

df
```

## Next steps

- [Use a notebook with Lakehouse to explore your data](lakehouse-notebook-explore.md)
