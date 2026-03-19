declare const _default: () => {
    app: {
        port: number;
        nodeEnv: any;
        frontendUrl: any;
    };
    database: {
        url: any;
    };
    jwt: {
        accessSecret: any;
        refreshSecret: any;
        accessExpiry: any;
        refreshExpiry: any;
    };
    google: {
        clientId: any;
        clientSecret: any;
        callbackUrl: any;
    };
    redis: {
        url: any;
    };
    cloudinary: {
        cloudName: any;
        apiKey: any;
        apiSecret: any;
    };
    stripe: {
        secretKey: any;
        webhookSecret: any;
        platformFeePercent: number;
    };
    flutterwave: {
        secretKey: any;
        webhookHash: any;
    };
    firebase: {
        projectId: any;
        privateKey: any;
        clientEmail: any;
    };
    email: {
        user: any;
        password: any;
        from: any;
    };
    sentry: {
        dsn: any;
    };
};
export default _default;
