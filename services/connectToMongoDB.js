export default async function connectToMongoDB(mg) {
  try {
    await mg.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("MongoDB Connection error:", error);
  }
}
