---
title: Add Cribl source to an eventstream
description: Learn how to add a Cribl source to an eventstream. This feature is currently in preview.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 11/05/2025
ms.search.form: Source and Destination
ms.custom: reference_regions
---

# Add Cribl source to an eventstream (preview)

This article shows you how to add a Cribl source to an eventstream.

The Cribl source for Eventstream allows you to stream data from Cribl Stream into Fabric Eventstream. You can add Cribl as a source to your eventstream to capture, transform, and route real-time events to various destinations in Fabric.

## Prerequisites

- A Worker Group is set up in Cribl Stream with the required permissions to configure destinations.
- **Contributor** or higher Fabric workspace permissions are required to edit the eventstream to add a Cribl source.
- If you want to use **OAUTHBEARER** authentication to connect your Cribl, you need Member or higher Fabric workspace permissions.
- An eventstream in Fabric. If you don’t have one, [create an eventstream](create-manage-an-eventstream.md).  

## Add Cribl as a source
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

On the **Select a data source** page, search for and select **Connect** on the **Cribl** tile.

:::image type="content" source="media/add-source-cribl/select-cribl-source.png" alt-text="Screenshot that shows the selection of Cribl as the source type in the Select a data source wizard." lightbox="media/add-source-cribl/select-cribl-source.png":::

## Configure and connect to Cribl

1. On the **Configure connection settings** page, enter a **Name** for the Cribl source. Then select **Next**.

   :::image type="content" source="media/add-source-cribl/next.png" alt-text="Screenshot that shows the configured settings page." lightbox="media/add-source-cribl/next.png":::

1. On the **Review + connect** page, review the configuration summary for the Cribl source, and select **Add** to complete the setup.

   :::image type="content" source="media/add-source-cribl/review.png" alt-text="Screenshot that shows the review configuration page." lightbox="media/add-source-cribl/review.png":::

1. After you create the Cribl source, it's added to your eventstream on the canvas in edit mode. To implement the newly Cribl data source, select **Publish**.

   :::image type="content" source="media/add-source-cribl/publish.png" alt-text="Screenshot that shows the cribl source in edit mode." lightbox="media/add-source-cribl/publish.png":::

1. After you successfully publish the eventstream, you can retrieve the details of the Kafka endpoint that is needed in Cribl service portal to set up the connection. 

   :::image type="content" source="media/add-source-cribl/details.png" alt-text="Screenshot that shows the cribl source details in live view." lightbox="media/add-source-cribl/details.png":::

1. Sign in to Cribl service with your account. On the top bar, select **Products**, and then select **Cribl Stream**. Under **Worker Groups**, select a Worker Group to **Add Destination**.

   :::image type="content" source="media/add-source-cribl/add-destination-cribl.png" alt-text="Screenshot that shows in the cribl cloud add eventstream as destination." lightbox="media/add-source-cribl/add-destination-cribl.png":::

1. Select **Fabric Real-Time Intelligence**.

   :::image type="content" source="media/add-source-cribl/select-eventstream-destination.png" alt-text="Screenshot that shows in the cribl cloud select eventstream." lightbox="media/add-source-cribl/select-eventstream-destination.png":::

1. Under **General Settings**, configure the following under General Settings:

   - `Output ID`: Enter a unique name to identify this Fabric Real-Time Intelligence destination. 
   - `Description`: Optionally, enter a description.
   - `Bootstrap server`: Format it as `yourdomain.servicebus.windows.net:9093`. You can copy this value from the Eventstream Cribl source's details pane.
   - `Topic name`: Similarly, you can get it in the Eventstream Cribl source's details pane as below.

   :::image type="content" source="media/add-source-cribl/server-topic.png" alt-text="Screenshot that shows how to get Bootstrap server and Topic name in eventstream." lightbox="media/add-source-cribl/server-topic.png":::

1. Navigate to **Authentication**. For **SASL mechanism**, select either **OAUTHBEARER** or **PLAIN**. Expand the section below based on your selection to view detailed steps:

   ### [OAUTHBEARER](#tab/oauthbearer)

   1. [Create a service principal App in Microsoft Entra admin center](https://entra.microsoft.com/) if you don’t have one.
   1. Go to your Fabric workspace and select **Manage access**.

      :::image type="content" source="media/add-source-cribl/manage-access.png" alt-text="Screenshot that shows how to add workspace access." lightbox="media/add-source-cribl/manage-access.png":::

   1. Search for your application and assign the **Contributor** (or higher) to your app.

      :::image type="content" source="media/add-source-cribl/contributor-role.png" alt-text="Screenshot that shows how to assign contributor role in workspace." lightbox="media/add-source-cribl/contributor-role.png":::

   1. In [Microsoft Entra admin center](https://entra.microsoft.com/). Navigate to **Identity** > **Applications** > **App registrations**, and open your application.
   1. Under **Overview**, copy the **Application (client)** value into the **Client ID** field on the Authentication page. 
   1. Copy the **Directory (tenant) ID** value into the **Tenant identifier** field on the Authentication page. 

      :::image type="content" source="media/add-source-cribl/app-id.png" alt-text="Screenshot that shows how to get app client ID and tenant ID." lightbox="media/add-source-cribl/app-id.png":::

   1. Go to **Certificates & secrets**, copy the **Client secrets** value into the **Client secret** field on the Authentication page. 

      :::image type="content" source="media/add-source-cribl/app-key.png" alt-text="Screenshot that shows how to get app client key." lightbox="media/add-source-cribl/app-key.png":::
         
   1. In the Eventstream Cribl source's details pane, under **SASL mechanism**, select the **Oauthbearer** tab. Then copy the **Scope** value into the **Scope** field on the Authentication page.

      :::image type="content" source="media/add-source-cribl/scope.png" alt-text="Screenshot that shows how to get scope value in an eventstream." lightbox="media/add-source-cribl/scope.png":::

   ### [PLAIN](#tab/plain)

   1. In the Eventstream Cribl source's details pane, under **SASL mechanism**, select the **Plain** tab. Then copy the **SASL JASS password-primary** value into the **SASL JASS password** field on the Authentication page.

      :::image type="content" source="media/add-source-cribl/configure-cribl-jaas-password.png" alt-text="Screenshot that shows how to get JASS password in eventstream." lightbox="media/add-source-cribl/configure-cribl-jaas-password.png":::

1. Select **Save**, and use the Cribl QuickConnect to connect to your Cribl source in Cribl service portal, and then **Commit & Deploy**.
1. After you complete these steps, you can preview the data in your eventstream that is from your Cribl.

   :::image type="content" source="media/add-source-cribl/preview-data.png" alt-text="Screenshot that shows preview data in eventstream live view." lightbox="media/add-source-cribl/preview-data.png":::

## Limitation
* The Cribl source currently doesn't support CI/CD features, including **Git Integration** and **Deployment Pipeline**. Attempting to export or import an Eventstream item with this source to a Git repository may result in errors.    

## Related content

Other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Azure Cosmos DB](add-source-azure-cosmos-db-change-data-capture.md)
- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Azure SQL Database Change Data Capture (CDC)](add-source-azure-sql-database-change-data-capture.md)
- [Confluent Kafka](add-source-confluent-kafka.md)
- [Custom endpoint](add-source-custom-app.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [PostgreSQL Database CDC](add-source-postgresql-database-change-data-capture.md)
- [Sample data](add-source-sample-data.md)
- [Azure Blob Storage events](add-source-azure-blob-storage.md)
- [Fabric workspace event](add-source-fabric-workspace.md)


