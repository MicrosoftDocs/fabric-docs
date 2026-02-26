---
title: Troubleshoot connectors
description: Learn how to troubleshoot connector issues with Data Factory in Fabric.
ms.topic: troubleshooting
ms.date: 08/21/2025
ms.reviewer: jianleishen
ms.custom: connectors
ai-usage: ai-assisted
---

# Troubleshoot connector issues with Data Factory in Fabric

Need help with connector issues in Data Factory? You're in the right place. Let's walk through common problems and their solutions.

## Connector specific problems

Each connector has its own troubleshooting guide with specific issues, causes, and fixes. Find your connector below:

- [Azure Blob Storage](connector-troubleshoot-azure-blob-storage.md)
- [Azure Cosmos DB](connector-troubleshoot-azure-cosmos-db.md)
- [DB2](connector-troubleshoot-db2.md)
- [Azure Data Explorer](connector-troubleshoot-azure-data-explorer.md)
- [Azure Data Lake Storage](connector-troubleshoot-azure-data-lake-storage.md)
- [Azure Database for PostgreSQL](connector-troubleshoot-azure-database-for-postgresql.md)
- [Azure Files](connector-troubleshoot-azure-files.md)
- [Azure Synapse Analytics, Azure SQL Database, SQL Server, Azure SQL Managed Instance, and Amazon RDS for SQL Server](connector-troubleshoot-synapse-sql.md)
- [Azure Table Storage](connector-troubleshoot-azure-table-storage.md)
- [Dynamics 365, Dataverse (Common Data Service), and Dynamics CRM](connector-troubleshoot-dynamics-dataverse.md)
- [MongoDB](connector-troubleshoot-mongodb.md)
- [Oracle](connector-troubleshoot-oracle.md)
- [Snowflake](connector-troubleshoot-snowflake.md)
- [FTP-SFTP-HTTP](connector-troubleshoot-ftp-sftp-http.md)
- [REST](connector-troubleshoot-rest.md)
- [Sharepoint Online list](connector-troubleshoot-sharepoint-online-list.md)

We also have guides for different file formats:

- [Delimited text](connector-troubleshoot-delimited-text.md)
- [ORC](connector-troubleshoot-orc-format.md)
- [Parquet](connector-troubleshoot-parquet-format.md)
- [XML](connector-troubleshoot-xml.md)

Can't find what you need in the guides above? Check out the [Data Factory limitations](data-factory-limitations.md) and [Known issues](data-factory-known-issues.md) pages for more help.

## General copy activity errors

Here are common errors you might see when using Copy activity with any connector:

#### Error code: 20000

- **Message**: `Java Runtime Environment cannot be found on the on-premises data gateway (OPDG) machine. It is required for parsing or writing to Parquet/ORC files. Make sure Java Runtime Environment has been installed on the OPDG machine.`

- **Cause**: The gateway can't find Java Runtime. Java Runtime is required for reading particular sources.

- **Recommendation**:  Check your gateway environment. See [How to access on-premises data gateway (OPDG)](how-to-access-on-premises-data.md).


#### Error code: 20002

- **Message**: `An error occurred when invoking Java Native Interface.`

- **Cause**: If the error message contains "Can't create JVM: JNI return code [-6][JNI call failed: Invalid arguments.]," the possible cause is that JVM can't be created because some illegal (global) arguments are set.

- **Recommendation**: Sign in to the machine that hosts *each node* of your on-premises data gateway (OPDG). Check to ensure that the system variable is set correctly, as follows: `_JAVA_OPTIONS "-Xms256m -Xmx16g" with memory bigger than 8G`. Restart all the gateway nodes, and then rerun the pipeline.

#### Error code: 20020

- **Message**: `Wildcard in path is not supported in sink dataset. Fix the path: '%setting;'.`

- **Cause**: The sink dataset doesn't support wildcard values.

- **Recommendation**:  Check the sink dataset, and rewrite the path without using a wildcard value.

### FIPS issue

- **Symptoms**: Copy activity fails on a FIPS-enabled gateway machine with the following error message: `This implementation is not part of the Windows Platform FIPS validated cryptographic algorithms.` 

