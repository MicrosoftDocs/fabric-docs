---
title: "Privacy, security, and responsible use for Copilot in Power BI (preview)"
description: Learn about privacy, security, and responsible use for Copilot for Power BI in Microsoft Fabric.
author: maggiesMSFT
ms.author: maggies
ms.reviewer: 'guptamaya'
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.topic: conceptual
ms.date: 01/16/2024
no-loc: [Copilot]
---

# Privacy, security, and responsible use for Copilot in Power BI (preview)

With Copilot and other generative AI features in preview, Power BI brings a new way to transform and analyze data, generate insights, and create visualizations and reports in Power BI and the other workloads.

Before your business starts using Copilot in Fabric, you may have questions about how it works, how it keeps your business data secure and adheres to privacy requirements, and how to use generative AI responsibly.

The article [Privacy, security, and responsible use for Copilot (preview)](copilot-privacy-security.md) provides an overview of Copilot in Fabric. Read on for details about Copilot for Power BI.

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Capabilities and intended uses of Copilot for Power BI

- By using Copilot for Power BI, you can quickly create reports with just a few clicks. Copilot can save you hours of effort building your report pages.
- Copilot provides a summary of your dataset and an outline of suggested pages for your report. Then it generates those pages for the report. After you open a blank report with a semantic model, Copilot can generate:

  - Suggested topics.
  - A report outline: for example, what each page in the report will be about, and how many pages it will create.
  - The visuals for the individual pages.

## Limitations of Copilot for Power BI

Here are the current limitations of Copilot for Power BI:

- Copilot can't modify the visuals after it has generated them.
- Copilot can't add filters or set slicers if you specify them in the prompts. For example, if you say, "Create a sales report for the last 30 days," Copilot can't interpret 30 days as a date filter.
- Copilot can't make layout changes. For example, if you tell Copilot to resize the visuals, or to align all the visuals perfectly, it won't work.
- Copilot can't understand complex intent. For example, suppose you frame a prompt like this: "Generate a report to show incidents by team, incident type, owner of the incident, and do this for only 30 days." This prompt is complex, and Copilot will probably generate irrelevant visuals.
- Copilot doesn't produce a message for the skills that it doesn't support. For example, if you ask Copilot to edit or add a slicer, it won't complete the instruction successfully as mentioned above. Unfortunately, it won't give an error message either.

## Data use in Copilot for Power BI

- Copilot uses the data in a semantic model that you provide, combined with the prompts you enter, to create visuals. Learn more about [semantic models](/power-bi/connect-data/service-datasets-understand).

## Tips for working with Copilot for Power BI

Review [FAQ for Copilot for Power BI](copilot-faq-fabric.yml) for tips and suggestions to help you work with Copilot in this experience.

## Notes by release

Additional information for future releases or feature updates will appear here.

## Related content

- [What is Microsoft Fabric?](microsoft-fabric-overview.md)
- [Copilot in Fabric and Power BI: FAQ](copilot-faq-fabric.yml)
