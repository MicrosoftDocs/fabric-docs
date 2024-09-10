---
title: Known issue - Paginated report cascading parameters with default values aren't set as expected
description: A known issue is posted where Paginated report cascading parameters with default values aren't set as expected
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 09/04/2024
ms.custom: known-issue-825
---

# Known issue - Paginated report cascading parameters with default values aren't set as expected

You can configure paginated report parameters as cascading parameters with default values. The default values of the cascading parameter's children aren't getting set as expected when the parent parameter changes.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

On a paginated report with cascading parameters, changing the value of the parent parameter doesn't set the value of the children parameters with default values as expected. The child parameters show a blank value instead.

## Solutions and workarounds

You can manually set the values of the parameters and render the report normally. Alternatively, you can go to **File** > **Disable preview features** to disable the react renderer to fix the issue temporarily.

> [!NOTE]
> The old react renderer is no longer supported and other issues with parameters or rendering might occur with preview features disabled.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
