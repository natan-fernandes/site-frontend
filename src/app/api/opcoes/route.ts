import clientPromise from "../../lib/mongodb";

async function requestHandler(_request: Request): Promise<Response> {
    const { searchParams } = new URL(_request.url);
    const acao = searchParams.get('acao');
    if (!acao) return new Response('Acao is required', { status: 400 });

    const vencimento = searchParams.get('vencimento');
    if (!vencimento) return new Response('Vencimento is required', { status: 400 });

    const pipeline = [
        { $match: { Acao: acao,
             Vencimento: '14/11/2024'
             } }
    ];

    const client = await clientPromise;
    const db = client.db("opcoes");
    const opcoes = await db
        .collection("opcoes")
        .aggregate(pipeline)
        .toArray();

    console.log(opcoes.map(x => x['Vol. Financeiro']))


    return Response.json(opcoes);
}
  
export { requestHandler as GET };