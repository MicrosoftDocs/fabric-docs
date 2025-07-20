---
title: Known issue - Can't install or open on-premises data gateway after Windows update
description: A known issue is posted where you can't install or open on-premises data gateway after Windows update.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/09/2025
ms.custom: known-issue-1078
---

# Known issue - Can't install or open on-premises data gateway after Windows update

Following the installation of Windows 10 security update KB5052000, you might receive a failure when attempting to install or launch the on-premises data gateway (Microsoft.PowerBI.EnterpriseGateway.exe). There's a compatibility problem between the gateway’s use of the .NET Framework and changes introduced in the Windows patch.

**Status:** Fixed: May 9, 2025

**Product Experience:** Power BI

## Symptoms

The gateway fails to install or crashes immediately on launch. The event viewer logs show an error message similar to: `Faulting module: KERNELBASE.dll. Exception code: 0xe0434352 (unhandled .NET exception)`. The application logs show an error message similar to: `Faulting application name: Microsoft.PowerBI.EnterpriseGateway.exe, version: 3000.254.6.0, time stamp: 0xf109b1ca Faulting module name: KERNELBASE.dll, version: 10.0.17763.6775, time stamp: 0x80a03a31 Exception code: 0xe0434352 Fault offset: 0x0000000000041b39 Faulting process id: 1594 Faulting application start time: 01db986c773bf05d Faulting application path: D:\Program Files\On-premises data gateway\Microsoft.PowerBI.EnterpriseGateway.exe Faulting module path: C:\WINDOWS\System32\KERNELBASE.dll`.

## Solutions and workarounds

To mitigate the issue, you can try to uninstall the Windows 10 security update KB5052000. However, upgrading to Windows 11 is the recommended solution, since [Windows 10 is nearing end-of-support](https://www.microsoft.com/windows/end-of-support).

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
