---
title: Connect to Eventstream using Entra ID authentication
description: Learn how to add a Custom Endpoint source or destination to connect with an eventstream using Entra ID authentication.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 02/20/2025
ms.search.form: Source and Destination
---

# Connect to Eventstream using Entra ID authentication

**Custom Endpoint** is a special type of Eventstream source or destination that allows your application to send and fetch data from Eventstream. It supports two authentication methods for connecting to your application: **SAS Keys** and **Entra ID** authentication.

* **SAS Key Authentication**: Allows you to produce and consume Eventstream data using Shared Access Signature (SAS) keys.
* **Entra ID Authentication**: Enables a security principal (such as a user or a service principal) to produce and consume Eventstream data using Entra ID authentication.

This article guides you through creating a Service Principal application, setting up the Java project in Visual Studio Code, and connecting to Eventstream using Entra ID authentication.

## Prerequisites

* An Eventstream item in the workspace with Custom Endpoint source or destination. Refer to [this guide](add-source-custom-app.md) for adding Custom Endpoint to Eventstream.
* Install [Visual Studio Code](https://code.visualstudio.com/Download).
* Set up VS Code for Java development. Install [Coding pack for Java](https://code.visualstudio.com/docs/java/java-tutorial).

## Step 1: Create a Service Principal App

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Browse to **Identity** > **Applications** > **App registrations**, and select **New registration**.
3. Enter a display **Name** for your application.
4. Open your app, copy the **client ID** and **tenant ID** for later use.
   :::image type="content" border="true" source="media\entra-id-auth\app-id.png" alt-text="Screenshot of app ID.":::
5. Go to **Certificates & secrets**, add a new client secret and copy the value.
   :::image type="content" border="true" source="media\entra-id-auth\app-secret.png" alt-text="Screenshot of app secret.":::
6. Once completed, you should have the following three information ready:
   * Azure Client ID
   * Azure Tenant ID
   * Azure Client Secret

## Step 2: Assign Fabric workspace permission

1. Go to your Fabric workspace and select **Manage access**.
   :::image type="content" border="true" source="media\entra-id-auth\workspace-manage-access.png" alt-text="Screenshot of workspace manage access.":::
2. Search for the application created in the previous step and assign the **Contributor** (or higher) to your app.
   :::image type="content" border="true" source="media\entra-id-auth\assign-workspace-permission.png" alt-text="Screenshot of assigning workspace permission to an app.":::

## Step 3: Set up project in VS Code

1. Open the terminal in VS Code and download the [GitHub project](https://github.com/ruiminwang/eventstream-entra-id-auth-samples) or run the following command to clone the project.

   ```powershell
   git clone https://github.com/ruiminwang/eventstream-entra-id-auth-samples.git
   ```

2. Install **Java** and **Maven**. If you don’t have Java and Maven installed, use **Scoop** to install them:

   ``` powershell
   # https://scoop.sh/
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
    
   scoop bucket add java
   scoop install oraclejdk-lts
   scoop install maven
   ```

3. Set up environment variables. Configure environment variables for your Service Principal app:

   ``` powershell
   $env:AZURE_CLIENT_ID="aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb"
   $env:AZURE_TENANT_ID="bbbb1111-cc22-3333-44dd-555555eeeeee"
   $env:AZURE_CLIENT_SECRET="aaaabbbb1111cc22333344dd555555ee"
   ```

## Step 4: Build and run your project

### Send data to Eventstream

1. In Eventstream, add a Custom Endpoint as a source.
1. Select **Custom Endpoint** > **Entra ID Authentication**, copy the following details, and paste them into the **ProducerSample.java** file:
   * Event hub namespace
   * Event hub
   :::image type="content" border="true" source="media\entra-id-auth\producer-sample.png" alt-text="Screenshot of producer sample code in VS Code.":::
1. Run the following command to build and run the project:

   ``` powershell
   mvn clean package

   java -cp .\target\EventHubOAuth-1.0-SNAPSHOT-jar-with-dependencies.jar com.microsoft.ProducerSample
   ```

If the data is sent successfully, you can go to your eventstream and view the incoming data.

### Fetch data from Eventstream

1. In Eventstream, add a Custom Endpoint as a destination.
1. Select **Custom Endpoint** > **Entra ID Authentication**, copy the following details, and paste them into the **ConsumerSample.java** file:
   * Event hub namespace
   * Event hub
   * Consumer group
   :::image type="content" border="true" source="media\entra-id-auth\consumer-sample.png" alt-text="Screenshot of consumer sample code in VS Code.":::
1. Run the following command to build and run the project:

   ``` powershell
   mvn clean package
   
   java -cp .\target\EventHubOAuth-1.0-SNAPSHOT-jar-with-dependencies.jar com.microsoft.ConsumerSample
   ```

After successfully running the project, you can view the incoming data in your application.

## Related content

To learn how to add other sources to an eventstream, see the following articles:

* [Azure Event Hubs](add-source-azure-event-hubs.md)
* [Azure IoT Hub](add-source-azure-iot-hub.md)
* [Sample data](add-source-sample-data.md)
