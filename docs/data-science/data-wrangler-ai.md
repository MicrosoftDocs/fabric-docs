---
# Required metadata
# For more information, see https://learn.microsoft.com/en-us/help/platform/learn-editor-add-metadata
# For valid values of ms.service, ms.prod, and ms.topic, see https://learn.microsoft.com/en-us/help/platform/metadata-taxonomies

title:       Use AI in Data Wrangler
description: Learn how to use AI functions and other AI-powered features in Data Wrangler to further accelerate data preparation
author:      s-polly
ms.author:   scottpolly
reviewer:    virginiaroman
ms.reviewer: vimeland
ms.service:  fabric
ms.topic:    how-to
ms.date:     09/04/2025
---

# How to use AI in Data Wrangler to enhance data preparation
[Data Wrangler](data-wrangler.md) is an interactive interface in Fabric notebooks that helps you prepare data quickly and visually, with real-time previews before applying changes. It now includes several built-in AI capabilities for even faster data transformation, including AI functions, rule-based AI suggestions, and code generation with Copilot. For information on getting started with Data Wrangler, see [Accelerate data prep with Data Wrangler](data-wrangler.md).

## Prerequisites
### AI functions and Copilot in Data Wrangler 
- To use AI functions and Copilot in Data Wrangler with the built-in AI endpoint in Fabric, your administrator needs to enable [the tenant switch for Copilot and other features that are powered by Azure OpenAI](../admin/service-admin-portal-copilot.md).
- Depending on your location, you might need to enable a tenant setting for cross-geo processing. Learn more about [available regions for Azure OpenAI Service](../fundamentals/copilot-fabric-overview.md#available-regions-for-azure-openai-service).
- You also need an F2 or later edition or a P edition. If you use a trial edition, you can bring your own Azure OpenAI resource.
### AI functions in Data Wrangler
To use AI functions in Data Wrangler, you will also need to install OpenAI in your notebook. The following code cell has the necessary installation commands:

# [PySpark environment](#tab/pandas-pyspark)

```python
# The pandas AI functions package requires OpenAI version 1.99.5 or later.
%pip install -q --force-reinstall openai==1.99.5 2>/dev/null
```

# [Python environment](#tab/pandas-python)

```python
# Install the fixed version of packages.
%pip install -q --force-reinstall openai==1.99.5 2>/dev/null

# Install the latest version of SynapseML-core.
%pip install -q --force-reinstall https://mmlspark.blob.core.windows.net/pip/1.0.12-spark3.5/synapseml_core-1.0.12.dev1-py2.py3-none-any.whl 2>/dev/null

# Install SynapseML-Internal .whl with the AI functions library from blob storage:
%pip install -q --force-reinstall https://mmlspark.blob.core.windows.net/pip/1.0.12.2-spark3.5/synapseml_internal-1.0.12.2.dev1-py2.py3-none-any.whl 2>/dev/null
```

---

## Apply AI Functions in Data Wrangler (preview)
[Fabric AI functions](ai-functions/overview.md) allow you to perform tasks such as text summarization, classification, translation, sentiment analysis, grammar correction, your own prompt, and more, without writing complex code. To apply AI functions in Data Wrangler, open Data Wrangler, navigate to "Operations" on the left pane, expand 'AI enrichments', and select the function you would like to use.

:::image type="content" source="media/data-wrangler-ai/ai-functions-data-wrangler-step-1.png" alt-text="Screenshot showing Data Wrangler and highlighting the 'Operations' and 'AI enrichments' sections." lightbox="media/data-wrangler-ai/ai-functions-data-wrangler-step-1.png":::

After filling in the necessary details, select "Run Preview" to see a preview of the transformation on your data frame. 

:::image type="content" source="media/data-wrangler-ai/ai-functions-data-wrangler-step-2.png" alt-text="Screenshot highlighting the 'Categorize text' AI function and 'Run Preview' option." lightbox="media/data-wrangler-ai/ai-functions-data-wrangler-step-2.png":::

To apply the changes to your data frame, select "Apply."

:::image type="content" source="media/data-wrangler-ai/ai-functions-data-wrangler-step-3.png" alt-text="Screenshot highlighting the preview for the 'Categorize text' AI function and 'Apply' option." lightbox="media/data-wrangler-ai/ai-functions-data-wrangler-step-3.png":::

## Apply automated suggestions
Data Wrangler provides smart operation suggestions relevant to your data frame, leveraging rule-based AI from [Microsoft PROSE](https://www.microsoft.com/research/group/prose/). To view and apply these one-click suggestions, navigate to "Operations" on the left pane, expand “Suggestions,” and select the operation you would like to apply. A preview will be automatically generated. To keep the changes, select "Apply."

:::image type="content" source="media/data-wrangler-ai/suggestions-data-wrangler.png" alt-text="Screenshot highlighting the 'Suggestions' section with automated, relevant suggestions." lightbox="media/data-wrangler-ai/suggestions-data-wrangler.png":::

## Generate code with Copilot
Copilot in Data Wrangler allows you to describe in plain language what you want to achieve and generates the corresponding transformation, along with an instant preview so you can validate the results before applying them.
To use Copilot in Data Wrangler, select the Copilot text box above the code cell and describe your desired operation, such as “remove rows with missing values,” or “standardize dates to YYYY-MM-DD format.”  Then, select "Run Preview." To apply the changes to your data frame, select "Apply."

:::image type="content" source="media/data-wrangler-ai/copilot-data-wrangler.png" alt-text="Screenshot highlighting the 'Copilot' section describing a custom operation, and the code cell displaying the corresponding code." lightbox="media/data-wrangler-ai/copilot-data-wrangler.png":::

## Related content
- To get started with Data Wrangler, visit [this article](data-wrangler.md)
- For a live-action demo of Data Wrangler in Fabric, watch [this video from our friends at Guy in a Cube](https://www.youtube.com/watch?v=Ge0VWZMa50I)
- To try out Data Wrangler in Visual Studio Code, go to [Data Wrangler in VS Code](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.datawrangler)
- Did we miss a feature you need? Let us know! Suggest it in the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/)
