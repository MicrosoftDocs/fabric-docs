---
title: AI skill sharing and permission management (preview)
description: Learn how to share an AI skill, and manage AI skill permissions.
author: fbsolo-ms1
ms.author: amjafari
ms.reviewer: franksolomon
ms.topic: concept-article
ms.date: 09/20/2024
ms.collection: ce-skilling-ai-copilot
---

# AI Skill sharing and permission management (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Publishing and versioning

Creating an AI Skill is an iterative process that involves refinement of various configurations - for example, notes to the model, example SQL queries, and more. As you make adjustments and improve the AI Skill's performance, you can soon enough publish it. Once published, a published version of the AI Skill is generated, which you can then share with others to use. You cannot edit the published version.

As part of the publishing process, you can include a description that explains what the AI skill does. The description is available to consumers of the AI skill, to help them understand its purpose and functionality.

:::image type="content" source="./media/ai-skill-sharing/publish-ai-skill-description.png" alt-text="Screenshot showing creation of an AI skill description." lightbox="./media/ai-skill-sharing/publish-ai-skill-description.png":::

After you publish your AI skill, you can continue to work on its current working version to enhance and improve its performance. The changes you make in this working version don't affect the published version that others use, so you can iterate and improve your current working version with confidence. You can seamlessly switch between the published version and current working versions of your AI skill. You can then ask the same set of queries on both versions, to compare their performance. This gives valuable insights about how your changes affect the effectiveness of your AI skill.

:::image type="content" source="./media/ai-skill-sharing/published-switch.png" alt-text="Screenshot showing how to switch between published and development AI skill versions." lightbox="./media/ai-skill-sharing/published-switch.png":::

If you need to update the AI skill description without making any other changes, you can navigate to Settings, select Publishing, and then update the description, as show in this screenshot:

:::image type="content" source="./media/ai-skill-sharing/update-description.png" alt-text="Screenshot showing how to update the AI skill description." lightbox="./media/ai-skill-sharing/update-description.png":::

## Permission models for sharing the AI skill

The **Fabric AI skill sharing** feature allows you to share your AI skills with others, with a range of permission models. You have complete control over access to your AI skill, and complete control of its use.

:::image type="content" source="./media/ai-skill-sharing/sharing-main.png" alt-text="Screenshot showing how to share an AI skill link." lightbox="./media/ai-skill-sharing/sharing-main.png":::

- **No permission selected**: If you don't select any another permission, users can only query the **published** version of the AI skill. They don't have access to view or edit any configurations or details. This maintains the integrity of your AI skill set-up.
- **View details**: If you select View details, users can view the details and configurations of both the published and current working versions of the AI skill, but they can't make changes to it. However, they can still query the AI skill, and build informative insights without risk of unintended modifications.
- **Edit and view details**: If you select Edit and view details, users have full access to view and edit all the details and configurations of both the published and current working versions of the AI skill. They can also query the AI skill, which makes it ideal for collaborative work.

:::image type="content" source="./media/ai-skill-sharing/permission-models.png" alt-text="Screenshot showing how to select AI skill sharing permissions." lightbox="./media/ai-skill-sharing/permission-models.png":::

If you share an AI skill before you publish it, users with default access (no other permission is selected) can't query the AI skill, and users with other permissions can only access the current working version.

:::image type="content" source="./media/ai-skill-sharing/share-without-publish.png" alt-text="Screenshot showing the option to share an AI skill without publishing." lightbox="./media/ai-skill-sharing/share-without-publish.png":::

## Related content

- [AI skill concept](./concept-ai-skill.md)
- [AI skill tenant sharing](./ai-skill-tenant-switch.md)
- [Create an AI skill](./how-to-create-ai-skill.md)