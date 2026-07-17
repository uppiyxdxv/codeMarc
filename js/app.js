/* =============================================================
   CodeArena + ClassConnect — Full SPA Frontend
   Competitive coding + Virtual classroom platform
   ============================================================= */

const API_BASE = window.location.origin;

const DOMAINS = [
  {id:'java',name:'Java',icon:'☕',blurb:'OOP & core language problems',color:'#F5A623'},
  {id:'python',name:'Python',icon:'🐍',blurb:'Scripting, logic & data structures',color:'#34D399'},
  {id:'c',name:'C',icon:'🔧',blurb:'Low-level fundamentals & memory',color:'#5B8DEF'},
  {id:'mongodb',name:'MongoDB',icon:'🍃',blurb:'Document queries & aggregation',color:'#34D399'},
  {id:'sql',name:'SQL',icon:'🗄️',blurb:'Relational queries & joins',color:'#F87171'},
];

const QUESTIONS = [
  {id:'j1',domain:'java',title:'Two Sum',difficulty:'easy',topic:'Arrays',points:10,mode:'js',fn:'solve',
   desc:"Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.\n\nAssume exactly one solution exists, and you may not use the same element twice.",
   sampleInput:'nums = [2,7,11,15], target = 9', sampleOutput:'[0,1]', constraints:'2 <= nums.length <= 10^4',
   starter:"function solve(nums, target) {\n  \n}",
   tests:[{args:[[2,7,11,15],9],expected:[0,1]},{args:[[3,2,4],6],expected:[1,2]},{args:[[3,3],6],expected:[0,1]}]},
  {id:'j2',domain:'java',title:'Reverse a String',difficulty:'easy',topic:'Strings',points:10,mode:'js',fn:'solve',
   desc:"Write a function that reverses a string without using the built-in reverse method.",
   sampleInput:'"hello"', sampleOutput:'"olleh"', constraints:'1 <= s.length <= 10^5',
   starter:"function solve(s) {\n  \n}",
   tests:[{args:["hello"],expected:"olleh"},{args:["Java"],expected:"avaJ"},{args:["a"],expected:"a"}]},
  {id:'j3',domain:'java',title:'Valid Palindrome',difficulty:'medium',topic:'Strings',points:20,mode:'js',fn:'solve',
   desc:"Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring case.",
   sampleInput:'"A man, a plan, a canal: Panama"', sampleOutput:'true', constraints:'1 <= s.length <= 2*10^5',
   starter:"function solve(s) {\n  \n}",
   tests:[{args:["A man, a plan, a canal: Panama"],expected:true},{args:["race a car"],expected:false},{args:[" "],expected:true}]},
  {id:'j4',domain:'java',title:'Longest Substring Without Repeating Characters',difficulty:'hard',topic:'Strings',points:35,mode:'js',fn:'solve',
   desc:"Given a string s, find the length of the longest substring without repeating characters.",
   sampleInput:'"abcabcbb"', sampleOutput:'3', constraints:'0 <= s.length <= 5*10^4',
   starter:"function solve(s) {\n  \n}",
   tests:[{args:["abcabcbb"],expected:3},{args:["bbbbb"],expected:1},{args:["pwwkew"],expected:3}]},
  {id:'p1',domain:'python',title:'FizzBuzz',difficulty:'easy',topic:'Logic',points:10,mode:'js',fn:'solve',
   desc:"Return an array of strings for numbers 1..n. Multiples of 3 -> 'Fizz', of 5 -> 'Buzz', of both -> 'FizzBuzz'.",
   sampleInput:'n = 5', sampleOutput:'["1","2","Fizz","4","Buzz"]', constraints:'1 <= n <= 10^4',
   starter:"function solve(n) {\n  \n}",
   tests:[{args:[5],expected:["1","2","Fizz","4","Buzz"]},{args:[15],expected:["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]}]},
  {id:'p2',domain:'python',title:'Count Vowels',difficulty:'easy',topic:'Strings',points:10,mode:'js',fn:'solve',
   desc:"Count the number of vowels (a,e,i,o,u — case-insensitive) in a string.",
   sampleInput:'"Hello World"', sampleOutput:'3', constraints:'1 <= s.length <= 10^5',
   starter:"function solve(s) {\n  \n}",
   tests:[{args:["Hello World"],expected:3},{args:["PYTHON"],expected:1},{args:["aeiouAEIOU"],expected:10}]},
  {id:'p3',domain:'python',title:'Anagram Check',difficulty:'medium',topic:'Strings',points:20,mode:'js',fn:'solve',
   desc:"Determine whether two strings are anagrams of each other.",
   sampleInput:'"listen", "silent"', sampleOutput:'true', constraints:'1 <= length <= 10^4',
   starter:"function solve(a, b) {\n  \n}",
   tests:[{args:["listen","silent"],expected:true},{args:["hello","world"],expected:false},{args:["abc","cab"],expected:true}]},
  {id:'p4',domain:'python',title:'Longest Common Prefix',difficulty:'hard',topic:'Strings',points:35,mode:'js',fn:'solve',
   desc:"Find the longest common prefix string amongst an array of strings.",
   sampleInput:'["flower","flow","flight"]', sampleOutput:'"fl"', constraints:'1 <= strs.length <= 200',
   starter:"function solve(strs) {\n  \n}",
   tests:[{args:[["flower","flow","flight"]],expected:"fl"},{args:[["dog","racecar","car"]],expected:""},{args:[["abc"]],expected:"abc"}]},
  {id:'c1',domain:'c',title:'Sum of Array Elements',difficulty:'easy',topic:'Arrays',points:10,mode:'js',fn:'solve',
   desc:"Return the sum of all elements in an integer array.",
   sampleInput:'[1,2,3,4]', sampleOutput:'10', constraints:'0 <= arr.length <= 10^5',
   starter:"function solve(arr) {\n  \n}",
   tests:[{args:[[1,2,3,4]],expected:10},{args:[[]],expected:0},{args:[[-1,1]],expected:0}]},
  {id:'c2',domain:'c',title:'Find Duplicate in Array',difficulty:'medium',topic:'Arrays',points:20,mode:'js',fn:'solve',
   desc:"Given an array containing n+1 integers in [1,n], find the one duplicate number.",
   sampleInput:'[1,3,4,2,2]', sampleOutput:'2', constraints:'2 <= arr.length <= 10^5',
   starter:"function solve(arr) {\n  \n}",
   tests:[{args:[[1,3,4,2,2]],expected:2},{args:[[3,1,3,4,2]],expected:3}]},
  {id:'c3',domain:'c',title:'Matrix Transpose',difficulty:'hard',topic:'Arrays',points:35,mode:'js',fn:'solve',
   desc:"Given a 2D matrix (array of arrays), return its transpose.",
   sampleInput:'[[1,2,3],[4,5,6]]', sampleOutput:'[[1,4],[2,5],[3,6]]', constraints:'1 <= rows, cols <= 100',
   starter:"function solve(matrix) {\n  \n}",
   tests:[{args:[[[1,2,3],[4,5,6]]],expected:[[1,4],[2,5],[3,6]]},{args:[[[1]]],expected:[[1]]}]},
  {id:'m1',domain:'mongodb',title:'Employees Earning Above 50000',difficulty:'easy',topic:'Query',points:12,mode:'mongo',
   desc:"Find all employees with salary greater than 50000.",
   sampleInput:'db.employees.find({ ... })', sampleOutput:'Docs where salary > 50000',
   constraints:"Fields: name, department, salary, age",
   starter:"{\n  salary: { $gt: 50000 }\n}", expectedIds:['e2','e4','e5']},
  {id:'m2',domain:'mongodb',title:'Engineering Department',difficulty:'easy',topic:'Query',points:12,mode:'mongo',
   desc:"Find all employees who work in the 'Engineering' department.",
   sampleInput:'db.employees.find({ ... })', sampleOutput:"Docs where department == Engineering",
   constraints:"Fields: name, department, salary, age",
   starter:"{\n  department: \"Engineering\"\n}", expectedIds:['e1','e4']},
  {id:'m3',domain:'mongodb',title:'Employees Aged 25-35',difficulty:'medium',topic:'Query',points:20,mode:'mongo',
   desc:"Find employees aged between 25 and 35 inclusive.",
   sampleInput:'db.employees.find({ ... })', sampleOutput:'Docs where 25 <= age <= 35',
   constraints:"Fields: name, department, salary, age",
   starter:"{\n  age: { $gte: 25, $lte: 35 }\n}", expectedIds:['e1','e2','e3']},
  {id:'s1',domain:'sql',title:'Select High Earners',difficulty:'easy',topic:'Query',points:12,mode:'sql',
   desc:"Write a SQL query to select all columns for employees with salary > 50000 from 'employees' table.",
   sampleInput:'Table: employees(id, name, department, salary, age)', sampleOutput:'Rows where salary > 50000',
   constraints:"Table: employees",
   starter:"SELECT * FROM employees WHERE salary > 50000;",
   requiredPatterns:[/select/i,/from\s+employees/i,/salary\s*>\s*50000/i]},
  {id:'s2',domain:'sql',title:'Count Per Department',difficulty:'medium',topic:'Aggregation',points:22,mode:'sql',
   desc:"Count employees in each department (GROUP BY).",
   sampleInput:'Table: employees(id, name, department, salary, age)', sampleOutput:'department, count',
   constraints:"Table: employees",
   starter:"SELECT department, COUNT(*) FROM employees GROUP BY department;",
   requiredPatterns:[/select/i,/count\s*\(/i,/from\s+employees/i,/group by\s+department/i]},
  {id:'s3',domain:'sql',title:'Top 3 Highest Paid',difficulty:'medium',topic:'Sorting',points:22,mode:'sql',
   desc:"Select the top 3 highest paid employees.",
   sampleInput:'Table: employees(id, name, department, salary, age)', sampleOutput:'3 rows, highest first',
   constraints:"Table: employees",
   starter:"SELECT * FROM employees ORDER BY salary DESC LIMIT 3;",
   requiredPatterns:[/select/i,/from\s+employees/i,/order by\s+salary\s+desc/i,/limit\s+3/i]},
  {id:'s4',domain:'sql',title:'Names Starting With A',difficulty:'hard',topic:'Pattern Matching',points:32,mode:'sql',
   desc:"Find employees whose name starts with 'A' using LIKE.",
   sampleInput:'Table: employees(id, name, department, salary, age)', sampleOutput:"Rows where name LIKE 'A%'",
   constraints:"Table: employees",
   starter:"SELECT * FROM employees WHERE name LIKE 'A%';",
   requiredPatterns:[/select/i,/from\s+employees/i,/name\s+like\s+'a%'/i]},
];

const EMPLOYEES = [
  {_id:'e1',name:'Bharath Kumar',department:'Engineering',salary:48000,age:26},
  {_id:'e2',name:'Ananya Rao',department:'Data',salary:71000,age:29},
  {_id:'e3',name:'Rohit Sharma',department:'Design',salary:52500,age:34},
  {_id:'e4',name:'Divya Menon',department:'Engineering',salary:66000,age:41},
  {_id:'e5',name:'Karthik Iyer',department:'Sales',salary:58000,age:24},
];

const QUIZ = [
  {id:'q1',domain:'java',q:'What is the output of this Java-style snippet?',
   code:"int x = 5;\nint y = x++ + ++x;\nSystem.out.println(y);",
   options:['10','11','12','9'],correct:2,
   explain:'x++ uses 5 then increments to 6; ++x increments to 7 then uses 7. 5 + 7 = 12.'},
  {id:'q2',domain:'python',q:'Which data structure does Python use to implement a dictionary internally?',
   code:'d = {"a": 1, "b": 2}',
   options:['Linked List','Hash Table','Binary Tree','Array'],correct:1,
   explain:'Python dicts are implemented as hash tables, giving O(1) average lookup.'},
  {id:'q3',domain:'sql',q:'Which clause filters rows AFTER aggregation (GROUP BY)?',
   code:"SELECT department, COUNT(*) FROM employees GROUP BY department ___ COUNT(*) > 5;",
   options:['WHERE','HAVING','FILTER','ON'],correct:1,
   explain:'HAVING filters aggregated groups; WHERE filters rows before aggregation.'},
  {id:'q4',domain:'mongodb',q:'Which operator matches documents where a field value >= a given value?',
   code:'db.employees.find({ salary: { ___: 50000 } })',
   options:['$gt','$gte','$eq','$in'],correct:1,
   explain:'$gte means greater than or equal to.'},
  {id:'q5',domain:'c',q:'What does this C-style expression evaluate to?',
   code:"int a = 7, b = 2;\nprintf(\"%d\", a / b);",
   options:['3.5','3','4','Error'],correct:1,
   explain:'Integer division truncates toward zero: 7/2 = 3.'},
  {id:'q6',domain:'java',q:'Which keyword prevents a class from being subclassed in Java?',
   code:'___ class Vehicle { }',
   options:['static','const','final','sealed'],correct:2,
   explain:'"final" on a class prevents inheritance.'},
];

const GLOBAL_LEADERBOARD = [
  {name:'Ishaan Verma',avatar:'🧑‍🚀',points:2840,solved:118},
  {name:'Priya Nair',avatar:'👩‍💻',points:2615,solved:104},
  {name:'Wei Zhang',avatar:'🧑‍💻',points:2390,solved:97},
  {name:'Fatima Noor',avatar:'👩‍🔬',points:2110,solved:88},
  {name:'Marco Silva',avatar:'🧑‍🎓',points:1980,solved:81},
  {name:'Ana Costa',avatar:'👩‍🎓',points:1755,solved:74},
  {name:'Dev Patel',avatar:'🧑‍💼',points:1520,solved:63},
  {name:'Lena Fischer',avatar:'👩‍💼',points:1290,solved:55},
];

const AVATARS = ['🧑‍💻','👩‍💻','🧑‍🚀','👩‍🚀','🧑‍🎓','👩‍🎓','🧑‍🔬','👩‍🔬','🙂','😎'];
const SAVE_KEY = 'codearena_state';

const state = {
  view:'landing',
  users:{'demo@codearena.io':{password:'demo123',name:'Demo Learner',avatar:'🧑‍💻',solved:{},points:0,role:'STUDENT'},
         'teacher@codearena.io':{password:'teacher123',name:'Prof. Smith',avatar:'👩‍🏫',solved:{},points:0,role:'TEACHER'}},
  currentUser:null,
  token:null,
  currentDomain:null,
  currentDiff:'easy',
  currentProblem:null,
  code:{}, lang:{}, runResult:null,
  quizIdx:0, quizAnswers:{}, quizSubmitted:false,
  dropdownOpen:false, authMsg:null, confirmSubmitId:null,
  interview:{phase:'setup',resumeText:'',role:'',questions:[],currentQ:0,answers:[],feedbacks:[],loading:false,error:null,overall:null,apiKey:''},
  courses:[], currentCourse:null, assignments:{}, submissions:{},
};

function saveState(){
  try{ localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }catch(e){}
}
function loadState(){
  try{
    const raw = localStorage.getItem(SAVE_KEY);
    if(raw){ const saved = JSON.parse(raw); Object.assign(state, saved); return true; }
  }catch(e){}
  return false;
}

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function nav(view,extra){
  state.view=view;
  if(extra) Object.assign(state,extra);
  state.dropdownOpen=false;
  state.authMsg=null;
  render();
  window.scrollTo(0,0);
}

function toggleDropdown(){ state.dropdownOpen=!state.dropdownOpen; render(); }

function logout(){
  state.currentUser=null; state.token=null;
  localStorage.removeItem('token');
  nav('landing');
}

/* ---- API helpers ---- */
async function api(path, opts){
  const headers = {'Content-Type':'application/json'};
  if(state.token) headers['Authorization']='Bearer '+state.token;
  const res = await fetch(API_BASE+path, {...opts, headers});
  const data = await res.json();
  if(!res.ok) throw new Error(data.message||'Request failed');
  return data;
}

/* ---- JS JUDGE ---- */
function deepEqual(a,b){
  if(Array.isArray(a)&&Array.isArray(b)) return a.length===b.length&&a.every((v,i)=>deepEqual(v,b[i]));
  return a===b;
}

function runJsProblem(problem, code, onlySample){
  const tests = onlySample ? [problem.tests[0]] : problem.tests;
  return tests.map(t=>{
    try{
      const wrapper = new Function(code+`\nreturn ${problem.fn}(...arguments);`);
      const actual = wrapper(...t.args);
      const pass = deepEqual(actual, t.expected);
      return {input:JSON.stringify(t.args), expected:JSON.stringify(t.expected), actual:JSON.stringify(actual), pass};
    }catch(e){
      return {input:JSON.stringify(t.args), expected:JSON.stringify(t.expected), actual:'Error: '+e.message, pass:false};
    }
  });
}

function matchDoc(doc, query){
  for(const key in query){
    const cond = query[key]; const val = doc[key];
    if(cond&&typeof cond==='object'&&!Array.isArray(cond)){
      for(const op in cond){
        const t = cond[op];
        if(op==='$gt'&&!(val>t)) return false; if(op==='$gte'&&!(val>=t)) return false;
        if(op==='$lt'&&!(val<t)) return false; if(op==='$lte'&&!(val<=t)) return false;
        if(op==='$eq'&&!(val===t)) return false; if(op==='$ne'&&!(val!==t)) return false;
        if(op==='$regex'&&!(new RegExp(t).test(val))) return false;
      }
    } else if(val!==cond) return false;
  }
  return true;
}

function runMongoProblem(problem, code){
  try{
    const query = new Function('return ('+code+');')();
    const matched = EMPLOYEES.filter(d=>matchDoc(d, query));
    const gotIds = matched.map(d=>d._id).sort();
    const wantIds = [...problem.expectedIds].sort();
    return {pass:JSON.stringify(gotIds)===JSON.stringify(wantIds), matched, error:null};
  }catch(e){ return {pass:false, matched:[], error:e.message}; }
}

function runSqlProblem(problem, code){
  const missing = problem.requiredPatterns.filter(p=>!p.test(code));
  return {pass:missing.length===0, missingCount:missing.length, total:problem.requiredPatterns.length};
}

/* ---- Mock Interview (Claude AI + offline fallback) ---- */
async function callClaude(system, user, apiKey){
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST',
    headers:{'Content-Type':'application/json', 'x-api-key':apiKey, 'anthropic-version':'2023-06-01'},
    body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system,messages:[{role:'user',content:user}]})
  });
  if(!res.ok) throw new Error('API request failed ('+res.status+')');
  const data = await res.json();
  return (data.content||[]).map(b=>b.text||'').join('\n');
}
function extractJSON(text){
  const cleaned = text.replace(/```json/gi,'').replace(/```/g,'').trim();
  const s = Math.min(cleaned.indexOf('{'), cleaned.indexOf('['));
  const candidate = s>=0 ? cleaned.slice(s) : cleaned;
  try{ return JSON.parse(candidate); }catch(e){ return {questions:['Tell me about yourself.','Why do you want this role?','Describe a challenge you overcame.','Where do you see yourself in 5 years?','Why should we hire you?','Tell me about a time you worked in a team.']}; }
}

const IV_QUESTIONS = {
  behavioral: [
    'Tell me about a time you faced a challenge. How did you handle it?',
    'Describe a situation where you worked as part of a team to achieve a goal.',
    'Tell me about a time you received feedback. How did you respond?',
    'Describe a situation where you had to meet a tight deadline.',
    'Tell me about a project you are most proud of and why.',
    'Describe a time you had to learn something new quickly.',
    'Tell me about a conflict you resolved with someone.',
    'Describe a time you showed leadership or initiative.',
    'Tell me about a time you made a mistake and what you learned.',
    'Describe a time you went above and beyond expectations.',
  ],
  motivation: [
    'Why did you choose your career path?',
    'What is your greatest professional achievement?',
    'Where do you see yourself in five years?',
    'What motivates you to do your best work?',
    'Why are you interested in this role?',
  ],
};

function generateInterviewQuestions(text, role){
  const lower = text.toLowerCase();
  const tech = [...new Set((lower.match(/\b(java|python|javascript|react|angular|spring|sql|mongodb|node|docker|aws|gcp|azure|typescript|go|rust|c\+\+|ruby|php|swift|kotlin|flask|django|vue|git|kubernetes|tensorflow|pytorch|machine learning|data science|frontend|backend|fullstack|api|cloud|devops|linux)\b/g)||[]))].slice(0,2);
  const qs = [];
  const used = new Set();
  const pick = (pool) => { const opts = pool.filter(q=>!used.has(q)); if(!opts.length) return pool[0]; const p = opts[Math.floor(Math.random()*opts.length)]; used.add(p); return p; };
  for(let i=0;i<3;i++) qs.push(pick(IV_QUESTIONS.behavioral));
  qs.push(pick(IV_QUESTIONS.motivation).replace('this role',`the ${role} role`));
  if(tech.length) qs.push(`Your background includes ${tech.join(' and ')}. Can you describe a project where you applied these skills?`);
  qs.push(`Looking at your experience, what makes you a strong fit for this ${role} role?`);
  while(qs.length<6) qs.push(pick(IV_QUESTIONS.behavioral));
  return qs.slice(0,7);
}

function scoreAnswer(question, answer){
  const a = answer.toLowerCase(); const wc = answer.split(/\s+/).length;
  let s = 5; const fb = [];
  if(wc<15){ s-=2; fb.push('Too brief — expand with specific details.'); } else if(wc>25) s+=1;
  if(/for example|specifically|one time|i handled|i resolved|i led|i created|i built|i implemented/i.test(a)){ s+=2; fb.push('Good specific example.'); }
  else { s-=1; fb.push('Include a real example from your experience.'); }
  const kw = ['communicat','problem','team','leader','result','achieved','collaborat','solved','learn','mentor','delivered','improved','launched'];
  const match = kw.filter(w=>a.includes(w)).length;
  if(match>=3) s+=1; else fb.push('Weave in relevant skill keywords.');
  if(/i don'?t know/i.test(a)) s=Math.min(s,3);
  if(/achieved|result|delivered|increased|decreased|saved|improved by|reduced/i.test(a)){ s+=1; fb.push('Good use of measurable results.'); }
  s = Math.max(1,Math.min(10,s));
  const tips = ['Try the STAR method (Situation, Task, Action, Result).','Quantify your impact with numbers.','Connect your answer to what the role needs.','Practice your delivery for more confidence.','Be more specific about your contribution.'];
  if(!fb.length) fb.push('Clear and relevant. Keep this level of detail.');
  fb.push(tips[Math.floor(Math.random()*tips.length)]);
  return {score:s, feedback:fb.slice(0,2).join(' ')};
}

const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

async function generateInterview(){
  const iv = state.interview;
  const resume = document.getElementById('iv-resume').value.trim();
  const role = document.getElementById('iv-role').value.trim()||'Software Engineer';
  const apiKey = document.getElementById('iv-apikey').value.trim();
  if(resume.length<40){ iv.error='Paste more of your resume (experience, projects, skills).'; render(); return; }
  iv.resumeText=resume; iv.role=role; iv.apiKey=apiKey; iv.error=null; iv.loading=true; iv.phase='loading'; render();
  if(apiKey){
    try{
      const sys="You are an experienced HR interviewer. Given a resume and target role, write 6 HR-round interview questions. Respond with ONLY valid JSON: {\"questions\":[\"...\",\"...\"]}";
      const text = await callClaude(sys, `Target role: ${role}\nResume:\n${resume}`, apiKey);
      iv.questions = extractJSON(text).questions;
      iv.currentQ=0; iv.answers=[]; iv.feedbacks=[]; iv.overall=null;
      iv.loading=false; iv.phase='session'; saveState(); render();
    }catch(e){
      iv.error='Claude API error — try again or remove the key to use offline mode.'; iv.loading=false; render();
    }
  } else {
    setTimeout(()=>{
      iv.questions = generateInterviewQuestions(resume, role);
      iv.currentQ=0; iv.answers=[]; iv.feedbacks=[]; iv.overall=null;
      iv.loading=false; iv.phase='session'; saveState(); render();
    }, 700);
  }
}

async function submitInterviewAnswer(){
  const iv = state.interview;
  const ans = document.getElementById('iv-answer').value.trim();
  if(!ans){ iv.error='Write an answer before submitting.'; render(); return; }
  iv.error=null;
  if(iv.apiKey){
    iv.loading=true; render();
    try{
      const sys="You are an HR interview coach. Given one HR question and the candidate's answer, give brief feedback. Respond with ONLY JSON: {\"score\":<integer 1-10>,\"feedback\":\"2-3 sentences\"}";
      const text = await callClaude(sys, `Question: ${iv.questions[iv.currentQ]}\nAnswer: ${ans}`, iv.apiKey);
      const parsed = extractJSON(text);
      iv.answers[iv.currentQ]=ans;
      iv.feedbacks[iv.currentQ]={score:parsed.score,feedback:parsed.feedback};
    }catch(e){
      iv.answers[iv.currentQ]=ans;
      iv.feedbacks[iv.currentQ]={score:null,feedback:'Feedback unavailable from API.'};
    }
    iv.loading=false; saveState(); render();
  } else {
    const fb = scoreAnswer(iv.questions[iv.currentQ], ans);
    iv.answers[iv.currentQ]=ans;
    iv.feedbacks[iv.currentQ]={score:fb.score, feedback:fb.feedback};
    saveState(); render();
  }
}

function nextInterviewQuestion(){
  const iv = state.interview;
  if(iv.currentQ<iv.questions.length-1){ iv.currentQ++; saveState(); render(); }
  else finishInterview();
}

async function finishInterview(){
  const iv = state.interview;
  const scores = iv.feedbacks.map(f=>f.score).filter(s=>typeof s==='number');
  const avg = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length*10)/10 : null;
  if(iv.apiKey){
    iv.loading=true; iv.phase='summary'; render();
    try{
      const sys="You are an HR interview coach summarizing a mock interview. Respond with ONLY JSON: {\"summary\":\"3-4 sentences\",\"strengths\":[\"...\",\"...\"],\"improve\":[\"...\",\"...\"]}";
      const transcript = iv.questions.map((q,i)=>`Q${i+1}: ${q}\nA${i+1}: ${iv.answers[i]||''}`).join('\n\n');
      const text = await callClaude(sys, `Role: ${iv.role}\n\nTranscript:\n${transcript}`, iv.apiKey);
      iv.overall = Object.assign({avg}, extractJSON(text));
    }catch(e){ iv.overall={avg,summary:'Summary unavailable from API.',strengths:[],improve:[]}; }
    iv.loading=false; saveState(); render();
  } else {
    const str = []; const imp = [];
    if(avg>=7){ str.push('Strong overall performance with detailed answers.'); str.push('Good use of examples.'); }
    else if(avg>=4){ imp.push('Add more specific examples. Use STAR method.'); str.push('Solid foundation with key points covered.'); }
    else { imp.push('Expand answers with context, action, and result.'); imp.push('Quantify your achievements.'); }
    if(scores.some(s=>s<5)) imp.push('Practice answering behavioral questions with real stories from your experience.');
    let summary = avg>=8 ? `Excellent interview! Strong communication and compelling examples for the ${iv.role} role.` :
      avg>=6 ? `Good effort! Your answers show relevant experience. Focus on STAR structure and metrics for even stronger responses.` :
      avg>=4 ? `You have good material but need to work on structure and delivery. Prepare 5-7 stories from your experience.` :
      `This is a good starting point. Write down specific achievements and practice describing them in 2-minute responses.`;
    iv.overall = {avg, summary, strengths:str.slice(0,3), improve:imp.slice(0,3)};
    iv.phase='summary'; saveState(); render();
  }
}

function restartInterview(){
  const prevKey = state.interview.apiKey || '';
  state.interview={phase:'setup',resumeText:'',role:'',questions:[],currentQ:0,answers:[],feedbacks:[],loading:false,error:null,overall:null,apiKey:prevKey};
  saveState(); render();
}

/* ---- RENDER ---- */
function navBar(){
  const u = state.currentUser;
  return `<div class="nav"><div class="nav-left"><div class="brand" onclick="nav('landing')"><span class="dot"></span>Code<span class="arena">Arena</span><span style="font-size:11px;color:var(--text-dim);margin-left:4px;">+ClassConnect</span></div>
    <div class="nav-links">
      <a onclick="nav('landing')" class="${state.view==='landing'?'active':''}">Home</a>
      <a onclick="nav('domains')" class="${state.view==='domains'?'active':''}">Coding</a>
      ${u?`<a onclick="nav('courses')" class="${state.view==='courses'||state.view==='course-detail'||state.view==='assignment-detail'?'active':''}">Classroom</a>`:''}
      ${u?`<a onclick="nav('quiz')" class="${state.view==='quiz'?'active':''}">Quiz</a>`:''}
      ${u?`<a onclick="nav('interview')" class="${state.view==='interview'?'active':''}">Interview</a>`:''}
      <a onclick="nav('pricing')" class="${state.view==='pricing'?'active':''}">Pricing</a>
    </div></div>
    <div class="nav-right">${u ? `
      <button class="btn btn-sm" onclick="nav('dashboard')">Dashboard</button>
      <div class="dropdown ${state.dropdownOpen?'open':''}">
        <button class="avatar-btn" onclick="toggleDropdown()"><span class="avatar-circ">${u.avatar}</span><span style="font-size:13px;font-weight:600;">${esc(u.name.split(' ')[0])}</span></button>
        <div class="dropdown-menu">
          <a onclick="nav('dashboard')">📊 Dashboard</a>
          <a onclick="nav('settings')">⚙️ Settings</a>
          <button onclick="logout()">🚪 Log out</button>
        </div></div>` : `
      <button class="btn" onclick="nav('login')">Log in</button>
      <button class="btn btn-primary" onclick="nav('signup')">Create account</button>`}
    </div></div>`;
}
function footer(){ return `<div class="footer">CodeArena + ClassConnect — a learning & classroom platform prototype. Built with Java + Spring Boot.</div>`; }

/* ---- Landing ---- */
function renderLanding(){
  return `${navBar()}<main>
    <div class="hero"><div>
      <div class="eyebrow">● 5 domains · classroom · live judge</div>
      <h1>Code. Compete. <span>Connect.</span></h1>
      <p>CodeArena + ClassConnect combines competitive coding practice with a full virtual classroom. Solve problems, take quizzes, attend classes, submit assignments — all in one platform.</p>
      <div class="hero-cta">
        <button class="btn btn-primary" onclick="nav('signup')">Create free account</button>
        <button class="btn" onclick="nav('domains')">Browse coding</button>
      </div>
      <div class="hero-stats">
        <div><b>5</b><span>Domains</span></div>
        <div><b>26+</b><span>Problems</span></div>
        <div><b>Classrooms</b><span>Virtual courses</span></div>
        <div><b>Auto-grade</b><span>Assignments</span></div>
      </div>
    </div>
    <div class="code-window">
      <div class="cw-head"><span class="cw-dot" style="background:#F87171"></span><span class="cw-dot" style="background:#FBBF24"></span><span class="cw-dot" style="background:#34D399"></span><span class="cw-tab">platform.js</span></div>
      <pre><span class="kw">const</span> platform = {
  coding: { domains: [<span class="str">"Java"</span>,<span class="str">"Python"</span>,<span class="str">"C"</span>,<span class="str">"MongoDB"</span>,<span class="str">"SQL"</span>],
            judge: <span class="str">"in-browser + Judge0"</span> },
  classroom: { courses: <span class="num">∞</span>,
               assignments: <span class="str">"auto-deadline tracking"</span>,
               gradebook: <span class="str">"real-time analytics"</span> },
  interview: { ai: <span class="str">"Claude-powered mock HR"</span> }
};

<span class="cm">// All-in-one learning & teaching platform</span>
<span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"Ready to ship 🚀"</span>);</pre>
    </div></div>

    <div class="domain-grid">
      ${DOMAINS.map(d=>`<div class="domain-card" onclick="nav('domains',{currentDomain:'${d.id}'})"><div class="di">${d.icon}</div><h3>${d.name}</h3><p>${d.blurb}</p></div>`).join('')}
    </div>

    <div class="section" style="background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
      <div class="container"><div class="feat-grid">
        <div class="feat-card"><div class="fi">🧭</div><h4>Personal dashboard</h4><p>Track problems solved, points, global rank, and classroom progress.</p></div>
        <div class="feat-card"><div class="fi">🧪</div><h4>Real test-case judging</h4><p>Submissions run against sample and hidden test cases with immediate results.</p></div>
        <div class="feat-card"><div class="fi">🏫</div><h4>Virtual classrooms</h4><p>Teachers create courses, students join with a code. All assignments managed in one place.</p></div>
        <div class="feat-card"><div class="fi">📝</div><h4>Assignment manager</h4><p>Auto-deadline reminders, file uploads, grade book with analytics and feedback.</p></div>
        <div class="feat-card"><div class="fi">🎤</div><h4>AI mock interview</h4><p>Paste your resume, get HR questions with AI feedback and scored summary.</p></div>
      </div></div>
    </div>

    <div class="section"><div class="section-head"><h2>Two platforms, one login</h2><p>Switch between competitive coding and classroom work seamlessly.</p></div>
      <div style="display:flex;justify-content:center;gap:12px;">
        <button class="btn btn-primary" onclick="nav('signup')">Create free account</button>
        <button class="btn" onclick="nav('pricing')">See pricing</button>
      </div>
    </div>
  </main>${footer()}`;
}

/* ---- AUTH ---- */
function renderLogin(){
  const email = state.authMsg?.type==='err'?'':('demo@codearena.io');
  return `${navBar()}<div class="auth-wrap"><div class="auth-card">
    <h2>Welcome back</h2><div class="sub">Log in to continue.</div>
    ${state.authMsg?`<div class="form-msg ${state.authMsg.type}">${esc(state.authMsg.text)}</div>`:''}
    <div class="field"><label>Email</label><input id="li-email" type="email" placeholder="you@example.com"></div>
    <div class="field"><div class="field-row"><label>Password</label><button class="link-btn" onclick="nav('forgot')">Forgot password?</button></div>
      <input id="li-pass" type="password" placeholder="••••••••"></div>
    <button class="btn btn-primary" style="width:100%;margin-top:6px;" onclick="doLogin()">Log in</button>
    <div class="auth-foot">Demo: demo@codearena.io / demo123 &nbsp;·&nbsp; teacher@codearena.io / teacher123</div>
    <div class="auth-foot">No account? <a style="color:var(--brand);font-weight:600;" onclick="nav('signup')">Create one</a></div>
  </div></div>${footer()}`;
}
function renderSignup(){
  return `${navBar()}<div class="auth-wrap"><div class="auth-card">
    <h2>Create your account</h2><div class="sub">Start in under a minute.</div>
    ${state.authMsg?`<div class="form-msg ${state.authMsg.type}">${esc(state.authMsg.text)}</div>`:''}
    <div class="field"><label>Full name</label><input id="su-name" type="text" placeholder="Ada Lovelace"></div>
    <div class="field"><label>Email</label><input id="su-email" type="email" placeholder="you@example.com"></div>
    <div class="field"><label>Password</label><input id="su-pass" type="password" placeholder="At least 6 characters"></div>
    <button class="btn btn-primary" style="width:100%;margin-top:6px;" onclick="doSignup()">Create account</button>
    <div class="auth-foot">Already have one? <a style="color:var(--brand);font-weight:600;" onclick="nav('login')">Log in</a></div>
  </div></div>${footer()}`;
}
function renderForgot(){
  return `${navBar()}<div class="auth-wrap"><div class="auth-card">
    <h2>Reset password</h2><div class="sub">Enter your email for a reset link (simulated).</div>
    ${state.authMsg?`<div class="form-msg ${state.authMsg.type}">${esc(state.authMsg.text)}</div>`:''}
    <div class="field"><label>Email</label><input id="fp-email" type="email" placeholder="you@example.com"></div>
    <button class="btn btn-primary" style="width:100%;margin-top:6px;" onclick="doForgot()">Send reset link</button>
    <div class="auth-foot"><a style="color:var(--brand);font-weight:600;" onclick="nav('login')">← Back to log in</a></div>
  </div></div>${footer()}`;
}
function doLogin(){
  const email = document.getElementById('li-email').value.trim();
  const pass = document.getElementById('li-pass').value;
  const u = state.users[email];
  if(!u||u.password!==pass){ state.authMsg={type:'err',text:'Incorrect email or password.'}; render(); return; }
  state.currentUser = Object.assign({email}, u);
  state.authMsg=null; saveState(); nav('dashboard');
}
function doSignup(){
  const name = document.getElementById('su-name').value.trim();
  const email = document.getElementById('su-email').value.trim();
  const pass = document.getElementById('su-pass').value;
  if(!name||!email||!pass){ state.authMsg={type:'err',text:'Fill in every field.'}; render(); return; }
  if(pass.length<6){ state.authMsg={type:'err',text:'Password must be 6+ characters.'}; render(); return; }
  if(state.users[email]){ state.authMsg={type:'err',text:'Email already registered.'}; render(); return; }
  state.users[email] = {password:pass,name,avatar:'🙂',solved:{},points:0,role:'STUDENT'};
  state.currentUser = Object.assign({email}, state.users[email]);
  state.authMsg=null; saveState(); nav('dashboard');
}
function doForgot(){
  const email = document.getElementById('fp-email').value.trim();
  if(!email){ state.authMsg={type:'err',text:'Enter your email.'}; render(); return; }
  state.authMsg={type:'ok',text:`If an account exists for ${email}, a reset link has been sent (simulated).`};
  render();
}

/* ---- Dashboard ---- */
function computeSolvedStats(u){
  const solvedIds = Object.keys(u.solved||{});
  const byDiff = {easy:0,medium:0,hard:0};
  solvedIds.forEach(id=>{const q=QUESTIONS.find(x=>x.id===id);if(q)byDiff[q.difficulty]++;});
  return {total:solvedIds.length,byDiff};
}
function buildLeaderboard(){
  const rows = GLOBAL_LEADERBOARD.slice();
  if(state.currentUser){
    rows.push({name:state.currentUser.name+' (you)',avatar:state.currentUser.avatar,points:state.currentUser.points||0,solved:Object.keys(state.currentUser.solved||{}).length,me:true});
  }
  return rows.sort((a,b)=>b.points-a.points);
}
function renderDashboard(){
  if(!state.currentUser) return renderLogin();
  const u = state.currentUser;
  const stats = computeSolvedStats(u);
  const board = buildLeaderboard();
  const myRank = board.findIndex(r=>r.me)+1;
  const totalCap = QUESTIONS.length;
  const pct = Math.min(100, Math.round((stats.total/totalCap)*100));
  return `${navBar()}
  <div class="page-head"><h1>Welcome back, ${esc(u.name.split(' ')[0])} ${u.avatar}</h1><p>Your learning and classroom hub.</p></div>
  <div class="dash-grid"><div>
    <div class="card" style="margin-bottom:18px;">
      <h3>Coding progress</h3>
      <div class="stat-row">
        <div class="stat-box"><b>${stats.total}</b><span>Solved</span></div>
        <div class="stat-box"><b>${u.points||0}</b><span>Points</span></div>
        <div class="stat-box"><b>#${myRank}</b><span>Rank</span></div>
        <div class="stat-box"><b>${pct}%</b><span>Bank cleared</span></div>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%;background:var(--brand);"></div></div>
      <div style="margin-top:18px;">
        <div class="diff-row"><span class="label">Easy</span><div class="progress-track" style="flex:1;"><div class="progress-fill" style="width:${Math.min(100,stats.byDiff.easy/7*100)}%;background:var(--success);"></div></div><span class="count">${stats.byDiff.easy}</span></div>
        <div class="diff-row"><span class="label">Medium</span><div class="progress-track" style="flex:1;"><div class="progress-fill" style="width:${Math.min(100,stats.byDiff.medium/10*100)}%;background:var(--warn);"></div></div><span class="count">${stats.byDiff.medium}</span></div>
        <div class="diff-row"><span class="label">Hard</span><div class="progress-track" style="flex:1;"><div class="progress-fill" style="width:${Math.min(100,stats.byDiff.hard/5*100)}%;background:var(--danger);"></div></div><span class="count">${stats.byDiff.hard}</span></div>
      </div>
    </div>
    <div class="card"><h3>Quick links</h3>
      <div class="domain-grid" style="grid-template-columns:repeat(5,1fr);padding:0;max-width:none;">
        ${DOMAINS.map(d=>`<div class="domain-card" style="padding:14px 8px;" onclick="nav('domains',{currentDomain:'${d.id}'})"><div class="di" style="font-size:20px;">${d.icon}</div><h3 style="font-size:12px;">${d.name}</h3></div>`).join('')}
      </div>
      <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap;">
        <button class="btn btn-sm" onclick="nav('courses')">📚 My classrooms</button>
        <button class="btn btn-sm" onclick="nav('quiz')">🧠 Take a quiz</button>
        <button class="btn btn-sm" onclick="nav('interview')">🎤 Mock interview</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:18px;">
      <h3>🏆 Leaderboard</h3>
      <table><tr><th>#</th><th>Learner</th><th>Solved</th><th>Pts</th></tr>
        ${board.slice(0,7).map((r,i)=>`<tr class="${r.me?'rank-me':''}"><td>${i+1}</td><td>${r.avatar} ${esc(r.name)}</td><td>${r.solved}</td><td>${r.points}</td></tr>`).join('')}
      </table>
      ${myRank>7?`<div style="margin-top:8px;font-size:12px;color:var(--text-muted);">Your rank: <b>#${myRank}</b></div>`:''}
    </div>
    <div class="card"><h3>🎤 AI mock interview</h3>
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">Practice HR-round questions with live AI feedback.</p>
      <button class="btn btn-primary" style="width:100%;" onclick="nav('interview')">Start interview</button>
    </div>
  </div></div>${footer()}`;
}

/* ---- Domains / Problems ---- */
function renderDomains(){
  if(!state.currentDomain){
    return `${navBar()}<div class="page-head"><h1>Choose a domain</h1><p>Each domain has independent problem sets.</p></div>
    <div class="domain-grid" style="margin-top:10px;">
      ${DOMAINS.map(d=>`<div class="domain-card" onclick="nav('domains',{currentDomain:'${d.id}'})"><div class="di">${d.icon}</div><h3>${d.name}</h3><p>${d.blurb}</p></div>`).join('')}
    </div><div style="height:50px;"></div>${footer()}`;
  }
  const d = DOMAINS.find(x=>x.id===state.currentDomain);
  const qs = QUESTIONS.filter(q=>q.domain===d.id).filter(q=>q.difficulty===state.currentDiff);
  const counts = {easy:0,medium:0,hard:0};
  QUESTIONS.filter(q=>q.domain===d.id).forEach(q=>counts[q.difficulty]++);
  const solved = state.currentUser ? (state.currentUser.solved||{}) : {};
  return `${navBar()}
  <div class="page-head"><h1>${d.icon} ${d.name}</h1><p>${d.blurb}</p></div>
  <div class="page-head" style="padding-top:0;">
    <div class="banner"><span>Showing <b>${qs.length}</b> of <b>${counts.easy+counts.medium+counts.hard}</b> problems in this demo.</span>
      <button class="btn btn-sm" onclick="nav('domains',{currentDomain:null})">Change domain</button>
    </div>
    <div class="tabs">
      ${['easy','medium','hard'].map(diff=>`<button class="tab ${state.currentDiff===diff?'active':''}" onclick="setDiff('${diff}')">${diff[0].toUpperCase()+diff.slice(1)} (${counts[diff]})</button>`).join('')}
    </div>
    <div class="plist">
      ${qs.length?qs.map(q=>`<div class="prow" onclick="openProblem('${q.id}')"><span class="pstatus">${solved[q.id]?'✅':'⬜'}</span><span class="ptitle">${esc(q.title)}</span><span class="ptopic">${esc(q.topic)}</span><span class="pill ${q.difficulty}">${q.difficulty}</span><span style="width:50px;text-align:right;font-size:12px;color:var(--text-dim);">${q.points}pts</span></div>`).join('') : `<div style="padding:24px;color:var(--text-dim);font-size:13px;">No problems at this difficulty.</div>`}
    </div>
  </div><div style="height:40px;"></div>${footer()}`;
}
function setDiff(d){ state.currentDiff=d; render(); }
function openProblem(id){
  if(!state.currentUser){ nav('login'); return; }
  const q = QUESTIONS.find(x=>x.id===id);
  state.currentProblem = id;
  if(!state.lang[id]) state.lang[id] = (q.mode==='js')?'javascript':q.domain;
  const key = id+'::'+state.lang[id];
  if(!state.code[key]) state.code[key] = scaffold(state.lang[id], q);
  state.runResult = null; state.confirmSubmitId = null;
  nav('coding');
}
function scaffold(lang, q){
  if(lang==='javascript'||lang==='mongodb'||lang==='sql') return q.starter;
  return `// ${lang}\n// Practice mode (not executed in demo)\n`;
}
function deriveExamples(q){
  if(q.mode==='js') return q.tests.slice(0,2).map(t=>({input:`${q.fn}(${t.args.map(a=>JSON.stringify(a)).join(', ')})`, output:JSON.stringify(t.expected)}));
  if(q.mode==='mongo'){
    const exs=[]; const m=EMPLOYEES.find(d=>q.expectedIds.includes(d._id)); const n=EMPLOYEES.find(d=>!q.expectedIds.includes(d._id));
    if(m) exs.push({input:JSON.stringify({name:m.name,department:m.department,salary:m.salary,age:m.age}),output:'✅ Included'});
    if(n) exs.push({input:JSON.stringify({name:n.name,department:n.department,salary:n.salary,age:n.age}),output:'🚫 Not included'});
    return exs;
  }
  return [{input:q.sampleInput,output:q.sampleOutput}];
}

/* ---- Coding ---- */
function renderCoding(){
  const q = QUESTIONS.find(x=>x.id===state.currentProblem);
  if(!q) return renderDomains();
  const lang = state.lang[q.id];
  const key = q.id+'::'+lang;
  const code = state.code[key]!==undefined?state.code[key]:scaffold(lang,q);
  const langOptions = q.mode==='js'?[{v:'javascript',l:'JavaScript (runs live)'},{v:'java',l:'Java (practice)'},{v:'python',l:'Python (practice)'},{v:'c',l:'C (practice)'}]:q.mode==='mongo'?[{v:'mongodb',l:'MongoDB Query'}]:[{v:'sql',l:'SQL'}];
  const examples = deriveExamples(q);
  return `${navBar()}
  <div class="code-page"><div class="qpanel">
    <button class="btn btn-sm" style="margin-bottom:14px;" onclick="nav('domains',{currentDomain:'${q.domain}'})">← Back</button>
    <div class="qtop"><h2>${esc(q.title)}</h2></div>
    <div class="meta"><span class="pill ${q.difficulty}">${q.difficulty}</span><span class="tag-chip">${esc(q.topic)}</span><span class="tag-chip">${q.points}pts</span></div>
    <div class="desc">${esc(q.desc)}</div>
    ${examples.map((ex,i)=>`<div class="sample-block"><h5>Example ${i+1}</h5><pre>In: ${esc(ex.input)}\nOut: ${esc(ex.output)}</pre></div>`).join('')}
    ${q.constraints?`<div class="constraints"><b>Constraints:</b> ${esc(q.constraints)}</div>`:''}
  </div><div class="editor-panel">
    <div class="editor-bar">
      <select onchange="changeLang('${q.id}',this.value)">${langOptions.map(o=>`<option value="${o.v}" ${o.v===lang?'selected':''}>${o.l}</option>`).join('')}</select>
      <div class="ebtns"><button class="btn btn-sm" onclick="resetCode('${q.id}')">Reset</button><button class="btn btn-sm" onclick="runCode('${q.id}',true)">Run sample</button><button class="btn btn-primary btn-sm" onclick="askSubmitConfirm('${q.id}')">Submit</button></div>
    </div>
    <div class="editor" id="code-editor"></div>
    <div class="console"><div class="console-head"><span class="console-tab active">Output</span></div><div class="console-body" id="console-body">${renderConsole(q)}</div></div>
  </div></div>
  ${state.confirmSubmitId===q.id?`<div class="modal-overlay" onclick="if(event.target===this)cancelSubmit()"><div class="modal-box"><h4>Submit solution?</h4><p>Runs all test cases for "${esc(q.title)}". Pass all to earn ${q.points} points.</p><div class="modal-actions"><button class="btn" onclick="cancelSubmit()">Cancel</button><button class="btn btn-primary" onclick="confirmSubmitYes()">Submit</button></div></div></div>`:''}`;
}
function renderConsole(q){
  if(!q.mode) return '';
  const lang = state.lang[q.id];
  if(q.mode==='js'&&lang!=='javascript') return `<div class="note-box">Switch to "JavaScript (runs live)" to run test cases. Other languages are practice-only in this demo.</div>`;
  if(!state.runResult) return `<div class="note-box">Click "Run sample" for first test case, or "Submit" for all.</div>`;
  return state.runResult;
}
function changeLang(id, lang){
  state.lang[id]=lang;
  const q=QUESTIONS.find(x=>x.id===id);
  const key=id+'::'+lang;
  if(state.code[key]===undefined) state.code[key]=scaffold(lang,q);
  state.runResult=null; render();
}
function resetCode(id){
  const q=QUESTIONS.find(x=>x.id===id);
  const lang=state.lang[id];
  state.code[id+'::'+lang]=scaffold(lang,q);
  state.runResult=null; render();
}
function runCode(id, onlySample){
  const q=QUESTIONS.find(x=>x.id===id);
  const lang=state.lang[id];
  const code=state.code[id+'::'+lang]||'';
  if(q.mode==='js'){
    if(lang!=='javascript'){ render(); return; }
    const results=runJsProblem(q,code,onlySample);
    const allPass=results.every(r=>r.pass);
    state.runResult=`${results.map((r,i)=>`<div class="tcase ${r.pass?'pass':'fail'}"><div class="thead"><span>Test ${i+1}</span><span class="${r.pass?'ok':'no'}">${r.pass?'✓ Passed':'✗ Failed'}</span></div><div>Input: ${esc(r.input)}</div><div>Expected: ${esc(r.expected)}</div><div>Got: ${esc(r.actual)}</div></div>`).join('')}${(!onlySample&&allPass)?markSolved(q):''}${(!onlySample&&!allPass)?`<div class="note-box">Not all passed. All ${results.length} tests checked.</div>`:''}`;
  } else if(q.mode==='mongo'){
    const r=runMongoProblem(q,code);
    state.runResult=r.error?`<div class="tcase fail"><div class="thead"><span>Error</span><span class="no">✗</span></div>${esc(r.error)}</div>`:`<div class="tcase ${r.pass?'pass':'fail'}"><div class="thead"><span>Result</span><span class="${r.pass?'ok':'no'}">${r.pass?'✓ Match':'✗ No match'}</span></div><div>Matched ${r.matched.length} docs: ${r.matched.map(d=>d.name).join(', ')||'(none)'}</div></div>${(!onlySample&&r.pass)?markSolved(q):''}`;
  } else if(q.mode==='sql'){
    const r=runSqlProblem(q,code);
    state.runResult=`<div class="tcase ${r.pass?'pass':'fail'}"><div class="thead"><span>Pattern check</span><span class="${r.pass?'ok':'no'}">${r.pass?'✓ Passed':'✗ Missing '+r.missingCount+'/'+r.total}</span></div></div>${(!onlySample&&r.pass)?markSolved(q):''}`;
  }
  render();
}
function askSubmitConfirm(id){
  const q=QUESTIONS.find(x=>x.id===id);
  const lang=state.lang[id];
  if(q.mode==='js'&&lang!=='javascript'){ runCode(id,false); return; }
  state.confirmSubmitId=id; render();
}
function cancelSubmit(){ state.confirmSubmitId=null; render(); }
function confirmSubmitYes(){ const id=state.confirmSubmitId; state.confirmSubmitId=null; runCode(id,false); }
function markSolved(q){
  if(state.currentUser&&!state.currentUser.solved[q.id]){
    state.currentUser.solved[q.id]=true;
    state.currentUser.points=(state.currentUser.points||0)+q.points;
    state.users[state.currentUser.email].solved=state.currentUser.solved;
    state.users[state.currentUser.email].points=state.currentUser.points;
  }
  return `<div class="note-box" style="background:rgba(52,211,153,.1);color:var(--success);">🎉 All passed! Solved. +${q.points}pts.</div>`;
}

/* ---- Quiz ---- */
function renderQuiz(){
  if(!state.currentUser) return renderLogin();
  if(state.quizSubmitted){
    let score=0; QUIZ.forEach(q=>{if(state.quizAnswers[q.id]===q.correct)score++;});
    return `${navBar()}<div class="page-head"><h1>Quiz results</h1><p>${score}/${QUIZ.length} correct.</p></div>
    <div class="dash-grid" style="grid-template-columns:1fr;">${QUIZ.map(q=>{const c=state.quizAnswers[q.id];return `<div class="quiz-card"><div class="qn">${q.domain.toUpperCase()}</div><h4>${esc(q.q)}</h4><pre>${esc(q.code)}</pre>${q.options.map((o,i)=>`<div class="opt ${i===q.correct?'correct':(i===c?'wrong':'')}">${o}${i===q.correct?' ✓':''}</div>`).join('')}<div style="font-size:12px;color:var(--text-muted);margin-top:6px;">${esc(q.explain)}</div></div>`;}).join('')}
    <button class="btn btn-primary" onclick="retakeQuiz()">Retake</button></div>${footer()}`;
  }
  return `${navBar()}<div class="page-head"><h1>Technical quiz</h1><p>Code-based multiple choice.</p></div>
  <div class="dash-grid" style="grid-template-columns:1fr;">${QUIZ.map(q=>`<div class="quiz-card"><div class="qn">${q.domain.toUpperCase()}</div><h4>${esc(q.q)}</h4><pre>${esc(q.code)}</pre>${q.options.map((o,i)=>`<div class="opt ${state.quizAnswers[q.id]===i?'selected':''}" onclick="selectQuiz('${q.id}',${i})"><input type="radio" name="${q.id}" ${state.quizAnswers[q.id]===i?'checked':''}> ${esc(o)}</div>`).join('')}</div>`).join('')}
  <button class="btn btn-primary" onclick="submitQuiz()">Submit quiz</button></div>${footer()}`;
}
function selectQuiz(id,idx){ state.quizAnswers[id]=idx; render(); }
function submitQuiz(){ state.quizSubmitted=true; render(); }
function retakeQuiz(){ state.quizAnswers={};state.quizSubmitted=false; render(); }

/* ---- Mock Interview ---- */
function renderInterview(){
  if(!state.currentUser) return renderLogin();
  const iv=state.interview;
  if(iv.phase==='setup') return `${navBar()}<div class="page-head"><h1>🎤 AI mock interview</h1><p>Paste your resume for tailored HR questions with AI feedback.</p></div>
    <div class="interview-hero">${iv.error?`<div class="form-msg err">${esc(iv.error)}</div>`:''}
    <div class="interview-card"><div class="field"><label>Target role</label><input id="iv-role" type="text" placeholder="e.g. Backend Developer" value="${esc(iv.role)}"></div>
    <div class="field"><label>Resume</label><textarea id="iv-resume" rows="8" placeholder="Paste your experience, projects, skills here...">${esc(iv.resumeText)}</textarea></div>
    <div class="field"><label>Claude API key <span style="color:var(--text-dim);font-weight:400;">(optional — uses offline mode if empty)</span></label><input id="iv-apikey" type="password" placeholder="sk-ant-..." value="${esc(iv.apiKey||'')}"></div>
    <button class="btn btn-primary" style="width:100%;" onclick="generateInterview()">Generate interview</button>
    <div class="note-box" style="margin-top:12px;">HR-round style questions (behavioral, motivation, culture-fit) — not coding rounds. Powered by Claude when API key is provided, offline engine otherwise.</div>
    </div></div>${footer()}`;
  if(iv.phase==='loading') return `${navBar()}<div class="page-head"><h1>🎤 AI mock interview</h1></div><div class="interview-hero"><div class="interview-card"><div class="loader-line"><span class="loader-dot"></span><span class="loader-dot"></span><span class="loader-dot"></span> Preparing questions...</div></div></div>${footer()}`;
  if(iv.phase==='session'){
    const q=iv.questions[iv.currentQ]; const fb=iv.feedbacks[iv.currentQ];
    return `${navBar()}<div class="page-head"><h1>🎤 Mock — ${esc(iv.role)}</h1></div>
    <div class="interview-hero"><div class="interview-card"><div class="qcounter">Q${iv.currentQ+1}/${iv.questions.length}</div>
    <h4 style="font-size:15px;margin-bottom:14px;">${esc(q)}</h4>
    ${iv.error?`<div class="form-msg err">${esc(iv.error)}</div>`:''}
    <textarea id="iv-answer" rows="5" placeholder="Your answer..." ${fb?'disabled':''}>${fb?esc(iv.answers[iv.currentQ]):''}</textarea>
    ${iv.loading?`<div class="loader-line"><span class="loader-dot"></span><span class="loader-dot"></span><span class="loader-dot"></span> Reviewing...</div>`:''}
    ${fb?`<div class="feedback-box"><span class="score-badge ${fb.score>=7?'hi':fb.score>=4?'mid':'lo'}">${fb.score?fb.score+'/10':'Feedback'}</span><div style="margin-top:6px;">${esc(fb.feedback)}</div></div>
    <button class="btn btn-primary" style="width:100%;margin-top:14px;" onclick="nextInterviewQuestion()">${iv.currentQ<iv.questions.length-1?'Next →':'See summary →'}</button>`:
    `<button class="btn btn-primary" style="width:100%;margin-top:12px;" onclick="submitInterviewAnswer()" ${iv.loading?'disabled':''}>Submit answer</button>`}
    </div></div>${footer()}`;
  }
  const o=iv.overall;
  return `${navBar()}<div class="page-head"><h1>🎤 Interview summary</h1></div><div class="interview-hero">
    ${!o?`<div class="interview-card"><div class="loader-line"><span class="loader-dot"></span><span class="loader-dot"></span><span class="loader-dot"></span> Generating summary...</div></div>`:
    `<div class="interview-card">${o.avg!==null?`<span class="score-badge ${o.avg>=7?'hi':o.avg>=4?'mid':'lo'}">Avg: ${o.avg.toFixed(1)}/10</span>`:''}
    <p style="margin-top:12px;font-size:13.5px;color:#C7D0E6;">${esc(o.summary||'')}</p>
    ${o.strengths&&o.strengths.length?`<h5 style="margin-top:14px;color:var(--success);font-size:12px;">Strengths</h5><ul style="margin:6px 0 0 16px;font-size:13px;color:var(--text-muted);">${o.strengths.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`:''}
    ${o.improve&&o.improve.length?`<h5 style="margin-top:14px;color:var(--warn);font-size:12px;">Room to improve</h5><ul style="margin:6px 0 0 16px;font-size:13px;color:var(--text-muted);">${o.improve.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`:''}
    </div>
    <div class="interview-card"><h5 style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">Transcript</h5>${iv.questions.map((q,i)=>`<div style="margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--border);"><div style="font-size:13px;font-weight:600;">Q${i+1}. ${esc(q)}</div><div style="font-size:12.5px;color:var(--text-muted);">${esc(iv.answers[i]||'')}</div>${iv.feedbacks[i]?`<div style="font-size:12px;color:var(--text-dim);">${iv.feedbacks[i].score?'Score: '+iv.feedbacks[i].score+'/10 — ':''}${esc(iv.feedbacks[i].feedback)}</div>`:''}</div>`).join('')}</div>
    <button class="btn btn-primary" onclick="restartInterview()">New interview</button>`}
  </div>${footer()}`;
}

