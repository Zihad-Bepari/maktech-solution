import database from "../database/db.js";

export const createCertificationTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS sustainability_certs (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE RESTRICT,
        certifying_agency VARCHAR(150),
        certification_date DATE,
        status VARCHAR(20) DEFAULT 'Pending'
          CHECK (status IN ('Pending', 'Approved', 'Rejected'))
      );
    `;
    await database.query(query);
  } catch (error) {
    console.error("Cert table error:", error);
  }
};