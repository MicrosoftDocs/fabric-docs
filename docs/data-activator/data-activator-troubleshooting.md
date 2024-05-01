---
title: Troubleshooting errors in Data Activator
description: Learn the meaning of errors in Data Activator and how to fix them
author: jamesdhutton
ms.author: jameshutton
ms.topic: concept
ms.custom: 
ms.date: 11/16/2023
---

# Troubleshoot Data Activator Errors

> [!IMPORTANT]
> Data Activator is currently in preview.

If a problem occurs with any of your Data Activator events, objects, or triggers after you have created them, then Data Activator will send you an email alert containing an error code. This article explains the meaning of the error codes that you can receive, and describes the steps you can take to fix the associated problems.

## Data ingestion error codes

The following error codes represent problems that can occur when Data Activator ingests data from Power BI datasets and Eventstreams items.

### PowerBiSourceNotFoundOrInsufficientPermission

This error code means that Data Activator couldn't access the Power BI dataset for your object. This can occur if the dataset has been deleted, or if permissions on the dataset have changed, since you created the alert. To resolve the problem, check if the dataset still exists, and:
1. If it still exists, then ensure that you have permission  to access it.
1. If it has been deleted, then your objects and triggers will no longer function. You should delete them, then recreate them as needed on another dataset.

### QueryEvaluationError

This error code means that Data Activator couldn't query the Power BI dataset for your object. This can occur if the structure of the dataset has changed since you created the alert. To resolve the problem, either:
* Restore the original structure of your dataset, or
* Delete your Data Activator object and recreate your trigger against the dataset

### EventHubNotFound

This error code means that Data Activator couldn't find the Fabric Eventstream for your object. This can occur if the Eventstream for your object has been deleted, or if the connection from your Eventstream to your Data Activator item has been removed. To resolve the problem, reconnect a Fabric eventstream to your Data Activator object.

### EventHubException

This error code means that Data Activator received an exception from Eventstreams when importing your data from your Eventstreams item. To resolve the problem, open your eventstreams item and examine the connection to your Data Activator object, to check for errors in the connection or the eventstream.

### UnauthorizedAccess

This error code means that Data Activator was unauthorized to access the Eventstreams item for your data activator object. This can occur if permission on the Eventstreams item have changed since you connected your Eventsterams item to Data Activator. To resolve the problem, make sure that you have permission to access the Eventstream item.

### IncorrectDataFormat

This error code means that the Eventstreams item connected to your Data Activator object contained data in a format that is not recognized by Data Activator. To resolve the problem, review the data in your Eventstreams item to ensure that it's in JSON dictionary format, as described in [Get data for Data Activator from Eventstreams](data-activator-get-data-eventstreams.md).

## Trigger evaluation error codes

The following error codes represent problems that can occur when Data Activator evaluates your trigger condition to see if the condition has been met.

### ProcessingLimitsReached
This error code indicates that your trigger exceeded data processing limits for one of two reasons:
1. You're sending too many events per second to your Data Activator object, or
2. Your trigger is activating too frequently.

To resolve this problem, either reduce the number of events per second you're sending to your object, or update your trigger condition so that your trigger activates less frequently.

### WorkspaceCapacityDeallocated
This error code means that the Fabric capacity for the your trigger's workspace has been deallocated, so you no longer have Fabric capacity available to process your trigger. To resolve this problem, contact your Fabric capacity administrator to ensure that you have a Fabric capacity assigned to your trigger's workspace.

### DefinitionFailedValidation
This error code means that your trigger definition is invalid. It indicates an internal problem with Data Activator. If you receive this error code, please ask for assistance on the [Data Activator community site](https://community.fabric.microsoft.com/t5/Data-Activator-forums/ct-p/dataactivator).

### MaxDelayReached
The error code means that Data Activator has been unable to receive incoming data for your trigger for the past 7 days, and so has stopped evaluating your trigger. It indicates an internal problem with Data Activator. If you receive this error code, please ask for assistance on the [Data Activator community site](https://community.fabric.microsoft.com/t5/Data-Activator-forums/ct-p/dataactivator).

## Alert and Action Error codes

The following error codes represent problems that can occur when Data Activator attempts to send an alert, or to start a Power Automate flow, after a trigger condition is met.

### UserNotFound

This error code means that Data Activator couldn't locate the recipient of your trigger's email or Teams alert. To resolve this problem, review the recipient field on your trigger's **action** card and make sure that it's set to a valid member of your organization.

### RecipientThrottled

This error code means that Data Activator couldn't alert the recipient of your trigger because the recipient has received too many messages from Data Activator. The article [Data Activator limitations](./data-activator-limitations.md) lists the maximum number of messages that you can send from a trigger. To resolve this problem, change the definition of your trigger so that it activates less often.

### BotBlockedByUser

This error code means that you have a trigger that sends a Teams alert, and the recipient of the alert has blocked the Data 
Activator bot from sending them messages. To resolve this problem, ask the recipient to unblock the bot.

### TeamsAppBlockedInTenant

This error code means that you have a trigger that sends a Teams alert, and your Teams administrator has blocked the Data Activator app. To resolve this problem, ask your Teams administrator to unblock the Data Activator Teams app.

### OfficeSubscriptionMissing

This error code means that Data Activator couldn't send the alert on your trigger because you don't have a Microsoft Office subscription. To resolve the problem, you'll need to get a Microsoft Office subscription.

### TeamsDisabled

This error code means that you have a trigger that sends a Teams alert, and that the administrator of your Microsoft Entra tenant has blocked the Microsoft Teams service principal (SP). To resolve the problem, contact your Microsoft Entra administrator and request that they unblock the Teams SP.


## Related content

* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)
* [Get data for Data Activator from Power BI](data-activator-get-data-power-bi.md)
* [Get data for Data Activator from Eventstreams](data-activator-get-data-eventstreams.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
