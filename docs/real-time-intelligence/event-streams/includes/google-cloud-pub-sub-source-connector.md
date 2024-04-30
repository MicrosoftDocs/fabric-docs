---
title: Google Cloud Pub/Sub connector for Fabric event streams
description: This include file has the common content for configuring Google Cloud Pub/Sub connector for Fabric event streams and Real-Time hub. 
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 04/29/2024
---

1. On the **Connect** screen, under **Connection**, select **New connection**.

1. On the **Connection settings** screen, fill out the required information:

   :::image type="content" source="media/google-cloud-pub-sub-source-connector/connect.png" alt-text="A screenshot of the Connection settings for the Google Cloud Pub/Sub source.":::

1. For **Project ID**, enter the Project ID from your Google Cloud Console.

   ![A screenshot of the Project ID in the Google Cloud Console.](media/google-cloud-pub-sub-source-connector/project.png)

1. For **Subscription name**, open your Google Pub/Sub and select **Subscriptions**. You can find the Subscription ID in the list.

   ![A screenshot of a computer Description automatically generated.](media/google-cloud-pub-sub-source-connector/subscription.png)

1. **Service account key** is a JSON file that contains the credentials of your service account. Follow the next steps to generate the file in Google Cloud.

   1. Select **IAM & Admin** in your Google Cloud Console.

      ![A screenshot of selecting IAM & Admin in Google Cloud Console.](media/google-cloud-pub-sub-source-connector/iam.png)

   1. On the **IAM & Admin** page, under **Service Accounts**, select **CREATE SERVICE ACCOUNT**.

      ![A screenshot of selecting Create service account.](media/google-cloud-pub-sub-source-connector/create-account.png)

   1. After configuring, give your role appropriate **Owner** permission, and then select **Done**.

      ![A screenshot of giving your role Owner permissions and then selecting Done.](media/google-cloud-pub-sub-source-connector/owner.png)

   1. On the **Service accounts** page, select your role and then select **Manage keys** under **Actions**.

      ![A screenshot of selecting Manage keys under Actions.](media/google-cloud-pub-sub-source-connector/actions.png)

   1. Under **ADD KEY**, select **Create new key**.

      ![A screenshot of selecting Create new key.](media/google-cloud-pub-sub-source-connector/add-key.png)

   1. Download the JSON file, copy all the JSON content, and enter it as **Service account key** on the Fabric **Connection settings** screen.

      > ![IMPORTANT]
      > This JSON file can be downloaded only once.

1. Select **Connect** on the **Connection settings** screen.

1. Enter a **Source name** and **Topic name** for the new source, and then select **Next**.

1. Review the summary, and then select **Add**.
