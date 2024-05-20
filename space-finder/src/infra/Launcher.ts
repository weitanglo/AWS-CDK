import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";
import { UiDeploymentStack } from "./stacks/UideploymentStack";

const app = new App();
const dataStack = new DataStack(app, 'Datastack');
const lambdaStacK = new LambdaStack(app, 'LambdaStack', {
    spacesTable: dataStack.spacesTable
});
const authStack = new AuthStack(app, 'AuthStack');
new ApiStack(app, 'ApiStack', {
    spacesLambdaIntegration: lambdaStacK.spacesLambdaIntegration,
    userPool: authStack.userPool
});

new UiDeploymentStack(app, 'UiDeploymentStack');

