---
title: Add customized item settings
description: Learn about how you can add your own item settings tabs.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.date: 11/25/2024
---
# Add custom item settings
Item settings are pieces of information associated with a specific item, including properties that are frequently updated and the resources attached to the item. These settings are displayed to provide necessary item metadata information to users, allowing them to easily read the values of the item settings.


## Item manifest

In order to add custom item settings, you first need to include getItemSettings under itemSettings in the frontend item manifest:
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

:::image type="content" source="./media/custom-item-settings/example-custom-item-tabs.png" alt-text="Screenshot of an item's custom settings. The custom item tab is marked in red frame number 1. The loaded iframe that is loaded after selection of this tab is marked in red box number 2 and presented in the right side of the screen." lightbox="./media/custom-item-settings/example-custom-item-tabs.png":::

### Handling the action

In this example, we list two custom tabs in *index.worker.ts* file:
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
- **displayName** (string): The displayed string, which should be [localized](localization.md) (we can see the displayed name of the first item - *1*).
- **workloadSettingLocation** (object):
    - **workloadName** (string): The workload name.
    - **route** (object): When a specific setting tab is clicked from item settings, a panel iframe is loaded into the right-side content area to load the specific route owned by the workload (we can see it in - *2*).
- **searchTokenMatchesBySection** (object): An optional object that receives a section name as a key and an array of keywords as the value. The key is triggered whenever any of the array words are searched.
Example:
:::image type="content" source="./media/custom-item-settings/example-search.png" alt-text="Screenshot of a search tokens example. Search box is marked in red frame number 1. Section of results options of the search is marked in red frame number 2. The corresponding tab of the result is marked in red frame number 3." lightbox="./media/custom-item-settings/example-search.png":::
In this example, we started to type one of the keyword values (1), and it triggered the section name as a result option (2). Clicking on this option navigates us to the corresponding custom tab (3). This field is aligned with and can be used for localization.
## Iframe route definition

In order to load an iframe, a component should be defined and then added to the app route:

### Component definition

```typescript
export function CustomItemSettings2() {
    return (
      <div>
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
## Customize "About" page

:::image type="content" source="./media/custom-item-settings/example-about.png" alt-text="Screenshot of a about custom settings. We can see that the current chosen tab in the settings is the about tab, which marked in black frame. In the right side, we see the loaded tab. On the top, is the default about settings, which include name, description, location, and details. Below the default section, we're loading the custom about section iframe, which is marked in red frame." lightbox="./media/custom-item-settings/example-about.png":::

"Item "About" page supports adding workload specific content using hybrid view (default about settings and the workload custom iframe). To achieve that, you should add another item custom setting.
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