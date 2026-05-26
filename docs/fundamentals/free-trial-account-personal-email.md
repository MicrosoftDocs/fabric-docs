---
title: Start a Microsoft Fabric free trial with a personal email
description: Learn how to create an account and start a Microsoft Fabric free trial by using a personal email address.
author: SnehaGunda
ms.author: sngun
ms.reviewer: sngun
ms.topic: how-to
ms.date: 02/27/2026
ai-usage: ai-assisted
#customer intent: As a new user, I want to start a Microsoft Fabric free trial with a personal email so that I can explore Fabric capabilities for learning and evaluation.
---

# Start a Microsoft Fabric free trial with your personal email

If you don't have access to a work account, you can still start a Microsoft Fabric free trial by using a personal email address.

This article walks you through creating or using an Azure account with your personal email, setting up a user in Microsoft Entra ID, signing in to Fabric, and activating the free trial.

> [!NOTE]
> **Share your feedback as a new Fabric user**
>
> Your honest take on what works and what doesn't will directly shape product improvements. [Sign up to participate](https://microsoft.qualtrics.com/jfe/form/SV_1MTHk3TXzSUfEXA) and help drive Fabric's future.

## Prerequisites

Before you begin, make sure you have the required information and tools ready.

- A personal email address (for example, Outlook, Gmail, or Yahoo).
- A phone number and payment method for Azure account verification, if prompted.
- The Microsoft Authenticator app for two-factor authentication. This is optional but recommended.

## Create an Azure trial account

An Azure account is required to access Microsoft Fabric. Create or sign in to an Azure account so you can access the services required to start a Fabric trial.

1. Go to the [Azure free account page](https://azure.microsoft.com/pricing/purchase-options/azure-account?icid=azurefreeaccount).
1. Select **Try Azure for free**.
1. If you have an existing Azure account, sign in with it. Otherwise, select **Sign up** and use your personal email address to register.
1. Follow the prompts to complete the setup. You may be asked to verify your identity with a phone number and provide a payment method. Microsoft uses this information for verification purposes, and you won't be charged unless you explicitly upgrade to a paid subscription.
1. After completing the registration, you should have access to the Azure portal.

## Create a user in Microsoft Entra ID

Create a user identity that you'll use to sign in to Microsoft Fabric and start the trial.

1. In the Azure portal, search for and open **Microsoft Entra ID**.
1. From the left menu, expand **Manage** and select **Users**.
1. Select **New user** and then **Create new user**. Use the steps in [Create a user in Microsoft Entra ID](/entra/fundamentals/how-to-create-delete-users#create-a-new-user) article to create a user with your personal email address. Set a password and complete the user creation process. You don't have to set role assignments or other properties.
1. After the user is created, open the **Users** pane and copy the user principal name (UPN).

## Sign in to Microsoft Fabric

After you create the user account, sign in to Fabric by using that account's credentials.

1. Go to the [Fabric portal](https://app.fabric.microsoft.com).
1. Sign in by using the UPN and password for the user you created.
1. For security purposes, enable two-factor authentication using the Microsoft Authenticator app when prompted.
1. Complete any required authentication prompts.

## Activate the Fabric free trial

Once you're signed in, activate the free trial from your Fabric profile menu.

1. From the Fabric portal, select your profile icon in the upper-right corner.
1. Select **Free trial**, choose a capacity region, and select **Activate**.

After activation finishes, you can start creating and exploring Fabric items.

## Related content

After activation, use these resources to continue learning and building in Fabric.

- [Get started with Microsoft Fabric](microsoft-fabric-overview.md)
- Learn about [licenses](../enterprise/licenses.md)
- [Learn about Fabric security and governance](../security/security-overview.md)