/* ---- CLASSROOM / CLASS CONNECT ---- */
function renderCourses(){
  if(!state.currentUser) return renderLogin();
  const courses = state.courses;
  const isTeacher = state.currentUser.role==='TEACHER';
  return `${navBar()}<div class="page-head flex-between"><div><h1>📚 My classrooms</h1><p>${isTeacher?'Manage your courses':'Join and view your courses'}.</p></div>
    <div style="display:flex;gap:8px;">
      ${isTeacher?`<button class="btn btn-primary btn-sm" onclick="showCreateCourse()">+ New course</button>`:''}
      <button class="btn btn-sm" onclick="showJoinCourse()">Join course</button>
    </div></div>
  <div class="page-head" style="padding-top:6px;">
    ${courses.length===0?`<div class="empty-state"><p>No courses yet. ${isTeacher?'Create a course to get started.':'Join a course using the code from your teacher.'}</p></div>`:
    `<div class="course-grid">${courses.map(c=>`<div class="course-card" onclick="viewCourse(${c.id})"><div class="ccode">${c.code}</div><h3>${esc(c.title)}</h3><p>${esc(c.description||'')}</p><div class="cinfo"><span>👤 ${c.teacherName||'Teacher'}</span><span>📝 ${c.assignmentCount||0} assignments</span><span>👥 ${c.studentCount||0} students</span></div></div>`).join('')}</div>`}
  </div>
  ${state.showCreateModal?`<div class="modal-overlay" onclick="closeModal()"><div class="modal-box"><h4>Create course</h4>
    <div class="field"><label>Course title</label><input id="new-course-title" placeholder="e.g. Data Structures"></div>
    <div class="field"><label>Description</label><textarea id="new-course-desc" rows="3" placeholder="Optional description"></textarea></div>
    <div class="modal-actions"><button class="btn" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="createCourse()">Create</button></div></div></div>`:''}
  ${state.showJoinModal?`<div class="modal-overlay" onclick="closeModal()"><div class="modal-box"><h4>Join course</h4>
    <div class="field"><label>Course code</label><input id="join-course-code" placeholder="e.g. ABC123" style="text-transform:uppercase;font-family:var(--mono);"></div>
    <div class="modal-actions"><button class="btn" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="joinCourse()">Join</button></div></div></div>`:''}
  ${footer()}`;
}
function showCreateCourse(){ state.showCreateModal=true; render(); }
function showJoinCourse(){ state.showJoinModal=true; render(); }
function closeModal(){ state.showCreateModal=false; state.showJoinModal=false; render(); }
function createCourse(){
  const title = document.getElementById('new-course-title').value.trim();
  const desc = document.getElementById('new-course-desc').value.trim();
  if(!title){ alert('Enter a course title'); return; }
  const code = Math.random().toString(36).substring(2,8).toUpperCase();
  const course = {id:Date.now(),title,description:desc,code,teacherName:state.currentUser.name,assignmentCount:0,studentCount:0,assignments:[]};
  state.courses.push(course);
  state.showCreateModal=false; saveState(); render();
}
function joinCourse(){
  const code = document.getElementById('join-course-code').value.trim().toUpperCase();
  if(!code){ alert('Enter a course code'); return; }
  // Simulate finding a course — in production would call backend
  // For demo, create a sample course if none exists
  if(state.courses.length===0){
    state.courses.push({id:1,title:'Data Structures',description:'Learn arrays, linked lists, trees, graphs',code:'DS101',teacherName:'Prof. Smith',assignmentCount:0,studentCount:1,assignments:[]});
  }
  const found = state.courses.find(c=>c.code===code);
  if(found){ alert(`Joined "${found.title}"!`); state.showJoinModal=false; saveState(); render(); }
  else {
    // Auto-create a placeholder course for demo
    const c = {id:Date.now(),title:'Course '+code,description:'Joined via code',code,teacherName:'Instructor',assignmentCount:0,studentCount:1,assignments:[]};
    state.courses.push(c);
    state.showJoinModal=false; saveState(); render();
  }
}
function viewCourse(courseId){
  state.currentCourse = state.courses.find(c=>c.id===courseId);
  if(state.currentCourse) nav('course-detail');
}

