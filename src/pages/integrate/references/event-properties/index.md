# I/O Events Properties

<br/>

This page describes the properties of Creative Cloud Libraries events. For direction on subscribing to these events, see [Configuring Webhooks for Created Cloud Libraries Events](/integrate/guides/configuring-events-webhooks/).

<InlineAlert variant="info" slots="text"/>

To see a sample event, [visit our samples repo on GitHub](https://github.com/AdobeDocs/cc-libraries-api-samples/blob/main/sample-events/cc-library-created.json).

<br/>

**id** _string_

The generated unique ID of the event.

<br/>

---

<br/>

**source** _string_

The partition key, which, in the case of CC Libraries events, is the [Repository](/integrate/references/glossary/#repository) ID.

<br/>

---

<br/>

**specversion** _string_

<br/>

---

<br/>

**type** _string_

The type of event.

<br/>

---

<br/>

**datacontenttype** _string_

The content type of the `data` object.

<br/>

---

<br/>

**dataschema** _string_

The URN of the Events Schema.

<br/>

---

<br/>

**time** _string_

The timestamp of the event creation.

<br/>

---

<br/>

**xactionid** _string_

The request ID, which is used for debugging.

<br/>

---

<br/>

**recipient** _object_

The IMS user ID and application client ID of the recipient of the event.

<br/>

---

<br/>

recipient.**userid** _string_

The IMS user ID of the recipient of the event.

<br/>

---

<br/>

recipient.**clientid** _string_

The application client ID of the recipient of the event.

<br/>

---

<br/>

**dataschemaversion** _string_

The version of the Events Schema.

<br/>

---

<br/>

**data** _object_

The event object.

<br/>

---

 <br/>

data.**xdmEntity** _object_

The [XDM](/integrate/references/glossary/#xdm) Entity object, which contains a list of changed [Resources](/integrate/references/glossary/#resource) that represent the [Asset](/integrate/references/glossary/#asset) change.

<br/>

---

 <br/>

data.xdmEntity.**event:resources** _object_

An object containing all the Resource Change objects related to the event. [Resource](/integrate/references/glossary/#resource) changes are identified by the [link relation](/integrate/references/glossary/#link-relation.md) associated with the Resource.

- Note: There is always a Resource Change object for the Repository Metadata Resource, even if this Resource was not affected by the action that triggered the event. This is because the Repository Metadata Resource is required to be embedded in the event.

<br/>

---

<br/>

data.xdmEntity.event:resources.**&lt;link relation&gt;** _object_

The Resource Change object, which describes how a particular [Resource](/integrate/references/glossary/#resource) was affected by the action that triggered the event.

- Note: The property will be the [link relation](/integrate/references/glossary/#link-relation.md) associated with the Resource (e.g., ht<span>tp://ns.adobe.com.adobecloud/rel/metadata/repository</span>).

<br/>

---

<br/>

data.xdmEntity.event:resources.&lt;link relation&gt;.**event:action** _string_

Specifies the type of change to the [Resource](/integrate/references/glossary/#resource). Possible values are: `created`, `updated`, `deleted` and `none`. `none` is used, for example, to embed the Repository Metadata, when this Resource was not affected by the action that triggered the event.

<br/>

---

<br/>

data.xdmEntity.event:resources.&lt;link relation&gt;.**event:embedded** _object_

The embedded JSON representation of the [Resource](/integrate/references/glossary/#resource).

</details>

<br/>

---

<br/>

data.xdmEntity.event:resources.&lt;link relation&gt;.**event:sequence** _number_

A sequence number of the event that is unique within the current [Repository](/integrate/references/glossary/#repository). It is used to detect out-of-sequence events.

 <br/>

---

<br/>

data.xdmEntity.event:resources.&lt;link relation&gt;.**event:repository** _object_

Data about the [Repository](/integrate/references/glossary/#repository) of the [Asset](/integrate/references/glossary/#asset) affected by the event.

<br/>

---

<br/>

data.xdmEntity.event:resources.&lt;link relation&gt;.event:repository.**repo:owner** _object_

The ID and owner type of the [Repository](/integrate/references/glossary/#repository).

<br/>

---

<br/>

data.xdmEntity.event:resources.&lt;link relation&gt;.event:repository.repo:owner.**id** _string_

The ID of the [Repository](/integrate/references/glossary/#repository) owner (i.e., the IMS user ID or IMS org ID).

<br/>

---

data.xdmEntity.event:resources.&lt;link relation&gt;.event:repository.repo:owner.**type** _string_

The type of [Repository](/integrate/references/glossary/#repository) owner. Legal values are `user` (for a [User Repository](/integrate/references/glossary/#user-repository) owner) and `org` (for an [Organizational Repository](/integrate/references/glossary/#organizational-repository) owner).

<br/>

