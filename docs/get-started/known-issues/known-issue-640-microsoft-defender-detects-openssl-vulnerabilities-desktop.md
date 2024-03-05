---
title: Known issue - Microsoft Defender detects OpenSSL vulnerabilities in Power BI Desktop
description: A known issue is posted where Microsoft Defender detects OpenSSL vulnerability in Power BI Desktop.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/05/2024
ms.custom: known-issue-640
---

# Known issue - Microsoft Defender detects OpenSSL vulnerability in Power BI Desktop

Microsoft Defender detects OpenSSL 3.0.11.0 vulnerabilities in the December 2023 and above versions of Power BI Desktop. When you check the scan results in Microsoft Defender, you see OpenSSL 3.0.11.0 listed with one weakness against it. The vulnerabilities reported are CVE-2023-5363 and CVE-2023-5678 and are marked as High and Medium. The vulnerability reference Power BI Desktop DLLs from the Simba Spark ODBC drivers. However, the vulnerabilities are due to areas that we don't use in the driver and the message can be ignored.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

Microsoft Defender reports OpenSSL 3.0.11.0 vulnerabilities in Power BI Desktop for versions December 2023 and above. The vulnerabilities detected are CVE-2023-5363 and CVE-2023-5678 and are marked as High and Medium. The scan results show OpenSSL 3.0.11.0 listed with one weakness against it.

The associated DLLs are from the Simba Spark ODBC drivers:

- C:\Program Files\Microsoft Power BI Desktop\bin\ODBC Drivers\Simba Spark ODBC Driver\libcurl64.dlla\openssl64.dlla\libcrypto-3-x64.dll
- C:\Program Files\Microsoft Power BI Desktop\bin\ODBC Drivers\Simba Spark ODBC Driver\libcurl64.dlla\openssl64.dlla\libssl-3-x64.dll
- C:\Program Files\Microsoft Power BI Desktop\bin\ODBC Drivers\Simba Spark ODBC Driver\openssl64.dlla\libcrypto-3-x64.dll
- C:\Program Files\Microsoft Power BI Desktop\bin\ODBC Drivers\Simba Spark ODBC Driver\openssl64.dlla\libssl-3-x64.dll

## Solutions and workarounds

You can set Microsoft Defender to exclude these vulnerabilities. The CVE-2023-5363 vulnerability is related to ciphers that we don't use in the driver. The CVE-2023-5678 vulnerability is related to X9.42 DH keys that we don't use in the driver. Both CVEs specifically state that the vulnerability doesn't affect the SSL/TLS implementation. These CVEs don't affect the Simba driver that shipped with the December version of Power BI.

Future Power BI Desktop releases will contain OpenSSL 3.0.13 to fix these issues.

## Next steps

- [About known issues](/power-bi/troubleshoot/known-issues/power-bi-known-issues)
