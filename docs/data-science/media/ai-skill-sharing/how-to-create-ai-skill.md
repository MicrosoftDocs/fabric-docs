---
title: Create an AI skill (preview)
description: Learn how to create an AI skill.
author: fbsolo-ms1
ms.author: amjafari
ms.reviewer: franksolomon
reviewer: midesa
ms.service: fabric
ms.subservice: data-science
ms.topic: how-to #Don't change
ms.date: 09/21/2024
ms.collection: ce-skilling-ai-copilot

#customer intent: As an Analyst, I want to create an AI skill that relies on generative AI, that my colleagues and I can use to have conversations about our data.

---

# Create an AI skill (preview)

With AI skill in Microsoft Fabric, you can create conversational AI experiences that answer questions about your data stored in lakehouses, warehouses, Power BI semantic models, and KQL databases in Fabric. This makes data insights more accessible, allowing your colleagues to ask questions in plain English and receive data-driven answers, even if they aren’t AI experts or deeply familiar with the data.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

- A paid F64 or higher Fabric capacity resource. 
- [AI skill tenant switch](./ai-skill-tenant-switch.md) is enabled.
- [Copilot tenant switch](../admin/service-admin-portal-copilot.md) is enabled.
- [Cross-geo sharing for AI](../admin/service-admin-portal-copilot.md) is enabled, if relevant.
- [Cross-geo storing for AI]()
- A warehouse, lakehouse, Power BI semantic models, and Kusto databases with data.

## End-to-End Flow for Creating and Consuming AI skills in Fabric

This section outlines the key steps to create, validate, and share an AI skill in Fabric, making it accessible for consumption.

1. Create a new AI skill.
2. Select your data.
3. Ask the questions.
4. Provide instructions to the AI.
5. Provide examples for each data source.
6. Publish and share AI skill.

The process is straightforward and you can begin testing the AI skill resources in minutes.

## Create a new AI skill

To create a new AI Skill, start by navigating to your workspace and clicking on the **+ New Item** button. In the All items tab, search for **AI skill** to locate the appropriate option. Once selected, you'll be prompted to provide a name for your AI Skill. Refer to the provided screenshot for a visual guide on naming the AI Skill. After entering the name, proceed with the configuration to align the AI Skill with your specific requirements.

:::image type="content" source="./media/how-to-create-ai-skill/create-ai-skill.png" alt-text="Screenshot showing creation of an AI skill." lightbox="./media/how-to-create-ai-skill/create-ai-skill.png":::

:::image type="content" source="./media/how-to-create-ai-skill/name-ai-skill.png" alt-text="Screenshot showing how to provide name for the AI skill." lightbox="./media/how-to-create-ai-skill/name-ai-skill.png":::


## Select your data

After creating an AI skill, you can add up to five data sources, including lakehouses, warehouses, Power BI semantic models, and KQL databases in any combination. For example, you could add five Power BI semantic models, or two Power BI semantic models, one lakehouse, and one KQL database.

When you create an AI Skill for the first time and provide a name, the OneLake catalog will automatically appear, allowing you to add data sources. To add a data source, select it from the catalog as shown on the next screen, then click **Connect**. Each data source must be added individually; for example, you can add a lakehouse, click **Connect**, and then proceed to add another data source. You can also filter the data source types by clicking on the filter icon and selecting the desired type. This allows you to view only the data sources of the selected type, making it easier to locate and connect the appropriate sources for your AI Skill. 

Once you have added the data source, the **Explorer** on the left pane of the AI skill page will populate with the available tables in each selected data source, where you can use the checkboxes to make tables available or unavailable to the AI.

:::image type="content" source="./media/how-to-create-ai-skill/change-datasource.png" alt-text="Screenshot showing how to add data sources." lightbox="./media/how-to-create-ai-skill/change-datasource.png":::

For subsequent additions of data sources, navigate to the **Explorer** on the left pane of the AI Skill page, click on **+ Data source**, and the OneLake catalog will open again, allowing you to seamlessly add more data sources as needed.

<img src="./media/how-to-create-ai-skill/add-datasource-OE.png" alt="Screenshot showing adding more data sources." width="400"/>


> [!NOTE]
> You need read/write permission to be able to add a Power BI semantic model as a data source to the AI skill.
> Make sure to use descriptive names for both tables and columns. A table named `SalesData` is more meaningful than `TableA`, and column names like `ActiveCustomer` or `IsCustomerActive` are clearer than `C1` or `ActCu`. Descriptive names help the AI generate more accurate and reliable queries.

