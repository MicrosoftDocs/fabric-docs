---
title: TLS mTLS certificate requirements
description: This include file documents TLS and mTLS certificate requirements for source connectors.
ms.topic: include
ms.date: 04/29/2026
author: xujiang1
ms.author: xujiang1
ms.service: fabric
---

### TLS/mTLS certificate requirements

If you configured **TLS/mTLS settings**, refer to this section for certificate format specifications and common configuration mistakes when uploading to Azure Key Vault.

#### Certificate chain

| Certificate | Key size | Signed by | Purpose |
|-------------|----------|-----------|---------|
| CA certificate | 4096-bit RSA | Self-signed | Trust anchor - the broker verifies client certificates against this CA. |
| Server certificate | 2048-bit RSA | CA | Broker identity - the client verifies the broker is who it claims to be. |
| Client certificate | 2048-bit RSA | CA | Client identity - the broker verifies that the connector is authorized. |

#### Server certificate SAN requirements

The server certificate **must** include the broker's IP address and DNS name in the Subject Alternative Name (SAN) to pass hostname verification (`ssl.endpoint.identification.algorithm=https`):

```
subjectAltName:
  DNS.1 = {broker FQDN}
  DNS.2 = localhost
  IP.1  = {broker public IP}
  IP.2  = 127.0.0.1
```

#### Upload certificates to Azure Key Vault

Certificates are uploaded as **Azure Key Vault certificate objects** in **PEM format**. The **PEM bundle file** is certificate + private key concatenated in one file:

```
-----BEGIN CERTIFICATE-----
MIIExjCCA...
-----END CERTIFICATE-----
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIB...
-----END RSA PRIVATE KEY-----
```

Use an **import policy** that matches the key properties:

```json
{
  "secretProperties": {
    "contentType": "application/x-pem-file"
  },
  "keyProperties": {
    "exportable": true,
    "keyType": "RSA",
    "keySize": 4096,
    "reuseKey": false
  },
  "issuerParameters": {
    "name": "Unknown"
  }
}
```

To import the certificate, run the following command:

```azurecli
az keyvault certificate import \
  --vault-name {kvName} \
  --name {certName} \
  --file {pemBundleFile} \
  --policy @{policyFile}
```

#### Common mistakes

| Avoid | Do this instead |
|-------|-----------------|
| Upload as PKCS#12/PFX | Use PEM format with `contentType: application/x-pem-file`. |
| Upload certificate without private key | The PEM bundle must contain both the certificate and the key. |
| Set `keySize: 2048` for a 4096-bit key | The `keySize` value must match the actual key size. |
| Set `issuerParameters.name: "Self"` | Use `"Unknown"` for externally signed certificates. |
| Use Windows line endings (CRLF) | The PEM file must use Unix line endings (LF only). |
