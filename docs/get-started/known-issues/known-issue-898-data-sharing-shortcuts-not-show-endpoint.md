---
title: Known issue - External data sharing OneLake shortcuts don't show in SQL analytics endpoint
description: A known issue is posted where the external data sharing OneLake shortcuts don't support blob specific APIs
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 01/28/2025
ms.custom: known-issue-898
---

# Known issue - External data sharing OneLake shortcuts don't support blob specific APIs

External data sharing OneLake shortcuts don't support blob specific APIs

You can set up external data sharing using OneLake shortcuts. The shortcut tables show in the shared tenant in the lakehouse, but don't show in the SQL analytics endpoint. Additionally, if you try to use a blob-specific API to access the OneLake shortcut involved in the external data share, the API call fails.

**Status:** Fixed: January 28, 2025

**Product Experience:** OneLake

## Symptoms

If you're using external data sharing, table discovery in the SQL analytics endpoint doesn't work due to an underlying dependency on blob APIs. Additionally, blob APIs on a path containing the shared OneLake shortcut returns a partial response or error.

## Solutions and workarounds

There's no workaround for the SQL analytics endpoint table discovery not working. As a workaround for the blob API failures, use a [DFS alternative for the same activity](/rest/api/storageservices/datalakestoragegen2/path).

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
