---
title: Troubleshoot the Snowflake connector
titleSuffix: Fabric Data Factory & Azure Synapse
description: Learn how to troubleshoot issues with the Snowflake connector in Fabric Data Factory and Azure Synapse Analytics.
ms.subservice: data-movement
ms.topic: troubleshooting
ms.date: 11/08/2024
ms.reviewer: jianleishen
ms.custom: has-adal-ref, synapse, connectors
---

# Troubleshoot the Snowflake connector in Data Factory and Azure Synapse


This article provides suggestions to troubleshoot common problems with the Snowflake connector in Data Factory and Azure Synapse. 

## Error code: NotAllowToAccessSnowflake

- **Symptoms**: The copy activity fails with the following error: 

    `IP % is not allowed to access Snowflake. Contact your local security administrator. `

- **Cause**: It's a connectivity issue and usually caused by firewall IP issues when accessing your Snowflake.  

- **Recommendation**:  

    - If you configure a [on-premises data gateway](how-to-access-on-premises-data.md) to connect to Snowflake, make sure to add your on-premises data gateway(OPDG) IPs to the allowed list in Snowflake. 

## Error code: SnowflakeFailToAccess

- **Symptoms**:<br>
The copy activity fails with the following error when using Snowflake as source:<br> 
    `Failed to access remote file: access denied. Please check your credentials`<br>
The copy activity fails with the following error when using Snowflake as sink:<br>
    `Failure using stage area. Cause: [This request is not authorized to perform this operation. (Status Code: 403; Error Code: AuthorizationFailure)`<br>

- **Cause**: The error pops up by the Snowflake COPY command and is caused by missing access permission on source/sink when execute Snowflake COPY commands. 

- **Recommendation**: Check your source/sink to make sure that you have granted proper access permission to Snowflake. 

    - Direct copy: Make sure to grant access permission to Snowflake in the other source/sink. Currently, only Azure Blob Storage that uses shared access signature authentication is supported as source or sink. When you generate the shared access signature, make sure to set the allowed permissions and IP addresses to Snowflake in the Azure Blob Storage. For more information, see this [article](https://docs.snowflake.com/en/user-guide/data-load-azure-config.html#option-2-generating-a-sas-token). 
    - Staged copy: The staging Azure Blob Storage linked service must use shared access signature authentication. When you generate the shared access signature, make sure to set the allowed permissions and IP addresses to Snowflake in the staging Azure Blob Storage. For more information, see this [article](https://docs.snowflake.com/en/user-guide/data-load-azure-config.html#option-2-generating-a-sas-token).
 
## Related content

For more troubleshooting help, try these resources:
- [Data Factory blog](https://blog.fabric.microsoft.com/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests](https://ideas.fabric.microsoft.com/)
