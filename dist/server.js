import express from 'express';
import cors from 'cors';
import { PORT } from './src/config/secrete.js';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/utils/auth.js";
import router from './src/routes/route.js';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
const app = express();
// Parse cookies
app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:7777",
    credentials: true,
}));
// Setup session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));
// Apply CSRF protection middleware globally
app.use(csrfProtection);
// CSRF token endpoint
app.get('/form', csrfProtection, function (req, res) {
    console.log('Inside /form route');
    const csrfToken = req.csrfToken();
    console.log('CSRF token generated:', csrfToken);
    res.cookie('XSRF-TOKEN', csrfToken, { secure: true, httpOnly: true });
    console.log('CSRF token stored in cookie:', req.cookies['XSRF-TOKEN']);
    res.send({ csrfToken });
});
app.use('/api/auth', parseForm, router);
// Auth middleware for all API routes
app.all("/api/auth/*", (req, res, next) => {
    console.log('toNodeHandler middleware called');
    toNodeHandler(auth)(req, res);
});
// Root endpoint
app.get('/', (req, res) => {
    return res.send('Server is working');
});
// Start the server
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));
