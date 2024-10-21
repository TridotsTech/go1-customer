var P=(V,x,n)=>new Promise((h,u)=>{var d=t=>{try{c(n.next(t))}catch(m){u(m)}},_=t=>{try{c(n.throw(t))}catch(m){u(m)}},c=t=>t.done?h(t.value):Promise.resolve(t.value).then(d,_);c((n=n.apply(V,x)).next())});import{_ as N,a as j}from"./AppHeader.0f924273.js";import{_ as A,a as M}from"./RefreshButton.51938b5d.js";import{c as U,n as o,E as O,a as D,P as F,o as y,f as g,p as r,g as l,u as i,X as k,Y as T,w as S,t as W,j as E,$ as q,B as H,v as C,a0 as X}from"./vendor.fd1dc2a4.js";import"./index.b49b7efc.js";const Y={class:"flex h-screen w-screen"},G={class:"left h-full border-r bg-gray-50"},I={class:"right flex-1 flex flex-col h-full overflow-auto"},J={class:"h-full w-full flex flex-col"},K={class:"h-16 px-5 flex items-center gap-3"},Q={class:"flex ml-auto"},Z={key:0},ee={key:1},ae={class:"text-black text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},se={key:2},le={class:"font-small text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},ue={__name:"Addresses",setup(V){const x=U({url:"go1_customer.go1_customer.api.api.get_address",method:"get"}),n=o([]),h=o([]),u=o([]),d=o(!1),_=()=>P(this,null,function*(){try{d.value=!0;const a=yield x.fetch(),s=a.meta.fields.filter(e=>e.in_list_view);n.value=[{label:"Name",key:"name"},...s.map(e=>({label:e.label,key:e.fieldname}))],h.value=a.data}catch(a){console.error("Failed to Addresses data",a)}finally{d.value=!1}}),c=a=>{u.value=a},t=O(),m=a=>{t.push({name:"AddressDetails",params:{id:a.name}})},R=()=>{w.value="",p.value="",v.value="",f.value=""},w=o(""),p=o(""),v=o(""),f=o(""),$=D(()=>h.value.filter(a=>{const s=a.name.toLowerCase().includes(w.value.toLowerCase()),e=a.address_type.toLowerCase()===p.value.toLowerCase()||!p.value,b=a.city.toString().includes(v.value.toString())||!v.value,L=a.pincode.toString().includes(f.value.toString())||!f.value;return s&&e&&b&&L})),B=()=>{_()},z=a=>{switch(a){case"Shipping":return{theme:"red"};case"Billing":return{theme:"blue"};case"Plant":return{theme:"green"};case"Warehouse":return{theme:"orange"};default:return{theme:"gray"}}};return F(()=>{_()}),(a,s)=>(y(),g("div",Y,[r("div",G,[l(N)]),r("div",I,[r("div",J,[l(j),r("div",K,[l(i(k),{type:"search",size:"sm",variant:"subtle",placeholder:"Name",modelValue:w.value,"onUpdate:modelValue":s[0]||(s[0]=e=>w.value=e),class:"w-48"},null,8,["modelValue"]),l(i(T),{type:"select",options:[{},{label:"Billing",value:"Billing"},{label:"Shipping",value:"Shipping"},{label:"Office",value:"Office"},{label:"Postal",value:"Postal"},{label:"Plant",value:"Plant"},{label:"Personal",value:"Personal"},{label:"Shop",value:"Shop"},{label:"Subsidiary",value:"Subsidiary"},{label:"Warehouse",value:"Warehouse"},{label:"Other",value:"Other"},{label:"Permanent",value:"Permanent"},{label:"Current",value:"Current"}],size:"sm",variant:"subtle",placeholder:"address",modelValue:p.value,"onUpdate:modelValue":s[1]||(s[1]=e=>p.value=e),class:"w-48"},null,8,["modelValue"]),l(i(k),{type:"search",size:"sm",variant:"subtle",placeholder:"city",modelValue:v.value,"onUpdate:modelValue":s[2]||(s[2]=e=>v.value=e),class:"w-48"},null,8,["modelValue"]),l(i(k),{type:"search",size:"sm",variant:"subtle",placeholder:"post code",modelValue:f.value,"onUpdate:modelValue":s[3]||(s[3]=e=>f.value=e),class:"w-48"},null,8,["modelValue"]),r("div",Q,[l(i(E),{variant:"subtle",theme:"gray",size:"sm",onClick:R},{default:S(()=>s[4]||(s[4]=[W(" Reset")])),_:1})]),l(A,{onRefresh:B,isLoading:d.value},null,8,["isLoading"])]),l(i(X),{class:"listview overflow-auto px-5 flex-1",columns:n.value,rows:u.value,options:{selectable:!0,showTooltip:!0,resizeColumn:!0,onRowClick:m,emptyState:{title:"No records found"}},"row-key":"name"},{cell:S(({item:e,column:b})=>[b.key==="address_type"?(y(),g("div",Z,[l(i(q),H(z(e),{size:"sm",label:e}),null,16,["label"])])):b.key==="name"?(y(),g("div",ee,[r("span",ae,C(e),1)])):(y(),g("div",se,[r("span",le,C(e),1)]))]),_:1},8,["columns","rows","options"]),l(M,{rows:$.value,"onUpdate:paginatedRows":c},null,8,["rows"])])])]))}};export{ue as default};