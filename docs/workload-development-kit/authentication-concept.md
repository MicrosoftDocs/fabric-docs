---
title: Overview of Fabric Workload Development Kit authentication
description: This article describes how to use tokens to authenticate and validate for a customized Fabric workload.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept-article
ms.custom: sfi-image-nochange
ms.date: 05/21/2024
#customer intent: As a developer, I want to understand how to authenticate a customized Fabric workload so that I can create customized user experiences.
---

# Authentication overview

Fabric workloads rely on integration with [Microsoft Entra ID](/entra/fundamentals/whatis) for authentication and authorization.

All interactions between workloads and other Fabric or Azure components must be accompanied by proper authentication support for requests received or sent. Tokens sent out must be generated properly, and tokens received must be validated properly as well.  

It's recommended that you become familiar with the [Microsoft identity platform](/entra/identity-platform/) before starting to work with Fabric workloads. It's also recommended to go over [Microsoft identity platform best practices and recommendations](/entra/identity-platform/identity-platform-integration-checklist).

## Flows

<!--:::image type="content" source="./media/authentication-concept/authentication-diagram.png" alt-text="Screenshot showing the Workload Development Kit authentication flow.":::
-->

* From workload frontend to workload backend

   An example of such communication is any data plane API. This communication is done with a Subject token (Delegated token).

   For information on how to acquire a token in the workload FE, read [Authentication API](./authentication-javascript-api.md). In addition, make sure you go over token validation in the [Backend authentication and authorization overview](back-end-authentication.md).

* From Fabric backend to workload backend

   An example of such communication is Create workload item. This communication is done with a SubjectAndApp token, which is a special token that includes an app token and a subject token combined (see the [Backend authentication and authorization overview](back-end-authentication.md) to learn more about this token).

   For this communication to work, the user using this communication must give consent to the Microsoft Entra application.

* From workload backend to Fabric backend

   This is done with a SubjectAndApp token for workload control APIs (for example, ResolveItemPermissions), or with a Subject token (for other Fabric APIs).

* From workload backend to external services

   An example of such communication is writing to a Lakehouse file. This is done with Subject token or an App token, depending on the API.

   If you plan on communicating with services using a Subject token, make sure you're familiar with [On behalf of flows](/entra/identity-platform/v2-oauth2-on-behalf-of-flow).

   Refer to [Authentication tutorial](./authentication-tutorial.md) to set up your environment to work with authentication.

## Authentication JavaScript API

Fabric front-end offers a JavaScript API for Fabric workloads to acquire a token for their application in Microsoft Entra ID. Before working with the authentication JavaScript API, make sure you go over the [authentication JavaScript API](./authentication-javascript-api.md) documentation.

### Consents  

To understand why consents are required, review [User and admin consent in Microsoft Entra ID](/entra/identity/enterprise-apps/user-admin-consent-overview).  

### How do consents work in Fabric workloads?

To grant a consent for a specific application, Fabric FE creates an [MSAL](https://www.npmjs.com/package/@azure/msal-browser) instance configured with the workload's application ID and asks for a token for the provided scope (additionalScopesToConsent - see [AcquireAccessTokenParams](./authentication-javascript-api.md#acquireaccesstokenparams)). 

When asking for a token with the workload application for a specific scope, Microsoft Entra ID displays a popup consent in case it's missing, and then redirect the popup window to the **redirect URI** configured in the application.

Typically the redirect URI is in the same domain as the page that requested the token so the page can access the popup and close it.

In our case, it's not in the same domain since Fabric is requesting the token and the redirect URI of the workload isn't in the Fabric domain, so when the consent dialog opens, it needs to be closed manually after redirect - we don't use the code returned in the redirectUri, and hence we just autoclose it (when Microsoft Entra ID redirects the popup to the redirect URI, it closes).  

You can see the code/configuration of the redirect Uri in the file *index.ts*. This file can be found in the [Microsoft-Fabric-workload-development-sample](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample), under the front-end folder.

Here's an example of a consent popup for our app "my workload app" and its dependencies (storage and Power BI) that we configured when going over [the authentication set up](./authentication-tutorial.md):  

:::image type="content" source="./media/authentication-concept/environment-setup-consent-popup.png" alt-text="Screenshot of the consent popup.":::


## Related content

* [Backend authentication and authorization overview](./back-end-authentication.md)
* [Authentication JavaScript API](./authentication-javascript-api.md)
* [Authentication setup](./authentication-tutorial.md)
* [Workload authentication guidelines & deep dive](./authentication-guidelines.md)
