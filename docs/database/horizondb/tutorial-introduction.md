---
title: "Tutorial: Build an end-to-end solution with Microsoft Fabric HorizonDB"
description: Build an operational PostgreSQL solution with Fabric HorizonDB, mirroring, federation, a Copy job, Power BI, a notebook, and application integration.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: tutorial
ai-usage: ai-assisted
---
# Tutorial: Build an end-to-end solution with Microsoft Fabric HorizonDB

In this tutorial, you build a small order-management solution with Fabric HorizonDB. You use the three [Federated Analytics](federated-analytics-overview.md) capabilities: database mirroring for analytics, federated queries over mirrored data and a separate warehouse, and data loading through a Copy job. You also build a Power BI report, analyze mirrored data in a notebook, and connect a local PostgreSQL application.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Scenario

Contoso needs an operational database for customer orders. Application queries must use the PostgreSQL endpoint, while reporting must use the mirrored analytical copy so that analytical queries don't compete with operational work.

You create these resources:

| Resource | Tutorial name | Purpose |
|---|---|---|
| Fabric workspace | `contoso-horizondb-tutorial` | Contains the tutorial items. |
| HorizonDB database | `contoso-orders-db` | Stores operational customers and orders. |
| PostgreSQL schema | `horizon_sample` | Contains the tutorial tables. |
| SQL analytics endpoint | Created with the Fabric HorizonDB integration | Provides read-only access to mirrored data. |
| PostgreSQL foreign schema | `fabric_mirror` | Exposes the mirrored Contoso tables as read-only foreign tables. |
| Warehouse | `contoso-signals-warehouse` | Stores the synthetic `dbo.customer_signals` source used by federation and the Copy job. |
| Customer-owned foreign server | `customer_signals_dw` | Connects PostgreSQL to the separate warehouse. |
| PostgreSQL foreign schema | `fabric_sales` | Exposes warehouse signals without storing their rows locally. |
| Copy job | `load-contoso-customer-signals` | Loads customer signals into PostgreSQL staging. |
| Power BI semantic model | `contoso-orders-model` | Models customers and orders for reporting. |
| Power BI report | `contoso-order-operations` | Visualizes order totals and status. |
| Fabric notebook | `contoso-orders-analysis` | Analyzes mirrored data through the SQL analytics endpoint. |
| Python application | `contoso-orders-app` | Queries federated and loaded signals through PostgreSQL as the database creator. |

Use these names throughout the tutorial, or record your replacement names so that you can use them consistently.

## Architecture

The tutorial uses separate operational and analytical paths:

1. The Fabric SQL editor uses the Fabric HorizonDB PostgreSQL endpoint for operational work.
1. Fabric HorizonDB mirroring asynchronously publishes eligible tables to OneLake.
1. The SQL analytics endpoint, semantic model, Power BI report, and notebook use the mirrored analytical copy.
1. The PostgreSQL endpoint uses `pg_fabric_fdw` to query supported Fabric data through read-only foreign tables.
1. A Copy job loads a bounded Fabric result into PostgreSQL staging before an idempotent publish step.
1. The application connects to PostgreSQL as the creator and queries views over federated or locally loaded signals.

The PostgreSQL endpoint and SQL analytics endpoint have different engines, permissions, freshness, and supported operations. Don't use the SQL analytics endpoint for operational writes.

The mirroring process is asynchronous. A healthy database doesn't guarantee that mirrored data is current, and a healthy SQL analytics endpoint doesn't guarantee that the operational database is ready.

## Sample data model

The `horizon_sample` schema contains two tables:

- `customers` stores a customer name and segment.
- `orders` stores an order reference, customer relationship, date, status, amount, and creation timestamp.

Each table has a primary key so that it can participate in relational queries and mirroring eligibility checks. The tutorial load is rerunnable and uses stable business keys to avoid duplicate sample rows.

## What you learn

In this tutorial, you:

1. Create a Fabric workspace.
1. Create and validate a HorizonDB database.
1. Create PostgreSQL tables and load sample data.
1. Use the SQL editor and object explorer.
1. Review basic monitoring, security, and integration state.
1. Validate mirroring and query the SQL analytics endpoint.
1. Query the mirrored tables from Fabric HorizonDB through federation.
1. Load a bounded Fabric result into Fabric HorizonDB with a Copy job.
1. Build a Power BI semantic model and report.
1. Analyze mirrored order data in a Fabric notebook.
1. Query federated and loaded data from a small Python application.
1. Remove the tutorial resources.

## Prerequisites

- A Microsoft Fabric tenant where Fabric HorizonDB is available.
- Access to an eligible Fabric capacity.
- Permission to create a workspace, or access to a workspace where you can create the required items.
- A Microsoft Entra identity enabled for the Fabric HorizonDB preview.
- Contributor or Admin workspace access and permission to create PostgreSQL database, warehouse, Copy job, semantic model, report, and notebook items.
- Permission to read the Fabric sources used for federation and loading.
- Python 3.10 or later for the application step.

You don't need to install a PostgreSQL server. Fabric HorizonDB provides the managed PostgreSQL endpoint.

Use a dedicated development or test workspace and synthetic, nonsensitive data. Confirm preview enablement and recovery limitations with your administrator or preview contact. **Only the Microsoft Entra identity that creates the database can connect to PostgreSQL.** Use that identity throughout the database, Copy job destination, and local application exercises.

The Fabric item is named `contoso-orders-db`, but its PostgreSQL connection database is `postgres` in the current preview. Copy connection values from the item's **Visual Studio Code** pane.

## Tutorial sequence

Complete the steps in order:

1. [Create a workspace](tutorial-create-workspace.md).
1. [Create a HorizonDB database](tutorial-create-database.md).
1. [Create tables and load sample data](tutorial-ingest-data.md).
1. [Query and inspect the database](tutorial-query-database.md).
1. [Use the SQL analytics endpoint](tutorial-use-analytics-endpoint.md).
1. [Query mirrored Fabric data from Fabric HorizonDB](tutorial-query-fabric-data.md).
1. [Load Fabric data into Fabric HorizonDB with a Copy job](tutorial-load-fabric-data.md).
1. [Create Power BI visualizations](tutorial-create-visualizations.md).
1. [Analyze data in a notebook](tutorial-perform-data-analysis.md).
1. [Connect a PostgreSQL application](tutorial-connect-application.md).
1. [Clean up resources](tutorial-clean-up.md).

## Next step

> [!div class="nextstepaction"]
> [Create the tutorial workspace](tutorial-create-workspace.md)
