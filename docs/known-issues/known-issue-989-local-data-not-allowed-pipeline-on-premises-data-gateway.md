---
title: Known issue - Local data access isn't allowed for pipeline using on-premises data gateway
description: A known issue is posted where local data access isn't allowed for a pipeline using an on-premises data gateway.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 01/13/2025
ms.custom: known-issue-989
---

# Known issue - Local data access isn't allowed for pipeline using on-premises data gateway

For security considerations, local machine access is no longer allowed for a pipeline using an on-premises data gateway. To segregate storage and compute, you can't host data store on the compute where the on-premises data gateway is running.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

You can try to access the local data source, such as REST, on the same server as the on-premises data gateway. When you try to connect, you receive an error message and the connection fails. The error message is similar to: `ErrorCode=RestResourceReadFailed,'Type=Microsoft.DataTransfer.Common.Shared.HybridDeliveryException,Message=Fail to read from REST resource.,Source=Microsoft.DataTransfer.ClientLibrary,''Type=Microsoft.DataTransfer.SecurityValidation.Exceptions.HostValidationException,Message=Access to <local Ip address> is denied, resolved IP address is <local Ip address>, network type is OnPremise,Source=Microsoft.DataTransfer.SecurityValidation,'`

## Solutions and workarounds

Ensuring the security of your data is a top priority. The change is by security design, and there aren't any plans to revert. To use your pipeline securely, set up your data store on another server, which can be connected from on-premises data gateway.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)