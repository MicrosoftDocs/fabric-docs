---
title: How to access on-premises data sources in Data Factory
description: This article describes how to configure a gateway to access on-premises data sources from Data Factory for Microsoft Fabric.
ms.reviewer: lle
ms.topic: how-to
ms.custom: configuration
ms.date: 07/02/2025
ms.search.form: On-premises data sources gateway
ai-usage: ai-assisted
---

# Access on-premises data sources in Data Factory for Microsoft Fabric

Data Factory for Microsoft Fabric is a cloud service that helps you move, transform, and manage data from different sources. If your data lives on-premises, you can use the on-premises Data Gateway to connect your local environment to the cloud safely. This guide shows you how to set up and use the gateway so you can easily work with your on-premises data.

## Available connection types

For a complete list of connectors supported for on-premises data types and details on how to connect to each type, see [pipeline connectors in Microsoft Fabric](pipeline-support.md) and your source's specific connector page.

Some available connections include:

- Entra ID
- Adobe Analytics
- [Analysis Services](connector-azure-analysis-services-overview.md)
- [Azure Blob Storage](connector-azure-blob-storage-overview.md)
- [Azure Data Lake Storage Gen2](connector-azure-data-lake-storage-gen2-overview.md)
- [Azure Tables](connector-azure-table-storage-overview.md)
- Essbase
- File
- [Folder](connector-folder-overview.md)
- [Google Analytics](connector-google-analytics-overview.md)
- [IBM Db2](connector-ibm-db2-database-overview.md)
- [MySQL](connector-mysql-database-overview.md)
- [OData](connector-odata-overview.md)
- [ODBC](connector-odbc-overview.md)
- OLE DB
- [Oracle](connector-oracle-database-overview.md)
- [PostgreSQL](connector-postgresql-overview.md)
- [Salesforce](connector-salesforce-objects-overview.md)
- [SAP Business Warehouse Message Server](connector-sap-bw-message-server-overview.md)
- [SAP Business Warehouse Server](connector-sap-bw-application-server-overview.md)
- [SAP HANA](connector-sap-hana-overview.md)
- [SharePoint](connector-sharepoint-folder-overview.md)
- [SQL Server](connector-sql-server-database-overview.md)
- Sybase
- [Teradata](connector-teradata-database-overview.md)
- Web

## Create an on-premises data gateway

An on-premises data gateway is software that you install within your local network. It lets you connect directly from your local machine to the cloud.

> [!NOTE]
> You need an on-premises data gateway version 3000.214.2 or higher to support Fabric pipelines.

To set up your gateway:

1. Download and install the on-premises data gateway. For the installation link and detailed instructions, see: [Install an on-premises data gateway](/data-integration/gateway/service-gateway-install).

   :::image type="content" source="media/how-to-access-on-premises-data/gateway-setup.png" alt-text="Screenshot showing the on-premises data gateway setup.":::

1. Sign in with your user account to access the on-premises data gateway. Once you're signed in, it's ready to use.

   :::image type="content" source="media/how-to-access-on-premises-data/gateway-setup-after-sign-in.png" alt-text="Screenshot showing the on-premises data gateway setup after the user signed in.":::

## Create a connection for your on-premises data source

