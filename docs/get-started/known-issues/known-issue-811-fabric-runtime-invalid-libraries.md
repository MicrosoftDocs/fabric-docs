---
title: Known issue - Fabric Runtime 1.3 causes invalid libraries
description: A known issue is posted where Fabric Runtime 1.3 causes invalid libraries.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 08/16/2024
ms.custom: known-issue-811
---

# Known issue - Fabric Runtime 1.3 causes invalid libraries

Fabric Runtime 1.3 incorporates Apache Spark 3.5. Spark 3.5 released a major update on August 15, 2024, which causes custom libraries installed in your Fabric environments to become invalid. Starting notebook and Spark job definition sessions fail when using an invalid environment.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

When a new notebook or Spark job definition session with Fabric Runtime 1.3 environment is executed, the start-up of the Spark session fails with **Spark_Ambiguous_SparkSubmit_PersonalizationFailed** error.

## Solutions and workarounds

To fix the issue, follow the below steps:

- Navigate to the environment instance with Runtime 1.3 in your workspace
- Make changes to the libraries section as needed based on library dependencies
- Save and the publish the environment again. The environment is rebuilt with the latest update of the Spark 3.5 runtime.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
