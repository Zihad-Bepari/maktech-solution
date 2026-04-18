import db from "../../database/db.js";

// CREATE
export const createCertificationservice = async (vendorId, body) => {
  const { certifying_agency, certification_date } = body;

  const result = await db.query(
    `INSERT INTO sustainability_certs
     (vendor_id, certifying_agency, certification_date, status)
     VALUES ($1,$2,$3,'Pending')
     RETURNING *`,
    [vendorId, certifying_agency, certification_date]
  );

  return result.rows[0];
};

// GET MY CERTIFICATIONS
export const getMyCertificationsservice = async (vendorId) => {
  const result = await db.query(
    `SELECT * FROM sustainability_certs
     WHERE vendor_id=$1
     ORDER BY certification_date DESC`,
    [vendorId]
  );

  return result.rows;
};

// UPDATE STATUS (admin)
export const updateCertificationStatusservice = async (id, user, status) => {
  const allowed = ["Pending", "Approved", "Rejected"];

  if (!allowed.includes(status)) {
    throw new Error("Invalid status");
  }

  if (user.role !== "Admin") {
    throw new Error("Not authorized");
  }

  const result = await db.query(
    `UPDATE sustainability_certs
     SET status=$1
     WHERE id=$2
     RETURNING *`,
    [status, id]
  );

  if (!result.rows.length) {
    throw new Error("Certification not found");
  }

  return result.rows[0];
};