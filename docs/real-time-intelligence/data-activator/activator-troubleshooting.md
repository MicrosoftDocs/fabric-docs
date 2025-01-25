---
title: Troubleshooting errors in Activator
description: Learn the meaning of errors in Activator, how to fix them, and troubleshoot common issues in this comprehensive troubleshooting guide
author: mihart
ms.author: mihart
ms.topic: concept-article
ms.custom: FY25Q1-Linter, ignite-2024
ms.date: 11/08/2024
#customer intent: As a Fabric user I want to learn to troubleshoot Activator errors.
---

# Troubleshoot [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] errors

If a problem occurs with any of your Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] events, objects, or rules after you create them, then Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] sends you an email containing an error code. This article explains the meaning of the error codes that you can receive and describes the steps to take to fix the associated problems.

## Data ingestion error codes

The following error codes represent problems that can occur when [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] ingests data from Power BI semantic models and eventstream items.

### PowerBiSourceNotFoundOrInsufficientPermission

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can't access the Power BI semantic model for your object. This error occurs if the dataset is deleted or if permissions on the dataset change since you created the alert. To resolve the problem, check if the dataset still exists, and:

* If the dataset exists, ensure that you have permission to access it.

* If the dataset is deleted, then your objects and rules don't function. Delete then recreate them as needed on another semantic model.

### QueryEvaluationError

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can't query the Power BI semantic model for your object. This error occurs if the structure of the dataset changes after you create the alert. To resolve the problem, either:

* Restore the original structure of your semantic model, or
* Delete your [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] object and recreate your rule against the semantic model.

### EventHubNotFound

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] can't find the Fabric eventstream for your object. This error occurs if the eventstream for your object is deleted, or if the connection from your eventstream to your [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] item is removed. To resolve the problem, reconnect a Fabric eventstream to your [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] object.

### EventHubException

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] receives an exception from eventstreams when importing your data from your eventstream item. To resolve the problem, open your eventstream item and examine the connection to your [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] object and check for errors in the connection or the eventstream.

### UnauthorizedAccess

[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] isn't authorized to access the eventstream item for your [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] object. This occurs when permissions on the eventstream item change since you connected your Eventstream item to [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. To resolve the problem, make sure that you have permission to access the eventstream item.

### IncorrectDataFormat

The eventstream item connected to your [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] object contains data in a format that isn't recognized by [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. To resolve the problem, review the data in your eventstream item to ensure that it's in JSON dictionary format, as described in [Get data for Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from eventstreams](activator-get-data-eventstreams.md).

## Rule evaluation error codes

The following error codes represent problems that can occur when [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] evaluates your rule condition to see if the condition is met.

### ProcessingLimitsReached

Your rule exceeds data processing limits for one of two reasons:

* You're sending too many events per second to your [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] object, or
* Your rule is activating too frequently.

There are two ways to resolve this problem. Try reducing the number of events per second that you're sending to your object. Or, update your rule to activate less frequently.

### WorkspaceCapacityDeallocated

The Fabric capacity for your rule's workspace is deallocated, so you no longer have Fabric capacity available to process your rule. To resolve this problem, contact your Fabric capacity administrator to ensure that you have a Fabric capacity assigned to your rule's workspace.

### DefinitionFailedValidation

This error code means that your rule definition is invalid. It indicates an internal problem with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. If you receive this error code, ask for assistance on the [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] community site](https://community.fabric.microsoft.com/t5/Data-Activator-forums/ct-p/dataactivator).

### MaxDelayReached

The error code means that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] is unable to receive incoming data for your rule for the past seven days, and is not evaluating your rule. It indicates an internal problem with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. If you receive this error code, ask for assistance on the [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] community site](https://community.fabric.microsoft.com/t5/Data-Activator-forums/ct-p/dataactivator).

## Exceeded capacity error codes

The following error codes represent [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] problems that can occur when your account runs out of Fabric capacity.

### CapacityLimitExceeded
Your account exceeded the limit of your Fabric capacity for more than 24 hours. When you exceed your capacity, throttling policies are applied and [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] pauses rules evaluation, background operations, and activations. To resolve this problem, contact your capacity administrator and ask them to review capacity usage and upgrade as needed. Once your capacity issue is resolved, make sure to reactivate your rules.

Learn more with [Understand your Fabric capacity throttling](https://go.microsoft.com/fwlink/?linkid=2293008).

## Alert and Action Error codes

The following error codes represent problems that can occur when [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] attempts to send an alert, or to start a Power Automate flow, after a rule condition is met.

### UserNotFound

This error code means that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] couldn't locate the recipient of your rule's email or Teams alert. To resolve this problem, review the recipient field on your rule's **action** card and make sure that it's set to a valid member of your organization.

### RecipientThrottled

This error code means that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] couldn't alert the recipient of your rule because the recipient receives too many messages from [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]. The article [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] limitations](activator-limitations.md) lists the maximum number of messages that you can send from a rule. To resolve this problem, change the definition of your rule so that it activates less often.

### BotBlockedByUser

This error code means that you have a rule that sends a Teams alert, and the recipient of the alert blocks the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] bot from sending them messages. To resolve this problem, ask the recipient to unblock the bot.

### TeamsAppBlockedInTenant

This error code means that you have a rule that sends a Teams alert, and your Teams administrator blocks the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] app. To resolve this problem, ask your Teams administrator to unblock the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] Teams app.

### OfficeSubscriptionMissing

This error code means that [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] couldn't send the alert on your rule because you don't have a Microsoft Office subscription. To resolve the problem, get a Microsoft Office subscription.

### TeamsDisabled

This error code means that you have a rule that sends a Teams alert, and that the administrator of your Microsoft Entra tenant blocks the Microsoft Teams service principal (SP). To resolve the problem, contact your Microsoft Entra administrator and request that they unblock the Teams SP.

## Related content

* [What is [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]?](activator-introduction.md)
* [Get started with [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-get-started.md)
* [Get data for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from Power BI](activator-get-data-power-bi.md)
* [Get data for [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] from eventstreams](activator-get-data-eventstreams.md)
* [Assign data to objects in [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]](activator-assign-data-objects.md)
* [Create [!INCLUDE [fabric-activator](../includes/fabric-activator.md)]activators](activator-create-activators.md)
* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)

You can also learn more about Microsoft Fabric:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
