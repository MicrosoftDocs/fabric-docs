---
title: Develop and Deploy Cross-Warehouse Dependencies
description: Learn how to develop and deploy cross-warehouse dependencies in Fabric Data Warehouse using SQL database projects in Visual Studio Code.
ms.reviewer: pvenkat, randolphwest
ms.date: 12/01/2025
ms.topic: how-to
---
# Develop and deploy cross-warehouse dependencies

In this article, you learn how to model and deploy cross-warehouse dependencies using SQL database projects in Visual Studio Code. You start from two existing warehouse projects and configure one-way dependencies between them using database references and, where necessary, pre-deployment and post-deployment scripts.

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
> This article focuses on **warehouse projects** in Visual Studio Code and how you version them in Git as regular code projects. Fabric **Git integration** for workspaces and warehouse items is covered separately in [Source control with Fabric Data Warehouse](source-control.md) and Git integration docs. The article assumes that your Fabric workspace is the deployment target and T-SQL schema lives in one or more Visual Studio Code projects that you version control in Git.
>
> This article **does not cover** cross-warehouse development for the **SQL analytics endpoint of a Lakehouse**. Lakehouse tables and SQL endpoint objects aren't tracked objects in source control the same way warehouse projects are. Use **Warehouse** items with database projects for complete git integration and deployment support in Fabric native experiences and client tools.

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
- Use **pre- and post-deployment scripts** for cases where objects in both warehouses depend on each other.

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
> For each pair of warehouses, draw a simple arrow diagram (`Sales` → `Marketing`). If you find arrows pointing in both directions for the **same type of object**, you probably need to refactor or move some logic into pre- and post-deployment scripts.

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

Don't model **mutual dependencies** between warehouses as regular schema-level objects. If you truly need this kind of logic, move **one side** of the dependency into:

- A **post-deployment script**, or
- A downstream **semantic model** or **report** that joins the two warehouses at query time.
      
#### Use pre and post deployment scripts for deployment sensitive cross-warehouse logic

Because warehouse deployments are **full schema diff** operations (not partial per-object deployments), treat cross-warehouse items carefully:

If Warehouse A and Warehouse B both need objects that depend on each other:
- Keep the **core tables and core views** in each warehouse project.
- Move **bridge views or utility objects** that create cycles into **pre- or post-deployment scripts** in one project.
- Ensure those scripts are **idempotent** and safe to rerun.
         
Example patterns:
- **Pre-deployment script**: temporarily drop a cross-warehouse view before applying schema changes that would break it.
- **Post-deployment script**: recreate or update the cross-warehouse view after both warehouses are deployed.

## Pattern 1: Direct cross-warehouse references via database references

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

## Pattern 2: Cross-warehouse dependencies managed via pre and post deployment scripts

In some Zava Analytics scenarios, **both domains** might need aggregated objects that depend on each other. For example:

- Sales wants a view that uses marketing campaign data to provide sales revenue per marketing campaign.
- Marketing wants a view that uses sales revenue data to provide marketing campaign efficiency.

You don't want both of these objects to be regular views that participate in full model deployment, because that risks a cyclic dependency or fragile deploy ordering.

Instead, you:

- Keep each warehouse's **core model** independent.
- Use **post-deployment scripts** in one project to create more cross-warehouse views after both schemas are in place.

### Step 1: Add database references for compile-time validation

Set up references similar to Pattern 1, but for **both** projects:

- In `Zava.Sales.Warehouse`, add a reference to Marketing via `[$(MarketingWarehouseName)]`.
- In `Zava.Marketing.Warehouse`, optionally add a reference to Sales via `[$(SalesWarehouseName)]` if you want compile-time validation of cross-warehouse views used in scripts.

In the `.sqlproj` files, you might set:

```xml
<SqlCmdVariable Include="SalesWarehouseName">
  <DefaultValue>ZavaSalesWarehouse</DefaultValue>
</SqlCmdVariable>
```

### Step 2: Create core objects as regular project objects

Example:

- `Sales` project:
  - `dbo.CustomerRevenue` table
  - `dbo.SalesByCampaign` view (using only local tables)

- `Marketing` project:
  - `dbo.Campaigns` table
  - `dbo.CampaignStats` view (using only local tables)

These objects don't use cross-warehouse queries. In the next step, we'll introduce cross-warehouse references.

### Step 3: Add a post-deployment script for cross-warehouse bridge views

Choose **one** warehouse to host bridge objects; typically the domain that consumes the combined output most heavily. Suppose `Sales` is that domain.

- In the `Sales` project: Right-click the project, then **Add** → **Post-Deployment Script**.
- Name the script `PostDeployment_CrossWarehouse.sql`.
- In the script, create or alter the cross-warehouse views using `IF EXISTS` / `DROP` / `CREATE` patterns to keep them idempotent.
   
Example of a script in `Sales` that will reference `Marketing` warehouse objects:

```sql
-- PostDeployment_CrossWarehouse.sql

-- Ensure object can be recreated safely
IF OBJECT_ID('dbo.CampaignRevenueBridge', 'V') IS NOT NULL
    DROP VIEW [dbo].[CampaignRevenueBridge];
GO

CREATE VIEW [dbo].[CampaignRevenueBridge] AS
SELECT
    c.CampaignId,
    c.CampaignName,
    m.Channel,
    SUM(s.TotalRevenue) AS Revenue
FROM [$(MarketingWarehouseName)].[dbo].[Campaigns] AS c
JOIN [$(MarketingWarehouseName)].[dbo].[CampaignEngagement] AS m
    ON c.CampaignId = m.CampaignId
JOIN dbo.SalesByCampaign AS s
    ON s.CampaignId = c.CampaignId
GROUP BY
    c.CampaignId,
    c.CampaignName,
    m.Channel;
GO
```

Here:

- The core `Sales` and `Marketing` warehouse projects stay independent and deployable by themselves.
- The **bridge view** is created **after** the schema deployment via post-deployment script.
- If the deployment runs multiple times, it is idempotent, as the script safely drops and recreates the view.

### Step 4: (Optional) Use pre-deployment scripts to protect fragile dependencies

In more advanced scenarios, you might:

- Use a **pre-deployment script** to drop or disable cross-warehouse views that could block schema changes (for example, if you're renaming columns).
- Let DacFx apply the schema diff.
- Use the **post-deployment script** to recreate or update the cross-warehouse views.

> [!IMPORTANT] 
> Pre- and post-deployment scripts run as part of the deployment plan and must be:
>
> - **Idempotent**, meaning they're safe to run multiple times.
> - Compatible with the **final schema** produced by DacFx.
> - Free of destructive changes that conflict with your `BlockOnPossibleDataLoss` policy.

### Step 5: Publish order for script-managed dependencies

A common pattern for Zava Analytics:

- Publish base projects:
  - `Zava.Marketing.Warehouse` (core schema)
  - `Zava.Sales.Warehouse` (core schema + cross-warehouse post-deployment script)
- Let the **Sales** post-deployment script create the bridge views *after* its own schema and the referenced `Marketing` schema are deployed. 

If you introduce more than two warehouses, repeat this pattern in layers. Never create cyclic dependencies via ordinary project objects.

## Continue learning

- Combine these patterns with **source control and CI/CD guidance** in [Source control with Fabric Data Warehouse](source-control.md) and Fabric git integration docs.
- Extend the Zava Analytics scenario to include **Dev/Test/Prod** environments, using deployment pipelines or external CI/CD to orchestrate publish order across multiple warehouses.

## Related content

- [Development and deployment workflows](development-deployment.md)