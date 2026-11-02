from pathlib import Path
import re,json
root=Path(__file__).resolve().parents[1];offices=[]
for company in ['SBPDCL','NBPDCL']:
 source='https://www.'+company.lower()+'.co.in/frmHelplineNumbers.aspx'
 circle=division=subdivision=''
 for l in (root/'evidence'/f'{company.lower()}-directory.md').read_text().splitlines():
  h=re.match(r'^[|\s-]*(Circle|Division)\s*-\s*(.+?)\s*$',l)
  if h:
   if h[1]=='Circle':circle=h[2].strip();division='';subdivision=''
   else:division=h[2].strip();subdivision=''
   continue
  cols=[re.sub(r'[*_]','',c).strip() for c in l.split('|')[1:-1]]
  if not division or len(cols)<3:continue
  posting,role=(cols[1],cols[0]) if company=='SBPDCL' else (cols[0],cols[1])
  phone=re.sub(r'\D','',cols[2])
  if not re.fullmatch(r'\d{10}',phone):continue
  if not re.search(r'JEE|AEE|EEE|Revenue Officer',role,re.I):continue
  if re.search(r'project|MRT|TRW|T.R.W|Civil|store|STF',role,re.I):continue
  if role.upper()=='AEE(SUPPLY)':subdivision=posting
  if 'JEE' in role and 'Revenue' not in role:level='section'
  elif 'Revenue' in role or 'Rev.' in role:level='revenue'
  elif 'AEE' in role:level='subdivision'
  else:level='division'
  if level=='division' and not ('ESD' in posting.upper() or 'ESD' in role.upper()):continue
  offices.append({'id':f'{company}-{len(offices)+1}', 'company':company,'circle':circle,'division':division,'posting':posting,'role':role,'phone':phone,'level':level,'subdivision':subdivision if company=='SBPDCL' and level=='section' else '', 'source':source,'checkedAt':'2026-10-09'})
unique=[];seen=set()
for o in offices:
 k=(o['company'],o['division'],o['posting'],o['role'],o['phone'])
 if k not in seen:unique.append(o);seen.add(k)
(root/'public'/'official-directory.mjs').write_text('// Official public contact-directory snapshot. Regenerate from evidence snapshots; never invent contacts.\nexport const directory = '+json.dumps(unique,ensure_ascii=False,separators=(',',':'))+';\n')
(root/'scripts'/'build-directory.py').write_text(Path(__file__).read_text().replace("root=Path(__file__).resolve().parents[1]","root=Path(__file__).resolve().parents[1]"))
print('Imported',len(unique),'office contacts')
for name in ['Simri','Dumraon','Kanti','Rupouli','Bahadurpur','Tekari','Rajgir','Danapur']:
 print(name,[(o['company'],o['division'],o['posting'],o['role'],o['phone']) for o in unique if name.lower() in (o['posting']+' '+o['role']).lower()][:6])
