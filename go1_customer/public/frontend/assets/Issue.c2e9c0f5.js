var F=(b,w,l)=>new Promise((h,f)=>{var i=a=>{try{t(l.next(a))}catch(_){f(_)}},p=a=>{try{t(l.throw(a))}catch(_){f(_)}},t=a=>a.done?h(a.value):Promise.resolve(a.value).then(i,p);t((l=l.apply(b,w)).next())});import{d as $}from"./dayjs.min.9ce0618b.js";import{_ as I,a as L}from"./AppHeader.1d5d11ab.js";import{_ as N,a as O}from"./Filter.0302332f.js";import{c as Y,n as c,Q as z,a as E,z as M,e as j,o as r,f as d,p as u,g as o,w as x,u as v,X as H,J as P,O as T,Y as q,v as g,Z as A}from"./vendor.8ee4b109.js";import"./index.c022bc80.js";const J={class:"flex h-screen w-screen"},Q={class:"left h-full border-r bg-gray-50"},U={class:"right flex-1 flex flex-col h-full overflow-auto"},X={class:"h-full w-full flex flex-col"},Z={key:0,class:"flex justify-center items-center flex-1"},G={key:0},K={key:1},W={class:"text-black text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},ee={key:2},se={class:"font-small text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},te={key:3},ae={class:"font-small text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},de={__name:"Issue",setup(b){const w=Y({url:"go1_customer.go1_customer.api.api.get_issues",method:"get"}),l=c([]),h=c([]),f=c([]),i=c(!1),p=c([]),t=c({}),a=z(),_=()=>{a.push({name:"IssueNew"})},k=()=>F(this,null,function*(){try{i.value=!0;const s=yield w.fetch();p.value=s.meta.fields.filter(e=>e.in_standard_filter),p.value.forEach(e=>{e.fieldtype==="Select"&&typeof e.options=="string"&&(e.options=e.options.split(`
`)),t.value[e.fieldname]=""});const m=s.meta.fields.filter(e=>e.in_list_view);l.value=[{label:"Name",key:"name"},...m.map(e=>({label:e.label,key:e.fieldname,fieldtype:e.fieldtype}))],h.value=s.data}catch(s){console.error("Failed to fetch data",s)}finally{i.value=!1}}),C=s=>{f.value=s},R=()=>{Object.keys(t.value).forEach(s=>{t.value[s]=""})},S=E(()=>h.value.filter(s=>Object.keys(t.value).every(m=>{const e=t.value[m];return e?s[m].toString().toLowerCase().includes(e.toString().toLowerCase()):!0}))),B=()=>{k()},D=s=>{switch(s){case"Open":return{theme:"red"};case"Replied":return{theme:"blue"};case"Closed":return{theme:"green"};case"On Hold":return{theme:"orange"};default:return{theme:"gray"}}};return M(()=>{k()}),(s,m)=>{const e=j("FeatherIcon"),V=j("Button");return r(),d("div",J,[u("div",Q,[o(I)]),u("div",U,[u("div",X,[o(L,null,{addon:x(()=>[o(V,{variant:"solid",label:"Create",onClick:_},{prefix:x(()=>[o(e,{name:"plus",class:"h-4"})]),_:1})]),_:1}),o(N,{standardFilterFields:p.value,filterValues:t.value,isLoading:i.value,resetFilters:R,reload:B},null,8,["standardFilterFields","filterValues","isLoading"]),i.value?(r(),d("div",Z,[o(v(H),{class:"w-8"})])):(r(),P(v(A),{key:1,class:"listview overflow-auto px-5 flex-1",columns:l.value,rows:f.value,options:{getRowRoute:n=>({name:"IssueDetails",params:{id:n.name}}),selectable:!0,showTooltip:!0,resizeColumn:!0,emptyState:{title:"No records found"}},"row-key":"name"},{cell:x(({item:n,column:y})=>[y.key==="status"?(r(),d("div",G,[o(v(q),T(D(n),{size:"sm",label:n}),null,16,["label"])])):y.key==="name"?(r(),d("div",K,[u("span",W,g(n),1)])):y.fieldtype==="Date"?(r(),d("div",ee,[u("span",se,g(v($)(n).format("DD-MM-YYYY")),1)])):(r(),d("div",te,[u("span",ae,g(n),1)]))]),_:1},8,["columns","rows","options"])),o(O,{rows:S.value,"onUpdate:paginatedRows":C},null,8,["rows"])])])])}}};export{de as default};