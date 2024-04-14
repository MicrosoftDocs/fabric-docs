---
title: Known issue - PySpark import statements fail for .jar files installed through environment
description: A known issue is posted where PySpark import statements fail for .jar files installed through environment.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/27/2024
ms.custom: known-issue-658
---

# Known issue - PySpark import statements fail for .jar files installed through environment

You can upload a custom library file with a .jar format into a Fabric environment. Although uploading and publishing of the environment succeeds, the import command fails in the PySpark session.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

In a PySpark session, the import library statement fails with a **Class not found** error. The custom library with a .jar format was installed through an environment.

## Solutions and workarounds

To work around this issue, you can use the following command to install the library in Notebook session: `%%configure -f { "conf": { "spark.jars": <>", } }` Alternatively, you can switch from a PySpark to a Scala session if applicable.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
