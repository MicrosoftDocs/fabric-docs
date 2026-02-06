---
title: ArcGIS GeoAnalytics for Microsoft Fabric (Generally Available)
description: Learn how to use the ArcGIS GeoAnalytics library in Microsoft Fabric, including data import, enrichment, visualization, and support resources.
ms.reviewer: sngun
ms.author: arali
author: ms-arali
ms.topic: concept-article
ms.date: 10/31/2025
#customer intent: As a data scientist or Spark developer, I want to use ArcGIS GeoAnalytics in Microsoft Fabric to perform spatial data transformation and analysis.
---

# ArcGIS GeoAnalytics for Microsoft Fabric (Generally Available)

Microsoft and [Esri](https://www.esri.com/) have partnered to integrate spatial analytics into Microsoft Fabric. The ArcGIS GeoAnalytics library is available in Fabric. This library enables spatial analytics in Spark notebooks and Spark Job Definitions for Data Engineering and Data Science workloads. This integration allows Spark developers and data scientists to use Esri's ArcGIS GeoAnalytics functions and tools within Fabric Spark for spatial data transformation and analysis. You don't need any separate installation to use these capabilities.

## Enable ArcGIS GeoAnalytics

Tenant administrators can enable or disable the ArcGIS GeoAnalytics library in the Fabric Runtime for all users. To do so, sign in to the Fabric portal and navigate to **Settings** > **Admin Portal**. In the **Tenant settings**, enable **ArcGIS GeoAnalytics for Fabric Runtime**. When disabled, it won't be available in Spark notebooks or Spark job definitions.

:::image type="content" source="media\spark-arcgis-geoanalytics\enable-arcgis-tenant.png" alt-text="Screenshot showing how to enable ArcGIS GeoAnalytics from Tenant settings." lightbox="media/spark-arcgis-geoanalytics/enable-arcgis-tenant.png":::

Additionally, if you are a Capacity administrator you can enable or disable the ArcGIS GeoAnalytics library in the Fabric Runtime for all users using your specific capacity. By default, capacity level settings are inherited from tenant level settings however you as a capacity administrator can choose to override it at the capacity level by navigating to **Settings** > **Admin Portal** > **Capacity settings** and choose your capacity. Next, under **Delegated tenant settings** > **Integration settings**, you can override and enable or disable **ArcGIS GeoAnalytics for Fabric Runtime**.

:::image type="content" source="media\spark-arcgis-geoanalytics\enable-arcgis-capacity.png" alt-text="Screenshot showing how to enable ArcGIS GeoAnalytics from Capacity settings." lightbox="media/spark-arcgis-geoanalytics/enable-arcgis-capacity.png":::

## Licensing and cost

ArcGIS GeoAnalytics for Microsoft Fabric is a proprietary technology from Esri. Though this library has been natively integrated into Microsoft Fabric Spark to reduce the friction in onboarding, you need to bring your own license to use these capabilities within Microsoft Fabric. You can learn more about licensing and cost from [Marketplace offering](https://go.esri.com/arcgis-geoanalytics-for-fabric-marketplace) page.

> [!NOTE]
> ArcGIS GeoAnalytics is a non-Microsoft product, and you understand and agree that use of ArcGIS is subject to the Esri [Master Agreement](https://www.esri.com/content/dam/esrisites/media/legal/ma-full/ma-full.pdf) and [Privacy Statement](https://www.esri.com/en-us/privacy/privacy-statements/privacy-statement). The current integration is offered and governed under marketplace terms and conditions.

## Authentication

Though ArcGIS GeoAnalytics library is preinstalled and preconfigured and you can import the modules to start using it immediately, the usage must be authorized with a valid license before running any function or tool. You can authorize the module with a GeoAnalytics for Microsoft Fabric username and password, or an API key provided by Esri. If the module is not authorized, functions and tools will fail to run with the following error: `com.esri.geoanalytics.internal.AuthError: Not authorized.` Here you can learn more about [Authorization](https://developers.arcgis.com/geoanalytics-fabric/authorization/).

## ArcGIS GeoAnalytics Capabilities

ArcGIS provides extensive geospatial capabilities for various applications. Esri is integrating ArcGIS spatial analytics capabilities into Microsoft Fabric, offering ArcGIS GeoAnalytics functions and tools in the Fabric Spark environment. This integration can help you analyze events, visualize spatial relationships, and gain insights from your data. These capabilities enable a variety of spatiotemporal analytics, including the following tasks:

| Task type | Description |
|---------|---------|
| Access or create spatial data | Access spatial data files saved in OneLake or as feature services in your Esri environment. Convert x and y coordinates into point geometries, or translate between well-defined text and binary representations (For example, well-known text, well-known binary, [GeoJSON](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_geom_from_geojson/) etc.) into a geometry. See the [ArcGIS GeoAnalytics developer documentation](https://developers.arcgis.com/geoanalytics-fabric/data/data-sources/) for more information on supported data sources. |
| Prepare data                  | Clean, transform, enrich, extract, and load your data for analysis and modeling tasks. ArcGIS GeoAnalytics provides more than [160 functions](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/) for manipulating your spatial data.                                                      |
| Enrich data based on location      | Add key attributes to your datasets based on shared location or proximity. For instance, add national census-collected sociodemographic data using spatial relationship predicates. This includes identifying if the customer location is inside an area of interest (containment) or within a specified [distance](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_dwithin/). |
| Proximity analysis            | Generate insights based on the distance between features, such as the [nearest neighbors](https://developers.arcgis.com/geoanalytics-fabric/tools/nearest-neighbors/), all locations within a [distance of interest](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_dwithin/), or create [groups of features based on proximity](https://developers.arcgis.com/geoanalytics-fabric/tools/group-by-proximity/).                                               |
| Analyze movement              | Understand patterns across space and time for tracks of moving entities (for example, GPS data tracking vehicle movement), such as [calculating motion statistics](https://developers.arcgis.com/geoanalytics-fabric/tools/calculate-motion-statistics/) or [finding dwell locations](https://developers.arcgis.com/geoanalytics-fabric/tools/find-dwell-locations/).                                                |
| Identify clusters and hotspots| Find [statistically significant groupings](https://developers.arcgis.com/geoanalytics-fabric/tools/find-hot-spots/) within your data according to their attributes and location in space and time.                                                                                                             |
| Find similar locations        | Identify locations that are [similar](https://developers.arcgis.com/geoanalytics-fabric/tools/find-similar-locations/) to one another based on location and attributes, or calculate similarity between line features.                                                                                     |
| Aggregation for business intelligence | [Aggregate data](https://developers.arcgis.com/geoanalytics-fabric/tools/aggregate-points/) and write results back into OneLake for use in Power BI, or schedule your workflows to drive automated updates.                                                                                                 |

### Usage examples

* **Data engineering and transformations** – Automate data cleaning, transformation, and loading using notebooks in Data Science and Data Engineering or pipelines in Data Factory:

  :::image type="content" source="media\spark-arcgis-geoanalytics\spatial-analytics-pipelines.png" alt-text="Screenshot showing spatial analytics in pipelines." lightbox="media/spark-arcgis-geoanalytics/spatial-analytics-pipelines.png":::

* **Hotspot and clustering analysis** – Identify significant spatial clusters of [high (hot spots) and low values (cold spots)](https://developers.arcgis.com/geoanalytics-fabric/tools/find-hot-spots/), [spatial outliers](https://developers.arcgis.com/geoanalytics-fabric/tools/find-point-clusters/), or similar feature groupings:
  
  :::image type="content" source="media\spark-arcgis-geoanalytics\cluster-analysis.jpg" alt-text="Screenshot showing hotspot and clustering analysis." lightbox="media/spark-arcgis-geoanalytics/cluster-analysis.jpg":::

* **Spatial pattern identification and analysis** – Gain insights into the distribution and [patterns](https://developers.arcgis.com/geoanalytics-fabric/tools/aggregate-points/) of features and data trends across areas or time periods:

  :::image type="content" source="media\spark-arcgis-geoanalytics\pattern-identification.png" alt-text="Screenshot showing spatial pattern identification and analysis." lightbox="media/spark-arcgis-geoanalytics/pattern-identification.png":::

* **[Spatial joins](https://developers.arcgis.com/geoanalytics-fabric/core-concepts/spatial-joins/) for data enrichment and location analytics** – Add location-based context based on spatial proximity or proximity across both space and time.

* **[Track and movement analysis](https://developers.arcgis.com/geoanalytics-fabric/trk-functions/)** – Analyze patterns in GPS or other types of tracking data to [detect incidents](https://developers.arcgis.com/geoanalytics-fabric/tools/detect-incidents/), [calculate motion statistics](https://developers.arcgis.com/geoanalytics-fabric/tools/calculate-motion-statistics/), and understand change in location over time:

  :::image type="content" source="media\spark-arcgis-geoanalytics\movement-analysis.png" alt-text="Screenshot showing track and movement analysis." lightbox="media/spark-arcgis-geoanalytics/movement-analysis.png":::

* **[Aggregation](https://developers.arcgis.com/geoanalytics-fabric/tools/aggregate-points/) and enrichment for use in Power BI dashboards** – Write results back into OneLake for use in Power BI.  Schedule your workflows to drive automated updates:

  :::image type="content" source="media\spark-arcgis-geoanalytics\aggregation-power-bi.png" alt-text="Screenshot showing spatial data aggregation in Power BI." lightbox="media/spark-arcgis-geoanalytics/aggregation-power-bi.png":::

For more information on all functions and tools, see [ArcGIS GeoAnalytics Developer Documentation](https://developers.arcgis.com/geoanalytics-fabric).

Beyond ArcGIS GeoAnalytics, you can enhance your spatial data in Fabric using [ArcGIS for Power BI](https://doc.arcgis.com/en/microsoft-365/latest/power-bi/get-started-with-arcgis-for-power-bi.htm). It enables custom data visualization and spatial insights in reports and dashboards.

These capabilities help organizations use geographic context for better decision-making and efficiency. Learn more about Esri’s ArcGIS product suite at the [ArcGIS Architecture Center](https://architecture.arcgis.com/en/overview/introduction-to-arcgis/arcgis-capabilities.html) and [ArcGIS and Fabric integrations](https://www.esri.com/en-us/c/product/spatial-analytics-in-microsoft-fabric) site.

## Code templates and examples

You can find code templates and examples in the [ArcGIS GeoAnalytics Developer Documentation](https://developers.arcgis.com/geoanalytics-fabric/), the [Esri Community for GeoAnalytics for Fabric](https://community.esri.com/t5/arcgis-geoanalytics-for-microsoft-fabric/ct-p/arcgis-geoanalytics-for-microsoft-fabric), and Fabric Data Engineering samples.

Here's an example showing how to do hot spot analysis by importing the *FindHotSpots* library and setting the parameters:

```python
# import the Find Hot Spots tool
from geoanalytics_fabric.tools import FindHotSpots

# Use Find Hot Spots to evaluate the data using bins of 0.1 mile size, and compare to a neighborhood of 0.5 mile around each bin
result_service_calls = FindHotSpots() \
            .setBins(bin_size=0.1, bin_size_unit="Miles") \
            .setNeighborhood(distance=0.5, distance_unit="Miles") \
            .run(dataframe=df)
```

The results can be further analyzed and visualized as shown below:

:::image type="content" source="media\spark-arcgis-geoanalytics\hot-spot-analysis.png" alt-text="Screenshot showing hot spot analysis to evaluate the data." lightbox="media/spark-arcgis-geoanalytics/hot-spot-analysis.png":::

### Get started with spatial data from ArcGIS

The [ArcGIS Living Atlas of the World](https://livingatlas.arcgis.com/en/home/) offers various spatial datasets to start working with the ArcGIS GeoAnalytics library. The Living Atlas is the foremost collection of geographic information from around the globe, including data layers that can be used to support your work with ArcGIS GeoAnalytics. Feature services from the Living Atlas can be read into a dataframe using the ArcGIS GeoAnalytics library to enrich your spatial data. For example, you can read data containing [geometry and attributes for US States](https://www.arcgis.com/home/item.html?id=8c2d6d7df8fa4142b0a1211c8dd66903):

```python

# read a feature service hosted in the Living Atlas of the World 

myFS="https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized_Boundaries/FeatureServer/0" 

df = spark.read.format('feature-service').load(myFS) 

```

This data is now in a dataframe for use with the ArcGIS GeoAnalytics functions, tools, or with other libraries in your Fabric notebooks. For instance, you could enrich a point dataset with state details using a spatial join relationship (for example, using [ST_Contains](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_contains/) to identify which state polygon contains each point).

The dataframe can be visualized as a table or used to generate a map with ArcGIS GeoAnalytics.

```python

# plot a dataframe with geometry from a feature service 

df.st.plot(basemap="light", geometry="shape", facecolor="yellow", edgecolor="black", alpha=0.5) 

```

:::image type="content" source="media\spark-arcgis-geoanalytics\dataframe-analysis.png" alt-text="Screenshot showing how to plot a dataframe with geometry." lightbox="media/spark-arcgis-geoanalytics/dataframe-analysis.png":::

### Supportability

Support for ArcGIS GeoAnalytics can be found through the [Esri Community](https://community.esri.com/t5/arcgis-geoanalytics-for-microsoft-fabric/ct-p/arcgis-geoanalytics-for-microsoft-fabric), and the [Developer Documentation](https://developers.arcgis.com/geoanalytics-fabric/).

### Consideration

* There's read/write support for spatial data as geometries, however, not all output formats support geometry type.

  * For formats without native geometry support, convert geometries to string or binary types (for example, well-known binary, well-known text, GeoJSON) using functions like [ST_AsText](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_as_text/) and [ST_AsBinary](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_as_binary/).

  * When writing to Delta, ArcGIS GeoAnalytics converts geometry to a well-known binary format. When reading these Delta tables, check the column type and use functions like [ST_GeomFromBinary](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_geom_from_binary/) to convert back to geometry.

* For authentication and usage tracking, the ArcGIS GeoAnalytics engine makes calls to Esri services outside of Fabric and hence currently it is not supported when [Outbound Access Protection](../security/workspace-outbound-access-protection-overview.md) is enabled. 

### Related content

* [Apache Spark runtime in Fabric](runtime.md)
* [How to use notebooks](how-to-use-notebook.md)
* [Native Execution Engine (NEE)](native-execution-engine-overview.md)
* [ArcGIS GeoAnalytics for Microsoft Fabric](https://go.esri.com/geoanalytics-in-ms-fabric-overview)
* [Developer documentation for ArcGIS GeoAnalytics for Microsoft Fabric](https://developers.arcgis.com/geoanalytics-fabric)
* [ArcGIS GeoAnalytics for Microsoft Fabric Community](https://community.esri.com/t5/arcgis-geoanalytics-for-microsoft-fabric/ct-p/arcgis-geoanalytics-for-microsoft-fabric)