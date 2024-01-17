---
title: "Privacy, security, and responsible use of Copilot for Data Factory (preview)"
description: Learn about privacy, security, and responsible use of Copilot for Data Factory in Microsoft Fabric.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: 'guptamaya'
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.topic: conceptual
ms.date: 01/16/2024
---

# Privacy, security, and responsible use of Copilot for Data Factory (preview)

With Copilot for Data Factory in Microsoft Fabric and other generative AI features in preview, Microsoft Fabric brings a new way to transform and analyze data, generate insights, and create visualizations and reports in Data Science and the other workloads.

Before your business starts using Copilot in Fabric, you may have questions about how it works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly.

The article [Privacy, security, and responsible use for Copilot (preview)](copilot-privacy-security.md) provides an overview of Copilot in Fabric. Read on for details about Copilot for Data Factory.

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Capabilities and intended uses of Copilot for Data Factory

- The Copilot features in Data Factory currently support use in Dataflow Gen2. These features include the Copilot chat pane and suggested transformations. 
- Copilot has the following intended uses:

  - Provide a summary of the query and the applied steps. 
  - Generate new transformation steps for an existing query. 
  - Generate a new query that may include sample data or a connection to a data source that requires configuring authentication. 

## Limitations of Copilot for Data Factory

Here are the current limitations of Copilot for Data Factory: 

- Copilot can't perform transformations or explanations across multiple queries in a single input. For instance, you can't ask Copilot to "Capitalize all the column headers for each query in my dataflow." 
- Copilot doesn't understand previous inputs and can't undo changes after a user commits a change when authoring, either via user interface or the chat pane. For example, you can't ask Copilot to "Undo my last 5 inputs." However, users can still use the existing user interface options to delete unwanted steps or queries. 
- Copilot can't make layout changes to queries in your session. For example, if you tell Copilot to create a new group for queries in the editor, it doesn't work. 
- Copilot may produce inaccurate results when the intent is to evaluate data that isn't present within the sampled results imported into the sessions data preview. 
- Copilot doesn't produce a message for the skills that it doesn't support. For example, if you ask Copilot to "Perform statistical analysis and write a summary over the contents of this query", it doesn't complete the instruction successfully as mentioned previously. Unfortunately, it doesn't give an error message either. 

## Data use of Copilot for Data Factory

- Copilot can only access data that is accessible to the user's current Gen2 dataflow session, and that is configured and imported into the data preview grid. Learn more about getting data in Power Query. 

## Evaluation of Copilot for Data Factory
 
- The product team has tested Copilot to see how well the system performs within the context of Gen2 dataflows, and whether AI responses are insightful and useful. 
- The team also invested in other harms mitigations, including technological approaches to focusing Copilot's output on topics related to data integration. 
 
## Tips for working with Copilot for Data Factory

- Copilot is best equipped to handle data integration topics, so it's best to limit your questions to this area. 
- If you include descriptions such as query names, column names, and values in the input, Copilot is more likely to generate useful outputs. 
- Try breaking complex inputs into more granular tasks. This helps Copilot better understand your requirements and generate a more accurate output.

## Notes by release

Additional information for future releases or feature updates will appear here.

## Next steps

- [What is Microsoft Fabric?](microsoft-fabric-overview.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
