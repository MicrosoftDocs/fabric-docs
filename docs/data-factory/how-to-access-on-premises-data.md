---
title: How to access on-premises data sources in Data Factory
description: This article describes how to configure a gateway to access on-premises data sources from Data Factory for Microsoft Fabric.
author: lrtoyou1223
ms.author: lle
ms.topic: how-to
ms.custom:
ms.date: 05/23/2025
ms.search.form: On-premises data sources gateway
---

# How to access on-premises data sources in Data Factory for Microsoft Fabric

Data Factory for Microsoft Fabric is a cloud-based, data integration service that allows you to create, schedule, and manage workflows for various data sources. When your data sources are located on-premises, Microsoft provides the On-Premises Data Gateway to securely bridge the gap between your on-premises environment and the cloud. This document guides you through the process of creating and connecting to this gateway to access your on-premises data sources.

## Available connection types

For a comprehensive list of the connectors supported for on-premises data types and details for how to connect to each type, refer to [Data pipeline connectors in Microsoft Fabric](pipeline-support.md) and your source's specific connector page.
Available connection types supported for on-premises connections include:

   - Entra ID
   - Adobe Analytics
   - Analysis Services
   - Azure Blob Storage
   - Azure Data Lake Storage Gen2
   - Azure Table Storage
   - Essbase
   - File
   - Folder
   - Google Analytics
   - IBM DB2
   - MySQL
   - OData
   - ODBC
   - OLE DB
   - Oracle
   - PostgreSQL
   - Salesforce
   - SAP Business Warehouse Message Server
   - SAP Business Warehouse Server
   - SAP HANA
   - SharePoint
   - SQL Server
   - Sybase
   - Teradata
   - Web

## Create an on-premises data gateway

1. An on-premises data gateway is a software application designed to be installed within a local network environment. It provides a means to directly install the gateway onto your local machine. For detailed instructions on how to download and install the on-premises data gateway, refer to [Install an on-premises data gateway](/data-integration/gateway/service-gateway-install).

   :::image type="content" source="media/how-to-access-on-premises-data/gateway-setup.png" alt-text="Screenshot showing the on-premises data gateway setup.":::

1. Sign-in using your user account to access the on-premises data gateway, after which it's prepared for utilization.

   :::image type="content" source="media/how-to-access-on-premises-data/gateway-setup-after-sign-in.png" alt-text="Screenshot showing the on-premises data gateway setup after the user signed in.":::

> [!NOTE]
> An on-premises data gateway of version higher than or equal to 3000.214.2 is required to support Fabric pipelines.

## Create a connection for your on-premises data source

