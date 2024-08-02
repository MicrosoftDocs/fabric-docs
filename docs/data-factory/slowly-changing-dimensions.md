---
title: Slowly changing dimensions
description: 
author: kromerm
ms.author: makromer
ms.reviewer: jburchel
ms.topic: concept
ms.date: 08/02/2024
---

# Slowly changing dimension patterns

...Clear and concise explanaition of what these are and why they might be helpful...


## Common patterns

|Type|Short description|Summary|Link to article|
|---|----|----|---|
|1|overwrite|This method overwrites old with new data, and therefore does not track historical data| [Link](link)|
|2|add new row|This method tracks historical data by creating multiple records for a given natural key in the dimensional tables with separate surrogate keys and/or different version numbers. Unlimited history is preserved for each insert. The natural key in these examples is the "Supplier_Code" of "ABC"| [Link](link)|
|3|add new attribute|This method tracks changes using separate columns and preserves limited history. The Type 3 preserves limited history as it is limited to the number of columns designated for storing historical data. The original table structure in Type 1 and Type 2 is the same but Type 3 adds additional columns.|[Link](link)|
|4|add history table|The Type 4 method is usually referred to as using "history tables", where one table keeps the current data, and an additional table is used to keep a record of some or all changes. Both the surrogate keys are referenced in the fact table to enhance query performance|[Link](link)|

## Further reading

* Further reading about Dataflow Gen2
* About data warehouse techniques
