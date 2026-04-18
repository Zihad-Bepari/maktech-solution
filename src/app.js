import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { createTables } from './utils/createTable.js';
import routes from './routes/index.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import fileUpload from 'express-fileupload';

dotenv.config({path: "./.env"});
const app = express();

app.use(cors({
    odigin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
  tempFileDir: "./upload",
  useTempFiles: true
}))

createTables();
routes(app);
app.use(errorMiddleware)
export default app;