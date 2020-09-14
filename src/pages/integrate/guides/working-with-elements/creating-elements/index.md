# Creating Library Elements

This document provides background on workflows to create library elements. It does not assume that
you have any background in library element concepts. However, it does assume that you are already
familiar with how to call the Libraries API, e.g., how to get an API token, required header fields, etc.
this document attempts to remain technology-agnostic w.r.t. documenting API calls.

## Background

A _library_ consists of one or more library _elements_. These elements consist of metadata that represent entities which
are used within different Creative Cloud applications, e.g., images, videos, colors, 3D models, etc. Library elements contain one or more
_representations_, each of which refers to, or contains, an _asset_, and will have a particular _relationship_ to
the entity represented by the element.

_Representations_ may have one of three different relationships to the entity they represent, 'primary', 'rendition', or
rarely, 'alternate'. 'Primary' representations usually refer to the asset that is the thing itself, e.g., for graphics,
the largest, highest-resolution version; for 3d models, the file containing 3d data, etc. All library elements should have
a single primary representation. 'Renditions' typically refer to versions of the primary representation specific to some
use case, e.g., a thumbnail for display on a web page. Elements may have an unlimited number of renditions. The
'alternate' relationship designates alternative primary representations that are used in different contexts;
currently, its use is limited to pattern elements.

_Assets_ in this context refer to the primary data source for some representation, e.g., for an image, it will be some
image file, for colors, it will be a json document containing the spec for that color, etc.

### Generally Required Properties

In addition to a list of representations, every library element requires a "type" property, and a "client" dictionary.

The "type" property will contain the MIME type of the library element you are creating. This type will be in the group
application/vnd.adobe.\*+dcx.

The "client" dictionary contains the properties "deviceId", "device", and "app". These fields are unchecked, but you will
get them back with future element requests, and it may be helpful to populate them with something meaningful to track who
or what is creating or modifying library elements.

Each representation is required to contain a "type" property that is the MIME type of that representation. The
primary representation type is constrained according to the MIME type of the library element. For example, when creating
a color, the library element will have a MIME type of "application/vnd.adobe.element.color+dcx", and the primary representation
must be of type "application/vnd.adobe.color+json". Other properties within the representation may be required depending
on the representation type.

Generally, all representations should also contain a "relationship" property as described above. However, this is not
strictly required; the default relationship is "rendition."

```
{
    "name": "my-cool-graphic",
    "type": "application/vnd.adobe.element.image+dcx",
    "client": {
        "deviceId": "MY_COOL_DEVICE_ID",
        "device": "MY_COOL_DEVICE",
        "app": "MY_COOL_APP"
    },
    "representations": [
        {
            "type": "image/svg+xml",
            "relationship": "primary",
            "storage_href": "https://cc-api-storage-stage.adobe.io/assets/adobe-libraries/4dc522a7-af3d-4274-986c-bb1f59bb20d0/3f4d2883-f7e5-4d64-bec1-f153ae5d80af"
        }
    ]
}
```

_Figure 1: An example image payload for postLibraryElements (/api/v1/libraries/{{library-id}}/elements/), containing the minimum required properties._

### Asset Types, Usage Patterns, Required Fields by Asset Type

Assets generally fall into three categories: 1. _User-uploaded_, 2. _Self-contained_, 3. _Stock_. Each category of asset
may require a different usage pattern to correctly create a library element, and each requires different representation
properties.

#### User-Uploaded Assets

User-uploaded assets are files that are uploaded before the library element is created, and the library element should
contain a link to that file. In other words, the recommended pattern for creating any library element that contains
user-uploaded assets is to upload all the assets first, then create the library element referencing them using a single
call to the CC libraries service. The steps to upload assets change depending on the size of the file; files under 5mb
in size may be uploaded in one shot, files over 5mb must be broken into chunks.

User-uploaded asset representations require, alongside
a "type" property, either a "storage_href" or "path" property, but not both. The "storage_href" property should contain
an absolute link to the asset in CC storage, and "path" should contain the relative path to the asset (TODO: ?? & explain this).
Figure 1 contains an example of a valid asset representation.

#### Self-contained Assets

_Self-contained_ assets refer to assets that are entirely contained within the library element representation metadata.
In this case, only a single call to the CC library service is needed. An example might be a json document describing a color.
Self-contained assets will always contain a required namespaced property, e.g., for colors, "color#data". The requirements
for these properties will vary by representation type.

