import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type Repository = {  
  id?: number;
    full_name: string;
    description: string;
    url: string;
    language: string;
    forks_count: number;
    stars_count: number;
    open_issues_count: number;
    watchers_count: number;
    created_at: string;
    updated_at: string;
};

export const insertCommit = async (commitData: any) => {
    const { data, error } = await supabase
        .from('commits')
        .insert([commitData]);

    if (error) {
        throw error;
    }

    return data;
};

export const insertRepository = async (repoData: Repository) => {
    const { data, error } = await supabase
        .from('repositories')
        .upsert([repoData])
        .select(); 

    if (error) {
        throw error;
    }

    return data as Repository[];  
};