function renderCourseDetail(){
  if(!state.currentUser||!state.currentCourse) return renderCourses();
  const c = state.currentCourse;
  const isTeacher = state.currentUser.role==='TEACHER';
  return `${navBar()}<div class="page-head"><button class="btn btn-sm" onclick="nav('courses')" style="margin-bottom:8px;">← All courses</button>
    <div class="flex-between"><div><h1>${esc(c.title)}</h1><p>${esc(c.description||'')} &middot; Code: <b style="font-family:var(--mono);color:var(--brand);">${c.code}</b></p></div>
    ${isTeacher?`<button class="btn btn-primary btn-sm" onclick="showNewAssignment()">+ New assignment</button>`:''}</div>
  </div>
  <div class="page-head" style="padding-top:6px;">
    <h3 style="font-size:15px;margin-bottom:12px;">Assignments (${(c.assignments||[]).length})</h3>
    ${(!c.assignments||c.assignments.length===0)?`<div class="empty-state">No assignments yet. ${isTeacher?'Create one to get started.':''}</div>`:
    `<div class="assignment-list">${c.assignments.map(a=>`
      <div class="assignment-item" onclick="viewAssignment(${a.id})">
        <div class="ai-left"><h4>${esc(a.title)}</h4><p>${esc(a.description||'')}</p></div>
        <div class="ai-right"><div>Due: ${a.dueDate||'No deadline'}</div><div style="color:var(--brand);">${a.submissionCount||0} submitted</div></div>
      </div>`).join('')}</div>`}
  </div>
  ${state.showNewAssignmentModal?`<div class="modal-overlay" onclick="closeAssignmentModal()"><div class="modal-box" style="max-width:500px;"><h4>New assignment</h4>
    <div class="field"><label>Title</label><input id="new-assignment-title"></div>
    <div class="field"><label>Description</label><textarea id="new-assignment-desc" rows="3"></textarea></div>
    <div class="field"><label>Max score</label><input id="new-assignment-max" type="number" value="100"></div>
    <div class="field"><label>Due date (ISO format, optional)</label><input id="new-assignment-due" placeholder="e.g. 2026-08-15T23:59:00"></div>
    <div class="modal-actions"><button class="btn" onclick="closeAssignmentModal()">Cancel</button><button class="btn btn-primary" onclick="createAssignment()">Create</button></div></div></div>`:''}
  ${footer()}`;
}
function showNewAssignment(){ state.showNewAssignmentModal=true; render(); }
function closeAssignmentModal(){ state.showNewAssignmentModal=false; render(); }
function createAssignment(){
  const title = document.getElementById('new-assignment-title').value.trim();
  if(!title){ alert('Enter a title'); return; }
  const a = {id:Date.now(),title,description:document.getElementById('new-assignment-desc').value.trim(),
    maxScore:parseInt(document.getElementById('new-assignment-max').value)||100,
    dueDate:document.getElementById('new-assignment-due').value||null,
    submissions:[],submissionCount:0,createdAt:new Date().toISOString()};
  if(!state.currentCourse.assignments) state.currentCourse.assignments=[];
  state.currentCourse.assignments.push(a);
  state.showNewAssignmentModal=false; saveState(); render();
}
function viewAssignment(assignmentId){
  const c = state.currentCourse;
  if(!c||!c.assignments) return;
  state.currentAssignment = c.assignments.find(a=>a.id===assignmentId);
  if(state.currentAssignment) nav('assignment-detail');
}

