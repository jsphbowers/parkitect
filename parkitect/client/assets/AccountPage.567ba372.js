import{_ as B,r as _,a as i,c as r,d as s,t as v,e as p,F as h,f as y,g as u,w as g,h as I,o as w,A as e,i as d,l as k,j as H,P as A,S as F,C as Y,M as z,u as E,n as V,k as N,p as q,m as D}from"./index.f7578450.js";const b={setup(){const a=["/img/HomePagePics/picture1.jpg","/img/HomePagePics/picture2.jpg","/img/HomePagePics/picture3.jpg","/img/HomePagePics/picture4.jpg","/img/HomePagePics/picture5.jpg","/img/HomePagePics/picture6.jpg","/img/HomePagePics/picture7.jpg"],c=I(["acad","arch","badl","bibe","bisc","blca","brca","cany","care","cave","chis","cong","crla","cuva","dena","deva","drto","ever","gaar","glac","glba","grba","grca","grsa","grsm","grte","gumo","hale","havo","hosp","indu","isro","jeff","jotr","katm","kefj","kica","kova","lacl","lavo","maca","meve","mora","neri","noca","npsa","olym","pefo","pinn","redw","romo","sagu","seqa","shen","thro","viis","voya","whsa","wica","wrst","yell","yose","zion"]);async function P(){try{await N.getTripGoerByAccountId()}catch(t){k.error(t),A.error(t.message)}}return w(()=>{P()}),w(()=>{e.clickedMyPassport==!0&&window.scrollTo(0,2300),e.clickedMyPassport=!1}),{coverImages:a,icons:c,myTripGoer:d(()=>e.tripGoers),parksArchived:d(()=>e.parksArchived),parkPassportCount:d(()=>e.parkPassportCount),account:d(()=>e.account),tripGoers:d(()=>e.parksArchived?e.tripGoers.filter(t=>t.trip.isArchived==!1):e.tripGoers),parksVisited:d(()=>e.parksVisited),selectedImg:d(()=>{const t=Math.floor(Math.random()*a.length);return`url(${a[t]})`}),archivedTrips:d(()=>e.tripGoers.filter(t=>t.trip.isArchived==!0)),hasVisited(t){var l;const n=document.querySelectorAll(".grayscale");return e.parkPassportCount=63-n.length,(l=e.account.parksVisited)!=null&&l.includes(t)?"":"grayscale"},displayYourParks(t){var l;const n=document.querySelectorAll(".noDisplay");return e.parkPassportCount=63-n.length,(l=e.account.parksVisited)!=null&&l.includes(t)?"":"noDisplay"},async visitPark(t){try{if(e.account.parksVisited.includes(t)){k.log(e.account.parksVisited);const n=e.account.parksVisited.findIndex(l=>t==l);e.account.parksVisited.splice(n,1)}else e.account.parksVisited.push(t);await H.editAccount()}catch(n){A.error(n.message),k.error(n)}},async showYourParks(){e.parksVisited==!0?e.parksVisited=!1:e.parksVisited=!0},async showArchivedParks(){e.parksArchived=!e.parksArchived}}},components:{SmallModalVue:F,CreateTripForm:Y,MyTripCard:z}},C=()=>{E(a=>({b6aa3c50:a.selectedImg}))},S=b.setup;b.setup=S?(a,c)=>(C(),S(a,c)):C;const L=b,m=a=>(q("data-v-d2065737"),a=a(),D(),a),J={key:0,class:"container-fluid"},K={class:"row mb-4"},O={class:"p-0 col-12 account-img-cont"},Q={class:"account-img-cont p-0"},R=["src"],U={class:"name-cont"},W={class:"name-style"},X=m(()=>s("button",{class:"btn addBtn noShow me-3","data-bs-toggle":"modal","data-bs-target":"#editAccountModal"},"Edit Account",-1)),Z=m(()=>s("div",{class:"row"},[s("div",{class:"col-12"},[s("h1",{class:"trip-margin"},"My Trips")])],-1)),$={key:0},tt={key:1},st={class:"my-5 row"},et=m(()=>s("div",{class:"col-xl-3 col-md-6 col-lg-4 trip-sizing d-flex justify-content-center"},[s("div",{title:"Create a Trip",class:"create-trip justify-content-center align-items-center d-flex selectable","data-bs-toggle":"modal","data-bs-target":"#tripModal"},[s("i",{class:"mdi mdi-plus"})])],-1)),ot={class:"row justify-content-center no-show-mobile"},it={class:"col-8 cal-size"},rt={class:"mt-3 row"},at=m(()=>s("div",{class:"col-12 mt-5 text-center title-bg"},[s("h2",{class:""},[s("b",null,"Build your National Park passport!")])],-1)),ct={class:"d-flex justify-content-between align-items-center"},nt={key:0},lt={key:1},dt={class:"me-4 mt-3 no-show-mobile"},pt={class:"me-4 mt-3 show-mobile"},ut={class:"col-12 icon-bg"},mt={key:0,class:"justify-content-evenly d-flex flex-wrap my-2 py-5",id:"myPassport"},_t=["onClick","src","title"],ht={key:1,class:"justify-content-evenly d-flex flex-wrap my-2 py-5"},gt=["onClick","src"],vt=m(()=>s("div",null,"Create Your Trip!",-1)),yt=m(()=>s("div",null,"Edit your Account!",-1));function kt(a,c,P,t,n,l){const j=_("MyTripCard"),x=_("Calendar"),M=_("CreateTripForm"),f=_("SmallModalVue"),T=_("EditAccountForm");return i(),r(h,null,[t.account?(i(),r("div",J,[s("section",K,[s("div",O,[s("div",Q,[s("img",{class:"account-img",src:t.account.picture,alt:""},null,8,R)])])]),s("div",U,[s("h3",W,v(t.account.name),1),X]),Z,!t.parksArchived&&t.archivedTrips.length>0?(i(),r("div",$,[s("button",{onClick:c[0]||(c[0]=o=>t.showArchivedParks()),class:"btn addBtn icon-button ms-5 my-3"},"Hide archived trips")])):p("",!0),t.parksArchived&&t.archivedTrips.length>0?(i(),r("div",tt,[s("button",{onClick:c[1]||(c[1]=o=>t.showArchivedParks()),class:"btn addBtn icon-button ms-5 my-3"},"Show archived trips")])):p("",!0),s("section",st,[(i(!0),r(h,null,y(t.tripGoers,o=>(i(),r("div",{class:"col-xl-3 col-md-6 col-lg-4 trip-sizing d-flex justify-content-center",key:o.id},[u(j,{tripGoer:o},null,8,["tripGoer"])]))),128)),et]),s("section",ot,[s("div",it,[u(x,{tripGoer:t.myTripGoer},null,8,["tripGoer"])])]),s("section",rt,[at,s("div",ct,[s("div",null,[t.parksVisited?(i(),r("div",nt,[s("button",{onClick:c[2]||(c[2]=o=>t.showYourParks()),class:"btn addBtn icon-button ms-4 mt-3"},"Show your parks")])):p("",!0),t.parksVisited?p("",!0):(i(),r("div",lt,[s("button",{onClick:c[3]||(c[3]=o=>t.showYourParks()),class:"btn addBtn icon-button ms-4 mt-3"},"Show all parks")]))]),s("div",dt,[s("h5",null,"You've visited "+v(t.parkPassportCount)+"/63 Parks! ",1)]),s("div",pt,[s("h5",null,v(t.parkPassportCount)+"/63 Parks!",1)])]),s("div",ut,[t.parksVisited?(i(),r("div",mt,[(i(!0),r(h,null,y(t.icons,o=>(i(),r("img",{onClick:G=>t.visitPark(o),class:V(["icon-style grow mb-3 selectable",t.hasVisited(o)]),src:`/icons/${o}.png`,alt:"",title:o+" national park icon"},null,10,_t))),256))])):p("",!0),t.parksVisited?p("",!0):(i(),r("div",ht,[(i(!0),r(h,null,y(t.icons,o=>(i(),r("img",{onClick:G=>t.visitPark(o),class:V(["icon-style grow mb-3 selectable",t.displayYourParks(o)]),src:`/icons/${o}.png`,alt:""},null,10,gt))),256))]))])])])):p("",!0),u(f,{id:"tripModal"},{header:g(()=>[vt]),body:g(()=>[u(M)]),_:1}),u(f,{id:"editAccountModal"},{header:g(()=>[yt]),body:g(()=>[u(T)]),_:1})],64)}const Pt=B(L,[["render",kt],["__scopeId","data-v-d2065737"]]);export{Pt as default};