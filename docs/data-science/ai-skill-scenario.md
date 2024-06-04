---
title: AI Skill Scenario (preview)
description: Learn how to configure an AI Skill on the AdventureWorks dataset.
author: IAmGrootel
ms.author: avangrootel
ms.reviewer: franksolomon
reviewer: avangrootel
ms.service: AISkill
ms.topic: concept-article #Don't change; maybe should change to "how-to".
ms.date: 06/05/2024

---

# AI Skill example with the AdventureWorks dataset (preview)

This article shows how to configure an AI Skill on the AdventureWorks dataset.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

- **TBD**

## Select the data

**This seems to reference a lakehouse. It should describe the steps required to create that lakehouse.**

To follow along, you can download the data from [this resource](/sql/samples/adventureworks-install-configure) and upload it to a Warehouse or Lakehouse on Fabric. Here, we use AdventureWorksDW2012.bak.

Select the lakehouse you created.

We'll use these tables:

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

When you first ask the AI Skill questions with the listed tables selected, the AI Skill answers them fairly well. For instance, for question "**What is the most sold product**", the AI Skill returns:

- "Long-Sleeve Logo Jersey, L"

However, the SQL query does things we don't want. First, it only looks at the FactResellerSales table. It ignores the FactInternetSales table. Second, it orders the products by order quantity, when we really care about total sales revenue associated with the product, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/most-sold-ai-skill-first-question.png" alt-text="Screenshot showing the first example AI Skill highest sales product question." lightbox="./media/ai-skill-scenario/most-sold-ai-skill-first-question.png":::

We can improve the query generation if we provide instructions. Here, we might try something like:

- Whenever I ask about "the most sold" products or items, the metric of interest is total sales revenue, and not order quantity.
- The primary table to use is the FactInternetSales. Only use FactResellerSales if explicitly asked about resales or when asked about total sales.

If we repeat the question, we get a different answer: "Mountain-200 Black, 46" as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/most-sold-ai-skill-second-question.png" alt-text="Screenshot showing the second example AI Skill highest sales product question." lightbox="./media/ai-skill-scenario/most-sold-ai-skill-second-question.png":::

If we examine the corresponding SQL, we find that it indeed draws from the FactInternetSales table, and that it sorts by the sum of the sales amount. The AI followed our instructions!

As you continue to experiment with queries, you should add more instructions.

For our scenario, we'll use this set of instructions:

- Whenever I ask about "the most sold" products or items, the metric of interest is sales revenue, and not order quantity.
- The primary table to use is the FactInternetSales. Only use FactResellerSales if explicitly asked about resales or when asked about total sales.
- When asked about the impact of promotions, do so on the increase in sales revenue, not just the number of units sold.
- For customer insights, focus on the total sales amount per customer rather than the number of orders.
- Use DimDate to extract specific time periods (e.g., year, month) when performing time-based analysis.
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
- Always group by relevant dimensions (e.g., product, customer, date) to get detailed insights.
- When asked about customer demographics, join DimCustomer with relevant fact tables.
- For sales by promotion, join FactInternetSales with DimPromotion and group by promotion name.
- Normalize sales figures using DimCurrency for comparisons involving different currencies.
- Use ORDER BY clauses to sort results by the metric of interest (e.g., sales revenue, total orders).
- ListPrice in DimProduct is the suggested selling price, while the UnitPrice in FactInternetSales and FactResellerSales is the actual price at which each unit was sold. For most use cases on revenue, the unit price should be used.
- We rank top resellers by sales amount.

If you copy this text into the Notes for the model textbox, the AI will refer to these instructions when it generates its SQL queries.

## Provide Examples

In addition to instructions, examples serve as another effective way to guide the AI. If you have questions that your AI Skill often receives, or questions that require complex joins, consider adding examples for them.

For example, if we ask the question: "**How many active customers did we have June 1st, 2010**", some valid SQL is generated, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/active-customer-ai-skill-first-question.png" alt-text="Screenshot showing the first example AI Skill active customer count question." lightbox="./media/ai-skill-scenario/active-customer-ai-skill-first-question.png":::

However, it isn't a good answer.

Part of the problem is that we never defined an "active customer." More instructions in the Notes to the model textbox might help, but here we know that users will frequently ask this question. Therefore, we should make sure that the AI handles the question correctly. The relevant query is somewhat complex, so we should provide an example, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/examples-ai-skill-sql-query.png" alt-text="Screenshot showing an example AI Skill SQL query." lightbox="./media/ai-skill-scenario/examples-ai-skill-sql-query.png":::

If we then repeat the question, we get an improved answer!

TODO

To add instructions to the model, you can try something like: "**active customers are defined as customers that have made at least two purchases in the last 6 months**".

You can manually add examples, but you can also upload them from a json file. This helps when you have many SQL queries that you want to place in one file for a single upload, instead of manually uploading the queries one by one. For our setup, we'll use these examples:

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

## Test (**and revise?**) the AI Skill

We added both instructions and examples to the AI Skill. As we continue testing, we might want to add more examples and instructions to improve the AI Skill even further. It's important to work with your colleagues, to see if you provided examples and instructions that cover the kinds of questions they want to ask!

## Share the AI Skill

Share the AI Skill with your colleagues and have them try it out. You'll soon be able to connect the AI Skill with Microsoft Copilot Studio and other platforms. The AI Skill then becomes consumable from outside of Microsoft Fabric.

## Related content

- [How to Create an AI Skill](how-to-create-ai-skill.md)
- [AI Skill Concept](concept-ai-skill.md)

<!-- Optional: Related content - H2

Consider including a "Related content" H2 section that 
lists links to 1 to 3 articles the user might find helpful.

-->

<!--

Remove all comments except the customer intent
before you sign off or merge to the main branch.

-->