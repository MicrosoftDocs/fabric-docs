---
title: Known issue - Next button in connection authoring is greyed out
description: A known issue is posted where the Next button in connection authoring is greyed out
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/12/2025
ms.custom: known-issue-1149
---

# Known issue - Next button in connection authoring is greyed out

In any Power Query experience, you can make a connection. In the connection authoring screen, the **Next** button might be greyed out with an existing connection selected. There's no visible warning about the greyed out button. This issue happens because the connection is bound to an invalid or nonexistent gateway.

**Status:** Fixed: June 12, 2025

**Product Experience:** Power BI

## Symptoms

The **Next** button is disabled during connection creation despite an existing connection selected in the dropdown.

## Solutions and workarounds

If you select **Edit** on the connection, you see the warning associated with the gateway dropdown. You can change the gateway by using a different connection for the same path that is bound to a working gateway. Alternatively, you can unlink/delete the connection in the **Manage Connections** dialog and ensure the document itself isn't bound to an invalid gateway using the **Options > Dataflows > Data Load** menu.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
