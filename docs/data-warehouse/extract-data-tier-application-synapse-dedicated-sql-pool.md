---
title: "Extract a Data-Tier Application (DAC) from an Azure Synapse Dedicated SQL Pool in Visual Studio 2022"
description: This tutorial provides a step-by-step guide to extract a Data-tier Application (DAC) from an Azure Synapse dedicated SQL pool in Visual Studio 2022.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: pvenkat, prlangad
ms.date: 06/09/2025
ms.topic: how-to
---
# Extract a Data-tier Application (DAC) from an Azure Synapse dedicated SQL pool

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

## Overview

This guide provides step-by-step instructions to extract a Data-tier Application (DAC) from an Azure Synapse Analytics dedicated SQL pool using SQL Server Object Explorer in Visual Studio 2022. 

An extracted data-tier application (DACPAC) file can be used in [Migration assistant](migration-assistant.md) to migrate from an Azure Synapse Analytics dedicated SQL pool to Fabric Data Warehouse. For more information, see [Migration​ planning: ​Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](migration-synapse-dedicated-sql-pool-warehouse.md).

## Prerequisites

### Visual Studio requirements

- [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/), Professional, Enterprise, or Community edition, at least version 17.0.
- [SQL Server Data Tools (SSDT)](/sql/ssdt/download-sql-server-data-tools-ssdt#install-ssdt-with-visual-studio), at least version 17.0.3.

#### Check that SSDT is installed

You can easily check if SSDT is present in your Visual Studio 2022 installation.

1. Launch the **Visual Studio Installer** application.
1. Select **Modify** on your Visual Studio 2022 instance.
1. In the **Workloads** tab, in the **Other Toolsets** section, select **Data storage and processing**. 
1. Under **Installation details**, confirm that **SQL Server Data Tools** is checked. 

   If not, select it to download and install.

   :::image type="content" source="media/extract-data-tier-application-synapse-dedicated-sql-pool/choose-vs-installer-ssdt-workload.png" alt-text="Screenshot of the Visual Studio Installer showing SSDT selected." lightbox="media/extract-data-tier-application-synapse-dedicated-sql-pool/choose-vs-installer-ssdt-workload.png":::

### Azure requirements

- Active Azure subscription with a dedicated SQL pool provisioned in an Azure Synapse Analytics workspace. 
    - Extracting a DAC from a standalone dedicated SQL pool (formerly SQL DW) isn't supported. First, [migrate your dedicated SQL pool into Azure Synapse Analytics](/azure/synapse-analytics/sql-data-warehouse/workspace-connected-create).
- Sufficient permissions to extract metadata (`db_owner` or `dbo` or `ddladmin` role).

This guide applies to:

- dedicated SQL pools in a Synapse workspace 
- dedicated SQL pools migrated to a Synapse workspace

Other scenarios to generate a DAC:

- For standalone dedicated SQL pools not in a Synapse workspace, [use the SQLPackage.exe extract action to create the DAC](/sql/tools/sqlpackage/sqlpackage-extract?view=azure-sqldw-latest&preserve-view=true).
- For serverless SQL pools in Azure Synapse Analytics, [use the SQLPackage.exe extract action to create the DAC](/sql/tools/sqlpackage/sqlpackage-extract?view=azure-sqldw-latest&preserve-view=true).

## Extract DAC from dedicated SQL pool

1. First, let's connect to your dedicated SQL pool within Visual Studio. Locate the [connection string for your Azure Synapse workspace](/azure/synapse-analytics/sql/connection-strings).
1. Launch Visual Studio 2022. Open **SQL Server Object Explorer** from the **View** menu.
1. Select the button to **Add SQL Server**. In the **Connect** popup, provide connection information to your dedicated SQL pool.
   - **Server Name**: `<server-name>.sql.azuresynapse.net`
   - **Authentication**: SQL Authentication or choose a Microsoft Entra authentication method for your subscription.
1. Select **Connect**.
1. In the **SQL Server Object Explorer**, expand the connected server. Expand the **Databases** node.
1. Right-click the dedicated SQL pool.
1. Select **Extract Data-tier Application...**
1. Choose output location for the `.dacpac` file.
1. Configure optional extraction settings, or accept the default settings, which include the schema only, not table data.

   :::image type="content" source="media/extract-data-tier-application-synapse-dedicated-sql-pool/target-data-tier-application-settings.png" alt-text="Screenshot of the Extract Data-tier Application wizard.":::

1. Select **OK**.
1. Wait for extraction to complete.
    - If errors were encountered, view the **Data Tools Operations** window for details.
    - Optionally upon completion, select **View Log** to view the steps taken. 

      :::image type="content" source="media/extract-data-tier-application-synapse-dedicated-sql-pool/dacpac-extract-complete.png" alt-text="Screenshot of the log.txt resulting from the DAC extraction successfully completing." lightbox="media/extract-data-tier-application-synapse-dedicated-sql-pool/dacpac-extract-complete.png":::

## Next step

> [!div class="nextstepaction"]
> [Migrate with the Fabric Migration Assistant for Data Warehouse](migrate-with-migration-assistant.md)
