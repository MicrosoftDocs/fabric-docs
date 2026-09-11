---
title: Fabric data agent scenario (preview)
description: Learn how to configure a Fabric data agent on the AdventureWorks dataset.
ms.author: scottpolly
author: s-polly
ms.reviewer: amjafari
ms.topic: tutorial
ms.date: 05/12/2026
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
---

# Fabric data agent example with the AdventureWorks dataset (preview)

This article shows how to set up a data agent in Microsoft Fabric using a lakehouse as the example data source. We first create and populate a lakehouse, then create a Fabric data agent and add the lakehouse to it. If you already have a Power BI semantic model, ensure you have Read permission to interact with it through a data agent (Write permission is only required to modify the semantic model or use capabilities such as Prep for AI). For a warehouse, a KQL database, or an ontology, follow the same steps and select that source instead. Although this walkthrough uses a lakehouse, the pattern is the same for other sources; only the data source selection differs.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

> [!IMPORTANT]
> Ensure the standalone Copilot experience is enabled in the Power BI admin portal (Tenant settings > Copilot > Standalone Copilot experience). If it isn't enabled, you won't be able to use the data agent inside Copilot scenarios even if other Copilot tenant switches are on. For details, see [Copilot in Power BI tenant settings](../admin/service-admin-portal-copilot.md).

## Create a lakehouse with AdventureWorksLH

First, create a lakehouse and populate it with the necessary data.

If you already have an instance of AdventureWorksLH in a lakehouse (or a warehouse), you can skip this step. If not, you can use the following instructions from a Fabric notebook to populate the lakehouse with the data.

1. Create a new notebook in the workspace where you want to create your Fabric data agent.

1. On the left side of the **Explorer** pane, select **+ Data sources**. This option allows you to add an existing lakehouse or creates a new lakehouse. For sake of clarity, create a new lakehouse and assign a name to it.

1. In the top cell, add the following code snippet:

    ```python
    import pandas as pd
    from tqdm.auto import tqdm
    base = "https://synapseaisolutionsa.z13.web.core.windows.net/data/AdventureWorks"
    
    # load list of tables
    df_tables = pd.read_csv(f"{base}/adventureworks.csv", names=["table"])
    
    for table in (pbar := tqdm(df_tables['table'].values)):
        pbar.set_description(f"Uploading {table} to lakehouse")
    
        # download
        df = pd.read_parquet(f"{base}/{table}.parquet")
    
        # save as lakehouse table
        spark.createDataFrame(df).write.mode('overwrite').saveAsTable(table)
    ```

1. Select **Run all**.

:::image type="content" source="./media/data-agent-scenario/notebook-run-all.png" alt-text="Screenshot showing a notebook with the AdventureWorks upload code." lightbox="./media/data-agent-scenario/notebook-run-all.png":::

After a few minutes, the lakehouse populates with the necessary data.

> [!CAUTION]
> Notebooks that continue running (for example, due to accidental infinite loops or constant polling) can consume Fabric capacity indefinitely. After the data finishes loading, stop any active cells and end the notebook session (Notebook toolbar > Stop session) if you no longer need it. Avoid adding long-running loops without a timeout.

## Create a Fabric data agent

To create a new Fabric data agent, navigate to your workspace and select the **+ New Item** button, as shown in this screenshot:

:::image type="content" source="./media/data-agent-scenario/create-data-agent.png" alt-text="Screenshot showing where to create Fabric data agents." lightbox="./media/data-agent-scenario/create-data-agent.png":::

In the All items tab, search for **Fabric data agent** to locate the appropriate option. Once selected, a prompt asks you to provide a name for your Fabric data agent, as shown in this screenshot:

:::image type="content" source="./media/data-agent-scenario/name-data-agent.png" alt-text="Screenshot showing where to provide name for the Fabric data agent." lightbox="./media/data-agent-scenario/name-data-agent.png":::

After you enter the name, proceed with the following steps to align the Fabric data agent with your specific requirements.

## Select the data

Select the lakehouse you created in the previous step, and then select **Add**, as shown in the following screenshot:

:::image type="content" source="./media/data-agent-scenario/select-and-add-lakehouse.png" alt-text="Screenshot showing the add a lakehouse step." lightbox="./media/data-agent-scenario/select-and-add-lakehouse.png":::

Once the lakehouse is added as a data source, the **Explorer** pane on the left side of the Fabric data agent page shows the lakehouse name. Select the lakehouse to view all available tables. Use the checkboxes to select the tables you want to make available to the AI. For this scenario, select these tables:

