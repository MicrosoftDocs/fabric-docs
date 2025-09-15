# Prepare Your Environment for Fabric Pipeline Upgrade

Before you begin upgrading pipelines, make sure your environment is ready with the right tools and modules.

---

## Install PowerShell 7.4.2 (x64) or Later

To proceed, you’ll need **PowerShell 7.4.2 or higher installed on your machine. 

[Download PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4)

---

## Install and Import the `FabricPipelineUpgrade` Module

1. Open **PowerShell 7 (x64)**  
   Click the Start menu and search for **PowerShell 7**. Look for this icon:

![image](https://github.com/microsoft/FabricUpgrade/assets/85350198/8744d3fb-40d6-4e2c-88ac-563ab32ea4c9)

 Right-click and choose **Run as administrator** for elevated permissions.

2. In the PowerShell window, run the following command to install the module:

```
Install-Module Microsoft.FabricPipelineUpgrade -Repository PSGallery -SkipPublisherCheck
```
3. Once installed, import the module:
```
Import-Module Microsoft.FabricPipelineUpgrade
```
If you encounter a signing or execution policy error, run the below command and try importing the module again.
```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
## Verify Your Installation
To confirm everything is set up correctly, run:
```
Get-Command -Module Microsoft.FabricPipelineUpgrade
```
You should see output similar to this. Version number would be based on the latest published version:
<img width="1099" height="216" alt="VerifyPSInstallation" src="https://github.com/user-attachments/assets/808de11f-9c3e-46bb-974b-675d73cbe1af" />

