---
title: Set up workload cloud mode
description: Learn the prerequisites and steps to use a cloud environment with Microsoft Fabric Workload Development Kit.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 08/12/2024
---

# Set up workload cloud mode

In this article, learn the requirements for deploying a workload that operates on a remote server with internet access in Microsoft Fabric.

The deployment has two main parts:

- **Workload client code**: Frontend code that's embedded as an iFrame in the Microsoft Fabric UI.
- **Workload backend**: The backend, server-side component that processes your workload.

Deploy both components as cloud services. You can host the two components on separate servers if needed.

To work with your workload in cloud mode, you must configure your app information and domains correctly.

## Microsoft Entra ID app resourceId format

The Microsoft Entra ID app `resourceId` value should be in the following format:

```http
https://<ISV's tenant verified domain>/<workload frontend server>/<workload backend server>/<workload id>/<optional string>
```

- **ISV's tenant verified domain**: An exact match of the verified domain in the publisher's tenant without any prefixes or subdomains. Learn how to[add a custom domain to Microsoft Entra](/entra/fundamentals/add-custom-domain).
- **Workload frontend server**: The frontend server name as it appears in the frontend URL (the extra segment in the frontend URL on top of the verified domain).
- **Workload backend server**: The backend server name as it appears in the backend URL (the extra segment in the backend URL on top of the verified domain).
- **Workload ID**: The workload ID as it appears in the workload manifest.
- **Resource ID**: An optional string can be added to the end of the `resourceId` value.

> [!NOTE]
>
> - `*.onmicrosoft` subdomains are not permitted in URLs.
> - The optional string must contain alphanumeric (English) characters or hyphens only and cannot exceed a length of 36 characters.

## Frontend and backend domains

- Frontend and backend URLs must be subdomains of the `resourceId` value, with a maximum of one extra segment.
- The reply URL host domain should be the same as the frontend host domain.

### Examples

- Microsoft Entra ID app `resourceId` value: `https://datafactory.contoso.com/feserver/beserver/Fabric.WorkloadSample/123`
- Frontend domain: `https://feserver.datafactory.contoso.com`
- Backend domain: `https://beserver.datafactory.contoso.com`
- Redirect URI: `https://feserver.datafactory.contoso.com/close`

## Configure the workload's end points

To configure the workload end points:

1. Add the workload's backend URL to the `CloudServiceConfiguration` section in the manifest and name it `Workload`.

1. Add the workload's frontend URL to the `CloudServiceConfiguration` section in the manifest and name it `Frontend`.

Here's an example:

```xml
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

## Configure your application in Microsoft Entra ID

To configure your application in Microsoft Entra:

1. The redirect URL should point to your frontend URL appended with `/close`. For example, `feserver.datafactory.contoso.com/close`.
1. The application ID URI should match the verified domain of your application.

> [!NOTE]
> All other application configurations in Microsoft Entra ID are the same as in developer mode.

## Configure your workload (backend)

1. In the backend sample, open *src/appsettings.json* and configure the following settings:

   - For **PublisherTenantId**, select the tenant ID of the publisher.
   - For **ClientId**, enter your application ID (found in the Microsoft Entra ID overview).
   - For **ClientSecret**, enter the secret you created when you configured the Microsoft Entra ID app.
   - For **Audience**, enter the ID URI you configured in the Microsoft Entra ID app.

1. Open *src/Packages/manifest/WorkloadManifest.xml*.
1. Under `AADApp`, set `AppId`, `redirectUri`, and `ResourceId` (the ID URI).

Note the requirements that are specified in [XSD file](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/dotnet/src/Packages/manifest/WorkloadDefinition.xsd) and the [backend manifest overview](backend-manifest.md).

## Configure your frontend app

In the *.env.test* file, set `WORKLOAD_BE_URL` to your workload backend URL (for example, set it to `beserver.datafactory.contoso.com`).

Here's an example:

```
WORKLOAD_NAME=Fabric.WorkloadSample
WORKLOAD_BE_URL=beserver.datafactory.contoso.com
```