1. Go to the [admin portal](https://app.powerbi.com) and select the settings button (the gear icon) at the top right of the page. Then choose **Manage connections and gateways** from the dropdown menu.

   :::image type="content" source="media/how-to-access-on-premises-data/manage-connections-gateways.png" alt-text="Screenshot showing the Settings menu with Manage connections and gateways highlighted.":::

1. In the **New connection** dialog, select **On-premises** and then provide your gateway cluster, resource type, and other relevant information.

   :::image type="content" source="media/how-to-access-on-premises-data/new-connection-details.png" alt-text="Screenshot showing the New connection dialog with On-premises selected.":::

   >[!TIP]
   >Check out the [pipeline connectors in Microsoft Fabric article](pipeline-support.md) and specific connector articles for details like supported authentication types for your source or troubleshooting information.

## Connect your on-premises data source to a Dataflow Gen2 in Data Factory for Microsoft Fabric

In this example, you'll create a Dataflow Gen2 to load data from an on-premises data source to a cloud destination.

1. [Create an on-premises data gateway to connect to your source.](#create-an-on-premises-data-gateway)

1. [Create a connection to your on-premises data source.](#create-a-connection-for-your-on-premises-data-source)

1. Go to your workspace and create a Dataflow Gen2.

   :::image type="content" source="media/how-to-access-on-premises-data/create-new-dataflow.png" alt-text="Screenshot showing a demo workspace with the new Dataflow Gen2 option highlighted.":::

1. Add a new source to the dataflow and select the connection you created in the previous step.

   :::image type="content" source="media/how-to-access-on-premises-data/connect-data-source.png" lightbox="media/how-to-access-on-premises-data/connect-data-source.png" alt-text="Screenshot showing the Connect to data source dialog in a Dataflow Gen2 with an on-premises source selected.":::

1. Use the Dataflow Gen2 to perform any data transformations you need.

   :::image type="content" source="media/how-to-access-on-premises-data/transform-data-inline.png" lightbox="media/how-to-access-on-premises-data/transform-data.png" alt-text="Screenshot showing the Power Query editor with some transformations applied to the sample data source.":::

1. Use the **Add data destination** button on the **Home** tab of the Power Query editor to add a destination for your data from the on-premises source.

   :::image type="content" source="media/how-to-access-on-premises-data/add-destination-inline.png" lightbox="media/how-to-access-on-premises-data/add-destination.png" alt-text="Screenshot showing the Power Query editor with the Add data destination button selected, showing the available destination types.":::

1. Publish the Dataflow Gen2.

   :::image type="content" source="media/how-to-access-on-premises-data/publish-dataflow-inline.png" lightbox="media/how-to-access-on-premises-data/publish-dataflow.png" alt-text="Screenshot showing the Power Query editor with the Publish button highlighted.":::

## Use on-premises data in a pipeline

In this example, you'll create and run a [pipeline](pipeline-runs.md) to load data from an on-premises data source into a cloud destination.

1. [Create an on-premises data gateway to connect to your source.](#create-an-on-premises-data-gateway)

1. [Create a connection to your on-premises data source.](#create-a-connection-for-your-on-premises-data-source)

1. Go to your workspace and create a pipeline.

   :::image type="content" source="media/how-to-access-on-premises-data/create-pipeline.png" alt-text="Screenshot showing how to create a new pipeline.":::

   > [!NOTE]
   > You need to configure your firewall to allow outbound connections to ***.frontend.clouddatahub.net** from the gateway for Fabric pipeline capabilities.

1. From the Home tab of the pipeline editor, select **Copy data** and then **Use copy assistant**. Add a new source to the activity in the assistant's **Choose data source** page, then select the connection you created in the previous step.

   :::image type="content" source="media/how-to-access-on-premises-data/choose-data-source.png" lightbox="media/how-to-access-on-premises-data/choose-data-source.png" alt-text="Screenshot showing where to choose a new data source from the Copy data activity.":::

1. Select a destination for your data from the on-premises data source.

   :::image type="content" source="media/how-to-access-on-premises-data/choose-destination.png" lightbox="media/how-to-access-on-premises-data/choose-destination.png" alt-text="Screenshot showing where to choose the data destination in the Copy activity.":::

1. Run the pipeline.

   :::image type="content" source="media/how-to-access-on-premises-data/run-pipeline.png" lightbox="media/how-to-access-on-premises-data/run-pipeline.png" alt-text="Screenshot showing where to run the pipeline in the pipeline editor window.":::

> [!NOTE]
> Local access to the machine with the on-premises data gateway installed isn't allowed in pipelines.

## Use on-premises data in a Copy job

In this example, we'll show you how to connect a [Copy job](what-is-copy-job.md#supported-connectors) to an on-premises data source.

1. [Create an on-premises data gateway to connect to your source.](#create-an-on-premises-data-gateway)

1. Go to your workspace and create a new **Copy job.**

   :::image type="content" source="media/how-to-access-on-premises-data/create-copy-job.png" lightbox="media/how-to-access-on-premises-data/create-copy-job.png" alt-text="Screenshot showing the new item menu in the Microsoft Fabric workspace with Copy job highlighted.":::

1. In the Copy job wizard, on the Choose data source page, go to **New sources**, and select your source. In this example, we're using SQL Server database.

   :::image type="content" source="media/how-to-access-on-premises-data/copy-job-choose-data-source.png" lightbox="media/how-to-access-on-premises-data/copy-job-choose-data-source.png" alt-text="Screenshot of the Copy job wizard with a new source selected.":::

1. In the **Connect to data source** section, enter your connection details. Once you provide them, the on-premises data gateway connection you created earlier is automatically populated based on your configuration.

   :::image type="content" source="media/how-to-access-on-premises-data/copy-job-connection-details.png" lightbox="media/how-to-access-on-premises-data/copy-job-connection-details.png" alt-text="Screenshot of the connect to data source page with the connection details highlighted for the on-premises source.":::

1. Choose the target destination where you want to load the data from your source.

   :::image type="content" source="media/how-to-access-on-premises-data/copy-job-destination.png" lightbox="media/how-to-access-on-premises-data/copy-job-destination.png" alt-text="Screenshot showing where to choose the data destination in the Copy job wizard.":::

1. On the **Map to destination** and **Settings** pages, review and configure the data mapping and Copy job mode settings.
1. Then, on the **Review + Save** page, select **Save + Run** to execute the Copy job.

   :::image type="content" source="media/how-to-access-on-premises-data/copy-job-save-run.png" lightbox="media/how-to-access-on-premises-data/copy-job-save-run.png" alt-text="Screenshot of the Review and save menu of the Copy job wizard, with the Save + Run button highlighted.":::

## Related content

- [Connector overview](connector-overview.md)
- [On-premises data gateway considerations for output destinations](gateway-considerations-output-destinations.md)
- [Known issues in Fabric - including the on-premises data gateway](https://support.fabric.microsoft.com/known-issues/)
