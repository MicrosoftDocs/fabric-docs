---
title: Troubleshoot data ingestion errors in Data Activator
description: Learn the meaning of data ingestion errors in Data Activator and how to fix them
author: jamesdhutton
ms.author: jameshutton
ms.topic: concept
ms.custom: 
ms.date: 11/16/2023
---

# Troubleshoot data ingestion errors in Data Activator

If Data Activator is unable to import data for your objects from PowerBI or Fabric Eventstreams, then it will send you an email alert to warn you of the problem. This article lists and explains the possible error codes that you can receive, and describes the  steps you can take to fix the problem.


## PowerBiSourceNotFoundOrInsufficientPermission

This error code means that Data Activator could not access the Power BI dataset for your object. This can occur if the dataset has been deleted, or if permissions on the dataset have changed, since you created the alert.

To resolve the problem, check if the dataset still exists:
1. If it still exists, then ensure that you have permission  to access it.
1. If it has been deleted, then your objects and triggers will no longer function. You should delete them, then recreate them as needed on another dataset.

## QueryEvaluationError

This error code means that Data Activator could not query the Power BI dataset for your object. This can occur if the structure of the dataset has changed since you created the alert.

To resolve the problem, either:
* Restore the original structure of your dataset, or
* Delete your Data Activator object and recreate your trigger against the dataset

## EventHubNotFound

This error code means that Data Activator could not find the Fabric Eventstream for your object. This can occur if the Eventstream for your object has been deleted, or if the connection from your Eventstream to your Data Activator item has been removed.

To resolve the problem, reconnect a Fabric eventstream to your Data Activator object.

## EventHubException

This error code means that Data Activator received an exception from Eventstreams when importing your data from your Eventstreams item. To resolve the problem, open your eventstreams item and examine the connection to your Data Activator object, to check for errors in the connection or the event stream.

## UnauthorizedAccess

This error code means that Data Activator was unauthorized to access the Eventstreams item for your data activator object. This can occur if permission on the Eventstreams item have changed since you connected your Eventsterams item to Data Activator. To resolve the problem, make sure that you have permission to access the Eventstream item.

## IncorrectDataFormat

This error code means that the Eventstreams item connected to your Data Activator object contained data in a format that is not recognized by Data Activator. To resolve the problem, review the data in your Eventstreams item to ensure that it is in JSON dictionary format, as described in [Get data for Data Activator from Eventstreams](data-activator-get-data-eventstreams.md).

## Next steps

* [What is Data Activator?](data-activator-introduction.md)
* [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md)
