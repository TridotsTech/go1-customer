var E=(t,o,s)=>new Promise((r,e)=>{var i=c=>{try{d(s.next(c))}catch(p){e(p)}},a=c=>{try{d(s.throw(c))}catch(p){e(p)}},d=c=>c.done?r(c.value):Promise.resolve(c.value).then(i,a);d((s=s.apply(t,o)).next())});import{c as l,r as D,a as L,b as A,d as O,_ as P,e as R,o as b,f as j,g as y,h as V,s as T,i as w,j as g,C as S,I as k,k as N,l as C}from"./vendor.8ee4b109.js";const Q=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}};Q();const $="modulepreload",I={},B="/assets/go1_customer/frontend/",n=function(o,s){return!s||s.length===0?o():Promise.all(s.map(r=>{if(r=`${B}${r}`,r in I)return;I[r]=!0;const e=r.endsWith(".css"),i=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${i}`))return;const a=document.createElement("link");if(a.rel=e?"stylesheet":$,e||(a.as="script",a.crossOrigin=""),a.href=r,document.head.appendChild(a),e)return new Promise((d,c)=>{a.addEventListener("load",d),a.addEventListener("error",c)})})).then(()=>o())},f=l({url:"frappe.auth.get_logged_user",cache:"User",onError(t){t&&t.exc_type==="AuthenticationError"&&m.push({name:"LoginPage"})}});function h(){let o=new URLSearchParams(document.cookie.split("; ").join("&")).get("user_id");return o==="Guest"&&(o=null),o}const _=D({login:l({url:"login",makeParams({email:t,password:o}){return{usr:t,pwd:o}},onSuccess(t){f.reload(),_.user=h(),_.login.reset(),m.replace(t.default_route||"/")}}),logout:l({url:"logout",onSuccess(){f.reset(),_.user=h(),m.replace({name:"Login"})}}),user:h(),isLoggedIn:L(()=>!!_.user)}),U=[{path:"/",name:"Home",redirect:{name:"Dashboard"}},{name:"Login",path:"/account/login",component:()=>n(()=>import("./Login.4fff42dd.js"),["assets/Login.4fff42dd.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css"])},{name:"Dashboard",path:"/Dashboard",component:()=>n(()=>import("./Dashboard.f11f9cfa.js"),["assets/Dashboard.f11f9cfa.js","assets/Dashboard.8e644519.css","assets/AppHeader.627012a4.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css"])},{name:"Quotations",path:"/Quotations",component:()=>n(()=>import("./Quotations.8ca819a0.js"),["assets/Quotations.8ca819a0.js","assets/Filter.55d24761.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css","assets/AppHeader.627012a4.js"])},{name:"QuotationDetails",path:"/Quotations/:id",component:()=>n(()=>import("./Quotation Details.0ff29a5c.js"),["assets/Quotation Details.0ff29a5c.js","assets/AppHeader.627012a4.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css"])},{name:"Invoices",path:"/Invoices",component:()=>n(()=>import("./Invoices.b43b8d8b.js"),["assets/Invoices.b43b8d8b.js","assets/Filter.55d24761.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css","assets/AppHeader.627012a4.js"])},{name:"InvoiceDetails",path:"/Invoices/:id",component:()=>n(()=>import("./Invoice Details.5d331ab8.js"),["assets/Invoice Details.5d331ab8.js","assets/AppHeader.627012a4.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css"])},{name:"Shipments",path:"/Shipments",component:()=>n(()=>import("./Shipment.2167f43b.js"),["assets/Shipment.2167f43b.js","assets/Filter.55d24761.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css","assets/AppHeader.627012a4.js"])},{name:"ShipmentsDetails",path:"/Shipments/:id",component:()=>n(()=>import("./Shipments Details.084f1510.js"),["assets/Shipments Details.084f1510.js","assets/AppHeader.627012a4.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css"])},{name:"Orders",path:"/Orders",component:()=>n(()=>import("./Orders.8acc5742.js"),["assets/Orders.8acc5742.js","assets/AppHeader.627012a4.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css","assets/Filter.55d24761.js"])},{name:"OrderDetails",path:"/Orders/:id",component:()=>n(()=>import("./Order Details.37914d2d.js"),["assets/Order Details.37914d2d.js","assets/AppHeader.627012a4.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css"])},{name:"Addresses",path:"/Addresses",component:()=>n(()=>import("./Addresses.956d7f92.js"),["assets/Addresses.956d7f92.js","assets/Filter.55d24761.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css","assets/AppHeader.627012a4.js"])},{name:"Address New",path:"/Address_New",component:()=>n(()=>import("./Address New.e3e0f4cc.js"),["assets/Address New.e3e0f4cc.js","assets/AppHeader.627012a4.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css"])},{name:"AddressDetails",path:"/AddressDetails/:id",component:()=>n(()=>import("./Address Details.3db1eed2.js"),["assets/Address Details.3db1eed2.js","assets/AppHeader.627012a4.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css"])},{name:"Issues",path:"/Issues",component:()=>n(()=>import("./Issue.9eacb868.js"),["assets/Issue.9eacb868.js","assets/Filter.55d24761.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css","assets/AppHeader.627012a4.js"])},{name:"IssueNew",path:"/Issue_New",component:()=>n(()=>import("./IssueNew.2a6f5d8b.js"),["assets/IssueNew.2a6f5d8b.js","assets/AppHeader.627012a4.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css"])},{name:"IssueDetails",path:"/IssueDetails/:id",component:()=>n(()=>import("./Issue Details.f393222a.js"),["assets/Issue Details.f393222a.js","assets/AppHeader.627012a4.js","assets/vendor.8ee4b109.js","assets/vendor.f874cace.css"])}];let m=A({history:O("/Go1_Customer"),routes:U});m.beforeEach((t,o,s)=>E(void 0,null,function*(){let r=_.isLoggedIn;try{yield f.promise}catch(e){r=!1}t.name==="Login"&&r?s({name:"Home"}):t.name!=="Login"&&!r?s({name:"Login"}):s()}));const q={};function x(t,o){const s=R("router-view");return b(),j("div",null,[y(s)])}var F=P(q,[["render",x]]);let v={Button:g,FeatherIcon:N},u=V(F);T("resourceFetcher",C);u.use(m);u.use(w);for(let t in v)u.component(t,v[t]);u.component("Button",g);u.component("Card",S);u.component("Input",k);u.mount("#app");export{_ as s};
