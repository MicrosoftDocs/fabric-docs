---
title: How to configure at-a-glance section
description: Learn how to configure the at-a-glance section with slide media content for your Fabric workload's product details page.
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# Configure at a glance section for the workload hub

Configure the at-a-glance section in your workload's product details page using slide media content to showcase your workload's capabilities and features.

## Overview

The at-a-glance section displays slide media content on your workload's product details page, allowing you to:

- **Showcase features**: Display images and videos highlighting key capabilities
- **Provide demos**: Include video demonstrations of your workload
- **Visual branding**: Enhance your workload's visual presentation
- **User engagement**: Help users understand your workload through rich media

## Configuration in Product.json

Configure slide media in the `productDetail.slideMedia` array in your Product.json manifest:

```json
{
  "productDetail": {
    "publisher": "Your Company",
    "slogan": "Your workload slogan",
    "description": "Brief description of your workload",
    "image": {
      "mediaType": 0,
      "source": "assets/images/main-image.png"
    },
    "slideMedia": [
      {
        "mediaType": 1,
        "source": "https://youtube.com/embed/UNgpBOCvwa8?si=KwsR879MaVZd5CJi"
      },
      {
        "mediaType": 0,
        "source": "assets/images/feature-overview.png"
      },
      {
        "mediaType": 0,
        "source": "assets/images/dashboard-preview.png"
      }
    ]
  }
}
```

## Media types

Configure different media types in your slide media:

### Images (mediaType: 0)

```json
{
  "mediaType": 0,
  "source": "assets/images/your-image.png"
}
```

- Use PNG, JPG, or SVG formats
- Store images in the `assets/images` folder
- Optimize for web display

### Videos (mediaType: 1)

```json
{
  "mediaType": 1,
  "source": "https://youtube.com/embed/VIDEO_ID"
}
```

**Supported video formats:**

- **YouTube**: `https://youtube.com/embed/<id>` or `https://www.youtube.com/embed/<id>`
- **Vimeo**: `https://player.vimeo.com/video/<number>` (without `www.`)

## Configuration limits

- **Maximum slides**: 10 items in the `slideMedia` array
- **Recommended mix**: Combine images and videos for best user experience
- **Performance**: Optimize media files for web delivery

## Best practices

### Content strategy

- **Lead with video**: Place demo videos first to engage users immediately
- **Show key features**: Include screenshots of main functionality
- **Progressive disclosure**: Arrange content from overview to detailed features

### Media optimization

- **Image quality**: Use high-resolution images that scale well
- **Video length**: Keep videos concise (2-3 minutes maximum)
- **Thumbnails**: Ensure video thumbnails are compelling

### Example configuration

```json
{
  "slideMedia": [
    {
      "mediaType": 1,
      "source": "https://youtube.com/embed/demo-overview"
    },
    {
      "mediaType": 0,
      "source": "assets/images/dashboard.png"
    },
    {
      "mediaType": 0,
      "source": "assets/images/analytics.png"
    },
    {
      "mediaType": 1,
      "source": "https://player.vimeo.com/video/tutorial"
    }
  ]
}
```

## Next steps

- [Product Manifest](./manifest-product.md)
