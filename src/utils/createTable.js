import { createUserTable } from "../models/userTable.js";
import { createUserSettingsTable } from "../models/userSettingsTable.js";
import { createCertificationTable } from "../models/certificationsTable.js";
import { createCommunityPostTable } from "../models/community_postsTable.js";
import { createBookingTable } from "../models/farm_bookingsTable.js";
import { createNotificationTable } from "../models/notificationsTable.js";
import { createOrderTable } from "../models/ordersTable.js";
import { createPlantTable } from "../models/plantsTable.js";
import { createProduceTable } from "../models/produceTable.js";
import { createRentalSpaceTable } from "../models/rental_spacesTable.js";
import { createVendorTable } from "../models/vendor_profilesTable.js";

export const createTables = async () => {
    try {
         await createUserTable();
        await createUserSettingsTable();
        await createVendorTable();

        await createRentalSpaceTable();
        await createProduceTable();
        await createPlantTable();
        await createCommunityPostTable();
        await createNotificationTable();

        await createBookingTable();
        await createOrderTable();
        await createCertificationTable();
        console.log("All tables created successfully.");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
};