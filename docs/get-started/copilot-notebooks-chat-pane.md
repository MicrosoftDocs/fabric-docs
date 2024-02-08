---
title: Use the Copilot for Data Science and Data Engineering chat panel (preview)
description: Interact with the chat panel in Copilot for Data Science and Data Engineering.
author: rrikhy
ms.author: rarikhy
ms.topic: how-to
ms:custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 01/16/2024

#CustomerIntent: As a Data Scientist, or Data engineer, I want to use Copilot for Data Science and Data Engineering to increase my productivity and help answer questions I have about my data to use with notebooks.
---
# Use the Copilot for Data Science and Data Engineering chat panel

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

Copilot for Data Science and Data Engineering notebooks is an AI assistant that helps you analyze and visualize data. It works with lakehouse tables, Power BI Datasets, and pandas/spark dataframes, providing answers and code snippets directly in the notebook. The most effective way of using Copilot is to load your data as a dataframe. You can use the chat panel to ask your questions, and the AI provides responses or code to copy into your notebook. It understands your data's schema and metadata, and if data is loaded into a dataframe, it has awareness of the data inside of the data frame as well. You can ask Copilot to provide insights on data, create code for visualizations, or provide code for data transformations, and it recognizes file names for easy reference. Copilot streamlines data analysis by eliminating complex coding.

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Azure OpenAI enablement

- Azure OpenAI must be enabled within Fabric at the tenant level.

> [!NOTE]
> If your workspace is provisioned in a region without GPU capacity, and your data is not enabled to flow cross-geo, Copilot will not function properly and you will see errors.

## Successful execution of Chat-Magics installation cell

1. To use the Copilot pane, The installation cell for chat-magics must successfully execute within your Spark session.

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-cell-executed-successfully.png" alt-text="Screenshot showing executed notebook cell.":::

    >[!IMPORTANT]
    > If your Spark session terminates, the context for chat-magics will also terminate, also wiping the context for the Copilot pane.

1. Verify that all these conditions are met before proceeding with the Copilot Chat Pane.

## Open Copilot chat panel inside the notebook

1. Select the Copilot button on the notebook ribbon

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-ribbon-button.png" alt-text="Screenshot showing Copilot ribbon.":::

1. To open Copilot, select the **Copilot** button at the top of the Notebook.
1. The Copilot chat panel opens on the right side of your notebook.
1. A panel opens, to provide overview information and helpful links.

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-helpful-links.png" alt-text="Screenshot showing Copilot helpful links pane.":::

### Key capabilities

- **AI assistance**: Generate code, query data, and get suggestions to accelerate your workflow.
- **Data insights**: Quick data analysis and visualization capabilities.
- **Explanations**: Copilot can provide natural language explanations of notebook cells, and can provide an overview for notebook activity as it runs.
- **Fixing errors**: Copilot can also fix notebook run errors as they arise. Copilot shares context with the notebook cells (executed output) and can provide helpful suggestions.

### Important notices

- **Inaccuracies**: Potential for inaccuracies exists. Review AI-generated content carefully.
- **Data storage**: Customer data is temporarily stored, to identify harmful use of AI.

## Getting started with Copilot chat in notebooks

1. Copilot for Data Science and Data Engineering offers helpful starter prompts to get started. For example, "Load data from my lakehouse into a dataframe", or "Generate insights from data".

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-starter-prompts.png" alt-text="Screenshot showing the Copilot starting prompts." lightbox="media/copilot-notebooks-chat-pane/copilot-starter-prompts.png":::

1. Each of these selections outputs chat text in the text panel. As the user, you must fill out the specific details of the data you'd like to use.
1. You can then input any type of request you have in the chat box.

    :::image type="content" source="media/copilot-notebooks-chat-pane/copilot-starter-prompts.png" alt-text="Screenshot showing the Copilot starting prompts." lightbox="media/copilot-notebooks-chat-pane/copilot-starter-prompts.png":::

## Regular usage of the Copilot chat panel

- The more specifically you describe your goals in your chat panel entries, the more accurate the Copilot responses.
- You can "copy" or "insert" code from the chat panel. At the top of each code block, two buttons allow input of items directly into the notebook.
- To clear your conversation, select the **Broom** icon at the top to remove your conversation from the pane. It clears the pane of any input or output, but the context remains in the session until it ends.
- Configure the Copilot privacy settings with the %configure_privacy_settings command, or the %set_sharing_level command in the chat magics library.
- Transparency: Read our Transparency Note for details on data and algorithm use.

## Related content

- [How to use Chat-magics](./copilot-notebooks-chat-magics.md)
