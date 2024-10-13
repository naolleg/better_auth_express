var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { createAuthClient } from 'better-auth/client';
import csrf from 'csurf';
const csrfProtection = csrf({ cookie: true });
const clientOptions = {
    baseURL: 'http://localhost:7777/api/auth',
    headers: {
        'XSRF-TOKEN': '', // Initialize the XSRF-TOKEN header
    },
};
const client = createAuthClient(clientOptions);
// Fetch the CSRF token before making any requests
fetch('http://localhost:7777/form')
    .then(response => response.json())
    .then(data => {
    clientOptions.headers['XSRF-TOKEN'] = data.csrfToken;
})
    .catch(error => console.error(error));
const router = express.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const csrfTokenFromCookie = req.cookies['XSRF-TOKEN'];
        console.log('CSRF token from cookie:', csrfTokenFromCookie); // Add this line
        const csrfTokenFromBody = req.body._csrf;
        console.log('CSRF token from request body:', csrfTokenFromBody); // Add this line
        if (!csrfTokenFromCookie || csrfTokenFromCookie !== csrfTokenFromBody) {
            console.log('CSRF token mismatch!'); // Add this line
            return res.status(403).json({ error: 'Invalid CSRF token' });
        }
        // ...
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield client.signIn.email({
            email: req.body.email,
            password: req.body.password,
        });
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.post('/forget-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield client.forgetPassword({
            email: req.body.email,
            redirectTo: '/reset-password',
        });
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.post('/reset-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield client.resetPassword({
            newPassword: req.body.newPassword,
        });
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
export default router;
