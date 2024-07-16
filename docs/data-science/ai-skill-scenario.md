---
title: AI skill scenario (preview)
description: Learn how to configure an AI skill on the AdventureWorks dataset.
author: IAmGrootel
ms.author: avangrootel
ms.reviewer: franksolomon
reviewer: avangrootel
ms.service: fabric
ms.subservice: data-science
ms.topic: concept-article #Don't change; maybe should change to "how-to".
ms.date: 07/12/2024
ms.collection: ce-skilling-ai-copilot

---

# AI skill example with the AdventureWorks dataset (preview)

This article shows how to configure an AI skill on the AdventureWorks dataset.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

- An F64 Fabric capacity or higher.
- [Copilot tenant switch](../admin/service-admin-portal-copilot.md) is enabled.
- [Cross-Geo sharing for AI](../admin/service-admin-portal-copilot.md) is enabled, if relevant.

## Create a Lakehouse with "Adventure Works DW"

First create a Lakehouse and populate it with the necessary data.

If you already have an instance of Adventure Works DW in a Warehouse or Lakehouse, you can skip this step. If not, create a Lakehouse from a Notebook, and use the Notebook to populate the Lakehouse with the data.

**Step 1:** Create a new Notebook in the workspace where you want to create your AI skill.

**Step 2:** Select the "+ Data sources" button in the left nav of the Explorer pane. This adds an existing Lakehouse or creates a new Lakehouse.

**Step 3:** Add the following code snippet in the top cell.

```python
import pandas as pd
from tqdm.auto import tqdm
base = "https://synapseaisolutionsa.blob.core.windows.net/public/AdventureWorks"

# load list of tables
df_tables = pd.read_csv(f"{base}/adventureworks.csv", names=["table"])

for table in (pbar := tqdm(df_tables['table'].values)):
    pbar.set_description(f"Uploading {table} to lakehouse")

    # download
    df = pd.read_parquet(f"{base}/{table}.parquet")

    # save as lakehouse table
    spark.createDataFrame(df).write.mode('overwrite').saveAsTable(table)
```

**Step 4:** Select **Run all**.

:::image type="content" source="./media/ai-skill-scenario/notebook-run-all.png" alt-text="Screenshot showing a notebook with the Adventure Works upload code." lightbox="./media/ai-skill-scenario/notebook-run-all.png":::

After a few minutes, the Lakehouse is populated with the necessary data.

## Create an AI skill

To create a new AI skill, navigate to the Data Science Experience, and select the "AI skill" item.

:::image type="content" source="./media/ai-skill-scenario/create-first-ai-skill.png" alt-text="Screenshot showing where to create AI skills." lightbox="./media/ai-skill-scenario/create-first-ai-skill.png":::

Provide a name to create an AI skill.

## Select the data

Select the Lakehouse you created, and select "Connect." You must then select the tables you want the AI skill to have available access.

This exercise uses these tables:

- DimCustomer
- DimDate
- DimGeography
- DimProduct
- DimProductCategory
- DimPromotion
- DimReseller
- DimSalesTerritory
- FactInternetSales
- FactResellerSales

## Provide instructions

When you first ask the AI skill questions with the listed tables selected, the AI skill answers them fairly well. For instance, for question "**What is the most sold product**", the AI skill returns:

- "Long-Sleeve Logo Jersey, L"

However, the SQL query needs some improvement. First, it only looks at the FactResellerSales table. It ignores the FactInternetSales table. Second, it orders the products by order quantity, when total sales revenue associated with the product is the most important consideration, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/most-sold-ai-skill-first-question.png" alt-text="Screenshot showing the first example AI skill highest sales product question." lightbox="./media/ai-skill-scenario/most-sold-ai-skill-first-question.png":::

To improve the query generation, provide some instructions, as shown in these examples:

- Whenever I ask about "the most sold" products or items, the metric of interest is total sales revenue, and not order quantity.
- The primary table to use is the FactInternetSales. Only use FactResellerSales if explicitly asked about resales or when asked about total sales.

