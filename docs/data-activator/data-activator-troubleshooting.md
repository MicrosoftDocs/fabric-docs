---
title: Troubleshooting errors in Data Activator
description: Learn the meaning of errors in Data Activator, how to fix them, and troubleshoot common issues in this comprehensive troubleshooting guide
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.date: 09/10/2024
#customer intent: As a Fabric user I want to learn to troubleshoot Data Activator errors.
---

# Troubleshoot Data Activator errors

If a problem occurs with any of your Data Activator events, objects, or triggers after you create them, then Data Activator sends you an email containing an error code. This article explains the meaning of the error codes that you can receive and describes the steps to take to fix the associated problems.

> [!IMPORTANT]
> Data Activator is currently in preview.

## Data ingestion error codes

The following error codes represent problems that can occur when Data Activator ingests data from Power BI semantic models and eventstream items.

### PowerBiSourceNotFoundOrInsufficientPermission

Data Activator can't access the Power BI semantic model for your object. This error occurs if the dataset is deleted or if permissions on the dataset change since you created the alert. To resolve the problem, check if the dataset still exists, and:

* If it still exists, ensure that you have permission  to access it.
* If it's deleted, then your objects and triggers don't function. Delete then recreate them as needed on another semantic model.

### QueryEvaluationError

Data Activator can't query the Power BI semantic model for your object. This error occurs if the structure of the dataset changes after you create the alert. To resolve the problem, either:

* Restore the original structure of your semantic model, or
* Delete your Data Activator object and recreate your trigger against the semantic model.

### EventHubNotFound

Data Activator can't find the Fabric event stream for your object. This error occurs if the event stream for your object is deleted, or if the connection from your event stream to your Data Activator item is removed. To resolve the problem, reconnect a Fabric event stream to your Data Activator object.

### EventHubException

Data Activator receives an exception from event streams when importing your data from your event stream item. To resolve the problem, open your event stream item and examine the connection to your Data Activator object and check for errors in the connection or the event stream.

### UnauthorizedAccess

Data Activator isn't authorized to access the event stream item for your Data Activator object. This occurs when permissions on the event stream item change since you connected your Eventstream item to Data Activator. To resolve the problem, make sure that you have permission to access the event stream item.

### IncorrectDataFormat

The event stream item connected to your Data Activator object contains data in a format that isn't recognized by Data Activator. To resolve the problem, review the data in your event stream item to ensure that it's in JSON dictionary format, as described in [Get data for Data Activator from event streams](data-activator-get-data-eventstreams.md).

## Trigger evaluation error codes

The following error codes represent problems that can occur when Data Activator evaluates your trigger condition to see if the condition is met.

### ProcessingLimitsReached

Your trigger exceeds data processing limits for one of two reasons:

* You're sending too many events per second to your Data Activator object, or
* Your trigger is activating too frequently.

To resolve this problem, either reduce the number of events per second you're sending to your object or update your trigger condition so that your trigger activates less frequently.

### WorkspaceCapacityDeallocated

The Fabric capacity for your trigger's workspace is deallocated, so you no longer have Fabric capacity available to process your trigger. To resolve this problem, contact your Fabric capacity administrator to ensure that you have a Fabric capacity assigned to your trigger's workspace.

### DefinitionFailedValidation

This error code means that your trigger definition is invalid. It indicates an internal problem with Data Activator. If you receive this error code, ask for assistance on the [Data Activator community site](https://community.fabric.microsoft.com/t5/Data-Activator-forums/ct-p/dataactivator).

### MaxDelayReached

The error code means that Data Activator is unable to receive incoming data for your trigger for the past seven days, and is not evaluating your trigger. It indicates an internal problem with Data Activator. If you receive this error code, ask for assistance on the [Data Activator community site](https://community.fabric.microsoft.com/t5/Data-Activator-forums/ct-p/dataactivator).

## Alert and Action Error codes

The following error codes represent problems that can occur when Data Activator attempts to send an alert, or to start a Power Automate flow, after a trigger condition is met.

### UserNotFound

This error code means that Data Activator couldn't locate the recipient of your trigger's email or Teams alert. To resolve this problem, review the recipient field on your trigger's **action** card and make sure that it's set to a valid member of your organization.

### RecipientThrottled

This error code means that Data Activator couldn't alert the recipient of your trigger because the recipient receives too many messages from Data Activator. The article [Data Activator limitations](./data-activator-limitations.md) lists the maximum number of messages that you can send from a trigger. To resolve this problem, change the definition of your trigger so that it activates less often.

### BotBlockedByUser

This error code means that you have a trigger that sends a Teams alert, and the recipient of the alert blocks the Data Activator bot from sending them messages. To resolve this problem, ask the recipient to unblock the bot.

### TeamsAppBlockedInTenant

This error code means that you have a trigger that sends a Teams alert, and your Teams administrator blocks the Data Activator app. To resolve this problem, ask your Teams administrator to unblock the Data Activator Teams app.

### OfficeSubscriptionMissing

This error code means that Data Activator couldn't send the alert on your trigger because you don't have a Microsoft Office subscription. To resolve the problem, you'll need to get a Microsoft Office subscription.

### TeamsDisabled

This error code means that you have a trigger that sends a Teams alert, and that the administrator of your Microsoft Entra tenant blocks the Microsoft Teams service principal (SP). To resolve the problem, contact your Microsoft Entra administrator and request that they unblock the Teams SP.

## Related content

* [What is Data Activator?](data-activator-introduction.md)
* [Get started with Data Activator](data-activator-get-started.md)
* [Get data for Data Activator from Power BI](data-activator-get-data-power-bi.md)
* [Get data for Data Activator from eventstreams](data-activator-get-data-eventstreams.md)
* [Assign data to objects in Data Activator](data-activator-assign-data-objects.md)
* [Create Data Activator triggers in design mode](data-activator-create-triggers-design-mode.md)
* [Data Activator tutorial using sample data](data-activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
