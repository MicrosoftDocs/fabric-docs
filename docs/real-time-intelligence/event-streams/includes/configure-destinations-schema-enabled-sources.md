---
title: Configure destinations for schema enabled sources
description: Include file with instructions on how to configure supported destinations for schema enabled sources.
ms.author: spelluru
author: spelluru 
ms.topic: include
ms.custom:
ms.date: 09/27/2025
---

## Configure eventstream destinations to use schemas
Currently, only the Eventhouse, custom endpoint, and derived stream destinations are supported for eventstreams with extended features (like schema support) enabled. This section shows you how to add and configure an Eventhouse destination when extended features (like schema support) are enabled for the eventstream. 

### Configure schema for a custom endpoint destination

1. Select **Transform events or add destination**, and then select **Custom endpoint**.
1. In the **Custom endpoint** pane, specify a name for the destination as usual. 
1. For **Input schema**, select the schema for events. This field is the extra field you fill when you enable the schema support for an eventstream. 

    :::image type="content" source="./media/configure-destinations-schema-enabled-sources/extended-custom-endpoint-schema.png" alt-text="Screenshot that shows the Custom endpoint configuration page." lightbox="./media/configure-destinations-schema-enabled-sources/extended-custom-endpoint-schema.png":::

    For detailed steps on configuring a custom endpoint destination, see [Add a custom endpoint or custom app destination to an eventstream](../add-destination-custom-app.md).
    
### Configure schemas for an eventhouse destination
[!INCLUDE [configure-eventhouse-destination-schema](configure-eventhouse-destination-schema.md)]