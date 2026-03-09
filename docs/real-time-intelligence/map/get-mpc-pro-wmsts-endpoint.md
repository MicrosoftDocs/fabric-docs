---
title: Get the WMTS endpoint URL from the MPC Pro geocatalog
description: Learn how to get the WMTS endpoint URL from the MPC Pro geocatalog.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/12/2026
ms.search.form: WMTS, MPC, Microsoft Planetary Computer Pro imagery, MPC Pro geocatalog, WMTS endpoint URL
---

# Get the WMTS endpoint URL from the MPC Pro geocatalog

Use the following Python code snippets to retrieve the information required to construct the WMTS endpoint for imagery data in your MPC Pro geocatalog.

1. Install required libraries:

    ```
    pip install azure-identity ipykernel requests
    ```

1. Import libraries:

    ```python
    import json
    import requests
    import urllib.parse
    from azure.identity import DefaultAzureCredential
    ```

1. Authenticate and retrieve collection metadata

    Authenticate to the Microsoft Planetary Computer Pro Geocatalog using Azure AD and define common request parameters. Then retrieve the STAC collection metadata to obtain the collection's spatial extent and descriptive information.

    The collection response provides the bounding box (bbox), which defines the geographic coverage of the imagery, and the collection title, which can be reused later when registering the WMTS endpoint source name. This metadata is required to correctly scope imagery requests and configure downstream WMTS usage.

    ```python
    # Setup API authorization for Microsoft Planetary Computer Pro
    
    credential = DefaultAzureCredential()
    token = credential.get_token("https://geocatalog.spatio.azure.com/.default")
    
    headers = {"authorization": "Bearer " + token.token}
    params = {"api-version": "2025-04-30-preview"}
    geocatalog_url = "https://{geocatalog_instance_name}.{region_name}.geocatalog.spatio.azure.com"
    collection_id = "{collection_id}"
    ```

    > [!NOTE]
    > If a request returns 401 or 403, verify that your Azure AD principal has access to the MPC Pro geocatalog instance.

1. Get Bounding Box and Render Configuration from the collection

    Retrieve the bbox (bounding box) from the STAC collection metadata. In addition, capture the collection title to use later when registering the WMTS endpoint source name.

    ```python    
    collection = requests.get(
        f"{geocatalog_url}/stac/collections/{collection_id}",
        headers=headers,
        params=params,
    ).json()
    
    print(f"Collection metadata:\n{json.dumps(collection, indent=2)}")
    
    bbox = collection["extent"]["spatial"]["bbox"][0]
    print(f"BBox: {bbox}")
    
    title = collection["title"]
    print(f"Title: {title}")
    ```

1. Retrieve render configuration and minZoom.

    The `minZoom` indicates the lowest zoom level at which the imagery can be rendered and should be used when configuring WMTS clients to avoid requesting tiles outside the supported zoom range. If multiple render configurations are returned, this example uses the first option. If `minZoom` isn't defined, default zoom behavior applies.

    ```python
    render_config = requests.get(
        f"{geocatalog_url}/stac/collections/{collection_id}/configurations/render-options",
        headers=headers,
        params=params,
    ).json()
    
    print(f"Render configuration:\n{json.dumps(render_config, indent=2)}")
    
    # Let's get the minzoom (if present) from the first render configuration option. Note that the render   
    # configuration uses minZoom (camel case), while the mosaic registration metadata expects minzoom (lowercase).
    
    min_zoom = 0
    render_config_options = {}
    if render_config and isinstance(render_config, list) and len(render_config) > 0:
        min_zoom = render_config[0].get("minZoom", None)
        render_config_options = render_config[0].get("options", {})
    print(f"MinZoom: {min_zoom}")
    ```

    > [!Note]
    > Render options are required to retrieve a WMTS endpoint in MPC Pro. The render configuration defines asset selection, color processing, and zoom constraints that are reflected in the generated WMTS service. For more information, see [Render options](/rest/api/planetarycomputer/data-plane/stac-collection-render-options/create).

    Example render configuration output:

    ```
    [
      {
        "id": "render-config-1",
        "name": "Natural color",
        "description": "True color composite of visible bands (B04, B03, B02)",
        "type": "raster-tile",
        "options": "assets=red&assets=green&assets=blue&nodata=0&color_formula=Gamma RGB 3.2 Saturation 0.8 Sigmoidal RGB 25 0.35",
        "minZoom": 7
      }
    ]
    MinZoom: 7
    ```

