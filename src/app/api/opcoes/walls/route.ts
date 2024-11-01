import clientPromise from "../../../lib/mongodb";

async function requestHandler(_request: Request): Promise<Response> {
    const { searchParams } = new URL(_request.url);
    const vencimento = searchParams.get('vencimento');
    if (!vencimento) return new Response('Vencimento is required', { status: 400 });
    
    const strike = searchParams.get('strike');
    if (!strike) return new Response('Strike is required', { status: 400 });

    const client = await clientPromise;
    const db = client.db("opcoes");

    const pipeline = [
        { $match: { Vencimento: vencimento, Strike: Number(strike) } },
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
    ];

    const opcoes = await db
        .collection("opcoes")
        .aggregate(pipeline)
        .toArray();

    return Response.json(opcoes);
}
  
export { requestHandler as GET };