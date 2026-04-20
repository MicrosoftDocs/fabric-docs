---
title: How to monetize your workload
description: Learn how to implement monetization for your Fabric workload using Azure Marketplace SaaS offers or external monetization solutions.
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# Monetize your workload in Microsoft Fabric

Implement monetization for your Fabric workload using Azure Marketplace SaaS offers or external monetization solutions with user experiences defined in [Fabric templates](https://aka.ms/fabrictemplates).

## Monetization options

Your workload can monetize through:

- **Azure Marketplace SaaS**: Leverage Microsoft's billing infrastructure
- **External solutions**: Use your own billing and payment systems
- **Hybrid approach**: Combine marketplace and external monetization

## Azure Marketplace integration

### SaaS offer setup

Create an Azure Marketplace SaaS offer for your workload:

1. **Publisher Center**: Configure your SaaS offer in Partner Center
2. **Landing page**: Implement subscription management UI
3. **Webhook endpoint**: Handle subscription lifecycle events
4. **Billing integration**: Connect to Azure Marketplace billing APIs

### Template-defined experience

The [Fabric templates](https://aka.ms/fabrictemplates) define user experiences for Azure Marketplace integration:

```typescript
// marketplace-integration.ts
export const handleMarketplaceSubscription = (subscriptionData) => {
  // Follow Fabric templates pattern for marketplace UX
  openSubscriptionDialog({
    templatePattern: 'azure-marketplace-saas',
    subscriptionId: subscriptionData.id,
    planId: subscriptionData.planId
  });
};
```

### Marketplace APIs

Fabric Extensibility toolkit does not provide additional tools for Azure Marketplace integration. Reference the official APIs:

- **[Azure Marketplace SaaS APIs](/partner-center/marketplace-offers/pc-saas-fulfillment-apis)**
- **[SaaS fulfillment Subscription APIs v2](/partner-center/marketplace-offers/pc-saas-fulfillment-subscription-api)**
- **[Metering service APIs](/partner-center/marketplace-offers/marketplace-metering-service-apis)**

## External monetization

### Custom billing solutions

Implement your own monetization outside Azure Marketplace:

```typescript
// external-billing.ts
export const handleCustomBilling = (userData) => {
  // Follow Fabric templates pattern for external billing UX
  openBillingDialog({
    templatePattern: 'external-monetization',
    userId: userData.id,
    subscriptionTier: userData.tier
  });
};
```

### Template support

[Fabric templates](https://aka.ms/fabrictemplates) provide UX patterns for both marketplace and external monetization approaches.

## Implementation considerations

### User experience alignment

- **Template consistency**: Follow [Fabric templates](https://aka.ms/fabrictemplates) for monetization UX
- **Seamless integration**: Embed billing flows naturally in your workload
- **Clear pricing**: Present subscription options transparently

### Technical integration

- **Authentication**: Ensure proper user identity management
- **Subscription state**: Track user subscription status across sessions
- **Feature gating**: Control access based on subscription level
- **Usage tracking**: Monitor consumption for metered billing

## Best practices

- **Template alignment**: Use [Fabric templates](https://aka.ms/fabrictemplates) for consistent UX
- **Marketplace APIs**: Leverage official Azure Marketplace documentation
- **External flexibility**: Design for both marketplace and external billing
- **User transparency**: Clearly communicate pricing and billing terms

## Next steps

- [Azure Marketplace SaaS documentation](/azure/marketplace/plan-saas-offer)
- [Fabric templates](https://aka.ms/fabrictemplates)
- [Publisher monetization guide](/azure/marketplace/publisher-guide-by-offer-type)
