---
title: Known issue - Tighter throttling limit for GetDatasourcesAsAdmin Admin API
description: A known issue is posted where Tighter throttling limit for GetDatasourcesAsAdmin Admin API.
author: mihart
ms.author: mihart
ms.topic: troubleshooting 
ms.date: 03/14/2024
ms.custom: known-issue-624
---

# Known issue - Tighter throttling limit for GetDatasourcesAsAdmin Admin API

In our ongoing efforts to enhance the performance and reliability of admin APIs, we recently implemented new throttling limits based on historical usage data. However, it's now apparent that the introduction of a new throttling limit, set at 50 calls per hour for the GetDatasourcesAsAdmin API, is overly restrictive for quite a few customers. We're actively addressing this issue by reverting to our previous throttling mechanism, where calls are queued rather than rejected. This interim solution ensures smoother operation while we determine a new throttling limit that accommodates all intended use cases for this API.

**Status:** Fixed: March 14, 2024

**Product Experience:** Administration & Management

## Symptoms

You receive a return code 429 (too many requests) after hitting the limit of 50 calls within the time window of an hour.

## Solutions and workarounds

While we work on refining the throttling limits for the GetDatasourcesAsAdmin API, we understand the importance of providing viable alternatives for our users. As a temporary workaround, we recommend using our scanner APIs to access all datasource information for your tenant. The scanner APIs offer a robust solution for retrieving datasets and related datasource information. For more information, please refer to [Admin - WorkspaceInfo GetScanResult REST API](/rest/api/power-bi/admin/workspace-info-get-scan-result). We acknowledge that this workaround might not fully replicate the functionality of the affected API. However, we believe it serves as a practical solution until we finalize a new throttling limit that effectively caters to all use cases. Thank you for your patience and understanding as we navigate through this process.

## Next steps

- [About Admin - WorkspaceInfo GetScanResult REST API](/rest/api/power-bi/admin/workspace-info-get-scan-result)
- [About known issues](https://support.fabric.microsoft.com/known-issues)
