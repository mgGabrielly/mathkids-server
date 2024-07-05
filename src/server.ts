import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import modulesRoutes from './routes/modulesRoutes';
import resetPasswordRoutes from './routes/resetPasswordRoutes';
import authRoutes from './routes/authRoutes';
import activityRoutes from './routes/activityRoutes';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocs from './swagger.json';

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Helmet to configure security headers
app.use(helmet());
// Allow all origins (development only)
app.use(cors());

// // Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use(userRoutes);
app.use(modulesRoutes);
app.use(authRoutes);
app.use(activityRoutes);
app.use(resetPasswordRoutes);

app.get('/', (req, res) => {
    res.send('Hello guys!');
});

// Default response to other requests
app.use((req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.status(200).send({
      message: "Connected"
    });
});

// Listen to the App
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;