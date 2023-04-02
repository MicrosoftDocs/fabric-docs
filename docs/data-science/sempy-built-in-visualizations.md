---
title: SemPy built-in visualizations
description: Learn about SemPy's built-in visualizations on public datasets.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: how-to
ms.date: 02/10/2023
---

# Built-in visualizations

[!INCLUDE [preview-note](../includes/preview-note.md)]

This notebook shows some of the built-in visualizations on public datasets.

```python
# Fetch the diamonds dataset from openml
from sklearn.datasets import fetch_openml

diamonds = fetch_openml("diamonds")
df = diamonds.frame

df
```

```python
import sempy
from sempy.connectors.dataframe import load_df

kb = sempy.KB()

# load_df populates stypes with defaults derived from column names
load_df(kb, "diamonds", df=df)
```

```python
# Show the components (corresponding to columns) with their types
diamonds_ent = kb.get_stype("diamonds")
diamonds_ent.get_components()
```

```python
# get the semantic dataframe
sdf = kb.get_data("diamonds")
# sdf.plot has plotting suggestions
sdf.plot
```

```python
sdf.plot.categories(['cut', 'color', 'clarity'])
```

```python
sdf.plot.numeric(['carat', 'depth', 'table', 'price', 'x', 'y', 'z'])
```

```python
sdf.plot.regression(target_column='price')
```

## A more complex dataset now

```python
flight_weather = fetch_openml("KNYC-Metars-2016").frame
flight_weather.head()
```

```python
load_df(kb, "flight_weather", df=flight_weather)
```

```python
events_lt = kb.get_stype('Events_st')
events_lt
```

```python
events_lt.extends.append(sempy.stypes.Event)
events_lt
```

```python
flight_weather_ent = kb.get_stype("flight_weather")
flight_weather_ent.get_components()
```

```python
flight_weather_sdf = kb.get_data("flight_weather")
```

```python
flight_weather_sdf.plot.state_transitions(edge_mode='probability')
```

```python
flight_weather_sdf.plot.categories(['Wind_Dir', 'Events', 'Conditions'])
```

```python
flight_weather_sdf.plot.dependencies()
```

```python
flight_weather_sdf.plot.numeric(['Temp.', 'Windchill', 'Humidity', 'Pressure', 'Dew_Point', 'Visibility', 'Wind_Speed', 'Gust_Speed', 'Precip'])
```

```python
flight_weather_sdf.plot.classification(target_column='Conditions')
```

```python
import matplotlib.pyplot as plt
flight_weather_sdf[:1000].plot.time_series(time_attribute='Time', numeric_attributes=['Temp.', 'Windchill', 'Humidity', 'Dew_Point', 'Visibility', 'Wind_Speed', 'Gust_Speed', 'Precip'])
fig = plt.gcf()
fig.set_size_inches(20, 3)
```
