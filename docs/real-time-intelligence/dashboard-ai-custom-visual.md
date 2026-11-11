---
title: Create a custom visual (Preview)
description: Create a custom visual in a Real-Time Dashboard by describing it in natural language. Copilot generates the KQL query and visualization for you.
ms.reviewer: mibar
ms.topic: how-to
ms.subservice: rti-dashboard
ms.date: 10/08/2026
ai-usage: ai-assisted
---
# Create a custom visual in a Real-Time Dashboard (Preview)

Use the custom visual to create a purpose-built visualization from a natural-language description. Copilot generates a Kusto Query Language (KQL) query and an HTML-based visualization, and then renders the result in a Real-Time Dashboard tile.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

## Prerequisites

- A Real-Time Dashboard that you can edit.
- All data sources in the dashboard must use Dashboard Editor Identity through an associated cloud connection. For more information, see [Configure data source access for a Real-Time Dashboard](dashboard-data-source-access.md) and [Dashboard visuals that require cloud connection](dashboard-cloud-connection-visuals.md).

> [!NOTE]
>
> - Your administrator needs to enable the tenant switch before you start using Copilot. See the article [Copilot tenant settings](../admin/service-admin-portal-copilot.md) for details. 
> - Your F2 or P1 capacity needs to be in one of the regions listed in this article, [Fabric region availability](../admin/region-availability.md).
> - If your tenant or capacity is outside the US or EU, Copilot is disabled by default. Your Fabric tenant admin will also need to enable the [Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance](/fabric/admin/service-admin-portal-copilot) tenant setting in **OneLake catalog** > **Govern** > **Configurations** > **Tenant settings** to use Copilot.
> - Copilot in Microsoft Fabric isn't supported on trial SKUs. Only paid SKUs (F2 or higher, or P1 or higher) are supported.
> - See the article [Overview of Copilot in Fabric and Power BI](../fundamentals/copilot-fabric-overview.md) for more information.

## Add a custom visual

Add a custom visual tile to a dashboard that you're editing.

1. Open a [Real-Time Dashboard](dashboard-real-time-create.md#create-a-new-dashboard).
1. In the top menu, switch to **Editing** mode.
1. From the ribbon, select **Add visual** > **Describe a visual**.

   :::image type="content" source="media/dashboard-ai-custom-visual/add-ai-custom-visual-from-ribbon.png" alt-text="Screenshot of the Real-Time Dashboard ribbon with Add visual and Describe a visual highlighted." lightbox="media/dashboard-ai-custom-visual/add-ai-custom-visual-from-ribbon.png":::

## Describe the visualization

Tell Copilot what you want to see. Include the operational question, relevant measures, dimensions, and time range so that Copilot can generate an accurate query and visual.

1. In the Copilot pane, describe the visualization that you want to create.
1. Include the operational question, relevant measures, dimensions, and time range in your description.
1. Submit the prompt.

For example:

- "Show service health as a transit-map-style operational status board."
- "Create a weather-style operational summary for the last 24 hours."
- "Create a map of storm events by latitude and longitude."

You can set the database as the prompt context.

Copilot adds a new visual on the current page and generates:

- A KQL query that retrieves the required data.
- An HTML-based visualization that uses the query results.

    :::image type="content" source="media/dashboard-ai-custom-visual/generated-ai-custom-visual-query-and-visual.png" alt-text="Screenshot of a generated AI custom visual with the prompt results and generated query." lightbox="media/dashboard-ai-custom-visual/generated-ai-custom-visual-query-and-visual.png":::

## Review and refine the visual

Iterate with follow-up prompts until the visual answers your operational question.

1. Review the generated visualization.
1. Select the **Edit** icon on the tile to enter tile edit mode and review the query and visual.
1. Use the Copilot pane to refine the visual or query.

    :::image type="content" source="media/dashboard-ai-custom-visual/refine-ai-custom-visual-in-edit-mode.png" alt-text="Screenshot of a custom visual tile in edit mode with Copilot options for refining the visual or query." lightbox="media/dashboard-ai-custom-visual/refine-ai-custom-visual-in-edit-mode.png":::

    > [!NOTE]
    > The custom visual creates one generated visualization experience per tile.

## Save and view the visual

Add the visual to the dashboard, and then confirm that it renders in viewing mode.

1. Select **Apply** to save your tile changes.
1. Resize or reposition the tile as needed.
1. Save the dashboard.
1. Switch to viewing mode and confirm that the visual renders as expected.

## Related content

- [Real-Time Dashboard visual gallery](dashboard-visual-gallery.md)
- [Customize Real-Time Dashboard visuals](dashboard-visuals-customize.md)
- [Dashboard supported visual types](dashboard-supported-visuals.md)
- [Dashboard visuals that require cloud connection](dashboard-cloud-connection-visuals.md)
