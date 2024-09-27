import clientPromise from "../../../lib/mongodb";

async function requestHandler(_request: Request): Promise<Response> {
    const { searchParams } = new URL(_request.url);
    const ticker = searchParams.get('ticker');
    if (!ticker) return new Response('Ticker is required', { status: 400 });
    
    const client = await clientPromise;
    const db = client.db("opcoes");

    const pipeline = [
        // { $match: { Ticker: ticker } }, // Filter by Ticker
        { $group: {
            _id: {
                vencimento: "$Vencimento", // Group by Vencimento
                strike: "$Strike"          // Group by Strike
            },
            data: { $push: "$$ROOT" } // Collect the entire document into an array
        }},
        { $project: {
            _id: 0, // Exclude the _id field
            data: 1 // Keep the data field
        }},
        { $limit: 20 } // Limit results if needed
    ];

    const opcoes = await db
        .collection("opcoes")
        .aggregate(pipeline)
        .toArray();

    return Response.json(opcoes);
}
  
export { requestHandler as GET };