Asking the question again returns a different answer: "Mountain-200 Black, 46" as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/most-sold-ai-skill-second-question.png" alt-text="Screenshot showing the second example AI skill highest sales product question." lightbox="./media/ai-skill-scenario/most-sold-ai-skill-second-question.png":::

The corresponding SQL indeed draws from the FactInternetSales table, and it sorts by the sum of the sales amount. The AI followed our instructions!

As you continue to experiment with queries, you should add more instructions.

Our scenario uses this set of instructions:

- Whenever I ask about "the most sold" products or items, the metric of interest is sales revenue, and not order quantity.
- The primary table to use is the FactInternetSales. Only use FactResellerSales if explicitly asked about resales or when asked about total sales.
- When asked about the impact of promotions, do so on the increase in sales revenue, not just the number of units sold.
- For customer insights, focus on the total sales amount per customer rather than the number of orders.
- Use DimDate to extract specific time periods (for example, year, month) when performing time-based analysis.
- When analyzing geographical data, prioritize total sales revenue and average sales per order for each region.
- For product category insights, always use DimProductCategory to group products accordingly.
- When comparing sales between regions, use DimSalesTerritory for accurate territory details.
- Use DimCurrency to normalize sales data if analyzing sales in different currencies.
- For detailed product information, always join FactInternetSales with DimProduct.
- Use DimPromotion to analyze the effectiveness of different promotional campaigns.
- For reseller performance, focus on total sales amount and not just the number of products sold.
- When analyzing trends over time, use FactInternetSales and join with DimDate to group data by month, quarter, or year.
- Always check for data consistency by joining FactInternetSales with the corresponding dimension tables.
- Use SUM for aggregating sales data to ensure you're capturing total values accurately.
- Prioritize sales revenue metrics over order quantity to gauge the financial impact accurately.
- Always group by relevant dimensions (for example, product, customer, date) to get detailed insights.
- When asked about customer demographics, join DimCustomer with relevant fact tables.
- For sales by promotion, join FactInternetSales with DimPromotion and group by promotion name.
- Normalize sales figures using DimCurrency for comparisons involving different currencies.
- Use ORDER BY clauses to sort results by the metric of interest (for example, sales revenue, total orders).
- ListPrice in DimProduct is the suggested selling price, while the UnitPrice in FactInternetSales and FactResellerSales is the actual price at which each unit was sold. For most use cases on revenue, the unit price should be used.
- Rank top resellers by sales amount.

If you copy this text into the Notes for the model textbox, the AI refers to these instructions when it generates its SQL queries.

## Provide examples

In addition to instructions, examples serve as another effective way to guide the AI. If you have questions that your AI skill often receives, or questions that require complex joins, consider adding examples for them.

For example, the question: "**How many active customers did we have June 1st, 2013**" generates some valid SQL, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/active-customer-ai-skill-first-question.png" alt-text="Screenshot showing the first example AI skill active customer count question." lightbox="./media/ai-skill-scenario/active-customer-ai-skill-first-question.png":::

However, it isn't a good answer.

Part of the problem is that "active customer" doesn't have a formal definition. More instructions in the Notes to the model textbox might help, but users might frequently ask this question. Therefore, make sure that the AI handles the question correctly. The relevant query is moderately complex, so provide an example, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/examples-ai-skill-sql-query.png" alt-text="Screenshot showing an example AI skill SQL query." lightbox="./media/ai-skill-scenario/examples-ai-skill-sql-query.png":::

A repeat of the question returns an improved answer.

:::image type="content" source="./media/ai-skill-scenario/active-customer-ai-skill-second-question.png" alt-text="Screenshot showing the second example AI skill active customer count question." lightbox="./media/ai-skill-scenario/active-customer-ai-skill-second-question.png":::

You can manually add examples, but you can also upload them from a json file. Providing examples from a file is helpful when you have many SQL queries that you want to upload all at once, instead of manually uploading the queries one by one. For this exercise, use these examples:

