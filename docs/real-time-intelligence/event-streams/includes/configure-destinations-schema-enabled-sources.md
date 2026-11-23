---
title: Configure destinations for schema-enabled sources
description: Include file with instructions for configuring destinations for schema-enabled sources in the existing Eventstream experience.
ms.topic: include
ms.date: 09/02/2026
---

## Configure destinations for schema-enabled sources

Currently, only the Eventhouse, custom endpoint, and derived stream destinations
support Eventstreams with associated schemas.

> [!NOTE]
> The procedures in this section apply to the existing Eventstream experience.
> For information about destinations in schema-aware Eventstreams, see
> [Schema-aware Eventstreams overview (Preview)](../schema-aware-eventstreams-overview.md).

<a name = "configure-schema-for-a-custom-endpoint-destination"></a>

### Configure a schema for a custom endpoint destination

1. Select **Transform events or add destination**, and then select **CustomEndpoint**.

1. On the **Custom endpoint** pane, specify a name for the destination.

1. For **Input schema**, select the schema for events. You make a selection in this box when you enable schema support for an eventstream.

:::image type="content" source="./media/configure-destinations-schema-enabled-sources/extended-custom-endpoint-schema.png" alt-text="Screenshot that shows the pane for configuring a custom endpoint." lightbox="./media/configure-destinations-schema-enabled-sources/extended-custom-endpoint-schema.png":::

For detailed steps on configuring a custom endpoint destination, see [Add a custom endpoint or custom app destination to an eventstream](../add-destination-custom-app.md).

### Configure schemas for an eventhouse destination

[!INCLUDE [configure-eventhouse-destination-schema](configure-eventhouse-destination-schema.md)]
