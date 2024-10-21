var k=(C,y,n)=>new Promise((v,u)=>{var c=l=>{try{d(n.next(l))}catch(m){u(m)}},_=l=>{try{d(n.throw(l))}catch(m){u(m)}},d=l=>l.done?v(l.value):Promise.resolve(l.value).then(c,_);d((n=n.apply(C,y)).next())});import{_ as T,a as j}from"./AppHeader.0f924273.js";import{_ as M,a as U}from"./RefreshButton.51938b5d.js";import{c as P,n as o,E as F,a as E,P as I,o as b,f as x,p as r,g as t,u as i,X as V,Y as q,Z as A,w as R,t as H,j as X,$ as Y,B as Z,v as D,a0 as G}from"./vendor.fd1dc2a4.js";import"./index.b49b7efc.js";const J={class:"flex h-screen w-screen"},K={class:"left h-full border-r bg-gray-50"},O={class:"right flex-1 flex flex-col h-full overflow-auto"},Q={class:"h-full w-full flex flex-col"},W={class:"h-16 px-5 flex items-center gap-3"},ee={class:"flex ml-auto"},ae={key:0},se={key:1},te={class:"text-black text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},le={key:2},oe={class:"font-small text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},de={__name:"Shipment",setup(C){const y=P({url:"go1_customer.go1_customer.api.api.get_shipments",method:"get"}),n=o([]),v=o([]),u=o([]),c=o(!1),_=()=>k(this,null,function*(){try{c.value=!0;const a=yield y.fetch(),s=a.meta.fields.filter(e=>e.in_list_view);n.value=[{label:"Name",key:"name"},...s.map(e=>({label:e.label,key:e.fieldname}))],v.value=a.data}catch(a){console.error("Failed to fetch Delivery Note data",a)}finally{c.value=!1}}),d=a=>{u.value=a},l=F(),m=a=>{l.push({name:"ShipmentsDetails",params:{id:a.name}})},$=()=>{h.value="",p.value="",f.value="",w.value=""},h=o(""),p=o(""),f=o(""),w=o(""),S=E(()=>v.value.filter(a=>{const s=a.name.toLowerCase().includes(h.value.toLowerCase()),e=a.status.toLowerCase()===p.value.toLowerCase()||!p.value,g=a.grand_total.toString().replace(/[.,]/g,"").includes(f.value.toString().replace(/[.,]/g,""))||!f.value,B=w.value.split("-").reverse().join("-"),L=a.posting_date&&a.posting_date.includes(B);return s&&e&&g&&L})),N=()=>{_()},z=a=>{switch(a){case"Draft":return{theme:"red"};case"Completed":return{theme:"blue"};case"Cancelled":return{theme:"green"};case"Closed":return{theme:"orange"};default:return{theme:"gray"}}};return I(()=>{_()}),(a,s)=>(b(),x("div",J,[r("div",K,[t(T)]),r("div",O,[r("div",Q,[t(j),r("div",W,[t(i(V),{type:"search",size:"sm",variant:"subtle",placeholder:"Name",modelValue:h.value,"onUpdate:modelValue":s[0]||(s[0]=e=>h.value=e),class:"w-48"},null,8,["modelValue"]),t(i(q),{type:"select",options:[{},{label:"Draft",value:"Draft"},{label:"To Bill",value:"To Bill"},{label:"Return Issued",value:"Return Issued"},{label:"Completed",value:"Completed"},{label:"Cancelled",value:"Cancelled"},{label:"Closed",value:"Closed"}],size:"sm",variant:"subtle",placeholder:"Status",modelValue:p.value,"onUpdate:modelValue":s[1]||(s[1]=e=>p.value=e),class:"w-48"},null,8,["modelValue"]),t(i(V),{type:"search",size:"sm",variant:"subtle",placeholder:"Total",modelValue:f.value,"onUpdate:modelValue":s[2]||(s[2]=e=>f.value=e),class:"w-48"},null,8,["modelValue"]),t(i(A),{class:"border-none w-48",size:"md",variant:"subtle",placeholder:"Date",modelValue:w.value,"onUpdate:modelValue":s[3]||(s[3]=e=>w.value=e)},null,8,["modelValue"]),r("div",ee,[t(i(X),{variant:"subtle",theme:"gray",size:"sm",onClick:$},{default:R(()=>s[4]||(s[4]=[H(" Reset")])),_:1})]),t(M,{onRefresh:N,isLoading:c.value},null,8,["isLoading"])]),t(i(G),{class:"listview overflow-auto px-5 flex-1",columns:n.value,rows:u.value,options:{selectable:!0,showTooltip:!0,resizeColumn:!0,onRowClick:m,emptyState:{title:"No records found"}},"row-key":"name"},{cell:R(({item:e,column:g})=>[g.key==="status"?(b(),x("div",ae,[t(i(Y),Z(z(e),{size:"sm",label:e}),null,16,["label"])])):g.key==="name"?(b(),x("div",se,[r("span",te,D(e),1)])):(b(),x("div",le,[r("span",oe,D(e),1)]))]),_:1},8,["columns","rows","options"]),t(U,{rows:S.value,"onUpdate:paginatedRows":d},null,8,["rows"])])])]))}};export{de as default};
