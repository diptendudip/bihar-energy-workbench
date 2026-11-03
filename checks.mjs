import assert from 'node:assert/strict';
import fs from 'node:fs';
import {cases,policies,SCHEMA,activePolicies,makeAnswer,reviewCorrection,initialState,classifyQuestion,metrics,filterCases,escapeHTML} from './public/demo-core.mjs';
import {sourceStories} from './public/cgnet-cases.mjs';
import {lookupAnswer} from './public/real-world.mjs';
import {createRealWorldUI} from './public/real-world-ui.mjs';
import {caseProfiles,actionPlans,workflowFor,caseStatus,closureReady,assignCase,saveActionDraft,recordStep,recordUpdate,closeCase,reopenCase,actionDraft,isOverdue} from './public/officer-workflow.mjs';

// Each fictional adaptation has one reviewed original-story reference. Story
// inspiration must never become a policy citation or a claimed current outcome.
assert.equal(cases.length,8);
assert.equal(new Set(cases.map(c=>c.sourceId)).size,8);
assert.equal(sourceStories.length,8);
const review=JSON.parse(fs.readFileSync(new URL('./evidence/cgnet-source-review.json',import.meta.url)));
assert.deepEqual(review.sources,sourceStories);
assert.deepEqual(review.mapping,cases.map(c=>({caseId:c.id,sourceId:c.sourceId,scenario:c.title})));
for(const source of sourceStories){
  const url=new URL(source.url);
  assert.equal(url.origin,'https://cgnetswara.org');
  assert.equal(source.id,`CGNET-${url.searchParams.get('id')}`);
  assert.equal(source.use,'theme_inspiration_only');
  assert.equal(source.currentStatusVerified,false);
  assert.ok(source.publishedAt>='2012-01-01'&&source.publishedAt<='2022-12-31');
  for(const field of ['title','summary','region'])assert.ok(source[field].en&&source[field].hi);
}
assert.ok(!/\b\d{10,11}\b/.test(JSON.stringify({cases,sourceStories})),'Unexpected phone-like number in published fixtures');

// The demo's consequential behavior: no unapproved correction or stale policy
// may inform a new answer. The examples must remain explicitly fictional.
for(const c of cases){
  assert.ok(c.id.startsWith('DEMO-'));
  assert.equal(c.dataOrigin,'fictional-adaptation');
  assert.ok(sourceStories.some(s=>s.id===c.sourceId));
  assert.ok(c.title.en&&c.title.hi&&c.text.en&&c.text.hi);
  assert.equal(activePolicies(c.kind).length,1);
  for(const mode of ['summary','policy','gaps','similar']){
    const a=makeAnswer(c,mode);
    assert.ok(a.sources.length);
    assert.ok(a.sources.every(id=>id.startsWith('SAMPLE-')&&policies.find(p=>p.id===id)?.state==='current'));
    assert.ok(a.related.every(id=>id!==c.id&&cases.some(x=>x.id===id)));
  }
}
const domain=initialState();
assert.equal(makeAnswer(cases[0],'summary',domain.corrections).reviewedNotes.length,0);
assert.throws(()=>reviewCorrection(domain,'COR-DEMO-01','approved'),/Reviewer/);
domain.role='reviewer';
reviewCorrection(domain,'COR-DEMO-01','approved');
assert.equal(makeAnswer(cases[0],'summary',domain.corrections).reviewedNotes.length,1);
assert.equal(makeAnswer(cases[1],'summary',domain.corrections).reviewedNotes.length,0);
assert.throws(()=>reviewCorrection(domain,'COR-DEMO-01','approved'),/not pending/);
for(const q of ['What compensation is due?','मुआवज़ा कितना मिलेगा?','What is the deadline?']){
  assert.equal(classifyQuestion(q),'unsupported');
  assert.deepEqual(makeAnswer(cases[0],classifyQuestion(q)).sources,[]);
}
assert.equal(classifyQuestion('send a message and close this case'),'action');
assert.equal(classifyQuestion('Tell me the capital of France'),'unknown');
assert.equal(classifyQuestion('कौन-सी जानकारी अनुपलब्ध है?'),'gaps');
assert.equal(makeAnswer(cases.find(c=>c.stale),'policy').versionBlocked,true);
assert.equal(filterCases('बक्सर','all').length,2);
assert.equal(filterCases('','waiting').length,2);
assert.equal(filterCases('zzzzzz','all').length,0);
const metric=metrics();
assert.equal(metric.baseline,15.5);assert.equal(metric.assisted,11);
assert.equal(metric.reduction.toFixed(1),'29.0');
assert.equal(escapeHTML('<img onerror="x">'), '&lt;img onerror=&quot;x&quot;&gt;');
console.log('PASS: data integrity, citation eligibility, correction gate, unsupported questions and metric calculations.');

