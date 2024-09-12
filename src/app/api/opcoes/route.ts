import clientPromise from "../../lib/mongodb";

async function requestHandler(_request: Request): Promise<Response> {
    const client = await clientPromise;
        const db = client.db("opcoes");
        const opcoes = await db
            .collection("opcoes")
            .find({})
            .limit(100)
            .toArray();

    return Response.json(opcoes);
}
  
export { requestHandler as GET };