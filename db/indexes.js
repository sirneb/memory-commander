// Setup indexes
dbClient.then(function(db) {
  db.collection('training_sessions').createIndex({ userId: 1, createdAt: -1 });
})