```json
    {
    "how many active customers did we have June 1st, 2010?": "SELECT COUNT(DISTINCT fis.CustomerKey) AS ActiveCustomerCount FROM FactInternetSales fis JOIN DimDate dd ON fis.OrderDateKey = dd.DateKey WHERE dd.FullDateAlternateKey BETWEEN DATEADD(MONTH, -6, '2010-06-01') AND '2010-06-01' GROUP BY fis.CustomerKey HAVING COUNT(fis.SalesOrderNumber) >= 2;",
    "which promotion was the most impactful?": "SELECT dp.EnglishPromotionName, SUM(fis.SalesAmount) AS PromotionRevenue FROM FactInternetSales fis JOIN DimPromotion dp ON fis.PromotionKey = dp.PromotionKey GROUP BY dp.EnglishPromotionName ORDER BY PromotionRevenue DESC;",
    "who are the top 5 customers by total sales amount?": "SELECT TOP 5 CONCAT(dc.FirstName, ' ', dc.LastName) AS CustomerName, SUM(fis.SalesAmount) AS TotalSpent FROM FactInternetSales fis JOIN DimCustomer dc ON fis.CustomerKey = dc.CustomerKey GROUP BY CONCAT(dc.FirstName, ' ', dc.LastName) ORDER BY TotalSpent DESC;",
    "what is the total sales amount by year?": "SELECT dd.CalendarYear, SUM(fis.SalesAmount) AS TotalSales FROM FactInternetSales fis JOIN DimDate dd ON fis.OrderDateKey = dd.DateKey GROUP BY dd.CalendarYear ORDER BY dd.CalendarYear;",
    "which product category generated the highest revenue?": "SELECT dpc.EnglishProductCategoryName, SUM(fis.SalesAmount) AS CategoryRevenue FROM FactInternetSales fis JOIN DimProduct dp ON fis.ProductKey = dp.ProductKey JOIN DimProductCategory dpc ON dp.ProductSubcategoryKey = dpc.ProductCategoryKey GROUP BY dpc.EnglishProductCategoryName ORDER BY CategoryRevenue DESC;",
    "what is the average sales amount per order by territory?": "SELECT dst.SalesTerritoryRegion, AVG(fis.SalesAmount) AS AvgOrderValue FROM FactInternetSales fis JOIN DimSalesTerritory dst ON fis.SalesTerritoryKey = dst.SalesTerritoryKey GROUP BY dst.SalesTerritoryRegion ORDER BY AvgOrderValue DESC;",
    "what is the total sales amount by currency?": "SELECT dc.CurrencyName, SUM(fis.SalesAmount) AS TotalSales FROM FactInternetSales fis JOIN DimCurrency dc ON fis.CurrencyKey = dc.CurrencyKey GROUP BY dc.CurrencyName ORDER BY TotalSales DESC;",
    "which product had the highest sales revenue last year?": "SELECT dp.EnglishProductName, SUM(fis.SalesAmount) AS TotalRevenue FROM FactInternetSales fis JOIN DimProduct dp ON fis.ProductKey = dp.ProductKey JOIN DimDate dd ON fis.ShipDateKey = dd.DateKey WHERE dd.CalendarYear = YEAR(GETDATE()) - 1 GROUP BY dp.EnglishProductName ORDER BY TotalRevenue DESC;",
    "what are the monthly sales trends for the last year?": "SELECT dd.CalendarYear, dd.MonthNumberOfYear, SUM(fis.SalesAmount) AS TotalSales FROM FactInternetSales fis JOIN DimDate dd ON fis.ShipDateKey = dd.DateKey WHERE dd.CalendarYear = YEAR(GETDATE()) - 1 GROUP BY dd.CalendarYear, dd.MonthNumberOfYear ORDER BY dd.CalendarYear, dd.MonthNumberOfYear;",
    "how did the latest promotion affect sales revenue?": "SELECT dp.EnglishPromotionName, SUM(fis.SalesAmount) AS PromotionRevenue FROM FactInternetSales fis JOIN DimPromotion dp ON fis.PromotionKey = dp.PromotionKey WHERE dp.StartDate >= DATEADD(MONTH, -1, GETDATE()) GROUP BY dp.EnglishPromotionName ORDER BY PromotionRevenue DESC;",
    "which territory had the highest sales revenue?": "SELECT dst.SalesTerritoryRegion, SUM(fis.SalesAmount) AS TotalSales FROM FactInternetSales fis JOIN DimSalesTerritory dst ON fis.SalesTerritoryKey = dst.SalesTerritoryKey GROUP BY dst.SalesTerritoryRegion ORDER BY TotalSales DESC;",
    "who are the top 5 resellers by total sales amount?": "SELECT TOP 5 dr.ResellerName, SUM(frs.SalesAmount) AS TotalSales FROM FactResellerSales frs JOIN DimReseller dr ON frs.ResellerKey = dr.ResellerKey GROUP BY dr.ResellerName ORDER BY TotalSales DESC;",
    "what is the total sales amount by customer region?": "SELECT dg.EnglishCountryRegionName, SUM(fis.SalesAmount) AS TotalSales FROM FactInternetSales fis JOIN DimCustomer dc ON fis.CustomerKey = dc.CustomerKey JOIN DimGeography dg ON dc.GeographyKey = dg.GeographyKey GROUP BY dg.EnglishCountryRegionName ORDER BY TotalSales DESC;",
    "which product category had the highest average sales price?": "SELECT dpc.EnglishProductCategoryName, AVG(fis.UnitPrice) AS AvgPrice FROM FactInternetSales fis JOIN DimProduct dp ON fis.ProductKey = dp.ProductKey JOIN DimProductCategory dpc ON dp.ProductSubcategoryKey = dpc.ProductCategoryKey GROUP BY dpc.EnglishProductCategoryName ORDER BY AvgPrice DESC;",
}
```

