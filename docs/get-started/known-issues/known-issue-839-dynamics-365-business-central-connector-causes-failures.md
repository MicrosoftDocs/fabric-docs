---
title: Known issue - Dynamics 365 Business Central connector causes refresh failures
description: A known issue is posted where Dynamics 365 Business Central connector causes refresh failures
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 10/09/2024
ms.custom: known-issue-839
---

# Known issue - Dynamics 365 Business Central connector causes refresh failures

You can use a Dynamics 365 Business Central connector in your semantic model or dataflow. You might experience a failure when refreshing the semantic model or dataflow.

**Status:** Fixed: October 9, 2024

**Product Experience:** Power BI

## Symptoms

When refreshing a semantic model or dataflow that uses a Dynamics 365 Business Central connector, you receive an error. The error is similar to: `error: The OData connector failed with the following error: We cannot convert the value null to type Record... . The exception was raised by the IDbCommand interface.`

## Solutions and workarounds

As a workaround, you can manually change the query from the advanced editor. In the query, add a record as the last parameter to the query, from: `Dynamics365BusinessCentral.ApiContentsWithOptions(null, null, null, null)` to: `Dynamics365BusinessCentral.ApiContentsWithOptions(null, null, null, [UseReadOnlyReplica = true])`.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