function renderAssignmentDetail(){
  if(!state.currentUser||!state.currentAssignment) return renderCourses();
  const a = state.currentAssignment;
  const c = state.currentCourse;
  const isTeacher = state.currentUser.role==='TEACHER';
  const submissions = a.submissions||[];
  return `${navBar()}<div class="page-head"><button class="btn btn-sm" onclick="nav('course-detail')" style="margin-bottom:8px;">← Back to ${esc(c.title)}</button>
    <h1>${esc(a.title)}</h1>
    <p>${esc(a.description||'')}</p>
    <div style="display:flex;gap:16px;margin-top:8px;font-size:13px;color:var(--text-muted);">
      <span>Max score: <b>${a.maxScore}</b></span>
      <span>Due: <b>${a.dueDate||'No deadline'}</b></span>
      <span>Submissions: <b>${submissions.length}</b></span>
    </div>
  </div>
  <div class="page-head" style="padding-top:6px;">
    ${isTeacher?`
      <h3 style="font-size:15px;margin-bottom:10px;">Grade submissions</h3>
      ${submissions.length===0?`<div class="empty-state">No submissions yet.</div>`:
      `<table><tr><th>Student</th><th>Submitted</th><th>Status</th><th>Score</th><th>Action</th></tr>
      ${submissions.map((s,i)=>`<tr>
        <td>${s.studentName||'Student'}</td>
        <td style="font-size:12px;">${new Date(s.submittedAt).toLocaleString()}</td>
        <td>${s.score!==null?`<span class="badge graded">Graded</span>`:`<span class="badge submitted">Pending</span>`}${s.late?` <span class="badge late">Late</span>`:''}</td>
        <td>${s.score!==null?s.score+'/'+a.maxScore:'—'}</td>
        <td>${s.score===null?`<button class="btn btn-sm" onclick="gradeSubmission(${s.id})">Grade</button>`:`<button class="btn btn-sm" onclick="gradeSubmission(${s.id})">Edit</button>`}</td>
      </tr>`).join('')}</table>`}
    `:`
      <div class="card"><h3>Submit your work</h3>
      ${state.currentUser.submissionContent!==undefined?`
        <div class="note-box" style="color:var(--success);">Submitted at ${new Date().toLocaleString()}.</div>`:`
        <div class="field"><label>Your answer / content</label><textarea id="assignment-answer" rows="5"></textarea></div>
        <button class="btn btn-primary" onclick="submitAssignmentWork(${a.id})">Submit assignment</button>
      `}</div>
    `}
    ${isTeacher && submissions.length>0?`
    <div class="card" style="margin-top:16px;">
      <h3>📊 Analytics</h3>
      <div class="stat-row" style="grid-template-columns:repeat(3,1fr);">
        <div class="stat-box"><b>${submissions.length}</b><span>Submitted</span></div>
        <div class="stat-box"><b>${submissions.filter(s=>s.score!==null).length}</b><span>Graded</span></div>
        <div class="stat-box"><b>${submissions.filter(s=>s.score!==null).length>0?Math.round(submissions.filter(s=>s.score!==null).reduce((sum,s)=>sum+s.score,0)/submissions.filter(s=>s.score!==null).length*10)/10:'—'}</b><span>Avg score</span></div>
      </div>
    </div>`:''}
  </div>
  ${state.gradingSubmission?`<div class="modal-overlay" onclick="closeGradeModal()"><div class="modal-box"><h4>Grade submission</h4>
    <div class="field"><label>Score (0-${a.maxScore})</label><input id="grade-score" type="number" max="${a.maxScore}" value="${state.gradingSubmission.score||''}"></div>
    <div class="field"><label>Feedback</label><textarea id="grade-feedback" rows="3">${state.gradingSubmission.feedback||''}</textarea></div>
    <div class="modal-actions"><button class="btn" onclick="closeGradeModal()">Cancel</button><button class="btn btn-primary" onclick="saveGrade(${state.gradingSubmission.id})">Save grade</button></div></div></div>`:''}
  ${footer()}`;
}
function submitAssignmentWork(assignmentId){
  const content = document.getElementById('assignment-answer').value.trim();
  if(!content){ alert('Write something before submitting.'); return; }
  const a = state.currentAssignment;
  if(!a.submissions) a.submissions=[];
  a.submissions.push({id:Date.now(),studentName:state.currentUser.name,submittedAt:new Date().toISOString(),score:null,feedback:null,late:false,content});
  a.submissionCount = (a.submissionCount||0)+1;
  state.currentUser.submissionContent=content;
  saveState(); render();
}
function gradeSubmission(submissionId){
  const a = state.currentAssignment;
  state.gradingSubmission = (a.submissions||[]).find(s=>s.id===submissionId);
  render();
}
function closeGradeModal(){ state.gradingSubmission=null; render(); }
function saveGrade(submissionId){
  const score = parseInt(document.getElementById('grade-score').value);
  const feedback = document.getElementById('grade-feedback').value.trim();
  if(isNaN(score)){ alert('Enter a valid score'); return; }
  const a = state.currentAssignment;
  const sub = (a.submissions||[]).find(s=>s.id===submissionId);
  if(sub){ sub.score=score; sub.feedback=feedback; }
  state.gradingSubmission=null; saveState(); render();
}

