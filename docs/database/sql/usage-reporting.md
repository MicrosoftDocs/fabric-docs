---
title: Billing and Utilization Reporting
description: Understand what customers can expect from the metrics app experience for SQL database in Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: amapatil # Microsoft alias
ms.date: 03/28/2025
ms.topic: conceptual
ms.search.form: SQL database Billing and Utilization
---
# Billing and utilization reporting for SQL database in Microsoft Fabric

The article explains compute usage reporting of the SQL database in Microsoft Fabric.

When you use a Fabric capacity, your usage charges appear in the Azure portal under your subscription in [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview). To understand your Fabric billing, see [Understand your Azure bill on a Fabric capacity](../../enterprise/azure-billing.md).

After February 1, 2025, compute and data storage for SQL database are charged to your Fabric capacity. Additionally, backup billing will start after April 1, 2025.

## Capacity

In Fabric, based on the Capacity SKU purchased, you're entitled to a set of Capacity Units (CUs) that are shared across all Fabric workloads. For more information on licenses supported, see [Microsoft Fabric concepts and licenses](../../enterprise/licenses.md).

Capacity is a dedicated set of resources that is available at a given time to be used. Capacity defines the ability of a resource to perform an activity or to produce output. Different resources consume CUs at different times.

### Capacity for SQL database in Microsoft Fabric

In the capacity-based SaaS model, SQL database aims to make the most of the purchased capacity and provide visibility into usage.

In simple terms, 1 Fabric capacity unit = 0.383 SQL database vCores. For example, a Fabric capacity SKU F64 has 64 capacity units, which is equivalent to 24.512 SQL database vCores.

### Cost

The cost for SQL database in Fabric is the summation of compute cost and storage cost. The compute cost is based on vCore and memory used.
 
A SQL database in Fabric autoscales compute and provisions a minimum of around 2 GB memory which helps performance and is billed as part of compute while the database is online. After a minimum of 15 minutes of minimum compute provisioned while the database is online, the compute bill is zero until activity later returns. 

Consider a database with workload activity for two minutes and is otherwise inactive for a one-hour period. The database is billed for compute for two minutes, and kept online for another 15 minutes, for a total of 17 minutes. Only storage is billed throughout the hour.
 
For example, the following sample bill in this example is calculated as follows:
 
| Time Interval | vCores used each second | Memory GB used each second | Compute dimension billed   | vCore seconds billed over time interval |
|:--|:--|:--|:--|:--|
| 0:00-0:01     | 2                  | 3                          | vCores used                     | 2 vCores * 60 seconds * 2.611 CUs per vCore seconds = 313.3 CUs  |
| 0:01-0:02     | 1                  | 6                          | Memory used                     | 6 GB * 1 vCore / 3GB * 60 seconds * 2.611 CUs per vCore seconds = 313.3 CUs |
| 0:02-0:17     | 0                  | 0                          | Minimum memory provisioned      | 2 GB * 1/3 * 900 seconds * 2.611 CUs per vCore seconds = 1566.6 CUs |
| 0:17-0:60     | 0                  | 0                          | No compute billed while paused  | 0 CUs    |
| **Total CUs** |                    |                            |                                 | **2193 CUs*                 |

### Compute usage reporting

The [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md) provides visibility into capacity usage for all Fabric workloads in one place. Administrators can use the app to monitor capacity, the performance of workloads, and their usage compared to purchased capacity.

Initially, you must be a capacity admin to install the Microsoft Fabric Capacity Metrics app. Once installed, anyone in the organization can have permissions granted or shared to view the app. For more information, see [What is the Microsoft Fabric Capacity Metrics app?](../../enterprise/metrics-app.md)

Once you have installed the app, select the **SQLDbNative** from the **Select item kind:** dropdown list. The **Multi metric ribbon** chart and the **Items (14 days)** data table now show only **SQLDbNative** activity.

:::image type="content" source="media/usage-reporting/overall-page-image.jpg" alt-text="Screenshot from the Fabric Capacity Metrics app showing the overall dashboard.":::

### SQL database operation categories

You can analyze universal compute capacity usage by workload category, across the tenant. Usage is tracked by total Capacity Unit Seconds (CUs). The table displayed shows aggregated usage across the last 14 days.

