---
title: NotebookUtils credentials utilities for Fabric
description: Use NotebookUtils credentials utilities to get access tokens and manage secrets from Azure Key Vault in Fabric notebooks.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
---

# NotebookUtils credentials utilities for Fabric

You can use the credentials utilities to get access tokens and manage secrets in Azure Key Vault. The `notebookutils.credentials` module integrates with Microsoft Entra ID for token acquisition and Azure Key Vault for secret management, so you can connect to Azure resources securely without exposing credentials in code.

The credentials utilities are available in Python, PySpark, Scala, and R notebooks. The examples on this page use Python as the primary language, with Scala and R equivalents shown for each method.

> [!IMPORTANT]
> Never hardcode secrets or credentials directly in notebook code. Always use Azure Key Vault to store sensitive values and retrieve them at runtime with `notebookutils.credentials.getSecret`.

Run the following command to get an overview of the available methods:

### [Python](#tab/python)

```python
notebookutils.credentials.help()
```

### [Scala](#tab/scala)

```scala
notebookutils.credentials.help()
```

### [R](#tab/r)

```r
notebookutils.credentials.help()
```

---

The following table lists the available credentials methods:

| Method | Signature | Description |
|---|---|---|
| `getToken` | `getToken(audience: String): String` | Returns a Microsoft Entra token for the specified audience. |
| `getSecret` | `getSecret(akvName: String, secret: String): String` | Returns the value of a secret from the specified Azure Key Vault. |
| `putSecret` | `putSecret(akvName: String, secretName: String, secretValue: String): String` | Stores a secret in the specified Azure Key Vault. |
| `isValidToken` | `isValidToken(token: String): Boolean` | Checks whether the given token is valid and not expired. |

## Get token

`getToken` returns a Microsoft Entra token for a given audience. The following table shows the currently available audience keys:

| Audience key | Resource | Use case |
|---|---|---|
| `storage` | Azure Storage | Access ADLS Gen2 and Blob Storage |
| `pbi` | Power BI | Call Power BI and Fabric REST APIs |
| `keyvault` | Azure Key Vault | Retrieve Key Vault secrets |
| `kusto` | Synapse RTA KQL DB | Connect to Azure Data Explorer |

Run the following command to get the token:

### [Python](#tab/python)

```python
notebookutils.credentials.getToken('audience Key')
```

### [Scala](#tab/scala)

```scala
notebookutils.credentials.getToken("audience Key")
```

### [R](#tab/r)

```r
notebookutils.credentials.getToken("audience Key")
```

---

### Token usage examples

You can use the returned token to authenticate against various Azure services.

#### Azure Storage

```python
storage_token = notebookutils.credentials.getToken('storage')
```

#### Power BI and Fabric REST APIs

```python
import requests

pbi_token = notebookutils.credentials.getToken('pbi')

headers = {
    'Authorization': f'Bearer {pbi_token}',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.powerbi.com/v1.0/myorg/datasets',
    headers=headers
)

if response.status_code == 200:
    datasets = response.json()
    print(f"Found {len(datasets['value'])} datasets")
```

#### Azure Data Explorer (Kusto)

```python
kusto_token = notebookutils.credentials.getToken('kusto')
```

#### Azure Key Vault

```python
keyvault_token = notebookutils.credentials.getToken('keyvault')
```

### Use tokens with the Azure SDK

Fabric notebooks don't support `DefaultAzureCredential` directly. You can use a custom credential class as a workaround to pass NotebookUtils tokens to Azure SDK clients.

```python
from azure.core.credentials import AccessToken, TokenCredential
import jwt

class NotebookUtilsCredential(TokenCredential):
    """Custom credential that uses notebookutils tokens for Azure SDK."""

    def __init__(self, audience="storage"):
        self.audience = audience

    def get_token(self, *scopes, claims=None, tenant_id=None, **kwargs):
        token = notebookutils.credentials.getToken(self.audience)

        # Decode token to get expiration time
        token_json = jwt.decode(
            token, algorithms="RS256",
            options={"verify_signature": False}
        )

        return AccessToken(token, int(token_json.get("exp", 0)))

# Example: use with Azure Blob Storage
from azure.storage.blob import BlobServiceClient

account_url = "https://mystorageaccount.blob.core.windows.net"
credential = NotebookUtilsCredential(audience="storage")
blob_client = BlobServiceClient(account_url=account_url, credential=credential)

for container in blob_client.list_containers():
    print(f"Container: {container.name}")
```

> [!TIP]
> Tokens expire after a period of time. If your notebook runs long operations, implement refresh logic to request a new token before the current one expires.

### Considerations

- Token scopes with `pbi` as audience might change over time.

