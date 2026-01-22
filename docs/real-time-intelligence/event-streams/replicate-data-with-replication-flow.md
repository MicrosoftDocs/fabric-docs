---
title: Replicate SAP Datasphere Data to Eventstream Kafka Endpoint with SAP Replication Flow
description: Learn how to replicate data from SAP Datasphere to a Microsoft Fabric Eventstream using a Kafka custom endpoint and SAP Replication Flow.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: tutorial
ms.custom: sfi-image-nochange, sfi-ropc-nochange
ms.date: 01/20/2026
ms.search.form: Eventstreams Tutorials
---

# Replicate SAP Datasphere Data to Eventstream Kafka Endpoint with SAP Replication Flow

In this tutorial, you learn how to use SAP Datasphere Replication Flow to replicate the data from SAP Datasphere to the Kafka endpoint which is in the Eventstream’s source custom endpoint. Once the data arrives in Eventstream, it can be used for alerting, reporting, or routed to various destinations in Fabric further processing or analysis.

In this tutorial, you will:

> [!div class="checklist"]
>
> - Create an eventstream and add a custom endpoint source
> - Get the Kafka endpoint information from a custom endpoint source
> - Create the Kafka connection in SAP Datasphere
> - Set up the Replication Flow with the Kafka connection in SAP Datasphere
> - Deploy and activate the replication flow to replicate the data to Eventstream

## Prerequisites

- Get access to a workspace with Contributor or higher permissions where your eventstream is located.
- An SAP Datasphere account with ‘Premium Outbound’ support.

## Create an eventstream

1. Navigate to the Fabric portal.
1. Select **My workspace** on the left navigation bar.
1. On the **My workspace** page, select **+ New item** on the command bar.
1. On the **New item** page, search for **Eventstream**, and then select **Eventstream**.

    :::image type="content" source="media/replicate-data-with-replication-flow/create-an-event-stream.png" alt-text="Screenshot of showing how to create an eventstream." lightbox="media/replicate-data-with-replication-flow/create-an-event-stream.png":::

1. In the **New Eventstream** window, enter a **name** for the eventstream, and then select **Create**.

    :::image type="content" source="media/replicate-data-with-replication-flow/enter-event-stream-name.png" alt-text="Screenshot of entering the name of an eventstream." lightbox="media/replicate-data-with-replication-flow/enter-event-stream-name.png":::

1. Creation of the new eventstream in your workspace can take a few seconds. After the eventstream is created, you're directed to the main editor where you can start with adding sources to the eventstream.

    :::image type="content" source="media/replicate-data-with-replication-flow/event-stream-home-page.png" alt-text="Screenshot showing eventstream home page." lightbox="media/replicate-data-with-replication-flow/event-stream-home-page.png":::

## Get the Kafka endpoint information from an added custom endpoint source

To get the Kafka topic endpoint information from an eventstream, add a custom endpoint source to your eventstream. The Kafka connection endpoint is then readily available and exposed within the custom endpoint source.

1. To add a custom endpoint source, on the get-started page, select **Use custom endpoint**.

    :::image type="content" source="media/replicate-data-with-replication-flow/add-custom-endpoint.png" alt-text="Screenshot of showing how to add a custom endpoint as a source." lightbox="media/replicate-data-with-replication-flow/add-custom-endpoint.png":::

1. In the **Custom endpoint** dialog, enter a name for the custom source under **Source name**, and then select **Add**.

    :::image type="content" source="media/replicate-data-with-replication-flow/custom-endpoint-wizard.png" alt-text="Screenshot of showing the custom endpoint wizard." lightbox="media/replicate-data-with-replication-flow/custom-endpoint-wizard.png":::

1. After you create the custom endpoint source, it's added to your eventstream on the canvas in edit mode. To enable the newly added custom endpoint source, select **Publish**.

    :::image type="content" source="media/replicate-data-with-replication-flow/publish-event-stream.png" alt-text="Screenshot of showing how to publish an eventstream." lightbox="media/replicate-data-with-replication-flow/publish-event-stream.png":::

1. After you successfully publish the eventstream, you can retrieve the detailed information about Kafka endpoint that is needed to configure the Kafka connection in SAP Datasphere later.

    Select the custom endpoint source tile on the canvas. Then, in the bottom pane of the custom endpoint source node, select the **Kafka** tab. On the **SAS Key Authentication** page, you can get the following important Kafka endpoint information:
    
    - Bootstrap servers
    - Topic name
    - Connection string (primary or secondary)
    - Security protocol = SASL_SSL
    - SASL mechanism = PLAIN

    :::image type="content" source="media/replicate-data-with-replication-flow/key-authentication.png" alt-text="Screenshot of showing how to get the SAS key authentication of kafka custom endpoint." lightbox="media/replicate-data-with-replication-flow/key-authentication.png":::

    This information is used in following step when configuring the SAP Datasphere Kafka connection.

## Create Kafka connection in SAP Datasphere

To define the Replication Flow in SAP Datasphere, a Kafka connection needs to be created first with the Kafka endpoint information that is from Eventstream’s custom endpoint source.

