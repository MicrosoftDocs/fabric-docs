---
title: Known issue - Spark Job Definition activity incorrectly shows failure status
description: A known issue is posted where the Spark Job Definition activity incorrectly shows failure status.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/12/2025
ms.custom: known-issue-1055
---

# Known issue - Spark Job Definition activity incorrectly shows failure status

You can create a Spark Job Definition activity in a Data Factory data pipeline. After the activity runs, you might see a failure run status with a user configuration message.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

The Spark Job Definition Activity has a failure run status. The failure message is similar to: `Execution failed. Error: Execution failed. Error message: 'Type=System.InvalidOperationException,Message=The request message was already sent. Cannot send the same request message multiple times.`

## Solutions and workarounds

Although the execution status shows as failure, the activity completed successfully. You can see the correct status on the monitoring tab on the Spark Job Definition item.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
