---
title: Known issue - Unable to start new Spark session after deleting all libraries
description: A known issue is posted where you're unable to start new Spark session after deleting all libraries
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 09/25/2023
ms.custom: known-issue-514
---

# Known issue - Unable to start new Spark session after deleting all libraries

You may not be able to start a new Spark session in a Fabric notebook and receive a message that the session has failed.  The failure occurs when you installed libraries through **Workspace settings** > **Data engineering** > **Library management** and then removed all the libraries.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

You're unable to start a new Spark session in a Fabric notebook and receive the error message: "SparkCoreError/PersonalizingFailed: Livy session has failed. Error code: SparkCoreError/PersonalizingFailed. SessionInfo.State from SparkCore is Error: Encountered an unexpected error while personalizing session. Failed step: 'LM_LibraryManagementPersonalizationStatement'. Source: SparkCoreService."

## Solutions and workarounds

To work around this issue, you can install any library (from PyPi, Conda, or custom library) through **Workspace settings** > **Data engineering** > **Library management**.  You don't need to use the library in a Fabric notebook or Spark job definition for it to resolve the error message. It may be faster for you to create and install a small custom library, such as [creating a simple JAR file](https://learn.microsoft.com/azure/databricks/workflows/jobs/how-to/use-jars-in-workflows#--step-2-create-the-jar), instead of using an existing library.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)