1. In the connection management tab of an SAP Datasphere space, select **Apache Kafka** connection type in the connection creation wizard:

    :::image type="content" source="media/replicate-data-with-replication-flow/select-apache-kafka.png" alt-text="Screenshot of showing selecting Apache kafka data type." lightbox="media/replicate-data-with-replication-flow/select-apache-kafka.png":::

1. Configure the connection properties in the second step of the wizard with the Kafka information from Eventstream’s custom endpoint source:

    - **Kafka Brokers**: it's the **bootstrap server** in Eventstream’s source custom endpoint.
    - **Authentication Type**: select “User Name And Password.”
    - **Kafka SASL User Name**: use constant value **“$ConnectionString”**.
    - **Kafka SASL Password**: can be either the **Connection string-primary key** value or the **Connection string-secondary key** value in Eventstream’s source custom endpoint.
    - **Replication Flows**: “Enable”.

    Select **Save** to get this new Kafka connection created after filling in all needed information.

    :::image type="content" source="media/replicate-data-with-replication-flow/connection-properties.png" alt-text="Screenshot of showing connection properties of Apache kafka." lightbox="media/replicate-data-with-replication-flow/connection-properties.png":::

## Create Replication Flow with Kafka connection as target

Replication Flow allows you to replicate the data from the sources in SAP to a target. Kafka connection is one of the supported targets for Replication Flow. For more information regarding the Replication Flow, see [Creating a Replication Flow | SAP Help Portal](https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/25e2bd7a70d44ac5b05e844f9e913471.html).

Following the steps below to create a Replication Flow with Kafka connection target.

1. Select **Data Builder** in the left navigation and select **New Replication Flow** to open the editor. 

    :::image type="content" source="media/replicate-data-with-replication-flow/create-data-builder.png" alt-text="Screenshot of showing how to create data builder." lightbox="media/replicate-data-with-replication-flow/create-data-builder.png":::

1. Select a source connection and a source container, then add source objects. The supported source objects can be found in [Creating a Replication Flow | SAP Help Portal](https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/25e2bd7a70d44ac5b05e844f9e913471.html).

    :::image type="content" source="media/replicate-data-with-replication-flow/create-replication-flow.png" alt-text="Screenshot of showing how to create a replication." lightbox="media/replicate-data-with-replication-flow/create-replication-flow.png":::

1. In the target configuration, select the Kafka connection that is created in previous step as the target connection:

    :::image type="content" source="media/replicate-data-with-replication-flow/target-connection.png" alt-text="Screenshot of showing how to create a target connection." lightbox="media/replicate-data-with-replication-flow/target-connection.png":::

1. **IMPORTANT**: by default, the target object name will automatically be assigned according to the source object name. The target object name is the name of the Kafka topic that is to be created and receive the data from source object. Since the Kafka topic for receiving data in Eventstream already exists, **it is critical to rename the target object name to the ‘Topic name’ shown in Eventstream’s source custom endpoint**.

    :::image type="content" source="media/replicate-data-with-replication-flow/target-object-name.png" alt-text="Screenshot of showing how to define target object name." lightbox="media/replicate-data-with-replication-flow/target-object-name.png":::

    > [!NOTE]
    > Don't select ‘Delete All Before Loading’ in the target object setting. If this setting is selected, you see the error like “Target setup failed due to the following error: couldn't delete topic: kafka server: The client isn't authorized to access this topic. CorrelationId: xxxx.”.
    >
    >:::image type="content" source="media/replicate-data-with-replication-flow/delete-all-before-loading.png" alt-text="Screenshot of noticing don't select Delete All Before Loading." lightbox="media/replicate-data-with-replication-flow/delete-all-before-loading.png":::

## Deploy and activate the Replication Flow

After the Replication Flow is created and configured with proper source and target objects, it can be deployed and activated through the command buttons in the ribbon. You can check the status in the monitoring environment in SAP Datasphere.

:::image type="content" source="media/replicate-data-with-replication-flow/status.png" alt-text="Screenshot of showing how to check the status in the monitoring environment in SAP Datasphere." lightbox="media/replicate-data-with-replication-flow/status.png":::

You can now verify the end-to-end flow via Eventstream    to confirm whether data is being received. In the Fabric portal, open your eventstream, and select the default stream node - which appears as the central node displaying your eventstream's name - to preview the data present in your eventstream.

:::image type="content" source="media/replicate-data-with-replication-flow/event-stream-data-preview.png" alt-text="Screenshot of showing data preview in eventstream live view." lightbox="media/replicate-data-with-replication-flow/event-stream-data-preview.png":::

## Related content

This tutorial showed you how to use Replication Flow to transfer data from SAP Datasphere to your eventstream via Eventstream’s source custom endpoint. Once the data reaches eventstream, you can process it and route it to different destinations for analysis, alerts, and reports. Below are some helpful resources for further reference:

- [Microsoft Fabric Eventstreams Overview](./overview.md)  
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md) 
- [Process Event Data with the Event Processing Editor](./process-events-using-event-processor-editor.md)  
- [Process Events Using a SQL Operator](./process-events-using-sql-code-editor.md)
