---
title: Troubleshoot the Dynamics 365, Dataverse (Common Data Service), and Dynamics CRM connectors
description: Learn how to troubleshoot issues with the Dynamics 365, Dataverse (Common Data Service), and Dynamics CRM connectors in Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: troubleshooting
ms.date: 10/23/2024
ms.custom: connectors
---

# Troubleshoot the Dynamics 365, Dataverse (Common Data Service), and Dynamics CRM connectors in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the Dynamics 365, Dataverse (Common Data Service), and Dynamics CRM connectors in Data Factory in Microsoft Fabric.

## Error code: DynamicsCreateServiceClientError

- **Message**: `This is a transient issue on Dynamics server side. Try to rerun the pipeline.`

- **Cause**: The problem is a transient issue on the Dynamics server side.

- **Recommendation**:  Rerun the pipeline. If it fails again, try to reduce the parallelism. If the problem persists, contact Dynamics support.


## Missing columns when you import a schema or preview data

- **Symptoms**: Some columns are missing when you import a schema or preview data. Error message: `The valid structure information (column name and type) are required for Dynamics source.`

- **Cause**: This issue is by design, because Data Factory and Synapse pipelines are unable to show columns that contain no values in the first 10 records. Make sure that the columns you added are in the correct format.

- **Recommendation**: Manually add the columns in the mapping tab. For more information, see [Explicit mapping](/azure/data-factory/copy-activity-schema-and-type-mapping#explicit-mapping).


## Error code: DynamicsMissingTargetForMultiTargetLookupField

- **Message**: `Cannot find the target column for multi-target lookup field: '%fieldName;'.`

- **Cause**: The target column doesn't exist in the source or in the column mapping.

- **Recommendation**:  
  1. Make sure that the source contains the target column. 
  2. Add the target column in the column mapping. Ensure that the destination column is in the format *{fieldName}@EntityReference*.


## Error code: DynamicsInvalidTargetForMultiTargetLookupField

- **Message**: `The provided target: '%targetName;' is not a valid target of field: '%fieldName;'. Valid targets are: '%validTargetNames;'`

- **Cause**: A wrong entity name is provided as target entity of a multi-target lookup field.

- **Recommendation**:  Provide a valid entity name for the multi-target lookup field.


## Error code: DynamicsInvalidTypeForMultiTargetLookupField

- **Message**: `The provided target type is not a valid string. Field: '%fieldName;'.`

- **Cause**: The value in the target column isn't a string.

- **Recommendation**:  Provide a valid string in the multi-target lookup target column.


## Error code: DynamicsFailedToRequetServer

- **Message**: `The Dynamics server or the network is experiencing issues. Check network connectivity or check Dynamics server log for more details.`

- **Cause**: The Dynamics server is instable or inaccessible, or the network is experiencing issues.

- **Recommendation**:  For more details, check network connectivity or check the Dynamics server log. For further help, contact Dynamics support.


## Error code: DynamicsFailedToConnect 
 
 - **Message**: `Failed to connect to Dynamics: %message;` 
 
 - **Causes and recommendations**: Different causes can lead to this error. Check the following list for possible cause analysis and related recommendation.

    | Cause analysis                                               | Recommendation                                               |
    | :----------------------------------------------------------- | :----------------------------------------------------------- |
    | You're seeing `ERROR REQUESTING ORGS FROM THE DISCOVERY SERVERFCB 'EnableRegionalDisco' is disabled.` or otherwise `Unable to Login to Dynamics CRM, message:ERROR REQUESTING Token FROM THE Authentication context - USER intervention required but not permitted by prompt behavior AADSTS50079: Due to a configuration change made by your administrator, or because you moved to a new location, you must enroll in multi-factor authentication to access '00000007-0000-0000-c000-000000000000'` If your use case meets **all** of the following three conditions: <br/><br/>• You're connecting to Dynamics 365, Common Data Service, or Dynamics CRM.<br/>• You're using Office365 Authentication.<br/>• Your tenant and user is configured in Microsoft Entra ID for [conditional access](/azure/active-directory/conditional-access/overview) and/or multifactor authentication is required (see this [link](/powerapps/developer/data-platform/authenticate-office365-deprecation) to Dataverse doc).<br/><br/>Under these circumstances, the connection used to succeed before 6/8/2021. Starting 6/9/2021, connection will start to fail because of the deprecation of regional Discovery Service (see this [link](/power-platform/important-changes-coming#regional-discovery-service-is-deprecated)).| If your tenant and user is configured in Microsoft Entra ID for [conditional access](/azure/active-directory/conditional-access/overview) and/or multifactor authentication is required, you must use 'Microsoft Entra service principal' to authenticate after 6/8/2021. Refer this [link](/azure/data-factory/connector-dynamics-crm-office-365#prerequisites) for detailed steps.|
    |If you see `Office 365 auth with OAuth failed` in the error message, it means that your server might have some configurations not compatible with OAuth.|• Contact Dynamics support team with the detailed error message for help.<br/>• Use the service principal authentication, and you can refer to this article: [Example: Dynamics online using Microsoft Entra service principal and certificate authentication](/azure/data-factory/connector-dynamics-crm-office-365#example-dynamics-online-using-azure-ad-service-principal-and-certificate-authentication).
    |If you see `Unable to retrieve authentication parameters from the serviceUri` in the error message, it means that either you input the wrong Dynamics service URL or proxy/firewall to intercept the traffic. |• Make sure you put the correct service URI in the connection.<br/>• If you use the Self Hosted IR, make sure that the firewall/proxy doesn't intercept the requests to the Dynamics server. |
    |If you see `An unsecured or incorrectly secured fault was received from the other party` in the error message, it means that unexpected responses were gotten from the server side.  | • Make sure your username and password are correct if you use the Office 365 authentication. <br/>•  Make sure you input the correct service URI.<br/>• If you use regional CRM URL (URL has a number after 'crm'), make sure you use the correct regional identifier.<br/>• Contact the Dynamics support team for help.|
    |If you see `No Organizations Found` in the error message, it means that either your organization name is wrong or you used a wrong CRM region identifier in the service URL.|• Make sure you input the correct service URI.<br/>• If you use the regional CRM URL (URL has a number after 'crm'), make sure that you use the correct regional identifier.<br/>• Contact the Dynamics support team for help.|
    | If you see `401 Unauthorized` and Microsoft Entra related error message, it means that there's an issue with the service principal. |Follow the guidance in the error message to fix the service principal issue. |
   |For other errors, usually the issue is on the server side. |Use [XrmToolBox](https://www.xrmtoolbox.com/) to make connection. If the error persists, contact the Dynamics support team for help. |

## Error code: DynamicsOperationFailed 
 
- **Message**: `Dynamics operation failed with error code: %code;, error message: %message;.` 

- **Cause**: The operation failed on the server side. 

- **Recommendation**:  Extract the error code of the dynamics operation from the error message: `Dynamics operation failed with error code: {code}`, and refer to the article [Web service error codes](/powerapps/developer/data-platform/org-service/web-service-error-codes) for more detailed information. You can contact the Dynamics support team if necessary. 
 
 
## Error code: DynamicsInvalidFetchXml 
  
- **Message**: `The Fetch Xml query specified is invalid.` 

- **Cause**:  There's an error existed in the fetch XML.  

- **Recommendation**:  Fix the error in the fetch XML. 
 
 
## Error code: DynamicsMissingKeyColumns 
 
- **Message**: `Input data must contain keycolumn(s) in Upsert/Update scenario. Missing key column(s): %column;`
 
- **Cause**: The source data doesn't contain the key column for the destination entity. 

- **Recommendation**:  Confirm that key columns are in the source data or map a source column to the key column on the destination entity. 
 
 
## Error code: DynamicsPrimaryKeyMustBeGuid 
 
- **Message**: `The primary key attribute '%attribute;' must be of type guid.` 
 
- **Cause**: The type of the primary key column isn't 'Guid'. 
 
- **Recommendation**:  Make sure that the primary key column in the source data is of 'Guid' type. 
 

## Error code: DynamicsAlternateKeyNotFound 
 
- **Message**: `Cannot retrieve key information of alternate key '%key;' for entity '%entity;'.` 
 
- **Cause**: The provided alternate key doesn't exist, which can be caused by wrong key names or insufficient permissions. 
 
- **Recommendation**: <br/> 
    - Fix typos in the key name.<br/> 
    - Make sure that you have sufficient permissions on the entity. 
 
 
## Error code: DynamicsInvalidSchemaDefinition 
 
- **Message**: `The valid structure information (column name and type) are required for Dynamics source.` 
 
- **Cause**: destination columns in the column mapping miss the 'type' property. 
 
- **Recommendation**: You can add the 'type' property to those columns in the column mapping by using JSON editor on the portal. 

## Error code: UserErrorUnsupportedAttributeType
 
- **Message**: `The attribute type 'Lookup' of field %attributeName; is not supported` 
 
- **Cause**: When loading data to Dynamics destination, Azure Data Factory imposes validation on lookup attribute's metadata. However, there's the known issue of certain Dynamics entities not having valid lookup attribute metadata that holds a list of targets, which would fail the validation.

- **Recommendation**: Contact Dynamics support team to mitigate the issue.

## The copy activity from the Dynamics 365 reads more rows than the actual number

- **Symptoms**: The copy activity from the Dynamics 365 reads more rows than the actual number.

- **Cause**: The Dynamics 365 server always indicates more available records. 

- **Recommendation**: Use **XrmToolBox** to test the FetchXML with paging. **XrmToolBox** with some installed tools can get records count. For more information, see [XrmToolBox](https://www.xrmtoolbox.com/).

## Can't access virtual columns from Dynamics sources in the copy activity

- **Symptoms**: You can't access virtual columns from Dynamics sources in the copy activity.

- **Cause**: The virtual column isn't supported now. 

- **Recommendation**: For the Option Set value, follow the options below to get it:
  - You can get the object type code by referring to [How to Find the Object Type Code for Any Entity](https://sysadmin-central.com/2021/03/15/dynamics-365-entity-type-code-list/).
  - You can link the StringMap entity to your target entity and get the associated values.

## The parallel copies in a Dynamics CRM data store

- **Symptoms**: You don't know if it's possible to configure the parallel copy in a Dynamics CRM data store, and you also don't know the range of values that can be set in the "Degree of copy parallelism" section.

- **Recommendation**: The parallel copy controls parallelism, and the "Degree of copy parallelism" section can be set to nonzero value. A large number can cause throttling on dynamics server side, which can reduce throughput, but now the throttling is handled by taking the public SDK.

  :::image type="content" source="/azure/data-factory/media/connector-troubleshoot-guide/degree-of-copy-parallelism-section.png" alt-text="Diagram of Degree of copy parallelism section.":::

## Dynamics type conversion

- **Symptoms**: You try to convert the GUID to a string in the Dynamics source, but you encounter an error.

- **Cause**: When Dynamics is used as the source, the type conversion isn't supported.

- **Recommendation**: Enable the staging and retry.

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
