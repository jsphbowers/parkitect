import{A as a,l as p,_ as z,x as H,I as C,o as Q,J as W,i as v,K as j,P as l,k as V,L as S,N as q,S as X,O as Z,Q as $,R as ee,U as te,r as u,a as o,c as r,d as i,n as P,e as n,t as f,F as A,f as w,g as m,w as k,E as Y,H as oe,V as re,B as ie,p as ae,m as se}from"./index.b60d9454.js";class ne{async setLocations(){const _=[];a.parks.forEach(y=>{let t={};t.lat=Number(y.latitude),t.lng=Number(y.longitude),_.push(t),a.locations=_}),p.log("[LOCATIONS ARRAY]",_)}}const ce=new ne;const de={setup(){const c=H();async function _(){try{const e=c.params.tripId;await S.getMyTrip(e)}catch(e){p.log(e),l.error(e.message)}}async function y(){try{const e=c.params.tripId;await V.getTripGoersByTripId(e)}catch(e){p.log(e),l.error(e.message)}}async function t(){try{const e=c.params.tripId;await j.getTripThingsToDoByTripId(e)}catch(e){p.log(e),l.error(e.message)}}async function M(){try{const e=c.params.tripId;await re.getTripParksByTripId(e)}catch(e){p.log(e),l.error(e.message)}}async function B(){try{await ie.getParksFromTripParks()}catch(e){p.error(e),l.error(e.message)}}return C(()=>{var e;(e=a.account)!=null&&e.id&&(_(),y(),t(),M())}),C(()=>{a.tripParks.length!=0&&B()}),C(()=>{a.parks.length>0&&ce.setLocations()}),Q(()=>{window.scrollTo(0,0),p.log("[APPSTATE.PARKS MOUNTED]",a.parks)}),W(()=>{a.locations=[],a.parks=[],p.log("[APPSTATE.PARKS UNMOUNTED]",a.parks)}),{trip:v(()=>a.activeTrip),tripGoers:v(()=>a.tripGoers),tripParks:v(()=>a.tripParks),tripThingsToDo:v(()=>a.tripThingsToDo),account:v(()=>a.account),parks:v(()=>a.parks),archived:v(()=>{var e;return(e=a.activeTrip)==null?void 0:e.isArchived}),deletePermissions(e){var T,I;const d=(T=a.account)==null?void 0:T.id,b=(I=a.activeTrip)==null?void 0:I.creatorId;if(e==b)return!1;if(d==b)return!0;if(d!=b&&d==e)return!0},async setActiveThingToDo(e){try{await j.setActiveThingToDo(e)}catch(d){p.log(d),l.error(d.message)}},async removeTripGoer(e){try{if(await l.confirm("Are you sure you'd like to remove this trip goer?","This action cannot be undone","Yes, I'm sure","warning")){const d=c.params.tripId;await V.removeTripGoer(e,d)}}catch(d){p.error(d),l.error(d.message)}},async toggleArchiveTrip(){try{if(a.activeTrip.isArchived==!1){if(await l.confirm("Are you sure you'd like to archive this trip?","You'll no longer be able to edit its details","Yes, I'm sure","warning")){const e=c.params.tripId;await S.toggleArchiveTrip(e)}}else if(a.activeTrip.isArchived==!0&&await l.confirm("Are you sure you'd like to re-activate this trip?","It will once again be open for editing","Yes, I'm sure","warning")){const e=c.params.tripId;await S.toggleArchiveTrip(e)}}catch(e){p.log(e),l.error(e.message)}}}},components:{ActiveCardModal:q,SmallModal:X,EditTripForm:Z,ParkOptionsMenu:$,SendInvitation:ee,MapContainer:te}},g=c=>(ae("data-v-e2be8f8a"),c=c(),se(),c),le={class:"container-fluid"},pe={class:"row justify-content-center"},he={class:"col-12 p-0"},_e=["src","alt"],me={key:0,class:"d-flex justify-content-end mt-2 mb-0"},ge={key:0,class:"btn addBtn me-2","data-bs-toggle":"modal","data-bs-target":"#sendInvitation"},ve={key:1,class:"btn addBtn me-2",disabled:""},ue={key:2,class:"btn addBtn","data-bs-toggle":"modal","data-bs-target":"#editTripModal"},ke={key:3,class:"btn addBtn",disabled:""},Te={key:4,class:"btn addBtn ms-2","data-bs-toggle":"modal","data-bs-target":"#editParkModal"},ye={key:5,class:"btn addBtn ms-2",disabled:""},be={class:"col-md-11 text-center trip-details-card"},fe={key:0},Ie=Y("Join Code: "),Pe={class:"text-info"},Ae={key:1,class:"archiveBanner px-0 mx-0"},Ce=g(()=>i("h3",{class:"mb-0"},"Who's coming along...",-1)),Se={class:"col-md-11 trip-goers-card"},we=["src","alt","title"],Me=["onClick"],Be=g(()=>i("i",{class:"mdi mdi-minus"},null,-1)),De=[Be],Ee={key:1,class:"btn btn-outline p-0 remove-tripGoer-btn",title:"Remove Trip Goer",disabled:""},xe=g(()=>i("i",{class:"mdi mdi-minus"},null,-1)),Ne=[xe],Ge=g(()=>i("h3",{class:"mb-0"},"Sights to see & things to do!",-1)),Oe={class:"col-md-11 parks-area draggable"},Re={class:"col-md-7"},Fe={class:"text-dark"},Le=["src","alt"],Ue={class:"col-md-5"},je=g(()=>i("h3",{class:"mt-md-5 mt-2"},"Activities",-1)),Ve={key:0},Ye=["onClick"],Ke={key:1},Je={key:1,class:"mb-3"},ze={class:"col-11 mb-3"},He={class:"d-flex justify-content-end"},Qe={key:0},We={key:1},qe=Y(" Trip"),Xe=g(()=>i("h5",null,"Send your Invitation",-1)),Ze=g(()=>i("h5",null,"Edit your Trip",-1)),$e=g(()=>i("h5",null,"Edit Travel Plans",-1));function et(c,_,y,t,M,B){var D,E,x,N,G,O,R,F,L,U;const e=u("router-link"),d=u("MapContainer"),b=u("SendInvitation"),T=u("SmallModal"),I=u("EditTripForm"),K=u("ParkOptionsMenu"),J=u("ActiveCardModal");return o(),r(A,null,[i("div",le,[i("section",pe,[i("div",he,[t.trip?(o(),r("img",{key:0,src:(D=t.trip)==null?void 0:D.coverImg,alt:"cover image for "+((E=t.trip)==null?void 0:E.name),class:P(["cover-img",{"archivedCover-img":t.archived}])},null,10,_e)):n("",!0)]),((x=t.trip)==null?void 0:x.creatorId)==((N=t.account)==null?void 0:N.id)?(o(),r("div",me,[t.archived?n("",!0):(o(),r("button",ge,"Send Invitation")),t.archived?(o(),r("button",ve,"Send Invitation")):n("",!0),t.archived?n("",!0):(o(),r("button",ue,"Edit Trip Info")),t.archived?(o(),r("button",ke,"Edit Trip Info")):n("",!0),!t.archived&&t.tripParks.length!=0?(o(),r("button",Te,"Edit Travel Plans")):n("",!0),t.archived?(o(),r("button",ye,"Edit Travel Plans")):n("",!0)])):n("",!0),i("div",be,[i("h1",null,f((G=t.trip)==null?void 0:G.name),1),i("h5",null,f((O=t.trip)==null?void 0:O.description),1),t.archived?n("",!0):(o(),r("h5",fe,[Ie,i("span",Pe,f((R=t.trip)==null?void 0:R.joinCode),1)])),t.archived?(o(),r("h6",Ae," This trip has been archived! ")):n("",!0)]),Ce,i("div",Se,[(o(!0),r(A,null,w(t.tripGoers,s=>(o(),r("div",{key:s.id,class:"position-relative"},[i("img",{src:s.account.picture,alt:"a photo of "+s.account.name,title:s.account.name,class:P(t.archived?"archivedProfile-pic":"profile-pic")},null,10,we),t.deletePermissions(s.accountId)&&!t.archived?(o(),r("button",{key:0,class:"btn btn-outline p-0 remove-tripGoer-btn",title:"Remove Trip Goer",onClick:h=>t.removeTripGoer(s.id)},De,8,Me)):n("",!0),t.deletePermissions(s.accountId)&&t.archived?(o(),r("button",Ee,Ne)):n("",!0)]))),128))]),Ge,i("div",Oe,[(o(!0),r(A,null,w(t.tripParks,s=>(o(),r("section",{class:P(["row mb-4",{archivedImg:t.archived}]),key:s.id},[i("div",Re,[t.parks.length>0?(o(),oe(e,{key:0,to:{name:"ParkDetails",params:{parkCode:s.parkCode}}},{default:k(()=>[i("h1",Fe,f(s.fullName),1),i("img",{src:s.image,alt:"a photo of "+s.fullName,class:"park-img"},null,8,Le)]),_:2},1032,["to"])):n("",!0)]),i("div",Ue,[je,t.tripThingsToDo.filter(h=>h.parkCode==s.parkCode).length?(o(),r("ul",Ve,[(o(!0),r(A,null,w(t.tripThingsToDo.filter(h=>h.parkCode==s.parkCode),h=>(o(),r("span",{key:h.id},[h.parkCode==s.parkCode?(o(),r("li",{key:0,class:"selectable","data-bs-toggle":"modal","data-bs-target":"#activity-modal",onClick:tt=>t.setActiveThingToDo(h.nativeThingToDoId)},f(h.title),9,Ye)):n("",!0)]))),128))])):(o(),r("h6",Ke,"No activities have been added for this park"))])],2))),128))]),t.parks.length>0?(o(),r("h3",Je,"Let's see where we're going!")):n("",!0),i("div",ze,[m(d,{class:P({archivedImg:t.archived})},null,8,["class"])]),i("div",He,[((F=t.trip)==null?void 0:F.creatorId)==((L=t.account)==null?void 0:L.id)?(o(),r("button",{key:0,class:"btn archiveBtn mb-2",onClick:_[0]||(_[0]=s=>t.toggleArchiveTrip())},[((U=t.trip)==null?void 0:U.isArchived)==!1?(o(),r("span",Qe,"Archive ")):(o(),r("span",We,"Un-Archive")),qe])):n("",!0)])])]),m(T,{id:"sendInvitation"},{header:k(()=>[Xe]),body:k(()=>[m(b)]),_:1}),m(T,{id:"editTripModal"},{header:k(()=>[Ze]),body:k(()=>[m(I)]),_:1}),m(T,{id:"editParkModal"},{header:k(()=>[$e]),body:k(()=>[m(K)]),_:1}),m(J,{id:"activity-modal"})],64)}const rt=z(de,[["render",et],["__scopeId","data-v-e2be8f8a"]]);export{rt as default};
