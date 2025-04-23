---
title: Known issue - Pipeline activities fail with Dynamics or Dataverse connections through OPDG
description: A known issue is posted where pipeline activities fail with Dynamics or Dataverse connections through OPDG.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/08/2025
ms.custom: known-issue-1063
---

# Known issue - Pipeline activities fail with Dynamics or Dataverse connections through OPDG

You can use an on-premises data gateway (OPDG) to connect to Dynamics or Dataverse connections in a pipeline. If the OPDG is the August 2024 version or later, you see failures in the activities that use the Dynamics or Dataverse connections. The activities include the copy and lookup activities and the interactive authoring experiences such as test connection, preview data, and schema mapping.

**Status:** Fixed: April 8, 2025

**Product Experience:** Data Factory

## Symptoms

You receive a failure error when using a pipeline to connect to Dynamics or Dataverse connections through an OPDG. The error message is similar to: `Type=System.IO.FileNotFoundException,Message=Could not load file or assembly 'Microsoft.IdentityModel.Clients.ActiveDirectory, Version=3.19.8.16603, Culture=neutral, PublicKeyToken=31bf3856ad364e35' or one of its dependencies. The system cannot find the file specified.,Source=Microsoft.DataTransfer.ClientLibrary.DynamicsPlugin`. 

## Solutions and workarounds

You have two workarounds:

- Downgrade to the July 2024 OPDG version
- Copy the missing DLL, `Microsoft.IdentityModel.Clients.ActiveDirectory`, from the latest self-hosted integration runtime into the OPDG folder path: `C:\Program Files\On-premises data gateway\FabricIntegrationRuntime\5.0\Shared`.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
