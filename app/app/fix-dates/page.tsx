import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function FixDatesPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const updates = [
    ['Slow Days in Spiti', '2027-06-12', '2027-06-21'],
    ['The Backwater Quiet', '2027-07-04', '2027-07-10'],
    ['Ladakh, Without the Rush', '2027-08-15', '2027-08-26'],
    ['Coastal Karnataka Hush', '2027-09-05', '2027-09-11'],
  ];

  let successCount = 0;
  const errors = [];

  for (const [name, start_date, end_date] of updates) {
    const { error } = await supabase
      .from('trips')
      .update({ start_date, end_date })
      .eq('name', name);
    
    if (error) {
      errors.push(`${name}: ${error.message}`);
    } else {
      successCount++;
    }
  }

  return (
    <div className="p-10 max-w-2xl mx-auto mt-20 bg-white rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Database Date Fixer</h1>
      <p className="text-gray-600 mb-6">Attempted to update trips to 2027 dates.</p>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="font-semibold text-green-700">Successfully updated: {successCount} trips</p>
        {errors.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold text-red-700">Errors:</p>
            <ul className="list-disc list-inside text-red-600 text-sm mt-2">
              {errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )}
      </div>

      <a href="/" className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-800">
        Return to Homepage
      </a>
    </div>
  );
}
