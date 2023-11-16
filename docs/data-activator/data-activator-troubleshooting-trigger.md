---
title: Troubleshoot trigger evaluation errors in Data Activator
description: Learn the meaning of trigger evaluation errors in Data Activator and how to fix them
author: jamesdhutton
ms.author: jameshutton
ms.topic: concept
ms.custom: 
ms.date: 11/16/2023
---

# Troubleshoot trigger evaluation errors in Data Activator

If Data Activator is unable to evaluate the detection condition for any of your triggers, then it will send you an email alert to warn you of the problem. This article lists and explains the possible error codes that you can receive, and describes the steps you can take to fix the problem.

## ProcessingLimitsReached
This error code indicates that your trigger exceeded data processing limits for one of two reasons:
1. You are sending too many events per second to your Data Activator object, or
2. Your trigger is activating too frequently.

To resolve the error, either reduce the number of events per second you are sending to your object, or update your trigger condition so that your trigger activates less frequently.

## WorkspaceCapacityDeallocated
This error code means that the Fabric capacity for the your trigger's workspace has been deallocated, so you no longer have Fabric capacity available to process your trigger. To resolve this problem, contact your Fabric capacity administrator to ensure that you have a Fabric capacity assigned to your trigger's workspace.

## DefinitionFailedValidation
This error code means that your trigger definition is invalid. It indicates an internal problem with Data Activator. If you receive this error code, please ask for assistance on the [Data Activator community site](https://community.fabric.microsoft.com/t5/Data-Activator-forums/ct-p/dataactivator).

## MaxDelayReached
The error code means that Data Activator has been unable to receive incoming data for your trigger for the past 7 days, and so has stopped evaluating your trigger. It indicates an internal problem with Data Activator. If you receive this error code, please ask for assistance on the [Data Activator community site](https://community.fabric.microsoft.com/t5/Data-Activator-forums/ct-p/dataactivator).

## Next steps

* [What is Data Activator?](data-activator-introduction.md)
* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