1. [Register](/rest/api/planetarycomputer/data-plane/mosaics-register-search/register) a search.

    This step creates a Search ID that scopes the request to a specific geographic area within the target MPC Pro imagery collection.

    ```python
    register_search_response = requests.post(
        f"{geocatalog_url}/data/mosaic/register",
        headers=headers,
        params=params,
        json={
            "filter-lang": "cql2-json",
            "filter": {
                "op": "and",
                "args": [
                    {
                        "op": "=",
                        "args": [
                            {
                                "property": "collection",
                            },
                            collection_id,
                        ],
                    }
                ],
            },
            "sortby": [
                {
                    "field": "datetime",
                    "direction": "desc",
                },
            ],
            "bbox": bbox,
            "metadata": {
                "name": title,
                "minzoom": min_zoom,
            },
        },
    )
    
    register_search = register_search_response.json()
    search_id = register_search["searchid"]
    
    print(f"Register search response:\n{json.dumps(register_search, indent=2)}")
    print(f"Search ID: {search_id}")
    ```

    Example register search response:

    ```
    {
      "searchid": "{search_id}",
      "links": [
        {
          "href": "{geocatalog_url}/data/mosaic/{search_id}/info",
          "rel": "metadata",
          "type": "application/json",
          "title": "Mosaic metadata"
        },
        {
          "href": "https://{geocatalog_url}/data/mosaic/{search_id}/tilejson.json",
          "rel": "tilejson",
          "type": "application/json",
          "title": "Link for TileJSON"
        },
        {
          "href": "https://{geocatalog_url}/data/mosaic/{search_id}/WMTSCapabilities.xml",
          "rel": "wmts",
          "type": "application/json",
          "title": "Link for WMTS"
        }
      ]
    }
    Search ID: search_id
    ```

1. Get the WMTS capabilities document.

    Use the WMTS link returned from the registered search response to request the WMTS GetCapabilities document for the collection identified by the Search ID. This request returns service metadata that describes how the imagery can be consumed, including supported layers, tile matrix sets, formats, and RESTful tile endpoints.

    Render configuration options (asset selection, color processing, and tile scale) are passed as query parameters so the capabilities document reflects the exact rendering behavior of the imagery.

    ```python
    # Get the link with rel equals to wmts
    wmts_link = next(link for link in register_search["links"] if link["rel"] == "wmts")["href"]
    print(f"WMTS URL: {wmts_link}")
    
    wmts_response = requests.get(
        wmts_link,
        headers=headers,
        params={
            **params,
            **{k: v if len(v) > 1 else v[0] for k, v in urllib.parse.parse_qs(render_config_options).items()},
            "tile_scale": 2,
        },
    )
    
    wmts_capabilities = wmts_response.text
    
    print(f"WMTS Capabilities response:\n{wmts_capabilities}")
    ```

    Example output:

    ```
    WMTS URL: https://{geocatalog_url}/data/mosaic/{search_id}/WMTSCapabilities.xml
    WMTS Capabilities response:
    <Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd" version="1.0.0">
        <ows:ServiceIdentification>
            <ows:Title></ows:Title>
            <ows:ServiceType>OGC WMTS</ows:ServiceType>
            <ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion>
        </ows:ServiceIdentification>
        <ows:OperationsMetadata>
            <ows:Operation name="GetCapabilities">
                <ows:DCP>
                    <ows:HTTP>
                        <ows:Get xlink:href="https://{geocatalog_url}/data/mosaic/{search_id}/WMTSCapabilities.xml?api-version=2025-04-30-preview&amp;assets=red&amp;assets=green&amp;assets=blue&amp;nodata=0&amp;color_formula=Gamma+RGB+3.2+Saturation+0.8+Sigmoidal+RGB+25+0.35&amp;tile_scale=2">
                            <ows:Constraint name="GetEncoding">
                                <ows:AllowedValues>
                                    <ows:Value>RESTful</ows:Value>
                                </ows:AllowedValues>
                            </ows:Constraint>
                        </ows:Get>
                    </ows:HTTP>
                </ows:DCP>
            </ows:Operation>
            <ows:Operation name="GetTile">
                <ows:DCP>
                    <ows:HTTP>
    ...
            </TileMatrixSet>
        </Contents>
        <ServiceMetadataURL xlink:href="https://{geocatalog_url}/data/mosaic/{search_id}/WMTSCapabilities.xml?api-version=2025-04-30-preview&amp;assets=red&amp;assets=green&amp;assets=blue&amp;nodata=0&amp;color_formula=Gamma+RGB+3.2+Saturation+0.8+Sigmoidal+RGB+25+0.35&amp;tile_scale=2" />
    </Capabilities>
    ```

> [!TIP]
> Refer to [Get Capabilities API](/rest/api/planetarycomputer/data-plane/mosaics-wmts-mosaics/get-capabilities-xml) documentation for more detailed and granular settings of MPC Pro WMTS endpoint.

As a result, you obtain the WMTS endpoint configured with rendering options from MPC Pro. The URL follows the format shown below.

```
https://{geocatalog_url}/data/mosaic/{search_id}/WMTSCapabilities.xml?api-version=2025-04-30-preview&assets=red&assets=green&assets=blue&nodata=0&color_formula=Gamma+RGB+3.2+Saturation+0.8+Sigmoidal+RGB+25+0.35&tile_scale=2
```

Use this URL as the WMTS capabilities endpoint when configuring a Microsoft Planetary Computer Pro connection.

## Next steps

> [!div class="nextstepaction"]
> [Use Microsoft Planetary Computer Pro imagery](add-external-sourced-imagery-layer.md)