/* ---- SETTINGS ---- */
function renderSettings(){
  if(!state.currentUser) return renderLogin();
  const u = state.currentUser;
  return `${navBar()}<div class="page-head"><h1>Settings</h1><p>Update your profile.</p></div>
  <div class="settings-wrap"><div class="card">
    ${state.authMsg?`<div class="form-msg ${state.authMsg.type}">${esc(state.authMsg.text)}</div>`:''}
    <div class="field"><label>Profile picture</label><div class="avatar-pick">${AVATARS.map(a=>`<div class="avatar-opt ${u.avatar===a?'sel':''}" onclick="pickAvatar('${a}')">${a}</div>`).join('')}</div></div>
    <div class="field"><label>Name</label><input id="set-name" type="text" value="${esc(u.name)}"></div>
    <div class="field"><label>Email</label><input id="set-email" type="email" value="${esc(u.email)}"></div>
    <button class="btn btn-primary" onclick="saveSettings()">Save changes</button>
  </div></div>${footer()}`;
}
function pickAvatar(a){ state.currentUser.avatar=a; state.users[state.currentUser.email].avatar=a; saveState(); render(); }
function saveSettings(){
  const name=document.getElementById('set-name').value.trim();
  const email=document.getElementById('set-email').value.trim();
  if(!name||!email){ state.authMsg={type:'err',text:'Fields cannot be empty.'}; render(); return; }
  const old=state.currentUser.email; const rec=state.users[old]; rec.name=name;
  if(email!==old){ delete state.users[old]; state.users[email]=rec; }
  state.currentUser=Object.assign({email},rec);
  state.authMsg={type:'ok',text:'Profile updated.'}; saveState(); render();
}

