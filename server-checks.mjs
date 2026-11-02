import assert from 'node:assert/strict';
import fs from 'node:fs';
import {directory,districts,routeAddress,routeCase,lookupAnswer,directoryRowsFromHTML,refreshContacts} from './public/real-world.mjs';
import {cases} from './public/cgnet-cases.mjs';
import {initialState} from './public/demo-core.mjs';
import {handleAPI,aiConfiguration,currentDirectory} from './server/workbench.mjs';

assert.equal(districts.length,38);
assert.equal(new Set(districts.map(x=>x.en)).size,38);
assert.equal(districts.filter(x=>x.company==='NBPDCL').length,21);
assert.equal(districts.filter(x=>x.company==='SBPDCL').length,17);
for(const o of directory){assert.match(o.phone,/^\d{10}$/);assert.ok(['www.sbpdcl.co.in','www.nbpdcl.co.in'].includes(new URL(o.source).hostname));}
const simri=routeAddress({address:'सिमरी, बक्सर'});
assert.equal(simri.company,'SBPDCL');assert.equal(simri.candidates[0].posting,'ESS, Simri');assert.equal(simri.candidates[0].phone,'7763814293');
assert.equal(simri.verifiedServiceArea,false);
assert.equal(routeAddress({address:'काँटी',district:'Muzaffarpur'}).candidates[0].phone,'9262398743');
assert.equal(routeAddress({address:'Bahadurpur',district:'Darbhanga'}).candidates[0].company,'NBPDCL');
assert.equal(routeAddress({address:'Bahadurpur',district:'Patna'}).candidates[0].company,'SBPDCL');
assert.equal(routeAddress({address:'Unknown village, Buxar',district:'Buxar',kind:'billing'}).status,'district_only');
assert.equal(routeAddress({address:'Rajpur'}).status,'needs_district');
assert.equal(routeAddress({address:'Simri, Buxar',district:'Gaya'}).status,'ambiguous');
assert.equal(routeAddress({address:'Fremont, California',district:'Buxar'}).reason,'outside_bihar');
assert.equal(routeAddress({address:'Buxar, Gaya'}).reason,'multiple_districts');
assert.equal(routeAddress({address:'802101'}).status,'needs_district');
for(const c of cases){const r=routeCase(c);assert.equal(r.company,districts.find(x=>x.en===c.district.en).company);assert.equal(r.verifiedServiceArea,false);}

const state=initialState();
const answer=lookupAnswer(cases[0],{question:'Which office is responsible for this?',state});
assert.equal(answer.mode,'office');assert.equal(answer.engine,'verified_lookup');assert.ok(JSON.stringify(answer.sections).includes('7763814293'));
assert.ok(!JSON.stringify(answer).includes('outside this simulation'));
state.corrections.push({caseId:cases[0].id,status:'pending',text:'Pending correction must remain excluded'});
assert.ok(!JSON.stringify(lookupAnswer(cases[0],{mode:'summary',state})).includes('Pending correction must remain excluded'));
state.corrections.at(-1).status='approved';
assert.ok(JSON.stringify(lookupAnswer(cases[0],{mode:'summary',state})).includes('Pending correction must remain excluded'));
const before=JSON.stringify(state);lookupAnswer(cases[0],{mode:'next',state});assert.equal(JSON.stringify(state),before);
assert.ok(JSON.stringify(lookupAnswer(cases[0],{question:'What compensation is due?'})).includes('They do not verify an applicable compensation'));

const sampleHTML='<table><tr><th>Designation</th><th>Posting</th><th>Mobile</th></tr><tr><td>JEE</td><td>ESS, Simri</td><td>9999999999</td></tr></table>';
const parsed=directoryRowsFromHTML(sampleHTML),updated=refreshContacts(directory,'SBPDCL',parsed,'2026-10-09T20:00:00Z');
assert.equal(routeAddress({address:'Simri',district:'Buxar'},updated.records).candidates[0].phone,'9999999999','Refresh must use the newly published phone, not retain a stale value');
assert.equal(directory.find(x=>x.posting==='ESS, Simri').phone,'7763814293','Refresh must not mutate the saved source snapshot');
if(process.argv[2]){
 const sourceRows=directoryRowsFromHTML(fs.readFileSync(process.argv[2],'utf8'));
 const live=refreshContacts(directory,'SBPDCL',sourceRows,'2026-10-09T20:00:00Z');
 assert.ok(live.verifiedCount>500);assert.equal(routeAddress({address:'Simri',district:'Buxar'},live.records).candidates[0].liveVerified,true);
 console.log(`PASS: actual retrieved directory HTML parses and verifies ${live.verifiedCount} contact records.`);
}

