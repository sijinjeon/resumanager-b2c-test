
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load env vars from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function diagnose() {
    console.log('Diagnosing Supabase connection...')

    // 1. Check if we can connect at all (e.g. list tables or just select from a known table)
    // Since we can't list tables with anon key, we try to select from 'test_results'

    console.log("Attempting to select from 'test_results'...")
    const { data, error } = await supabase
        .from('test_results')
        .select('count')
        .limit(1)

    if (error) {
        console.error('Error accessing test_results table:', error)
        if (error.code === '42P01') {
            console.log('\nCONCLUSION: The table "test_results" does NOT exist.')
        } else if (error.code === '42501') {
            console.log('\nCONCLUSION: The table exists, but RLS policy is blocking access (which is expected for anon).')
            console.log('This means the table likely exists, but we need to verify if the INSERT policy is correct for authenticated users.')
        } else {
            console.log('\nCONCLUSION: Unknown error.')
        }
    } else {
        console.log('Successfully accessed test_results table.')
        console.log('\nCONCLUSION: The table exists and is accessible.')
    }
}

diagnose()
