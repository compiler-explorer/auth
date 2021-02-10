import {initialiseApp} from "./app";
import {configFromEnv} from "./config";

const config = configFromEnv();
const app = initialiseApp(config);

app.listen(app.get('port'), () => {
    console.log(`Auth server running at ${app.get('externalUrl')} in ${app.get('env')} mode`);
});
