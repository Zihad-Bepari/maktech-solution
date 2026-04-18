import database from "../database/db.js";
import bcrypt from "bcrypt";

const seed = async () => {
  try {
    console.log("🌱 Seeding started...");

    // =========================
    // CREATE USERS
    // =========================
    const vendorUserIds = [];

    for (let i = 1; i <= 10; i++) {
      const hashedPassword = await bcrypt.hash("123456", 10);

      const role = i % 2 === 0 ? "Vendor" : "Customer";

      const userResult = await database.query(
        `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
        `,
        [
          role === "Vendor"
            ? `Vendor User ${i}`
            : `Customer User ${i}`,
          role === "Vendor"
            ? `vendor${i}@mail.com`
            : `customer${i}@mail.com`,
          hashedPassword,
          role,
        ]
      );

      // ✅ IMPORTANT FIX
      const userId = userResult.rows[0].id;

      // only vendors store
      if (role === "Vendor") {
        vendorUserIds.push(userId);
      }
    }

    console.log("✅ Users created");

    // =========================
    // VENDOR PROFILES
    // =========================
    const vendorIds = [];

    for (let i = 0; i < vendorUserIds.length; i++) {
      const vendorResult = await database.query(
        `
        INSERT INTO vendor_profiles (
          user_id,
          farm_name,
          farm_location,
          certification_status
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id;
        `,
        [
          vendorUserIds[i],
          `Farm ${i + 1}`,
          "Bangladesh",
          "Approved",
        ]
      );

      vendorIds.push(vendorResult.rows[0].id);
    }

    console.log("✅ Vendor profiles created");

    // =========================
    // PRODUCTS (100 ITEMS)
    // =========================
    for (let i = 1; i <= 100; i++) {
      const randomVendor =
        vendorIds[Math.floor(Math.random() * vendorIds.length)];

      await database.query(
        `
        INSERT INTO produce (
          vendor_id,
          name,
          description,
          price,
          category,
          certification_status,
          available_quantity
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        `,
        [
          randomVendor,
          `Product ${i}`,
          `Fresh organic product ${i}`,
          (Math.random() * 100 + 10).toFixed(2),
          "General",
          "Approved",
          Math.floor(Math.random() * 50 + 1),
        ]
      );
    }

    console.log("✅ 100 Products inserted");

    console.log("🎉 Seeding completed successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seed();