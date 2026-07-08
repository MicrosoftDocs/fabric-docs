---
title: "Troubleshoot Databricks gateway TLS mismatch"
description: "Learn how to troubleshoot a Databricks gateway TLS mismatch in Microsoft Fabric."
ms.service: fabric
ms.topic: troubleshooting-problem-resolution
ms.date: 06/26/2026

#customer intent: As a Fabric data integration user, I want to resolve a Databricks gateway TLS mismatch so that I can continue using Microsoft Fabric.

---

# Troubleshoot Databricks gateway TLS mismatch

When you use an on-premises data gateway with Databricks, connection validation, refresh, or result download failures can occur if the gateway host's TLS or certificate configuration doesn't align with Databricks requirements. This issue can affect Dataflow Gen2 and other supported Databricks or Azure Databricks connection scenarios.

This problem typically occurs if you recently enabled enhanced security or TLS-related settings on the gateway host, use an older gateway build, or route gateway traffic through a proxy or firewall that inspects HTTPS traffic. In these cases, the error might appear as a generic driver or gateway failure rather than clearly indicating a TLS 1.2 or certificate trust issue.

## Prerequisites

- Access to the gateway host and its network or security configuration.
- Permission to review and update Windows TLS settings under `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols`.
- Permission to review the contents of the machine certificate store and the gateway Windows service account's access to installed certificates.
- Ability to verify whether the Databricks ODBC driver is installed on the gateway host.

## Symptoms

- Creating or validating a Databricks connection through the on-premises gateway times out.
- Refresh through the gateway fails even though direct connectivity from the same machine succeeds.
- The gateway connection status intermittently appears as Offline or `configured but unreachable`.
- You see `DM_GWPipeline_Gateway_MashupDataAccessError`.
- You see ODBC certificate verification failures, including `certificate verify failed`.
- Driver errors indicate a TLS or security negotiation failure because the Databricks server isn't configured with the specified protocol or security setting enabled.
- The driver suggests verifying that the server protocol version isn't lower than the required minimum of TLS 1.2.
- Result file download retries continue and can exceed retry limits during refresh or validation.

## Cause

This issue occurs because of a mismatch between the Databricks connector's TLS requirements and the effective TLS or certificate configuration on the gateway path.

Common causes include:

- The gateway host is configured with TLS settings that don't support TLS 1.2 or higher.
- A corporate proxy or HTTPS inspection device intercepts Databricks traffic and substitutes certificates that the gateway pipeline doesn't trust.
- Required root or intermediate CA certificates are missing from the machine certificate store.
- Firewall or proxy rules block access to CRL or OCSP endpoints.
- The gateway is running an older build, or the Databricks ODBC driver isn't installed.
- Validation timeouts are a secondary effect of an underlying TLS or certificate problem rather than a separate issue.

## Solution

### Solution 1: Align the gateway host with Databricks TLS requirements

1. Review the gateway host TLS settings under `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols`.
1. Configure the host to support TLS 1.2 or higher.
1. If you're using an older gateway build, upgrade the gateway to a supported version.
1. Verify that the Databricks ODBC driver is installed on the gateway host.
1. Retry Databricks connection validation or refresh through the gateway.

### Solution 2: Fix certificate trust and network access for gateway traffic

1. Verify that the gateway host has the required root and intermediate CA certificates in the machine certificate store.
1. Confirm that the gateway Windows service account has appropriate access to the installed certificates.
1. Update firewall or proxy rules so the gateway host can reach the required CA certificate and CRL or OCSP endpoints.
1. If your network uses HTTPS inspection, allowlist Azure Databricks traffic and related certificate or revocation endpoints. Either prevent certificate substitution for gateway traffic, or make sure the substituted certificate chain is trusted by the gateway path.
1. Retry connection creation, validation, or refresh.

### Solution 3: Use a supported gateway type for private endpoint scenarios

1. If your Azure Databricks workspace is behind a private endpoint, stop using an on-premises data gateway for that connection.
1. Create the connection by using a virtual network data gateway through the Manage connections experience.

### Solution 4: Address validation timeouts

1. If validation still times out after you fix TLS and certificate issues, review the gateway timeout settings.
1. Consider increasing the gateway timeout limits.
1. If needed, use an alternative gateway or cloud gateway configuration that's compatible with your network and security requirements.

## Related content

- [On-premises data gateway in-depth](/power-bi/connect-data/service-gateway-onprem-indepth)
- [Databricks connector overview](connector-databricks-overview.md)
- [Set up your Databricks connection](connector-databricks.md)
- [Azure Databricks connector overview](connector-azure-databricks-overview.md)
- [Set up your Azure Databricks connection](connector-azure-databricks.md)
- [Connect to Azure Databricks workspaces behind a private endpoint](/fabric/mirroring/azure-databricks-private-endpoint)
