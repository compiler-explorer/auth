export interface AppConfig {
    ExpressSecret: string;
    Port: number;
    ServerHostname: string;
    ServerScheme: string;
    GoogleClientId: string;
    GoogleClientSecret: string;
}

export function configFromEnv(): AppConfig {
    return {
        ExpressSecret: process.env.EXPRESS_SECRET,
        Port: +(process.env.PORT || 3000),
        ServerHostname: process.env.SERVER_HOSTNAME || 'localhost',
        ServerScheme: process.env.SERVER_SCHEME || 'http',
        GoogleClientId: process.env.GOOGLE_CLIENT_ID,
        GoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
}

export function fakeConfig(): AppConfig {
    return {
        ExpressSecret: "Some express secret",
        Port: 3000,
        ServerHostname: 'localhost',
        ServerScheme: 'http',
        GoogleClientId: "Google client ID",
        GoogleClientSecret: "Google client secret"
    }
}