// Exercise the human-led workflow independently of rendered buttons. An AI
// explanation or saved draft must never complete work or close a grievance.
const officer=initialState(),example=cases[0];
for(const c of cases){
 const p=caseProfiles[c.id];
 assert.equal(p.fictional,true);
 for(const key of ['name','house','village','panchayat','landmark','channel'])assert.ok(p[key].en&&p[key].hi);
 assert.match(p.contact,/X/,'Sample contact must be non-dialable');
 assert.ok(p.service.startsWith('DEMO-'));
 assert.equal(actionPlans[c.id].length,3);
 assert.equal(new Set(actionPlans[c.id].map(s=>s.id)).size,3);
 for(const s of actionPlans[c.id])for(const field of ['title','request','evidence'])assert.ok(s[field].en&&s[field].hi);
}
const beforeAnswer=JSON.stringify(officer);
makeAnswer(example,'policy',officer.corrections);
assert.equal(JSON.stringify(officer),beforeAnswer);
assert.throws(()=>closeCase(officer,example,{}),/closure/);
assert.throws(()=>assignCase(officer,example,{assigneeId:'SUPPLY-DEMO',dueDate:'2026-02-30',summary:'Check records'}),/date/);
assert.equal(Object.keys(officer.workflows).length,0);
assignCase(officer,example,{assigneeId:'SUPPLY-DEMO',dueDate:'2026-10-08',summary:'Review transformer inspection and prior requests.'});
assert.equal(isOverdue(officer,example),true);
const draft=actionDraft(officer,example,actionPlans[example.id][0]);
assert.ok(draft.includes('Sunita Devi')&&draft.includes('House 12')&&draft.includes('DEMO-TX-17'));
saveActionDraft(officer,example,'inspect',draft);
assert.equal(workflowFor(officer,example).status,'review');
assert.equal(Object.keys(workflowFor(officer,example).tasks).length,0);
assert.equal(workflowFor(officer,example).evidence.length,0);
assert.throws(()=>recordStep(officer,example,{stepId:'inspect',decision:'accepted',summary:'Inspected'}),/reference/);
assert.equal(Object.keys(workflowFor(officer,example).tasks).length,0);
recordStep(officer,example,{stepId:'inspect',decision:'accepted',summary:'Fictional field inspection logged.',reference:'DEMO-FIELD-001'});
assert.equal(caseStatus(officer,example),'progress');
assert.throws(()=>recordStep(officer,example,{stepId:'inspect',decision:'accepted',summary:'Duplicate',reference:'DEMO-DUP'}),/step/);
assert.throws(()=>recordUpdate(officer,example,{kind:'field',status:'resolved',summary:'Try to bypass officer closure.',reference:'DEMO-BYPASS',dueDate:'2026-10-10'}),/status/);
recordStep(officer,example,{stepId:'repair',decision:'modified',summary:'Fictional restoration note reviewed, with modified follow-up.',reference:'DEMO-RESTORATION-002'});
recordStep(officer,example,{stepId:'confirm',decision:'accepted',summary:'Fictional representative reports supply restored.',reference:'DEMO-CALL-003'});
assert.equal(caseStatus(officer,example),'review','Completing steps must not close the case');
assert.equal(closureReady(officer,example),true);
const closure={evidenceId:workflowFor(officer,example).evidence[1].id,reason:'Fictional restoration reviewed.',acknowledgement:'Sample representative confirmed on 9 October.',reference:'DEMO-ACK-004',confirmed:true};
assert.throws(()=>closeCase(officer,example,{...closure,confirmed:false}),/confirm/);
assert.throws(()=>closeCase(officer,example,{...closure,acknowledgement:''}),/acknowledgement/);
closeCase(officer,example,closure);
assert.equal(caseStatus(officer,example),'resolved');
assert.ok(filterCases('Sunita','resolved',officer).some(c=>c.id===example.id));
assert.equal(filterCases('उदयपुर','resolved',officer).length,1);
assert.throws(()=>recordUpdate(officer,example,{kind:'field'}),/closed/);
reopenCase(officer,example,{summary:'Fictional interruption recurred.',dueDate:'2026-10-10'});
assert.equal(caseStatus(officer,example),'review');
assert.equal(Object.keys(workflowFor(officer,example).tasks).length,0);
assert.ok(workflowFor(officer,example).audit.some(a=>a.type==='closed'));
assert.ok(!JSON.stringify(officer.events).includes('Sunita'),'Routine event counts must not include complainant identity');
const unassigned=cases.find(c=>c.id==='DEMO-1047');
assert.throws(()=>recordStep(officer,unassigned,{stepId:'register',decision:'accepted',summary:'Sample',reference:'DEMO-X'}),/assignee/);
const rejectedState=initialState(),billingCase=cases[1];
for(const s of actionPlans[billingCase.id])recordStep(rejectedState,billingCase,{stepId:s.id,decision:'rejected',summary:'Officer records why this suggestion is not appropriate for this rehearsal.'});
assert.equal(closureReady(rejectedState,billingCase),false,'Rejecting every suggestion is not evidence of resolution');
assert.equal(workflowFor(rejectedState,billingCase).evidence.length,0);
assert.equal(workflowFor(rejectedState,billingCase).audit[0].decision,'rejected');
assert.equal(caseStatus(officer,cases.find(c=>c.id==='DEMO-1048')),'resolved');
console.log('PASS: fictional identity/address records, assignment, draft boundaries, evidence requirements, manual closure, reopening, overdue dates and status-aware search.');

