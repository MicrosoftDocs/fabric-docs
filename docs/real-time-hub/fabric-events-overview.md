---
title: Introduction to Azure and Fabric events
description: This article describes what Fabric and Azure events in Real-Time hub are and how it can be used in near-realtime scenarios.
author: robece
ms.author: robece
ms.topic: overview
ms.custom:
ms.date: 02/27/2025
---

# Introduction to Azure and Fabric events
This overview provides a comprehensive understanding of Fabric events and their capabilities.

Fabric events allow users to subscribe to events produced by Fabric and Azure resources. Fabric events allow downstream processes that have subscribed to these events to be triggered in near real-time, providing an efficient communication model at high scale and higher fault tolerance.

## Key features
**Event sources**: Fabric events support event-driven scenarios where events can be published by various sources, including events produced by your OneLake, items in your workspace or jobs in your tenant. You can also subscribe to events produced from external sources like your Azure blob storage accounts.

**Subscriptions**: Subscriptions (also known as notifications) enable filtering of events per subscription and distribution of selected events to trigger the desired destination when the event occurs. Subscriptions can deliver events via push.
 
## Common scenarios

### Use Workspace item events

Workspace item events are generated when changes occur to items within a Fabric workspace. These events can be triggered by actions such as creating, updating, or deleting workspace items such as lakehouses, notebooks, warehouses, KQL databases, and more. At this time, this does not support events triggered by actions for Power BI items. 

As a data engineer, my daily work involves managing and updating various workspace items. I frequently make changes to notebooks, and I need to ensure these changes are reflected accurately.

With workspace item events, I can set up an alert mechanism using the activator trigger. For example, when a new notebook is created or an existing notebook is updated, my team can receive a Teams chat notification. This way, even if I'm not actively monitoring the workspace, I can stay informed about important changes.

By utilizing these alerts, I can stay informed about critical updates and respond quickly, ensuring the integrity and accuracy of the workspace items.

### Use Job events

Job events are generated when an item in Fabric runs a job. Such as a refresh of a semantic model, a scheduled run of a pipeline, or manually selecting **Run** in a notebook. Each of these actions can generate a corresponding job, which in turn generates a set of corresponding job events. 

As a data engineer. My daily work is to develop and maintain pipelines and notebooks. I often run and test my code, so I also frequently visit monitoring hubs to check the result of the job. However, when I take a lunch break or leave my computer for some other reasons, I can't monitor the job results in time.

With job events, I can set up an alert mechanism with the activator trigger. For example, when the scheduler triggers a new job, or a job fails, I can receive an email alert. This way, even if I'm not in front of the computer, I can still get the information I care about. 

### Use OneLake events

OneLake events are generated when changes occur in your data lake, such as the creation, modification, or deletion of files and folders. These events are particularly beneficial in scenarios where immediate awareness of data changes is critical, such as in fraud detection, data processing, or real-time analytics.
 
As a data engineer, you manage customer data for a marketing team. Whenever new customer data is added or existing data is updated, you need to ensure that the data is transformed and standardized for analysis. By setting up OneLake events, you can initiate data transformation tasks automatically whenever there are updates to the customer data. This approach ensures that the marketing team always has access to the latest and most accurate customer profiles, enabling them to create personalized marketing campaigns and improve customer engagement.
 
With OneLake events, you can set up alerts to notify your team of critical data changes, enabling proactive monitoring and quick response to potential issues. You can also automate your workflows to initiate data transformation tasks whenever existing data is updated, ensuring your analytics are always based on the latest information.
 
By staying ahead of data modifications, you can ensure your operations remain efficient and responsive.

### Use Azure events

Azure Blob Storage events are generated when actions occur on blobs within an Azure 
storage account. These events are triggered by actions such as creating, updating, or deleting blobs.

As a data engineer, my daily work involves managing and processing data stored in Azure Blob Storage. I frequently upload new data, update existing blobs, and delete outdated files. 

With Azure Blob Storage events in Real-Time Hub, I can set up an alert mechanism using the activator trigger. For example, when a new blob is uploaded or an existing blob is deleted, I can receive an email alert. This way, even if I'm not actively monitoring the storage account, I can stay informed about the latest changes in my storage account.

With these alerts, I can ensure that I'm always aware of critical updates and can respond promptly, maintaining the integrity and accuracy of the data stored in Azure Blob Storage.

## Related content

For more information, see the following articles:
- [Build event-driven workflows with Azure and Fabric Events](https://blog.fabric.microsoft.com/blog/build-event-driven-workflows-with-azure-and-fabric-events-now-generally-available)
- [Explore Fabric Job events](explore-fabric-job-events.md).</br>
- [Explore Fabric OneLake events](explore-fabric-onelake-events.md).</br>
- [Explore Fabric workspace item events](explore-fabric-workspace-item-events.md).</br>
- [Explore Azure blob storage events](explore-azure-blob-storage-events.md).

