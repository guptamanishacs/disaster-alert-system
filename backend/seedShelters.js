const Shelter = require("./models/Shelter");

const seedShelters = async () => {
  try {
    const count = await Shelter.countDocuments();

    if (count === 0) {
      console.log("Seeding shelters data...");

      const shelters = [
        {
          name: "Mumbai Relief Camp",
          location: "Bandra",
          capacity: 200,
          contact: "9876543210",
        },
        {
          name: "Andheri Emergency Shelter",
          location: "Andheri",
          capacity: 150,
          contact: "9123456780",
        },
        {
          name: "Dadar Safe Zone",
          location: "Dadar",
          capacity: 100,
          contact: "9988776655",
        },
      ];

      await Shelter.insertMany(shelters);

      console.log("Shelters inserted successfully");
    } else {
      console.log("Shelters already exist");
    }
  } catch (error) {
    console.log("Seed error:", error);
  }
};

module.exports = seedShelters;