// Previously saved responses may contain a stale status alongside a historical
// live flag. Neither language may display that combination as live verified.
const freshnessState=initialState(),freshnessToasts=[];
const staleAnswer={...lookupAnswer(example,{question:'Which office?'}),answerId:'STALE-CHECK',directoryStatus:'stale',liveVerified:true};
const staleRoute={...staleAnswer.route,directoryStatus:'stale',liveVerified:true};
freshnessState.officeRoutes={[example.id]:{result:staleRoute}};
let freshnessLanguage='en';
const freshnessUI=createRealWorldUI({
 cases,getState:()=>freshnessState,t:(en,hi)=>freshnessLanguage==='hi'?hi:en,
 e:value=>escapeHTML(typeof value==='object'?(value[freshnessLanguage]??value.en):value),H:escapeHTML,
 button:()=>'',render(){},toast:text=>freshnessToasts.push(text)
});
for(const lang of ['en','hi']){
 freshnessLanguage=lang;
 const rendered=freshnessUI.answerHTML(staleAnswer,example);
 assert.ok(rendered.includes(lang==='en'?'Saved contacts · refresh failed':'सहेजे संपर्क · रिफ्रेश विफल'));
 assert.ok(!rendered.includes(lang==='en'?'Live website verified':'लाइव वेबसाइट से जाँच'));
 assert.ok(freshnessUI.casePanel(example).includes(lang==='en'?'Refresh failed. Retained contacts may be stale':'रिफ्रेश नहीं हुआ। पुराने संपर्क हो सकते हैं'));
 assert.ok(freshnessUI.answerHTML({...staleAnswer,directoryStatus:'live'},example).includes(lang==='en'?'Live website verified':'लाइव वेबसाइट से जाँच'));
}
freshnessLanguage='en';
const originalFetch=globalThis.fetch;
try{
 globalThis.fetch=async()=>Response.json(staleRoute);
 await freshnessUI.click('rw-refresh',{id:example.id});
 assert.equal(freshnessToasts.at(-1),'Live verification was incomplete. Check the linked source.');
 globalThis.fetch=async()=>{throw new Error('test connection outage');};
 await freshnessUI.click('rw-refresh',{id:example.id});
 assert.equal(freshnessState.officeRoutes[example.id].result.liveVerified,false);
}finally{globalThis.fetch=originalFetch;}
console.log('PASS: bilingual stale-source labels and refresh feedback never claim live verification.');

