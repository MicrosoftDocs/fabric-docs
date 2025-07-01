---
title: Visualize data in R
description: How to create R visualizations.
ms.reviewer: None
ms.author: sgilley
author: sdgilley
ms.topic: how-to
ms.custom:
ms.date: 06/30/2025
ms.search.form: R Language
---

# Visualize data in R

The R ecosystem offers multiple graphing libraries that come packed with many different features. By default, every Apache Spark Pool in [!INCLUDE [product-name](../includes/product-name.md)] contains a set of curated and popular open-source libraries. Add or manage extra libraries or versions by using the [!INCLUDE [product-name](../includes/product-name.md)] [library management capabilities](r-library-management.md).



## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

[!INCLUDE [r-prerequisites](./includes/r-notebook-prerequisites.md)]

## ggplot2

The [ggplot2](https://ggplot2.tidyverse.org/) library is popular for data visualization and exploratory data analysis.

:::image type="content" border="true" source="./media/r-visualization/ggplot2.png" alt-text="Screenshot of ggplot2 scatterplot.":::

```R
%%sparkr
library(ggplot2)
data(mpg, package="ggplot2") 
theme_set(theme_bw()) 

g <- ggplot(mpg, aes(cty, hwy))

# Scatterplot
g + geom_point() + 
  geom_smooth(method="lm", se=F) +
  labs(subtitle="mpg: city vs highway mileage", 
       y="hwy", 
       x="cty", 
       title="Scatterplot with overlapping points", 
       caption="Source: midwest")
```

## rbokeh

[rbokeh](https://hafen.github.io/rbokeh/) is a native R plotting library for creating interactive graphics.

:::image type="content" border="true" source="./media/r-visualization/bokeh-plot.png" alt-text="Screenshot of rbokeh points.":::

```R
library(rbokeh)
p <- figure() %>%
  ly_points(Sepal.Length, Sepal.Width, data = iris,
    color = Species, glyph = Species,
    hover = list(Sepal.Length, Sepal.Width))
p
```

## R Plotly

[Plotly](https://plotly.com/r/) is an R graphing library that makes interactive, publication-quality graphs.

:::image type="content" border="true" source="./media/r-visualization/rplot.png" alt-text="Screenshot of plot line.":::

```R
library(plotly) 

fig <- plot_ly() %>% 
  add_lines(x = c("a","b","c"), y = c(1,3,2))%>% 
  layout(title="sample figure", xaxis = list(title = 'x'), yaxis = list(title = 'y'), plot_bgcolor = "#c7daec") 

fig
```

## Highcharter

[Highcharter](https://jkunst.com/highcharter/) is an R wrapper for Highcharts JavaScript library and its modules.

:::image type="content" border="true" source="./media/r-visualization/highchart.png" alt-text="Screenshot of highchart scatter.":::

```R
library(magrittr)
library(highcharter)
hchart(mtcars, "scatter", hcaes(wt, mpg, z = drat, color = hp)) %>%
  hc_title(text = "Scatter chart with size and color")
```

## Related content
- [How to use SparkR](./r-use-sparkr.md)
- [How to use sparklyr](./r-use-sparklyr.md)
- [How to use Tidyverse](./r-use-tidyverse.md)
- [R library management](./r-library-management.md)
- [Tutorial: avocado price prediction](./r-avocado.md)
- [Tutorial: flight delay prediction](./r-flight-delay.md)