- `dimcustomer`
- `dimdate`
- `dimgeography`
- `dimproduct`
- `dimproductcategory`
- `dimpromotion`
- `dimreseller`
- `dimsalesterritory`
- `factinternetsales`
- `factresellersales`

:::image type="content" source="./media/data-agent-scenario/get-started.png" alt-text="Screenshot showing where you can select tables for AI." lightbox="./media/data-agent-scenario/get-started.png":::

### Permissions for semantic models in data agents

Users only need Read permission on a Power BI semantic model to add it to a data agent and ask questions through the agent. Workspace access (Member role) and Build permission aren't required for interaction via data agents. Write permission is needed only for modifying the semantic model or using capabilities such as Prep for AI.

This permissions change applies only to interactions through data agents. Other access patterns (for example, Analyze in Excel or direct report authorship) follow standard Power BI permissions.

## Provide instructions

To add instructions, select the **Data agent instructions** button to open the instructions pane on the right. You can add the following instructions.

The `AdventureWorksLH` data source contains information from three tables:

- `dimcustomer`, for detailed customer demographics and contact information
- `dimdate`, for date-related data - for example, calendar and fiscal information
- `dimgeography`, for geographical details including city names and country region codes.

Use this data source for queries and analyses that involve customer details, time-based events, and geographical locations.

:::image type="content" source="./media/data-agent-scenario/add-ai-instructions.png" alt-text="Screenshot showing where you can provide the instructions to the AI." lightbox="./media/data-agent-scenario/add-ai-instructions.png":::

## Provide examples

To add example queries, select the **Example queries** button to open the example queries pane on the right. This pane provides options to add or edit example queries for all supported data sources. For each data source, you can select **Add or Edit Example Queries** to input the relevant examples, as shown in the following screenshot:

:::image type="content" source="./media/data-agent-scenario/add-example-queries-lakehouse.png" alt-text="Screenshot showing where you can add the examples you provide to the AI." lightbox="./media/data-agent-scenario/add-example-queries-lakehouse.png":::

Here, you should add Example queries for the lakehouse data source that you created.

`Question: Calculate the average percentage increase in sales amount for repeat purchases for every zipcode. Repeat purchase is a purchase subsequent to the first purchase (the average should always be computed relative to the first purchase)`

```SQL
SELECT AVG((s.SalesAmount - first_purchase.SalesAmount) / first_purchase.SalesAmount * 100) AS AvgPercentageIncrease
FROM factinternetsales s
INNER JOIN dimcustomer c ON s.CustomerKey = c.CustomerKey
INNER JOIN dimgeography g ON c.GeographyKey = g.GeographyKey
INNER JOIN (
    SELECT *
    FROM (
        SELECT
            CustomerKey,
            SalesAmount,
            OrderDate,
            ROW_NUMBER() OVER (PARTITION BY CustomerKey ORDER BY OrderDate) AS RowNumber
        FROM factinternetsales
    ) AS t
    WHERE RowNumber = 1
) first_purchase ON s.CustomerKey = first_purchase.CustomerKey
WHERE s.OrderDate > first_purchase.OrderDate
GROUP BY g.PostalCode;
```

`Question: Show the monthly total and year-to-date total sales. Order by year and month.`

```SQL
SELECT
    Year,
    Month,
    MonthlySales,
    SUM(MonthlySales) OVER (PARTITION BY Year ORDER BY Year, Month ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS CumulativeTotal
FROM (
    SELECT
       YEAR(OrderDate) AS Year,
       MONTH(OrderDate) AS Month,
       SUM(SalesAmount) AS MonthlySales
    FROM factinternetsales
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
) AS t
```

:::image type="content" source="./media/data-agent-scenario/add-example-queries-sql-server.png" alt-text="Screenshot showing adding SQL examples." lightbox="./media/data-agent-scenario/add-example-queries-sql-server.png":::

> [!NOTE]
> Adding sample query/question pairs isn't currently supported for Power BI semantic model data sources.

## Test and revise the Fabric data agent

Now that you configured the Fabric data agent, added Fabric data agent instructions, and provided example queries for the lakehouse, you can interact with it by asking questions and receiving answers. As you continue testing, you can add more examples, and refine the instructions, to further improve the performance of the Fabric data agent. Collaborate with your colleagues to gather feedback, and based on their input, ensure the provided example queries and instructions align with the types of questions they want to ask.

## Publish the Fabric data agent

After you validate the performance of the Fabric data agent, you might decide to publish it so you can then share it with your colleagues who want to do Q&A over data. In this case, select **Publish**, as shown in this screenshot:

:::image type="content" source="./media/data-agent-scenario/ai-select-publish.png" alt-text="Screenshot showing selection of the Publish option." lightbox="./media/data-agent-scenario/ai-select-publish.png":::

The **Publish data agent** box opens, as shown in this screenshot:

:::image type="content" source="./media/data-agent-scenario/publish-data-agent.png" alt-text="Screenshot showing the publish data agent feature." lightbox="./media/data-agent-scenario/publish-data-agent.png":::

In this box, select **Publish** to publish the Fabric data agent. Once published, data agent can be consumed as a model context protocol (MCP) server.

## Use the Fabric data agent programmatically

You can use the Fabric data agent programmatically within a Fabric notebook. To determine whether or not the Fabric data agent has a published URL value, select **Settings**, as shown in the following screenshot:

:::image type="content" source="./media/data-agent-scenario/initial-data-agent-settings.png" alt-text="Screenshot showing selection of Fabric data agent settings." lightbox="./media/data-agent-scenario/initial-data-agent-settings.png":::

Before you publish the Fabric data agent, it doesn't have a published URL value, as shown in the following screenshot:

:::image type="content" source="./media/data-agent-scenario/fabric-notebook-data-agent-no-published-url-value.png" alt-text="Screenshot showing that a Fabric data agent doesn't have a published URL value before publication." lightbox="./media/data-agent-scenario/fabric-notebook-data-agent-no-published-url-value.png":::

If you haven't published the Fabric data agent before, you can publish it following the instructions in the previous steps. You can then copy the published URL and use it in the Fabric notebook. This way, you can query the Fabric data agent by making calls to the Fabric data agent API in a Fabric notebook. Paste the copied URL in this code snippet. Then, replace the question with any query relevant to your Fabric data agent. This example uses `\<generic published URL value\>` as the URL.

> [!IMPORTANT]
> When calling a data agent programmatically, implement:
>
> 1. A polling timeout (see example below) to avoid indefinite loops.
> 1. Minimal polling frequency (start at 2–5 seconds; increase only if needed).
> 1. Cleanup of created threads or resources after completion.
> 1. Notebook session shutdown when finished to release Fabric capacity.

> [!NOTE]
> Adjust version pins (`openai`, `synapseml`, `pandas`, `tqdm`) to the latest validated versions for your Fabric runtime if these exact versions become outdated.

```python
%pip install "openai==1.70.0"
%pip install "synapseml==1.0.5"  # Required for synapse.ml.mlflow (update version as needed)
%pip install pandas tqdm  # Skip if already available in the Fabric runtime
```
> [!IMPORTANT]
> Since OpenAI retired the Assistants API, applications should use the MCP endpoint for agent interactions. Unlike the Assistants API, the MCP endpoint doesn't provide built-in conversation management, so callers must orchestrate multi-turn interactions by maintaining conversation state and supplying relevant context across requests.

### Query the data agent from Python

The following example connects to the MCP endpoint, discovers the tool, sends a question, and prints the answer. It reuses the `credential` from the [Authenticate to Fabric](fabric-data-agent-sdk.md#authenticate-to-fabric) step and uses the [MCP Python SDK](https://pypi.org/project/mcp/). Install the SDK first:

```python
%pip install mcp
```

```python
import asyncio

from mcp import ClientSession
from mcp.client.streamable_http import streamablehttp_client

workspace_id = "<your-workspace-id>"
data_agent_id = "<your-data-agent-id>"
question = "<your question>"

mcp_url = (
    f"https://api.fabric.microsoft.com/v1/mcp/workspaces/{workspace_id}"
    f"/dataagents/{data_agent_id}/agent"
)


def get_auth_headers():
    token = credential.get_token("https://api.fabric.microsoft.com/.default")
    return {"Authorization": f"Bearer {token.token}"}


async def query_data_agent(question):
    headers = get_auth_headers()

    async with streamablehttp_client(mcp_url, headers=headers) as (read, write, _):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # The data agent exposes a single tool. Discover it, then call it.
            tools = await session.list_tools()
            tool = tools.tools[0]
            question_arg = next(iter(tool.inputSchema["properties"]))

            result = await session.call_tool(tool.name, {question_arg: question})

            answers = [block.text for block in result.content if block.type == "text"]
            return "\n".join(answers)


answer = asyncio.run(query_data_agent(question))
print(answer)
```


## Related content

- [Fabric data agent concept](concept-data-agent.md)
- [Create a Fabric data agent](how-to-create-data-agent.md)
