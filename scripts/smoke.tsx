/**
 * Route smoke test.
 *
 * Renders every route to a string and asserts on the markup. This is not a
 * substitute for looking at the page in a browser, but it does catch the
 * failures that a type check cannot: undefined component imports, hook order
 * violations, crashes inside a page, and routes that silently render nothing.
 *
 * Run with: npm run smoke
 */
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../src/App';

interface Case {
  path: string;
  /** Substrings that must appear in the rendered markup. */
  expect: string[];
}

const CASES: Case[] = [
  { path: '/', expect: ['Priyanka Gautam', 'Featured release', 'Top genres', 'Skip to content'] },
  { path: '/playlist/experience', expect: ['1 yr 9 mo', '2 yrs 5 mo', 'Developer Analyst'] },
  { path: '/playlist/off-the-clock', expect: ['Off the Clock', 'Volleyball', 'Cardiac Arrest'] },
  { path: '/playlist/learning', expect: ['Currently Learning', 'AI-Assisted Engineering'] },
  { path: '/library', expect: ['Your Library', 'Shipped Builds', 'Off the Clock', 'Currently Learning'] },
  { path: '/playlist/featured', expect: ['Featured Release', 'Revamped Calgary Co-Op'] },
  { path: '/playlist/projects', expect: ['Shipped Builds', 'GetHomeSafe', 'Brainy Bees'] },
  { path: '/playlist/experience', expect: ['On Repeat', 'Developer Analyst', 'New Relic'] },
  { path: '/playlist/mentorship', expect: ['AASEE', 'Residence'] },
  { path: '/playlist/mentorship', expect: ['Paying It Forward', 'Schulich Student Mentorship'] },
  { path: '/playlist/community', expect: ['Community Sessions', 'CAGIS'] },
  // The detail panel opens from an effect, which renderToString does not run,
  // so this asserts the row is present and the deep link resolves.
  { path: '/playlist/projects?track=get-home-safe', expect: ['GetHomeSafe'] },
  { path: '/playlist/does-not-exist', expect: ['find that track'] },
  { path: '/search', expect: ['Browse by genre', 'React Native'] },
  { path: '/search?q=django', expect: ['result', 'Revamped Calgary Co-Op'] },
  { path: '/search?q=zzzznotathing', expect: ['Nothing matched that'] },
  { path: '/resume', expect: ['The full history', 'Download résumé', 'Developer Analyst', 'Skills', 'Blazor', 'H2S Alive'] },
  { path: '/nope', expect: ['find that track'] },
];

let failures = 0;

for (const testCase of CASES) {
  let markup = '';
  try {
    markup = renderToString(
      <MemoryRouter initialEntries={[testCase.path]}>
        <AppRoutes />
      </MemoryRouter>,
    );
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${testCase.path} — threw during render`);
    console.error(error);
    continue;
  }

  const missing = testCase.expect.filter((needle) => !markup.includes(needle));
  if (missing.length > 0) {
    failures += 1;
    console.error(`FAIL ${testCase.path} — missing: ${missing.join(', ')}`);
  } else {
    console.log(`ok   ${testCase.path}  (${markup.length} bytes)`);
  }
}

// The legacy CRA paths redirect, so they render no page content. Assert that
// they at least resolve without throwing.
for (const legacy of [
  '/ProjectsHomepage',
  '/CapstoneHomepage',
  '/ExtracurricularHomepage',
  '/ResumeHomepage',
]) {
  try {
    renderToString(
      <MemoryRouter initialEntries={[legacy]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    console.log(`ok   ${legacy}  (redirect resolves)`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${legacy} — threw during render`);
    console.error(error);
  }
}

if (failures > 0) {
  console.error(`\n${failures} route(s) failed.`);
  process.exit(1);
}
console.log('\nAll routes rendered.');
