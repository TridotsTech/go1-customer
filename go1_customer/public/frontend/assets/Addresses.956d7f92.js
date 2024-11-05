var F=(b,w,l)=>new Promise((h,p)=>{var i=a=>{try{t(l.next(a))}catch(_){p(_)}},f=a=>{try{t(l.throw(a))}catch(_){p(_)}},t=a=>a.done?h(a.value):Promise.resolve(a.value).then(i,f);t((l=l.apply(b,w)).next())});import{_ as $,d as L,a as N}from"./Filter.55d24761.js";import{_ as Y,a as A}from"./AppHeader.627012a4.js";import{c as z,n as c,Q as E,a as M,z as O,e as j,o as n,f as d,p as u,g as o,w as x,u as v,X as P,J as I,O as T,Y as q,v as g,Z as H}from"./vendor.8ee4b109.js";import"./index.868dd579.js";const J={class:"flex h-screen w-screen"},Q={class:"left h-full border-r bg-gray-50"},U={class:"right flex-1 flex flex-col h-full overflow-auto"},W={class:"h-full w-full flex flex-col"},X={key:0,class:"flex justify-center items-center flex-1"},Z={key:0},G={key:1},K={class:"text-black text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},ee={key:2},se={class:"font-small text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},te={key:3},ae={class:"font-small text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},ce={__name:"Addresses",setup(b){const w=z({url:"go1_customer.go1_customer.api.api.get_address",method:"get"}),l=c([]),h=c([]),p=c([]),i=c(!1),f=c([]),t=c({}),a=E(),_=()=>{a.push({name:"Address New"})},k=()=>F(this,null,function*(){try{i.value=!0;const s=yield w.fetch();f.value=s.meta.fields.filter(e=>e.in_standard_filter),f.value.forEach(e=>{e.fieldtype==="Select"&&typeof e.options=="string"&&(e.options=e.options.split(`
`)),t.value[e.fieldname]=""});const m=s.meta.fields.filter(e=>e.in_list_view);l.value=[{label:"Name",key:"name"},...m.map(e=>({label:e.label,key:e.fieldname,fieldtype:e.fieldtype}))],h.value=s.data}catch(s){console.error("Failed to fetch data",s)}finally{i.value=!1}}),C=s=>{p.value=s},R=()=>{Object.keys(t.value).forEach(s=>{t.value[s]=""})},B=M(()=>h.value.filter(s=>Object.keys(t.value).every(m=>{const e=t.value[m];return e?s[m].toString().toLowerCase().includes(e.toString().toLowerCase()):!0}))),S=()=>{k()},D=s=>{switch(s){case"Shipping":return{theme:"red"};case"Billing":return{theme:"blue"};case"Plant":return{theme:"green"};case"Warehouse":return{theme:"orange"};default:return{theme:"gray"}}};return O(()=>{k()}),(s,m)=>{const e=j("FeatherIcon"),V=j("Button");return n(),d("div",J,[u("div",Q,[o(Y)]),u("div",U,[u("div",W,[o(A,null,{addon:x(()=>[o(V,{variant:"solid",label:"Create",onClick:_},{prefix:x(()=>[o(e,{name:"plus",class:"h-4"})]),_:1})]),_:1}),o($,{standardFilterFields:f.value,filterValues:t.value,isLoading:i.value,resetFilters:R,reload:S},null,8,["standardFilterFields","filterValues","isLoading"]),i.value?(n(),d("div",X,[o(v(P),{class:"w-8"})])):(n(),I(v(H),{key:1,class:"listview overflow-auto px-5 flex-1",columns:l.value,rows:p.value,options:{getRowRoute:r=>({name:"AddressDetails",params:{id:r.name}}),selectable:!0,showTooltip:!0,resizeColumn:!0,emptyState:{title:"No records found"}},"row-key":"name"},{cell:x(({item:r,column:y})=>[y.key==="address_type"?(n(),d("div",Z,[o(v(q),T(D(r),{size:"sm",label:r}),null,16,["label"])])):y.key==="name"?(n(),d("div",G,[u("span",K,g(r),1)])):y.fieldtype==="Date"?(n(),d("div",ee,[u("span",se,g(v(L)(r).format("DD-MM-YYYY")),1)])):(n(),d("div",te,[u("span",ae,g(r),1)]))]),_:1},8,["columns","rows","options"])),o(N,{rows:B.value,"onUpdate:paginatedRows":C},null,8,["rows"])])])])}}};export{ce as default};
