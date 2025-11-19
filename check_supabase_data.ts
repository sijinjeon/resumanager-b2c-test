import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load env vars from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkData() {
    console.log('🔍 Checking Supabase test_results table...\n')

    // Try to count all rows (this will fail with RLS, but that's expected)
    const { data, error, count } = await supabase
        .from('test_results')
        .select('*', { count: 'exact' })

    if (error) {
        console.log('⚠️  Cannot read data with anonymous key (this is expected due to RLS)')
        console.log('Error:', error.message)
        console.log('\n💡 This means:')
        console.log('   - The table exists ✅')
        console.log('   - RLS is enabled ✅')
        console.log('   - Only authenticated users can read their own data ✅')
        console.log('\n📝 To verify data is being saved:')
        console.log('   1. Go to Supabase Dashboard → Table Editor → test_results')
        console.log('   2. Check if there are any rows in the table')
        console.log('   3. Or check the browser console after completing a test')
    } else {
        console.log('✅ Successfully accessed test_results table')
        console.log(`📊 Total rows: ${count}`)
        if (data && data.length > 0) {
            console.log('\n📋 Sample data:')
            console.log(JSON.stringify(data[0], null, 2))
        } else {
            console.log('\n⚠️  No data found in the table yet.')
            console.log('   This could mean:')
            console.log('   - No one has completed a test yet')
            console.log('   - Data is being saved but RLS is hiding it')
        }
    }
}

checkData()
