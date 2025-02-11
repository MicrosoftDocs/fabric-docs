---
title: Cross tenant access
description: An article about a private preview feature
author: KesemSharabi
ms.author: kesharab
ms.topic: article
ms.date: 02/10/2025
---

# Cross tenant access (preview)

@@@@@@@ somewhere add CONCENT

@@@@@@@ Terminology: Gust and Provider

@@@@@@@ Link to doc: https://microsoft.sharepoint.com/:w:/t/DataCloud/ER5rSiSf5dRJv1uBY8F77TcBJV8Ua8qR3tKMREW6CW_gow?e=oXNUgg

>[!IMPORTANT]
>Cross tenant access is a private preview feature. To participate in the preview, contact your Microsoft representative.

Cross tenant access allows third parties to access data in their Microsoft Fabric tenant through a Tabular Data Stream (TDS) endpoint. This feature is useful for organizations that need to access data that is managed by a third-party service provider<sup>*</sup>. For example, when company A manages Fabric data for company B, company B can use cross tenant access to access their data in company A's Fabric tenant.

This article is aimed at third parties who want to set up cross tenant access.

<sup>*</sup>The term *third-party service provider* is also known as *independent software vendor (ISV)*.

## Prerequisites



## Install Microsoft Fabric

Follow these steps to install Microsoft Fabric.

1. Open [Graph explorer](https://aka.ms/ge).

2. Select **Sign in** (the profile icon button).

3. Sign in with an account that is an administrator of the tenant. <!-- how do they have an admin on the tenant? -->

4. In the request field, select **POST** and enter the following URL:

    ```http
    POST https://graph.microsoft.com/v1.0/servicePrincipals
    ```

5. In the request body, enter the following JSON:

    ```json
    { 
        "appId" : "<App_ID_of_your_first-party_app>"
    }
    ```

6. Select **Run query**.

## Provide concent

??? Missing PowerShell script to provide concent

