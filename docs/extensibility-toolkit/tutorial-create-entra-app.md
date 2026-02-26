---
title: Tutorial - Create Microsoft Entra App for Fabric Workload
description: Learn how to create and configure a Microsoft Entra application for your Fabric workload, both using automated scripts and manual steps
ms.reviewer: gesaur
ms.topic: tutorial
ms.date: 12/15/2025
---

# Tutorial: Create Microsoft Entra app for Fabric workload

This tutorial shows you how to create and configure a Microsoft Entra application for your Fabric workload. You can use either the automated script approach (recommended) or follow the manual steps for full control over the configuration.

## Overview

A Microsoft Entra application is required for your Fabric workload to:

* **Authenticate users**: Enable single sign-on (SSO) for your workload users
* **Access Fabric APIs**: Call Microsoft Fabric APIs on behalf of the user
* **Define permissions**: Specify what resources your workload can access
* **Enable secure communication**: Establish trust between your workload and Fabric platform

## Prerequisites

Before you begin, ensure you have:

* **Azure CLI installed**: Download from [Azure CLI documentation](/cli/azure/install-azure-cli)
* **PowerShell 7.x or later**: Required for running the setup script
* **Tenant administrator access**: Or an account with permission to register applications
* **Workload name defined**: Following the pattern `Org.[YourWorkloadName]`

## Approach 1: Automated Script (Recommended)

The extensibility toolkit provides an automated script that creates and configures your Microsoft Entra app with all required settings.

### Running the Script

1. **Navigate to the script directory**:
   ```powershell
   cd scripts/Setup
   ```

2. **Run the CreateDevAADApp script**:
   ```powershell
   .\CreateDevAADApp.ps1
   ```

   Or with parameters to avoid prompts:
   ```powershell
   .\CreateDevAADApp.ps1 -ApplicationName "My Workload App" -WorkloadName "Org.MyWorkload" -TenantId "your-tenant-id"
   ```

3. **Provide required information** when prompted:
   * **Application Name**: Display name for your Microsoft Entra app (e.g., "My Analytics Workload")
   * **Workload Name**: Must follow pattern `Org.[YourWorkloadName]` (e.g., "Org.MyWorkload")
   * **Tenant ID**: Your Microsoft Entra ID tenant ID where the workload will be developed

### Script Output

The script will provide you with essential information:

```
ApplicationIdUri / Audience : api://localdevinstance/[tenant-id]/Org.MyWorkload/[random]
RedirectURI                : http://localhost:60006/close
Application Id             : [your-app-id]
secret                     : [your-app-secret]
```

### What the Script Configures

The automated script sets up:

#### **Authentication Configuration**
* **Redirect URIs**: Local development and Fabric platform URLs
* **Audience URI**: Unique identifier following the pattern `api://localdevinstance/[tenant-id]/[workload-name]/[random]`
* **Sign-in audience**: Multitenant support (`AzureADMultipleOrgs`)

#### **API Permissions**
* **Microsoft Fabric**: `Fabric.Extend`, workspace and item permissions
* **Azure Storage**: `user_impersonation` for OneLake access
* **Microsoft Graph**: `User.Read` for basic user information
* **Azure Data Explorer**: `user_impersonation` for KQL databases

#### **OAuth Scopes** (for Remote hosting)
* `FabricWorkloadControl`: Core workload functionality
* `Item1.Read.All` / `Item1.ReadWrite.All`: Custom item permissions
* `FabricLakehouse.Read.All` / `FabricLakehouse.ReadWrite.All`: Lakehouse access
* `KQLDatabase.ReadWrite.All`: KQL database permissions
* `FabricEventhouse.Read.All`: Eventhouse access

#### **Pre-authorized Applications**
* Microsoft Fabric platform applications
* Power BI service applications

## Approach 2: Manual Configuration

If you need full control or prefer manual setup, follow these detailed steps.

### Step 1: Create the Application

