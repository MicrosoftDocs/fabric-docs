---
title: Add custom item settings
description: Learn about how you can add your own item settings tabs.
author: matanSchaumberg
ms.author: mschaumberg
ms.topic: how-to
ms.date: 11/25/2024
---
# **Add custom item settings**
Item settings are pieces of information associated with a specific item, including properties that are frequently updated and the resources attached to the item. These settings are displayed to provide necessary item metadata information to users, allowing them to easily read the values of the item settings.


## Item Manifest

The first thing you need to support is having *getItemSettings* defined as an object under *itemSettings* in the item manifest:
```json
    "itemSettings": {
      "getItemSettings": {
            "action": "getItemSettings"
        },
      "schedule": {
        "itemJobType": "ScheduledJob",
        "refreshType": "Refresh"
      },
      "recentRun": {
        "useRecentRunsComponent": true
      }
    },
```
- *getItemSettings* must include an *action* string.
- The action is the name of the corresponding action that returns the list of custom item settings.

## Example of adding custom item tabs

:::image type="content" source="./media/custom-item-settings/example-custom-item-tabs.png" alt-text="Screenshot of an item's custom settings." lightbox="./media/custom-item-settings/example-custom-item-tabs.png":::

### Handling the action

In this example, we list two custom tabs:
```typescript
workloadClient.action.onAction(async function ({ action, data }) {
    switch (action) {
        case 'getItemSettings': {
            return [
                {
                    name: 'customItemSettings',
                    displayName: 'Custom item Settings',
                    workloadSettingLocation: {
                        workloadName: sampleWorkloadName,
                        route: 'custom-item-settings',
                    },
                    searchTokenMatchesBySection: {
                        'custom search': [
                            'key words for search',
                            'custom item'
                        ],
                    },
                },
                {
                    name: 'customItemSettings2',
                    displayName: 'Custom item Settings2',
                    workloadSettingLocation: {
                        workloadName: sampleWorkloadName,
                        route: 'custom-item-settings2',
                    },
                },
            ];
        }
        default:
            throw new Error('Unknown action received');
    }
});
```
*We're returning an array of defined custom items. Each one includes:*
- **name** (string): A unique identifier for the setting.
- **displayName** (string): The displayed string, which should be localized (we can see the displayed name of the first item - *1*).
- **workloadSettingLocation** (object):
    - **workloadName** (string): The workload name.
    - **route** (object): When a specific setting tab is clicked from artifact settings, a panel iframe is loaded into the right-side content area to load the specific route owned by the workload (we can see it in - *2*).
- **searchTokenMatchesBySection** (object): An optional object that receives a section name as a key and an array of keywords as the value. The key is triggered whenever any of the array words are searched.
Example:
:::image type="content" source="./media/custom-item-settings/example-search.png" alt-text="Screenshot of a search tokens example." lightbox="./media/custom-item-settings/example-search.png":::
In this example, we started to type one of the keyword values (1), and it triggered the section name as a result option (2). Clicking on this option navigates us to the corresponding custom tab (3).
## Iframe route definition

In order to load an iframe, a component should be defined and then added to the app route:

### Component definition

```typescript
export function CustomItemSettings2() {
    return (
      <div >
        You can have additional tabs for item settings.
      </div>
    );
  }

```
### Router example

```typescript
export function App({ history, workloadClient }: AppProps) {
    return <Router history={history}>
        <Switch>
            ...
            <Route path="/custom-item-settings">
                <CustomItemSettings workloadClient={workloadClient}  />
            </Route>
            <Route path="/custom-item-settings2">
                <CustomItemSettings2 />
            </Route>
        </Switch>
    </Router>;
}
```
## Custom about iframe

:::image type="content" source="./media/custom-item-settings/example-about.png" alt-text="Screenshot of a about custom settings." lightbox="./media/custom-item-settings/example-about.png":::

If the workload team wants to display a hybrid view (default about settings and the workload custom iframe) on the item settings' About page, they should add another item custom setting.
In order to add a custom section to the About section, as seen in the image, we should add another item custom setting:
```typescript
workloadClient.action.onAction(async function ({ action, data }) {
    switch (action) {
        case 'getItemSettings': {
            return [
                {
                    name: 'about',
                    displayName: 'About',
                    workloadSettingLocation: {
                        workloadName: sampleWorkloadName,
                        route: 'custom-about',
                    },
                    workloadIframeHeight: '1000px'
                },
                ...
            ];
        }
        default:
            throw new Error('Unknown action received');
    }
});
```
- **name** : Must be defined as *about*.
- **displayName** : Must be defined as *About*.
- **route** : Needed to add for the custom About component that is loaded into the iframe, as seen in the image.
- **workloadIframeHeight** (string): We can set the iframe height. The iframe height should be provided as a string (in pixels).
  If the height isn't provided, the iframe height is set to a default value of 102vh.
