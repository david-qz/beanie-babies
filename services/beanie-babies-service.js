const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const TABLE = 'beanie_babies';

export async function getBeanieBabies(nameQuery, astroSign, { start, end }) {
    const query = client
        .from(TABLE)
        .select(`
            id,
            title,
            image
        `, { count: 'exact' });

    if (nameQuery) query.ilike('title', `%${nameQuery}%`);
    if (astroSign) query.ilike('astroSign', astroSign);

    query.range(start, end - 1);

    const response = await query;
    return [response.data, response.count];
}

export async function getBeanieBaby(id) {
    const response = await client
        .from(TABLE)
        .select()
        .match({ id: id })
        .single();

    return response.data;
}
