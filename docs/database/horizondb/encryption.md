---
title: "Encryption in Microsoft Fabric HorizonDB"
description: Learn how service-managed encryption and TLS protect Fabric HorizonDB data during public preview.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: concept-article
ms.search.form: Fabric HorizonDB encryption, PostgreSQL TLS
ai-usage: ai-assisted
---
# Encryption in Microsoft Fabric HorizonDB

Fabric HorizonDB uses service-managed encryption for applicable persisted database state. PostgreSQL clients use TLS according to the settings published in the Fabric HorizonDB connection experience.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Confirm the encryption and key-management options available for your preview before using sensitive data. Don't apply procedures from another database service. Use a dedicated test workspace and synthetic, nonsensitive data for the exercises. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Encryption at rest

Storage is service-managed. Confirm the applicable encryption coverage and key-management policy for your preview with your administrator or preview contact. Don't infer guarantees for temporary data, lifecycle copies, or backups from another service's architecture.

## Encryption in transit

Applications connect to the PostgreSQL endpoint over TLS. Copy these values from the released Fabric HorizonDB connection experience:

- Host and port.
- Required `sslmode`.
- Certificate trust and validation requirements.
- User format and Microsoft Entra token guidance.

Don't weaken TLS validation to work around a host, DNS, certificate, or clock error. A connection that works with an unapproved TLS mode isn't evidence that the configuration is supported.

Use the PostgreSQL endpoint for operational connections. The SQL analytics endpoint is a separate analytical surface with its own connection and authorization contract.

## Credential protection

An access token is a short-lived secret:

- Acquire it through a supported Microsoft Entra library or client flow.
- Keep it out of source code, notebooks, screenshots, logs, URLs, and shell history.
- Don't print complete connection strings or environment dumps.
- Acquire a fresh token for each new physical connection or pool refresh.
- Use an approved secret store for application configuration that is sensitive.
- Redact tokens and user data from support evidence.

Service-managed encryption doesn't protect a token exposed by an application or a customer-managed export stored insecurely.

## Customer exports and downstream data

When you export or copy data, the destination's security boundary applies:

- Encrypt customer-controlled export files.
- Limit destination access.
- Rotate or remove temporary credentials.
- Review notebook and query outputs before sharing.
- Apply the destination Fabric item's permissions.
- Delete staging data according to your policy.

Fabric HorizonDB service-managed encryption doesn't automatically govern a customer-owned file after it leaves the managed database boundary.

## Customer-managed keys

The preview onboarding procedure doesn't describe customer-managed key configuration. Don't assume it's available or use another product's key-status query or rotation procedure. Confirm the supported options before evaluating a workload that requires customer-managed keys.

Encryption isn't a recovery mechanism. Review backup, restore, deletion, and recovery limitations separately before use.

## Troubleshoot encrypted connections

| Symptom | Resolution |
|---|---|
| Certificate validation fails | Verify the exact endpoint, DNS result, system clock, trust store, and released TLS mode. |
| Client connects only after TLS is weakened | Stop and correct the configuration; don't publish or deploy the weakened setting. |
| Token appears in an error or notebook output | Revoke or expire the credential where possible, clear the output, and fix logging. |
| An export is readable by unintended users | Remove access, rotate exposed credentials, and review destination permissions. |
| A procedure asks for a customer-managed key | Confirm whether it explicitly applies to your HorizonDB preview; don't reuse another service's procedure. |

## Related content

- [Security overview](security-overview.md).
- [Authentication](authentication.md).
- [Connect to Fabric HorizonDB](connect.md).
- [Fabric HorizonDB limitations](limitations.md).
