---
title: Amazon Managed streaming for Kafka connector for Fabric event streams
description: This file has the common content for configuring Amazon Managed streaming for Kafka connector for Fabric event streams and Real-Time hub. 
ms.reviewer: xujiang1
ms.topic: include
ms.date: 03/31/2026
---

1. On the **Connect** page, select **New connection**.

    :::image type="content" source="./media/amazon-msk-kafka-source-connector/new-connection.png" alt-text="Screenshot that shows the selection of the New connection link on the Connect page of the Get events wizard.":::    
1. In the **Connection settings** section, for **Bootstrap Server**, enter one or more public Kafka bootstrap server endpoints. Use commas (,) to separate multiple servers.
    :::image type="content" source="./media/amazon-msk-kafka-source-connector/bootstrap-server.png" alt-text="Screenshot that shows the selection of the Bootstrap server field on the Connect page of the Get events wizard.":::   

    To get the public endpoint:

    :::image type="content" source="./media/amazon-msk-kafka-source-connector/public-endpoint.png" alt-text="Screenshot that shows the public endpoint of Amazon Managed Streaming for Apache Kafka (MSK) cluster.":::   
1. In the **Connection credentials** section, If you have an existing connection to the Amazon MSK Kafka cluster, select it from the dropdown list for **Connection**. Otherwise, follow these steps: 
    1. For **Connection name**, enter a name for the connection. 
    1. For **Authentication kind**, confirm that **API Key** is selected. 
    1. For **Key** and **Secret**, enter API key and key Secret for Amazon MSK Kafka cluster.     
        > [!NOTE]
        > If you only use mTLS to do the authentication, you can add any string in the Key section during connection creation. 
1. Select **Connect**.  
1. Now, on the Connect page, follow these steps.  
    1. For **Topic**, enter the Kafka topic. 
    1. For **Consumer group**, enter the consumer group of your Kafka cluster. This field provides you with a dedicated consumer group for getting events.  
    1. Select **Reset auto offset** to specify where to start reading offsets if there's no commit. 
    1. For **Security protocol**, select one of the following options:
        - **SASL_SSL**: Use this option when your Kafka cluster uses SASL-based authentication. By default, the Kafka broker’s server certificate must be signed by a Certificate Authority (CA) included in the [trusted CA list](https://github.com/microsoft/fabric-event-streams/blob/main/References/certificate-authority-list/trusted-ca-list.txt). If your Kafka cluster uses a custom CA, you can configure it by using **TLS/mTLS settings**.
        - **SSL (mTLS)**: Use this option when your Kafka cluster requires mTLS authentication, and you must configure both a custom server CA certificate and a client certificate in **TLS/mTLS settings**.
    1. The default **SASL mechanism** is **SCRAM-SHA-512** and can't be changed.
    1. If your Kafka cluster uses a custom CA or requires mTLS, expand **TLS/mTLS settings** and configure the following options as needed:

        - **Trust CA Certificate**: Enable Trust CA Certificate configuration. Select your subscription, resource group, and key vault, and then provide the server ca name. 
        - **Client certificate and key**: Enable Client certificate and key configuration. Select your subscription, resource group, and key vault, and then provide the client certificate name. 
        
            If you don’t use mTLS but still use **SASL_SSL** with your custom CA cert, then you can skip this client certificate configuration.  

        > [!NOTE]
        > The TLS/mTLS settings in this section are currently in preview.
        >
        > For sources in a private network, ensure that the Azure Key Vault containing your certificates is connected to the Azure virtual network used by the streaming virtual network data gateway for Eventstream connector virtual network injection (for example, via a private endpoint).

    :::image type="content" source="./media/amazon-msk-kafka-source-connector/configure-settings.png" alt-text="Screenshot that shows the first page of the Amazon MSK Kafka connection settings." lightbox="./media/amazon-msk-kafka-source-connector/configure-settings.png":::    

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

