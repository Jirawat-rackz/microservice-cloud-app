/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vq7qli6jcderim6")

  collection.name = "words"
  collection.indexes = [
    "CREATE INDEX `_vq7qli6jcderim6_created_idx` ON `words` (`created`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vq7qli6jcderim6")

  collection.name = "dashboard"
  collection.indexes = [
    "CREATE INDEX `_vq7qli6jcderim6_created_idx` ON `dashboard` (`created`)"
  ]

  return dao.saveCollection(collection)
})
