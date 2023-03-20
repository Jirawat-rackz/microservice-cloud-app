migrate((db) => {
  const collection = new Collection({
    "id": "tgfe5n1ifpupncv",
    "created": "2023-03-19 16:33:54.276Z",
    "updated": "2023-03-19 16:33:54.276Z",
    "name": "core",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2kmsrg6p",
        "name": "core",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\"",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.id != \"\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tgfe5n1ifpupncv");

  return dao.deleteCollection(collection);
})