- **Cause**: This error might occur when you copy data with connectors such as Azure Blob, SFTP, and so on. Federal Information Processing Standards (FIPS) defines a certain set of cryptographic algorithms that are allowed to be used. When FIPS mode is enabled on the machine, some cryptographic classes that copy activity depends on are blocked in some scenarios.

- **Resolution**: Learn [why we’re not recommending "FIPS Mode" anymore](https://techcommunity.microsoft.com/t5/microsoft-security-baselines/why-we-8217-re-not-recommending-8220-fips-mode-8221-anymore/ba-p/701037), and evaluate whether you can disable FIPS on your gateway machine.

    To bypass FIPS and make the activity work, follow these steps:

    1. Find the gateway installation folder at *"C:\Program Files\on-premises data gateway\FabricIntegrationRuntime\5.0\Shared\"*

    1. Open *fabricworker.exe.config* and add this line at the end of the `<runtime>` section: `<enforceFIPSPolicy enabled="false"/>`

        :::image type="content" source="/azure/data-factory/media/connector-troubleshoot-guide/disable-fips-policy.png" alt-text="Screenshot of a section of the fabricworker.exe.config file showing FIPS disabled.":::

    1. Save the file and restart the gateway machine

#### Error code: 20150

- **Message**: `Failed to get access token from your token endpoint. Error returned from your authorization server: %errorResponse;.`

- **Cause**: Your client ID or client secret is invalid, and the authentication failed in your authorization server.

- **Recommendation**: Correct all OAuth2 client credential flow settings of your authorization server.

#### Error code: 20151

- **Message**: `Failed to get access token from your token endpoint. Error message: %errorMessage;.`

- **Cause**: OAuth2 client credential flow settings are invalid.

- **Recommendation**: Correct all OAuth2 client credential flow settings of your authorization server.

#### Error code: 20152

- **Message**: `The token type '%tokenType;' from your authorization server is not supported, supported types: '%tokenTypes;'.`

- **Cause**: Your authorization server isn't supported.

- **Recommendation**: Use an authorization server that can return tokens with supported token types.

#### Error code: 20153

- **Message**: `The character colon(:) is not allowed in clientId for OAuth2ClientCredential authentication.`

- **Cause**: Your client ID includes the invalid character colon (`:`).

- **Recommendation**: Use a valid client ID.

#### Error code: 20523

- **Message**: `Managed identity credential is not supported in this version ('%version;') of on-premises data gateway (ODPG).`

- **Recommendation**: Check the supported version and upgrade the gateway to a higher version.

#### Error code: 20551

- **Message**: `The format settings are missing in dataset %dataSetName;.`

- **Cause**: The dataset type is Binary, which isn't supported.

- **Recommendation**: Use the DelimitedText, Json, Avro, Orc, or Parquet dataset instead.

- **Cause**: For the file storage, the format settings are missing in the dataset.

- **Recommendation**: Deselect the "Binary copy" in the dataset, and set correct format settings.

#### Error code: 20552

- **Message**: `The command behavior "%behavior;" is not supported.`

- **Recommendation**: Don't add the command behavior as a parameter for preview or GetSchema API request URL.

#### Error code: 20701

- **Message**: `Failed to retrieve source file ('%name;') metadata to validate data consistency.`

- **Cause**: There's a transient issue on the sink data store, or retrieving metadata from the sink data store isn't allowed.

#### Error code: 20703

- **Message**: `Failed to retrieve sink file ('%name;') metadata to validate data consistency.`

- **Cause**: There's a transient issue on the sink data store, or retrieving metadata from the sink data store isn't allowed.

#### Error code: 20704

- **Message**: `Data consistency validation is not supported in current copy activity settings.`

- **Cause**: The data consistency validation is only supported in the direct binary copy scenario.

- **Recommendation**: Remove the 'validateDataConsistency' property in the copy activity payload.

#### Error code: 20705

- **Message**: `'validateDataConsistency' is not supported in this version ('%version;') of on-premises data gateway (ODPG).`

- **Recommendation**: Check the supported gateway version and upgrade it to a higher version, or remove the 'validateDataConsistency' property from copy activities.

#### Error code: 20741

- **Message**: `Skip missing file is not supported in current copy activity settings, it's only supported with direct binary copy with folder.`

- **Recommendation**: Remove 'fileMissing' of the skipErrorFile setting in the copy activity payload.

#### Error code: 20742

- **Message**: `Skip inconsistency is not supported in current copy activity settings, it's only supported with direct binary copy when validateDataConsistency is true.`

- **Recommendation**: Remove 'dataInconsistency' of the skipErrorFile setting in the copy activity payload.

#### Error code: 20743

- **Message**: `Skip forbidden file is not supported in current copy activity settings, it's only supported with direct binary copy with folder.`

- **Recommendation**: Remove 'fileForbidden' of the skipErrorFile setting in the copy activity payload.

#### Error code: 20744

- **Message**: `Skip forbidden file is not supported for this connector: ('%connectorName;').`

- **Recommendation**: Remove 'fileForbidden' of the skipErrorFile setting in the copy activity payload.

#### Error code: 20745

- **Message**: `Skip invalid file name is not supported in current copy activity settings, it's only supported with direct binary copy with folder.`

- **Recommendation**: Remove 'invalidFileName' of the skipErrorFile setting in the copy activity payload.

#### Error code: 20746

- **Message**: `Skip invalid file name is not supported for '%connectorName;' source.`

- **Recommendation**: Remove 'invalidFileName' of the skipErrorFile setting in the copy activity payload.

#### Error code: 20747

- **Message**: `Skip invalid file name is not supported for '%connectorName;' sink.`

- **Recommendation**: Remove 'invalidFileName' of the skipErrorFile setting in the copy activity payload.

#### Error code: 20748

- **Message**: `Skip all error file is not supported in current copy activity settings, it's only supported with binary copy with folder.`

- **Recommendation**: Remove 'allErrorFile' in the skipErrorFile setting in the copy activity payload.

#### Error code: 20771

- **Message**: `'deleteFilesAfterCompletion' is not support in current copy activity settings, it's only supported with direct binary copy.`

- **Recommendation**: Remove the 'deleteFilesAfterCompletion' setting or use direct binary copy.

#### Error code: 20772

- **Message**: `'deleteFilesAfterCompletion' is not supported for this connector: ('%connectorName;').`

- **Recommendation**: Remove the 'deleteFilesAfterCompletion' setting in the copy activity payload.

#### Error code: 27002

- **Message**: `Failed to download custom plugins.`

- **Cause**: Invalid download links or transient connectivity issues.

- **Recommendation**: Retry if the message shows that it's a transient issue. If the problem persists, contact the support team.

## General connector errors

#### Error code: 9611

- **Message**: `The following ODBC Query is not valid: '%'.`
 
- **Cause**: You provide a wrong or invalid query to fetch the data/schemas.

- **Recommendation**: Verify your query is valid and can return data/schemas. Use [Script activity](script-activity.md) if you want to execute nonquery scripts and your data store is supported. Alternatively, consider to use stored procedure that returns a dummy result to execute your nonquery scripts.

#### Error code: 11775

- **Message**: `Failed to connect to your instance of Azure Database for PostgreSQL flexible server. '%'`
 
- **Cause**: Exact cause depends on the text returned in `'%'`. If it's **The operation has timed out**, it can be because the instance of PostgreSQL is stopped or because the network connectivity method configured for your instance doesn't allow connections from the gateway selected. User or password provided is incorrect. If it's **28P01: password authentication failed for user &lt;youruser&gt;**, it means that the user provided doesn't exist in the instance or that the password is incorrect. If it's **28000: no pg_hba.conf entry for host "*###.###.###.###*", user "&lt;youruser&gt;", database "&lt;yourdatabase&gt;", no encryption**, it means that the encryption method selected isn't compatible with the configuration of the server.

- **Recommendation**: Confirm that the user provided exists in your instance of PostgreSQL and that the password corresponds to the one currently assigned to that user. Make sure that the encryption method selected is accepted by your instance of PostgreSQL, based on its current configuration. If the network connectivity method of your instance is configured for Private access (virtual network integration), use an on-premises data gateway (OPDG) to connect to it.

## Related content

Check out these other resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Share your feature ideas](https://ideas.fabric.microsoft.com/)
