---
title: Troubleshoot the Parquet format connector
description: Learn how to troubleshoot issues with the Parquet format connector in Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: troubleshooting
ms.date: 10/23/2024
ms.custom: connectors
---

# Troubleshoot the Parquet format connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the Parquet format connector in Data Factory in Microsoft Fabric.

## Error code: ParquetInvalidFile

- **Message**: `File is not a valid Parquet file.`

- **Cause**: This is a Parquet file issue.

- **Recommendation**:  Check to see whether the input is a valid Parquet file.

## Error code: ParquetNotSupportedType

- **Message**: `Unsupported Parquet type. PrimitiveType: %primitiveType; OriginalType: %originalType;.`

- **Cause**: The Parquet format isn't supported in Azure Data Factory and Synapse pipelines.

- **Recommendation**:  Double-check the source data by going to [Supported file formats and compression codecs by copy activity](/azure/data-factory/supported-file-formats-and-compression-codecs).

## Error code: ParquetMissedDecimalPrecisionScale

- **Message**: `Decimal Precision or Scale information is not found in schema for column: %column;.`

- **Cause**: The number precision and scale were parsed, but no such information was provided.

- **Recommendation**:  The source doesn't return the correct precision and scale information. Check the issue column for the information.

## Error code: ParquetInvalidDecimalPrecisionScale

- **Message**: `Invalid Decimal Precision or Scale. Precision: %precision; Scale: %scale;.`

- **Cause**: The schema is invalid.

- **Recommendation**:  Check the issue column for precision and scale.

## Error code: ParquetColumnNotFound

- **Message**: `Column %column; does not exist in Parquet file.`

- **Cause**: The source schema is a mismatch with the destination schema.

- **Recommendation**:  Check the mappings in the activity. Make sure that the source column can be mapped to the correct destination column.

## Error code: ParquetInvalidDataFormat

- **Message**: `Incorrect format of %srcValue; for converting to %dstType;.`

- **Cause**: The data can't be converted into the type that's specified in mappings.source.

- **Recommendation**:  Double-check the source data or specify the correct data type for this column in the copy activity column mapping. For more information, see [Supported file formats and compression codecs by the copy activity](/azure/data-factory/supported-file-formats-and-compression-codecs).

## Error code: ParquetDataCountNotMatchColumnCount

- **Message**: `The data count in a row '%sourceColumnCount;' does not match the column count '%destinationColumnCount;' in given schema.`

- **Cause**:  A mismatch between the source column count and the destination column count.

- **Recommendation**:  Double-check to ensure that the source column count is same as the destination column count in 'mapping'.

## Error code: ParquetDataTypeNotMatchColumnType

- **Message**: `The data type %srcType; is not match given column type %dstType; at column '%columnIndex;'.`

- **Cause**: The data from the source can't be converted to the type that's defined in the destination.

- **Recommendation**:  Specify a correct type in mapping.destination.

## Error code: ParquetBridgeInvalidData

- **Message**: `%message;`

- **Cause**: The data value has exceeded the limit.

- **Recommendation**:  Retry the operation. If the issue persists, contact us.

## Error code: ParquetUnsupportedInterpretation

- **Message**: `The given interpretation '%interpretation;' of Parquet format is not supported.`

- **Cause**: This scenario isn't supported.

- **Recommendation**:  'ParquetInterpretFor' shouldn't be 'sparkSql'.

## Error code: ParquetUnsupportFileLevelCompressionOption

- **Message**: `File level compression is not supported for Parquet.`

- **Cause**: This scenario isn't supported.

- **Recommendation**:  Remove 'CompressionType' in the payload.

## Error code: UserErrorJniException

- **Message**: `Cannot create JVM: JNI return code [-6][JNI call failed: Invalid arguments.]`

- **Cause**: A Java Virtual Machine (JVM) can't be created because some illegal (global) arguments are set.

- **Recommendation**:  Sign-in to the machine that hosts *each node* of your self-hosted IR. Check to ensure that the system variable is set correctly, as follows: `_JAVA_OPTIONS "-Xms256m -Xmx16g" with memory bigger than 8 G`. Restart all the IR nodes, and then rerun the pipeline.

## Arithmetic overflow

- **Symptoms**: Error message occurred when you copy Parquet files: `Message = Arithmetic Overflow., Source = Microsoft.DataTransfer.Common`

- **Cause**: Currently only the decimal of precision <= 38 and length of integer part <= 20 are supported when you copy files from Oracle to Parquet. 

- **Resolution**: As a workaround, you can convert any columns with this problem into VARCHAR2.

## No enum constant

- **Symptoms**: Error message occurred when you copy data to Parquet format: `java.lang.IllegalArgumentException:field ended by &apos;;&apos;`, or: `java.lang.IllegalArgumentException:No enum constant org.apache.parquet.schema.OriginalType.test`.

- **Cause**: 

    The issue could be caused by white spaces or unsupported special characters (such as,;{}()\n\t=) in the column name, because Parquet doesn't support such a format. 

    For example, a column name such as *contoso(test)* parses the type in brackets from [code](https://github.com/apache/parquet-mr/blob/master/parquet-column/src/main/java/org/apache/parquet/schema/MessageTypeParser.java) `Tokenizer st = new Tokenizer(schemaString, " ;{}()\n\t");`. The error is thrown because there's no such "test" type.

    To check supported types, go to the GitHub [apache/parquet-mr site](https://github.com/apache/parquet-mr/blob/master/parquet-column/src/main/java/org/apache/parquet/schema/OriginalType.java).

- **Resolution**: 

    Double-check to see whether:
    - There are white spaces in the destination column name.
    - The first row with white spaces is used as the column name.
    - The type OriginalType is supported. Try to avoid using these special characters: `,;{}()\n\t=`. 

## Error code: ParquetDateTimeExceedLimit

- **Message**: `The Ticks value '%ticks;' for the datetime column must be between valid datetime ticks range -621355968000000000 and 2534022144000000000.`

- **Cause**: If the datetime value is '0001-01-01 00:00:00', it could be caused by the difference between Julian Calendar and Gregorian Calendar. For more details, reference [Difference between Julian and proleptic Gregorian calendar dates](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar#Difference_between_Julian_and_proleptic_Gregorian_calendar_dates).

- **Resolution**: Check the ticks value and avoid using the datetime value '0001-01-01 00:00:00'.

## Error code: ParquetInvalidColumnName

- **Message**: `The column name is invalid. Column name cannot contain these character:[,;{}()\n\t=]`

- **Cause**: The column name contains invalid characters.

- **Resolution**: Add or modify the column mapping to make the destination column name valid.

## The file created by the copy data activity extracts a table that contains a varbinary (max) column

- **Symptoms**: The Parquet file created by the copy data activity extracts a table that contains a varbinary (max) column.

- **Cause**: This issue is caused by the Parquet-mr library bug of reading large column. 

- **Resolution**: Try to generate smaller files (size < 1G) with a limitation of 1,000 rows per file.

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
