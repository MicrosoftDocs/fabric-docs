---
title: SemPy Power BI metrics integration
description: Learn how to access and work with Power BI metrics on dataframes in SemPy, including examples of merge and groupby.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: how-to
ms.date: 02/10/2023
---

# Power BI metrics integration in Microsoft Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this article, learn to use Power BI metrics on dataframes in SemPy.

## Access to Power BI metrics via XMLA and DAX

```python
import pandas as pd
from sempy.connectors.powerbi import PowerBIConnector
```

```python
conn = PowerBIConnector()
conn.get_datasets()
```

## Load model from retail analysis sample PBIX

```python
kb = conn.load_dataset("Retail Analysis Sample PBIX")
kb.plot_relationships()
```

## List metrics

```python
conn.get_metrics("Retail Analysis Sample PBIX")
```

```python
store_df = kb.get_data("Store")
store_df
```

## Get metric by groupby columns

```python
store = store_df.get_stype()
```

```python
conn.get_metric(dataset_name="Retail Analysis Sample PBIX", metric_name="Average Selling Area Size", groupby_columns=[store['Chain'], store['DistrictName']])
```

## Across multiple tables

```python
sales = kb.get_stype("Sales")
```

```python
conn.get_metric(dataset_name="Retail Analysis Sample PBIX", metric_name="Total Units Last Year", groupby_columns=[store['Territory'], sales['ItemID']])
```

## Get metric from dataframe, where the dataframe is result of a groupby

```python
conn.get_metric(dataset_name="Retail Analysis Sample PBIX", metric_name="Total Units Last Year",
                groupby_columns=[store['Chain']])
```

```python
new_df = store_df.groupby(['DistrictName', 'Chain']).size().reset_index(name='Count')
new_df
```

```python
top_stores = new_df[new_df.Chain.isin(["Lindseys"])]
top_stores.get_metric(metric_name="Average Selling Area Size")
```

```python
new_df.get_metric(metric_name="Average Selling Area Size") # can do join = 'inner' or 'none'
```

```python
new_df.get_metric(metric_name="Average Selling Area Size", groupby_columns=["Chain"])
```

## Get metric from a dataframe that's the result of a groupby spanning multiple tables in the PBI model

```python
store_sales_df = store_df.merge("Sales")
```

```python
item_store = store_sales_df.groupby(["StoreNumber", "ItemID"]).size().reset_index(name="item_store_count")
item_store
```

```python
item_store.get_metric("TotalSalesTY")
```

```python
item_store.get_metric("TotalSalesTY", groupby_columns=[store['StoreNumber'], sales['ItemID']])
```

## Another example for merge + groupby

```python
res = store_sales_df.groupby([ "ItemID"]).size().reset_index(name="ItemSaleCount")
res
```

```python
metric = res.get_metric("TotalSalesTY")
```