```
{
	"name": "my-cooler-color",
	"type": "application/vnd.adobe.element.color+dcx",
	"client": {
		"deviceId": "MY_COOL_DEVICE_ID",
		"device": "MY_COOL_DEVICE",
		"app": "MY_COOL_APP"
	},
	"representations": [
		{
		    "type": "application/vnd.adobe.color+json",
		    "relationship": "primary",
		    "color#data": {
		        "mode": "CMYK",
		        "value": {
	                "c": 100,
	                "m": 79.0585160255432,
	                "y": 39.5178139209747,
	                "k": 31.2565803527832
		        },
		        "type": "process"
		    }
		},
		{
	        "id": "fe595a93-aefc-4e2f-a6a7-d594610f292f",
	        "type": "application/vnd.adobe.color+json",
	        "relationship": "rendition",
	        "color#data": {
	            "mode": "RGB",
	            "value": {
	                "r": 12.7313232421875,
	                "g": 56.0341644287109,
	                "b": 89.8001861572266
	            },
	            "type": "process"
	        }
	    }
	]
}
```

_Figure 2: An example color payload for postLibraryElement, containing two color representations, each with a required "color#data" property._

#### Stock Assets

Stock assets refer to files managed within the Adobe Stock product. Library elements that contain stock asset representations
will contain a link to the asset within Adobe Stock, as well as additional metadata describing the stock asset. A stock asset
is acceptable within a library element representation wherever a user-uploaded asset is (TODO: glossing over this for the moment).

### In Practice

Although the last few examples contained different asset types in isolation, it is more realistic to expect to use multiple
asset types within a single library element. For example, a common scenario is to have a primary representation that
contains a self-contained asset, and other asset renditions.

Let's say we want to create a font element. The font element requires two representations: a self-contained font specification,
and a thumbnail image. In this example, for clarity, we will assume that the thumbnail image is under 5mb in size.
If the image were bigger, we would need to upload the file in chunks (see below).

First, we would upload the thumbnail:

POST /api/v1/libraries/{{library-id}}/representations/content

```
(form-data)
Representation-Data: {"type":"image/png"}
Representation-Content: <... the file ...>

Response:
{
    "id": "602eb2e4-d86d-481f-adc2-d751fc5ca961",
    "storage_href": "https://cc-api-storage-stage.adobe.io/id/urn:aaid:sc:US:efb1969b-fed5-4381-836e-6d7a97a14fbf?component_id=602eb2e4-d86d-481f-adc2-d751fc5ca961",
    "asset_id": "urn:aaid:sc:US:e51bf45b-5799-43bb-9c64-37857357cb5e",
    "type": "image/png",
    "content_length": 158356,
    "etag": "\"9b4fb626b2ea694ceceda1b5caa7463c\"",
    "md5": "m0+2JrLqaUzs7aG1yqdGPA==",
    "version": "0"
}
```

Then, we would upload the metadata:

POST /api/v1/libraries/{{library-id}}/elements/

```
REQUEST:
{
  "name": "my-coolest-font",
  "type": "application/vnd.adobe.element.font+dcx",
  "client": {
    "deviceId": "MY_COOL_DEVICE_ID",
    "device": "MY_COOL_DEVICE",
    "app": "MY_COOL_APP"
  },
  "representations": [
    {
      "type": "application/vnd.adobe.font+json",
      "relationship": "primary",
      "font#data": {
		  "postScriptName": "TimesNewRomanPS-BoldMT",
		  "name": "Times New Roman Bold",
		  "family": "Times New Roman",
		  "style": "Bold",
		  "typekitFontId": "some_meaningful_uuid",
		  "foundry": "The FooBaz Corporation"
		}
    },
    {
    	"type": "image/png",
    	"relationship": "rendition",
    	"storage_href": "https://cc-api-storage-stage.adobe.io/id/urn:aaid:sc:US:efb1969b-fed5-4381-836e-6d7a97a14fbf?component_id=602eb2e4-d86d-481f-adc2-d751fc5ca961",
	    "content_length": 158356,
	    "etag": "\"9b4fb626b2ea694ceceda1b5caa7463c\"",
	    "md5": "m0+2JrLqaUzs7aG1yqdGPA==",
	    "version": "0"
    }
  ]
}

RESPONSE:
{
    "total_count": 1,
    "elements": [
        {
            "id": "9e46e07f-f9c1-4380-b199-754c1f6ffb9c",
            "name": "my-coolest-font",
            "created_date": 1590014039430,
            "modified_date": 1590014039430,
            "type": "application/vnd.adobe.element.font+dcx",
            "thumbnail": {},
            "assetSubType": "element",
            "_fc": false,
            "path": "ad9bcb38-b783-4490-8ca4-a87b18b12349",
            "library#createdData": {
                "app": "MY_COOL_APP",
                "time": 1590014039430,
                "userId": "35305C3E5E861DB40A494026@AdobeID",
                "deviceId": "MY_COOL_DEVICE_ID",
                "device": "MY_COOL_DEVICE"
            },
            "library#modifiedData": {
                "app": "MY_COOL_APP",
                "time": 1590014039430,
                "userId": "35305C3E5E861DB40A494026@AdobeID",
                "deviceId": "MY_COOL_DEVICE_ID",
                "device": "MY_COOL_DEVICE"
            }
        }
    ]
}
```

