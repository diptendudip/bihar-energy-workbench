// Fictional operational records for the interactive demo. No real identities,
// service numbers, contact numbers or departmental routing are represented.
const bi=(en,hi)=>({en,hi});
export const REVIEW_DATE='2026-10-09';
export const demoOfficer={id:'OFFICER-DEMO',name:bi('Asha Sinha','आशा सिन्हा'),role:bi('Reviewing officer','समीक्षा अधिकारी')};
export const demoStaff=[
 {id:'SUPPLY-DEMO',name:bi('Vivek Kumar','विवेक कुमार'),role:bi('Supply desk','आपूर्ति डेस्क')},
 {id:'BILLING-DEMO',name:bi('Neha Singh','नेहा सिंह'),role:bi('Billing desk','बिलिंग डेस्क')},
 {id:'CONNECTION-DEMO',name:bi('Pawan Prasad','पवन प्रसाद'),role:bi('Connection desk','कनेक्शन डेस्क')},
 {id:'REVIEW-DEMO',name:bi('Farah Alam','फ़राह आलम'),role:bi('Senior review desk','वरिष्ठ समीक्षा डेस्क')}
];
const profile=(name,house,ward,village,panchayat,landmark,service,asset,assignedTo,dueDate,channel)=>({
 name,house,ward,village,panchayat,landmark,service,asset,assignedTo,dueDate,channel,
 language:bi('Hindi','हिन्दी'),contact:'',fictional:true
});
export const caseProfiles={
 'DEMO-1042':profile(bi('Sunita Devi','सुनीता देवी'),bi('House 12, School Lane','घर 12, स्कूल गली'),'4',bi('Udaypur Demo','उदयपुर डेमो'),bi('Udaypur Demo Panchayat','उदयपुर डेमो पंचायत'),bi('Community transformer beside the primary school','प्राथमिक विद्यालय के पास सामुदायिक ट्रांसफॉर्मर'),'DEMO-CONS-1042','DEMO-TX-17','SUPPLY-DEMO','2026-10-09',bi('Written community complaint','लिखित सामुदायिक शिकायत')),
 'DEMO-1043':profile(bi('Rakesh Paswan','राकेश पासवान'),bi('House 8, Pond Road','घर 8, तालाब रोड'),'2',bi('Sonapur Demo','सोनापुर डेमो'),bi('Sonapur Demo Panchayat','सोनापुर डेमो पंचायत'),bi('East of the community water tank','सामुदायिक पानी की टंकी के पूर्व में'),'DEMO-CONS-1043','DEMO-MTR-43','BILLING-DEMO','2026-10-10',bi('Complaint counter','शिकायत काउंटर')),
 'DEMO-1044':profile(bi('Meena Kumari','मीना कुमारी'),bi('House 21, Market Lane','घर 21, बाज़ार गली'),'6',bi('Navgram Demo','नवग्राम डेमो'),bi('Navgram Demo Panchayat','नवग्राम डेमो पंचायत'),bi('Behind the sample community hall','डेमो सामुदायिक भवन के पीछे'),'DEMO-CONS-1044','DEMO-MTR-44','BILLING-DEMO','2026-10-08',bi('Written billing complaint','लिखित बिल शिकायत')),
 'DEMO-1045':profile(bi('Abdul Rahman','अब्दुल रहमान'),bi('House 5, Canal Lane','घर 5, नहर गली'),'3',bi('Haripur Demo','हरिपुर डेमो'),bi('Haripur Demo Panchayat','हरिपुर डेमो पंचायत'),bi('Unenergised pole line beside the canal bridge','नहर पुल के पास बिजली चालू न हुई खंभों की लाइन'),'DEMO-APP-1045','DEMO-LINE-45','CONNECTION-DEMO','2026-10-10',bi('Joint application follow-up','संयुक्त आवेदन पर फॉलो-अप')),
 'DEMO-1046':profile(bi('Mahesh Yadav','महेश यादव'),bi('House 14, Farm Road','घर 14, खेत रोड'),'1',bi('Khetpur Demo','खेतपुर डेमो'),bi('Khetpur Demo Panchayat','खेतपुर डेमो पंचायत'),bi('Irrigation pump cluster near the north canal','उत्तरी नहर के पास सिंचाई पंपों का समूह'),'DEMO-CONS-1046','DEMO-FDR-46','SUPPLY-DEMO','2026-10-08',bi('Joint farmers’ complaint','किसानों की संयुक्त शिकायत')),
 'DEMO-1047':profile(bi('Kavita Mandal','कविता मंडल'),bi('House 3, School Road','घर 3, स्कूल रोड'),'5',bi('Asha Nagar Demo','आशा नगर डेमो'),bi('Asha Nagar Demo Panchayat','आशा नगर डेमो पंचायत'),bi('Nineteen sample homes beyond the primary school','प्राथमिक विद्यालय के आगे 19 डेमो घर'),'DEMO-REQ-1047',bi('No service asset recorded yet','अभी कोई सेवा उपकरण दर्ज नहीं'),null,'2026-10-09',bi('Community connection request','सामुदायिक कनेक्शन अनुरोध')),
 'DEMO-1048':profile(bi('Prakash Kumar','प्रकाश कुमार'),bi('House 18, Station Lane','घर 18, स्टेशन गली'),'2',bi('Deepgram Demo','दीपग्राम डेमो'),bi('Deepgram Demo Panchayat','दीपग्राम डेमो पंचायत'),bi('Replacement transformer near the sample bus shelter','डेमो बस शेड के पास बदला गया ट्रांसफॉर्मर'),'DEMO-CONS-1048','DEMO-TX-48','SUPPLY-DEMO',null,bi('Community supply complaint','सामुदायिक आपूर्ति शिकायत')),
 'DEMO-1049':profile(bi('Rekha Devi','रेखा देवी'),bi('House 9, Well Lane','घर 9, कुआँ गली'),'7',bi('Sahajpur Demo','सहजपुर डेमो'),bi('Sahajpur Demo Panchayat','सहजपुर डेमो पंचायत'),bi('Distribution pole opposite the sample ration shop','डेमो राशन दुकान के सामने वितरण खंभा'),'DEMO-GROUP-1049','DEMO-LINE-49','REVIEW-DEMO','2026-10-09',bi('Joint disconnection complaint','बिजली काटने की संयुक्त शिकायत'))
};
for(const [id,p] of Object.entries(caseProfiles))p.contact=`+91 XXXXX XX${id.slice(-3)}`;
const step=(id,title,request,evidence)=>({id,title,request,evidence});
export const actionPlans={
 'DEMO-1042':[
  step('inspect',bi('Obtain the transformer inspection report','ट्रांसफॉर्मर की निरीक्षण रिपोर्ट लें'),bi('Ask the supply desk to confirm the asset, inspected fault, outage start and affected connections. The complaint alone does not confirm the fault.','आपूर्ति डेस्क से उपकरण, निरीक्षण में मिले दोष, बिजली बंद होने की शुरुआत और प्रभावित कनेक्शन की पुष्टि माँगें। केवल शिकायत से दोष सिद्ध नहीं होता।'),bi('Dated field inspection and outage-log reference','तारीख सहित फील्ड निरीक्षण और आउटेज लॉग का संदर्भ')),
  step('repair',bi('Review the repair or restoration update','मरम्मत या बहाली की जानकारी जाँचें'),bi('Compare the field findings with the recorded repair status. Record the responsible desk’s update and a date for the next follow-up; do not promise a restoration deadline.','फील्ड निष्कर्ष और दर्ज मरम्मत की स्थिति मिलाएँ। संबंधित डेस्क की जानकारी और अगली समीक्षा की तारीख लिखें; बहाली की समय-सीमा का वादा न करें।'),bi('Repair-status note or restoration record','मरम्मत स्थिति का नोट या बहाली का रिकॉर्ड')),
  step('confirm',bi('Record the household representative’s response','परिवारों के प्रतिनिधि का जवाब दर्ज करें'),bi('After a restoration update, record whether the representative reports supply returning and what remains unresolved. The officer then considers closure.','बहाली की सूचना के बाद प्रतिनिधि से बिजली लौटने और बाकी समस्या का जवाब दर्ज करें। फिर अधिकारी समापन पर विचार करें।'),bi('Dated response and officer review note','तारीख सहित जवाब और अधिकारी का समीक्षा नोट'))
 ],
 'DEMO-1043':[
  step('bill',bi('Get the complete bill and meter readings','पूरा बिल और मीटर रीडिंग लें'),bi('Request the itemised ₹2,460 sample bill, billing period, opening and closing readings, and basis of each disputed charge.','₹2,460 के नमूना बिल का विवरण, अवधि, शुरुआती और अंतिम रीडिंग तथा विवादित शुल्क का आधार माँगें।'),bi('Itemised bill and meter-reading register','विस्तृत बिल और मीटर रीडिंग रजिस्टर')),
  step('outage',bi('Match the billing period to the outage log','बिल अवधि और आउटेज लॉग मिलाएँ'),bi('Ask the supply desk for the same 24-day reported outage period, and record any mismatch. An outage alone does not establish that a charge is invalid.','आपूर्ति डेस्क से बताई गई 24 दिन की अवधि का रिकॉर्ड लें और अंतर दर्ज करें। केवल बिजली बंद होने से शुल्क गलत साबित नहीं होता।'),bi('Outage log and dated comparison note','आउटेज लॉग और तारीख सहित मिलान नोट')),
  step('reply',bi('Record the billing officer’s explanation','बिलिंग अधिकारी का स्पष्टीकरण दर्ज करें'),bi('Record the reviewed explanation or correction, its supporting instruction, and the complainant’s response. Do not calculate an entitlement using the sample checklist.','समीक्षित स्पष्टीकरण या सुधार, उसका समर्थक निर्देश और शिकायतकर्ता का जवाब दर्ज करें। नमूना सूची से पात्रता या राशि न निकालें।'),bi('Reviewed billing response and acknowledgement','समीक्षित बिल जवाब और पावती'))
 ],
 'DEMO-1044':[
  step('reading',bi('Retrieve the meter-reading and estimation basis','मीटर रीडिंग और अनुमानित बिल का आधार लें'),bi('Ask the billing desk for the last three cycles’ readings and the basis for any estimated charge, using the sample meter reference.','नमूना मीटर संदर्भ से बिलिंग डेस्क से पिछली तीन अवधियों की रीडिंग और अनुमानित शुल्क का आधार माँगें।'),bi('Reading register or estimation record','रीडिंग रजिस्टर या अनुमानित बिल का रिकॉर्ड')),
  step('previous',bi('Trace the earlier complaint response','पहली शिकायत का जवाब खोजें'),bi('Locate the previous request and its recorded response; identify whether the same billing issue remains unanswered.','पिछला अनुरोध और दर्ज जवाब खोजें; देखें कि वही बिल समस्या अब भी अनुत्तरित है या नहीं।'),bi('Earlier complaint and response reference','पिछली शिकायत और जवाब का संदर्भ')),
  step('explain',bi('Record the reviewed bill comparison','समीक्षित बिल मिलान दर्ज करें'),bi('The officer compares the bills with the retrieved records, records reasons, and notes the citizen’s response before deciding the case.','अधिकारी प्राप्त रिकॉर्ड से बिल मिलाएँ, कारण लिखें और निर्णय से पहले नागरिक का जवाब दर्ज करें।'),bi('Comparison, reviewed response and acknowledgement','मिलान, समीक्षित जवाब और पावती'))
 ],
 'DEMO-1045':[
  step('network',bi('Obtain the commissioning status','कमीशनिंग की स्थिति लें'),bi('Ask the connection desk for the inspection and commissioning record for the sample pole line, including the documented reason supply has not started.','नमूना खंभों की लाइन का निरीक्षण, कमीशनिंग रिकॉर्ड और आपूर्ति शुरू न होने का दर्ज कारण कनेक्शन डेस्क से माँगें।'),bi('Commissioning or pending-work report','कमीशनिंग या लंबित काम की रिपोर्ट')),
  step('applications',bi('Check the 28 household applications','28 घरों के आवेदन जाँचें'),bi('Compare the application list, acknowledgements and pending verification. Missing records do not prove households failed to submit documents.','आवेदन सूची, पावती और लंबित सत्यापन मिलाएँ। रिकॉर्ड न मिलना दस्तावेज़ न देने का प्रमाण नहीं है।'),bi('Application register and pending-verification list','आवेदन रजिस्टर और लंबित सत्यापन सूची')),
  step('progress',bi('Record the next documented connection stage','कनेक्शन का अगला दर्ज चरण लिखें'),bi('Record the competent desk’s decision or progress report and the representative’s response, without inventing eligibility or an energisation date.','संबंधित डेस्क का निर्णय या प्रगति और प्रतिनिधि का जवाब लिखें; पात्रता या बिजली चालू होने की तारीख न गढ़ें।'),bi('Reviewed connection-status response','समीक्षित कनेक्शन स्थिति का जवाब'))
 ],
 'DEMO-1046':[
  step('voltage',bi('Get the field voltage measurements','फील्ड वोल्टेज माप लें'),bi('Ask the qualified field team for the visit report and readings during the reported irrigation periods. This is a records request, not a repair instruction.','योग्य फील्ड टीम से निरीक्षण रिपोर्ट और बताई गई सिंचाई अवधि के माप माँगें। यह रिकॉर्ड का अनुरोध है, मरम्मत निर्देश नहीं।'),bi('Field visit and timestamped voltage readings','फील्ड निरीक्षण और समय सहित वोल्टेज माप')),
  step('assessment',bi('Review the pump assessment and supply log','पंप आकलन और आपूर्ति लॉग जाँचें'),bi('Compare the motor assessment with supply history. Keep the claimed link between low voltage and damage unconfirmed unless the assessment supports it.','मोटर आकलन और आपूर्ति इतिहास मिलाएँ। आकलन के समर्थन के बिना कम वोल्टेज से नुकसान का दावा अपुष्ट रखें।'),bi('Technical assessment and supply-history reference','तकनीकी आकलन और आपूर्ति इतिहास का संदर्भ')),
  step('farmers',bi('Record the farmers’ follow-up and officer response','किसानों का फॉलो-अप और अधिकारी का जवाब लिखें'),bi('Record any field response and whether irrigation interruptions continue. The officer reviews the evidence and determines the next action.','फील्ड जवाब और सिंचाई में बाधा जारी है या नहीं, दर्ज करें। अधिकारी साक्ष्य जाँचकर आगे की कार्रवाई तय करें।'),bi('Field response and representative’s update','फील्ड जवाब और प्रतिनिधि की जानकारी'))
 ],
 'DEMO-1047':[
  step('register',bi('Check the application register for 19 households','19 घरों का आवेदन रजिस्टर जाँचें'),bi('Ask the connection desk to identify applications and acknowledgements, or record which household requests are still to be registered.','कनेक्शन डेस्क से आवेदन और पावती पहचानने को कहें, या दर्ज करें कि किन घरों के अनुरोध अभी दर्ज होने हैं।'),bi('Application or request-register reference','आवेदन या अनुरोध रजिस्टर का संदर्भ')),
  step('feasibility',bi('Request the network feasibility record','नेटवर्क व्यवहार्यता का रिकॉर्ड माँगें'),bi('Obtain the documented field verification and network feasibility status. The demo does not determine fees, eligibility or scheme coverage.','दर्ज फील्ड सत्यापन और नेटवर्क व्यवहार्यता की स्थिति लें। डेमो शुल्क, पात्रता या योजना में शामिल होने का निर्णय नहीं करता।'),bi('Field verification and feasibility note','फील्ड सत्यापन और व्यवहार्यता नोट')),
  step('nextstage',bi('Record the officer’s next-stage response','अधिकारी का अगले चरण का जवाब दर्ज करें'),bi('Record the responsible desk’s next documented step, pending requirements and the representative’s acknowledgement.','संबंधित डेस्क का अगला दर्ज कदम, लंबित आवश्यकताएँ और प्रतिनिधि की पावती लिखें।'),bi('Reviewed response and acknowledgement','समीक्षित जवाब और पावती'))
 ],
 'DEMO-1048':[
  step('replacement',bi('Review the replacement record','ट्रांसफॉर्मर बदलने का रिकॉर्ड जाँचें'),bi('Inspect the sample installation and restoration entry dated 5 October.','5 अक्टूबर की नमूना स्थापना और बहाली प्रविष्टि देखें।'),bi('Sample restoration note','नमूना बहाली नोट')),
  step('ack',bi('Check the representative’s acknowledgement','प्रतिनिधि की पावती जाँचें'),bi('Inspect the sample response dated 7 October confirming restored supply.','7 अक्टूबर का नमूना जवाब देखें जिसमें आपूर्ति लौटने की पुष्टि है।'),bi('Sample acknowledgement','नमूना पावती')),
  step('closure',bi('Inspect the officer’s recorded closure','अधिकारी का दर्ज समापन देखें'),bi('Read the sample officer review and reason for closure. Reopen the demo if a new unresolved issue is being rehearsed.','नमूना अधिकारी की समीक्षा और समापन का कारण पढ़ें। नया अनसुलझा मुद्दा आज़माने पर डेमो मामला फिर खोलें।'),bi('Sample closure review','नमूना समापन समीक्षा'))
 ],
 'DEMO-1049':[
  step('payments',bi('Reconcile the household payment records','परिवारों के भुगतान रिकॉर्ड मिलाएँ'),bi('Ask the billing desk for account-wise payments and arrears for the affected connections; keep household claims separate from verified entries.','प्रभावित कनेक्शन के खातेवार भुगतान और बकाया बिलिंग डेस्क से लें; परिवारों के दावे और सत्यापित प्रविष्टियाँ अलग रखें।'),bi('Account-wise payment reconciliation','खातेवार भुगतान मिलान')),
  step('disconnect',bi('Obtain the disconnection record and instruction','बिजली काटने का रिकॉर्ड और निर्देश लें'),bi('Request the recorded disconnection basis and the current applicable instruction for officer review. The archived sample checklist cannot establish legality.','अधिकारी की समीक्षा के लिए बिजली काटने का दर्ज आधार और वर्तमान लागू निर्देश माँगें। पुरानी नमूना सूची वैधता सिद्ध नहीं करती।'),bi('Disconnection record and approved instruction','बिजली काटने का रिकॉर्ड और स्वीकृत निर्देश')),
  step('decision',bi('Record the officer’s account-wise response','अधिकारी का खातेवार जवाब दर्ज करें'),bi('The officer reviews the reconciled records and approved instruction, records the response, and confirms what remains unresolved with the representative.','अधिकारी मिले रिकॉर्ड और स्वीकृत निर्देश जाँचें, जवाब लिखें और प्रतिनिधि से बाकी अनसुलझी बात की पुष्टि करें।'),bi('Reviewed response and representative’s update','समीक्षित जवाब और प्रतिनिधि की जानकारी'))
 ]
};
export function seedWorkflow(c){
 const p=caseProfiles[c.id];
 const closed=c.status==='resolved';
 const evidence=closed?[{id:'EVID-DEMO-1048',type:'field',summary:bi('Sample note records transformer replacement on 5 October and restored supply.','नमूना नोट में 5 अक्टूबर को ट्रांसफॉर्मर बदलना और आपूर्ति बहाल होना दर्ज है।'),reference:'DEMO-RESTORE-1048',time:'2026-10-05T10:00:00Z',actorId:'SUPPLY-DEMO',seeded:true}]:[];
 return {status:c.status,assigneeId:p.assignedTo,dueDate:p.dueDate,tasks:closed?Object.fromEntries(actionPlans[c.id].map(s=>[s.id,{status:'done',decision:'accepted',summary:bi('Completed in the fictional starting history.','काल्पनिक शुरुआती इतिहास में पूरा किया गया।'),reference:'DEMO-CLOSURE-1048',seeded:true}])):{},drafts:{},evidence,audit:[],firstActionAt:null,closedAt:closed?'2026-10-07T14:00:00Z':null,closure:closed?{reason:bi('Officer reviewed the restoration note and household acknowledgement before closing the sample case.','अधिकारी ने बहाली नोट और परिवारों की पावती जाँचकर नमूना मामला बंद किया।'),acknowledgement:bi('Representative confirmed restored supply on 7 October.','प्रतिनिधि ने 7 अक्टूबर को बिजली लौटने की पुष्टि की।'),reference:'DEMO-ACK-1048',evidenceId:'EVID-DEMO-1048',seeded:true}:null};
}
export const workflowFor=(state,c)=>state.workflows?.[c.id]||seedWorkflow(c);
export const caseStatus=(state,c)=>workflowFor(state,c).status;
export const nextStep=(state,c)=>actionPlans[c.id].find(s=>!workflowFor(state,c).tasks[s.id]);
export const isOverdue=(state,c)=>{const w=workflowFor(state,c);return w.status!=='resolved'&&!!w.dueDate&&w.dueDate<REVIEW_DATE;};
export const closureReady=(state,c)=>{const w=workflowFor(state,c);return w.status!=='resolved'&&!!w.assigneeId&&actionPlans[c.id].every(s=>w.tasks[s.id])&&Object.values(w.tasks).some(s=>s.status==='done')&&w.evidence.length>0;};
const required=(value,key,max=1800)=>{const v=String(value??'').trim();if(!v)throw new Error(key);return v.slice(0,max);};
const date=(value)=>{const s=required(value,'date',10);if(!/^\d{4}-\d{2}-\d{2}$/.test(s)||!Number.isFinite(Date.parse(s))||new Date(s).toISOString().slice(0,10)!==s)throw new Error('date');return s;};
function edit(state,c){const w=structuredClone(workflowFor(state,c));state.workflows??={};state.workflows[c.id]=w;return w;}
function record(state,c,w,type,details){const time=new Date().toISOString();w.audit.push({id:`LOG-${Date.now()}-${w.audit.length}`,type,time,actorId:demoOfficer.id,...details});state.events.push({type:`workflow_${type}`,caseId:c.id,time});}
function ensureOpen(state,c){if(caseStatus(state,c)==='resolved')throw new Error('closed');}
export function assignCase(state,c,input){
 ensureOpen(state,c);if(!demoStaff.some(p=>p.id===input.assigneeId))throw new Error('assignee');
 const dueDate=date(input.dueDate),summary=required(input.summary,'summary');
 const w=edit(state,c);w.assigneeId=input.assigneeId;w.dueDate=dueDate;
 record(state,c,w,'assigned',{summary,assigneeId:input.assigneeId,dueDate});return w;
}
export function saveActionDraft(state,c,stepId,body){
 ensureOpen(state,c);if(!actionPlans[c.id].some(s=>s.id===stepId))throw new Error('step');
 const text=required(body,'summary',4000);const w=edit(state,c);w.drafts[stepId]=text;
 record(state,c,w,'draft',{stepId,summary:bi('Request draft saved. It has not been sent.','अनुरोध का ड्राफ्ट सहेजा गया। इसे भेजा नहीं गया है।')});return w;
}
export function recordStep(state,c,input){
 ensureOpen(state,c);const current=workflowFor(state,c);
 if(!current.assigneeId)throw new Error('assignee');
 if(!actionPlans[c.id].some(s=>s.id===input.stepId)||current.tasks[input.stepId])throw new Error('step');
 if(!['accepted','modified','rejected'].includes(input.decision))throw new Error('decision');
 const summary=required(input.summary,'summary');
 const reference=input.decision==='rejected'?'':required(input.reference,'reference',160);
 const w=edit(state,c),time=new Date().toISOString();
 w.tasks[input.stepId]={status:input.decision==='rejected'?'set-aside':'done',decision:input.decision,summary,reference,time,actorId:demoOfficer.id};
 if(reference)w.evidence.push({id:`EVID-${Date.now()}-${w.evidence.length}`,type:'review',summary,reference,time,actorId:demoOfficer.id});
 if(!w.firstActionAt)w.firstActionAt=time;
 w.status=actionPlans[c.id].every(s=>w.tasks[s.id])?'review':'progress';
 record(state,c,w,'step',{stepId:input.stepId,decision:input.decision,summary,reference});return w;
}
export function recordUpdate(state,c,input){
 ensureOpen(state,c);if(!workflowFor(state,c).assigneeId)throw new Error('assignee');
 if(!['field','citizen','followup'].includes(input.kind))throw new Error('kind');
 if(!['review','progress','waiting'].includes(input.status))throw new Error('status');
 const summary=required(input.summary,'summary'),reference=required(input.reference,'reference',160),dueDate=date(input.dueDate);
 const w=edit(state,c),time=new Date().toISOString();
 w.evidence.push({id:`EVID-${Date.now()}-${w.evidence.length}`,type:input.kind,summary,reference,time,actorId:demoOfficer.id});
 w.status=input.status;w.dueDate=dueDate;if(!w.firstActionAt)w.firstActionAt=time;
 record(state,c,w,'update',{kind:input.kind,summary,reference,dueDate,status:input.status});return w;
}
export function closeCase(state,c,input){
 ensureOpen(state,c);if(!closureReady(state,c))throw new Error('closure');
 const current=workflowFor(state,c);if(!current.evidence.some(x=>x.id===input.evidenceId))throw new Error('reference');
 const reason=required(input.reason,'summary'),acknowledgement=required(input.acknowledgement,'acknowledgement'),reference=required(input.reference,'reference',160);
 if(input.confirmed!==true)throw new Error('confirm');
 const w=edit(state,c);w.status='resolved';w.closedAt=new Date().toISOString();w.dueDate=null;
 w.closure={reason,acknowledgement,reference,evidenceId:input.evidenceId,actorId:demoOfficer.id};
 record(state,c,w,'closed',{summary:reason,reference});return w;
}
export function reopenCase(state,c,input){
 if(caseStatus(state,c)!=='resolved')throw new Error('closed');
 const summary=required(input.summary,'summary'),dueDate=date(input.dueDate);
 const w=edit(state,c);w.status='review';w.closedAt=null;w.closure=null;w.tasks={};w.dueDate=dueDate;
 record(state,c,w,'reopened',{summary,dueDate});return w;
}
export function actionDraft(state,c,step,lang='en'){
 const w=workflowFor(state,c);if(w.drafts[step.id])return w.drafts[step.id];
 const p=caseProfiles[c.id],staff=demoStaff.find(x=>x.id===w.assigneeId);
 const asset=typeof p.asset==='string'?p.asset:p.asset[lang];
 if(lang==='hi')return `काल्पनिक ड्राफ्ट — भेजा नहीं गया\nप्रति: ${staff?staff.name.hi+' · '+staff.role.hi:'अधिकारी द्वारा चुना जाने वाला डेस्क'}\nमामला: ${c.id} — ${c.title.hi}\nप्रतिनिधि: ${p.name.hi} · ${p.contact} (डेमो संपर्क)\nपता: ${p.house.hi}, वार्ड ${p.ward}, ${p.village.hi}, ${p.panchayat.hi}, ${c.block.hi}, ${c.district.hi}, बिहार\nपहचान: ${p.service} · ${asset}\nस्थान की पहचान: ${p.landmark.hi}\n\n${step.request.hi}\n\nमाँगा गया रिकॉर्ड: ${step.evidence.hi}\nअधिकारी की अगली समीक्षा: ${w.dueDate||'तारीख चुनें'} (सेवा समय-सीमा नहीं)\n\nकृपया निष्कर्ष, रिकॉर्ड संदर्भ और लंबित बिंदु बताएँ।`;
 return `FICTIONAL DRAFT — NOT SENT\nTo: ${staff?staff.name.en+' · '+staff.role.en:'Desk to be selected by the officer'}\nCase: ${c.id} — ${c.title.en}\nRepresentative: ${p.name.en} · ${p.contact} (demo contact)\nAddress: ${p.house.en}, Ward ${p.ward}, ${p.village.en}, ${p.panchayat.en}, ${c.block.en}, ${c.district.en}, Bihar\nService reference: ${p.service} · ${asset}\nLandmark: ${p.landmark.en}\n\n${step.request.en}\n\nRecord requested: ${step.evidence.en}\nOfficer’s next review: ${w.dueDate||'Choose a date'} (not a service deadline)\n\nPlease record findings, evidence references and outstanding items.`;
}
