---
title: Develop and Deploy Cross-Warehouse Dependencies
description: Learn how to develop and deploy cross-warehouse dependencies in Fabric Data Warehouse using SQL database projects in Visual Studio Code.
ms.reviewer: pvenkat, randolphwest
ms.date: 07/30/2026
ms.topic: how-to
ai-usage: ai-assisted
---
# Develop and deploy cross-warehouse dependencies

In this article, you learn how to model and deploy cross-warehouse dependencies by using SQL database projects in Visual Studio Code. You start from two existing warehouse projects and configure one-way dependencies between them by using database references.

This article builds on the concepts in [Develop warehouse projects in Visual Studio Code](develop-warehouse-project.md) and assumes you're already comfortable building and publishing a single warehouse project.

## Prerequisites

Before you begin, make sure you:

- Create **two Fabric Warehouses** in the same workspace. 
    - To create a new sample warehouse, see [Create a sample Warehouse in Microsoft Fabric](create-warehouse-sample.md).
- Create or extract a **database project** for each warehouse in Visual Studio Code.
    - To create a database project for your existing warehouse or a new warehouse, see [Develop warehouse projects in Visual Studio Code](develop-warehouse-project.md).
- Install [Visual Studio Code](https://code.visualstudio.com/download) on your workstation. 
- Install the [.NET](https://dotnet.microsoft.com/download/dotnet) SDK to build and publish database projects.
- Install two Visual Studio Code extensions: [SQL Database Projects](https://marketplace.visualstudio.com/items?itemName=ms-mssql.sql-database-projects-vscode) and [SQL Server (mssql)](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql).
    - You can install the required extensions directly from within Visual Studio Code marketplace by searching for "SQL Database Projects" or "SQL Server (mssql)".
- The warehouse projects validate, build, and can be published in Visual Studio Code.

> [!NOTE]
> This article focuses on **warehouse projects** in Visual Studio Code and how you version them in Git as regular code projects. Fabric **Git integration** for workspaces and warehouse items is covered separately in [Development and Deployment](development-deployment.md) and [Git integration](git-integration.md). The article assumes that your Fabric workspace is the deployment target and T-SQL schema lives in one or more Visual Studio Code projects that you version control in Git.
>
> This article **does not cover** cross-warehouse development for the **SQL analytics endpoint of a Lakehouse**. Lakehouse tables and SQL analytics endpoint objects aren't tracked objects in source control the same way warehouse projects are. Use **Warehouse** items with database projects for complete git integration and deployment support in Fabric native experiences and client tools.

## Scenario: Zava Analytics cross-domain warehouses

Zava Analytics uses two business domains:

- **Sales** – customer orders, revenue, and pipeline metrics.
- **Marketing** – campaigns, channels, and engagement metrics.

Each domain has:

- A **Fabric Warehouse** in the same workspace:
  - `ZavaSalesWarehouse`
  - `ZavaMarketingWarehouse`
    
- A **database project** in Visual Studio Code:
  - `Zava.Sales.Warehouse`
  - `Zava.Marketing.Warehouse`
 
To build end-to-end ELT and reporting, each domain needs **read-only views** to access data from the other domain:
- `Sales` needs marketing engagement by customer.
- `Marketing` needs sales performance by campaign.

You need to:
- Establish **one-way cross-warehouse dependencies** via database references.
- Avoid **cyclic dependencies**.

### Ensure dependencies between warehouses are one-way

For each pair of warehouses, choose a **direction for logical dependency**:

Example:
- `Sales` depends on `Marketing` for engagement data.
- `Marketing` doesn't depend on `Sales` for any objects that are needed *at deploy time*.

In practice:

`Zava.Sales.Warehouse` has a **database reference** to `Zava.Marketing.Warehouse`.

- T-SQL in the `Sales` warehouse can use three-part names like:
    ```sql
    SELECT * FROM ZavaMarketingWarehouse.Marketing.CampaignEngagement
    ```
- `Zava.Marketing.Warehouse` does **not** reference `Sales` objects that would force a dependency cycle at deploy time.

> [!TIP]
> For each pair of warehouses, draw a simple arrow diagram (`Sales` → `Marketing`). If you find arrows pointing in both directions for the **same type of object**, refactor the design to restore a one-way dependency.

#### Avoid cyclic dependencies

A **cyclic dependency** happens when Warehouse A and Warehouse B both depend on each other in a way that the engine can't resolve in a single deployment.

**Problem example (don't do this):**

- `ZavaSalesWarehouse.dbo.CustomerRollup` view:
    ```sql
    CREATE VIEW dbo.CustomerRollup AS
    SELECT  c.CustomerId,
            c.TotalRevenue,
            m.LastCampaignId
    FROM    dbo.CustomerRevenue AS c
    LEFT OUTER JOIN   
            ZavaMarketingWarehouse.dbo.CustomerEngagement AS m
            ON c.CustomerId = m.CustomerId;
    ```
- `ZavaMarketingWarehouse.dbo.CampaignAttribution` view:
    ```sql
    CREATE VIEW dbo.CampaignAttribution AS
    SELECT  m.CampaignId,
            SUM(s.TotalRevenue) AS RevenueAttributed
    FROM    dbo.Campaigns AS m
    LEFT OUTER JOIN    
            ZavaSalesWarehouse.dbo.CustomerRollup AS s
            ON m.CampaignId = s.LastCampaignId
    GROUP BY m.CampaignId;
    ```

In this anti-pattern:

- `CustomerRollup` in **Sales** depends on `CustomerEngagement` in **Marketing**.
- `CampaignAttribution` in **Marketing** depends on `CustomerRollup` in **Sales.**

This anti-pattern creates a cycle: Sales view → Marketing view → Sales view again.

**Guidance:**

Don't model **mutual dependencies** between warehouses as regular schema-level objects. If you truly need this kind of logic, move **one side** of the dependency into a downstream **semantic model** or **report** that joins the two warehouses at query time.

## Direct cross-warehouse references via database references

In this pattern, you model **one-way dependencies** directly in the database projects using **Database References**.

### Step 1: Start from two existing warehouse projects

You should already have:

- `Zava.Sales.Warehouse` → deployed to `ZavaSalesWarehouse`
- `Zava.Marketing.Warehouse` → deployed to `ZavaMarketingWarehouse`

Each project was created or extracted using the steps in [**Develop warehouse projects in Visual Studio Code**](develop-warehouse-project.md).

### Step 2: Add a database reference from Sales to Marketing

- In Visual Studio Code, open the **Database Projects** view.
- Right-click the `Zava.Sales.Warehouse` project.
- Select **Add Database Reference...**.
- Choose one of:
   - **Database project in current workspace** (A database project referenced this way must also be open in Visual Studio Code), or
   - **Data-tier application (.dacpac)** (Assumes you have built if you have a built `.dacpac` for the `Marketing` warehouse).
- Set the reference options:
  - **Reference type:** Same server, different database.
  - **Database name or variable:** Use a SQLCMD variable, for example `[$(MarketingWarehouseName)]`.
 - Save and rebuild the Sales project.
            
In the `.sqlproj` file, you should see an entry similar to:

```xml
<ItemGroup>
  <ArtifactReference Include="..\Zava.Marketing.Warehouse\bin\Debug\Zava.Marketing.Warehouse.dacpac">
    <DatabaseVariableLiteralValue>$(MarketingWarehouseName)</DatabaseVariableLiteralValue>
  </ArtifactReference>
</ItemGroup>
<ItemGroup>
  <SqlCmdVariable Include="MarketingWarehouseName">
    <DefaultValue>ZavaMarketingWarehouse</DefaultValue>
  </SqlCmdVariable>
</ItemGroup>
```

> [!TIP]
> Using a SQLCMD variable for the **remote warehouse name** lets you reuse the same project across all your environments, such as Dev/Test/Prod, where the warehouse names might differ.

### Step 3: Create a cross-warehouse view in Sales

In the `Sales` project, add a view that reads from the `Marketing` warehouse:

```sql
-- schema/Views/dbo.CustomerEngagementFact.sql
CREATE VIEW [dbo].[CustomerEngagementFact] AS
SELECT
    s.CustomerId,
    s.TotalRevenue,
    m.LatestChannel,
    m.LastEngagementDate
FROM dbo.CustomerRevenue AS s
JOIN [$(MarketingWarehouseName)].[dbo].[CustomerEngagement] AS m
    ON s.CustomerId = m.CustomerId;
```
Key points:

- The three-part name `[$(MarketingWarehouseName)].[dbo].[CustomerEngagement]` matches the T-SQL pattern used for cross-warehouse queries in the [Fabric SQL editor](query-warehouse.md).
- DacFx resolves the external database via the **database reference**.

Build the project to ensure there are **no SQL71501 unresolved reference** errors.

### Step 4: Publish the Marketing warehouse, then Sales

To avoid deployment issues:

- **Build and publish** `Zava.Marketing.Warehouse` first:
  - Right-click project → **Build**.
  - Right-click project → **Publish** → choose `ZavaMarketingWarehouse`.
- Once `Marketing` deployment succeeds, **build and publish** `Zava.Sales.Warehouse`:
   - Right-click project → **Build**.
   - Right-click project → **Publish** → choose `ZavaSalesWarehouse`.

The resulting deployment flow is:

 `Zava.Marketing.Warehouse` (no external dependencies) → `Zava.Sales.Warehouse` (depends on `Marketing`)

Now, any T-SQL query in `ZavaSalesWarehouse` can use the `dbo.CustomerEngagementFact` view, which internally reads from the `Marketing` warehouse using cross-warehouse T-SQL.

## Continue learning

- Combine this pattern with **source control and CI/CD guidance** in [Development and deployment](development-deployment.md) and Fabric git integration documentation.
- Extend the Zava Analytics scenario to include **Dev/Test/Prod** environments, using deployment pipelines or external CI/CD to orchestrate publish order across multiple warehouses.

## Related content

- [Development and deployment workflows](development-deployment.md)