const req=(path,body,headers={})=>new Request('https://workbench.test'+path,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)});
const failFetch=async()=>{throw new Error('test source outage');};
let response=await handleAPI(new Request('https://workbench.test/api/status'),{});let data=await response.json();
assert.equal(data.ai.connected,false);assert.equal(data.caseSystem.connected,false);
assert.equal(aiConfiguration({GOVERNMENT_AI_ENDPOINT:'https://approved.example/chat',GOVERNMENT_AI_TOKEN:'test',GOVERNMENT_AI_MODEL:'local-model'}).connected,false);
assert.equal(aiConfiguration({GOVERNMENT_DEPLOYMENT_APPROVED:'true',GOVERNMENT_AI_ENDPOINT:'https://api.openai.com/v1/chat/completions',GOVERNMENT_AI_TOKEN:'test',GOVERNMENT_AI_MODEL:'model'}).connected,false);
response=await handleAPI(req('/api/resolve',{address:'Simri',district:'Buxar',refresh:true}),{},failFetch);data=await response.json();
assert.equal(response.status,200);assert.equal(data.directoryStatus,'snapshot');assert.equal(data.liveVerified,false);assert.equal(data.candidates[0].phone,'7763814293');
response=await handleAPI(req('/api/answer',{caseId:'DEMO-1042',question:'Which office is responsible?'}),{},failFetch);data=await response.json();
assert.equal(data.engine,'verified_lookup');assert.equal(data.aiConnected,false);assert.equal(data.liveVerified,false);assert.equal(data.directoryStatus,'snapshot');
response=await handleAPI(req('/api/answer',{caseId:'REAL-GOVT-CASE',question:'Who owns this complaint?'}),{},failFetch);assert.equal(response.status,404);
response=await handleAPI(req('/api/resolve',{address:'Simri',district:'Buxar'},{Origin:'https://other.test'}),{},failFetch);assert.equal(response.status,403);
response=await handleAPI(req('/api/geocode',{locality:'House 12, School Lane',district:'Buxar'}),{},failFetch);assert.equal(response.status,400);
response=await handleAPI(req('/api/geocode',{locality:'9876543210',district:'Buxar'}),{},failFetch);assert.equal(response.status,400);
let requestedURL;
const geoFetch=async(url)=>{requestedURL=String(url);return Response.json([{display_name:'Simri, Buxar, Bihar, India',lat:'25.6',lon:'84.1',address:{state:'Bihar'},osm_type:'node',osm_id:1},{display_name:'Simri, Jharkhand, India',lat:'24.6',lon:'85.1',address:{state:'Jharkhand'}}]);};
response=await handleAPI(req('/api/geocode',{locality:'Simri',district:'Buxar'}),{},geoFetch);data=await response.json();assert.equal(data.locations.length,1);assert.equal(data.serviceAreaVerified,false);assert.ok(requestedURL.includes('countrycodes=in'));assert.ok(!requestedURL.includes('Sunita'));

const approvedEnv={GOVERNMENT_DEPLOYMENT_APPROVED:'true',GOVERNMENT_AI_ENDPOINT:'https://approved.example/chat',GOVERNMENT_AI_TOKEN:'TEST-ONLY-TOKEN',GOVERNMENT_AI_MODEL:'test-approved-model'};
let modelCalls=0;
const gatewayFetch=async(url,options)=>{
 if(String(url)!==approvedEnv.GOVERNMENT_AI_ENDPOINT)throw new Error('directory outage');
 modelCalls++;const request=JSON.parse(options.body);
 assert.ok(request.messages[1].content.includes('fictionalCase'));
 assert.ok(!request.messages[1].content.includes('Pending correction must remain excluded'));
 return Response.json({choices:[{message:{content:JSON.stringify({sections:[{heading:'Office',text:'The public directory lists JEE, ESS, Simri. Service area needs confirmation.',sourceIds:['DIRECTORY']}]})}}]});
};
response=await handleAPI(req('/api/answer',{caseId:'DEMO-1042',question:'Which office?',lang:'en'}),approvedEnv,gatewayFetch);data=await response.json();assert.equal(data.engine,'government_model');assert.equal(modelCalls,1);
const invalidGateway=async(url)=>{if(String(url)!==approvedEnv.GOVERNMENT_AI_ENDPOINT)throw new Error('directory outage');return Response.json({choices:[{message:{content:JSON.stringify({sections:[{heading:'Unsupported policy',text:'Invented rule',sourceIds:['INVENTED-REFERENCE']}]})}}]});};
response=await handleAPI(req('/api/answer',{caseId:'DEMO-1042',question:'Which rule?'}),approvedEnv,invalidGateway);data=await response.json();assert.equal(data.engine,'verified_lookup');assert.ok(data.aiError);assert.ok(!JSON.stringify(data.sections).includes('Invented rule'));
console.log('PASS: jurisdiction ambiguity, Hindi queries, current contact refresh, source outages, geocoder privacy and state filtering, model approval gate, citation validation and human-control boundaries.');
console.log('Live hosted model and government case-system integration remain unconfigured; test gateway responses are fixtures.');
