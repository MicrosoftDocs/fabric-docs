---
title: AI skill scenario (preview)
description: Learn how to configure an AI skill on the AdventureWorks dataset.
author: fbsolo-ms1
ms.author: amjafari
ms.reviewer: franksolomon
reviewer: amjafari
ms.service: fabric
ms.subservice: data-science
ms.topic: concept-article #Don't change; maybe should change to "how-to".
ms.date: 02/18/2025
ms.collection: ce-skilling-ai-copilot

---

# AI skill example with the AdventureWorks dataset (preview)

This article describes how to set up an AI skill, using a lakehouse as a data source. To illustrate the process, we first create a lakehouse, and then add data to it. Then, we create an AI skill and configure the lakehouse as its data source. If you already have a Power BI semantic model (with the necessary read/write permissions), a warehouse, or a KQL database, you can follow the same steps after you create the AI skill to add your data sources. While the steps shown here focus on the lakehouse, the process is similar for other data sources—you just need to make adjustments based on your specific selection.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

- [A paid F64 or higher Fabric capacity resource](../fundamentals/copilot-fabric-overview.md#available-regions-for-azure-openai-service)
- [AI skill tenant switch](./ai-skill-tenant-setting.md) is enabled.
- [Copilot tenant switch](../admin/service-admin-portal-copilot.md#users-can-use-copilot-and-other-features-powered-by-azure-openai) is enabled.
- [Cross-geo processing for AI](../admin/service-admin-portal-copilot.md#data-sent-to-azure-openai-can-be-processed-outside-your-capacitys-geographic-region-compliance-boundary-or-national-cloud-instance) is enabled.
- [Cross-geo storing for AI](../admin/service-admin-portal-copilot.md#data-sent-to-azure-openai-can-be-stored-outside-your-capacitys-geographic-region-compliance-boundary-or-national-cloud-instance) is enabled.
- A warehouse, lakehouse, Power BI semantic models, and KQL databases with data.
- [Power BI semantic models via XMLA endpoints tenant switch](./ai-skill-tenant-setting.md) is enabled for Power BI semantic model data sources.

## Create a lakehouse with AdventureWorksLH

First, create a lakehouse and populate it with the necessary data.

If you already have an instance of AdventureWorksLH in a lakehouse (or a warehouse), you can skip this step. If not, you can use the following instructions from a Fabric notebook to populate the lakehouse with the data.

1. Create a new notebook in the workspace where you want to create your AI skill.

1. On the left side of the **Explorer** pane, select **+ Data sources**. This option allows you to add an existing lakehouse or creates a new lakehouse. For sake of clarity, create a new lakehouse and assign a name to it.

1. In the top cell, add the following code snippet:

    ```python
    import pandas as pd
    from tqdm.auto import tqdm
    base = "https://synapseaisolutionsa.blob.core.windows.net/public/AdventureWorks"
    
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

   :::image type="content" source="./media/ai-skill-scenario/notebook-run-all.png" alt-text="Screenshot showing a notebook with the AdventureWorks upload code." lightbox="./media/ai-skill-scenario/notebook-run-all.png":::

After a few minutes, the lakehouse populates with the necessary data.

## Create an AI skill

To create a new AI skill, navigate to your workspace and select the **+ New Item** button, as shown in this screenshot:

   :::image type="content" source="./media/ai-skill-scenario/create-ai-skill.png" alt-text="Screenshot showing where to create AI skills." lightbox="./media/ai-skill-scenario/create-ai-skill.png":::

In the All items tab, search for **AI skill** to locate the appropriate option. Once selected, a prompt asks you to provide a name for your AI skill, as shown in this screenshot:

   :::image type="content" source="./media/ai-skill-scenario/name-ai-skill.png" alt-text="Screenshot showing where to provide name for AI skill." lightbox="./media/ai-skill-scenario/name-ai-skill.png":::

After you enter the name, proceed with the following steps to align the AI skill with your specific requirements.

## Select the data

Select the lakehouse you created in the previous step, and then select **Add**. Once the lakehouse is added as a data source, the **Explorer** pane on the left side of the AI skill page shows the lakehouse name. Select the lakehouse to view all available tables. Use the checkboxes to select the tables you want to make available to the AI. For this scenario, select these tables:

- `dimcustomer`
- `dimdate`
- `dimgeography`
- `dimproduct`
- `dimproductcategory`
- `dimpromotion`
- `dimreseller`
- `dimsalesterritory`
- `factinternetsales`
- `cactresellersales`

:::image type="content" source="./media/ai-skill-scenario/get-started.png" alt-text="Screenshot showing where you can select tables for AI." lightbox="./media/ai-skill-scenario/get-started.png":::

## Provide instructions

To add AI instructions, select the **AI instructions** button to open the AI instructions pane on the right. You can add the following instructions.

The `AdventureWorksLH` data source contains information from three tables:

- `dimcustomer`, for detailed customer demographics and contact information
- `dimdate`, for date-related data - for example, calendar and fiscal information
- `dimgeography`, for geographical details including city names and country region codes.

Use this data source for queries and analyses that involve customer details, time-based events, and geographical locations.

:::image type="content" source="./media/ai-skill-scenario/add-ai-instructions.png" alt-text="Screenshot showing where you can provide the instructions to the AI." lightbox="./media/ai-skill-scenario/add-ai-instructions.png":::

## Provide examples

To add example queries, select the **Example queries** button to open the example queries pane on the right. This pane provides options to add or edit example queries for all supported data sources. For each data source, you can select **Add or Edit Example Queries** to input the relevant examples, as shown in the following screenshot:

:::image type="content" source="./media/ai-skill-scenario/add-example-queries-lakehouse.png" alt-text="Screenshot showing where you can add the examples you provide to the AI." lightbox="./media/ai-skill-scenario/add-example-queries-lakehouse.png":::

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

:::image type="content" source="./media/ai-skill-scenario/add-example-queries-sql-server.png" alt-text="Screenshot showing adding SQL examples." lightbox="./media/ai-skill-scenario/add-example-queries-sql-server.png":::

> [!NOTE]
> Adding sample query/question pairs isn't currently supported for Power BI semantic model data sources.

## Test and revise the AI skill

Now that you configured the AI skill, added AI instructions, and provided example queries for the lakehouse, you can interact with it by asking questions and receiving answers. As you continue testing, you can add more examples, and refine the instructions, to further improve the performance of the AI skill. Collaborate with your colleagues to gather feedback, and based on their input, ensure the provided example queries and instructions align with the types of questions they want to ask.

## Use the AI skill programmatically

You can use the AI skill programmatically within a Fabric notebook. To determine whether or not the AI skill has a published URL value, select **Settings**, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/initial-ai-skill-settings.png" alt-text="Screenshot showing selection of AI skill settings." lightbox="./media/ai-skill-scenario/initial-ai-skill-settings.png":::

Before you publish the AI skill, it doesn't have a published URL value, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/fabric-notebook-ai-skill-no-published-url-value.png" alt-text="Screenshot showing that an AI skill doesn't have a published URL value before publication." lightbox="./media/ai-skill-scenario/fabric-notebook-ai-skill-no-published-url-value.png":::

After you validate the performance of the AI skill, you might decide to publish it so you can then share it with your colleagues who want to do Q&A over data. In this case, select **Publish**, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/ai-select-publish.png" alt-text="Screenshot showing selection of the Publish option." lightbox="./media/ai-skill-scenario/ai-select-publish.png":::

The published URL for the AI skill appears, as shown in this screenshot:

:::image type="content" source="./media/ai-skill-scenario/fabric-notebook-ai-skill-published-url-value.png" alt-text="Screenshot showing the published URL." lightbox="./media/ai-skill-scenario/fabric-notebook-ai-skill-published-url-value.png":::

You can then copy the published URL and use it in the Fabric notebook. This way, you can query the AI skill by making calls to the AI skill API in a Fabric notebook. Paste the copied URL in this code snippet. Then, replace the question with any query relevant to your AI skill. This example uses `\<generic published URL value\>` as the URL.

```python
%pip install "openai==1.14.1"
```

```python
%pip install httpx==0.27.2
```

```python
import requests
import json
import pprint
import typing as t
import time
import uuid

from openai import OpenAI
from openai._exceptions import APIStatusError
from openai._models import FinalRequestOptions
from openai._types import Omit
from openai._utils import is_given
from synapse.ml.mlflow import get_mlflow_env_config
from sempy.fabric._token_provider import SynapseTokenProvider
 
base_url = "https://<generic published base URL value>"
question = "What datasources do you have access to?"

configs = get_mlflow_env_config()

# Create OpenAI Client
class FabricOpenAI(OpenAI):
    def __init__(
        self,
        api_version: str ="2024-05-01-preview",
        **kwargs: t.Any,
    ) -> None:
        self.api_version = api_version
        default_query = kwargs.pop("default_query", {})
        default_query["api-version"] = self.api_version
        super().__init__(
            api_key="",
            base_url=base_url,
            default_query=default_query,
            **kwargs,
        )
    
    def _prepare_options(self, options: FinalRequestOptions) -> None:
        headers: dict[str, str | Omit] = (
            {**options.headers} if is_given(options.headers) else {}
        )
        options.headers = headers
        headers["Authorization"] = f"Bearer {configs.driver_aad_token}"
        if "Accept" not in headers:
            headers["Accept"] = "application/json"
        if "ActivityId" not in headers:
            correlation_id = str(uuid.uuid4())
            headers["ActivityId"] = correlation_id

        return super()._prepare_options(options)

# Pretty printing helper
def pretty_print(messages):
    print("---Conversation---")
    for m in messages:
        print(f"{m.role}: {m.content[0].text.value}")
    print()

fabric_client = FabricOpenAI()
# Create assistant
assistant = fabric_client.beta.assistants.create(model="not used")
# Create thread
thread = fabric_client.beta.threads.create()
# Create message on thread
message = fabric_client.beta.threads.messages.create(thread_id=thread.id, role="user", content=question)
# Create run
run = fabric_client.beta.threads.runs.create(thread_id=thread.id, assistant_id=assistant.id)

# Wait for run to complete
while run.status == "queued" or run.status == "in_progress":
    run = fabric_client.beta.threads.runs.retrieve(
        thread_id=thread.id,
        run_id=run.id,
    )
    print(run.status)
    time.sleep(2)

# Print messages
response = fabric_client.beta.threads.messages.list(thread_id=thread.id, order="asc")
pretty_print(response)

# Delete thread
fabric_client.beta.threads.delete(thread_id=thread.id)
```

## Related content

- [AI skill concept](concept-ai-skill.md)
- [Create an AI skill](how-to-create-ai-skill.md)