/* ---- Pricing ---- */
function renderPricing(){
  return `${navBar()}<div class="page-head" style="text-align:center;"><h1>Simple pricing</h1><p>Free to start. Pro for deeper learning. Teams for classrooms.</p></div>
  <div class="section"><div class="price-grid">
    <div class="price-card"><h3>Free</h3><div class="amt">₹0<span>/mo</span></div>
      <ul><li>✅ All 5 coding domains</li><li>✅ Sample problem bank</li><li>✅ In-browser judge</li><li>✅ Leaderboard</li><li>✅ Quizzes</li><li>— No detailed explanations</li><li>— Limited classroom features</li></ul>
      <button class="btn" style="width:100%;" onclick="nav('signup')">Get started</button>
    </div>
    <div class="price-card pro"><div class="ptag">Popular</div>
      <h3>Pro</h3><div class="amt">₹399<span>/mo</span></div>
      <ul><li>✅ Everything in Free</li><li>✅ Detailed problem editorials</li><li>✅ Full classroom access</li><li>✅ Assignment grading tools</li><li>✅ Analytics & reports</li><li>✅ Priority new problems</li></ul>
      <button class="btn btn-primary" style="width:100%;" onclick="nav('signup')">Start Pro</button>
    </div>
    <div class="price-card"><h3>Teams</h3><div class="amt">Custom</div>
      <ul><li>✅ Everything in Pro</li><li>✅ Cohort dashboards</li><li>✅ Custom problem sets</li><li>✅ SSO & admin</li><li>✅ Dedicated support</li></ul>
      <button class="btn" style="width:100%;" onclick="nav('landing')">Contact</button>
    </div>
  </div></div>${footer()}`;
}