// Render/handler integration in a minimal DOM fixture. This checks application
// behavior without claiming browser layout or browser API compatibility QA.
const listeners={};
const legacyState={...initialState(),schema:1,notes:[{caseId:'DEMO-1047',text:'Obsolete scenario note'}]};
const memory=new Map([['bihar-energy-demo-v1',JSON.stringify(legacyState)]]);
const el=()=>({innerHTML:'',textContent:'',className:'',open:false,value:'',classList:{add(){},remove(){}},focus(){},select(){},addEventListener(){},showModal(){this.open=true;},close(){this.open=false;},scrollIntoView(){},getBoundingClientRect(){return {left:0,top:0,right:800,bottom:800};}});
const app=el(),dialog=el(),toast=el();
const elements={'#app':app,'#dialog':dialog,'#toast':toast,'#workflow-error':el()};
globalThis.document={activeElement:null,documentElement:{lang:'en'},title:'',querySelector:s=>elements[s]||el(),getElementById:()=>el(),addEventListener(type,fn){listeners[type]=fn;},createElement:()=>({...el(),click(){}})};
globalThis.window={innerWidth:1400,scrollTo(){}};
globalThis.sessionStorage={getItem:key=>memory.get(key)||null,setItem:(key,value)=>memory.set(key,value)};
globalThis.FormData=class{constructor(form){this.values=form.values;}get(k){return this.values[k]??null;}};
await import('./public/app.mjs');
const readState=()=>JSON.parse(memory.get('bihar-energy-demo-cgnet-v3'));
async function click(action,data={}) {const target={dataset:{action,...data}};await listeners.click({target:{closest:()=>target},preventDefault(){}});}
async function submit(id,values,dataset={}){await listeners.submit({target:{id,values,dataset},preventDefault(){}});}
function requireText(text){assert.ok(app.innerHTML.includes(text),`Missing in render: ${text}`);}
requireText('Start with the complaint.');requireText('Public office data');
requireText('Eight fictional cases, inspired by CGNet electricity reports.');
assert.equal(readState().schema,SCHEMA);
assert.equal(readState().notes.length,0,'Earlier scenario notes must not be attached to replacement cases');
assert.ok(!app.innerHTML.includes('class="sidebar"'));
assert.ok(!app.innerHTML.includes('class="stats-row"'));
assert.equal(readState().caseOpen,false);
await click('case',{id:'DEMO-1042'});
assert.equal(readState().caseOpen,true);
assert.equal(readState().detailTab,'actions');
requireText('Sunita Devi');requireText('House 12, School Lane');requireText('DEMO-CONS-1042');
requireText('Vivek Kumar');requireText('Obtain the transformer inspection report');
requireText('Record next action');
assert.ok(!app.innerHTML.includes('class="case-list"'));
assert.ok(app.innerHTML.includes('aria-label="Complaints"'));
await click('ask',{mode:'summary'});
requireText('Field inspection report');requireText('official directory');
assert.equal(readState().events.filter(e=>e.type==='ask').length,1);
assert.deepEqual(readState().workflows,{},'Requesting AI guidance must not mutate the operational workflow');
await click('source',{id:'SAMPLE-01'});
assert.ok(dialog.innerHTML.includes('FICTIONAL DOCUMENT'));
assert.ok(dialog.innerHTML.includes('No live verification'));
await click('close-modal');

await submit('ask-form',{question:'Which office is responsible for this?'});
requireText('ESS, Simri');requireText('7763814293');requireText('not a confirmed service-area assignment');
assert.ok(!app.innerHTML.includes('outside this simulation'));
assert.ok(!app.innerHTML.includes('Simulated'));
await click('rw-confirm',{id:'DEMO-1042'});
const candidate=readState().officeRoutes?.['DEMO-1042']?.result?.candidates?.[0];
const selectedId=candidate?.id??'SBPDCL-257';
await submit('office-confirm-form',{officeId:selectedId,confirmation:'Service section listed in SAMPLE-BILL-01'},{id:'DEMO-1042'});
requireText('Officer-confirmed in this tab');
await click('rw-draft',{id:'DEMO-1042'});
assert.ok(dialog.innerHTML.includes('To: JEE, ESS, Simri'));
assert.ok(dialog.innerHTML.includes('House 12, School Lane'));
assert.ok(dialog.innerHTML.includes('SAMPLE-BILL-01'));
await click('close-modal');
await click('nav',{view:'offices'});
await submit('office-lookup-form',{address:'काँटी, मुज़फ़्फ़रपुर',district:'Muzaffarpur'});
requireText('NBPDCL');requireText('9262398743');
await submit('office-lookup-form',{address:'Rajpur',district:''});
requireText('A district is needed');
await click('case',{id:'DEMO-1042'});

