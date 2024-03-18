---
title: Known issue - ParquetSharpNative error in dataflow refresh using a gateway
description: A known issue is posted where you might receive a ParquetSharpNative error in dataflow refresh using a gateway.
author: mihart
ms.author: mihart
ms.topic: troubleshooting  
ms.date: 03/14/2024
ms.custom: known-issue-650
---

# Known issue - ParquetSharpNative error in dataflow refresh using a gateway

After you upgrade to the December 2023 (or newer) version of the on-premises data gateway, Dataflow Gen2 refreshes using that gateway might start failing with the error "Unable to load DLL 'ParquetSharpNative'."

**Status:** Open

**Product Experience:** Power BI

## Symptoms

You have a Dataflow Gen2 dataflow that uses the December 2023 (or newer) version of the on-premises data gateway. When you try to refresh the dataflow, the refresh fails with the following error message: "Couldn’t refresh the entity because of an issue with the mashup document. MashupException.Error: Unable to load DLL 'ParquetSharpNative': A dynamic link library (DLL) initialization routine failed. (Exception from HRESULT: 0x8007045A)."

## Solutions and workarounds

As a workaround, you can revert back to the November (or older) version of the on-premises data gateway. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
