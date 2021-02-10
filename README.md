# auth ![Node tests](https://github.com/compiler-explorer/auth/workflows/Node%20tests/badge.svg)
Authentication server for Compiler Explorer public instance

Currently building as a docker image, for convenience. We may wish
to use the "normal" Compiler Explorer node setup.

Running on the admin node currently; which means it will have whatever
the instance has as AWS credentials.

Need to consider:

* logging
* security (don't run on the admin node)
* caching or removal therein on cloudfront
* webpack / typescript for the client side?
* client-side testing
* better deployment (docker running on admin node which is not ideal)

**PLEASE NOTE THAT ANYTHING CHECKED IN HERE GETS DEPLOYED**

On the admin node there's a `./restart-auth.sh` script which will pull down the latest auth docker file.

## To run locally

Create a `.env` file with `KEY=VALUE` pairs, including:

```
EXPRESS_SECRET=some-made-up-secret-of-your-own
GOOGLE_CLIENT_ID=YOURCLIENTIDHERE
GOOGLE_CLIENT_SECRET=YOURSECRETHERE
```

To use the Compiler Explorer google IDs, currently those are on the admin node.
If you're an admin, you can find them pretty easily, or ask Matt. These values
are for a "Compiler Explorer Beta" token, not a "real" one.

Then run `npm install` and then `npm start`, which will launch an auto-updating
server on port 3000.