---
title: Extract Data-tier application from Azure Synapse Analytics Dedicated SQL pool  
description: This tutorial provides a step-by-step guide to extract data-tier application (dacpac) of Azure Synapse Dedicated SQL pool to use it in Migration Assistant .
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: pvenkat
ms.date: 04/23/2025
ms.topic: how-to
ms.search.form: Migration Assistant
---

# Extracting a Data-tier Application (DAC) from a Azure Synapse Dedicated SQL Pool in Visual Studio 2022

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

## Overview

This guide provides step-by-step instructions to extract a Data-tier Application (DAC) from a **Azure Synapse Dedicated SQL Pool** using **SQL Server Object Explorer** in **Visual Studio 2022**. This extracted data-tier application (DACPAC) file can be used in Migration assistant to migrate from an Azure Synapse Analytics dedicated SQL pool to Fabric warehouse

> [!TIP]
> For more information on the Migration Assistant's features and capabilities, see [Fabric Migration Assistant for Data Warehouse](migration-assistant.md).
>
> For more information on strategy and planning your migration, see [Migration​ planning: ​Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](migration-synapse-dedicated-sql-pool-warehouse.md).

---

## Pre-requisites

### ✅ Visual Studio Requirements

- Visual Studio 2022 installed (Professional, Enterprise, or Community edition, version 17.0 or later).
- SQL Server Data Tools (SSDT) must be installed (version 17.0.3 or later).

> **Recommended SSDT version:**  
> SSDT for Visual Studio 2022 version **17.0.3 or later**  
> (Supports Azure Synapse Dedicated SQL Pool)

### 🔍 How to Check if SSDT is Installed

#### Option A: Using Visual Studio Installer
1. Open Visual Studio Installer.
2. Click Modify on your Visual Studio 2022 instance.
3. Go to the Workloads tab.
4. Ensure that "Data storage and processing" is selected.

:::image type="content" source="media/migrate-with-migration-assistant/choose-vs-installer-ssdt-workload.png" alt-text="Visual Studio Installer showing SSDT selected in Workloads.":::

#### Option B: From Within Visual Studio
1. Open Visual Studio 2022.
2. Go to `Help > About Microsoft Visual Studio`.
3. Look for "SQL Server Data Tools" or "Microsoft.Data.Tools.Schema.Sql".
4. Ensure version is 17.0.3 or later.

:::image type="content" source="media/migrate-with-migration-assistant/ssdt-version.png" alt-text="About dialog showing SSDT version.":::

### ☁️ Azure Requirements

- Active Azure subscription with a Dedicated SQL Pool provisioned.
- Sufficient permissions to extract metadata (`db_owner` or `dbo` role).
- Access via SQL Authentication or Azure Active Directory Authentication.

---

## Steps to Extract DAC

### Step 1: Open SQL Server Object Explorer

#### Option A: Browse from Azure
1. Launch Visual Studio 2022.
2. Open SQL Server Object Explorer from the View menu.
3. Expand Azure > SQL Data Warehouses (or Dedicated SQL Pools).
4. Sign in and browse to the target database.

:::image type="content" source="media/migrate-with-migration-assistant/azure-sign-in-show-dw.png" alt-text="SQL Server Object Explorer panel showing Azure SQL DW.":::

#### Option B: Manually Connect
1. Click the Add SQL Server icon in SQL Server Object Explorer.
2. In Connect to Server:
   - Server Name: your-server.database.windows.net
   - Authentication: SQL or Azure AD
   - Select the target database
3. Click Connect.

:::image type="content" source="media/migrate-with-migration-assistant/manual-connect.png" alt-text="Manual connect dialog with SQL pool selected.":::

---

### Step 2: Select the Target Database

#### Option A: Right-click from Azure Tree
Right-click the Dedicated SQL Pool and select **"Extract Data-tier Application..."**

#### Option B: Right-click from Manual Connection
1. Expand the SQL Server > Databases node.
2. Right-click the Dedicated SQL Pool.
3. Select **"Extract Data-tier Application..."**


:::image type="content" source="media/migrate-with-migration-assistant/right-click-menu-options.png" alt-text="Right-click menu showing Extract Data-tier Application.":::

---

### Step 3: Configure Extraction Settings
1. Confirm the database name.
2. Choose output location for the `.dacpac` file.
3. Configure optional extraction settings.

:::image type="content" source="media/migrate-with-migration-assistant/extract-dacpac-settings.png" alt-text="DAC Wizard – Configure Extraction Settings.":::

---

### Step 4: Review and Extract
1. Review the summary.
2. Click Next and then Finish.
3. Wait for extraction to complete.

:::image type="content" source="media/migrate-with-migration-assistant/dacpac-extract-complete.png" alt-text="DAC Extraction Progress and Completion Dialog.":::
---

### Step 5: Validate Output
Verify the `.dacpac` file in the selected folder.

---

## Troubleshooting Tips

- **Extract option not visible or disabled?**
  - Ensure database is a Dedicated SQL Pool, not Serverless.
  - Ensure proper permissions.

- **DAC extraction fails?**
  - Check the Output window in Visual Studio.
  - Use manual connection if Azure browsing fails.

  ## Related content

- [Fabric Migration Assistant for Data Warehouse](migration-assistant.md)