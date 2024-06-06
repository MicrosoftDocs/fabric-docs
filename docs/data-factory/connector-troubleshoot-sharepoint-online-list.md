---
title: Troubleshoot the SharePoint Online list connector
description: Learn how to troubleshoot issues with the SharePoint Online list connector in Data Factory in Microsoft Fabric.
ms.reviewer: jburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: troubleshooting
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Troubleshoot the SharePoint Online list connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the SharePoint Online list connector in Data Factory in Microsoft Fabric.

## Error code: SharePointOnlineAuthFailed

- **Message**: `The access token generated failed, status code: %code;, error message: %message;.`

- **Cause**: The service principal ID and key might not be set correctly.

- **Recommendation**:  Check your registered application (service principal ID) and key to see whether they're set correctly.

## Connection failed after granting permission in SharePoint Online List 

### Symptoms 

You granted permission to your data factory in SharePoint Online List, but you still fail with the following error message:

`Failed to get metadata of odata service, please check if service url and credential is correct and your application has permission to the resource. Expected status code: 200, actual status code: Unauthorized, response is : {"error":"invalid_request","error_description":"Token type is not allowed."}.`

### Cause 

The SharePoint Online List uses ACS to acquire the access token to grant access to other applications. But for the tenant built after November 7, 2018, ACS is disabled by default. 

### Recommendation

You need to enable ACS to acquire the access token. Take the following steps:  

1. Download [SharePoint Online Management Shell](https://www.microsoft.com/download/details.aspx?id=35588#:~:text=The%20SharePoint%20Online%20Management%20Shell%20has%20a%20new,and%20saving%20the%20file%20to%20your%20hard%20disk.), and ensure that you have a tenant admin account. 
1. Run the following command in the SharePoint Online Management Shell. Replace `<tenant name>` with your tenant name and add `-admin` after it.  

   ```powershell
   Connect-SPOService -Url https://<tenant name>-admin.sharepoint.com/ 
   ```
1. Enter your tenant admin information in the pop-up authentication window. 
1. Run the following command:

   ```powershell
   Set-SPOTenant -DisableCustomAppAuthentication $false 
   ```
    :::image type="content" source="./media/connector-troubleshoot-sharepoint-online-list/sharepoint-online-management-shell-command.png" alt-text="Screenshot showing  sharepoint online management shell command.":::

1. Use ACS to get the access token. 


## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/en-us/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