1. **Sign in to Microsoft Azure portal**:
   Navigate to [Microsoft Azure portal](https://portal.azure.com) and sign in with your administrator account.

2. **Access App Registrations**:
   * Go to **Azure Active Directory** > **App registrations**
   * Select **New registration**

3. **Configure Basic Settings**:
   * **Name**: Enter your application name (e.g., "My Analytics Workload")
   * **Supported account types**: Select "Accounts in any organizational directory (Any Microsoft Entra ID directory - Multitenant)"
   * **Redirect URI**: Leave empty for now (we'll add this later)
   * Select **Register**

### Step 2: Configure Authentication

1. **Add Redirect URIs**:
   * Go to **Authentication** in your app's menu
   * Under **Platform configurations**, select **Add a platform**
   * Choose **Single-page application (SPA)**
   * Add these redirect URIs:
     ```
     http://localhost:60006/close
     https://app.powerbi.com/workloadSignIn/[YOUR-TENANT-ID]/[YOUR-WORKLOAD-NAME]
     https://app.fabric.microsoft.com/workloadSignIn/[YOUR-TENANT-ID]/[YOUR-WORKLOAD-NAME]
     https://msit.powerbi.com/workloadSignIn/[YOUR-TENANT-ID]/[YOUR-WORKLOAD-NAME]
     https://msit.fabric.microsoft.com/workloadSignIn/[YOUR-TENANT-ID]/[YOUR-WORKLOAD-NAME]
     ```

2. **Configure Token Settings**:
   * Under **Implicit grant and hybrid flows**, ensure nothing is selected (SPA uses PKCE)
   * Under **Advanced settings**, enable **Allow public client flows**: No

### Step 3: Set Application ID URI

1. **Navigate to Expose an API**:
   * In your app's menu, select **Expose an API**
   * Select **Add** next to "Application ID URI"

2. **Create Unique URI**:
   ```
   api://localdevinstance/[YOUR-TENANT-ID]/[YOUR-WORKLOAD-NAME]/[RANDOM-STRING]
   ```
   
   Example: `api://localdevinstance/12345678-1234-1234-1234-123456789012/Org.MyWorkload/AbCdE`

### Step 4: Configure API Permissions

1. **Add Required Permissions**:
   * Go to **API permissions**
   * Select **Add a permission**

2. **Add Microsoft Fabric Permissions**:
   * Select **APIs my organization uses**
   * Search for "Power BI Service" (App ID: `00000009-0000-0000-c000-000000000000`)
   * Select **Delegated permissions** and add:
     * `Fabric.Extend`
     * `Workspace.Read.All`
     * `Item.Execute.All`
     * `Item.Read.All`
     * `Item.ReadWrite.All`
     * `Item.Reshare.All`
     * `Lakehouse.Read.All`
     * `Eventhouse.Read.All`
     * `KQLDatabase.ReadWrite.All`

3. **Add Azure Storage Permissions**:
   * Add permission for "Azure Storage" (App ID: `e406a681-f3d4-42a8-90b6-c2b029497af1`)
   * Select `user_impersonation`

4. **Add Microsoft Graph Permissions**:
   * Add permission for "Microsoft Graph"
   * Select `User.Read`

5. **Add Azure Data Explorer Permissions**:
   * Add permission for "Azure Data Explorer" (App ID: `2746ea77-4702-4b45-80ca-3c97e680e8b7`)
   * Select `user_impersonation`

### Step 5: Create OAuth Scopes (for Remote Hosting)

If your workload uses remote hosting, add custom scopes:

1. **Navigate to Expose an API**
2. **Add Scopes**:
   * Select **Add a scope**
   * For each scope, provide:
     * **Scope name**: E.g., `FabricWorkloadControl`
     * **Admin consent display name**: Descriptive name
     * **Admin consent description**: What the scope allows
     * **State**: Enabled

3. **Required Scopes**:
   * `FabricWorkloadControl`
   * `Item1.Read.All`
   * `Item1.ReadWrite.All`
   * `FabricLakehouse.Read.All`
   * `FabricLakehouse.ReadWrite.All`
   * `KQLDatabase.ReadWrite.All`
   * `FabricEventhouse.Read.All`

### Step 6: Configure Pre-authorized Applications

1. **Add Authorized Client Applications**:
   * In **Expose an API**, select **Add a client application**
   * Add these application IDs with appropriate scopes:

2. **Microsoft Fabric Applications**:
   ```
   871c010f-5e61-4fb1-83ac-98610a7e9110 (Fabric client app)
   00000009-0000-0000-c000-000000000000 (Power BI Service)
   d2450708-699c-41e3-8077-b0c8341509aa (Additional Fabric app)
   ```

### Step 7: Create Client Secret

1. **Generate Secret**:
   * Go to **Certificates & secrets**
   * Select **New client secret**
   * Provide a description and set expiration (180 days recommended for development)
   * Copy the secret value immediately (it won't be shown again)

### Step 8: Grant Admin Consent

1. **Consent to Permissions**:
   * In **API permissions**, select **Grant admin consent for [Your Organization]**
   * Confirm the consent

2. **Alternative Consent URL**:
   You can also use this direct URL (wait a minute after app creation):
   ```
   https://login.microsoftonline.com/[YOUR-TENANT-ID]/adminconsent?client_id=[YOUR-APP-ID]
   ```

## Next Steps

After creating your Microsoft Entra app:

1. **Update Environment Configuration**:
   * Copy the Application ID, secret, and other values
   * Update your `.env` file with these values
   * See [Setup Guide](./setup-guide.md) for environment configuration

2. **Test Authentication**:
   * Run your workload locally
   * Verify that authentication works correctly
   * Check that API calls succeed

3. **Configure Additional Settings**:
   * Review and adjust token lifetimes if needed
   * Add additional redirect URIs for different environments
   * Configure optional claims if required

## Troubleshooting

### Common Issues

**"Invalid Redirect URI"**
* Ensure redirect URIs exactly match the configured values
* Check for trailing slashes or typos
* Verify protocol (http vs https)

**"Insufficient Privileges"**
* Ensure you have Application Administrator or Global Administrator rights
* Some permissions require admin consent

**"Invalid Audience"**
* Verify the Application ID URI follows the correct pattern
* Check that tenant ID and workload name are correct

**"Permission Denied"**
* Ensure admin consent has been granted
* Check that required permissions are added
* Verify the user has access to the workspace

### Getting Help

If you encounter issues:

1. **Check Application Overview**: Review all configured settings
2. **Validate Permissions**: Ensure all required permissions are present and consented
3. **Review Logs**: Check Microsoft Entra ID sign-in logs for detailed error information
4. **Test with Graph Explorer**: Verify permissions using [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer)

## Security Best Practices

* **Rotate Secrets Regularly**: Set up a process to rotate client secrets before expiration
* **Use Shortest Necessary Permissions**: Only grant permissions your workload actually needs
* **Monitor Usage**: Regularly review sign-in logs and API usage
* **Secure Secret Storage**: Never commit secrets to source code; use secure configuration management

## Related Resources

* [Setup Guide](./setup-guide.md) - Complete environment setup
* [Authentication Overview](./authentication-overview.md) - Understanding Fabric authentication
* [Authentication Guidelines](./authentication-guidelines.md) - Best practices for implementation
* [Microsoft Entra Documentation](/azure/active-directory/develop/) - Official Microsoft Entra development docs
