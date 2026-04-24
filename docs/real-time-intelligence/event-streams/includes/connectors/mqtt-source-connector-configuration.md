---
title: MQTT connector for Fabric event streams
description: The include files has the common content for configuring an Message Queuing Telemetry Transport (MQTT) connector for Fabric event streams and Real-Time hub. 
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 04/23/2026
---


1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/mqtt-source-connector/new-connection-button.png" alt-text="Screenshot that shows the Connect page the New connection link highlighted." lightbox="./media/mqtt-source-connector/new-connection-button.png":::

    If there's an existing connection to your MQTT source, select that existing connection.
1. To create a new cloud connection, enter the following information:

    :::image type="content" source="./media/mqtt-source-connector/connection-settings.png" alt-text="Screenshot that shows the Connection settings section.":::  

    1. **MQTT Broker URL**: enter the URL of your MQTT broker. The supported protocols are `ssl://`, `wss://`, and `tcp://`.

        > [!NOTE]
        > The MQTT source supports Transport Layer Security (TLS) or Secure Sockets Layer (SSL) secured MQTT connections between your MQTT broker and Eventstream.
        > TLS or SSL connections are only supported if the server certificate is signed by a Certificate Authority (CA) included in the [trusted CA list](https://github.com/microsoft/fabric-event-streams/blob/main/References/certificate-authority-list/trusted-ca-list.txt).

    1. **Connection name**: enter a name for the connection to the MQTT.
    1. Enter the **Username** and **Password** of your MQTT broker.
    1. Select **Connect**.

1. For **Topic name**, enter the MQTT topic to subscribe to. The connector supports only a single topic.
1. For **Version**, select either **V5** or **V3** based on your MQTT broker's protocol version.
1. If your MQTT broker requires mTLS, expand **TLS/mTLS settings** and configure the following options as needed.

    When both **Trust CA certificate** and **Client certificate and key** are enabled and configured, the connector uses **mTLS** to establish the connection.

    - **Trust CA certificate**: Enable this option to configure the server CA certificate. Select your subscription, resource group, and key vault, and then provide the certificate name.
    - **Client certificate and key**: Enable this option to configure the client certificate and key.
        - **Use the same CA certificate key vault**: Select this checkbox when both certificates are stored in the same key vault. And then provide the certificate name.
        - If you don't select this checkbox, select the subscription, resource group, and key vault, and then provide the certificate name.

    > [!NOTE]
    > TLS/mTLS settings in this section are currently in preview.
    >
    > For sources in a private network, ensure that the Azure Key Vault containing your certificates is connected to the Azure virtual network used by the streaming virtual network data gateway for Eventstream connector virtual network injection (for example, via a private endpoint).

    :::image type="content" source="./media/mqtt-source-connector/next.png" alt-text="Screenshot that shows the Configure connection settings page." lightbox="./media/mqtt-source-connector/next.png"::: 
       
### mTLS certificate requirements

If you configured **TLS/mTLS settings**, refer to this section for certificate format specifications and common configuration mistakes when uploading to Azure Key Vault.

#### Certificate chain

| Certificate | Key size | Signed by | Purpose |
|-------------|----------|-----------|---------|
| CA certificate | 4096-bit RSA | Self-signed | Trust anchor — the broker verifies client certificates against this CA. |
| Server certificate | 2048-bit RSA | CA | Broker identity — the client verifies the broker is who it claims to be. |
| Client certificate | 2048-bit RSA | CA | Client identity — the broker verifies that the connector is authorized. |

#### Server certificate SAN requirements

The server certificate **must** include the broker's IP address and DNS name in the Subject Alternative Name (SAN) to pass hostname verification( `ssl.endpoint.identification.algorithm=https`):

```
subjectAltName:
  DNS.1 = {broker FQDN}
  DNS.2 = localhost
  IP.1  = {broker public IP}
  IP.2  = 127.0.0.1
```

#### Upload certificates to Azure Key Vault

Certificates are uploaded as **Azure Key Vault certificate objects** in **PEM format**. The **PEM bundle file** — certificate + private key concatenated in one file:

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

### Stream or source details

[!INCLUDE [stream-source-details](./stream-source-details.md)]

### Review and connect

On the **Review + connect** screen, review the summary, and select **Add** (Eventstream) or **Connect** (Real-Time hub).

