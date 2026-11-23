const pages = ["home","motivation","ar","vr","companion","planner","reflection"];
const labels = {home:"Beranda",motivation:"Motivasi Belajar",ar:"AR Explorer",vr:"VR Simulation",companion:"AI Companion",planner:"Learning Planner",reflection:"Reflection Journal"};
function showPage(name){
  if(!pages.includes(name)) name="home";
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+name));
  document.querySelectorAll(".nav-link").forEach(a=>a.classList.toggle("active",a.dataset.page===name));
  document.getElementById("crumb").textContent=labels[name];
  document.getElementById("sidebar").classList.remove("open");
  history.replaceState(null,"","#"+name);
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-page]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();showPage(a.dataset.page)}));
document.querySelectorAll("[data-go]").forEach(a=>a.addEventListener("click",()=>showPage(a.dataset.go)));
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
const initial=location.hash.replace("#",""); if(pages.includes(initial)) showPage(initial);

const confidence=document.getElementById("confidence");
confidence.addEventListener("input",()=>document.getElementById("confidenceVal").textContent=confidence.value+"/10");
document.getElementById("saveCheckin").addEventListener("click",()=>{
 const goal=document.getElementById("goal").value.trim(), barrier=document.getElementById("barrier").value, score=confidence.value;
 const box=document.getElementById("checkinFeedback");
 if(!goal||!barrier){box.textContent="Lengkapi tujuan belajar dan pilih hambatan yang sedang dihadapi.";box.classList.remove("hidden");return}
 const data={goal,barrier,score,date:new Date().toISOString()};localStorage.setItem("ippl-checkin",JSON.stringify(data));
 box.textContent=`Refleksi awal tersimpan. Tujuanmu: "${goal}". Keyakinan diri ${score}/10. Langkah awal: pecah tujuan menjadi tugas kecil dan tangani hambatan "${barrier.toLowerCase()}" dengan strategi yang spesifik.`;
 box.classList.remove("hidden");
});

document.getElementById("startAR").addEventListener("click",()=>{
 const stage=document.getElementById("arStage");
 stage.innerHTML=`<a-scene embedded vr-mode-ui="enabled:false" renderer="logarithmicDepthBuffer:true" arjs="sourceType: webcam; debugUIEnabled:false;" style="width:100%;height:350px"><a-marker preset="hiro"><a-box position="0 0.5 0" material="color:#315d49; metalness:0.2; roughness:0.4"><a-text value="NIAT" align="center" color="#f4d99c" position="0 0.8 0" scale="1.2 1.2 1.2"></a-text></a-box><a-text value="NIAT • IKHTIAR • MUHASABAH" position="-1 1.5 0" color="#244a3e" scale="0.7 0.7 0.7"></a-text></a-marker><a-entity camera></a-entity></a-scene>`;
});
document.getElementById("enterVR").addEventListener("click",()=>{
 const el=document.getElementById("vrContainer");el.classList.toggle("hidden");
 document.getElementById("enterVR").textContent=el.classList.contains("hidden")?"Buka ruang VR interaktif ↗":"Tutup ruang VR";
});

const responseBank=[
 {keys:["tunda","prokrastin","menunda"],text:"Coba mulai dengan prinsip langkah terkecil. Pilih satu tugas, tentukan hasil yang jelas, lalu kerjakan selama 10–25 menit. Setelah itu evaluasi: apa yang membuatmu tertahan? Dalam regulasi diri, pemantauan dan penyesuaian strategi sama pentingnya dengan menetapkan tujuan."},
 {keys:["motivasi","semangat"],text:"Hubungkan materi PAI dengan tujuan yang bermakna, bukan hanya kewajiban menyelesaikan tugas. Tetapkan target yang terukur, pilih tantangan yang realistis, dan catat kemajuan kecil. Keyakinan bahwa kamu mampu berkembang dapat dibangun melalui pengalaman keberhasilan bertahap."},
 {keys:["target","rencana","jadwal"],text:"Gunakan target yang spesifik: apa yang dipelajari, kapan, berapa lama, dan bukti keberhasilannya. Contoh: 'Selasa pukul 19.00, membaca 5 halaman dan membuat peta konsep selama 30 menit.' Sisakan waktu untuk mengecek pemahaman dan memperbaiki strategi."},
 {keys:["fokus","konsentrasi"],text:"Kurangi distraksi sebelum belajar: siapkan bahan, jauhkan notifikasi, dan gunakan satu sesi fokus singkat. Setelah sesi, beri jeda dan cek apakah strategi tadi efektif. Jangan hanya menilai lamanya belajar; perhatikan kualitas keterlibatan dan pemahaman."},
 {keys:["pai","islam"],text:"Dalam pembelajaran PAI, niat memberi arah, ikhtiar diwujudkan melalui strategi, amanah menguatkan tanggung jawab, dan muhasabah membantu mengevaluasi proses. Nilai-nilai ini dapat menjadi landasan refleksi, bukan pengganti strategi belajar yang konkret."}
];
function companionReply(q){
 const lower=q.toLowerCase();const found=responseBank.find(item=>item.keys.some(k=>lower.includes(k)));
 return (found?found.text:"Mari kita uraikan situasinya. Pertama, jelaskan tujuan yang ingin dicapai. Kedua, identifikasi hambatan yang paling nyata. Ketiga, pilih satu strategi kecil yang bisa dilakukan hari ini. Menurutmu, bagian mana yang paling membutuhkan perhatian?")+"\\n\\nPertanyaan refleksi: bukti apa yang dapat kamu gunakan untuk mengetahui bahwa strategimu berhasil?";
}
function addMessage(text,isUser=false){
 const wrap=document.createElement("div");wrap.className="message "+(isUser?"user":"ai");
 const avatar=document.createElement("span");avatar.className="message-avatar";avatar.textContent=isUser?"A":"✧";
 const content=document.createElement("div");const small=document.createElement("small");small.textContent=isUser?"YOU":"LEARNING COMPANION";
 const p=document.createElement("p");p.textContent=text;content.append(small,p);wrap.append(avatar,content);document.getElementById("chatMessages").append(wrap);
 document.getElementById("chatMessages").scrollTop=document.getElementById("chatMessages").scrollHeight;
}
function sendPrompt(q){if(!q.trim())return;addMessage(q,true);setTimeout(()=>addMessage(companionReply(q)),250)}
document.getElementById("chatForm").addEventListener("submit",e=>{e.preventDefault();const input=document.getElementById("chatInput");sendPrompt(input.value);input.value=""});
document.querySelectorAll("[data-prompt]").forEach(b=>b.addEventListener("click",()=>sendPrompt(b.dataset.prompt)));

