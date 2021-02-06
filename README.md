# auth ![Node tests](https://github.com/compiler-explorer/auth/workflows/Node%20tests/badge.svg)
Authentication server for Compiler Explorer public instance

Currently building as a docker image, for convenience. We may wish
to use the "normal" Compiler Explorer node setup.

Running on the admin node currently; which means it will have whatever
the instance has as AWS credentials.

Need to consider:

* logging
* security (don't run on the admin node)

**PLEASE NOTE THAT ANYTHING CHECKED IN HERE GETS DEPLOYED**

On the admin node there's a `./restart-auth.sh` script which will pull down the latest auth docker file.
