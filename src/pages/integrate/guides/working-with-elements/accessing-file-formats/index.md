# Accessing Different File Formats with Representations

An element in a Creative Cloud Library can include one or more formats that are accessed as _representations_ using the API. As an example, an XD Component can have three different representations; A static PNG file that provides a bitmap version of what the component looks like, an SVG file that has vector information about the component, and a JSON representation of the component that includes a variety of properties included in the component.

Representations are added when an element is created and can be added/modified later. By default, all elements have a static representation in PNG format in addition to whatever the native format of the element is. For instance, a Photoshop object that is added as a Graphics element will include the the source file as a representation (`.psd`) as well as a static `.png` representation.

## Getting Thumbnails and Full Resolution PNGs using Renditions

Separate from `representations`, all graphical elements in a Library include a static PNG `rendition` that is created when the element is added. This `rendition` can be an easy way to get PNG of an graphical element that doesn't require the use of renditions. 

Each Library Element includes a `thumbnail` property which has a `rendition` link that can be used to access the static PNG for an element. It looks something like this:

```json
"thumbnail": {
    "type": "href",
    "rendition": "https://cc-api-storage.adobe.io/assets/adobe-libraries/<libraryId>/<UUID of the asset>/:rendition;size=200"
}
```

This information is also returned in the `http://ns.adobe.com/melville/rel/rendition` object of the `_links` array on an element. 

When calling that API, the `size` value can be omitted to return a full-sized rendition or modified which will return a PNG where the longest side is equal to the `size` specified. 

The following curl call can be used to access a rendition whose longest size will be 400 pixels:

```shell
curl --location --request GET 'https://cc-api-storage.adobe.io/assets/adobe-libraries/<libraryId>/<UUID of the asset>/:rendition;size=400' \
--header 'x-api-key: <client ID>' \
--header 'Authorization: Bearer <access token>'
```

## Adobe Product Compatibility for Representations

Each Adobe product has specific rules for what representations they include when an element is uploaded.

| Product     | Element Type | Representation Formats |
| ----------- | ------------ | ---------------------- |
| Photoshop   | Graphic      | PSD, PNG               |
| Illustrator | Graphic      | AI, PNG                |
| XD          | Graphic      |                        |
| XD          | Component    | JSON (AGC), SVG, PNG   |


## Getting Representations

To get a list of all the representations for an element use the `?selector=representations` on any element:

```shell
curl --location --request GET 'https://cc-libraries.adobe.io/api/v1/libraries/{library_id}/elements/{element_id}?selector=representations' \
--header 'x-api-key: {api_key}' \
--header 'Authorization: Bearer {access_token}'
```

<InlineAlert variant="info" slots="text"/>

**IMPORTANT** Using selectors can increase the response time of API calls so use them sparingly and only when they are the only option for getting the required data.

That returns a JSON object that includes some basic metadata about the element as well as an array of any representations. Each representation is made up of an asset (usually a file) and has the following properties:

| Property                 | Description                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `id`                     | The unique ID of the representation                                                                    |
| `type`                   | The mime type of the asset that defines the representation                                             |
| `path`                   | _(For file-based representations)_ The file name of the representation's asset                         |
| `is_full_size`           | Boolean property for whether the specific assets is a full sized representation of the element         |
| `width`                  | _(For file-based representations)_ The width (in pixels) of the representation's asset                 |
| `height`                 | _(For file-based representations)_ The height (in pixels) of the representation's asset                |
| `version`                | _(For file-based representations)_ The version of the representation                                                    |
| `md5`                    | _(For file-based representations)_ The MD5 hash of the representation's asset                          |
| `_links`                 | _(For file-based representations)_ An array of links to other properties of the representation's asset |
| `etag`                   | _(For file-based representations)_ The etag of the representation's asset                              |
| `storage_href`           | _(For file-based representations)_ The location of the file that defines the representation            |
| `is_preferred_thumbnail` | Boolean property for Whether the representation is used as the thubmnail of the element                |
| `name`                   | _(For file-based representations)_ Name of the representation's asset                                  |

## Downloading and Accessing Representations

For non-file representations, the main information will be captured in a JSON object. For instance, representations of color elements will have a specific `color#data` property that includes the `mode` and corresponding color `value`.

For file-based representations, the `storage_href` property contains the path to the file that defines that representation. For many representations, that will be an image file, but in the case of components and other representations, it may point to the JSON object that defines that specific representation format.

To access the representation's file, use a `GET` request with the same headers on that URL:

```shell
curl --location --request GET '{storage_href}' \
--header 'x-api-key: {api_key}' \
--header 'Authorization: Bearer {access_token}'
```

_Note: The URL can also be accessed by following the `http://ns.adobe.com/melville/rel/path` property of the `_links` array on the representation._