let plans=JSON.parse(localStorage.getItem("ippl-plans")||"[]");
function renderPlans(){
 const list=document.getElementById("planList");list.innerHTML="";
 if(!plans.length){list.innerHTML='<div class="empty-state">Belum ada target. Mulai dengan satu langkah kecil.</div>'}
 plans.forEach((p,i)=>{
  const item=document.createElement("label");item.className="plan-item"+(p.done?" done":"");
  const cb=document.createElement("input");cb.type="checkbox";cb.checked=p.done;cb.addEventListener("change",()=>{plans[i].done=cb.checked;persistPlans()});
  const body=document.createElement("span");const title=document.createElement("b");title.textContent=p.title;const small=document.createElement("small");small.textContent=p.day+" · "+p.time+" · "+p.strategy;body.append(title,small);item.append(cb,body);list.append(item);
 });
 const done=plans.filter(p=>p.done).length;const pct=plans.length?Math.round(done/plans.length*100):0;
 document.getElementById("planCount").textContent=plans.length+" target";document.getElementById("progressText").textContent=pct+"%";document.getElementById("progressBar").style.width=pct+"%";
}
function persistPlans(){localStorage.setItem("ippl-plans",JSON.stringify(plans));renderPlans()}
document.getElementById("addPlan").addEventListener("click",()=>{
 const title=document.getElementById("planTitle").value.trim(),strategy=document.getElementById("planStrategy").value.trim();
 if(!title||!strategy){alert("Isi target dan strategi belajar terlebih dahulu.");return}
 plans.push({title,strategy,day:document.getElementById("planDay").value,time:document.getElementById("planTime").value,done:false});
 document.getElementById("planTitle").value="";document.getElementById("planStrategy").value="";persistPlans();
});
renderPlans();

document.getElementById("saveReflection").addEventListener("click",()=>{
 const entry={learning:document.getElementById("reflection1").value.trim(),strategy:document.getElementById("reflection2").value.trim(),action:document.getElementById("reflection3").value.trim(),date:new Date().toISOString()};
 const box=document.getElementById("reflectionFeedback");
 if(!entry.learning||!entry.strategy||!entry.action){box.textContent="Lengkapi ketiga bagian refleksi sebelum menyimpan.";box.classList.remove("hidden");return}
 const entries=JSON.parse(localStorage.getItem("ippl-reflections")||"[]");entries.push(entry);localStorage.setItem("ippl-reflections",JSON.stringify(entries));
 box.textContent="Jurnal refleksi berhasil disimpan di browser ini. Terima kasih sudah meluangkan waktu untuk mengevaluasi proses belajar.";box.classList.remove("hidden");
});
document.getElementById("choices").addEventListener("click",e=>{
 const btn=e.target.closest("[data-choice]");if(!btn)return;
 document.querySelectorAll(".choice").forEach(c=>c.style.borderColor="#e1e8e1");
 btn.style.borderColor="#5e8b68";
 const box=document.getElementById("scenarioFeedback");
 box.textContent=btn.dataset.choice==="B"?"Pilihan tepat. Menetapkan prioritas, memecah tugas, dan memulai dari langkah kecil menunjukkan perencanaan serta pengelolaan perilaku belajar. Setelah bertindak, pantau hasilnya dan sesuaikan strategi.":"Pilihan ini belum membantu mengelola hambatan secara langsung. Coba pikirkan strategi yang membuat tujuan lebih terukur dan tindakan pertama lebih mudah dilakukan.";
 box.classList.remove("hidden");
});
