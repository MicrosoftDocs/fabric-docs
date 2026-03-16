---
title: Configure approval workflow
description: Learn how to configure single-level and multi-level approval workflows in PowerTable sheets.
ms.date: 03/11/2026
ms.topic: how-to
#customer intent: As a user, I want to know the steps to configure an approval workflow in PowerTable sheets so that I can review and approve data changes before they are committed to the underlying data source..
---

# Set up approval workflows in PowerTable sheets

PowerTable sheets can connect to your database live for real-time data updates and synchronization. While row and column-level access permissions ensure data integrity, you can go one step further to secure your data by setting up approval workflows.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

To ensure accuracy and correctness, users might need management's approval before making any changes to the data. There can be scenarios like multiple users accidentally changing the same data, entering incorrect values, and so on. Such scenarios can be streamlined by setting up an approval workflow process in PowerTable sheets.

## Approval flow sequence

When a change is submitted, the following actions occur:

1. Approvers receive an email notification with a link to the table.
1. The changes are highlighted in the table.
1. Approvers review the changes in the **Approvals** tab and approve, reject, or request changes.
1. The **author** is notified by email when a request is approved or rejected.
1. Approvers can also request changes or provide suggestions.
1. The author can apply or skip the suggested changes and resubmit the request for review.
1. Once approved, the changes are synchronized with the source database.

The rest of this article explains each step of the approval workflow in detail.

## Set up approval workflow

Setting up an approval workflow in PowerTable sheets involves two steps:
1. [Enable approvals directly](#enable-approvals)
2. [Select a method of choosing approvers](#select-approvers)

Once the workflow is enabled, every change made by users undergoes an approval process before getting saved and synced to the source.

### Enable approvals

You can turn on the approval workflow by following these steps:

1. Select **PowerTable > Approvals**.
2. Enable approvals by toggling the button for **Requires Approval for All Changes**.

    :::image type="content" source="media/powertable-how-to-configure-approval-workflow/enable-approvals.png" alt-text="Screenshot of toggling the approval requirement to On.":::

### Select approvers

Next, select the approvers who review and approve any changes made to the table.

There are currently two ways to select approvers in PowerTable sheets.

* [User-based approvals](#user-based-approvals): Manually enter the email addresses of approvers or the IDs of Active Directory groups
* [Rule-based approvals](#rule-based-approvals): Configure a rule-based system to identify the approvers

#### User-based approvals

User-based approvals is a straightforward method where you manually specify individuals who act as approvers.

1. Choose the option, **Specific users**.
1. Select specific users in the workspace who are responsible for reviewing and approving the changes. Search for them by entering their names or email addresses.
1. Select **Save**.

    :::image type="content" source="media/powertable-how-to-configure-approval-workflow/select-specific-users.png" alt-text="Screenshot of selecting specific users that can approve changes." lightbox="media/powertable-how-to-configure-approval-workflow/select-specific-users.png":::

#### Rule-based approvals

Define approvers for specific columns or records in the table based on set rules and criteria. Enter the rule name, the filter criteria, and the designated approvers for that rule. You can set as many rules as required and assign corresponding approvers for each.

>[!NOTE]
>Rules are executed in the order they're added, and can be reordered.

Start by adding a rule and assigning approvers:

1. Select **Users based on rules**.
1. Select **Add Rule** to add a rule.
1. Enter a name for the rule, configure the filter criteria, and add approvers for the criteria.
1. Select **Create**.

    :::image type="content" source="media/powertable-how-to-configure-approval-workflow/add-rule.png" alt-text="Screenshot of adding a new rule with filter criteria and approvers." lightbox="media/powertable-how-to-configure-approval-workflow/add-rule.png":::

Next, add multiple filter criteria:

1. Select **Add filter** to add multiple filter criteria within a rule and combine them using **And** or **Or** operators.
1. To delete a filter criterion, use the bin icon.
1. Select **Create**.

    :::image type="content" source="media/powertable-how-to-configure-approval-workflow/add-multiple-filters.png" alt-text="Screenshot of adding multiple filters to a new rule, using And and Or." lightbox="media/powertable-how-to-configure-approval-workflow/add-multiple-filters.png":::

1. You can now find the rule added to the list of rules. You can add more rules by selecting **Add Rule**.

    :::image type="content" source="media/powertable-how-to-configure-approval-workflow/rules-list.png" alt-text="Screenshot of the list of rules and an option to add more rules." lightbox="media/powertable-how-to-configure-approval-workflow/rules-list.png":::

1. Edit or delete rules as needed using the **Edit** and **Delete** options available next to each rule.

Finally, add a default approver:

1. In the final step, add one or more **default approvers** who review changes for records that don't meet the configured rules or criteria.
1. Select **Save** to apply the configuration.

    :::image type="content" source="media/powertable-how-to-configure-approval-workflow/default-approver.png" alt-text="Screenshot of configuring default approvers." lightbox="media/powertable-how-to-configure-approval-workflow/default-approver.png":::

## Multi-level approvals

Multi-level approvals require a change request to go through multiple levels of review before it's finally approved, ensuring compliance, oversight, and better decision-making. Each level corresponds to a different approver who reviews and approves the request at that level.

You can create up to three levels of approval using PowerTable sheets.

1. Enable multi-level approvals by toggling on the highlighted button.
1. Configure the required number of approval levels.
1. Enter the name of the approvers for each level.
1. Select **Save**.

    :::image type="content" source="media/powertable-how-to-configure-approval-workflow/multi-level-approvals.png" alt-text="Screenshot of enabling multi-level approval." lightbox="media/powertable-how-to-configure-approval-workflow/multi-level-approvals.png":::