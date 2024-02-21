/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qvoebrju9a5odef",
    "created": "2024-02-21 04:49:09.813Z",
    "updated": "2024-02-21 04:49:09.813Z",
    "name": "patient",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cmjd2vwe",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_ZVZohX3` ON `patient` (`id`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qvoebrju9a5odef");

  return dao.deleteCollection(collection);
})
