---
title: Overview of Chat-magics in Microsoft Fabric Notebooks (preview)
description: "A detailed overview of the Chat-magics Python library, highlighting its capabilities for invoking IPython magic commands in Microsoft Fabric notebooks."
author: rrikhy
ms.author: rarikhy
ms.topic: how-to #Required; leave this attribute/value as-is
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 01/16/2024

#CustomerIntent: As a data scientist, data engineer, or business analyst using notebooks in Microsoft Fabric, I want to understand the capabilities of the Chat-magics library to enhance my notebook interactions.
---
# Overview of Chat-magics in Microsoft Fabric Notebooks

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

The Chat-magics Python library enhances your data science and engineering workflow in Microsoft Fabric notebooks. It seamlessly integrates with the Fabric environment, and allows execution of specialized IPython magic commands in a notebook cell, to provide real-time outputs. IPython magic commands and more background on usage can be found here: https://ipython.readthedocs.io/en/stable/interactive/magics.html#. 

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Capabilities of Chat-magics

### Instant query and code generation

The `%%chat` command allows you to ask questions about the state of your notebook. The `%%code` enables code generation for data manipulation or visualization.

### Dataframe descriptions

The `%%describe` command provides summaries and descriptions of loaded dataframes. This simplifies the data exploration phase.

### Commenting and debugging

The `%%add_comments` and `%%fix_errors` commands help add comments to your code and fix errors respectively. This helps make your notebook more readable and error-free.

### Privacy controls

Chat-magics also offers granular privacy settings, which allows you to control what data is shared with the Azure OpenAI Service. The `%set_sharing_level` and `%configure_privacy_settings` commands, for example, provide this functionality.

## How can Chat-magics help you?

Chat-magics enhances your productivity and workflow in Microsoft Fabric notebooksIt accelerates data exploration, simplifies notebook navigation, and improves code quality. It adapts to multilingual code environments, and it prioritizes data privacy and security. Through cognitive load reductions, it allows you to more closely focus on problem-solving. Whether you're a data scientist, data engineer, or business analyst, Chat-magics seamlessly integrates robust, enterprise-level Azure OpenAI capabilities directly into your notebooks. This makes it an indispensable tool for efficient and streamlined data science and engineering tasks.

## Get started with Chat-magics

1. Open a new or existing Microsoft Fabric notebook.
1. Select the **Copilot** button on the notebook ribbon to output the Chat-magics initialization code into a new notebook cell.
1. Run the cell when it is added at the top of your notebook.

## Verify the Chat-magics installation

1. Create a new cell in the notebook, and run the `%chat_magics` command to display the help message. This step verifies proper Chat-magics installation.

## Introduction to basic commands: %%chat and %%code

### Using %%chat (Cell Magic)

1. Create a new cell in your notebook.
1. Type `%%chat` at the top of the cell.
1. Enter your question or instruction below the `%%chat` command - for example, **What variables are currently defined?**
1. Execute the cell to see the Chat-magics response.

### Using %%code (Cell Magic)

1. Create a new cell in your notebook.
1. Type `%%code` at the top of the cell.
1. Below this, specify the code action you'd like - for example, **Load my_data.csv into a pandas dataframe.**
1. Execute the cell, and review the generated code snippet.

## Customizing output and language settings

1. Use the %set_output command to change the default for how magic commands provide output. The options can be viewed by running %set_output?
1. Choose where to place the generated code, from options like
   - current cell
   - new cell
   - cell output
   - into a variable

## Advanced commands for data operations

### %%describe, %%add_comments, and %%fix_errors
1. Use **%%describe DataFrameName** in a new cell to obtain an overview of a specific dataframe.
1. To add comments to a code cell for better readability, type %%add_comments to the top of the cell you want to annotate and then execute. Be sure to validate the code is correct
1. For code error fixing, type %%fix_errors at the top of the cell that contained an error and execute it.

## Privacy and security settings

1. By default, your privacy configuration shares previous messages sent to and from the Language Learning Model (LLM). However, it doesn't share cell contents, outputs, or any schemas or sample data from data sources.
1. Use `%set_sharing_level` in a new cell to adjust the data shared with the AI processor.
3. For more detailed privacy settings, use `%configure_privacy_settings`.

## Context and focus commands

### Using %pin, %new_task, and other context commands

1. Use `%pin DataFrameName` to help the AI focus on specific dataframes.
2. To clear the AI to focus on a new task in your notebook, type %new_task followed by a task that you are about to undertake. This clears the execution history that copilot knows about to this point and can make future responses more relevant.

## Related content

- [How to use Copilot Pane](./copilot-notebooks-chat-pane.md)
