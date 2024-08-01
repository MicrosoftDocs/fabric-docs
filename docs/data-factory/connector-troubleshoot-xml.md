---
title: Troubleshoot the XML format connector
description: Learn how to troubleshoot issues with the XML format connector in Data Factory in Microsoft Fabric.
ms.reviewer: jburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: troubleshooting
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Troubleshoot the XML format connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the XML format connector in Data Factory in Microsoft Fabric.

## Error code: XmlSinkNotSupported

- **Message**: `Write data in XML format is not supported yet, choose a different format!`

- **Cause**: XML data was used as destination data in your copy activity.

- **Recommendation**: Use data in a different format from that of the destination data.


## Error code: XmlAttributeColumnNameConflict

- **Message**: `Column names %attrNames;' for attributes of element '%element;' conflict with that for corresponding child elements, and the attribute prefix used is '%prefix;'.`

- **Cause**: An attribute prefix was used, which caused the conflict.

- **Recommendation**:  Set a different value for the "attributePrefix" property.


## Error code: XmlValueColumnNameConflict

- **Message**: `Column name for the value of element '%element;' is '%columnName;' and it conflicts with the child element having the same name.`

- **Cause**: One of the child element names was used as the column name for the element value.

- **Recommendation**:  Set a different value for the "valueColumn" property.


## Error code: XmlInvalid

- **Message**: `Input XML file '%file;' is invalid with parsing error '%error;'.`

- **Cause**: The input XML file is not well formed.

- **Recommendation**:  Correct the XML file to make it well formed.

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/en-us/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
