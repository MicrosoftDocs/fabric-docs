---
title: How to access on-premises data sources in Data Factory
description: This article describes how to configure a gateway to access on-premises data sources from Data Factory for Microsoft Fabric.
author: lrtoyou1223
ms.author: lle
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: On-premises data sources gateway
---

# How to access on-premises data sources in Data Factory for Microsoft Fabric

Data Factory for Microsoft Fabric is a powerful cloud-based data integration service that allows you to create, schedule, and manage workflows for various data sources. In scenarios where your data sources are located on-premises, Microsoft provides the On-Premises Data Gateway to securely bridge the gap between your on-premises environment and the cloud. This document guides you through the process of accessing on-premises data sources within Data Factory for Microsoft Fabric using the On-Premises Data Gateway.

## Create an on-premises data gateway

1. An on-premises data gateway is a software application designed to be installed within a local network environment. It provides a means to directly install the gateway onto your local machine. For detailed instructions on how to download and install the on-premises data gateway, refer to [Install an on-premises data gateway](/data-integration/gateway/service-gateway-install).

   :::image type="content" source="media/how-to-access-on-premises-data/gateway-setup.png" alt-text="Screenshot showing the on-premises data gateway setup.":::

1. Sign-in using your user account to access the on-premises data gateway, after which it's prepared for utilization.

   :::image type="content" source="media/how-to-access-on-premises-data/gateway-setup-after-sign-in.png" alt-text="Screenshot showing the on-premises data gateway setup after the user signed in.":::

## Create a connection for your on-premises data source

1. Navigate to the [admin portal](https://app.powerbi.com) and select the settings button (an icon that looks like a gear) at the top right of the page. Then choose **Manage connections and gateways** from the dropdown menu that appears.

   :::image type="content" source="media/how-to-access-on-premises-data/manage-connections-gateways.png" alt-text="Screenshot showing the Settings menu with Manage connections and gateways highlighted.":::

1. On the **New connection** dialog that appears, select **On-premises** and then provide your gateway cluster, along with the associated resource type and relevant information.

   :::image type="content" source="media/how-to-access-on-premises-data/new-connection-details.png" alt-text="Screenshot showing the New connection dialog with On-premises selected.":::

## Connect your on-premises data source to a Dataflow Gen2 in Data Factory for Microsoft Fabric

1. Go to your workspace and create a Dataflow Gen2.

   :::image type="content" source="media/how-to-access-on-premises-data/create-new-dataflow.png" alt-text="Screenshot showing a demo workspace with the new Dataflow Gen2 option highlighted.":::

   > [!NOTE]
   > Please be aware that the Fabric pipeline currently does not offer support for on-premises data sources. However, you can implement a workaround by initially transferring the data to a cloud storage using a Dataflow Gen2.

1. Add a new source to the dataflow and select the connection established in the previous step.

   :::image type="content" source="media/how-to-access-on-premises-data/connect-data-source.png" lightbox="media/how-to-access-on-premises-data/connect-data-source.png" alt-text="Screenshot showing the Connect to data source dialog in a Dataflow Gen2 with an on-premises source selected.":::

1. You can use the Dataflow Gen2 to perform any necessary data transformations based on your requirements.

   :::image type="content" source="media/how-to-access-on-premises-data/transform-data-inline.png" lightbox="media/how-to-access-on-premises-data/transform-data.png" alt-text="Screenshot showing the Power Query editor with some transformations applied to the sample data source.":::

1. Use the **Add data destination** button on the **Home** tab of the Power Query editor to add a destination for your data from the on-premises source.

   :::image type="content" source="media/how-to-access-on-premises-data/add-destination-inline.png" lightbox="media/how-to-access-on-premises-data/add-destination.png" alt-text="Screenshot showing the Power Query editor with the Add data destination button selected, showing the available destination types.":::

1. Publish the Dataflow Gen2.

   :::image type="content" source="media/how-to-access-on-premises-data/publish-dataflow-inline.png" lightbox="media/how-to-access-on-premises-data/publish-dataflow.png" alt-text="Screenshot showing the Power Query editor with the Publish button highlighted.":::

Now you've created a Dataflow Gen2 to load data from an on-premises data source into a cloud destination.

## Using on-premises data in a pipeline

Fabric pipelines can leverage on-premises data gateway for on-premises data access and data movement. Although Fabric pipeline currently does not offer support for on-premises data sources directly, you can implement a workaround by initially transferring the data to cloud storage using a Dataflow Gen2 as described in this article, and then accessing the cloud storage from the pipeline to work with the data.

## Related content

- [On-premises data gateway considerations for output destinations](gateway-considerations-output-destinations.md)
- [Known issues with the on-premises data gateway](known-issue-gateway.md)
