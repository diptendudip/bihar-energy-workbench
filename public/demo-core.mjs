import { cases } from './cgnet-cases.mjs';
import {caseProfiles,caseStatus} from './officer-workflow.mjs';
export { cases };
export const DEMO_DATE = '2026-10-09';
export const SCHEMA = 2;
export const L = (value, lang = 'en') => typeof value === 'object' && value !== null ? (value[lang] ?? value.en ?? '') : value;
const bi = (en, hi) => ({ en, hi });

// Every case, document, event and observation below is fictional.
// Policy states refer only to this sample registry, never to real Bihar policy.
export const policies = [
  { id: 'SAMPLE-01', kind: 'supply', title: bi('Supply interruption · evidence checklist', 'आपूर्ति बाधित · साक्ष्य जाँच सूची'), version: '2.0', state: 'current', section: '§ 2', date: '2026-09-01', supersedes: 'SAMPLE-05',
    summary: bi('Check the complaint history, outage record and field inspection before preparing a response.', 'जवाब तैयार करने से पहले शिकायत का इतिहास, आपूर्ति बंद होने का रिकॉर्ड और निरीक्षण रिपोर्ट जाँचें।'),
    paragraphs: [bi('Record the reported interruption and compare it with the available outage log. A reported fault is a statement in the complaint, not a verified technical diagnosis.', 'बताई गई बाधा को उपलब्ध आउटेज रिकॉर्ड से मिलाएँ। शिकायत में बताया गया दोष, सत्यापित तकनीकी निष्कर्ष नहीं है।'), bi('If a field inspection or restoration record is missing, show that gap explicitly. Do not infer the cause, repair completion, restoration time or entitlement from the complaint alone.', 'निरीक्षण या आपूर्ति बहाली का रिकॉर्ड न होने पर यह कमी स्पष्ट करें। केवल शिकायत से कारण, मरम्मत, बहाली का समय या पात्रता का अनुमान न लगाएँ।'), bi('An officer reviews the evidence and determines any next action through the existing process. This sample establishes no real service deadline.', 'अधिकारी साक्ष्य की समीक्षा करके मौजूदा प्रक्रिया से आगे की कार्रवाई तय करता है। यह उदाहरण कोई वास्तविक सेवा समय-सीमा निर्धारित नहीं करता।')] },
  { id: 'SAMPLE-02', kind: 'billing', title: bi('Billing query · record comparison', 'बिल संबंधी शिकायत · रिकॉर्ड का मिलान'), version: '1.1', state: 'current', section: '§ 3', date: '2026-09-12',
    summary: bi('Compare the disputed bill, recorded readings and relevant billing history.', 'विवादित बिल, दर्ज मीटर रीडिंग और संबंधित पुराने बिलों का मिलान करें।'),
    paragraphs: [bi('Compare the reading period, current and previous meter readings, and available billing entries. Identify the exact entry the complainant disputes.', 'रीडिंग अवधि, वर्तमान और पिछली मीटर रीडिंग तथा उपलब्ध बिल प्रविष्टियों का मिलान करें। विवादित प्रविष्टि पहचानें।'), bi('A difference between two bills does not establish that either is incorrect. Where the meter-reading evidence is absent, request a review through the established process.', 'दो बिलों में अंतर होने से किसी एक का गलत होना सिद्ध नहीं होता। मीटर रीडिंग का प्रमाण न होने पर निर्धारित प्रक्रिया से समीक्षा कराएँ।'), bi('Do not calculate a refund or decide liability from incomplete records. The responsible officer assesses the evidence.', 'अधूरे रिकॉर्ड से रिफंड या देनदारी तय न करें। संबंधित अधिकारी साक्ष्य की जाँच करता है।')] },
  { id: 'SAMPLE-03', kind: 'connection', title: bi('Connection application · completeness check', 'कनेक्शन आवेदन · पूर्णता जाँच'), version: '1.0', state: 'current', section: '§ 1', date: '2026-08-20',
    summary: bi('Review the application trail and identify the last documented step.', 'आवेदन का इतिहास देखें और अंतिम दर्ज चरण पहचानें।'),
    paragraphs: [bi('Use the application acknowledgement and recorded status history to identify the latest documented step.', 'आवेदन की पावती और स्थिति के इतिहास से अंतिम दर्ज चरण पहचानें।'), bi('List any missing verification or field report. An absent record does not establish that the applicant failed to provide a document.', 'अनुपलब्ध सत्यापन या फील्ड रिपोर्ट सूचीबद्ध करें। रिकॉर्ड न मिलने का अर्थ यह नहीं है कि आवेदक ने दस्तावेज़ नहीं दिया।'), bi('The officer determines the next step. This example does not establish eligibility, fees or a connection deadline.', 'अधिकारी अगला कदम तय करता है। यह उदाहरण पात्रता, शुल्क या कनेक्शन की समय-सीमा निर्धारित नहीं करता।')] },
  { id: 'SAMPLE-04', kind: 'safety', title: bi('Reported equipment hazard · review note', 'उपकरण में संभावित खतरा · समीक्षा नोट'), version: '1.0', state: 'current', section: '§ 1', date: '2026-09-15',
    summary: bi('Keep the reported hazard visible and flag missing field verification.', 'बताए गए खतरे को प्रमुखता से दिखाएँ और फील्ड सत्यापन की कमी बताएँ।'),
    paragraphs: [bi('Label a reported hazard as unverified until a competent field team records its assessment. Do not infer that equipment is safe.', 'सक्षम फील्ड टीम का आकलन दर्ज होने तक बताए गए खतरे को असत्यापित चिह्नित करें। उपकरण को सुरक्षित न मानें।'), bi('The officer follows the department’s approved urgent-response process. This demonstration has no emergency connection and cannot dispatch staff.', 'अधिकारी विभाग की स्वीकृत त्वरित कार्रवाई प्रक्रिया का पालन करता है। इस डेमो में आपात सेवा का कनेक्शन नहीं है और यह कर्मचारी नहीं भेज सकता।'), bi('Do not provide repair instructions or declare the hazard resolved based only on an AI explanation.', 'केवल AI की व्याख्या के आधार पर मरम्मत के निर्देश न दें और न ही खतरा समाप्त घोषित करें।')] },
  { id: 'SAMPLE-05', kind: 'supply', title: bi('Supply interruption · archived checklist', 'आपूर्ति बाधित · पुरानी जाँच सूची'), version: '1.0', state: 'superseded', section: '§ 2', date: '2025-11-01', replacedBy: 'SAMPLE-01',
    summary: bi('Archived example. Replaced by SAMPLE-01 in this fictional registry.', 'पुराना उदाहरण। इस काल्पनिक सूची में SAMPLE-01 ने इसे प्रतिस्थापित किया है।'),
    paragraphs: [bi('This is an obsolete sample document, retained only to demonstrate version checks. It must not support a new answer.', 'यह पुराना नमूना दस्तावेज़ केवल संस्करण जाँच दिखाने के लिए है। नए जवाब के समर्थन में इसका उपयोग नहीं होना चाहिए।')] },
  { id: 'SAMPLE-06', kind: 'compensation', title: bi('Compensation circular · unverified copy', 'मुआवज़ा परिपत्र · असत्यापित प्रति'), version: 'Unknown', state: 'unverified', section: '—', date: null,
    summary: bi('Origin and version are unverified. Excluded from simulated guidance.', 'स्रोत और संस्करण सत्यापित नहीं हैं। इसे डेमो के मार्गदर्शन से बाहर रखा गया है।'),
    paragraphs: [bi('The demo cannot verify the issuer, contents or currency of this sample. It cannot be used to determine compensation or any entitlement.', 'डेमो इस नमूने के जारीकर्ता, सामग्री या वैधता की पुष्टि नहीं कर सकता। इससे मुआवज़ा या कोई पात्रता तय नहीं की जा सकती।')] }
];


