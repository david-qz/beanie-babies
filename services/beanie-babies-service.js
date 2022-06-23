const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const TABLE = 'beanie_babies';

export async function getBeanieBabies() {
    const response = await client
        .from(TABLE)
        .select(`
            id,
            title,
            image
        `);

    return response.data;
}

export async function getBeanieBaby(id) {
    const response = await client
        .from(TABLE)
        .select()
        .match({ id: id })
        .single();

    return response.data;
}
