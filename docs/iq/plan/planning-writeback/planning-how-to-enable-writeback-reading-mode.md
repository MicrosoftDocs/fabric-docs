---
title: Enable Writeback in Reading Mode
description: Learn how to perform writeback operations and access logs while in report reading view.
ms.date: 05/04/2026
ms.topic: how-to
---

# Enable writeback in reading mode

Plan (preview) lets users perform writeback even when a report is in reading view. You can also review logs from [Logs](#logs) under the **Writeback** tab.

:::image type="content" source="../media/planning-writeback/planning-how-to-enable-writeback-reading-mode/writeback-enable-reading-mode.jpg" alt-text="Screenshot showing the Writeback ribbon tab with the Writeback and Logs buttons available." lightbox="../media/planning-writeback/planning-how-to-enable-writeback-reading-mode/writeback-enable-reading-mode.jpg":::

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Access the Writeback tab

The **Writeback** tab option is only available when at least one destination is configured and the user has writeback permissions.

The following options are displayed for users in the reading view who also have writeback access:

:::image type="content" source="../media/planning-writeback/planning-how-to-enable-writeback-reading-mode/writeback-with-access.png" alt-text="Screenshot showing the available writeback options and report data for authorized users in reading mode." lightbox="../media/planning-writeback/planning-how-to-enable-writeback-reading-mode/writeback-with-access.png":::

## Writeback

Select **Writeback** to write report data to the configured destination. Plan (preview) respects row-level security (**RLS**) in the source dataset. If a viewer has RLS applied, plan only writes back the rows allowed by that security rule.

## Logs

Select **Logs** to open the writeback logs page.

:::image type="content" source="../media/planning-writeback/planning-how-to-enable-writeback-reading-mode/writeback-logs.png" alt-text="Screenshot of the writeback logs interface displaying a table of past writeback events, durations, and statuses." lightbox="../media/planning-writeback/planning-how-to-enable-writeback-reading-mode/writeback-logs.png":::
