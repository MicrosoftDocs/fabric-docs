---
title: Frontend manifests documentation
description: This document outlines the structure, core functionalities, and examples for a workload's frontend manifests, detailing the Product and Item manifests required in the Fabric Workload Development Kit.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept-article
ms.custom:
ms.date: 10/29/2024
#customer intent: As a developer, I want to understand how to create frontend manifests for a customized Fabric workload to define identity, appearance, and behavior.
---

# Frontend Manifests Documentation

This document provides a detailed guide to the structure and configuration of the frontend manifests in Fabric workloads. These JSON-based manifests allow partners to define workload appearance, identity, and behavior, essential for providing users with a tailored and consistent experience in Fabric.

Frontend manifests consist of two main components:

- **Product Manifest**: Defines the workload identity and branding.
- **Item Manifest**: Details configuration for individual items within the workload, including user interaction elements.

## Product Manifest

The Product Manifest defines the core attributes of the workload's product, specifying its identity, branding, and configuration for user interaction.

### Attributes

- **name** (string): A unique system name for the product.
- **displayName** (string): A user-friendly display name.
- **fullDisplayName** (string): A descriptive name for the product.
- **favicon** (string): Path to the product’s favicon.
- **icon** (object): Path to the product’s icon, stored in the assets folder (e.g., "assets/icon.png").

### Home Page Configuration

Defines the layout and content of the workload’s home page.

- **homePage** (object): Configuration settings for the home page.
  - **learningMaterials** (array): List of learning materials displayed on the workload details page.
    - **title** (string): Title of the learning material.
    - **introduction** (string): Brief introduction to the material.
    - **description** (string): Detailed description of the material.
    - **onClick** (object): Action triggered when the material is clicked.
    - **image** (string): Path to the image associated with the material.
  - **recommendedItemTypes** (array): List of recommended item types displayed on the workload details page.

### Create Experience

Configurations for creating new items in the product, specifying options for user interaction.

- **createExperience** (object): Configuration for the creation of workload items.
  - **description** (string): General description of the create experience.
  - **cards** (array): List of cards displayed during the creation process.
    - **title** (string): Title of the card.
    - **description** (string): Brief description of the card.
    - **icon** (object): Path to the icon used in the card.
    - **onClick** (object): Action triggered when the card is clicked.
    - **availableIn** (array): Locations where the card is available.
    - **itemType** (string): Type of item linked to the created card.

### Workspace Settings and Product Details

- **workspaceSettings** (object): Settings specific to workspace functionality.
  - **getWorkspaceSettings** (object): Contains action to retrieve workspace settings.
- **productDetail** (object): Additional details for product branding and information.
  - **publisher** (string): Publisher of the product.
  - **slogan** (string): Product slogan.
  - **description** (string): Short description of the product.
  - **image** (object): Configuration of product images.
    - **mediaType** (integer): Media type of the image.
    - **source** (string): Path to the image.
  - **slideMedia** (array): List of media files used in product details page slides.
    - **Limit**: No more than **10** items are allowed in the `slideMedia` array.
    - **Each item** (object):
      - **mediaType** (integer): Media type of the slide. Use `0` for images and `1` for videos.
      - **source** (string): Path to the image or video source.
      - **Note**: For videos: Provide a URL to the video. Supported formats are:
        - `https://youtube.com/embed/<id>` or `https://www.youtube.com/embed/<id>`
          - Example: `https://www.youtube.com/embed/UNgpBOCvwa8?si=KwsR879MaVZd5CJi
        - `https://player.vimeo.com/video/<number>`
          - Note: Do **not** include `www.` in the vimeo URL.


#### Example of `slideMedia` Configuration:

```json
"slideMedia": [
  {
    "mediaType": 1,
    "source": "https://youtube.com/embed/UNgpBOCvwa8?si=KwsR879MaVZd5CJi"
  },
  {
    "mediaType": 0,
    "source": "assets/images/SlideImage1.png"
  }
]
```

## Item Manifest

The Item Manifest defines configuration details for individual items within the workload, including attributes, icons, editor paths, and job-related settings.

### Attributes

- **name** (string): A unique system name for the item.
- **displayName** (string): User-friendly name displayed for the item.
- **displayNamePlural** (string): Plural form of the display name for display purposes.

### Editor and Icon Configuration

- **editor** (object): Path configuration for the item’s editor in the Fabric workload app.
  - **path** (string): Relative path to the editor.
- **icon** (object): Specifies the icon representing the item.
  - **name** (string): Path to the icon file in the assets folder (e.g., "assets/icon.svg").

### Context Menu Items

Defines actions available in the item’s context menu, providing users with interaction options.

- **contextMenuItems** (array): List of actions in the context menu.
  - **name** (string): System name of the action.
  - **displayName** (string): Display name for the action.
  - **icon** (object): Icon for the action.
    - **name** (string): Path to the icon file (e.g., "assets/icon.svg").
  - **handler** (object): Action handler for the menu item.
    - **action** (string): Name of the action triggered.
  - **tooltip** (string): Optional tooltip text for the action.

### Monitoring and DataHub Configuration

- **supportedInMonitoringHub** (boolean): Specifies if the item can be shown or filtered in the Monitoring Hub.
- **supportedInDatahubL1** (boolean): Specifies if the item can be shown or filtered in the DataHub L1.

### Item Job Action Config

Configurations for job-related actions associated with the item job instance.

- **itemJobActionConfig** (object): Defines actions related to the item’s jobs.
  - **registeredActions** (object): Contains job actions like detail, cancel, and retry.
    - **detail** (object): Action for viewing job details.
    - **cancel** (object): Action for canceling a job.
    - **retry** (object): Action for retrying a job.

### Item Settings

Configurations options for item settings.

- **itemSettings** (object): Extra settings for the item.
  - **schedule** (object): Contains scheduling information.
    - **itemJobType** (string): Job type to be scheduled from Fabric shared UI.
    - **refreshType** (string): Specifies the item’s refresh capability. Possible values include `"None"`, `"Refresh"`, and `"Run"`.
  - **recentRun** (object): Configuration for recent job runs.
    - **useRecentRunsComponent** (boolean): Whether to use Fabric shared recent runs component.
  - **getItemSettings** (object): Configuration for custom item settings.
    - **action** (string): Name of the corresponding action that will return the list of custom item settings.

### Item Task Flow Categories

Defines your item categories for integrating with the Fabric [Task Flow Framework](../fundamentals/task-flow-overview.md).

- **itemJobTypes** (array): Specifies the categories assigned to an item within the task flow framework. Each item can have up to two categories. Supported categories are:
  - `"getData"`
  - `"storeData"`
  - `"prepareData"`
  - `"analyzeAndTrainData"`
  - `"trackData"`
  - `"visualizeData"`
  - `"develop"`
  - `"generalTask"`
  - `"others"`

If no category is specified, `"others"` is used as the default.

### Item OneLake Catalog Categories

Defines categories in which your item is shown in OneLake catalog.

- **oneLakeCatalogCategory** (array): Specifies the categories in which the item is shown in OneLake catalog. Each item can have up to two categories. Supported categories are:
  - `"Data"`
  - `"Insight"`
  - `"Process"`
  - `"Solution"`
  - `"Configuration"`
  - `"Other"`

If no category is specified, the item won't be shown in OneLake catalog.

> [!NOTE]
> When developing and testing new attributes added to the manifest, ensure you have synced the latest [validation scripts](https://github.com/microsoft/Microsoft-Fabric-developer-sample/tree/main/Frontend/validation) and [tools](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/tree/main/Frontend/tools) from our sample repository.
>
> This step is only necessary for local development and is not required for cloud mode.
