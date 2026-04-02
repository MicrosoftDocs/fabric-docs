---
title: How to create custom About pages
description: Learn how to create custom About pages for your Fabric items
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# How To: Add a custom About page

Custom About pages provide users with item information, metadata, and version details through Fabric's standard settings interface. The About tab is the default tab in the settings dialog.

## Implementation steps

### 1. Worker configuration (already set)

The About page route is already configured in the worker by default with the pattern `/{ItemType}Item-about/{itemId}`.

### 2. Create About component

Create a React component for your custom About page:

**File: `Workload/app/items/[YourItem]Item/[YourItem]ItemAbout.tsx`**

```typescript
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Card, CardHeader, CardBody, Title2, Title3, Body1, Badge, Text, Spinner
} from '@fluentui/react-components';
import { InfoRegular, SettingsRegular } from '@fluentui/react-icons';
import { getWorkloadItem } from '../../../controller/ItemCRUDController';

export function YourItemAbout(props) {
    const { workloadClient } = props;
    const { itemObjectId } = useParams();
    const { t } = useTranslation();
    
    const [item, setItem] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadItem = async () => {
            if (!itemObjectId) return;
            try {
                const loadedItem = await getWorkloadItem(workloadClient, itemObjectId);
                setItem(loadedItem);
            } catch (error) {
                console.error('Failed to load item:', error);
            } finally {
                setLoading(false);
            }
        };
        loadItem();
    }, [workloadClient, itemObjectId]);

    if (loading) {
        return <Spinner label="Loading item information..." />;
    }

    if (!item) {
        return <Text>Unable to load item information</Text>;
    }

    return (
        <div className="item-about">
            <Card className="about-section">
                <CardHeader>
                    <div className="about-header">
                        <InfoRegular />
                        <Title2>About This Item</Title2>
                    </div>
                </CardHeader>
                
                <CardBody>
                    <div className="info-row">
                        <Text weight="semibold">Name:</Text>
                        <Text>{item.displayName}</Text>
                    </div>
                    <div className="info-row">
                        <Text weight="semibold">Type:</Text>
                        <Badge appearance="outline">{item.type}</Badge>
                    </div>
                    <div className="info-row">
                        <Text weight="semibold">Item ID:</Text>
                        <Text className="monospace">{item.id}</Text>
                    </div>
                </CardBody>
            </Card>

            <Card className="about-section">
                <CardHeader>
                    <div className="about-header">
                        <SettingsRegular />
                        <Title3>Configuration</Title3>
                    </div>
                </CardHeader>
                
                <CardBody>
                    <div className="info-row">
                        <Text weight="semibold">Status:</Text>
                        <Badge appearance="filled" color={item.definition ? "brand" : "warning"}>
                            {item.definition ? "Configured" : "Not Configured"}
                        </Badge>
                    </div>
                    <div className="info-row">
                        <Text weight="semibold">Version:</Text>
                        <Text>1.0.0</Text>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
```

### 3. Add routing

Register the About component route in your app:

**File: `Workload/app/App.tsx`**

```typescript
import { YourItemAbout } from './items/YourItemItem/YourItemAbout';

// Add route
<Route path="/YourItemItem-about/:itemObjectId" element={<YourItemAbout {...props} />} />
```

### 4. Add basic styling

**File: `Workload/app/items/[YourItem]Item/[YourItem].scss`**

```scss
.item-about {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    .about-section .about-header {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .info-row {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 12px;
        
        > *:first-child {
            min-width: 120px;
        }
    }
    
    .monospace {
        font-family: 'Consolas', monospace;
        background: var(--colorNeutralBackground2);
        padding: 2px 4px;
        border-radius: 4px;
    }
}
```

## Common patterns

### Health status display

```typescript
const [healthStatus, setHealthStatus] = useState('healthy');

// In JSX
<Badge color={healthStatus === 'healthy' ? 'brand' : 'warning'}>
    {healthStatus}
</Badge>
```

### Version information

```typescript
const workloadVersion = process.env.WORKLOAD_VERSION || '1.0.0';

// Display
<Text weight="semibold">Workload Version:</Text>
<Badge appearance="outline">{workloadVersion}</Badge>
```

### Resource links

```typescript
<div className="resource-links">
    <Link href="https://docs.microsoft.com/fabric" target="_blank">
        Documentation
    </Link>
    <Link href="https://community.fabric.microsoft.com" target="_blank">
        Community Support
    </Link>
</div>
```

## Key points

- **Worker routes**: About page routes are pre-configured by the worker
- **Default tab**: About is the default tab in Fabric's settings dialog
- **Load patterns**: Use `getWorkloadItem()` to load item data
- **UI consistency**: Use Fluent UI components and standard patterns
- **Information hierarchy**: Use cards to group related information

## Related guides

- [Create Custom Settings Dialogs](./how-to-add-custom-settings.md)
- [Create Fabric Items](./tutorial-create-new-fabric-item.md)
- [Store Item Definition](./how-to-store-item-definition.md)
