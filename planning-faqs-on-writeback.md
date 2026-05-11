---
title: FAQs on Writeback
description: Answers to frequently asked questions about Writeback in Plan, including row-level security (RLS), data availability, and data storage logic.
ms.date: 05/04/2026
ms.topic: faq
#customer intent: As a user, I want to understand how writeback operates, how it handles Row-Level Security (RLS), and how data is updated and stored.
---

# FAQs on Writeback

**a. If a user updates a data input column in reading mode and closes the report, will the latest data be available when reopening?**

Yes. Plan capture changes made to data input columns and stores them in the backend database. This works in both reading and edit modes. When the report is reopened, Plan retrieves the latest values and loads the report with updated data.

**b. How does row-level security (RLS) work in Plan?**

Plan respects the RLS defined in the original Power BI dataset. The Planning sheet disfplays only the rows that the user is allowed to see. RLS in Power BI applies to users with Viewer access in the workspace.

**c. How does Writeback work with RLS?**

Plan writes back only the rows visible to the user. If a user can see a limited set of dimension categories based on RLS, only those rows are written back. You can write back only the data visible in the Planning sheet.

**d. How is data stored when multiple users perform Writeback? When are rows overwritten or appended?**

Plan processes writeback operations sequentially. During writeback, Plan compares incoming rows with existing rows in the destination. If all dimension columns and values match, Plan overwrites the existing row. However, if you would prefer Plan not to overwrite rows during writeback commits, select Writeback only changes/Delta writeback as the writeback type. Under this mode, Plan retains previous values.

:::image type="content" source="../media/planning-writeback/planning-faqs-on-writeback/writeback-faqs.png" alt-text="Writeback process diagram: Data is overwritten when all dimensions match. If a dimension differs (e.g., US vs UK), a new row is appended.":::