- When you call `notebookutils.credentials.getToken("pbi")`, the returned token has limited scope if the notebook runs under a service principal. The token doesn't have the full Fabric service scope. If the notebook runs under the user identity, the token still has the full Fabric service scope, but this might change with security improvements. To ensure that the token has the full Fabric service scope, use MSAL authentication instead of the `notebookutils.credentials.getToken` API. For more information, see [Authenticate with Microsoft Entra ID](/entra/msal/python/).

- The following scopes are available when you call `notebookutils.credentials.getToken` with the audience key `pbi` under the service principal identity:
  - Lakehouse.ReadWrite.All
  - MLExperiment.ReadWrite.All
  - MLModel.ReadWrite.All
  - Notebook.ReadWrite.All
  - SparkJobDefinition.ReadWrite.All
  - Workspace.ReadWrite.All
  - Dataset.ReadWrite.All

## Get secret

`getSecret` returns an Azure Key Vault secret for a given Azure Key Vault endpoint and secret name. The call uses your current user credentials to authenticate against Key Vault.

### [Python](#tab/python)

```python
notebookutils.credentials.getSecret('https://<name>.vault.azure.net/', 'secret name')
```

### [Scala](#tab/scala)

```scala
notebookutils.credentials.getSecret("https://<name>.vault.azure.net/", "secret name")
```

### [R](#tab/r)

```r
notebookutils.credentials.getSecret("https://<name>.vault.azure.net/", "secret name")
```

---

You can retrieve multiple secrets to build connection strings or configure services:

```python
vault_url = "https://myvault.vault.azure.net/"

db_host = notebookutils.credentials.getSecret(vault_url, "db-host")
db_user = notebookutils.credentials.getSecret(vault_url, "db-user")
db_password = notebookutils.credentials.getSecret(vault_url, "db-password")

connection_string = f"Server={db_host};User={db_user};Password={db_password}"
```

> [!NOTE]
> Notebook outputs automatically redact secret values for security. If you print or display a retrieved secret, the output shows a redacted placeholder instead of the actual value.

Use the fully qualified Key Vault URL in the format `https://<vault-name>.vault.azure.net/`. You must have appropriate permissions to access the Key Vault and the individual secrets.

## Security best practices

Follow these recommendations when you work with credentials in Fabric notebooks:

- **Store all sensitive values in Azure Key Vault.** Never embed credentials, connection strings, or API keys directly in notebook code.
- **Don't log secret values.** Rely on the automatic secret redaction in notebook outputs. Avoid writing secrets to files or passing them as notebook parameters.
- **Use the correct audience key.** Match the audience key to the target Azure resource so the token has only the permissions it needs.
- **Understand the identity context.** Know whether your notebook runs under user identity or a service principal, because the available token scopes can differ. Test authentication in both interactive and pipeline contexts.
- **Handle token expiration.** Tokens expire. For long-running operations, implement refresh logic to request a new token before the current one expires.
- **Limit Key Vault access.** Grant only the minimum required permissions to your Key Vault. Audit secret access through Azure Key Vault diagnostic logs.
- **Use managed identities when possible.** Managed identities reduce the need to manage credentials manually and provide a more secure authentication flow.

## Put secret

`putSecret` stores a secret in the specified Azure Key Vault. If the secret already exists, the value is updated.

### [Python](#tab/python)

```python
notebookutils.credentials.putSecret('https://<name>.vault.azure.net/', 'secret name', 'secret value')
```

### [Scala](#tab/scala)

```scala
notebookutils.credentials.putSecret("https://<name>.vault.azure.net/", "secret name", "secret value")
```

### [R](#tab/r)

```r
notebookutils.credentials.putSecret("https://<name>.vault.azure.net/", "secret name", "secret value")
```

---

You must have appropriate permissions (Set permission) on the Azure Key Vault to write secrets.

```python
vault_url = "https://myvault.vault.azure.net/"

notebookutils.credentials.putSecret(vault_url, "api-key", "my-secret-api-key-value")
```

## Validate token

`isValidToken` checks whether a token is valid and hasn't expired. Use this method to verify a token before making API calls with it.

### [Python](#tab/python)

```python
token = notebookutils.credentials.getToken('storage')
is_valid = notebookutils.credentials.isValidToken(token)

if is_valid:
    print("Token is valid")
else:
    print("Token is expired or invalid, requesting a new one")
    token = notebookutils.credentials.getToken('storage')
```

### [Scala](#tab/scala)

```scala
val token = notebookutils.credentials.getToken("storage")
val isValid = notebookutils.credentials.isValidToken(token)

if (isValid) println("Token is valid")
else println("Token is expired or invalid")
```

### [R](#tab/r)

```r
token <- notebookutils.credentials.getToken("storage")
is_valid <- notebookutils.credentials.isValidToken(token)

if (is_valid) print("Token is valid") else print("Token is expired or invalid")
```

---

## Related content

- [NotebookUtils (former MSSparkUtils) for Fabric](../notebook-utilities.md)