1. Navigate to the [admin portal](https://app.powerbi.com) and select the settings button (an icon that looks like a gear) at the top right of the page. Then choose **Manage connections and gateways** from the dropdown menu that appears.

   :::image type="content" source="media/how-to-access-on-premises-data/manage-connections-gateways.png" alt-text="Screenshot showing the Settings menu with Manage connections and gateways highlighted.":::

1. On the **New connection** dialog that appears, select **On-premises** and then provide your gateway cluster, along with the associated resource type and relevant information.

   :::image type="content" source="media/how-to-access-on-premises-data/new-connection-details.png" alt-text="Screenshot showing the New connection dialog with On-premises selected.":::

   >[!TIP]
   >Refer to the [data pipeline connectors in Microsoft Fabric article](pipeline-support.md) and specific connector articles for details like supported authentication types for your source or troubleshooting information.

## Connect your on-premises data source to a Dataflow Gen2 in Data Factory for Microsoft Fabric

In this example, you'll create a Dataflow Gen2 to load data from an on-premises data source to a cloud destination.

1. [Create an on-premises data gateway to connect to your source.](#create-an-on-premises-data-gateway)

1. [Create a connection to your on-premises data source.](#create-a-connection-for-your-on-premises-data-source)

1. Go to your workspace and create a Dataflow Gen2.

   :::image type="content" source="media/how-to-access-on-premises-data/create-new-dataflow.png" alt-text="Screenshot showing a demo workspace with the new Dataflow Gen2 option highlighted.":::

1. Add a new source to the dataflow and select the connection established in the previous step.

   :::image type="content" source="media/how-to-access-on-premises-data/connect-data-source.png" lightbox="media/how-to-access-on-premises-data/connect-data-source.png" alt-text="Screenshot showing the Connect to data source dialog in a Dataflow Gen2 with an on-premises source selected.":::

1. You can use the Dataflow Gen2 to perform any necessary data transformations based on your requirements.

   :::image type="content" source="media/how-to-access-on-premises-data/transform-data-inline.png" lightbox="media/how-to-access-on-premises-data/transform-data.png" alt-text="Screenshot showing the Power Query editor with some transformations applied to the sample data source.":::

1. Use the **Add data destination** button on the **Home** tab of the Power Query editor to add a destination for your data from the on-premises source.

   :::image type="content" source="media/how-to-access-on-premises-data/add-destination-inline.png" lightbox="media/how-to-access-on-premises-data/add-destination.png" alt-text="Screenshot showing the Power Query editor with the Add data destination button selected, showing the available destination types.":::

1. Publish the Dataflow Gen2.

   :::image type="content" source="media/how-to-access-on-premises-data/publish-dataflow-inline.png" lightbox="media/how-to-access-on-premises-data/publish-dataflow.png" alt-text="Screenshot showing the Power Query editor with the Publish button highlighted.":::

## Use on-premises data in a pipeline

In this example, you'll create and run a [pipeline](pipeline-runs.md) to load data from an on-premises data source into a cloud destination.

1. [Create an on-premises data gateway to connect to your source.](#create-an-on-premises-data-gateway)

1. [Create a connection to your on-premises data source.](#create-a-connection-for-your-on-premises-data-source)

1. Go to your workspace and create a data pipeline.

   :::image type="content" source="media/how-to-access-on-premises-data/create-pipeline.png" alt-text="Screenshot showing how to create a new data pipeline.":::

   > [!NOTE]
   > You need to configure the firewall to allow outbound connections ***.frontend.clouddatahub.net**  from the gateway for Fabric pipeline capabilities. 

1. From the Home tab of the pipeline editor, select **Copy data** and then **Use copy assistant**. Add a new source to the activity in the assistant's **Choose data source** page, then select the connection established in the previous step.

   :::image type="content" source="media/how-to-access-on-premises-data/choose-data-source.png" lightbox="media/how-to-access-on-premises-data/choose-data-source.png" alt-text="Screenshot showing where to choose a new data source from the Copy data activity.":::

1. Select a destination for your data from the on-premises data source.

   :::image type="content" source="media/how-to-access-on-premises-data/choose-destination.png" lightbox="media/how-to-access-on-premises-data/choose-destination.png" alt-text="Screenshot showing where to choose the data destination in the Copy activity.":::

1. Run the pipeline.

   :::image type="content" source="media/how-to-access-on-premises-data/run-pipeline.png" lightbox="media/how-to-access-on-premises-data/run-pipeline.png" alt-text="Screenshot showing where to run the pipeline in the pipeline editor window.":::

> [!NOTE]
> Local access to the machine with the on-premises data gateway installed isn't allowed in data pipelines.

## Use on-premises data in a Copy job

In this example, we'll show you how to connect a [Copy job](what-is-copy-job.md#supported-connectors) on an on-premises data source.

1. [Create an on-premises data gateway to connect to your source.](#create-an-on-premises-data-gateway)

1. Navigate to your workspace and create a new **Copy job.**

   :::image type="content" source="media/how-to-access-on-premises-data/create-copy-job.png" lightbox="media/how-to-access-on-premises-data/create-copy-job.png" alt-text="Screenshot showing the new item menu in the Microsoft Fabric workspace with Copy job highlighted.":::

1. In the Copy job wizard, on the Choose data source page, go to **New sources**, and select your source. In this example, we're using SQL Server database.

   :::image type="content" source="media/how-to-access-on-premises-data/copy-job-choose-data-source.png" lightbox="media/how-to-access-on-premises-data/copy-job-choose-data-source.png" alt-text="Screenshot of the Copy job wizard with a new source selected.":::

1. In the **Connect to data source** section, enter your connection details. Once provided, the on-premises data gateway connection created in earlier is automatically populated based on your configuration.  

   :::image type="content" source="media/how-to-access-on-premises-data/copy-job-connection-details.png" lightbox="media/how-to-access-on-premises-data/copy-job-connection-details.png" alt-text="Screenshot of the connect to data source page with the connection details highlighted for the on-premises source.":::

1. Choose the target destination where you want to load the data from your source.

   :::image type="content" source="media/how-to-access-on-premises-data/copy-job-destination.png" lightbox="media/how-to-access-on-premises-data/copy-job-destination.png" alt-text="Screenshot showing where to choose the data destination in the Copy job wizard.":::

1. On the **Map to destination** and **Settings** pages, review and configure the data mapping and Copy job mode settings.
1. Then, on the **Review + Save** page, select **Save + Run** to execute the Copy job.

   :::image type="content" source="media/how-to-access-on-premises-data/copy-job-save-run.png" lightbox="media/how-to-access-on-premises-data/copy-job-save-run.png" alt-text="Screenshot of the Review and save menu of the Copy job wizard, with the Save + Run button highlighted.":::

## Related content

- [Connector overview](connector-overview.md)
- [On-premises data gateway considerations for output destinations](gateway-considerations-output-destinations.md)
- [Known issues in Fabric - including the on-premises data gateway](../known-issues/fabric-known-issues.md)
