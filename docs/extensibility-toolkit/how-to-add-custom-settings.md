---
title: How to create custom settings dialogs
description: Learn how to create custom settings dialogs for your Fabric items
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# How-To: Add custom settings to an item

Custom settings are already enabled in the Fabric Extensibility Toolkit. The worker automatically registers a custom settings tab for each item type with the route pattern `/{ItemType}Item-settings/{itemId}`.

## Implementation steps

### 1. Create your settings component

Create a React component for your settings interface:

**File: `Workload/app/items/[YourItem]Item/[YourItem]ItemSettings.tsx`**

```typescript
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Field, Input, Button } from '@fluentui/react-components';
import { getWorkloadItem, saveWorkloadItem } from '../../../controller/ItemCRUDController';

export function YourItemSettings(props) {
    const { workloadClient } = props;
    const { itemObjectId } = useParams();
    const [item, setItem] = useState();
    const [settings, setSettings] = useState({ apiEndpoint: '', maxRetries: 3 });

    // Load item and initialize settings
    useEffect(() => {
        // Load item data and populate form
    }, [itemObjectId]);

    const handleSave = async () => {
        // Update item definition with new settings
        const updatedItem = { ...item, definition: { ...item.definition, settings } };
        await saveWorkloadItem(workloadClient, updatedItem);
    };

    return (
        <div className="item-settings">
            <Field label="API Endpoint">
                <Input value={settings.apiEndpoint} onChange={(e, data) => 
                    setSettings(prev => ({ ...prev, apiEndpoint: data.value }))} />
            </Field>
            <Button appearance="primary" onClick={handleSave}>Save Settings</Button>
        </div>
    );
}
```

### 2. Add routing

Add the settings route to your app:

**File: `Workload/app/App.tsx`**

```typescript
import { YourItemSettings } from './items/YourItemItem/YourItemSettings';

// Add route
<Route path="/YourItemItem-settings/:itemObjectId" element={<YourItemSettings {...props} />} />
```

### 3. Update your data model

Extend your item definition to include settings:

**File: `Workload/app/items/[YourItem]Item/[YourItem]ItemDefinition.ts`**

```typescript
export interface YourItemDefinition {
    message?: string;
    settings?: {
        apiEndpoint: string;
        maxRetries: number;
    };
}
```

### 4. Wire up the settings button

Ensure your ribbon opens the settings dialog:

```typescript
import { createSettingsAction } from '../../controls/ItemEditor';
import { callOpenSettings } from '../../controller/SettingsController';

const handleSettings = () => callOpenSettings(workloadClient, item, 'customItemSettings');
const actions = [createSettingsAction(handleSettings, 'Settings')];
```

## Key points

- **Worker configuration**: Custom settings are enabled by default
- **Route pattern**: Follow `/{ItemType}Item-settings/{itemId}` pattern
- **Data persistence**: Use `saveWorkloadItem()` to save settings
- **UI consistency**: Use Fluent UI components for consistent styling

## Related guides

- [Create Fabric Items](./tutorial-create-new-fabric-item.md)
- [Create Custom About Pages](./how-to-add-custom-about.md)
- [Store Item Definition](./how-to-store-item-definition.md)
