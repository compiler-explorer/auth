import {initialiseApp} from "./app";
import {configFromEnv} from "./config";

const config = configFromEnv();
const app = initialiseApp(config);

app.listen(app.get('port'), () => {
    console.log(`Auth server running at ${config.ServerScheme}://${config.ServerHostname}:${config.Port} in ${app.get('env')} mode`);
});
