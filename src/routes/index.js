import authRoutes from '../modules/auth/auth.routes.js';
import userRoutes from '../modules/user/user.route.js';
import vendorRoutes from '../modules/vendor/vendor.route.js';
import adminRoutes from '../modules/admin/admin.route.js';
import produceRoutes from '../modules/produce/produce.route.js';
import orderRoutes from '../modules/order/order.route.js';
import marketplaceRoutes from '../modules/marketplace/marketplace.route.js';
import trackingRoutes from '../modules/tracking/orderTracking.route.js';
import com from '../modules/community/community.route.js';
import rentalSpaceRoutes from '../modules/Rental_spaces/rentalSpace.route.js';
import bookingRoutes from '../modules/Farm_booking/booking.route.js';
import certificationRoutes from '../modules/certification/certification.route.js';

const routes = (app) => {
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/vendor", vendorRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/produce", produceRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/marketplace", marketplaceRoutes);
    app.use("/api/tracking", trackingRoutes);
    app.use("/api/community", com);
    app.use("/api/rental-spaces", rentalSpaceRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/certifications", certificationRoutes);
}   

export default routes;