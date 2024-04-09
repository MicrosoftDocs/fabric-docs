---
title: Overview of Fabric extensibility authentication
description: Learn how to authenticate for a customized Fabric workload.
author: paulinbar
ms.author: painbar
ms.reviewer: muliwienrib
ms.topic: how-to
ms.custom:
ms.date: 01/29/2024
---

# Authentication overview

Fabric workloads rely on integration with [Microsoft Entra ID](/entra/fundamentals/whatis) for authentication and authorization.

All interactions between workloads and other Fabric or Azure components must be accompanied by proper authentication support for requests received or sent. Tokens sent out must be generated properly, and tokens received must be validated properly as well.  

It is recommended that you become familiar with the [Microsoft identity platform](/entra/identity-platform/) before starting to work with Fabric workloads. It is also recommended to go over [Microsoft identity platform best practices and recommendations](/entra/identity-platform/identity-platform-integration-checklist)

## Flows

:::image type="content" source="./media/authentication-overview/authentication-diagram.png" alt-text="Screenshot showing the extensibility authentication flow.":::

### 1. From workload FE to workload BE

An example of such communication is any data plane API. This is be done with a Subject token (Delegated token).

To be able to acquire a token in the workload FE, please read [Authentication API](./authentication-javascript-api.md). In addition, make sure you go over token validation in the [Backend authentication and authorization overview](./backend-authentication.md).

### 2. From Fabric BE to workload BE

An example of such communication is Create workload item. This is done with a SubjectAndApp token, which is a special token that includes an app token and a subject token combined (see [Backend authentication and authorization overview](./backend-authentication.md) to learn more about this token).

For this communication to work, the user using this communication must give consent to the Entra application.

### 3. From workload BE to Fabric BE

This is done with a SubjectAndApp for workload control APIs (for example, ResolveItemPermissions), or with a Subject token (for other Fabric APIs).

### 4. From workload BE to external services

An example of such communication is writing to a lakehouse file. This is done with Subject token or an App token, depending on the API.

If you plan on communicating with services using a Subject token, make sure you are familiar with [On behalf of flows](/entra/identity-platform/v2-oauth2-on-behalf-of-flow).

Please refer to [Authentication setup](./authentication-setup.md) to setup your environment to work with authentication.