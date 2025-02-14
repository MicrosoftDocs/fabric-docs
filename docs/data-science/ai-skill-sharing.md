---
title: AI skill sharing and permission management (preview)
description: Learn how to share an AI skill, and manage AI skill permissions.
author: fbsolo-ms1
ms.author: amjafari
ms.reviewer: franksolomon
ms.topic: concept-article
ms.date: 02/14/2025
ms.collection: ce-skilling-ai-copilot
---

# AI Skill sharing and permission management (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Publishing and versioning

Creation of an AI skill is an iterative process. It involves refinement of various configurations, including selection of relevant tables and definition of AI instructions. You must also include example queries for each data source in the AI skills you create. As you adjust these configurations, to enhance the performance of the AI skill, you can eventually publish that AI skill. Once published, a read-only version is generated, which you can share with others.

When you publish the AI skill, you can include a description that explains what the AI skill does. The description is available to consumers of the AI skill, to help them understand its purpose and functionality. Other automated systems and orchestrators also use the description, to invoke the AI skill outside of Microsoft Fabric. This screenshot shows how to add an AI skill description:

<!-- :::image type="content" source="./media/ai-skill-sharing/publish-ai-skill-description.png" alt-text="Screenshot showing creation of an Ai skill description." lightbox="./media/ai-skill-sharing/publish-ai-skill-description.png"::: -->

<img src="./media/ai-skill-sharing/publish-ai-skill-description.png" alt="Screenshot showing creation of an AI skill description." width="700"/>

After you publish your AI skill, you can continue refining its current version to enhance performance. The changes you make don't affect the published version that others use. You can then iterate with confidence, knowing that changes remain isolated from the published version. You can seamlessly switch between the published and current versions, testing the same set of queries on both to compare their performance. You can gauge the effect of your changes and gain valuable insights into how those changes improve the effectiveness of your AI skill. The following screenshot shows how to switch between published and development AI skill versions:

:::image type="content" source="./media/ai-skill-sharing/published-switch.png" alt-text="Screenshot showing how to switch between published and development AI skill versions." lightbox="./media/ai-skill-sharing/published-switch.png":::

If you must update the AI skill description without making any other changes, navigate to **Settings**, select **Publishing**, and then update the description, as shown in this screenshot:

<!-- :::image type="content" source="./media/ai-skill-sharing/update-description.png" alt-text="Screenshot showing how to update the AI skill description." lightbox="./media/ai-skill-sharing/update-description.png"::: -->

<img src="./media/ai-skill-sharing/update-description.png" alt="Screenshot showing how to update the AI skill description.." width="700"/>

## Permission models for sharing the AI skill

The **Fabric AI skill sharing** feature allows you to share your AI skills with others, with a range of permission models. You have complete control over access to your AI skill, and complete control of its use. When sharing the AI skill, you must also share access to the underlying data it uses. The AI Skill honors all user permissions to the data, including Row-Level Security (RLS) and Column-Level Security (CLS). This screenshot shows how to create and share an AI skill link:

<!-- :::image type="content" source="./media/ai-skill-sharing/sharing-main.png" alt-text="Screenshot showing how to share an AI skill link." lightbox="./media/ai-skill-sharing/sharing-main.png"::: -->

<img src="./media/ai-skill-sharing/sharing-main.png" alt="Screenshot showing how to share an AI skill link." width="300"/>

- **No permission selected**: If you don't select more permissions, users can only query the **published** version of the AI skill. They don't have access to edit or even view any configurations or details. This maintains the integrity of your AI skill set-up.
- **View details**: If you select View details, users can view the details and configurations of both the published and current versions of the AI skill, but they can't make any changes to it. However, they can still query the AI skill, and build informative insights without risk of unintended modifications.
- **Edit and view details**: If you select Edit and view details, users have full access to view and edit all the details and configurations of both the published and current versions of the AI skill. They can also query the AI skill, which makes it ideal for collaborative work. The following screenshot shows how to configure AI skill sharing permissions:

<!-- :::image type="content" source="./media/ai-skill-sharing/permission-models.png" alt-text="Screenshot showing how to select AI skill sharing permissions." lightbox="./media/ai-skill-sharing/permission-models.png"::: -->

<img src="./media/ai-skill-sharing/permission-models.png" alt="Screenshot showing how to select AI skill sharing permissions." width="300"/>

If you share an AI Skill before you publish it, users with default permissions (without any other permissions) can't query it. This is because the default permission allows users to query only the published version—if there's no published version, users can't query the AI skill. Users with other permissions (View details, Edit, and view details) can only access the current version. The following screenshot shows how to share an AI skill without publishing that AI skill:

<!-- :::image type="content" source="./media/ai-skill-sharing/share-without-publish.png" alt-text="Screenshot showing the option to share an AI skill without publishing." lightbox="./media/ai-skill-sharing/share-without-publish.png"::: -->

<img src="./media/ai-skill-sharing/share-without-publish.png" alt="SScreenshot showing the option to share an AI skill without publishing." width="400"/>

## Related content

- [AI skill concept](./concept-ai-skill.md)
- [AI skill tenant sharing](./ai-skill-tenant-switch.md)
- [Create an AI skill](./how-to-create-ai-skill.md)