// A new correction cannot change a subsequent answer until review.
await click('correction');
assert.ok(dialog.innerHTML.includes('correction-form'));
await submit('correction-form',{reason:'Missing evidence',text:'Fixture correction: inspection outcome is missing.'});
const correction=readState().corrections.at(-1);
assert.equal(correction.status,'pending');
await click('ask',{mode:'summary'});
assert.equal(readState().answers['DEMO-1042'].reviewedNotes.length,0);
await click('nav',{view:'reviews'});requireText('Switch to Reviewer to decide');
await click('role',{role:'reviewer'});requireText('Approve note');
await click('review-decision',{id:correction.id,decision:'approved'});
await click('case',{id:'DEMO-1042'});await click('ask',{mode:'summary'});
requireText('Fixture correction: inspection outcome is missing.');

await click('note');await submit('note-form',{text:'A fictional note with <script>alert(1)</script>.'});
requireText('Your demo review notes');
requireText('&lt;script&gt;alert(1)&lt;/script&gt;');
assert.ok(!app.innerHTML.includes('<script>alert(1)</script>'));
await click('case',{id:'DEMO-1049'});await click('ask',{mode:'policy'});
requireText('An approved current document is needed');
assert.equal(readState().answers['DEMO-1049'].engine,'verified_lookup');
await submit('ask-form',{question:'What compensation is due?'});
requireText('They do not verify an applicable compensation amount');
assert.ok(!readState().answers['DEMO-1049'].sources.some(x=>x.id.startsWith('SAMPLE-')));
await click('language',{lang:'hi'});requireText('मार्गदर्शन');
assert.equal(document.documentElement.lang,'hi');
await click('language',{lang:'en'});

