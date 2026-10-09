---
title: How to Correlate Fabric Capacity Metrics with Warehouse Query Insights
description: Configure a Power BI report that correlates Fabric capacity utilization with Query Insights from customer-owned warehouses.
ms.reviewer: mariyaali, ccaldera
ms.date: 09/10/2026
ms.topic: how-to
---
# How to correlate Fabric capacity metrics with warehouse query insights

[!INCLUDE [applies-to-version](includes/applies-to-version/fabric-dw.md)]

The Fabric Data Warehouse Query Capacity Correlation report brings these two views together in a customer-owned Power BI report.

- The [Fabric Capacity Metrics app](../enterprise/metrics-app.md) helps you identify capacity consumption, spikes, throttling, and item-level usage.
- The [queryinsights views in Fabric Data Warehouse](query-insights.md) help you understand which SQL statements ran and how they performed.

You can use the report to find past warehouse queries and review their duration, allocated CPU, scan volume, status, user, and SQL text.

The report doesn't deploy objects to your warehouses or store reusable credentials.

Download the report from the [Fabric Data Warehouse Query Capacity Correlation solution](https://github.com/microsoft/fabric-toolbox/tree/main/monitoring/query-capacity-correlation) in the Microsoft Fabric toolbox.

## Why use the Fabric Data Warehouse Query Capacity Correlation report

A capacity usage spike tells you that resource consumption increased, but you might still need to determine:

- Which warehouse queries were active at that time?
- Which users submitted those queries?
- Are recurring query patterns driving capacity consumption?
- Should you tune or reschedule a workload before increasing capacity?

Without a shared view, you must compare timestamps manually across the Capacity Metrics app and query insights views. This report places both datasets on the same time axis, helping you investigate performance faster, prioritize workload optimization, validate changes, and prepare evidence for support cases.

> [!TIP]
> Time correlation identifies queries that were active during a capacity event. Review all available evidence before attributing the event to a specific query.

## Prerequisites

Before you begin, ensure you have installed locally:

- [Power BI Desktop](https://www.microsoft.com/en-us/download/details.aspx?id=58494) with Power BI project (PBIP) support
- Windows PowerShell 5.1 or [PowerShell 7](/powershell/scripting/install/install-powershell-on-windows)
- [Azure CLI](/cli/azure/install-azure-cli)
- Access to the **Fabric Capacity Metrics** semantic model
- Read and Query Insights access to each warehouse you want to include

## Download the report

1. Download [Fabric Data Warehouse Query Capacity Correlation - Customer Template.zip](https://github.com/microsoft/fabric-toolbox/raw/refs/heads/main/monitoring/query-capacity-correlation/Fabric%20Data%20Warehouse%20Query%20Capacity%20Correlation%20-%20Customer%20Template.zip).
1. Extract the ZIP file.
1. Open PowerShell in the extracted folder.
1. Unblock the configuration script:

   ```powershell
   Unblock-File .\Configure-CustomerTemplate.ps1
   ```

## Find the Capacity Metrics workspace

1. Open **OneLake catalog** in Fabric.
1. Filter to **Semantic model** and search for **Fabric Capacity Metrics**.
1. Copy the exact value in the **Workspace** column.

The workspace name typically resembles:

```text
Microsoft Fabric Capacity Metrics <installation date and time>
```

If you can't see the semantic model, ask the person who installed the Fabric Capacity Metrics app for access or for the workspace name. Don't use the name of a workspace that only contains warehouses.

## Configure the report

1. Sign in to Azure CLI. 

   If necessary, specify the `--tenant` and `--subscription` that owns your Fabric resources. For more information, see [How to manage Azure subscriptions with the Azure CLI](/cli/azure/manage-azure-subscriptions-azure-cli).

   ```azurecli
   az login
   az account show
   ```

1. Run the configuration script with your capacity name, Capacity Metrics workspace name, and the Windows time zone used by the Capacity Metrics report:

   ```powershell
   .\Configure-CustomerTemplate.ps1 `
     -CapacityName "Contoso Production" `
     -CapacityMetricsWorkspace "Microsoft Fabric Capacity Metrics <installation>" `
     -TimeZoneId "Pacific Standard Time"
   ```

The script uses the existing Azure CLI sign-in to discover capacities and warehouses. If your account can access exactly one active capacity, omit `-CapacityName`. You can also use `-CapacityId` for unattended configuration.

To list Windows time zone IDs available on your computer, run:

```powershell
[TimeZoneInfo]::GetSystemTimeZones() | Select-Object Id, DisplayName
```

The script creates a `Configured` folder and builds the Capacity Metrics connection automatically.

To discover every workspace on the capacity, use a Fabric administrator or service principal with tenant read permissions. Otherwise, the script includes only workspaces available to your account.

## Open and refresh the report

1. Open `Configured\Query Capacity Correlation.pbip` in Power BI Desktop.
1. Select **Transform data** > **Data source settings**.
1. Sign in to Capacity Metrics and each listed warehouse via their SQL connection string.
1. Set every data source's privacy level to **Organizational**.
1. Review and approve each native Query Insights prompt.
1. Refresh the semantic model.

Power BI stores your credentials separately from the PBIP files.

## Investigate a capacity spike

1. Select an hour or time range with elevated capacity utilization.
1. Filter by warehouse, item type, query status, statement type, or user.
1. Compare query duration, allocated CPU, data scanned, and status.
1. Use **Distributed Statement ID** to investigate a request in Query Insights.
1. Review the SQL text and query hash before tuning or rescheduling a workload.

Query Insights retains 30 days of history, while the Capacity Metrics source used by this report exposes the latest seven days. The report can correlate only the overlapping period. Query Insights excludes system queries and might take up to 15 minutes to show a completed query.

> [!IMPORTANT]
> Capacity Metrics Operation ID and Query Insights `distributed_statement_id` are different identifiers. Don't join or compare them. Correlate the resolved warehouse and overlapping time window.

Capacity consumption and Query Insights CPU are different measurements. Don't convert one directly into the other.

## Publish and configure refresh

1. Publish the report and semantic model to your Fabric workspace.
1. Open the semantic model settings.
1. Under **Gateway and cloud connections**, configure every Warehouse SQL source and the Capacity Metrics source.
1. Run an on-demand refresh and confirm that it succeeds before sharing the report.

Credentials you enter in Power BI Desktop don't transfer to the Fabric service.

The imported semantic model contains cached SQL text and user identities from each configured warehouse. Review `warehouses.configured.csv` and limit report access to users who are authorized to view that information.

## Troubleshoot

### Capacity Metrics model isn't found

The error message `PowerBIEntityNotFound` means the supplied workspace doesn't contain the **Fabric Capacity Metrics** semantic model. Find the **Fabric Capacity Metrics** semantic model in OneLake catalog and rerun the `Configure-CustomerTemplate.ps1` script with its **Workspace** value.

### Analysis server isn't found

Confirm that the Capacity Metrics workspace name is exact. Then clear the failed permission under **File** > **Options and settings** > **Data source settings** and sign in again.

The configuration script accepts the workspace display name, not an XMLA endpoint.

### Missing warehouses or queries

Confirm that your account can access the warehouse and query the `queryinsights.exec_requests_history` view with T-SQL. If your account doesn't have tenant-wide read permissions, the script discovers only workspaces that you can access.

### Capacity discovery is ambiguous

If the script finds more than one active capacity, rerun it with `-CapacityName` or `-CapacityId`.

## Related content

- [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md)
- [Install the Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app-install.md)
- [Query Insights in Fabric Data Warehouse](query-insights.md)
- [Power BI Desktop projects](/power-bi/developer/projects/projects-overview)
- [Fabric Data Warehouse Query Capacity Correlation solution](https://github.com/microsoft/fabric-toolbox/tree/main/monitoring/query-capacity-correlation)
