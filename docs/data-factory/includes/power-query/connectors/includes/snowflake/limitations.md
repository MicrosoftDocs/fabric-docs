---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/snowflake/snowflake-limitations-and-considerations-include.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

### Known issues in Snowflake connector implementation 2.0

Currently, the [Snowflake connector implementation 2.0](/power-query/connectors/snowflake#snowflake-connector-implementation-20) has the following known issues. There's ongoing work towards a fix and the documentation will be updated when a fix is released.

- Snowflake query with `count distinct` logic returns incorrect result.
- Increased memory use. The overall load time is typically faster using `Implementation="2.0"`, but the memory consumption can also be higher, in some cases causing issues such as `Resource Governing: This operation was canceled because there wasn't enough memory to finish running it. Either reduce the memory footprint of your dataset by doing things such as limiting the amount of imported data, or if using Power BI Premium, increase the memory of the Premium capacity where this dataset is hosted.`  

### Resolved issues

#### Hyphens in database names

If a database name has a hyphen in it, you can encounter an ```ODBC: ERROR[42000] SQL compilation error```. This issue is addressed in the September 2024 release.

#### Slicer visual for Boolean datatype

The slicer visual for the Boolean data type isn't functioning as expected in the June 2024 release. This nonfunctionality is a known issue. As a temporary solution, users can convert the Boolean data type in their reports to text by navigating to: Transfer -> Data Type -> Text. A fix is provided in October 2024 release.

#### Views not visible with Implementation="2.0"

In some version of the March 2025 release of Power BI Desktop, you might encounter an issue that views aren't visible when using the [Snowflake connector implementation 2.0](/power-query/connectors/snowflake#snowflake-connector-implementation-20) (`Implementation="2.0"`). This issue is fixed since the latest March 2025 release of Power BI Desktop. To try again, upgrade your installation.