export const observations = [
 {id:'OBS-01',baseline:18,assisted:12}, {id:'OBS-02',baseline:14,assisted:10},
 {id:'OBS-03',baseline:16,assisted:11}, {id:'OBS-04',baseline:20,assisted:14},
 {id:'OBS-05',baseline:12,assisted:9}, {id:'OBS-06',baseline:15,assisted:11},
 {id:'OBS-07',baseline:17,assisted:12}, {id:'OBS-08',baseline:13,assisted:9},
 {id:'OBS-09',baseline:19,assisted:13}, {id:'OBS-10',baseline:16,assisted:11},
 {id:'OBS-11',baseline:14,assisted:10}, {id:'OBS-12',baseline:15,assisted:10}
];

export function initialState() {
 return {schema:SCHEMA,lang:'en',view:'workbench',caseOpen:false,caseId:cases[0].id,filter:'all',search:'',detailTab:'actions',policyFilter:'all',policySearch:'',role:'officer',answers:{},feedback:{},notes:[],events:[],workflows:{},corrections:[{id:'COR-DEMO-01',caseId:'DEMO-1042',reason:'Missing evidence',text:'Keep the transformer fault unconfirmed until a field inspection report is available.',status:'pending',sample:true,submittedAt:'2026-10-09T09:00:00.000Z'}]};
}
export function activePolicies(kind) { return policies.filter(p=>p.kind===kind && p.state==='current'); }
export function classifyQuestion(text) {
 if (/compensat|refund|मुआवज़|मुआवज|रिफंड|deadline|time.?limit|समय.?सीमा|कब.*(बिजली|कनेक्शन)/i.test(text)) return 'unsupported';
 if (/close|resolve.*case|send|dispatch|repair.*(how|steps)|बंद कर|भेज|मरम्मत.*कैसे|समाप्त कर/i.test(text)) return 'action';
 if (/similar|previous|समान|मिलत|पुरान.*मामल/i.test(text)) return 'similar';
 if (/missing|gap|कमी|अनुपलब्ध|क्या.*नहीं/i.test(text)) return 'gaps';
 if (/policy|policies|guidance|rule|नीति|नियम|मार्गदर्शन|दिशानिर्देश/i.test(text)) return 'policy';
 if (/summar|history|background|सार|इतिहास|पृष्ठभूमि/i.test(text)) return 'summary';
 return 'unknown';
}
export function makeAnswer(c, mode, corrections=[]) {
 const sources = mode==='unsupported'||mode==='action'||mode==='unknown' ? [] : activePolicies(c.kind).map(p=>p.id);
 const related = cases.filter(o=>o.id!==c.id&&o.kind===c.kind).map(o=>o.id);
 return {caseId:c.id,mode,sources,related,reviewedNotes:corrections.filter(n=>n.caseId===c.id&&n.status==='approved').map(n=>({id:n.id,text:n.text})),versionBlocked:!!c.stale,recordId:c.id+'-RECORD'};
}
export function reviewCorrection(state,id,decision) {
 if(state.role!=='reviewer') throw new Error('Reviewer role is required.');
 if(!['approved','rejected'].includes(decision)) throw new Error('Invalid review decision.');
 const item=state.corrections.find(c=>c.id===id);
 if(!item||item.status!=='pending') throw new Error('This correction is not pending.');
 item.status=decision;
 item.reviewedAt=new Date().toISOString();
 state.events.push({type:'correction_'+decision,caseId:item.caseId,id:item.id,time:item.reviewedAt});
 return item;
}
export function median(values){const sorted=[...values].sort((a,b)=>a-b);const m=Math.floor(sorted.length/2);return sorted.length%2?sorted[m]:(sorted[m-1]+sorted[m])/2;}
export function metrics(){const baseline=median(observations.map(o=>o.baseline));const assisted=median(observations.map(o=>o.assisted));return {baseline,assisted,reduction:(baseline-assisted)/baseline*100,n:observations.length};}
export function filterCases(search='',filter='all',state={}) {
 const q=search.trim().toLowerCase();
 return cases.filter(c=>{const status=caseStatus(state,c),p=caseProfiles[c.id];return (filter==='all'||(filter==='attention'?status==='review':status===filter))&&(!q||[c.id,c.title.en,c.title.hi,c.district.en,c.district.hi,c.category.en,c.category.hi,p.name.en,p.name.hi,p.village.en,p.village.hi,p.service].join(' ').toLowerCase().includes(q));});
}
export function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
