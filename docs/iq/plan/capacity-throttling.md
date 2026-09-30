---
description: Learn what happens when capacity throttling prevents new Planning sessions or session upgrades.
ms.date: 09/22/2026
ms.topic: concept-article
title: Capacity throttling in Fabric Planning
---

# Capacity throttling in Fabric Planning

Capacity throttling can prevent the creation of a new session or the upgrade of an existing session. Existing sessions continue to work.

When capacity usage reaches its limit, users might see a capacity usage limit error when they open a plan item or perform an action that requires a higher session type.

## Understand capacity throttling scenarios

The following scenarios describe what happens when capacity is throttled.

### Start a new Viewer session

When a user who doesn't have an existing session opens a plan item while the capacity is throttled, the new Viewer session fails. The user can't view the plan item and sees a capacity usage limit error.

:::image type="content" source="media/capacity-throttling/capacity-throttling-new-viewer-session.png" alt-text="Screenshot of the capacity usage limit error when a new Viewer session can't start." lightbox="media/capacity-throttling/capacity-throttling-new-viewer-session.png":::

## Understand session upgrade failures

When a user has an active session and performs an action that requires a higher session type, the session upgrade fails if the capacity is throttled. The following scenarios describe the session upgrade failures.

### Upgrade a Viewer session to a Stakeholder session

When a user has an active Viewer session and performs an action that requires a Stakeholder session, the session upgrade fails if the capacity is throttled. The user sees a capacity usage limit error.

:::image type="content" source="media/capacity-throttling/capacity-throttling-viewer-to-stakeholder-session.png" alt-text="Screenshot of the capacity usage limit error when a Viewer session can't upgrade to a Stakeholder session." lightbox="media/capacity-throttling/capacity-throttling-viewer-to-stakeholder-session.png":::

### Upgrade a Stakeholder session to a Planner session

When a user has an active Stakeholder session and performs an action that requires a Planner session, the session upgrade fails if the capacity is throttled. The user sees a capacity usage limit error.

:::image type="content" source="media/capacity-throttling/capacity-throttling-stakeholder-to-planner-session.png" alt-text="Screenshot of the capacity usage limit error when a Stakeholder session can't upgrade to a Planner session." lightbox="media/capacity-throttling/capacity-throttling-stakeholder-to-planner-session.png":::
