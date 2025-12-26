---
title: Overview of Copilot for Data Science and Data Engineering in Microsoft Fabric (preview)
description: Learn about Copilot for Data Science and Data Engineering, an AI assistant that helps analyze and visualize data.
author: eric-urban
ms.author: eur
ms.reviewer: sngun
ms.topic: overview
ms.custom:
  - build-2023
  - build-2023-fabric
  - ignite-2023
  - ignite-2023-fabric
  - copilot-learning-hub
ms.date: 08/15/2025
ms.update-cycle: 180-days
ms.search.form: Data Science Overview
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# Overview of Copilot for Data Science and Data Engineering (preview)

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

Copilot for Data Science and Data Engineering is an AI assistant that helps analyze and visualize data. It works with Lakehouse tables and files, Power BI Datasets, and pandas/spark/fabric dataframes to provide answers and code snippets directly in a notebook. Connections to OneLake and default attached Lakehouses allow Copilot to provide contextualized code suggestions and natural language responses tailored to your data.

Copilot can help you understand your data better and offer suggestions to begin your notebook, including generating code for the initial cells. After identifying and adding data sources through the Fabric object explorer, Copilot Chat suggests model types to implement. You can copy these recommendations directly into your notebook to start development. If you're unsure of your next steps, you can invoke Copilot in-cell for model direction insights.

When you encounter errors, Copilot provides suggested fixes. For further help, you can chat with Copilot for more options, avoiding constant online searches.

You also benefit from automatic documentation with a simple "Add Comments" feature that summarizes code and data changes. This makes cells clear for you and others. Throughout your workflow, you can consult Copilot at specific points, receiving real-time support and guidance to accelerate your development process.

> [!NOTE]
> With Spark 3.4 and later versions in Microsoft Fabric, no installation cell is required to use Copilot in your notebook. Previous versions that required an installation cell (Spark 3.3 and earlier) are no longer supported.

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Introduction to Copilot for Data Science and Data Engineering for Fabric Data Science

With Copilot for Data Science and Data Engineering, you can chat with an AI assistant to handle your data analysis and visualization tasks. You can ask Copilot questions about lakehouse tables, Power BI Datasets, or Pandas/Spark dataframes inside notebooks. Copilot answers in natural language or code snippets. Copilot can also generate data-specific code for you, depending on the task. For example, Copilot for Data Science and Data Engineering can generate code for:

- Chart creation
- Filtering data
- Applying transformations
- Machine learning models

First, select the Copilot icon in the notebooks ribbon. The Copilot chat panel opens, and a new cell appears at the top of your notebook. You might also select Copilot at the top of your Fabric Notebooks cell.

To maximize Copilot's effectiveness, load a table or dataset as a dataframe in your notebook. The AI can then access the data and understand its structure and content. Next, start chatting with the AI. Select the chat icon in the notebook toolbar, and type your question or request in the chat panel. For example, you can ask:

- "What is the average age of customers in this dataset?"
- "Show me a bar chart of sales by region."

Copilot responds with the answer or the code, which you can copy and paste into your notebook. Copilot for Data Science and Data Engineering is a convenient, interactive way to explore and analyze your data.

## Using the Copilot Chat Panel to Interact with Your Data

To chat with your data and get insights, select the chat icon in the notebook toolbar to open the Copilot chat panel. Type your questions or requests in the chat panel. For example, you can ask:

- "What is the average age of customers in this dataset?"
- "Show me a bar chart of sales by region."

Copilot responds with the answer or the code, which you can copy and paste into your notebook. Additionally, Copilot can suggest what to do next with your data. Copilot provides suggestions and generates relevant code snippets to help you proceed with your data analysis and visualization tasks.

To interact with the Copilot chat panel in Microsoft Fabric notebooks, follow these steps:

1. **Open the Copilot Chat Panel**: Select the chat icon in the notebook toolbar.

1. **Ask Questions or Make Requests**: Type your questions or requests in the chat panel. Here are some specific examples for data science and data engineering:

  - **Data Exploration**:
    - "What is the distribution of the 'age' column in this dataset?"
    - "Show me a histogram of the 'income' column."

  - **Data Cleaning**:
    - "How can I handle missing values in this dataset?"
    - "Generate code to remove duplicates from this dataframe."

  - **Data Transformation**:
    - "How do I normalize the 'sales' column?"
    - "Create a new column 'profit' by subtracting 'cost' from 'revenue'."

  - **Visualization**:
    - "Plot a scatter plot of 'height' vs 'weight'."
    - "Generate a box plot for the 'salary' column."

  - **Machine Learning**:
    - "Train a decision tree classifier on this dataset."
    - "Generate code for a k-means clustering algorithm with 3 clusters."

  - **Model Evaluation**:
    - "How do I evaluate the accuracy of a logistic regression model?"
    - "Generate a confusion matrix for the predictions."

1. **Receive Responses**: Copilot responds with natural language explanations or code snippets. You can copy and paste the code into your notebook to execute it.

1. **Get Suggestions**: If you don't know how to proceed, ask Copilot for suggestions:
  - "What should I do next with this dataset?"
  - "What are some recommended feature engineering techniques for this data?"

1. **Use Generated Code**: Copy the generated code snippets from the chat panel, and paste them into your notebook cells to run them.

With these steps and the provided examples, you can effectively interact with the Copilot chat panel to enhance your data science and data engineering workflows in Microsoft Fabric notebooks.