Afterwards, if you were to get the element, it might look like this:

GET /api/v1/libraries/{{library-id}}/elements/9e46e07f-f9c1-4380-b199-754c1f6ffb9c?selector=full

```
{
    "id": "9e46e07f-f9c1-4380-b199-754c1f6ffb9c",
    "name": "my-coolest-font",
    "created_date": 1590014039430,
    "modified_date": 1590014039432,
    "type": "application/vnd.adobe.element.font+dcx",
    "thumbnail": {
        "type": "href",
        "rendition": "https://cc-api-storage-stage.adobe.io/assets/adobe-libraries/4dc522a7-af3d-4274-986c-bb1f59bb20d0/22fd8c85-eb35-47bc-aa0d-379497e7414e/:rendition;size=200"
    },
    "representations": [
        {
            "id": "22fd8c85-eb35-47bc-aa0d-379497e7414e",
            "type": "image/png",
            "relationship": "rendition",
            "path": "84688801-5e6e-466e-a896-fd69188d9904",
            "is_full_size": false,
            "is_external_link": false,
            "content_length": 158356,
            "version": "0",
            "md5": "m0+2JrLqaUzs7aG1yqdGPA==",
            "_links": {
                "http://ns.adobe.com/melville/rel/primary": {
                    "href": "https://cc-api-storage-stage.adobe.io/assets/adobe-libraries/4dc522a7-af3d-4274-986c-bb1f59bb20d0/22fd8c85-eb35-47bc-aa0d-379497e7414e",
                    "rel": "http://ns.adobe.com/melville/rel/primary",
                    "type": "image/png",
                    "templated": false
                },
                "http://ns.adobe.com/melville/rel/path": {
                    "href": "https://cc-api-storage-stage.adobe.io/assets/adobe-libraries/4dc522a7-af3d-4274-986c-bb1f59bb20d0/22fd8c85-eb35-47bc-aa0d-379497e7414e",
                    "rel": "http://ns.adobe.com/melville/rel/path",
                    "type": "image/png",
                    "templated": false
                },
                "http://ns.adobe.com/melville/rel/rendition": {
                    "href": "https://cc-api-storage-stage.adobe.io/assets/adobe-libraries/4dc522a7-af3d-4274-986c-bb1f59bb20d0/22fd8c85-eb35-47bc-aa0d-379497e7414e/:rendition{;page,size,version}",
                    "rel": "http://ns.adobe.com/melville/rel/rendition",
                    "templated": true
                },
                "http://ns.adobe.com/melville/rel/version-history": {
                    "href": "https://cc-api-storage-stage.adobe.io/assets/adobe-libraries/4dc522a7-af3d-4274-986c-bb1f59bb20d0/22fd8c85-eb35-47bc-aa0d-379497e7414e/:paged_versions{?order,orderby,start,limit,property}",
                    "rel": "http://ns.adobe.com/melville/rel/version-history",
                    "type": "application/vnd.adobe.versions+json",
                    "templated": true
                },
                "http://ns.adobe.com/melville/rel/raw": {
                    "href": "https://cc-api-storage-stage.adobe.io/assets/adobe-libraries/4dc522a7-af3d-4274-986c-bb1f59bb20d0/22fd8c85-eb35-47bc-aa0d-379497e7414e{;version}/:raw",
                    "rel": "http://ns.adobe.com/melville/rel/raw",
                    "templated": true
                }
            },
            "etag": "\"9b4fb626b2ea694ceceda1b5caa7463c\"",
            "storage_href": "https://cc-api-storage-stage.adobe.io/assets/adobe-libraries/4dc522a7-af3d-4274-986c-bb1f59bb20d0/22fd8c85-eb35-47bc-aa0d-379497e7414e",
            "representation_order": 1,
            "is_preferred_thumbnail": false,
            "is_component": true,
            "is_external_link": false,
            "state": "unmodified",
            "name": "7f95b8e0-5f88-4ba0-8404-82ed3ce90ed5"
        },
        {
            "id": "3cebe682-a820-4b47-a267-f124dcde0941",
            "type": "application/vnd.adobe.font+json",
            "relationship": "primary",
            "is_full_size": false,
            "is_external_link": false,
            "is_preferred_thumbnail": false,
            "is_component": false,
            "is_external_link": false,
            "library#isExternalLink": false,
            "font#data": {
                "foundry": "The FooBaz Corporation",
                "postScriptName": "TimesNewRomanPS-BoldMT",
                "name": "Times New Roman Bold",
                "style": "Bold",
                "family": "Times New Roman",
                "typekitFontId": "some_meaningful_uuid"
            }
        }
    ],
    "assetSubType": "element",
    "_fc": true,
    "_links": {
        "http://ns.adobe.com/melville/rel/primary": {
            "href": "/api/v1/libraries/urn:aaid:sc:us:efb1969b-fed5-4381-836e-6d7a97a14fbf/elements/9e46e07f-f9c1-4380-b199-754c1f6ffb9c",
            "rel": "http://ns.adobe.com/melville/rel/primary",
            "type": "application/json",
            "templated": false
        },
        "http://ns.adobe.com/melville/rel/path": {
            "href": "/api/v1/libraries/urn:aaid:sc:us:efb1969b-fed5-4381-836e-6d7a97a14fbf/elements/9e46e07f-f9c1-4380-b199-754c1f6ffb9c",
            "rel": "http://ns.adobe.com/melville/rel/path",
            "type": "application/json",
            "templated": false
        },
        "http://ns.adobe.com/melville/rel/id": {
            "href": "/api/v1/libraries/urn:aaid:sc:us:efb1969b-fed5-4381-836e-6d7a97a14fbf/elements/9e46e07f-f9c1-4380-b199-754c1f6ffb9c",
            "rel": "http://ns.adobe.com/melville/rel/id",
            "type": "application/json",
            "templated": false
        },
        "http://ns.adobe.com/melville/rel/describedBy": {
            "href": "/api/v1/libraries/urn:aaid:sc:us:efb1969b-fed5-4381-836e-6d7a97a14fbf/elements/9e46e07f-f9c1-4380-b199-754c1f6ffb9c",
            "rel": "http://ns.adobe.com/melville/rel/describedBy",
            "type": "application/json",
            "templated": false
        },
        "http://ns.adobe.com/melville/rel/rendition": {
            "href": "https://cc-api-storage-stage.adobe.io/assets/adobe-libraries/4dc522a7-af3d-4274-986c-bb1f59bb20d0/22fd8c85-eb35-47bc-aa0d-379497e7414e/:rendition{;size}",
            "rel": "http://ns.adobe.com/melville/rel/rendition",
            "templated": true
        },
        "http://ns.adobe.com/melville/rel/representations": {
            "href": "/api/v1/libraries/urn:aaid:sc:us:efb1969b-fed5-4381-836e-6d7a97a14fbf/elements/9e46e07f-f9c1-4380-b199-754c1f6ffb9c?selector=representations",
            "rel": "http://ns.adobe.com/melville/rel/representations",
            "type": "application/json",
            "templated": false
        }
    },
    "parent_id": "urn:aaid:sc:us:efb1969b-fed5-4381-836e-6d7a97a14fbf",
    "details": {
        "created": {
            "userId": "35305C3E5E861DB40A494026@AdobeID",
            "deviceId": "MY_COOL_DEVICE_ID",
            "device": "MY_COOL_DEVICE",
            "app": "MY_COOL_APP"
        },
        "lastModified": {
            "userId": "35305C3E5E861DB40A494026@AdobeID",
            "deviceId": "MY_COOL_DEVICE_ID",
            "device": "MY_COOL_DEVICE",
            "app": "MY_COOL_APP",
            "time": 1590014039432
        }
    }
}
```

#### Multipart Uploads

Uploading an asset that is 5mb or greater requires a different usage pattern than the above. In this case,
we will: (1) initiate an upload, (2) split the asset into chunks, (3) upload each chunk separately,
(4) finalize the upload, and lastly, (5) create the new element.

... coming soon ...
