---
title: Known issue - Unable to start new Spark session after deleting all libraries
description: A known issue is posted where you're unable to start new Spark session after deleting all libraries
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 10/13/2023
ms.custom: known-issue-514
---

# Known issue - Unable to start new Spark session after deleting all libraries

You might not be able to start a new Spark session in a Fabric notebook. You receive a message that the session has failed. The failure occurs when you installed libraries through **Workspace settings** > **Data engineering** > **Library management**, and then you removed all the libraries.

**Status:** Fixed: October 13, 2023

**Product Experience:** Data Engineering

## Symptoms

You're unable to start a new Spark session in a Fabric notebook and receive the error message: "SparkCoreError/PersonalizingFailed: Livy session has failed. Error code: SparkCoreError/PersonalizingFailed. SessionInfo.State from SparkCore is Error: Encountered an unexpected error while personalizing session. Failed step: 'LM_LibraryManagementPersonalizationStatement'. Source: SparkCoreService."

## Solutions and workarounds

To work around this issue, you can install any library (from PyPi, Conda, or custom library) through **Workspace settings** > **Data engineering** > **Library management**. You don't need to use the library in a Fabric notebook or Spark job definition for it to resolve the error message.

If you aren't using any library in your workspace, adding a library from PyPi or Conda to work around this issue might slow your session start time slightly. Instead, you can install a small custom library to have faster session start times. You can download a simple JAR file from [Fabric Samples/SampleCustomJar](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-engineering/SampleCustomJAR) and install.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
