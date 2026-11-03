import {directory} from './official-directory.mjs';
import {cases,sourceStories} from './cgnet-cases.mjs';
import {caseProfiles,actionPlans,workflowFor,nextStep} from './officer-workflow.mjs';

export {directory};
export const DIRECTORY_CHECKED_AT='2026-10-09';
const south='SBPDCL',north='NBPDCL';
// Company coverage comes from the companies' published organisation / circle pages.
// A district establishes the DISCOM; it never establishes a service-section boundary.
export const districts=[
 ['Arwal','अरवल',south,'Aurangabad'],['Aurangabad','औरंगाबाद',south,'Aurangabad'],['Banka','बाँका',south,'Bhagalpur'],['Begusarai','बेगूसराय',north,'Begusarai'],['Bhagalpur','भागलपुर',south,'Bhagalpur'],['Bhojpur','भोजपुर',south,'Ara'],['Buxar','बक्सर',south,'Ara'],['Darbhanga','दरभंगा',north,'Darbhanga'],['East Champaran','पूर्वी चम्पारण',north,'Motihari'],['Gaya','गया',south,'Gaya'],['Gopalganj','गोपालगंज',north,'Chapra'],['Jamui','जमुई',south,'Jamui'],['Jehanabad','जहानाबाद',south,'Gaya'],['Kaimur','कैमूर',south,'Sasarm'],['Katihar','कटिहार',north,'Purnia'],['Khagaria','खगड़िया',north,'Begusarai'],['Kishanganj','किशनगंज',north,'Kishanganj'],['Lakhisarai','लखीसराय',south,'Munger'],['Madhepura','मधेपुरा',north,'Saharsa'],['Madhubani','मधुबनी',north,'Darbhanga'],['Munger','मुंगेर',south,'Munger'],['Muzaffarpur','मुज़फ़्फ़रपुर',north,'Muzaffarpur'],['Nalanda','नालंदा',south,'Biharsharif'],['Nawada','नवादा',south,'Biharsharif'],['Patna','पटना',south,'Patna|PESU(E)|PESU(W)'],['Purnea','पूर्णिया',north,'Purnia'],['Rohtas','रोहतास',south,'Sasarm'],['Saharsa','सहरसा',north,'Saharsa'],['Samastipur','समस्तीपुर',north,'Samastipur'],['Saran','सारण',north,'Chapra'],['Sheikhpura','शेखपुरा',south,'Jamui'],['Sheohar','शिवहर',north,'Muzaffarpur'],['Sitamarhi','सीतामढ़ी',north,'Muzaffarpur'],['Siwan','सीवान',north,'Chapra'],['Supaul','सुपौल',north,'Saharsa'],['Vaishali','वैशाली',north,'Samastipur'],['West Champaran','पश्चिमी चम्पारण',north,'Motihari'],['Araria','अररिया',north,'Kishanganj']
].map(([en,hi,company,circle])=>({en,hi,company,circle})).sort((a,b)=>a.en.localeCompare(b.en));
const aliases={
 'purnia':'purnea','purniya':'purnea','sitamadhi':'sitamarhi','gopalgunj':'gopalganj','mahubani':'madhubani','darbhanaga':'darbhanga','medhepura':'madhepura','kishangunj':'kishanganj','dumrow':'dumraon','dumraow':'dumraon','dumrao':'dumraon','डुमराँव':'dumraon','डुमरांव':'dumraon','डुमराव':'dumraon','डुमराँओ':'dumraon','सिमरी':'simri','काँटी':'kanti','कांटी':'kanti','बहादुरपुर':'bahadurpur','टेकारी':'tekari','टिकारी':'tekari','रूपौली':'rupauli','रुपौली':'rupauli','rupouli':'rupauli','दानापुर':'danapur','राजगीर':'rajgir','चौसा':'chausa','इटाढ़ी':'itarhi','इटारही':'itarhi','ltarhi':'itarhi','itahri':'itarhi','राजपुर':'rajpur','ब्रह्मपुर':'barhampur','brahampur':'barhampur','brahmapur':'barhampur','रघुनाथपुर':'raghunathpur','चक्की':'chakki','नवानगर':'nawanagar','कोरान सराय':'koran sarai','कोरानसराय':'koran sarai','नया भोजपुर':'naya bhojpur','purshotampur':'purshottampur','दरभङ्गा':'darbhanga','मुजफ्फरपुर':'muzaffarpur','मुज़फ्फरपुर':'muzaffarpur','मुजफ़्फ़रपुर':'muzaffarpur','पूरनिया':'purnea','भभुआ':'bhabhua','अररा':'ara','आरा':'ara','chhapra':'chapra','छपरा':'chapra','मोतिहारी':'motihari'
};
for(const d of districts)aliases[d.hi]=d.en.toLowerCase();
const aliasRules=Object.entries(aliases).sort((a,b)=>b[0].length-a[0].length).map(([from,to])=>({from,to,pattern:/[\u0900-\u097f]/.test(from)?null:new RegExp('(^|[^a-z])'+from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=$|[^a-z])','g')}));
const normalizationCache=new Map();
export function normalize(text=''){
 const input=String(text);
 if(normalizationCache.has(input))return normalizationCache.get(input);
 let s=input.normalize('NFKC').toLowerCase();
 for(const {from,to,pattern} of aliasRules){
  if(!pattern)s=s.split(from).join(to);
  else s=s.replace(pattern,(_,p)=>p+to);
 }
 const result=s.replace(/[^a-z0-9\u0900-\u097f]+/g,' ').trim().replace(/\s+/g,' ');
 if(normalizationCache.size>8000)normalizationCache.clear();
 normalizationCache.set(input,result);return result;
}
const hasPhrase=(text,phrase)=>phrase.length>2&&(' '+text+' ').includes(' '+phrase+' ');
function postingLocality(o){
 const s=normalize(o.posting).replace(/\b(essd|ess|esd|e s s divn|e s s div|section|pss|new|urban|rural|town|east|west|north|south|u|r|i|ii|iii)\b/g,' ').replace(/\s+/g,' ').trim();
 return s;
}
function withinDistrict(o,d){
 if(o.company!==d.company)return false;
 if(!d.circle.split('|').some(x=>normalize(x)===normalize(o.circle)))return false;
 // Split shared circles using the directory's division names, not nearest-distance guesses.
 const div=normalize(o.division);
 const exclusions={Buxar:/^(ara|jagdishpur)/,Bhojpur:/buxar/,Nalanda:/nawada|rajauli/,Nawada:/biharsharif|ekangarsarai|rajgir/,Darbhanga:/jainagar|jhanjharpur|madhubani/,Madhubani:/benipur|darbhanga/,Gaya:/jehanabad/,Jehanabad:/gaya|sherghati|manpur/,Patna:/$^/,Muzaffarpur:/pupri|sheohar|sitamarhi/,Sitamarhi:/muzaffarpur|sheohar/,Sheohar:/muzaffarpur|pupri|sitamarhi/,Purnea:/barsoi|katihar/,Katihar:/purnea/,Khagaria:/barauni|begusarai/,Begusarai:/khagaria/,Siwan:/chapra|gopalganj|mirganj/,Saran:/gopalganj|maharajganj|mirganj|siwan/,Gopalganj:/chapra|maharajganj|siwan/,Samastipur:/hajipur|mahua/,Vaishali:/dalsinghsarai|rosera|samastipur/,Supaul:/madhepura|saharsa|simri|udaikishanganj/,Madhepura:/raghopur|saharsa|simri|supaul/,Saharsa:/madhepura|raghopur|supaul|udaikishanganj/};
 return !exclusions[d.en]?.test(div);
}
// Resolve a full input against public directory places and the demo's public blocks.
export function publicMapLocality(locality, district){
 const selected=districts.find(d=>normalize(d.en)===normalize(district));
 if(!selected)return null;
 const input=normalize(locality);
 const districtName=normalize(selected.en);
 const knownPlaces=[
  selected.en,
  ...cases.filter(c=>c.district.en===selected.en).map(c=>c.block.en),
  ...directory.filter(o=>withinDistrict(o,selected)).map(postingLocality)
 ];
 const match=knownPlaces.find(place=>{
  const key=normalize(place);
  return key && (input===key || input===key+' '+districtName);
 });
 return match ? {locality:match,district:selected.en} : null;
}
export function routeAddress({address='',district='',kind='supply'}={},records=directory){
 const query=normalize(address),explicit=districts.find(d=>normalize(d.en)===normalize(district)||normalize(d.hi)===normalize(district));
 const mentioned=districts.filter(d=>hasPhrase(query,normalize(d.en)));
 const outside=/\b(west bengal|chhattisgarh|uttar pradesh|jharkhand|delhi|california|philadelphia|fremont|maharashtra|madhya pradesh)\b|छत्तीसगढ़|पश्चिम बंगाल|झारखंड/.test(query);
 if(outside||(!explicit&&mentioned.length>1))return {status:'ambiguous',company:null,district:null,candidates:[],supervisors:[],reason:outside?'outside_bihar':'multiple_districts',verifiedServiceArea:false};
 if(explicit&&mentioned.some(d=>d.en!==explicit.en))return {status:'ambiguous',company:null,district:null,candidates:[],supervisors:[],reason:'district_conflict',verifiedServiceArea:false};
 const d=explicit??mentioned[0];
 if(!d)return {status:'needs_district',company:null,district:null,candidates:[],supervisors:[],reason:'district_required',verifiedServiceArea:false};
 const scoped=records.filter(o=>withinDistrict(o,d));
 const words=query.split(' ').filter(w=>w.length>2&&!['bihar','india','village','district','block','ward','address','house','demo',...normalize(d.en).split(' ')].includes(w));
 const localityQuery=query.replace(new RegExp('(^| )'+normalize(d.en)+'(?= |$)','g'),' ').trim();
 const scored=scoped.map(o=>{
  const place=postingLocality(o),role=normalize(o.role);
  let score=hasPhrase(localityQuery,place)?100+place.length:0;
  for(const w of words){if(hasPhrase(place,w))score+=15;if(hasPhrase(role,w))score+=9;}
  if(!score)return {...o,score:0,matchedLocality:place};
  if(kind==='billing'&&o.level==='revenue')score+=8;
  if(/\b(urban|town)\b/.test(query)&&/\b(urban|town|u)\b/.test(normalize(o.posting)))score+=8;
  if(/\brural\b/.test(query)&&/\b(rural|r)\b/.test(normalize(o.posting)))score+=8;
  if(o.level==='section')score+=2;
  return {...o,score,matchedLocality:place};
 }).filter(o=>o.score>5).sort((a,b)=>b.score-a.score);
 const seen=new Set();
 let candidates=scored.filter(o=>{const k=o.phone+'-'+o.level;if(seen.has(k))return false;seen.add(k);return true;}).slice(0,6);
 const locallyMatched=candidates.length>0;
 if(!locallyMatched){candidates=scoped.filter(o=>o.level==='division'&&hasPhrase(normalize(o.division),normalize(d.en))).slice(0,3);}
 const top=candidates[0];
 const supervisors=top?scoped.filter(o=>o.division===top.division&&(o.level==='division'||(top.subdivision&&normalize(o.posting)===normalize(top.subdivision)&&o.level==='subdivision'))).filter(o=>o.id!==top.id).slice(0,3):[];
 return {status:locallyMatched?'candidate':'district_only',company:d.company,district:d.en,circle:top?.circle??d.circle,candidates,supervisors,verifiedServiceArea:false,reason:locallyMatched?'locality_name_match':'service_area_missing',checkedAt:DIRECTORY_CHECKED_AT,source:d.company===north?'https://www.nbpdcl.co.in/frmAbtOrganization.aspx':'https://www.sbpdcl.co.in/frmCallPowerCut.aspx',mapQuery:[address,d.en,'Bihar, India'].filter(Boolean).join(', ')};
}
export function routeCase(c,records=directory){return routeAddress({address:c.block.en,district:c.district.en,kind:c.kind},records);}
const bi=(en,hi)=>({en,hi});
export function lookupAnswer(c,{question='',mode='question',state={}}={},records=directory){
 const route=routeCase(c,records),p=caseProfiles[c.id],official=route.candidates[0],w=workflowFor(state,c);
 const intent=mode!=='question'?mode:/office|responsib|jurisdiction|who|whom|call|contact|phone|number|address|where|कौन|कार्यालय|जिम्मे|ज़िम्मे|संपर्क|फोन|पता|कहाँ|कहां/i.test(question)?'office':/next|step|action|follow|क्या कर|अगला|कार्रवाई|कदम/i.test(question)?'next':/missing|gap|कमी|अनुपलब्ध|क्या.*नहीं/i.test(question)?'gaps':/summar|history|background|सार|इतिहास|पृष्ठभूमि/i.test(question)?'summary':/similar|previous|समान|मिलत|पुरान.*मामल/i.test(question)?'similar':/policy|rule|guidance|compensat|deadline|नीति|नियम|मुआव|समय.*सीमा/i.test(question)?'policy':'search';
 let sections=[];
 const officeText=official?`${official.company} · ${official.posting} · ${official.role} · ${official.phone}`:route.company??'District not established';
 if(intent==='office'||intent==='search'){
  sections.push({heading:bi('Office to verify first','पहले इस कार्यालय से पुष्टि करें'),text:bi(official?`For ${c.block.en}, ${c.district.en}, the public directory lists ${officeText}. This is a locality-name match, not a confirmed service-area assignment. Confirm the service subdivision from the consumer bill or with the office before assigning the complaint.`:`The district falls under ${route.company}. The directory does not establish an exact local office for ${c.block.en}. Obtain the service subdivision from the bill, or ask 1912 to identify it.`,official?`${c.block.hi}, ${c.district.hi} के लिए सार्वजनिक सूची में ${officeText} दर्ज है। यह स्थान के नाम से मिला संभावित कार्यालय है; सेवा क्षेत्र की पुष्टि नहीं है। शिकायत सौंपने से पहले बिल या कार्यालय से सेवा उपखंड की पुष्टि करें।`:`जिला ${route.company} के अंतर्गत है। ${c.block.hi} के लिए सटीक स्थानीय कार्यालय सूची से स्थापित नहीं हुआ। बिल से सेवा उपखंड लें या 1912 से पता करें।`),sourceIds:['DIRECTORY']});
  if(route.supervisors.length)sections.push({heading:bi('Directory-listed supervision','सूची में दर्ज उच्च कार्यालय'),items:route.supervisors.map(o=>bi(`${o.role} · ${o.posting} · ${o.phone}`,`${o.role} · ${o.posting} · ${o.phone}`)),sourceIds:['DIRECTORY']});
  if(route.status==='district_only')sections[0].text=bi(`The district falls under ${route.company}. ${official?officeText+' is a district-level directory contact. ':''}An exact local service section is not established for ${c.block.en}. Obtain the consumer bill’s subdivision or confirm with 1912 before routing.`,`जिला ${route.company} के अंतर्गत है। ${official?officeText+' जिला स्तर का प्रकाशित संपर्क है। ':''}${c.block.hi} का सटीक स्थानीय सेवा सेक्शन स्थापित नहीं हुआ है। शिकायत भेजने से पहले बिल से उपखंड लें या 1912 से पुष्टि करें।`);
  sections.push({heading:bi('What the officer needs to act','कार्रवाई के लिए ज़रूरी जानकारी'),text:bi(`Representative: ${p.name.en}. Recorded address: ${p.house.en}, ${p.village.en}, ${c.block.en}, ${c.district.en}. Service reference: ${p.service}. These case details are fictional; the office contacts above are real public-directory entries. The household phone, feeder/asset and exact service area still require verification.`,`प्रतिनिधि: ${p.name.hi}। दर्ज पता: ${p.house.hi}, ${p.village.hi}, ${c.block.hi}, ${c.district.hi}। सेवा संदर्भ: ${p.service}। मामले की जानकारी काल्पनिक है; ऊपर के कार्यालय संपर्क वास्तविक सार्वजनिक सूची से हैं। परिवार का फोन, फीडर/उपकरण और सटीक सेवा क्षेत्र अभी सत्यापित करना है।`),sourceIds:['CASE']});
 }
 if(intent==='summary')sections.push({heading:bi('What is recorded','रिकॉर्ड में क्या है'),items:[...c.known,bi(`Location: ${p.village.en}, ${c.block.en}, ${c.district.en}. Representative: ${p.name.en}.`,`स्थान: ${p.village.hi}, ${c.block.hi}, ${c.district.hi}। प्रतिनिधि: ${p.name.hi}।`)],sourceIds:['CASE']});
 if(intent==='gaps'||intent==='summary')sections.push({heading:bi('Information still needed','अभी ज़रूरी जानकारी'),items:[...c.missing,bi('Verified consumer contact and service-subdivision confirmation; a PIN or map point alone cannot establish electricity jurisdiction.','सत्यापित उपभोक्ता संपर्क और सेवा उपखंड की पुष्टि; केवल PIN या नक्शे का बिंदु बिजली कार्यालय का क्षेत्र तय नहीं करता।')],sourceIds:['CASE','DIRECTORY']});
 if(intent==='policy')sections.push({heading:bi('An approved current document is needed','वर्तमान स्वीकृत दस्तावेज़ चाहिए'),text:bi('The available public sources verify office contacts and the official complaint channel. They do not verify an applicable compensation amount, service deadline, tariff or current SOP. The sample checklists in this app are fictional. Supply the current approved policy and its version record before relying on a policy explanation.','उपलब्ध सार्वजनिक स्रोत कार्यालय संपर्क और आधिकारिक शिकायत माध्यम बताते हैं। इनमें लागू मुआवज़ा राशि, सेवा समय-सीमा, दर या वर्तमान SOP सत्यापित नहीं है। ऐप की नमूना जाँच सूचियाँ काल्पनिक हैं। नीति की व्याख्या पर भरोसा करने से पहले वर्तमान स्वीकृत नीति और संस्करण रिकॉर्ड चाहिए।'),sourceIds:['DIRECTORY']});
 if(intent==='similar'){
  const related=cases.filter(x=>x.id!==c.id&&x.kind===c.kind);
  sections.push({heading:bi('Related complaint examples','संबंधित शिकायत के उदाहरण'),items:related.length?related.map(x=>bi(`${x.id} · ${x.title.en} · ${x.district.en}`,`${x.id} · ${x.title.hi} · ${x.district.hi}`)):[bi('No other case of this category is loaded.','इस श्रेणी का कोई अन्य मामला उपलब्ध नहीं है।')],sourceIds:['CASE']});
 }
 if(intent==='next')sections.push({heading:bi('Review these steps','इन कदमों की समीक्षा करें'),items:actionPlans[c.id].map(s=>bi(`${s.title.en}. Evidence needed: ${s.evidence.en}.`,`${s.title.hi}। आवश्यक साक्ष्य: ${s.evidence.hi}।`)),sourceIds:['CASE']});
 if(intent==='search'){
  const words=normalize(question).split(' ').filter(x=>x.length>3);
  const facts=[...c.known,...c.missing].filter(f=>words.some(x=>normalize(f.en+' '+f.hi).includes(x)));
  sections.push({heading:bi('Evidence matching your question','आपके सवाल से संबंधित साक्ष्य'),items:facts.length?facts:[bi('The provided records do not establish an answer to that point. A reviewer must supply a supporting record; a language model is not connected yet.','दिए गए रिकॉर्ड से इस बात का जवाब स्थापित नहीं होता। समीक्षक को समर्थक रिकॉर्ड देना होगा; भाषा मॉडल अभी जुड़ा नहीं है।')],sourceIds:['CASE']});
 }
 const step=nextStep(state,c);
 sections.push({heading:bi('Next officer action','अधिकारी की अगली कार्रवाई'),text:step?step.request:bi('Review the recorded evidence and the complainant’s acknowledgement before considering closure.','समापन पर विचार करने से पहले दर्ज साक्ष्य और शिकायतकर्ता का जवाब जाँचें।'),sourceIds:['CASE']});
 const updates=w.evidence.filter(x=>!x.seeded);
 if(updates.length)sections.push({heading:bi('Officer-entered updates','अधिकारी की दर्ज जानकारी'),items:updates.slice(-3).map(x=>bi(`${x.reference}: ${x.summary}`,`${x.reference}: ${x.summary}`)),sourceIds:['CASE']});
 const notes=(state.corrections??[]).filter(n=>n.caseId===c.id&&n.status==='approved');
 if(notes.length)sections.push({heading:bi('Reviewed corrections','समीक्षित सुधार'),items:notes.map(x=>bi(x.text,x.text)),sourceIds:['CASE']});
 return {caseId:c.id,mode:intent,question,engine:'verified_lookup',sections,route,reviewedNotes:[],sources:[{id:'DIRECTORY',title:bi(`${route.company} official directory`,`${route.company} की आधिकारिक संपर्क सूची`),url:route.company===north?'https://www.nbpdcl.co.in/frmHelplineNumbers.aspx':'https://www.sbpdcl.co.in/frmHelplineNumbers.aspx',checkedAt:DIRECTORY_CHECKED_AT,type:'official_public_directory'},{id:'CASE',title:bi(`${c.id} · fictional case record`,`${c.id} · काल्पनिक केस रिकॉर्ड`),caseId:c.id,type:'fictional_case'}],directoryStatus:'snapshot',generatedAt:new Date().toISOString()};
}

// Read only the leaf cells of HTML rows. Never execute source HTML or scripts.
const unescape=s=>s.replace(/&nbsp;|&#160;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n));
export function directoryRowsFromHTML(html){
 const rows=[],stack=[];let cell=null;
 for(const token of String(html).match(/<[^>]*>|[^<]+/g)??[]){
  if(/^<tr\b/i.test(token)){stack.push({cells:[]});cell=null;}
  else if(/^<t[dh]\b/i.test(token)){cell={text:'',row:stack.at(-1)};}
  else if(/^<\/t[dh]/i.test(token)){if(cell?.row)cell.row.cells.push(unescape(cell.text).replace(/\s+/g,' ').trim());cell=null;}
  else if(/^<\/tr/i.test(token)){const row=stack.pop();if(row?.cells.length>=3)rows.push(row.cells);cell=null;}
  else if(token[0]!=='<'&&cell)cell.text+=token;
 }
 return rows;
}
export function refreshContacts(records,company,rows,checkedAt){
 const index=new Map();
 for(const c of rows){
  const posting=company===south?c[1]:c[0],role=company===south?c[0]:c[1],phone=c[2]?.replace(/\D/g,'');
  if(!/^\d{10}$/.test(phone??''))continue;
  const key=normalize(posting)+'|'+normalize(role);
  if(!index.has(key))index.set(key,new Set());index.get(key).add(phone);
 }
 const refreshed=records.map(o=>{
  if(o.company!==company)return o;
  const phones=[...(index.get(normalize(o.posting)+'|'+normalize(o.role))??[])];
  if(phones.length===1)return {...o,phone:phones[0],checkedAt,liveVerified:true};
  return {...o,liveVerified:false};
 });
 return {records:refreshed,verifiedCount:refreshed.filter(x=>x.company===company&&x.liveVerified).length};
}