Fabric SQL database rolls up under **SQLDbNative** in the Metrics app. The operation categories seen in this view are:

- **SQL Usage**: Compute charge for all user-generated and system-generated T-SQL statements within a Database.

For example:

:::image type="content" source="media/usage-reporting/sql-database-operations.jpg" alt-text="Screenshot from the Fabric Capacity Metrics app showing SQL database utilization.":::

The billing type field is used to determine whether the workload is in preview mode or billable.

### Timepoint explore graph

This graph in the Microsoft Fabric Capacity Metrics app shows utilization of resources compared to capacity purchased. 100% of utilization represents the full throughput of a capacity SKU and is shared by all Fabric workloads. This is represented by the yellow dotted line. Selecting a specific timepoint in the graph enables the **Explore** button, which opens a detailed drill through page.

:::image type="content" source="media/usage-reporting/utilization-chart.jpg" alt-text="Screenshot from the Fabric Capacity Metrics app showing a graph of SQL database capacity utilization.":::

In general, similar to Power BI, [operations are classified either as interactive or background](/fabric/enterprise/fabric-operations) and denoted by color. Most operations in __SQL database__ category are reported as *interactive* with 5 minute smoothing of activity.

### Timepoint drill through graph

:::image type="content" source="media/usage-reporting/timepoint-chart-for-interactive.jpg" alt-text="Screenshot from the Fabric Capacity Metrics app showing interactive operations for a time range.":::

This table in the Microsoft Fabric Capacity Metrics app provides a detailed view of utilization at specific timepoints. The amount of capacity provided by the given SKU per 30-second period is shown along with the breakdown of interactive and background operations. The interactive operations table represents the list of operations that were executed at that timepoint, and are driven directly by user activity.

Top use cases for this view include:

- Identification of SQL queries(statements) status: values can be "Success","Rejected".

  - The "Success" status is standard SQL database behavior when the capacity is not throttled.
  - The "Rejected" status can occur because of resource limitations due to capacity throttling.

- Identification of SQL queries(statements) that consumed many resources: sort the table by **Total CU(s)** descending by timestamp and artifact. 

#### Considerations

Consider the following usage reporting nuances:

- **Duration(s)** field reported in Fabric Capacity Metrics App is for informational purposes only. It reflects the time window for current SQL usage corresponding to 60 seconds.

### Storage usage reporting

Storage usage reporting helps admins to monitor storage consumption across their organization in capacity metrics. After selecting the capacity, adjust the date range to align with the storage emitted during a billing cycle. The experience slider helps you filter on the workload experience.

Possible storage **Operation name** values are:

- **Allocated SQL storage** is the total database size.
- **SQL database Backup Storage** is the backup storage usage that exceeds the allocated size and will be billed accordingly.

:::image type="content" source="media/usage-reporting/billable-storage.png" alt-text="Screenshot from the Fabric Capacity Usage app showing billable storage." lightbox="media/usage-reporting/billable-storage.png":::

Current storage metrics align with a graph on the left to show average storage at a daily grain or an hourly grain if you drill in.

Storage utilization reporting occurs at the workspace level. If you want more information about storage usage inside the database, see [Performance Dashboard for SQL database in Microsoft Fabric](performance-dashboard.md).

### Backup storage billing

SQL database in Microsoft Fabric provides [automatic backups](backup.md) from the moment a database is created. Backup billing is determined by the amount of storage consumed by the automated backup process.

- By default, backup storage is free up to 100% of your provisioned database size. For example, a database with 100 GB of allocated storage automatically includes 100 GB of backup storage at no additional cost.
- If backup storage usage exceeds the allocated database size, additional charges apply. You're billed only for the backup storage that exceeds the allocated  size.

Backup storage usage is measured hourly and calculated as a cumulative total. At the end of each month, this value is aggregated and used to calculate your bill. Charges are based on the total GB/month. 

For example, if a database accumulates 100 GB of allocated data storage and backup storage accumulates 150 GB of backup storage and stays constant for a month, you would be charged for 100 GB of data storage and additional 50 GB of the backup storage at the applicable rate. 

## Related content

- [Performance Dashboard for SQL database in Microsoft Fabric](performance-dashboard.md)
- [Monitor SQL database in Microsoft Fabric](monitor.md)
