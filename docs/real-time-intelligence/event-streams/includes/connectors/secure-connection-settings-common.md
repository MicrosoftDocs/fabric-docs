---
title: TLS mTLS settings common
description: This include file provides common TLS and mTLS settings guidance for source connectors.
ms.topic: include
ms.date: 04/29/2026
---

- **Trust CA certificate**: Enable this option to configure the server CA certificate. Select your subscription, resource group, and key vault, and then provide the certificate name.
- **Client certificate and key**: Enable this option to configure the client certificate and key.
    - **Use the same CA certificate key vault**: Select this checkbox when both certificates are stored in the same key vault. Then provide the certificate name.
    - If you don't select this checkbox, select the subscription, resource group, and key vault, and then provide the certificate name.

> [!NOTE]
> TLS/mTLS settings in this section are currently in preview.
>
> For sources in a private network, ensure that the Azure Key Vault containing your certificates is connected to the Azure virtual network used by the streaming virtual network data gateway for Eventstream connector virtual network injection (for example, via a private endpoint).
