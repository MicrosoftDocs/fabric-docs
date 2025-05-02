---
title: Known issue - Spark jobs might fail due to Runtime 1.3 updates for GA
description: A known issue is posted where Spark jobs might fail due to Runtime 1.3 updates for GA. 
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/15/2025
ms.custom: known-issue-883
---

# Known issue - Spark jobs might fail due to Runtime 1.3 updates for GA

The Microsoft Fabric Runtime 1.3 based on Apache Spark 3.5 went into general availability (GA) on September 23, 2024. Fabric Runtime 1.3 can now be used for production workloads. As part of transitioning from public preview to the general availability stage, we released major built-in library updates to improve functionality, security, reliability, and performance. These updates can affect your Microsoft Fabric environments if you installed libraries or overridden the built-in library version with Runtime 1.3.

**Status:** Fixed: April 15, 2025

**Product Experience:** Data Engineering

## Symptoms

If you installed the environments with libraries with Runtime 1.3, the Spark job starts to fail with an error similar to `Post Personalization failed`. Importing installed custom libraries might fail due to the underlying built-in libraries being updated.

## Solutions and workarounds

Reinstall the libraries for Fabric Runtime 1.3 in your Microsoft Fabric environments. The reinstallation builds the new dependency based on the latest updates. If your custom libraries have incompatible dependencies on Python built-in packages, the installation fails and a self debug log is generated with the list of required versions. You can update the dependencies to make your custom libraries compatible. There might be incompatibilities or breaking changes on the existing notebook or pipeline as the underlying Python packages were changed. You need to revisit the code to mitigate.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
