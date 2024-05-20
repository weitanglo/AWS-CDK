import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./AuthService";

async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login(
        {
            username: 'weitang',
            password: '.W7W1yTrj!'
        }
    )
    // console.log(loginResult);
    const credentials = await service.generateTemporaryCredentials(loginResult);
    // console.log(credentials);
    const buckets = await listBuckets(credentials);
    console.log(buckets);
}

async function listBuckets(credentials: any) {
    const client = new S3Client({
        credentials: credentials
    });
    const command = new ListBucketsCommand({});
    const result = await client.send(command);
    return result;
}

testAuth();