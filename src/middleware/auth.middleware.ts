import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

// Inicializa Firebase Admin SDK (esto debería hacerse una sola vez en el proyecto)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(), // o usa `admin.credential.cert(...)` si tienes un archivo JSON
    });
}

export const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        (req as any).user = decodedToken; // Adjunta la info del usuario a la solicitud
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
};
