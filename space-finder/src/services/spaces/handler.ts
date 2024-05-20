import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpaces } from "./UpdateSpace";
import { deleteSpaces } from "./DeleteSpace";
import { JsonError, MissingFieldError } from "../shared/validator";
import { addCrosHeader } from "../shared/Util";

const ddbClient = new DynamoDBClient({})

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
 
    let response: APIGatewayProxyResult

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = await getSpaces(event, ddbClient);
                response = getResponse  
                break;
            case 'POST':
                const postResponse = await postSpaces(event, ddbClient);
                response = postResponse  
                break;
            case 'PUT':
                const putResponse = await updateSpaces(event, ddbClient);
                response = putResponse  
                break;
            case 'DELETE':
                const deleteResponse = await deleteSpaces(event, ddbClient);
                response = deleteResponse  
                break;
            default:
                break;
        }
    } catch (error) {
        if (error instanceof MissingFieldError) {
            return {
                statusCode: 400,
                body: JSON.stringify(error.message)
            }
        }
        if (error instanceof JsonError) {
            return {
                statusCode: 400,
                body: JSON.stringify(error.message)
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
    }
    addCrosHeader(response);
    return response;
}

export { handler }