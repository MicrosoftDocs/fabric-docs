---
title: Add custom item settings
author: matan-schaumberg
ms.author: mschaumberg
ms.topic: how-to
ms.date: 11/25/2024
---
# **Add custom item settings**
Item settings are pieces of information associated with a specific item, including properties that are frequently updated, the resources attached with the item and those ones are displayed for providing necessary item metadata information to users. And users can easily read the values of the item settings.


## Item Manifest

First thing you will need to support is having *getItemSettings* defined as an Object under *itemSettings* in the item manifest:
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
- The action is the name of the corresponsing action that will return the list of custom item settings.

## Example of adding custom item tabs

:::image type="content" source="./media/custom-item-settings/example-custom-item-tabs.png" alt-text="Screenshot of a item's custom settings." lightbox="./media/custom-item-settings/example-custom-item-tabs.png":::

### Handling the action

In this example we list two custom tabs:
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
                    workloadIframeHeight: '1000px'
                },
                {
                    name: 'customItemSettings2',
                    displayName: 'Custom item Settings2',
                    workloadSettingLocation: {
                        workloadName: sampleWorkloadName,
                        route: 'custom-item-settings2',
                    },
                    workloadIframeHeight: '1000px'
                },
            ];
        }
        default:
            throw new Error('Unknown action received');
    }
});
```
*We are returning an array of defined custom items. each one includes:*
- **name** (string): Name is something uniquely identifies the setting by a key.
- **displayName** (string): The displayed string, which should be localized (in the image above we can see the displayed name of the first item - *1*).
- **workloadSettingLocation** (object):
    - **workloadName** (string): The workload name.
    - **route** (object): When a specific setting tab is clicked from artifact settings, a panel iframe will be loaded into the right side content area to load the specific route owned by workload. (in the image above we can see it in - *2*)
- **workloadIframeHeight** (string): We can set the iframe height. The iframe height should be sent as a string (in pixels).
- **searchTokenMatchesBySection** (object): An optional object that receives a section name as a key and an array of keywords as the value. The key will be triggered whenever any of the array words are searched.
Example:
:::image type="content" source="./media/custom-item-settings/example-search.png" alt-text="Screenshot of a item's custom settings." lightbox="./media/custom-item-settings/example-search.png":::
In this example, we started to write one of the keyword values (1), and it triggered the section name as a result option (2). Clicking on this option will navigate us to the corresponding custom tab (3).
## Iframe route definitiion

In order to load an iframe a component should be defined and then added to the app route:

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

In order to add custom section to the about section as seen in the image, we should add another item custom settings:
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
- **name** : must be defined as *about*.
- **displayName** : must be defined as *About*.
- **route** : will be needed to add for the about custom component as well that will be loaded to the iframe as seen in the image.
