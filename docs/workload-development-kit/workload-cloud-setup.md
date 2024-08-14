---
title: Overview of the workload cloud setup steps for the Fabric Workload Development Kit
description: This article describes the prerequisites and steps to use a cloud environment with the Workload Development Kit.
author: AnitaMayorov
ms.author: anitamayorov
ms.reviewer: muliwienrib
ms.topic: how-to
ms.custom:
ms.date: 08/12/2024
---

# Working in cloud mode (preview)

In this section, we cover the requirements for deploying a workload that operates on a remote server with internet access. The deployment is composed of two main parts:

- **Workload Client Code**: The frontend part embedded as an iFrame within the Fabric UI.
- **Workload Backend**: The server-side component that processes your workload.

Deploy both components as cloud services. You can host them on separate servers if needed.

To be able to work with your workload in cloud mode, you need to configure your app information and domains properly. 

## Microsoft Entra ID app ResourceId format

The Microsoft Entra ID app resourceId should comply with the following format:
```
https://<ISV's tenant verified domain>/<workload frontend server>/<workload backend server>/<workload id>/<optional string>
```
- ISV's tenant verified domain -  an exact match of the verified domain in the publisher's tenant without any prefixes or subdomains. [Learn how to add a custom domain to Microsoft Entra](/entra/fundamentals/add-custom-domain).
- Workload frontend server - the frontend server name as it appears in the frontend URL (the extra segment in the frontend URL on top of the verified domain).
- Workload backend server - the backend server name as it appears in the backend URL (the extra segment in the backend URL on top of the verified domain).
- Workload ID - the workload ID as it appears in the workload manifest.
- At the end of the resourceId, there can be an optional string.

> [!NOTE]
> - `*.onmicrosoft` subdomains are not permitted in URLs.
> - The optional string must contain alphanumeric (English) characters or hyphens only and cannot exceed a length of 36 characters.

## Frontend and backend domains

- Frontend and backend URLs must be subdomains of the resourceId with a maximum of 1 extra segment.
- Reply URL host domain should be the same as the frontend host domain.

**Examples:**
- Microsoft Entra ID app resourceId: `https://datafactory.contoso.com/feserver/beserver/Fabric.WorkloadSample/123`
- Frontend domain: `https://feserver.datafactory.contoso.com`
- Backend domain: `https://beserver.datafactory.contoso.com`
- Redirect URI: `https://feserver.datafactory.contoso.com/close`

## Configuring the workload's endpoints
Add the workload's backend URL to the `CloudServiceConfiguration` section in the manifest and name it *Workload*.

Add the workload's frontend URL to the `CloudServiceConfiguration` section in the manifest and name it *Frontend*.
```
<CloudServiceConfiguration>
    <Cloud>Public</Cloud>
    ...
    <Endpoints>
        <ServiceEndpoint>
        <Name>Workload</Name>
        <Url>https://beserver.datafactory.contoso.com/workload</Url>
        </ServiceEndpoint>
        <ServiceEndpoint>
        <Name>Frontend</Name>
        <Url>https://feserver.datafactory.contoso.com</Url>
        </ServiceEndpoint>
    </Endpoints>
</CloudServiceConfiguration>
```

## Configuring your application in Microsoft Entra ID
When configuring your application in Microsoft Entra Id, ensure the following applies:
1. The Redirect URL should point to your frontend URL appended with `/close`, for exmaple, `feserver.datafactory.contoso.com/close`.
2. The application Id URI should match the verified domain of your application.

> [!NOTE]
> All other application configurations in Microsoft Entra Id are the same as in dev mode.

## Configuring your workload (Backend)
Navigate to `src/appsettings.json` in the Backend sample and configure the following applies:
- `PublisherTenantId`: The tenant ID of the publisher.
- `ClientId`: Your application ID (found in Microsoft Entra ID under overview).
- `ClientSecret`: The secret created earlier when configuring the Microsoft Entra ID app.
- `Audience`: The ID URI configured earlier in the Microsoft Entra ID app.

Next, configure your `WorkloadManifest.xml` by navigating to `src/Packages/manifest/WorkloadManifest.xml` and setting your AppId, redirectUri, and ResourceId (ID URI) under "AADApp".
Note the requirements specified by [XSD file](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Packages/manifest/WorkloadDefinition.xsd) and the following [backend manifest overview](backend-manifest.md).

## Configuring your frontend app
Set WORKLOAD_BE_URL to your workload backend URL (for example beserver.datafactory.contoso.com) in .env.test file.
```
WORKLOAD_NAME=Fabric.WorkloadSample
WORKLOAD_BE_URL=beserver.datafactory.contoso.com
```
