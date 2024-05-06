---
title: Get events from Google Cloud Pub/Sub in Real-Time hub
description: This article describes how to get events from Google Cloud Pub/Sub as an event source in Fabric Real-Time hub. 
author: ahartoon
ms.author: anboisve
ms.topic: how-to
ms.date: 04/03/2024
---

# Get events from Google Cloud Pub/Sub into Real-Time hub
This article describes how to add Google Cloud Pub/Sub as an event source in Fabric Real-Time hub. Google Pub/Sub is a messaging service that enables you to publish and subscribe to streams of events. 

[!INCLUDE [preview-note](./includes/preview-note.md)]

## Prerequisites 

- Get access to the Fabric **premium** workspace with **Contributor** or above permissions. 
- A Google Cloud account with the Pub/Sub service enabled. Make sure you’ve selected a role with the required permissions. 

### Get connection information from Google Cloud Pub/Sub
Get the following information from Google Cloud:

- Project ID
- Subscription ID
- Service account key

1. Get the **Project ID** from the Google Cloud Console. 

    :::image type="content" source="./media/add-source-google-cloud-pub-sub/project-id.png" alt-text="Screenshot that shows Google Cloud Console that shows a project ID." lightbox="./media/add-source-google-cloud-pub-sub/project-id.png":::
1. Get the **Subscription ID** from the **Subscriptions** page in Google Cloud Pub/Sub.

    :::image type="content" source="./media/add-source-google-cloud-pub-sub/subscription-id.png" alt-text="Screenshot that shows Google Cloud Pub/SUb page that shows a subscription ID." lightbox="./media/add-source-google-cloud-pub-sub/subscription-id.png":::
1. Get the **Service account key**. 
    1. In **Google Cloud Console**, select **IAM & Admin**. 
    
        :::image type="content" source="./media/add-source-google-cloud-pub-sub/admin.png" alt-text="Screenshot that shows  Google Cloud Console that shows the admin page." lightbox="./media/add-source-google-cloud-pub-sub/admin.png":::        
    1. Select **Service Accounts** on the left menu, and then select **Create Service Account**. 

        :::image type="content" source="./media/add-source-google-cloud-pub-sub/create-service-account.png" alt-text="Screenshot that shows Google Cloud Console that shows the Create Service Account page." lightbox="./media/add-source-google-cloud-pub-sub/create-service-account.png":::        
    1. After configuring, give your role appropriate permission (Owner) and select **Done**. 

        :::image type="content" source="./media/add-source-google-cloud-pub-sub/create-service-account-done.png" alt-text="Screenshot that shows Google Cloud Console that shows the completion of creating the service account." lightbox="./media/add-source-google-cloud-pub-sub/create-service-account-done.png":::        
    1. Select your role, and select **Manage keys** in **Actions**.

        :::image type="content" source="./media/add-source-google-cloud-pub-sub/manage-keys.png" alt-text="Screenshot that shows Google Cloud Console that shows the Manage keys button in Actions." lightbox="./media/add-source-google-cloud-pub-sub/manage-keys.png":::        
    1. Select **Add Key** and then select **Create new key**. 

        :::image type="content" source="./media/add-source-google-cloud-pub-sub/create-new-key.png" alt-text="Screenshot that shows Google Cloud Console that shows the selection of Create new key." lightbox="./media/add-source-google-cloud-pub-sub/create-new-key.png":::        
    1. Download the JSON file and copy all the JSON content as the **Service account key**. 
    
        > [!NOTE]
        The JSON file can be downloaded only once. 


[!INCLUDE [launch-get-events-experience](./includes/launch-get-events-experience.md)]

## Add Google Cloud Pub/Sub as a source

1. On the **Select a data source** screen, select **Google Cloud Pub/Sub**.

    :::image type="content" source="./media/add-source-google-cloud-pub-sub/select-google-cloud-pub-sub.png" alt-text="Screenshot that shows the Select a data source page with Google Cloud Pub/Sub selected.":::
1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/add-source-google-cloud-pub-sub/new-connection-link.png" alt-text="Screenshot that shows the Connect page of the Get events wizard with the **New connection** link highlighted." lightbox="./media/add-source-google-cloud-pub-sub/new-connection-link.png"::: 
1. In the **Connection settings** section, specify the **Project ID**. 

    :::image type="content" source="./media/add-source-google-cloud-pub-sub/connection-settings.png" alt-text="Screenshot that shows the Connection settings section of the New connection page." ::: 
1. In the **Connection credentials** section, do these steps:
    1. Select an existing connection or keep the default value: **Create new connection**. 
    1. For **Subscription name**, enter the name of the subscription you noted from Google Cloud Pub/Sub page. 
    1. For **Service account key**, enter the service account key you noted from the Google Cloud Console. 
    1. Select **Connect**.
    
        :::image type="content" source="./media/add-source-google-cloud-pub-sub/connection-credentials.png" alt-text="Screenshot that shows the Connection credentials section of the New connection page." ::: 
1. On the **Connect** page, enter source name and topic name for the new source.
    - **Source name** - Give a name this source.
    - **Topic name** - It can be any string.
1. Select **Next** at the bottom of the page.
1. On the **Review and create** page, review the summary, and select **Create source**. 


## View data stream details

1. On the **Review and create** page, if you select **Open eventstream**, the wizard opens the eventstream that it created for you with the selected Google Cloud Pub/Sub as a source. To close the wizard, select **Close** or **X*** in the top-right corner of the page.
1. In Real-Time hub, switch to the **Data streams** tab of Real-Time hub. Refresh the page. For detailed steps, see [View details of data streams in Fabric Real-Time hub](view-data-stream-details.md).

## Next step
The eventstream has a stream output on which you can [set alerts](set-alerts-data-streams.md). After you open the eventstream, you can optionally add transformations to [transform the data](../real-time-intelligence/event-streams/route-events-based-on-content.md?branch=release-build-fabric#supported-operations) and [add destinations](../real-time-intelligence/event-streams/add-manage-eventstream-destinations.md) to send the output data to a supported destination. For more information, see [Consume data streams](consume-data-streams.md).