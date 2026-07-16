---
title: Append Queries
description: Learn how to append queries in Infobridge to combine data from multiple queries into a single query.
ms.date: 07/13/2026
ms.topic: how-to
#customer intent: As a user, I want to append multiple queries so that I can combine rows from multiple data sources into a single query.
---

# Append queries

Use **Append Query** to combine rows from multiple queries into a single query. Append queries when the source tables have the same column structure and compatible data types.

## Example scenario

To illustrate how **Append Query** works, imagine a scenario where you store employee bonus data separately for the HR, IT, and Sales departments.

The following table shows sample employee bonus data for the HR department.

| Department | Bonus percentage | Role |
|------------|------------------|------|
| HR | 20% | HR Manager |
| HR | 15% | Recruiter |
| HR | 12% | Training & Development |
| HR | 8% | Payroll Coordinator |

The following table shows employee bonus data for the IT department.

| Department | Bonus percentage | Role |
|------------|------------------|------|
| IT | 20% | Software Engineer |
| IT | 15% | Network Administrator |
| IT | 12% | Database Administrator |

The following table shows employee bonus data for the Sales department.

| Department | Bonus percentage | Role |
|------------|------------------|------|
| Sales | 5% | Sales Manager |
| Sales | 12% | Digital Marketing Specialist |

Append the department data to create an organization-level view of employee bonuses. The following table shows the appended data from all departments.

| Department | Bonus percentage | Role |
|------------|------------------|------|
| HR | 20% | HR Manager |
| HR | 15% | Recruiter |
| HR | 12% | Training & Development |
| HR | 8% | Payroll Coordinator |
| IT | 20% | Software Engineer |
| IT | 15% | Network Administrator |
| IT | 12% | Database Administrator |
| Sales | 5% | Sales Manager |
| Sales | 12% | Digital Marketing Specialist |

## Append queries

The following example shows how to append regional sales queries into a single query.

1. Open the bridge that contains the queries you want to append.

   In this example, the bridge contains sales queries for Australia, Canada, France, United Kingdom, and the United States.

   :::image type="content" source="../media/infobridge-transform-queries/how-to-append-query/regional-sales-queries.png" alt-text="Screenshot showing regional sales queries for five countries/regions in the Queries pane." lightbox="../media/infobridge-transform-queries/how-to-append-query/regional-sales-queries.png":::

1. On the **Data** tab, select **Append Query**.

1. In the **Append Query** dialog, expand the **Source** field and select the queries that you want to append.

   Select only the queries that contain the data you want to combine. For example, if a bridge contains sales and budget queries, select only the relevant sales queries.

   :::image type="content" source="../media/infobridge-transform-queries/how-to-append-query/select-queries-to-append.png" alt-text="Screenshot showing five regional sales queries selected in the Source field of the Append Query dialog." lightbox="../media/infobridge-transform-queries/how-to-append-query/select-queries-to-append.png":::

1. Verify the queries that appear in the **Source** field.

   :::image type="content" source="../media/infobridge-transform-queries/how-to-append-query/selected-queries-to-append.png" alt-text="Screenshot showing selected regional sales queries in the Source field with the Apply button available." lightbox="../media/infobridge-transform-queries/how-to-append-query/selected-queries-to-append.png":::

1. Select **Apply**.

   After the append operation completes, Infobridge creates a new query that contains the combined rows from the selected queries. Infobridge lists the source queries under **Source Name**, and the append operation appears in the **Performed Steps** pane.

   :::image type="content" source="../media/infobridge-transform-queries/how-to-append-query/appended-query.png" alt-text="Screenshot showing the appended query with combined regional sales data and the Append Query step in the Performed Steps pane." lightbox="../media/infobridge-transform-queries/how-to-append-query/appended-query.png":::

Next, continue transforming the appended query as needed or write the data to a destination.