/* ---- SEED DEMO DATA ---- */
function seedDemoData(){
  if(state.courses.length>0) return;
  const now = new Date();
  const due1 = new Date(now); due1.setDate(due1.getDate()+7);
  const due2 = new Date(now); due2.setDate(due2.getDate()+14);
  state.courses.push({
    id:1, title:'Data Structures', code:'DS101',
    description:'Arrays, linked lists, trees, graphs — implement and analyze fundamental data structures.',
    teacherName:'Prof. Smith', assignmentCount:3, studentCount:1,
    assignments:[
      {id:101,title:'Array List Implementation',description:'Implement a dynamic array with add, remove, get, and size methods.',maxScore:100,dueDate:due1.toISOString().slice(0,16),submissions:[],submissionCount:0,createdAt:now.toISOString()},
      {id:102,title:'Binary Search Tree',description:'Implement insert, search, and inorder traversal for a BST.',maxScore:100,dueDate:due2.toISOString().slice(0,16),submissions:[],submissionCount:0,createdAt:now.toISOString()},
      {id:103,title:'Graph BFS/DFS',description:'Implement BFS and DFS traversal on an adjacency list graph.',maxScore:80,dueDate:null,submissions:[],submissionCount:0,createdAt:now.toISOString()},
    ]
  });
  state.courses.push({
    id:2, title:'Web Development', code:'WEB202',
    description:'HTML, CSS, JavaScript, React — build modern web apps.',
    teacherName:'Prof. Smith', assignmentCount:2, studentCount:1,
    assignments:[
      {id:201,title:'Responsive Portfolio Page',description:'Build a responsive personal portfolio page using CSS Grid and Flexbox.',maxScore:100,dueDate:due1.toISOString().slice(0,16),submissions:[],submissionCount:0,createdAt:now.toISOString()},
      {id:202,title:'React Todo App',description:'Create a Todo application with React including add, complete, and delete.',maxScore:100,dueDate:null,submissions:[],submissionCount:0,createdAt:now.toISOString()},
    ]
  });
  state.courses.push({
    id:3, title:'Database Systems', code:'DB303',
    description:'SQL queries, normalization, indexing, and MongoDB.',
    teacherName:'Dr. Patel', assignmentCount:2, studentCount:1,
    assignments:[
      {id:301,title:'SQL Join Queries',description:'Write SQL queries using INNER JOIN, LEFT JOIN, and subqueries on a sample database.',maxScore:80,dueDate:due1.toISOString().slice(0,16),submissions:[],submissionCount:0,createdAt:now.toISOString()},
      {id:302,title:'MongoDB Aggregation',description:'Write MongoDB aggregation pipelines for grouping, sorting, and filtering.',maxScore:80,dueDate:due2.toISOString().slice(0,16),submissions:[],submissionCount:0,createdAt:now.toISOString()},
    ]
  });
  saveState();
}

