---
title: Share a plan item with users outside the workspace
description: Learn how to share a plan item with a user who isn't a member of the workspace by first granting access to the semantic model and then sharing the plan item.
ms.date: 09/23/2026
ms.topic: how-to
---

# Share a plan item with users outside the workspace

You can share a plan item with a user who isn't a member of the workspace by using item sharing. In this example, you first select **Allow recipients to modify this semantic model** to give the user **Read, Write** access to the semantic model used by the plan, and then share the plan item with the user.

The example uses the following scenario:

- The user **Lisa Taylor** isn't a member of the workspace.
:::image type="content" source="media/sharing-plan-artifact/sharing-plan-artifact-user-not-in-workspace.png" alt-text="Screenshot showing Lisa Taylor is not a member of the workspace." lightbox="media/sharing-plan-artifact/sharing-plan-artifact-user-not-in-workspace.png":::
- Lisa Taylor is granted **Read, Write** access to the semantic model used by the plan.
- The plan **Plan_Q4** is then shared directly with Lisa Taylor.
- Lisa Taylor opens the plan in read mode. She can't enter edit mode, but can use stakeholder actions available in read mode, such as data input and comments.

## Grant the user access to the semantic model

Before sharing the plan, grant the user access to the semantic model used by the plan.

1. Open the semantic model used by the plan.
2. Select **Add user**.
3. Enter the name of the user, **Lisa Taylor**.
4. Select **Allow recipients to modify this semantic model**.
5. Select **Grant access**.

:::image type="content" source="media/sharing-plan-artifact/grant-access-to-user-at-semantic-model.png" alt-text="Screenshot showing Lisa Taylor entered in the Grant people access pane." lightbox="media/sharing-plan-artifact/grant-access-to-user-at-semantic-model.png":::

**Lisa Taylor** now has Read, Write access to the semantic model.

:::image type="content" source="media/sharing-plan-artifact/semantic-model-direct-access-read-write.png" alt-text="Screenshot showing Lisa Taylor with Read, Write access to the semantic model." lightbox="media/sharing-plan-artifact/semantic-model-direct-access-read-write.png":::

## Share the plan

After granting the user access to the semantic model, share the plan item with the same user.

1. In the workspace listing, locate the plan that uses the semantic model.
2. For **Plan_Q4**, select **Share**.

:::image type="content" source="media/sharing-plan-artifact/select-share-button-for-plan.png" alt-text="Screenshot showing the Share button for the Plan_Q4 plan item in the workspace listing." lightbox="media/sharing-plan-artifact/select-share-button-for-plan.png":::

3. In the **Create and send link** pane, select **Specific people can Read** if it isn't already selected.
4. Enter **Lisa Taylor** as the person to share the plan with.
5. Select **Send**.

:::image type="content" source="media/sharing-plan-artifact/enter-user-to-share-plan.png" alt-text="Screenshot showing Lisa Taylor entered as the user to share Plan_Q4 with." lightbox="media/sharing-plan-artifact/enter-user-to-share-plan.png":::

## Open the shared plan

After you share the plan, Lisa Taylor can open **Plan_Q4**.

Lisa Taylor can access the plan in read mode and can't enter edit mode. However, stakeholder actions available in read mode, such as data input and comments, remain available.

:::image type="content" source="media/sharing-plan-artifact/plan-opened-by-shared-user.png" alt-text="Screenshot showing Plan_Q4 opened by Lisa Taylor in read mode." lightbox="media/sharing-plan-artifact/plan-opened-by-shared-user.png":::