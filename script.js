const $=s=>document.querySelector(s),R=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)};
document.querySelectorAll("#menu a").forEach(a=>a.onclick=()=>menu.classList.remove("open"));
/* reveal + counters */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in")}}),{threshold:.15});
function rv(){document.querySelectorAll(".glass,h2,.sub").forEach(e=>{if(!e.classList.contains("in")){e.classList.add("rv");io.observe(e)}})}
document.querySelectorAll("[data-n]").forEach(el=>{const n=+el.dataset.n;let i=0;const t=setInterval(()=>{i+=n/60;el.textContent=Math.round(Math.min(i,n)).toLocaleString();if(i>=n)clearInterval(t)},25)});
/* floating formulas */
const FL=["e^{iπ}+1=0","∇·E=ρ/ε₀","∫e^{-x²}dx=√π","a²+b²=c²","Σ1/n²=π²/6","φ=(1+√5)/2","dy/dx","∞","Δx→0","sin²θ+cos²θ=1"];
function formulaBurst(){for(let i=0;i<8;i++){const s=document.createElement("span");s.className="fl";s.textContent=FL[R(0,FL.length-1)];s.style.cssText=`left:${R(2,85)}%;top:${R(8,85)}%;animation-duration:${R(8,16)}s;font-size:${R(1,2)}rem`;$("#hero").appendChild(s);setTimeout(()=>s.remove(),14000)}toast("Formulalar paydo boʻldi ✨")}
formulaBurst();setInterval(formulaBurst,9000);
/* 3D surfaces */
function surface(cv,fn){const r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true}),sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,1,.1,100);cam.position.set(0,3,8);cam.lookAt(0,0,0);
const N=50,pos=new Float32Array((N+1)*(N+1)*3),col=new Float32Array(pos.length),idx=[];for(let i=0;i<N;i++)for(let j=0;j<N;j++){const a=i*(N+1)+j,c=a+N+1;idx.push(a,a+1,c,a+1,c+1,c)}
const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("color",new THREE.BufferAttribute(col,3));g.setIndex(idx);
const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({vertexColors:true,wireframe:true,transparent:true,opacity:.8}));sc.add(m);
const o={fn,spd:1,auto:true,t:0};let dr=false;cv.onpointerdown=()=>dr=true;addEventListener("pointerup",()=>dr=false);cv.onpointermove=e=>{if(dr){m.rotation.y+=e.movementX*.01;m.rotation.x+=e.movementY*.01}};
(function L(){const w=cv.clientWidth,h=cv.clientHeight,k=w+"x"+h;if(cv._k!==k&&w){cv._k=k;r.setPixelRatio(Math.min(devicePixelRatio,2));r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
o.t+=.02*o.spd;for(let i=0;i<=N;i++)for(let j=0;j<=N;j++){const p=o.fn(i/N,j/N,o.t),k=(i*(N+1)+j)*3,h=Math.max(0,Math.min(1,(p[1]+2)/4));pos[k]=p[0];pos[k+1]=p[1];pos[k+2]=p[2];col[k]=.2+.8*h;col[k+1]=.9-.6*h;col[k+2]=1}
g.attributes.position.needsUpdate=g.attributes.color.needsUpdate=true;if(o.auto)m.rotation.y+=.003*o.spd;r.render(sc,cam);requestAnimationFrame(L)})();return o}
const P2=Math.PI*2,S={
"Toʻlqin":["y = sin(√(x²+z²) − t)",(u,v,t)=>{const x=(u-.5)*9,z=(v-.5)*9;return[x,Math.sin(Math.hypot(x,z)*1.4-t*3)*.7,z]}],
"Tor":["(R+r·cos v)·(cos u, sin u)",(u,v)=>{const a=u*P2,b=v*P2;return[(2.2+.8*Math.cos(b))*Math.cos(a),.8*Math.sin(b)*1.5,(2.2+.8*Math.cos(b))*Math.sin(a)]}],
"Myobius lentasi":["bir tomon, bir qirra",(u,v)=>{const a=u*P2,s=(v-.5)*1.8;return[(2.2+s*Math.cos(a/2))*Math.cos(a),s*Math.sin(a/2)*1.5,(2.2+s*Math.cos(a/2))*Math.sin(a)]}],
"Egar":["z = x² − y²",(u,v)=>{const x=(u-.5)*5,z=(v-.5)*5;return[x,(x*x-z*z)/3.5,z]}],
"Garmonik shakl":["r = 1.7 + sin3θ·sin2φ",(u,v,t)=>{const a=u*P2,b=v*Math.PI,r=2+.7*Math.sin(3*a+t)*Math.sin(2*b);return[r*Math.sin(b)*Math.cos(a),r*Math.cos(b),r*Math.sin(b)*Math.sin(a)]}]};
const hero=surface($("#hc"),S["Toʻlqin"][1]);hero.spd=.6;
const ex=surface($("#ec"),S["Tor"][1]);
Object.keys(S).forEach((k,i)=>{const b=document.createElement("button");b.textContent=k;b.onclick=()=>{ex.fn=S[k][1];$("#sf").textContent=S[k][0];document.querySelectorAll("#sbt button").forEach(x=>x.classList.remove("on"));b.classList.add("on")};if(i==1)b.click();$("#sbt").appendChild(b)});
$("#sp").oninput=e=>ex.spd=+e.target.value;
/* AI solver */
const EX=["hosila x^3*sin(x)","yech x^2-5x+6=0","integral x^2 0 dan 3 gacha","soddalashtir (x+1)^2-x^2","sqrt(144)+3!","yech 2x+7=19"];
EX.forEach(e=>{const b=document.createElement("button");b.className="chip";b.textContent=e;b.onclick=()=>{$("#q").value=e;solve()};$("#chips").appendChild(b)});
$("#q").onkeydown=e=>{if(e.key=="Enter")solve()};
function roots(f,a=-60,b=60){const rs=[];let p=a,fp=f(p);for(let x=a+.01;x<=b;x+=.01){const fx=f(x);if(isFinite(fp)&&isFinite(fx)&&fp*fx<=0&&Math.abs(fx-fp)<50){let l=p,h=x;for(let i=0;i<60;i++){const mid=(l+h)/2;f(l)*f(mid)<=0?h=mid:l=mid}const r=+((l+h)/2).toFixed(6);if(!rs.some(y=>Math.abs(y-r)<1e-3))rs.push(r)}p=x;fp=fx}return rs}
function solve(){let s=$("#q").value.trim().replace(/^hosila\s*/i,"derivative of ").replace(/^yech\s+/i,"solve ").replace(/^integral\s+(.+?)\s+(\S+)\s+dan\s+(\S+)\s+gacha$/i,"integrate $1 from $2 to $3").replace(/^soddalashtir\s+/i,"simplify "),L=[],A="",m;try{
if(m=s.match(/^(?:derivative|differentiate|d\/dx)\s*(?:of)?\s*(.+)/i)){const d=math.derivative(m[1],"x");L=["Masala: differensiallash: "+m[1],"Qoida: koʻpaytma, murakkab funksiya va daraja qoidalarini qoʻllaymiz","d/dx → "+d.toString(),"Soddalashtirilgan: "+math.simplify(d).toString()];A="f′(x) = "+math.simplify(d).toString()}
else if(m=s.match(/^integrate\s+(.+?)\s+from\s+(.+?)\s+to\s+(.+)/i)){const f=math.compile(m[1]),a=+math.evaluate(m[2]),b=+math.evaluate(m[3]),n=2000,h=(b-a)/n;let t=f.evaluate({x:a})+f.evaluate({x:b});for(let i=1;i<n;i++)t+=f.evaluate({x:a+i*h})*(i%2?4:2);const v=t*h/3;L=["Masala: ∫ "+m[1]+" dx, oraliq ["+a+", "+b+"]","Usul: Simpson qoidasi, n = "+n,"Vaznli qiymatlar yigʻindisini h/3 ga koʻpaytiramiz","Natija hisoblandi"];A="≈ "+math.round(v,6)}
else if(m=s.match(/^solve\s+(.+?)=(.+)/i)){const f=x=>math.evaluate(`(${m[1]})-(${m[2]})`,{x}),rs=roots(f);L=["Masala: yechish: "+m[1]+" = "+m[2],"Hamma hadlarni bir tomonga oʻtkazamiz: f(x) = ("+m[1]+") − ("+m[2]+") = 0","f(x) ishorasi almashgan joylarni topib, bisektsiya bilan aniqlashtiramiz","Topildi: "+rs.length+" ta haqiqiy ildiz"];A=rs.length?rs.map((r,i)=>"x"+(i+1)+" = "+r).join(",  "):"Haqiqiy ildiz topilmadi"}
else if(m=s.match(/^simplify\s+(.+)/i)){L=["Masala: soddalashtirish: "+m[1],"Qavslarni ochib, oʻxshash hadlarni birlashtiramiz","Algebraik ayniyatlarni qoʻllaymiz"];A=math.simplify(m[1]).toString()}
else{const v=math.evaluate(s);L=["Masala: hisoblash: "+s,"Amallar tartibiga amal qilamiz","Natijani hisoblaymiz"];A="= "+math.format(v,{precision:10})}
}catch(e){L=["⚠ Buni tushuna olmadim.","Sinab koʻring: yech x^2-4=0 · hosila sin(x) · 2^10"];A=""}
$("#out").textContent="";$("#ans").textContent="";L.forEach((l,i)=>setTimeout(()=>{$("#out").textContent+=(i+1)+". "+l+"\n\n";if(i==L.length-1)$("#ans").textContent=A},i*450))}
/* graphing */
const gc=$("#gc"),gx=gc.getContext("2d");let vw={cx:0,cy:0,s:50},cs=[];const CL=["#00e5ff","#ff4fd8","#ffd75e"];
function pre(a,b,c){$("#f1").value=a;$("#f2").value=b;$("#f3").value=c;draw()}
function zoom(k){vw.s/=k;draw()}
function draw(){const d=devicePixelRatio||1,W=gc.clientWidth,H=gc.clientHeight;gc.width=W*d;gc.height=H*d;gx.setTransform(d,0,0,d,0,0);const X=x=>W/2+(x-vw.cx)*vw.s,Y=y=>H/2-(y-vw.cy)*vw.s;
const st=vw.s>90?.5:vw.s>30?1:vw.s>12?5:10;gx.lineWidth=1;gx.font="11px monospace";gx.fillStyle="#8b93b8";
for(let x=Math.ceil((vw.cx-W/2/vw.s)/st)*st;X(x)<W;x+=st){gx.strokeStyle=x==0?"#8b93b8":"rgba(255,255,255,.07)";gx.beginPath();gx.moveTo(X(x),0);gx.lineTo(X(x),H);gx.stroke();if(x)gx.fillText(+x.toFixed(2),X(x)+2,Y(0)+12)}
for(let y=Math.ceil((vw.cy-H/2/vw.s)/st)*st;Y(y)>0;y+=st){gx.strokeStyle=y==0?"#8b93b8":"rgba(255,255,255,.07)";gx.beginPath();gx.moveTo(0,Y(y));gx.lineTo(W,Y(y));gx.stroke();if(y)gx.fillText(+y.toFixed(2),X(0)+4,Y(y)-2)}
cs=["#f1","#f2","#f3"].map(i=>{try{return math.compile($(i).value.replace(/(\d)x/g,"$1*x"))}catch(e){return null}});
cs.forEach((c,k)=>{if(!c)return;gx.strokeStyle=CL[k];gx.lineWidth=2.5;gx.shadowColor=CL[k];gx.shadowBlur=10;gx.beginPath();let pen=false,py=0;for(let px=0;px<=W;px+=1.5){const x=vw.cx+(px-W/2)/vw.s;let y;try{y=c.evaluate({x})}catch(e){y=NaN}if(typeof y!="number"||!isFinite(y)||Math.abs(y-py)>H/vw.s*2&&pen){pen=false;py=y;continue}pen?gx.lineTo(px,Y(y)):gx.moveTo(px,Y(y));pen=true;py=y}gx.stroke();gx.shadowBlur=0})}
let pd=null;gc.onpointerdown=e=>pd=[e.clientX,e.clientY];addEventListener("pointerup",()=>pd=null);
gc.onpointermove=e=>{const r=gc.getBoundingClientRect(),x=vw.cx+(e.clientX-r.left-r.width/2)/vw.s;if(pd){vw.cx-=(e.clientX-pd[0])/vw.s;vw.cy+=(e.clientY-pd[1])/vw.s;pd=[e.clientX,e.clientY];draw()}try{$("#tr").textContent=`x=${x.toFixed(2)}  f₁=${(+cs[0].evaluate({x})).toFixed(3)}`}catch(e){}};
gc.onwheel=e=>{e.preventDefault();zoom(e.deltaY<0?.85:1.18)};["#f1","#f2","#f3"].forEach(i=>$(i).oninput=draw);addEventListener("resize",draw);draw();
/* geometry */
const gg=$("#gg"),go=gg.getContext("2d");let T=[{x:300,y:60},{x:90,y:300},{x:510,y:310}],opt={cc:true,cg:true},dg=-1;
function tg(k){opt[k]=!opt[k];$(k=="cc"?"#bc":"#bg").classList.toggle("on")}
function rndT(){T=T.map(()=>({x:R(60,540),y:R(40,340)}))}
function pt(e){const r=gg.getBoundingClientRect();return{x:(e.clientX-r.left)*600/r.width,y:(e.clientY-r.top)*380/r.height}}
gg.onpointerdown=e=>{const p=pt(e);dg=T.findIndex(t=>Math.hypot(t.x-p.x,t.y-p.y)<24)};addEventListener("pointerup",()=>dg=-1);gg.onpointermove=e=>{if(dg>=0){const p=pt(e);T[dg]={x:Math.max(10,Math.min(590,p.x)),y:Math.max(10,Math.min(370,p.y))}}};
function gl(){go.clearRect(0,0,600,380);const[A,B,C]=T,d=(p,q)=>Math.hypot(p.x-q.x,p.y-q.y)/40,a=d(B,C),b=d(A,C),c=d(A,B),ar=Math.abs((B.x-A.x)*(C.y-A.y)-(C.x-A.x)*(B.y-A.y))/2/1600,ang=(x,y,z)=>Math.acos(Math.max(-1,Math.min(1,(y*y+z*z-x*x)/(2*y*z))))*180/Math.PI;
go.strokeStyle="rgba(255,255,255,.06)";for(let i=0;i<600;i+=40){go.beginPath();go.moveTo(i,0);go.lineTo(i,380);go.stroke()}for(let i=0;i<380;i+=40){go.beginPath();go.moveTo(0,i);go.lineTo(600,i);go.stroke()}
const D=2*(A.x*(B.y-C.y)+B.x*(C.y-A.y)+C.x*(A.y-B.y));
if(opt.cc&&D){const ux=((A.x**2+A.y**2)*(B.y-C.y)+(B.x**2+B.y**2)*(C.y-A.y)+(C.x**2+C.y**2)*(A.y-B.y))/D,uy=((A.x**2+A.y**2)*(C.x-B.x)+(B.x**2+B.y**2)*(A.x-C.x)+(C.x**2+C.y**2)*(B.x-A.x))/D;go.strokeStyle="#ff4fd8";go.setLineDash([6,6]);go.beginPath();go.arc(ux,uy,Math.hypot(A.x-ux,A.y-uy),0,P2);go.stroke();go.setLineDash([])}
go.fillStyle="rgba(124,92,255,.25)";go.strokeStyle="#00e5ff";go.lineWidth=2.5;go.beginPath();go.moveTo(A.x,A.y);go.lineTo(B.x,B.y);go.lineTo(C.x,C.y);go.closePath();go.fill();go.stroke();
if(opt.cg){go.fillStyle="#ffd75e";go.beginPath();go.arc((A.x+B.x+C.x)/3,(A.y+B.y+C.y)/3,5,0,P2);go.fill()}
T.forEach((t,i)=>{go.fillStyle="#fff";go.beginPath();go.arc(t.x,t.y,9,0,P2);go.fill();go.fillStyle="#05060f";go.font="bold 11px sans-serif";go.fillText("ABC"[i],t.x-4,t.y+4)});
const A1=ang(a,b,c),B1=ang(b,a,c),C1=180-A1-B1,ty=Math.abs(Math.max(A1,B1,C1)-90)<1?"Toʻgʻri burchakli":Math.max(A1,B1,C1)>90?"Oʻtmas burchakli":"Oʻtkir burchakli",ts=Math.abs(a-b)<.05&&Math.abs(b-c)<.05?"teng tomonli":(Math.abs(a-b)<.05||Math.abs(b-c)<.05||Math.abs(a-c)<.05)?"teng yonli":"turli tomonli";
$("#gi").innerHTML=`a = ${a.toFixed(2)} · b = ${b.toFixed(2)} · c = ${c.toFixed(2)}<br>∠A = ${A1.toFixed(1)}° · ∠B = ${B1.toFixed(1)}° · ∠C = ${C1.toFixed(1)}°<br>Perimetr = ${(a+b+c).toFixed(2)}<br>Yuza = ${ar.toFixed(2)}<br>Turi: <b style="color:var(--b)">${ty} ${ts}</b>`;requestAnimationFrame(gl)}gl();
/* mathematicians */
const MM=[["Yevklid","taxm. m.a. 300-y.","Geometriya","Geometriya otasi","Uning «Negizlar» asari geometriyani aksioma va isbotlar tizimiga soldi va ikki ming yildan ortiq mantiqiy fikrlash namunasi boʻlib keldi."],
["Leonard Eyler","1707–1783","Tahlil","Belgilash ustasi","Matematikaning deyarli barcha sohalarida samarali ishlagan; e, i va f(x) belgilarini joriy qilgan va graflar nazariyasiga asos solgan."],
["Karl F. Gauss","1777–1855","Sonlar nazariyasi","Matematiklar shohi","Algebraning asosiy teoremasini isbotlagan, modul arifmetikasini va normal taqsimotni rivojlantirgan."],
["Srinivasa Ramanujan","1887–1920","Sonlar nazariyasi","Oʻzi oʻrgangan daho","Rasmiy taʼlimsiz ham cheksiz qatorlar va partitsiyalar boʻyicha minglab hayratlanarli natijalar yaratgan."],
["Emmi Noeter","1882–1935","Algebra","Simmetriya kaliti","Uning teoremasi simmetriyani fizikadagi saqlanish qonunlari bilan bogʻlaydi va zamonaviy algebrani oʻzgartirib yuborgan."],
["Alan Tyuring","1912–1954","Hisoblash","Kompyuterlar me’mori","Algoritmlarni Tyuring mashinasi orqali rasmiylashtirgan va informatika hamda sun’iy intellekt poydevorini qoʻygan."],
["Ada Lovleys","1815–1852","Dasturlash","Birinchi dasturchi","Mashina uchun birinchi nashr etilgan algoritmni yozgan va kompyuterlar faqat sonlar bilan chegaralanmasligini oldindan koʻrgan."],
["Maryam Mirzaxoniy","1977–2017","Geometriya","2014-yil Fildis medali","Fildis medalini olgan birinchi ayol; Riman sirtlarining dinamikasi va geometriyasidagi chuqur ishlari uchun."]];
MM.forEach((m,i)=>{const d=document.createElement("div");d.className="glass mc";d.innerHTML=`<div class="av">${m[0][0]}</div><h3>${m[0]}</h3><small>${m[1]} · ${m[2]}</small><p style="color:var(--m);margin-top:8px">${m[3]}</p>`;d.onclick=()=>{$("#mb").innerHTML=`<div class="av">${m[0][0]}</div><h2 class="grad" style="font-size:2rem">${m[0]}</h2><small style="color:var(--b)">${m[1]} · ${m[2]}</small><p style="margin:14px 0">${m[4]}</p><button class="pri" onclick="$('#modal').classList.remove('show')">Close</button>`;$("#modal").classList.add("show")};$("#mg").appendChild(d)});
/* challenges */
const gens=[()=>{const a=R(2,9),x=R(-9,9),b=R(1,20);return{q:`Yeching: ${a}x + ${b} = ${a*x+b}. x = ?`,a:x,h:"Avval b ni ayiring, keyin a ga boʻling."}},
()=>{const k=R(2,6),p=R(1,5);return{q:`Agar f(x) = ${k}x² boʻlsa, f′(${p}) nimaga teng?`,a:2*k*p,h:"f′(x) = 2kx."}},
()=>{const n=R(5,20);return{q:`1 + 2 + … + ${n} nimaga teng?`,a:n*(n+1)/2,h:"n(n+1)/2 formulasidan foydalaning."}},
()=>{const n=R(5,12);return{q:`2^${n} nimaga teng?`,a:2**n,h:"Ketma-ket ikkilantiring."}},
()=>{const t=[[3,4,5],[5,12,13],[8,15,17],[7,24,25]][R(0,3)],k=R(1,3);return{q:`Toʻgʻri burchakli uchburchak katetlari ${t[0]*k} va ${t[1]*k}. Gipotenuzani toping.`,a:t[2]*k,h:"Pifagor teoremasi: a² + b² = c²."}}];
let cur,sc=0,sk=0,t0;
function nq(){cur=gens[R(0,gens.length-1)]();$("#cq").textContent=cur.q;$("#ca").value="";$("#cm").textContent="";t0=Date.now();$("#pb").style.width="0"}
function chk(){const v=parseFloat($("#ca").value);if(isNaN(v))return;const s=(Date.now()-t0)/1000;if(Math.abs(v-cur.a)<1e-6){const p=Math.max(20,Math.round(100-s*2))+sk*5;sc+=p;sk++;toast(`Toʻgʻri! +${p} ball`);}else{sk=0;toast("Xato — javob: "+cur.a)}$("#sc").textContent=sc;$("#sk").textContent=sk;nq()}
setInterval(()=>{if(cur){const s=(Date.now()-t0)/1000;$("#tm").textContent=s.toFixed(0);$("#pb").style.width=Math.min(100,s/60*100)+"%"}},250);nq();
/* formulas */
const FM=[["Algebra","Kvadrat tenglama formulasi","x = (−b ± √(b²−4ac)) / 2a"],["Algebra","Nyuton binomi","(a+b)ⁿ = Σ C(n,k) aⁿ⁻ᵏ bᵏ"],["Algebra","Kvadratlar ayirmasi","a² − b² = (a−b)(a+b)"],["Geometriya","Pifagor teoremasi","a² + b² = c²"],["Geometriya","Doira yuzi","A = πr²"],["Geometriya","Shar hajmi","V = (4/3)πr³"],["Geometriya","Kosinuslar teoremasi","c² = a² + b² − 2ab·cos C"],["Tahlil","Daraja hosilasi","d/dx xⁿ = n·xⁿ⁻¹"],["Tahlil","Boʻlaklab integrallash","∫u dv = uv − ∫v du"],["Tahlil","Nyuton–Leybnits formulasi","∫ₐᵇ f(x)dx = F(b) − F(a)"],["Tahlil","Teylor qatori","f(x) = Σ f⁽ⁿ⁾(a)(x−a)ⁿ / n!"],["Trigonometriya","Asosiy ayniyat","sin²θ + cos²θ = 1"],["Trigonometriya","Ikkilangan burchak","sin 2θ = 2 sinθ cosθ"],["Kompleks sonlar","Eyler ayniyati","e^{iπ} + 1 = 0"],["Statistika","Normal zichlik","f(x) = e^{−(x−μ)²/2σ²} / (σ√2π)"],["Statistika","Bayes teoremasi","P(A|B) = P(B|A)·P(A) / P(B)"],["Statistika","Standart ogʻish","σ = √(Σ(xᵢ−μ)² / N)"],["Chiziqli algebra","Xos qiymat tenglamasi","Av = λv"]];
let fc="Hammasi";[...new Set(["Hammasi",...FM.map(f=>f[0])])].forEach(c=>{const b=document.createElement("button");b.textContent=c;b.className="chip"+(c=="Hammasi"?" on":"");b.onclick=()=>{fc=c;document.querySelectorAll("#fch button").forEach(x=>x.classList.remove("on"));b.classList.add("on");rf()};$("#fch").appendChild(b)});
function rf(){const q=$("#fs").value.toLowerCase();$("#fg").innerHTML="";FM.filter(f=>(fc=="Hammasi"||f[0]==fc)&&(f[1]+f[2]).toLowerCase().includes(q)).forEach(f=>{const d=document.createElement("div");d.className="glass fc";d.innerHTML=`<small style="color:var(--c)">${f[0]}</small><h3 style="font-size:1.1rem">${f[1]}</h3><code>${f[2]}</code><small style="color:var(--m)">Nusxalash uchun bosing</small>`;d.onclick=()=>{navigator.clipboard?.writeText(f[2]).catch(()=>{});toast("Nusxalandi: "+f[1])};$("#fg").appendChild(d)})}rf();
/* stats */
const ch=new Chart($("#ch"),{type:"bar",data:{labels:[],datasets:[{data:[],backgroundColor:"rgba(124,92,255,.7)",borderColor:"#00e5ff",borderWidth:1,borderRadius:6}]},options:{maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:"#8b93b8"},grid:{display:false}},y:{ticks:{color:"#8b93b8"},grid:{color:"rgba(255,255,255,.06)"}}}}});
function sim(){const m=$("#sm").value,n=+$("#sn").value,rnd=()=>{const u=1-Math.random(),v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(P2*v)};let lab=[],f;
if(m=="coin"){lab=["Gerb","Raqam"];f=()=>R(0,1)}else if(m=="die"){lab=[1,2,3,4,5,6];f=()=>R(1,6)-1}else if(m=="dice"){lab=[2,3,4,5,6,7,8,9,10,11,12];f=()=>R(1,6)+R(1,6)-2}else{lab=Array.from({length:17},(_,i)=>(-4+i*.5).toFixed(1));f=()=>Math.max(0,Math.min(16,Math.floor((rnd()+4)*2)))}
const c=lab.map(()=>0);let s=0,s2=0;for(let i=0;i<n;i++){const k=f();c[k]++;s+=k;s2+=k*k}const mu=s/n;ch.data.labels=lab;ch.data.datasets[0].data=c;ch.update();$("#ss").textContent=`n=${n}  oʻrtacha indeks=${mu.toFixed(3)}  σ=${Math.sqrt(s2/n-mu*mu).toFixed(3)}`}sim();
const pc=$("#pc"),px=pc.getContext("2d");let pin=0,pt2=0;function mc0(){pin=pt2=0;px.clearRect(0,0,320,320);px.strokeStyle="#00e5ff";px.beginPath();px.arc(0,0,320,0,Math.PI/2);px.stroke();$("#pe").textContent="π ≈ ?"}
function mc(n){for(let i=0;i<n;i++){const x=Math.random(),y=Math.random(),ins=x*x+y*y<=1;ins&&pin++;pt2++;px.fillStyle=ins?"#00e5ff":"#ff4fd8";px.fillRect(x*320,y*320,2,2)}$("#pe").textContent=`π ≈ ${(4*pin/pt2).toFixed(4)} (${pt2})`}mc0();
function sub(){const e=$("#em").value;/^\S+@\S+\.\S+$/.test(e)?(toast("MATHVERSE ga xush kelibsiz! 🚀"),$("#em").value=""):toast("Iltimos, toʻgʻri email kiriting")}
rv();solve();