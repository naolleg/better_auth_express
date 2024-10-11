
import express from 'express';
import { createAuthClient } from 'better-auth/client';
import { auth } from '../utils/auth.js';


const clientOptions = {
  baseURL: 'http://localhost:7777/api/auth',
};

const client = createAuthClient(clientOptions);

const router = express.Router();
router.post('/signup', async (req, res) => {
  try {
    const data = await client.signUp.email({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const data = await client.signIn.email({
      email: req.body.email,
      password: req.body.password,
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/forget-password', async (req, res) => {
  try {
    const data = await client.forgetPassword({
      email: req.body.email,
      redirectTo: '/reset-password',
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const data = await client.resetPassword({
      newPassword: req.body.newPassword,
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;