---
title: How to create trial experience
description: Learn how to create trial experiences for your Fabric items using ribbon actions aligned with Fabric templates patterns.
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# How-To: Add a trial experience

Create trial experiences for your Fabric items using ribbon actions that open dialogs aligned with the pattern defined in [Fabric templates](https://aka.ms/fabrictemplates).

## Overview

Trial experiences help users explore your workload's capabilities through guided dialogs that follow established Fabric patterns.

## Item concept integration

Trial experiences are built around the [Item concept](concept-item-overview.md), where ribbon actions can trigger dialogs that guide users through your item's functionality.

## Ribbon action implementation

Use RibbonAction to open dialogs aligned with patterns defined in [Fabric templates](https://aka.ms/fabrictemplates):

```typescript
// TrialExperienceRibbon.tsx
import React from 'react';
import { Tooltip, ToolbarButton } from '@fluentui/react-components';
import { Play24Regular } from '@fluentui/react-icons';
import { createSaveAction, createSettingsAction } from '../controls/ItemEditor';

export const TrialExperienceRibbon = ({ onStartTrial }) => {
  const homeToolbarActions = [
    createSaveAction(),
    createSettingsAction(),
    {
      key: 'start-trial',
      element: (
        <Tooltip content="Start trial experience" relationship="label">
          <ToolbarButton 
            icon={<Play24Regular />} 
            onClick={onStartTrial}
            appearance="primary"
          >
            Try Now
          </ToolbarButton>
        </Tooltip>
      )
    }
  ];

  return { homeToolbarActions };
};
```

## Dialog implementation

The ribbon action should open a dialog that follows the pattern defined in [Fabric templates](https://aka.ms/fabrictemplates):

```typescript
export const handleStartTrial = () => {
  // Open dialog aligned with Fabric templates pattern
  openTrialDialog({
    templatePattern: 'fabric-trial-experience',
    alignment: 'https://aka.ms/fabrictemplates'
  });
};
```

## Next steps

- [Item concept overview](concept-item-overview.md)
- [Fabric templates](https://aka.ms/fabrictemplates)
