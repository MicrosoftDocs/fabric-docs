---
title: Enable writeback in reading mode
description: Learn how to perform writeback operations and access logs while in report reading view.
ms.date: 05/04/2026
ms.topic: how-to
ms.author: iq-docs
---

# Enable writeback in reading mode

Plan lets users perform writeback even when a report is in reading view. You can also review logs from Logs under the Writeback tab.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

:::image type="content" source="../media/planning-writeback/planning-how-to-enable-writeback-in-reading-mode/writeback-enable-reading-mode.jpg" alt-text="Interface showing the Writeback ribbon tab with the Writeback and Logs buttons available" lightbox="../media/planning-writeback/planning-how-to-enable-writeback-in-reading-mode/writeback-enable-reading-mode.jpg":::

> [!NOTE]
>The **Writeback** tab option is available only when at least one destination is configured and the user has writeback permissions.

The following options are displayed for users in the reading view who also have writeback access:

:::image type="content" source="../media/planning-writeback/planning-how-to-enable-writeback-in-reading-mode/writeback-with-access.png" alt-text="Interface showing the available writeback options and report data for authorized users in reading mode" lightbox="../media/planning-writeback/planning-how-to-enable-writeback-in-reading-mode/writeback-with-access.png":::

## Writeback

Select **Writeback** to write report data to the configured destination. Plan respects row-level security (**RLS**) in the source dataset. If a viewer has RLS applied, Plan writes back only the rows allowed by that security rule.

## Logs

Select **Logs** to open the writeback logs page.
