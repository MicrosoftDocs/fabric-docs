---
title: Known issue - Create Gateway public API doesn't work for service principals
description: A known issue is posted where the Create Gateway public API doesn't work for service principals.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 12/05/2024
ms.custom: known-issue-955
---

# Known issue - Create Gateway public API doesn't work for service principals

You can use the Fabric public API to [create a gateway](/rest/api/fabric/core/gateways/create-gateway). If you attempt to use the API to create a gateway using a service principal, you might experience errors.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

You might experience issues when you create a gateway using a service principal with the `Create Gateway` public API.

## Solutions and workarounds

As a workaround, create the gateway as a user and then share the gateway with your service principal.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