## Ask questions

After you add the data sources and select the relevant tables for each data source, you can start asking questions. The system handles questions as shown in this screenshot:

:::image type="content" source="./media/how-to-create-ai-skill/ask.png" alt-text="Screenshot showing a question for an AI skill." lightbox="./media/how-to-create-ai-skill/ask.png":::

Questions like the following examples should also work:

- "What were our total sales in California in 2023?"
- "What are the top 5 products with the highest list prices, and what are their categories?"
- "What are the most expensive items that have never been sold?"

These types of questions are suitable because they can be translated into structured queries (T-SQL, DAX, or KQL), executed against databases, and return concrete answers based on stored data.

However, these questions are out of scope:

- "Why is our factory productivity lower in Q2 2024?"
- "What is the root cause of our sales spike?"

These questions are currently out of scope because they require complex reasoning, correlation analysis, or external factors that aren't directly available in the database. The AI skill currently does not perform advanced analytics, machine learning, or causal inference—it simply retrieves and processes structured data based on the user’s query.

When you ask a question, the AI skill leverages the Azure OpenAI Assistant API to process the request. Here's how the flow operates:

### Schema Access Using User Credentials

The system first uses the user's credentials to access the schema of the data source (e.g., lakehouse, warehouse, PBI semantic model, or KQL databases). This ensures that the system fetches data structure information that the user has permission to view.

### Constructing the Prompt
To interpret the user's question, the system combines:

1. User Query: The natural language question provided by the user.
2. Schema Information: Metadata and structural details of the data source retrieved in the previous step.
3. Examples and Instructions: Any predefined examples (e.g., sample questions and answers) or specific instructions provided when setting up the AI skill. These examples and instructions help refine the AI's understanding of the question and guide how it interacts with the data.
All this information is used to construct a prompt. This prompt serves as an input to the Azure OpenAI Assistant API which behaves as an agent underlying AI skill, essentially instructing it on how to process the query and what kind of answer to produce.

### Tool Invocation Based on Query Needs
The agent analyzes the constructed prompt and decides which tool to invoke for retrieving the answer:

1. Natural Language to SQL (NL2SQL): Used for generating SQL queries when the data resides in a lakehouse or warehouse.
2. Natural Language to DAX (NL2DAX): Used for creating DAX queries to interact with semantic models in Power BI data sources.
3. Natural Language to KQL (NL2KQL): Used for constructing KQL queries to query data in KQL databases.

The selected tool generates a query using the schema, metadata, and context provided by the agent underlying the AI Skill, then validates it to ensure proper formatting and compliance with its security protocols and its own Responsible AI (RAI) policies.

### Response Construction
The agent underlying AI skill executes the query and ensures the response is structured and formatted appropriately, often including additional context to make the answer user-friendly. Finally, the answer is displayed to the user in a conversational interface. The user sees not only the result, but also the intermediate steps AI skill took to retrieve the final answer, enhancing transparency and allowing validation of the AI skill's steps if needed. Users can expand the dropdown for the steps to view all the steps the AI Skill took to retrieve the answer. Additionally, the AI skill provides the generated code used to query the corresponding data source, offering further insight into how the response was constructed.

:::image type="content" source="./media/how-to-create-ai-skill/answer.png" alt-text="Screenshot showing the answer to the question by an AI skill." lightbox="./media/how-to-create-ai-skill/answer.png":::

:::image type="content" source="./media/how-to-create-ai-skill/answer-steps.png" alt-text="Screenshot showing the steps taken by an AI skill." lightbox="./media/how-to-create-ai-skill/answer-steps.png":::

Note that these queries are designed exclusively for querying data and operations such as creating, updating, deleting, or making any changes to the data are not allowed, ensuring the integrity of your data remains intact.

At any point, you can clear the chat by clicking the **Clear chat** button. This will erase all chat history and start a new session. Note that once you delete your chat history, it cannot be retrieved.

## Change the data source

If you decide to remove a data source, hover over the data source name in the **Explorer** on the left pane of the AI skill page until the three-dot menu appears. Click on the three dots to reveal the options, then select **Remove** to delete the data source. Alternatively, if changes have been made to your data source, you can click on **Refresh** within the same menu. This ensures that any updates to the data source are reflected and populate correctly in the explorer, keeping your AI skill in sync with the latest data.

