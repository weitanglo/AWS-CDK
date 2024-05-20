import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "ap-northeast-1";
process.env.TABLE_NAME = "SpaceTable-0e246cbcc5b9";

handler({
    httpMethod: 'POST',
    body: JSON.stringify({
        location: 'London2',
        name:'A'
    })
} as any, {} as any).then(result =>{
    console.log(result)
});


// handler({
//     httpMethod: 'DELETE',
//     queryStringParameters: {
//         id: '260088cd-ewiie-3e33-3jdf'
//     },
// } as any, {} as any);

// handler({
//     httpMethod: 'PUT',
//     queryStringParameters: {
//         id: '260088cd-ewiie-3e33-3jdf'
//     },
//     body: JSON.stringify({
//         location: 'London2'
//     })
// } as any, {} as any);