## Using the Copilot In-Cell Panel and Quick Actions

You can interact with Copilot directly within your notebook cells to generate code and perform quick actions on your code cells. Here's how to use the Copilot in-cell panel:

1. **Generate Code**: To generate code for specific tasks, you can use the Copilot in-cell panel. For example, you can type your request in the text panel above the code cell:

```plaintext
Can you generate code for a logistic regression that fits this data?
```
Copilot provides the necessary code snippet directly in the cell below.

1. **Fix Code**: You can ask Copilot to fix errors in your code. Type your request in the text panel above the code cell, and Copilot suggests corrections.

1. **Add Comments**: To automatically document your code, use the "Add Comments" feature. Copilot generates comments that summarize the code and data changes, making your notebook more readable.

1. **Optimize Code**: For performance improvements, you can ask Copilot to optimize your code. Copilot provides suggestions to enhance the efficiency of your code.

1. **Explain Code**: If you need clarification about a piece of code, ask Copilot for an explanation. Copilot provides a detailed explanation of the code's functionality.

### Steps to Use Quick Actions

1. **Invoke Copilot In-Cell**: Select the Copilot icon in the notebook toolbar to start interacting with Copilot.

1. **Type Your Request**: Enter your request or question in the text panel above the code cell. For example:

```plaintext
Explain the following code snippet.
```

1. **Receive Suggestions**: Copilot responds with the relevant code, fixes, comments, optimizations, or explanations.

1. **Apply Suggestions**: Copy the generated code or suggestions from Copilot and paste them into your notebook cells to execute them.

With the Copilot in-cell panel, you can generate code, fix errors, add comments, optimize performance, and understand your code better, all within your Microsoft Fabric notebooks.

:::image type="content" source="media/copilot-notebooks-overview/copilot-logistic-regression.png" alt-text="Screenshot showing logistic regression code generation." lightbox="media/copilot-notebooks-overview/copilot-logistic-regression.png":::

Copilot for Data Science and Data Engineering also has schema and metadata awareness of lakehouse tables. Copilot can provide relevant information in the context of your data hosted in an attached lakehouse. For example, you can ask:

- "How many tables are in the lakehouse?"
- "What are the columns of the table customers?"

Copilot responds with the relevant information if you added the lakehouse to the notebook. Copilot also has awareness of the names of files added to any lakehouse attached to the notebook. You can refer to those files by name in your chat. For example, if you have a file named **sales.csv** in your lakehouse, you can ask Copilot to "Create a dataframe from sales.csv". Copilot generates the code and displays it in the chat panel. With Copilot for notebooks, you can easily access and query your data from different sources. You don't need the exact command syntax to do it.

## Copilot inline code completion (Preview)

Copilot inline code completion is an AI-powered feature that helps you to write code faster and more efficiently in Fabric Notebooks. This feature provides intelligent, context-aware code suggestions as you type code. To learn more see, [Copilot inline code completion](author-execute-notebook.md#copilot-inline-code-completion-preview)

## Tips

- "Clear" your conversation in the Copilot chat panel with the broom located at the top of the chat panel. Copilot retains knowledge of any inputs or outputs during the session, but this helps if you find the current content distracting.
- Use the chat magics library to configure settings about Copilot, including privacy settings. The default sharing mode maximizes the context sharing Copilot can access. Therefore, limiting the information provided to Copilot can directly and significantly affect the relevance of its responses.
- When Copilot first launches, it offers a set of helpful prompts that can help you get started. They can help kickstart your conversation with Copilot. To refer to prompts later, you can use the sparkle button at the bottom of the chat panel.
- You can "drag" the sidebar of the Copilot chat to expand the chat panel, to view the code more clearly or to improve the readability of the outputs on your screen.

## Limitations

* Copilot features in the Data Science experience are currently scoped to notebooks. These features include the Copilot chat pane, IPython magic commands that can be used within a code cell, and automatic code suggestions as you type in a code cell. Copilot can also read Power BI semantic models using an integration of semantic link.

* If your tenant is configured with private link, the Copilot chat (sidecar chat) experience will not function. Copilot’s inline code suggestions and quick actions may still work, but chat interactions will fail to load.

* Copilot has two key intended uses:

  - You can ask Copilot to examine and analyze data in your notebook (for example, by first loading a DataFrame and then asking Copilot about data inside the DataFrame).
  - You can ask Copilot to generate a range of suggestions about your data analysis process - for example, what predictive models might be relevant, code to perform different types of data analysis, and documentation for a completed notebook.

* Code generation with fast-moving or recently released libraries might include inaccuracies or fabrications.

## Deletion and Export of Data

Copilot in notebooks provides users with two essential commands to manage chat history within notebook cells: **show_chat_history** and **clear_chat_history**. The **show_chat_history** command exports the complete chat history for compliance purposes, to ensure that all necessary interactions are documented and accessible for review. For example, executing **show_chat_history** generates a comprehensive log of the chat history, which can then be reviewed or archived for compliance.

The **clear_chat_history** command removes all previous conversations from the notebook, so that the user can start fresh. This command clears out old interactions, to start a new conversation thread. For instance, executing **clear_chat_history** deletes all previous chat history, to leave the notebook free of any past conversations. These features enhance the overall functionality and user experience of Copilot in notebooks.

## Related Content

- [How to use Chat-magics](./copilot-notebooks-chat-magics.md)
- [How to use the Copilot Chat Pane](./copilot-notebooks-chat-pane.md)