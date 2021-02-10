export interface AppConfig {
    ExpressSecret: string;
    LocalPort: number;
    ExternalPort: number;
    ServerHostname: string;
    ServerScheme: string;
    GoogleClientId: string;
    GoogleClientSecret: string;
}

export function configFromEnv(): AppConfig {
    return {
        ExpressSecret: process.env.EXPRESS_SECRET,
        LocalPort: +(process.env.PORT || 3000),
        ExternalPort: +(process.env.EXTERNAL_PORT || process.env.PORT || 3000),
        ServerHostname: process.env.SERVER_HOSTNAME || 'localhost',
        ServerScheme: process.env.SERVER_SCHEME || 'http',
        GoogleClientId: process.env.GOOGLE_CLIENT_ID,
        GoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
}

export function fakeConfig(): AppConfig {
    return {
        ExpressSecret: "Some express secret",
        LocalPort: 3000,
        ExternalPort: 3000,
        ServerHostname: 'localhost',
        ServerScheme: 'http',
        GoogleClientId: "Google client ID",
        GoogleClientSecret: "Google client secret"
    }
}