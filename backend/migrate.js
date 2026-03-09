/**
 * migrate.js
 * Exports all collections from local MongoDB → imports into MongoDB Atlas
 * Run once: node migrate.js
 */

const mongoose = require("mongoose");

const LOCAL_URI = "mongodb://127.0.0.1:27017/disasterDB";
const ATLAS_URI = process.env.MONGO_URI;

if (!ATLAS_URI) {
  console.error("❌ MONGO_URI not set. Run: $env:MONGO_URI='your-atlas-uri' then retry.");
  process.exit(1);
}

async function migrate() {
  console.log("🔌 Connecting to LOCAL MongoDB...");
  const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();

  console.log("🔌 Connecting to ATLAS MongoDB...");
  const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();

  const collections = await localConn.db.listCollections().toArray();
  console.log(`\n📦 Found ${collections.length} collections: ${collections.map(c => c.name).join(", ")}\n`);

  for (const col of collections) {
    const name = col.name;
    const docs = await localConn.db.collection(name).find({}).toArray();

    if (docs.length === 0) {
      console.log(`⚠️  ${name}: empty, skipping`);
      continue;
    }

    // Drop existing data in Atlas for clean migration
    await atlasConn.db.collection(name).deleteMany({});

    // Insert in batches of 500
    const batchSize = 500;
    for (let i = 0; i < docs.length; i += batchSize) {
      const batch = docs.slice(i, i + batchSize);
      await atlasConn.db.collection(name).insertMany(batch, { ordered: false });
    }

    console.log(`✅ ${name}: migrated ${docs.length} documents`);
  }

  await localConn.close();
  await atlasConn.close();
  console.log("\n🎉 Migration complete! All data is now in MongoDB Atlas.");
}

migrate().catch(err => {
  console.error("❌ Migration failed:", err.message);
  process.exit(1);
});