<img src="./media/how-to-create-ai-skill/delete-datasource.png" alt="Screenshot showing how to delete or refresh data sources" width="400"/>

## Configure the AI skill

The AI skill offers several configuration options that allow to customize its behavior to better suit your organization needs. These configurations provide flexibility in how the AI skill processes and presents data, enabling more control over the outcomes.

### Provide instructions

You can guide the AI's behavior by providing specific instructions. To add these, click the **AI instructions** button to open the AI instructions pane on the right. Here, you can write up to 15,000 characters in plain English to instruct the AI on how to handle queries.

For example, you can specify which data source to use for certain types of questions, such as directing the AI to use Power BI semantic models for financial queries, the lakehouse for sales data, or KQL database for operational metrics. These instructions ensure the AI generates appropriate queries—whether SQL, DAX, or KQL—based on your guidance and the context of the questions.

If you find that the AI consistently misinterprets certain words, acronyms, or terms, you can provide clear definitions in this section to ensure it understands and processes them correctly. This is particularly useful for domain-specific terminology or unique business jargon.

By tailoring these instructions and defining terms, you enhance the AI's ability to deliver precise and relevant insights, fully aligned with your data strategy and business requirements.

:::image type="content" source="./media/how-to-create-ai-skill/ai-skill-adding-instructions.png" alt-text="Screenshot showing where you can edit the instructions you provide to the AI." lightbox="./media/how-to-create-ai-skill/ai-skill-adding-instructions.png":::

### Provide example queries

You can also enhance the accuracy of the AI skill's responses by providing example queries tailored to each data source, such as Lakehouse, Warehouse, and Kusto. This approach, known as **Few-Shot Learning** in generative AI, helps guide the AI Skill to generate responses that better align with your expectations.

When you provide the AI with sample query/question pairs, it references these examples when answering future questions. By matching new queries to the most relevant examples, the AI can incorporate business-specific logic and respond effectively to commonly asked questions. This functionality enables fine-tuning for individual data sources, ensuring more accurate SQL or KQL queries are generated.

Note that adding sample query/question pairs is not currently supported for Power BI semantic model data sources. However, for supported data sources such as Lakehouse, Warehouse, and Kusto, providing additional examples can significantly improve the AI’s ability to generate precise queries when its default performance needs adjustment.

> [!TIP]
> Providing a diverse set of example queries will enhance the AI skill's ability to generate accurate and relevant SQL/KQL queries.

To add examples, click the **Example queries** button to open the example queries pane on the right. This pane provides options to add or edit example queries for all supported data sources. For each data source, you can click Add or Edit Example Queries to input the relevant examples, as shown in the screenshot below:

:::image type="content" source="./media/how-to-create-ai-skill/ai-skill-adding-examples.png" alt-text="Screenshot showing where you can edit the examples you provide to the AI." lightbox="./media/how-to-create-ai-skill/ai-skill-adding-examples.png":::

:::image type="content" source="./media/how-to-create-ai-skill/ai-skill-adding-examples-sql.png" alt-text="Screenshot showing the sql examples you provide to the AI." lightbox="./media/how-to-create-ai-skill/ai-skill-adding-examples-sql.png":::

> [!NOTE]
> The AI skill will only refer to queries that contain valid SQL/KQL queries and match the schema of the selected tables. Queries that have not completed validation will not be used by the AI skill. Make sure that all example queries are valid and correctly aligned with the schema to ensure they are utilized effectively.

## Publish AI Skill and Share

Once you have tested the performance of your AI skill across various questions and confirmed that it is generating accurate queries—whether SQL, DAX, or KQL—you will be ready to share it with your colleagues. This is when you click on **Publish**, which will prompt a window asking for a description of the AI skill. Here, provide a detailed description of what the AI skill does. The more details you include, the better it will help your colleagues understand the functionality of the AI skill and assist other AI systems/orchestrators in effectively invoking AI skill.

:::image type="content" source="./media/how-to-create-ai-skill/publish-ai-skill.png" alt-text="Screenshot showing how to publish AI skill." lightbox="./media/how-to-create-ai-skill/publish-ai-skill.png":::

After publishing, you will have two versions of the AI skill: the current development version, which you can continue to refine and improve, and the published version, which can be shared with your colleagues who want to query AI skill to get answers to their questions. As your colleagues provide feedback, you can incorporate it into the current development version you are working on to further enhance the AI skill’s performance.

## Related content

- [AI skill concept](concept-ai-skill.md)
- [AI skill scenario](ai-skill-scenario.md)