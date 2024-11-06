var S=(C,u,c)=>new Promise((x,v)=>{var f=l=>{try{m(c.next(l))}catch(p){v(p)}},b=l=>{try{m(c.throw(l))}catch(p){v(p)}},m=l=>l.done?x(l.value):Promise.resolve(l.value).then(f,b);m((c=c.apply(C,u)).next())});import{_ as E,a as I}from"./AppHeader.1d5d11ab.js";import{n as r,R as O,a as h,e as z,o as a,f as i,p as e,g as y,L as k,S as j,N as D,v as o,t as d,K as P,T,c as H}from"./vendor.8ee4b109.js";import"./index.c022bc80.js";const K={class:"flex h-screen w-screen"},L={class:"h-full border-r bg-gray-50"},R={class:"flex flex-1 flex-col h-full"},$={class:"flex-1 overflow-auto p-6"},U={class:"project-detail border rounded-lg bg-white"},W={class:"tabs flex mb-5 h-12 border-b w-full px-4"},q=["onClick"],G={key:0,class:"project-overview rounded-lg bg-white p-6"},J={class:"text-2xl font-semibold text-gray-800 mb-4"},Q={class:"text-gray-600 mb-6 text-base"},X={class:"overview-info grid grid-cols-2 gap-4 text-sm border-t border-gray-200 pt-4"},Y={class:"flex items-center"},Z={class:"text-gray-700"},ee={class:"flex items-center"},te={class:"text-gray-700"},se={class:"flex items-center"},oe={class:"text-gray-700"},le={class:"flex items-center"},ne={class:"text-gray-700"},re={key:1,class:"project-details bg-white rounded-lg p-6"},ae={class:"grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm"},ie={class:"border-r border-gray-200 pr-6"},de={class:"space-y-3"},ue={class:"text-gray-700"},ce={class:"border-gray-200 pr-6"},pe={class:"space-y-3.5 text-gray-700"},me={class:"text-gray-800"},ge={class:"text-gray-800"},ve={class:"relative w-full h-2 bg-gray-200 rounded mt-2"},xe={key:2,class:"project-tasks rounded-lg bg-white p-6"},fe={key:0,class:"flex flex-col items-center justify-center py-8 text-gray-500"},be={key:1,class:"space-y-6"},we={class:"flex justify-between items-center mb-2"},_e={class:"flex items-center space-x-2"},he={class:"text-gray-800 text-lg"},ye={class:"text-gray-600 text-sm mb-4"},ke={class:"font-semibold"},je={class:"text-gray-500 text-xs"},De={class:"text-gray-700 font-medium"},Pe={class:"relative w-full h-3 bg-gray-200 rounded-full mt-3 overflow-hidden"},Ce={class:"flex justify-between text-xs text-gray-500 mt-2"},Ne={__name:"Project Details",setup(C){const u=r("Overview"),c=r(""),x=r(""),v=r(""),f=r(""),b=r(""),m=r(""),l=r(""),p=r(""),_=r(""),w=r([]),B=[{name:"Overview",label:"Overview"},{name:"Tasks",label:"Tasks & Activities"},{name:"Details",label:"Project Details"}],V=O(),N=h(()=>w.value.some(n=>n.progress>0)?"Complete":"Pending"),F=h(()=>parseFloat(_.value)===100?"Complete":"In Process"),A=h(()=>{const n=parseFloat(_.value);return n>50?"Complete":n>25?"In Process":"Pending"});return(()=>S(this,null,function*(){try{const n=V.params.id,s=(yield H({url:"go1_customer.go1_customer.api.api.get_projects",method:"get"}).fetch()).data.find(g=>g.name===n);if(console.log("Project Details:",s),s){c.value=s.project_name;const g=document.createElement("div");g.innerHTML=s.notes,x.value=g.innerText||g.textContent,v.value=s.status,f.value=s.expected_start_date,b.value=s.expected_end_date,m.value=s.company,l.value=s.estimated_costing,p.value=s.total_billed_amount,_.value=s.percent_complete,w.value=s.tasks||[]}else console.error("Details not found for ID:",n)}catch(n){console.error("Error fetching the details:",n)}}))(),(n,t)=>{const M=z("FeatherIcon");return a(),i("div",K,[e("div",L,[y(E)]),e("div",R,[y(I),e("div",$,[e("div",U,[e("div",W,[(a(),i(k,null,j(B,s=>e("button",{key:s.name,onClick:g=>u.value=s.name,class:D(["tab px-4 py-2 font-medium text-sm transition-colors",u.value===s.name?"text-blue-600 border-b-2 border-blue-600":"text-gray-600 hover:text-blue-500"])},o(s.label),11,q)),64))]),u.value==="Overview"?(a(),i("section",G,[e("h2",J,o(c.value),1),e("p",Q,o(x.value),1),e("div",X,[e("div",Y,[t[2]||(t[2]=e("svg",{class:"w-5 h-5 text-blue-500 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 12h14m-7-7v14"})],-1)),e("p",null,[t[0]||(t[0]=e("strong",null,"Status:",-1)),t[1]||(t[1]=d()),e("span",Z,o(v.value),1)])]),e("div",ee,[t[5]||(t[5]=e("svg",{class:"w-5 h-5 text-green-500 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M3 10h18M9 16h6"})],-1)),e("p",null,[t[3]||(t[3]=e("strong",null,"Project Development:",-1)),t[4]||(t[4]=d()),e("span",te,o(m.value),1)])]),e("div",se,[t[8]||(t[8]=e("svg",{class:"w-5 h-5 text-purple-500 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7V3m8 4V3M5 21h14M3 10h18M4 6h16"})],-1)),e("p",null,[t[6]||(t[6]=e("strong",null,"Start Date:",-1)),t[7]||(t[7]=d()),e("span",oe,o(f.value),1)])]),e("div",le,[t[11]||(t[11]=e("svg",{class:"w-5 h-5 text-red-500 mr-2",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 6V4m0 16v-2M6 12H4m16 0h-2m-6 6a9 9 0 110-18 9 9 0 010 18z"})],-1)),e("p",null,[t[9]||(t[9]=e("strong",null,"End Date:",-1)),t[10]||(t[10]=d()),e("span",ne,o(b.value),1)])])])])):P("",!0),u.value==="Details"?(a(),i("section",re,[t[18]||(t[18]=e("h3",{class:"text-lg font-semibold mb-6 text-gray-800"},"Project Details",-1)),e("div",ae,[e("div",ie,[t[12]||(t[12]=e("h4",{class:"text-base font-semibold mb-3 text-blue-600"},"Timeline & Milestones",-1)),e("ul",de,[(a(!0),i(k,null,j([{id:1,name:"Project Kickoff",status:N.value},{id:2,name:"Design Phase",status:A.value},{id:3,name:"Development Phase",status:F.value}],s=>(a(),i("li",{key:s.id,class:"flex items-center"},[e("span",ue,o(s.name),1),e("span",{class:D(["ml-auto text-xs font-semibold",s.status==="Complete"?"text-green-500":"text-yellow-500"])},o(s.status||"Pending"),3)]))),128))])]),e("div",ce,[t[17]||(t[17]=e("h4",{class:"text-base font-semibold mb-3 text-green-600"},"Project Financials",-1)),e("div",pe,[e("p",null,[t[13]||(t[13]=e("strong",null,"Budget:",-1)),t[14]||(t[14]=d()),e("span",me,o(l.value),1)]),e("p",null,[t[15]||(t[15]=e("strong",null,"Spent:",-1)),t[16]||(t[16]=d()),e("span",ge,o(p.value),1)]),e("div",ve,[e("div",{class:"absolute top-0 left-0 h-full bg-green-500 rounded",style:T({width:p.value/l.value*100+"%"})},null,4)])])])])])):P("",!0),u.value==="Tasks"?(a(),i("section",xe,[t[24]||(t[24]=e("h4",{class:"text-lg font-semibold mb-4 text-gray-700"},"Tasks & Activities",-1)),w.value.length===0?(a(),i("div",fe,[t[19]||(t[19]=e("p",{class:"text-md font-semibold mb-5"},"No Tasks Found !",-1)),y(M,{name:"file-minus",class:"h-15"})])):(a(),i("ul",be,[(a(!0),i(k,null,j(w.value,s=>(a(),i("li",{key:s.name,class:"p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"},[e("div",we,[e("div",_e,[t[20]||(t[20]=e("svg",{class:"w-5 h-5 text-blue-500",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 8v4l3 3m-6 0a9 9 0 11-2.292-7.708"})],-1)),e("strong",he,o(s.subject),1)]),e("span",{class:D([{"bg-green-100 text-green-600":s.status==="Completed","bg-yellow-100 text-yellow-600":s.status==="Working","bg-red-100 text-red-600":s.status==="Open"},"px-2 py-0.5 rounded-full text-xs font-small"])},o(s.status||"N/A"),3)]),e("p",ye,[t[21]||(t[21]=d("Assigned to: ")),e("span",ke,o(s._assign||"Unassigned"),1)]),e("p",je,[t[22]||(t[22]=d("Due: ")),e("span",De,o(s.exp_end_date||"N/A"),1)]),e("div",Pe,[e("div",{class:"absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400",style:T({width:s.progress+"%"})},null,4)]),e("div",Ce,[t[23]||(t[23]=e("span",null,"Progress",-1)),e("span",null,o(s.progress||0)+"%",1)])]))),128))]))])):P("",!0)])])])])}}};export{Ne as default};