## Test and revise the AI skill

Both instructions and examples were added to the AI skill. As testing proceeds, more examples and instructions can improve the AI skill even further. It's important to work with your colleagues, to see if you provided examples and instructions that cover the kinds of questions they want to ask!

## Use the AI skill programmatically

You can use the AI skill programmatically within a Fabric notebook. Before publication, the AI skill does not have a Published URL value, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/fabric-notebook-ai-skill-no-published-url-value.png" alt-text="Screenshot showing that an AI skill does not have a published URL value before publication." lightbox="./media/ai-skill-scenario/fabric-notebook-ai-skill-no-published-url-value.png":::

Select **Publish**, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/ai-select-publish.png" alt-text="Screenshot showing selection of the Publish option." lightbox="./media/ai-skill-scenario/ai-select-publish.png":::

The **Published URL** for the AI Skill will appear, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/fabric-notebook-ai-skill-published-url-value.png" alt-text="Screenshot showing the published URL." lightbox="./media/ai-skill-scenario/fabric-notebook-ai-skill-published-url-value.png":::

You can then copy the URL and use it in the Fabric notebook as shown in the next screenshot. This allows you to query the AI skill by making calls to the AI skill API in a Fabric notebook.

Copy the URL and use it in the Fabric notebook to query the AI skill by making calls to the AI skill API. Simply paste the copied URL and replace the question with any query relevant to your AI skill. This example uses **\<generic published URL value\>** as the URL.

```python
import requests
import json
import pprint
from synapse.ml.mlflow import get_mlflow_env_config


# the URL could change if the workspace is assigned to a different capacity
url = "https://<generic published URL value>"

configs = get_mlflow_env_config()

headers = {
    "Authorization": f"Bearer {configs.driver_aad_token}",
    "Content-Type": "application/json; charset=utf-8"
}

question = "{userQuestion: \"what is an example product?\"}"

response = requests.post(url, headers=headers, data = question)

print("RESPONSE: ", response)

print("")

response = json.loads(response.content)

print(response["result"])
```

## Related content

- [AI skill concept](concept-ai-skill.md)
- [How to create an AI skill](how-to-create-ai-skill.md)