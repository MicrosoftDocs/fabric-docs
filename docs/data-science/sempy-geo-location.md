---
title: SemPy creating geo location plots
description: Learn how to create geo location plots with SemPy, including an example that tests whether non-relevant attributes are ignored.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: how-to
ms.date: 02/10/2023
---

# Creating geo location plots in Microsoft Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

```python
# Imports.
import geopandas as geo
import matplotlib.pyplot as plt
import pandas as pd

from sempy import KB
from sempy.model.functions import SemanticFunction
from sempy.objects import SemanticDataFrame
```

```python
# Load default background map.
world = geo.datasets.get_path("naturalearth_lowres")
world_gdf = geo.read_file(world)

def _plot_base(base_gdf=None):
    """Plotting function that returns a background visualization. Note that we
    require the coordinates to use latitude and longitude to be compliant with
    the logical type in SemPy.

    Parameters
    ----------
    base_gdf : geopandas DataFrame, default=None
    Object that contains the background map to plot (if available).

   """
    if base_gdf is not None:
        return base_gdf.plot(figsize=(14,7))
    else:
        return world_gdf.plot(figsize=(14,7), color='white', edgecolor='black')
```

```python
def plot_geo_from_latlon(sdf, **kwargs):
    """Plotting function that visualizes data contained in a semantic data
    frame using attributes tagged with 'lat' and 'lon'.

    Parameters
    ----------
    sdf : SemanticDataFrame 
    Contains the data for this plot.

    kwargs : Other arguments. 
    Right now 'base_gdf' will specify the base plot for the visualization.
    Plotting characteristics 'marker', 'color' and 'markersize' are also valid
    arguments.
   """
    lat_attributes = sdf.get_columns_of_stype("lat")
    lon_attributes = sdf.get_columns_of_stype("lon")
    if (len(lat_attributes)<1 or len(lon_attributes)<1):
        raise ValueError(f"Insufficient number of lat/lon attributes found in"
            "input semantic data frame.")
    if (len(lat_attributes)>1 or len(lon_attributes)>1):
        raise ValueError(f"Too many of lat/lon attributes found in input"
            "semantic data frame.")

    gdf = geo.GeoDataFrame(
        sdf.get_dataframe(),
        geometry=geo.points_from_xy(
            sdf[lon_attributes[0]], sdf[lat_attributes[0]]))
    
    if kwargs.get('base_gdf') is not None:
        base_plot = _plot_base(kwargs['base_gdf'])
    else:
        base_plot = _plot_base()
        
    gdf.plot(
        ax=base_plot, 
        marker=kwargs['marker'] if kwargs.get('marker') else 'o',
        color=kwargs['color'] if kwargs.get('color') else 'green', 
        markersize=kwargs['markersize'] if kwargs.get('markersize') else 5)
```

```python
# Establish SemPy's KB, add new tags to the KB and create attributes
# corresponding to the concepts of latitude and longitude.

kb = KB()
kb.add_column_stype("lat")
kb.add_column_stype("lon")

plot_geo_from_latlon_sf = SemanticFunction(
            "geo_from_latlon",
            plot_geo_from_latlon,
            lambda atts: ("lat" in _get_tag_dict(atts) 
                            or "lon" in _get_tag_dict(atts)))
kb.add(plot_geo_from_latlon_sf)

lt_lon = kb.add_column_stype("lt_longitude", extends=['lon'])
lt_lat = kb.add_column_stype("lt_latitude", extends=['lat'])
```

```python
# First example for plotting lat/lon using the geopandas cities dataset which is
# plotted on the world map.

path_to_data = geo.datasets.get_path("naturalearth_cities")
gdf = geo.read_file(path_to_data)

gdf['longitude'] = gdf.geometry.x
gdf['latitude'] = gdf.geometry.y

df = pd.DataFrame(gdf)
df = df.drop(columns=['geometry'])

sdf = kb.make_sdf(df, {"longitude": lt_lon, "latitude": lt_lat})

sdf.plot.geo_from_latlon()
```

```python
# This example tests whether non-relevant attributes are ignored when plotting the semantic data frame using  points
# of interest in NYC with nybb as the background map. 

path_to_data = geo.datasets.get_path("nybb")
gdf = geo.read_file(path_to_data)
# nybb is not in lat/lon by default. Convert.
gdf = gdf.set_geometry("geometry")
gdf = gdf.to_crs("EPSG:4326")

df = pd.DataFrame(
    {'building':
     ["City Hall", "Rockefeller Center", 
      "Billie Jean King National Tennis Center"], 
    'latitude': [40.712772, 40.758678, 40.7504], 
    'longitude': [-74.006058, -73.978798, -73.8456]})

sdf = kb.make_sdf(df, {"longitude": 'lat', "latitude": 'lon'})

lt_building = kb.add_column_stype("lt_building", extends=['Categorical'])

sdf = kb.make_sdf(df, {"longitude": 'lon',"latitude": 'lat', "building": 'lt_building'})

sdf.plot.geo_from_latlon(base_gdf=gdf, color='black', markersize=30)
```
