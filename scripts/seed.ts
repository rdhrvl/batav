import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  const dataPath = path.join(process.cwd(), 'data', 'Menu_Batapav.json');
  if (!fs.existsSync(dataPath)) {
    console.error(`File not found: ${dataPath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(dataPath, 'utf8');
  const items = JSON.parse(rawData);

  console.log(`Found ${items.length} items to insert.`);

  // Clean existing rows first to avoid duplicates
  const { error: deleteError } = await supabase
    .from('menu_items')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.error('Error clearing menu_items:', deleteError);
    process.exit(1);
  }

  // Insert items in bulk
  const { data, error } = await supabase
    .from('menu_items')
    .insert(items)
    .select();

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log(`Seed completed successfully! Inserted ${data.length} items.`);
  }
}

seed();
