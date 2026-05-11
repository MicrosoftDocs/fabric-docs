---
title: Writeback FAQ
description: Answers to frequently asked questions about writeback in plan (preview), including row-level security (RLS), data availability, and data storage logic.
ms.date: 05/04/2026
ms.topic: faq
#customer intent: As a user, I want to understand how writeback operates, how it handles Row-Level Security (RLS), and how data is updated and stored.
---

# Writeback FAQ

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## If a user updates a data input column in reading mode and closes the report, will the latest data be available when reopening?

A: Yes. Plan (preview) captures changes made to data input columns and stores them in the backend database. This works in both reading and edit modes. When the report is reopened, plan retrieves the latest values and loads the report with updated data.

## How does row-level security (RLS) work in plan?

Plan (preview) respects the RLS defined in the original Power BI dataset. The Planning sheet displays only the rows that the user is allowed to see. RLS in Power BI applies to users with Viewer access in the workspace.

## How does writeback work with RLS?

Plan (preview) writes back only the rows visible to the user. If a user can see a limited set of dimension categories based on RLS, only those rows are written back. You can only write back the data that's visible in the Planning sheet.

## How is data stored when multiple users perform writeback? When are rows overwritten or appended?

Plan (preview) processes writeback operations sequentially. During writeback, plan compares incoming rows with existing rows in the destination. If all dimension columns and values match, plan overwrites the existing row. However, if you would prefer plan not to overwrite rows during writeback commits, select **Writeback only changes/Delta writeback** as the writeback type. Under this mode, plan retains previous values.

:::image type="content" source="../media/planning-writeback/planning-writeback-faq/writeback-faq.png" alt-text="Diagram showing the writeback process diagram. When all dimensions match, data is overwritten. If a dimension differs (such as US versus UK), a new row is appended.":::