/* ---- MAIN RENDER ---- */
function render(){
  const app = document.getElementById('app');
  let html='';
  switch(state.view){
    case 'landing': html=renderLanding(); break;
    case 'login': html=renderLogin(); break;
    case 'signup': html=renderSignup(); break;
    case 'forgot': html=renderForgot(); break;
    case 'dashboard': html=renderDashboard(); break;
    case 'domains': html=renderDomains(); break;
    case 'coding': html=renderCoding(); break;
    case 'quiz': html=renderQuiz(); break;
    case 'interview': html=renderInterview(); break;
    case 'settings': html=renderSettings(); break;
    case 'pricing': html=renderPricing(); break;
    case 'courses': html=renderCourses(); break;
    case 'course-detail': html=renderCourseDetail(); break;
    case 'assignment-detail': html=renderAssignmentDetail(); break;
    default: html=renderLanding();
  }
  app.innerHTML = html;
  if(state.view==='coding'){
    const q = QUESTIONS.find(x=>x.id===state.currentProblem);
    const lang = state.lang[q?.id];
    const key = q?.id+'::'+lang;
    const el = document.getElementById('code-editor');
    if(el && typeof CodeMirror !== 'undefined'){
      if(state._cm) try{ state._cm.toTextArea(); }catch(e){}
      const modeMap = {javascript:'javascript',java:'text/x-java',python:'python',c:'text/x-csrc',sql:'text/x-sql',mongodb:'text/x-sql'};
      const opts = {
        value: state.code[key]||'',
        mode: modeMap[lang]||'javascript',
        theme: 'dracula',
        indentUnit: 2, tabSize: 2, indentWithTabs: false,
        electricChars: true,
        lineNumbers: true,
        styleActiveLine: {nonEmpty: true},
        matchBrackets: true,
        autoCloseBrackets: true,
        gutters: ['CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
        foldGutter: {rangeFinder: new CodeMirror.fold.combine(
          CodeMirror.fold.brace, CodeMirror.fold.indent, CodeMirror.fold.comment
        )},
        lint: lang==='javascript' ? {esversion: 6} : false,
        extraKeys: {
          'Tab': (cm) => cm.execCommand('insertSoftTab'),
          'Ctrl-F': (cm) => cm.execCommand('find'),
          'Ctrl-H': (cm) => cm.execCommand('replace'),
          'Ctrl-D': (cm) => cm.execCommand('findNext'),
          'Alt-G': (cm) => cm.execCommand('jumpToLine'),
          'Ctrl-S': () => runCode(q?.id,true)
        }
      };
      state._cm = CodeMirror(el, opts);
      state._cm.on('change', (_, change)=>{
        state.code[key]=state._cm.getValue();
        if(change.origin==='paste' && change.text.length>1){
          setTimeout(()=>{
            for(let i=change.from.line; i<=change.from.line+change.text.length-1; i++)
              state._cm.indentLine(i, 'smart');
          }, 10);
        }
      });
    }
  } else {
    if(state._cm){ try{ state._cm.toTextArea(); }catch(e){} state._cm=null; }
  }
}
document.addEventListener('click', e=>{ if(state.dropdownOpen&&!e.target.closest('.dropdown')){ state.dropdownOpen=false; render(); } });
loadState(); seedDemoData(); render();
