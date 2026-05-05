---
title: Cribl connector for Fabric event streams
description: This file has the common content for configuring a Cribl connector for Fabric event streams and Real-Time hub. 
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 04/06/2026
author: spelluru
ms.author: spelluru
ms.service: fabric
ms.subservice: rti-eventstream
---

1. On the **Configure connection settings** page, enter a **Name** for the Cribl source. Then select **Next**.

   :::image type="content" source="media/cribl-source-connector/next.png" alt-text="Screenshot that shows the configured settings page." lightbox="media/cribl-source-connector/next.png":::

1. On the **Review + connect** page, review the configuration summary for the Cribl source, and select **Add** to complete the setup.

   :::image type="content" source="media/cribl-source-connector/review.png" alt-text="Screenshot that shows the review configuration page." lightbox="media/cribl-source-connector/review.png":::

1. After you create the Cribl source, it's added to your eventstream on the canvas in edit mode. To implement the newly Cribl data source, select **Publish**.

   :::image type="content" source="media/cribl-source-connector/publish.png" alt-text="Screenshot that shows the cribl source in edit mode." lightbox="media/cribl-source-connector/publish.png":::

1. After you successfully publish the eventstream, you can retrieve the details of the Kafka endpoint that is needed in Cribl service portal to set up the connection. 

   :::image type="content" source="media/cribl-source-connector/details.png" alt-text="Screenshot that shows the cribl source details in live view." lightbox="media/cribl-source-connector/details.png":::

1. Sign in to Cribl service with your account. On the top bar, select **Products**, and then select **Cribl Stream**. Under **Worker Groups**, select a Worker Group to **Add Destination**.

   :::image type="content" source="media/cribl-source-connector/add-destination-cribl.png" alt-text="Screenshot that shows in the cribl cloud add eventstream as destination." lightbox="media/cribl-source-connector/add-destination-cribl.png":::

1. Select **Fabric Real-Time Intelligence**.

   :::image type="content" source="media/cribl-source-connector/select-eventstream-destination.png" alt-text="Screenshot that shows in the cribl cloud select eventstream." lightbox="media/cribl-source-connector/select-eventstream-destination.png":::

1. Under **General Settings**, configure the following settings:

   - `Output ID`: Enter a unique name to identify this Fabric Real-Time Intelligence destination. 
   - `Description`: Optionally, enter a description.
   - `Bootstrap server`: Format it as `yourdomain.servicebus.windows.net:9093`. You can copy this value from the Eventstream Cribl source's details pane.
   - `Topic name`: Similarly, you can get it in the Eventstream Cribl source's details pane.

   :::image type="content" source="media/cribl-source-connector/server-topic.png" alt-text="Screenshot that shows how to get Bootstrap server and Topic name in eventstream." lightbox="media/cribl-source-connector/server-topic.png":::

1. Navigate to **Authentication**. For **SASL mechanism**, select either **OAUTHBEARER** or **PLAIN**. Expand the section based on your selection to view detailed steps:

   ### [OAUTHBEARER](#tab/oauthbearer)

   1. [Create a service principal App in Microsoft Entra admin center](https://entra.microsoft.com/) if you don’t have one.
   1. Go to your Fabric workspace and select **Manage access**.

      :::image type="content" source="media/cribl-source-connector/manage-access.png" alt-text="Screenshot that shows how to add workspace access." lightbox="media/cribl-source-connector/manage-access.png":::

   1. Search for your application and assign the **Contributor** (or higher) to your app.

      :::image type="content" source="media/cribl-source-connector/contributor-role.png" alt-text="Screenshot that shows how to assign contributor role in workspace." lightbox="media/cribl-source-connector/contributor-role.png":::

   1. In [Microsoft Entra admin center](https://entra.microsoft.com/), navigate to **Identity** > **Applications** > **App registrations**, and open your application.
   1. Under **Overview**, copy the **Application (client)** value into the **Client ID** field on the Authentication page. 
   1. Copy the **Directory (tenant) ID** value into the **Tenant identifier** field on the Authentication page. 

      :::image type="content" source="media/cribl-source-connector/app-id.png" alt-text="Screenshot that shows how to get app client ID and tenant ID." lightbox="media/cribl-source-connector/app-id.png":::

   1. Go to **Certificates & secrets** and copy the **Client secrets** value into the **Client secret** field on the Authentication page. 

      :::image type="content" source="media/cribl-source-connector/app-key.png" alt-text="Screenshot that shows how to get app client key." lightbox="media/cribl-source-connector/app-key.png":::
         
   1. In the Eventstream Cribl source's details pane, under **SASL mechanism**, select the **Oauthbearer** tab. Then copy the **Scope** value into the **Scope** field on the Authentication page.

      :::image type="content" source="media/cribl-source-connector/scope.png" alt-text="Screenshot that shows how to get scope value in an eventstream." lightbox="media/cribl-source-connector/scope.png":::

   ### [PLAIN](#tab/plain)

   - In the Eventstream Cribl source's details pane, under **SASL mechanism**, select the **Plain** tab. Then copy the **SASL JASS password-primary** value into the **SASL JASS password** field on the Authentication page.

      :::image type="content" source="media/cribl-source-connector/configure-cribl-jass-password.png" alt-text="Screenshot that shows how to get JASS password in eventstream." lightbox="media/cribl-source-connector/configure-cribl-jass-password.png":::

1. Select **Save**, and use the Cribl QuickConnect to connect to your Cribl source in Cribl service portal, and then **Commit & Deploy**.
1. After you complete these steps, you can preview the data in your eventstream that is from your Cribl.

   :::image type="content" source="media/cribl-source-connector/preview-data.png" alt-text="Screenshot that shows preview data in eventstream live view." lightbox="media/cribl-source-connector/preview-data.png":::

## Limitation
* The Cribl source currently doesn't support CI/CD features, including **Git Integration** and **Deployment Pipeline**. Attempting to export or import an Eventstream item with this source to a Git repository might result in errors.    