// Render every page, every case/tab and every supported question to catch
// missing data, bad templates and runtime errors across the complete fixture.
for(const view of ['offices','policies','reviews','insights','workbench']){
 await click('nav',{view});assert.ok(app.innerHTML.includes('<main'));
 assert.ok(!app.innerHTML.includes('undefined'));
}
await click('nav',{view:'insights'});assert.ok(!app.innerHTML.includes('29.0%'));requireText('not pilot results');
for(const c of cases){
 await click('case',{id:c.id});
 const source=sourceStories.find(s=>s.id===c.sourceId);
 for(const lang of ['en','hi']){
  await click('language',{lang});
  await click('origin',{id:c.id});
  assert.ok(dialog.innerHTML.includes(`href="${source.url}"`));
  assert.ok(dialog.innerHTML.includes(source.title[lang]));
  assert.ok(dialog.innerHTML.includes(source.publishedAt));
  assert.ok(dialog.innerHTML.includes(lang==='en'?'What is fictional here?':'यहाँ क्या काल्पनिक है?'));
  assert.ok(dialog.innerHTML.includes(lang==='en'?'not an official Bihar record or a policy source':'बिहार का आधिकारिक रिकॉर्ड या नीति स्रोत नहीं'));
  await click('close-modal');
 }
 await click('language',{lang:'en'});
 for(const tab of ['actions','guidance','history','documents'])await click('tab',{tab});
 await click('tab',{tab:'guidance'});
 for(const mode of ['office','next','summary','policy','gaps','similar']){
  await click('ask',{mode});assert.ok(!app.innerHTML.includes('undefined'));
 }
}
// Rehearse a complete officer journey through the actual forms and event handler.
await click('case',{id:'DEMO-1042'});
await click('wf-assign');assert.ok(dialog.innerHTML.includes('Responsible staff'));
await submit('workflow-form',{assigneeId:'SUPPLY-DEMO',dueDate:'2026-10-10',summary:'Fixture assignment: inspect the transformer record.'},{kind:'assign',caseId:'DEMO-1042'});
requireText('10 Oct 2026');
await click('wf-draft',{stepId:'inspect'});
assert.ok(dialog.innerHTML.includes('Published office contact: 7763814293'));
assert.ok(dialog.innerHTML.includes('Sunita Devi'));
await submit('workflow-form',{body:'Fixture request draft; no message sent.'},{kind:'draft',caseId:'DEMO-1042',stepId:'inspect'});
assert.equal(readState().workflows['DEMO-1042'].tasks.inspect,undefined);
await click('wf-step',{stepId:'inspect'});
await submit('workflow-form',{decision:'accepted',summary:'Attempt without evidence.'},{kind:'step',caseId:'DEMO-1042',stepId:'inspect'});
assert.ok(elements['#workflow-error'].textContent.includes('record reference'));
assert.equal(readState().workflows['DEMO-1042'].tasks.inspect,undefined);
for(const step of actionPlans['DEMO-1042']){
 await click('wf-step',{stepId:step.id});
 await submit('workflow-form',{decision:step.id==='repair'?'modified':'accepted',summary:`Fixture ${step.id} outcome <script>alert(1)</script>.`,reference:`DEMO-${step.id.toUpperCase()}-CHECK`},{kind:'step',caseId:'DEMO-1042',stepId:step.id});
}
requireText('&lt;script&gt;alert(1)&lt;/script&gt;');
assert.ok(!app.innerHTML.includes('<script>alert(1)</script>'));
await click('wf-update');
await submit('workflow-form',{kind:'citizen',summary:'Fictional representative confirms restoration.',reference:'DEMO-CALL-CHECK',status:'review',dueDate:'2026-10-10'},{kind:'update',caseId:'DEMO-1042'});
assert.equal(readState().workflows['DEMO-1042'].status,'review');
await click('wf-close');assert.ok(dialog.innerHTML.includes('Record your closure decision'));
await submit('workflow-form',{evidenceId:readState().workflows['DEMO-1042'].evidence[0].id,reason:'Fixture: reviewed all fictional records.',acknowledgement:'Fictional acknowledgement on 9 October.',reference:'DEMO-ACK-CHECK',confirmed:'on'},{kind:'close',caseId:'DEMO-1042'});
requireText('Resolved in this demo');
await click('tab',{tab:'history'});requireText('Officer recorded closure');
await click('wf-reopen');
await submit('workflow-form',{summary:'Fixture: fictional resident reports another interruption.',dueDate:'2026-10-10'},{kind:'reopen',caseId:'DEMO-1042'});
assert.equal(readState().workflows['DEMO-1042'].status,'review');
await click('case',{id:'DEMO-1047'});await click('wf-step',{stepId:'register'});
assert.ok(dialog.innerHTML.includes('Assign responsibility'));
await click('close-modal');
for(const lang of ['en','hi']){
 await click('language',{lang});
 for(const c of cases){
  await click('case',{id:c.id});
  for(const tab of ['actions','history','guidance','documents']){
   await click('tab',{tab});
   assert.ok(!app.innerHTML.includes('undefined'));
   assert.ok(app.innerHTML.includes(caseProfiles[c.id].name[lang]));
  }
 }
}
await click('language',{lang:'en'});
await click('case-back');
assert.equal(readState().caseOpen,false);
listeners.input({target:{id:'case-search',value:'nothing-will-match'}});
requireText('No matching complaints');
await click('clear-search');
await click('about');assert.ok(dialog.innerHTML.includes('Real office lookup is available.'));
await click('reset');
assert.equal(readState().events.length,0);assert.equal(readState().notes.length,0);
assert.equal(readState().corrections.length,1);
assert.deepEqual(readState().workflows,{});
for(const lang of ['en','hi']){
 await click('language',{lang});
 for(const view of ['offices','workbench','policies','reviews','insights']){
  await click('nav',{view});
  assert.ok(!app.innerHTML.includes('undefined'));
  fs.mkdirSync('/tmp/bihar-demo-render',{recursive:true});
  fs.writeFileSync(`/tmp/bihar-demo-render/${view}-${lang}.html`,app.innerHTML);
 }
}
console.log('PASS: source-backed answers and complete officer form journey, Hindi/English case details and actions, CGNet provenance, answer modes, correction review, escaping, search and reset.');
console.log('Browser visual/layout QA was not performed.');
