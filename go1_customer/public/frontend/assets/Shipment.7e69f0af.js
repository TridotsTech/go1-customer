var g=(x,v,o)=>new Promise((m,u)=>{var r=a=>{try{s(o.next(a))}catch(p){u(p)}},f=a=>{try{s(o.throw(a))}catch(p){u(p)}},s=a=>a.done?m(a.value):Promise.resolve(a.value).then(r,f);s((o=o.apply(x,v)).next())});import{d as S}from"./dayjs.min.9ce0618b.js";import{_ as C,a as D}from"./AppHeader.1d5d11ab.js";import{_ as R,a as V}from"./Filter.0302332f.js";import{c as $,n,a as L,z as Y,o as l,f as i,p as c,g as d,u as h,X as B,J as N,w as z,O as E,Y as M,v as y,Z as O}from"./vendor.8ee4b109.js";import"./index.c022bc80.js";const P={class:"flex h-screen w-screen"},T={class:"left h-full border-r bg-gray-50"},q={class:"right flex-1 flex flex-col h-full overflow-auto"},A={class:"h-full w-full flex flex-col"},H={key:0,class:"flex justify-center items-center flex-1"},J={key:0},U={key:1},X={class:"text-black text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},Z={key:2},G={class:"font-small text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},I={key:3},K={class:"font-small text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},oe={__name:"Shipment",setup(x){const v=$({url:"go1_customer.go1_customer.api.api.get_shipments",method:"get"}),o=n([]),m=n([]),u=n([]),r=n(!1),f=n([]),s=n({}),a=()=>g(this,null,function*(){try{r.value=!0;const t=yield v.fetch();f.value=t.meta.fields.filter(e=>e.in_standard_filter),f.value.forEach(e=>{e.fieldtype==="Select"&&typeof e.options=="string"&&(e.options=e.options.split(`
`)),s.value[e.fieldname]=""});const _=t.meta.fields.filter(e=>e.in_list_view);o.value=[{label:"Name",key:"name"},..._.map(e=>({label:e.label,key:e.fieldname,fieldtype:e.fieldtype}))],m.value=t.data}catch(t){console.error("Failed to fetch data",t)}finally{r.value=!1}}),p=t=>{u.value=t},b=()=>{Object.keys(s.value).forEach(t=>{s.value[t]=""})},k=L(()=>m.value.filter(t=>Object.keys(s.value).every(_=>{const e=s.value[_];return e?t[_].toString().toLowerCase().includes(e.toString().toLowerCase()):!0}))),F=()=>{a()},j=t=>{switch(t){case"Draft":return{theme:"red"};case"Completed":return{theme:"blue"};case"Cancelled":return{theme:"green"};case"Closed":return{theme:"orange"};default:return{theme:"gray"}}};return Y(()=>{a()}),(t,_)=>(l(),i("div",P,[c("div",T,[d(C)]),c("div",q,[c("div",A,[d(D),d(R,{standardFilterFields:f.value,filterValues:s.value,isLoading:r.value,resetFilters:b,reload:F},null,8,["standardFilterFields","filterValues","isLoading"]),r.value?(l(),i("div",H,[d(h(B),{class:"w-8"})])):(l(),N(h(O),{key:1,class:"listview overflow-auto px-5 flex-1",columns:o.value,rows:u.value,options:{getRowRoute:e=>({name:"ShipmentsDetails",params:{id:e.name}}),selectable:!0,showTooltip:!0,resizeColumn:!0,emptyState:{title:"No records found"}},"row-key":"name"},{cell:z(({item:e,column:w})=>[w.key==="status"?(l(),i("div",J,[d(h(M),E(j(e),{size:"sm",label:e}),null,16,["label"])])):w.key==="name"?(l(),i("div",U,[c("span",X,y(e),1)])):w.fieldtype==="Date"?(l(),i("div",Z,[c("span",G,y(h(S)(e).format("DD-MM-YYYY")),1)])):(l(),i("div",I,[c("span",K,y(e),1)]))]),_:1},8,["columns","rows","options"])),d(V,{rows:k.value,"onUpdate:paginatedRows":p},null,8,["rows"])])])]))}};export{oe as default};
