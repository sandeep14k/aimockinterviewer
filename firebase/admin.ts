import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID || "mock-interview-c603f",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-fbsvc@mock-interview-c603f.iam.gserviceaccount.com",
        // Replace newlines in the private key
        privateKey: process.env.FIREBASE_PRIVATE_KEY || "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCkDWdE8bply3KQ\ndDRSGZgK72C5IA9eahQ8+rDbHpFS2FxVgkLNXvkveXorYM9iTHh2Xg20D5+3P6mT\nZqWb1SnQGpeR//uQwfjM3FzqT1oucYb2lv59zOwJa5BHHa9gvbyTWCyiBi9RJp88\n3vMw3eIu2UjvjNtB8mP/0MkEnvBAIKZoEEfh8bGva34/zwq8/Uhi6b+7cVTiiLEr\nKF7ikO7kqm/KNnz9sXwT57C5ASl2uDpkt1CDVT3HiJ+GHMx0B76VtD94ixDObGNl\nNHxdZ841kYMHWZz/n96XHiZJ+2/WIorENSch0rlQKt08NZX8Kl8u5hb8/FlUen8S\nBoy+CAfxAgMBAAECggEADP2/Zk8gMYHNcOa1jU+CjKciiTZ35m75wE8ijzpEoYNf\nDdRywXxaY6nihKngx7TXkJlny2ZgrFcfG3xJnrq1hMnTo+0EuRTAmknUan0IiVyr\nJpQ+01aAK0ojKEaPsKuwfG3t8ZISJYKB91o5IZmzQ34oekk0xGxTV/BAOEdKg5a8\nV/SfVyk4SzQBDqC5Bd3EZAmHeoCkEffdYE9b6CJjbwnHn4BNJjLjw783FNh2JPDe\nSiQ/3AMTy4Ql6D8Gxy1C56nmrpgsueoBfaRjWbIXWFgMAdloK2oqIP+1kjFpJtah\nXWgHl8AOEYatNaz9t2RfMHqscXDN7k2QmLgltoCHswKBgQDj7um2c+lR9pGveG6f\n+D3L/1/EpqUc3ywaZcpqiqCSEcxGZwv+dhSlx0/9dIUN4MVAfdvpl9pDiaHaCwj1\nw4uQASS0i6cW8Gnk0PLNTgE/s1WclSas0aLdHy/rcQAY/Kb00LNArxNV6tPxa8K1\neZrzBDBcSBtFfoHW36Z590rvTwKBgQC4QMmrm8wS2XMalpYggIW6PQS0w4Rcpk8h\nWvkaPls+Ol7U+52PGopAMq4rRxKF+yr+B0E/CLwKmO3teVJJIotJ2o6v41pQCZhn\nj4kNbV0VdoQQpHWceNFQ7TKT1rSWR79/0WLsON8MgIG5vOv0uTXfiLnga3fWA+t5\npH1vQenEvwKBgH9VhPMMphfH63NfkE2F3OAN9m5hunP6qSTGIOKMN0/i6X+bKbQq\nOzaxthod8gbivs9cgHJrBuAcD3NEHulNKLZ2LQ8/xUSnYkEWCc5v+XqgsP8cw9Jf\n+uAVACxDoI5U9uBlhv5n0CF7YpPIY6oGGW4RtQKYtcOI/PgRUWtpn085AoGAOWMU\nbPqtaQGJNDLKt3zQKd1vZc2voBu8casgAuiBCrSrbLKhtDyT6sLeNGSChHBiR5SC\n4dsalkJjeJ9c3aKAt5P29Rleu6cBbN/r097IKzMqlvRiHUYUC5yVMC6jOFtIbcsN\ngH2GGyK7RNpus14sRV8UZa2TOXknElAFMW3aHYkCgYAHeYbLQH9JDSvUwZQ7zFg4\n3gd5zPrUoXjGtV9ZyUdbf6DgzTgsMK4QGlvFxda+ng/YrjChyvK6J7EsLwpABHqX\nXehNnSjolNtsgQo1uKOhQ3XFOf2nErGLXmTtRcVtHNZUOFgk5heY8tmtNEuz/dPA\nYXc1M9E4FMwY4hjA0iQicg==\n-----END PRIVATE KEY-----\n",
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

export const { auth, db } = initFirebaseAdmin();
