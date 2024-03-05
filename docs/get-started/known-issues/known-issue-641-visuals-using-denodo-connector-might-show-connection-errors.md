---
title: Known issue - Visuals using the Denodo connector might show connection errors
description: A known issue is posted where visuals using the Denodo connector might show connection errors.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/05/2024
ms.custom: known-issue-641
---

# Known issue - Visuals using the Denodo connector might show errors

If your Denodo Server restarts or is briefly offline, your connection to the server isn't available. Any visuals in the Power BI reports that use the Denodo connector in DirectQuery mode show a connection error. However, these errors might show for more than ~20 min after the server comes back online.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

Visuals in a Power BI report using the Denodo connector in DirectQuery mode might show up errors for more than 20 minutes after a Denodo Server restart or a small offline occurrence of the Denodo Server.

## Solutions and workarounds

To work around this issue, you can restart Power BI Desktop or restart the on-premises data gateway. Once you restart either application, the visuals render successfully. If you choose not to restart either application, you can wait for at least 20 minutes, and the report reverts back to normal.

## Next steps

- [About known issues](/power-bi/troubleshoot/known-issues/power-bi-known-issues)
